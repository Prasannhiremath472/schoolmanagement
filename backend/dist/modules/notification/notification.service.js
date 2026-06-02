"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var NotificationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");
const Twilio = require("twilio");
let NotificationService = NotificationService_1 = class NotificationService {
    constructor(configService) {
        this.configService = configService;
        this.logger = new common_1.Logger(NotificationService_1.name);
        this.firebaseInitialized = false;
        this.twilioClient = null;
    }
    onModuleInit() {
        this.initFirebase();
        this.initTwilio();
    }
    initFirebase() {
        const projectId = this.configService.get('FIREBASE_PROJECT_ID');
        const clientEmail = this.configService.get('FIREBASE_CLIENT_EMAIL');
        const privateKey = this.configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n');
        if (!projectId || !clientEmail || !privateKey ||
            projectId.includes('your-') || clientEmail.includes('your-') ||
            privateKey.includes('your-')) {
            this.logger.warn('Firebase credentials not configured — push notifications disabled');
            return;
        }
        try {
            if (!admin.apps.length) {
                admin.initializeApp({
                    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
                });
            }
            this.firebaseInitialized = true;
            this.logger.log('Firebase Admin SDK initialized');
        }
        catch (err) {
            this.logger.warn(`Firebase init failed: ${err.message} — push notifications disabled`);
        }
    }
    initTwilio() {
        const accountSid = this.configService.get('TWILIO_ACCOUNT_SID');
        const authToken = this.configService.get('TWILIO_AUTH_TOKEN');
        if (!accountSid || !authToken ||
            accountSid.includes('your_') || !accountSid.startsWith('AC')) {
            this.logger.warn('Twilio credentials not configured — SMS/WhatsApp disabled');
            return;
        }
        try {
            this.twilioClient = Twilio(accountSid, authToken);
            this.logger.log('Twilio client initialized');
        }
        catch (err) {
            this.logger.warn(`Twilio init failed: ${err.message}`);
        }
    }
    async sendEmail(to, subject, html, smtpConfig) {
        if (!to)
            return;
        const transporter = nodemailer.createTransport({
            host: smtpConfig?.host || this.configService.get('SMTP_HOST'),
            port: smtpConfig?.port || this.configService.get('SMTP_PORT', 587),
            secure: (smtpConfig?.port || this.configService.get('SMTP_PORT', 587)) === 465,
            auth: {
                user: smtpConfig?.user || this.configService.get('SMTP_USER'),
                pass: smtpConfig?.pass || this.configService.get('SMTP_PASS'),
            },
        });
        try {
            const info = await transporter.sendMail({
                from: smtpConfig?.from || this.configService.get('SMTP_FROM', 'School ERP <noreply@schoolerp.com>'),
                to,
                subject,
                html,
            });
            this.logger.log(`Email sent to ${to}: ${info.messageId}`);
        }
        catch (err) {
            this.logger.error(`Email failed to ${to}: ${err.message}`);
        }
    }
    async sendSms(to, message) {
        if (!to || !this.twilioClient) {
            this.logger.debug(`SMS to ${to}: ${message} (Twilio not configured)`);
            return;
        }
        const from = this.configService.get('TWILIO_FROM_NUMBER');
        try {
            const result = await this.twilioClient.messages.create({ body: message, from, to });
            this.logger.log(`SMS sent to ${to}: SID ${result.sid}`);
        }
        catch (err) {
            this.logger.error(`SMS failed to ${to}: ${err.message}`);
        }
    }
    async sendPushNotification(fcmToken, title, body, data) {
        if (!fcmToken || !this.firebaseInitialized) {
            this.logger.debug(`Push to ${fcmToken}: ${title} (Firebase not configured)`);
            return;
        }
        const message = {
            token: fcmToken,
            notification: { title, body },
            data: data ? Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])) : undefined,
            android: {
                priority: 'high',
                notification: {
                    channelId: 'school_erp_default',
                    clickAction: 'FLUTTER_NOTIFICATION_CLICK',
                    sound: 'default',
                },
            },
            apns: {
                payload: {
                    aps: {
                        sound: 'default',
                        badge: 1,
                    },
                },
            },
        };
        try {
            const response = await admin.messaging().send(message);
            this.logger.log(`Push notification sent: ${response}`);
        }
        catch (err) {
            if (err.code === 'messaging/registration-token-not-registered') {
                this.logger.warn(`FCM token ${fcmToken} is no longer valid`);
            }
            else {
                this.logger.error(`Push failed to ${fcmToken}: ${err.message}`);
            }
        }
    }
    async sendMulticastPush(fcmTokens, title, body, data) {
        if (!fcmTokens.length || !this.firebaseInitialized)
            return;
        const message = {
            tokens: fcmTokens,
            notification: { title, body },
            data: data ? Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])) : undefined,
            android: { priority: 'high' },
        };
        try {
            const response = await admin.messaging().sendEachForMulticast(message);
            this.logger.log(`Multicast push: ${response.successCount} success, ${response.failureCount} failed`);
            const failedTokens = [];
            response.responses.forEach((resp, idx) => {
                if (!resp.success && resp.error?.code === 'messaging/registration-token-not-registered') {
                    failedTokens.push(fcmTokens[idx]);
                }
            });
            return failedTokens;
        }
        catch (err) {
            this.logger.error(`Multicast push failed: ${err.message}`);
        }
    }
    async sendWhatsApp(to, message) {
        if (!to || !this.twilioClient) {
            this.logger.debug(`WhatsApp to ${to}: ${message} (Twilio not configured)`);
            return;
        }
        const from = `whatsapp:${this.configService.get('TWILIO_WHATSAPP_NUMBER')}`;
        const toWhatsApp = `whatsapp:${to}`;
        try {
            const result = await this.twilioClient.messages.create({
                body: message,
                from,
                to: toWhatsApp,
            });
            this.logger.log(`WhatsApp sent to ${to}: SID ${result.sid}`);
        }
        catch (err) {
            this.logger.error(`WhatsApp failed to ${to}: ${err.message}`);
        }
    }
    async sendWhatsAppTemplate(to, templateSid, variables) {
        if (!this.twilioClient)
            return;
        try {
            await this.twilioClient.messages.create({
                from: `whatsapp:${this.configService.get('TWILIO_WHATSAPP_NUMBER')}`,
                to: `whatsapp:${to}`,
                contentSid: templateSid,
                contentVariables: JSON.stringify(variables),
            });
            this.logger.log(`WhatsApp template sent to ${to}`);
        }
        catch (err) {
            this.logger.error(`WhatsApp template failed to ${to}: ${err.message}`);
        }
    }
    async broadcastToUsers(users, notification, channels) {
        const pushTokens = users.filter(u => u.fcmToken).map(u => u.fcmToken);
        const results = { email: 0, sms: 0, push: 0 };
        for (const user of users) {
            if (channels.includes('email') && user.email) {
                await this.sendEmail(user.email, notification.subject || notification.title, `<p>${notification.body}</p>`);
                results.email++;
            }
            if (channels.includes('sms') && user.phone) {
                await this.sendSms(user.phone, notification.body);
                results.sms++;
            }
        }
        if (channels.includes('push') && pushTokens.length) {
            await this.sendMulticastPush(pushTokens, notification.title, notification.body);
            results.push = pushTokens.length;
        }
        return results;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = NotificationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NotificationService);
//# sourceMappingURL=notification.service.js.map