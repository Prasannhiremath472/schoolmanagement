import { Module } from '@nestjs/common';
import { ResellerController } from './reseller.controller';
import { ResellerPortalController } from './reseller-portal.controller';
import { ResellerService } from './reseller.service';

@Module({
  controllers: [ResellerController, ResellerPortalController],
  providers: [ResellerService],
  exports: [ResellerService],
})
export class ResellerModule {}
