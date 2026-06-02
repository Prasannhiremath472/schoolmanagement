import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import * as admin from 'firebase-admin';
import * as Twilio from 'twilio';

@Injectable()
export class NotificationService implements OnModuleInit {
  private readonly logger = new Logger(NotificationService.name);
  private firebaseInitialized = false;
  private twilioClient: Twilio.Twilio | null = null;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.initFirebase();
    this.initTwilio();
  }

  // ─── FIREBASE INITIALIZATION ──────────────────────────────────────────────

  private initFirebase() {
    const projectId = this.configService.get('FIREBASE_PROJECT_ID');
    const clientEmail = this.configService.get('FIREBASE_CLIENT_EMAIL');
    const privateKey = this.configService.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n');

    // Skip if placeholder or missing values
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
    } catch (err) {
      this.logger.warn(`Firebase init failed: ${err.message} — push notifications disabled`);
    }
  }

  // ─── TWILIO INITIALIZATION ────────────────────────────────────────────────

  private initTwilio() {
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
    } catch (err) {
      this.logger.warn(`Twilio init failed: ${err.message}`);
    }
  }

  // ─── EMAIL ────────────────────────────────────────────────────────────────

  async sendEmail(
    to: string,
    subject: string,
    html: string,
    smtpConfig?: { host: string; port: number; user: string; pass: string; from: string },
  ) {
    if (!to) return;

    const transporter = nodemailer.createTransport({
      host: smtpConfig?.host || this.configService.get('SMTP_HOST'),
      port: smtpConfig?.port || this.configService.get<number>('SMTP_PORT', 587),
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
    } catch (err) {
      this.logger.error(`Email failed to ${to}: ${err.message}`);
    }
  }

  // ─── SMS ──────────────────────────────────────────────────────────────────

  async sendSms(to: string, message: string) {
    if (!to || !this.twilioClient) {
      this.logger.debug(`SMS to ${to}: ${message} (Twilio not configured)`);
      return;
    }

    const from = this.configService.get('TWILIO_FROM_NUMBER');
    try {
      const result = await this.twilioClient.messages.create({ body: message, from, to });
      this.logger.log(`SMS sent to ${to}: SID ${result.sid}`);
    } catch (err) {
      this.logger.error(`SMS failed to ${to}: ${err.message}`);
    }
  }

  // ─── FIREBASE PUSH NOTIFICATION ───────────────────────────────────────────

  async sendPushNotification(
    fcmToken: string,
    title: string,
    body: string,
    data?: Record<string, string>,
  ) {
    if (!fcmToken || !this.firebaseInitialized) {
      this.logger.debug(`Push to ${fcmToken}: ${title} (Firebase not configured)`);
      return;
    }

    const message: admin.messaging.Message = {
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
    } catch (err) {
      if (err.code === 'messaging/registration-token-not-registered') {
        this.logger.warn(`FCM token ${fcmToken} is no longer valid`);
        // Token should be removed from DB — handled by caller
      } else {
        this.logger.error(`Push failed to ${fcmToken}: ${err.message}`);
      }
    }
  }

  /** Send to multiple FCM tokens (batch) */
  async sendMulticastPush(
    fcmTokens: string[],
    title: string,
    body: string,
    data?: Record<string, string>,
  ) {
    if (!fcmTokens.length || !this.firebaseInitialized) return;

    const message: admin.messaging.MulticastMessage = {
      tokens: fcmTokens,
      notification: { title, body },
      data: data ? Object.fromEntries(Object.entries(data).map(([k, v]) => [k, String(v)])) : undefined,
      android: { priority: 'high' },
    };

    try {
      const response = await admin.messaging().sendEachForMulticast(message);
      this.logger.log(`Multicast push: ${response.successCount} success, ${response.failureCount} failed`);

      // Return failed tokens for cleanup
      const failedTokens: string[] = [];
      response.responses.forEach((resp, idx) => {
        if (!resp.success && resp.error?.code === 'messaging/registration-token-not-registered') {
          failedTokens.push(fcmTokens[idx]);
        }
      });
      return failedTokens;
    } catch (err) {
      this.logger.error(`Multicast push failed: ${err.message}`);
    }
  }

  // ─── WHATSAPP ─────────────────────────────────────────────────────────────

  async sendWhatsApp(to: string, message: string) {
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
    } catch (err) {
      this.logger.error(`WhatsApp failed to ${to}: ${err.message}`);
    }
  }

  /** Send WhatsApp template message */
  async sendWhatsAppTemplate(to: string, templateSid: string, variables: Record<string, string>) {
    if (!this.twilioClient) return;

    try {
      await this.twilioClient.messages.create({
        from: `whatsapp:${this.configService.get('TWILIO_WHATSAPP_NUMBER')}`,
        to: `whatsapp:${to}`,
        contentSid: templateSid,
        contentVariables: JSON.stringify(variables),
      });
      this.logger.log(`WhatsApp template sent to ${to}`);
    } catch (err) {
      this.logger.error(`WhatsApp template failed to ${to}: ${err.message}`);
    }
  }

  // ─── BROADCAST HELPERS ────────────────────────────────────────────────────

  async broadcastToUsers(
    users: Array<{ email?: string; phone?: string; fcmToken?: string }>,
    notification: { title: string; body: string; subject?: string },
    channels: ('email' | 'sms' | 'push')[],
  ) {
    const pushTokens = users.filter(u => u.fcmToken).map(u => u.fcmToken!);
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
}
