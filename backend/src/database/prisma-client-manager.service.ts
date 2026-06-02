import { Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/school-client';

interface ClientEntry {
  client: PrismaClient;
  lastUsed: number;
}

@Injectable()
export class PrismaClientManager implements OnModuleDestroy {
  private readonly logger = new Logger(PrismaClientManager.name);
  private readonly clients = new Map<string, ClientEntry>();
  private readonly MAX_IDLE_MS = 5 * 60 * 1000; // 5 minutes

  constructor() {
    // Cleanup idle connections every 2 minutes
    setInterval(() => this.cleanupIdleClients(), 2 * 60 * 1000);
  }

  getClient(dbUrl: string, tenantSlug: string): PrismaClient {
    const existing = this.clients.get(tenantSlug);
    if (existing) {
      existing.lastUsed = Date.now();
      return existing.client;
    }

    const client = new PrismaClient({
      datasources: { db: { url: dbUrl } },
      log: ['error'],
    });

    this.clients.set(tenantSlug, { client, lastUsed: Date.now() });
    this.logger.log(`Created Prisma client for tenant: ${tenantSlug}`);

    // Connect asynchronously
    client.$connect().catch((err) => {
      this.logger.error(`Failed to connect tenant ${tenantSlug}: ${err.message}`);
      this.clients.delete(tenantSlug);
    });

    return client;
  }

  private async cleanupIdleClients() {
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
}
