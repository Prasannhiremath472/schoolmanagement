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
var PrismaClientManager_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaClientManager = void 0;
const common_1 = require("@nestjs/common");
const school_client_1 = require("../generated/school-client");
let PrismaClientManager = PrismaClientManager_1 = class PrismaClientManager {
    constructor() {
        this.logger = new common_1.Logger(PrismaClientManager_1.name);
        this.clients = new Map();
        this.MAX_IDLE_MS = 5 * 60 * 1000;
        setInterval(() => this.cleanupIdleClients(), 2 * 60 * 1000);
    }
    getClient(dbUrl, tenantSlug) {
        const existing = this.clients.get(tenantSlug);
        if (existing) {
            existing.lastUsed = Date.now();
            return existing.client;
        }
        const client = new school_client_1.PrismaClient({
            datasources: { db: { url: dbUrl } },
            log: ['error'],
        });
        this.clients.set(tenantSlug, { client, lastUsed: Date.now() });
        this.logger.log(`Created Prisma client for tenant: ${tenantSlug}`);
        client.$connect().catch((err) => {
            this.logger.error(`Failed to connect tenant ${tenantSlug}: ${err.message}`);
            this.clients.delete(tenantSlug);
        });
        return client;
    }
    async cleanupIdleClients() {
        const now = Date.now();
        for (const [slug, entry] of this.clients.entries()) {
            if (now - entry.lastUsed > this.MAX_IDLE_MS) {
                await entry.client.$disconnect();
                this.clients.delete(slug);
                this.logger.log(`Disconnected idle tenant client: ${slug}`);
            }
        }
    }
    async onModuleDestroy() {
        for (const [, entry] of this.clients.entries()) {
            await entry.client.$disconnect();
        }
        this.clients.clear();
    }
};
exports.PrismaClientManager = PrismaClientManager;
exports.PrismaClientManager = PrismaClientManager = PrismaClientManager_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaClientManager);
//# sourceMappingURL=prisma-client-manager.service.js.map