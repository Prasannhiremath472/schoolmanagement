import { Controller, Post, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { BiometricService } from './biometric.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags('Attendance')
@Controller({ path: 'attendance/biometric', version: '1' })
export class BiometricController {
  constructor(private readonly biometricService: BiometricService) {}

  @Post('sync')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Sync attendance from ZKTeco biometric device' })
  async syncFromDevice(@Body() dto: { deviceIp: string; devicePort?: number; date: string; academicYearId: string }) {
    const records = await this.biometricService.fetchFromDevice(dto.deviceIp, dto.devicePort);
    return this.biometricService.syncBiometricAttendance(records, dto.date, dto.academicYearId);
  }

  @Post('sync-adms')
  @ApiBearerAuth('access-token')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SCHOOL_ADMIN')
  @ApiOperation({ summary: 'Sync attendance from ZKTeco ADMS cloud API' })
  async syncFromAdms(@Body() dto: { admsUrl: string; apiKey: string; date: string; academicYearId: string }) {
    const records = await this.biometricService.fetchFromAdmsApi(dto.admsUrl, dto.apiKey, dto.date);
    return this.biometricService.syncBiometricAttendance(records, dto.date, dto.academicYearId);
  }

  @Post('rfid')
  @Public()
  @ApiOperation({ summary: 'Mark attendance via RFID card scan (from gate device)' })
  async rfidScan(@Body() dto: { rfidCode: string; sectionId: string; academicYearId: string }) {
    return this.biometricService.markRfidAttendance(dto.rfidCode, dto.sectionId, dto.academicYearId);
  }
}
