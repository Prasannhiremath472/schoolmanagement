import { Module } from '@nestjs/common';
import { LibraryController } from './library.controller';
import { LibraryService } from './library.service';
import { LibraryQrService } from './library-qr.service';

@Module({
  controllers: [LibraryController],
  providers: [LibraryService, LibraryQrService],
  exports: [LibraryService, LibraryQrService],
})
export class LibraryModule {}
