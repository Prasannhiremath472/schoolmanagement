import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '../generated/central-client';

@Injectable()
export class CentralPrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(CentralPrismaService.name);

  constructor(private configService: ConfigService) {
    super({
      datasources: {
        db: { url: configService.get<string>('CENTRAL_DATABASE_URL') },
      },
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Central database connected');
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
