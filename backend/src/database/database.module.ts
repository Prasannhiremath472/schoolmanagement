import { Global, Module } from '@nestjs/common';
import { CentralPrismaService } from './central-prisma.service';
import { TenantPrismaService } from './tenant-prisma.service';
import { PrismaClientManager } from './prisma-client-manager.service';

@Global()
@Module({
  providers: [CentralPrismaService, TenantPrismaService, PrismaClientManager],
  exports: [CentralPrismaService, TenantPrismaService, PrismaClientManager],
})
export class DatabaseModule {}
