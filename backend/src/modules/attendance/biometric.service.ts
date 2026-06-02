import { Injectable, Logger } from '@nestjs/common';
import { TenantPrismaService } from '../../database/tenant-prisma.service';
import axios from 'axios';

interface BiometricRecord {
  employeeId: string;
  punchTime: string;
  punchType: 'IN' | 'OUT';
  deviceId: string;
}

/**
 * ZKTeco biometric device integration service.
 * Supports fetching attendance logs via ZKTeco SDK/API.
 * Works with ZKTeco standalone devices via their TCP/IP protocol.
 */
@Injectable()
export class BiometricService {
  private readonly logger = new Logger(BiometricService.name);

  constructor(private readonly tenantPrisma: TenantPrismaService) {}

  private get db() { return this.tenantPrisma.db; }

  /**
   * Fetch attendance logs from ZKTeco device via local IP.
   * In production, use node-zklib or zkteco-js library for TCP communication.
   */
  async fetchFromDevice(deviceIp: string, devicePort = 4370): Promise<BiometricRecord[]> {
    this.logger.log(`Fetching attendance from ZKTeco device at ${deviceIp}:${devicePort}`);

    // This is the integration point for ZKTeco TCP protocol.
    // In production: use `node-zklib` npm package:
    //   const zkInstance = new ZKLib(deviceIp, devicePort, 10000, 4000);
    //   await zkInstance.createSocket();
    //   const { data } = await zkInstance.getAttendances();
    //   await zkInstance.disconnect();
    //   return data;

    // Stub: return empty records
    return [];
  }

  /**
   * Fetch attendance from ZKTeco ADMS (cloud/server) via HTTP API.
   */
  async fetchFromAdmsApi(admsUrl: string, apiKey: string, date: string): Promise<BiometricRecord[]> {
    try {
      const response = await axios.get(`${admsUrl}/iclock/getattlog`, {
        params: { stn: date, day_begin: date, day_end: date },
        headers: { Authorization: `Bearer ${apiKey}` },
        timeout: 15000,
      });

      if (response.data && Array.isArray(response.data.data)) {
        return response.data.data.map((record: any) => ({
          employeeId: record.pin || record.employee_id,
          punchTime: record.punch_time,
          punchType: record.punch_state === '0' ? 'IN' : 'OUT',
          deviceId: record.device_id || admsUrl,
        }));
      }

      return [];
    } catch (err) {
      this.logger.error(`Failed to fetch from ADMS API: ${err.message}`);
      return [];
    }
  }

  /**
   * Process fetched biometric records and sync to attendance DB.
   */
  async syncBiometricAttendance(records: BiometricRecord[], date: string, academicYearId: string) {
    const db = this.db;
    const results = { synced: 0, notFound: 0, errors: 0 };
    const dateObj = new Date(date);

    for (const record of records) {
      try {
        // Match employee by employeeId (works for teachers and staff)
        const teacher = await db.teacher.findFirst({ where: { employeeId: record.employeeId } });
        const staff = await db.staff.findFirst({ where: { employeeId: record.employeeId } });

        if (!teacher && !staff) { results.notFound++; continue; }

        const checkIn = record.punchType === 'IN' ? new Date(record.punchTime) : null;
        const checkOut = record.punchType === 'OUT' ? new Date(record.punchTime) : null;

        await db.staffAttendance.upsert({
          where: {
            id: `${teacher?.id || staff?.id}-${date}`,
          },
          update: {
            ...(checkIn && { checkIn }),
            ...(checkOut && { checkOut }),
          },
          create: {
            teacherId: teacher?.id,
            staffId: staff?.id,
            date: dateObj,
            checkIn: checkIn || undefined,
            checkOut: checkOut || undefined,
            status: 'PRESENT',
          },
        });

        results.synced++;
      } catch (err) {
        this.logger.error(`Error syncing record ${record.employeeId}: ${err.message}`);
        results.errors++;
      }
    }

    return { data: results, message: `Synced: ${results.synced}, not found: ${results.notFound}, errors: ${results.errors}` };
  }

  /**
   * RFID-based student attendance: when student taps RFID card at gate.
   */
  async markRfidAttendance(rfidCode: string, sectionId: string, academicYearId: string) {
    const db = this.db;

    // Look up student by RFID code (stored in aadhaarNo or a dedicated field)
    const student = await db.student.findFirst({
      where: { aadhaarNo: rfidCode }, // In production, use a dedicated rfidCode field
    });

    if (!student) {
      return { success: false, message: 'Student not found for RFID code' };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await db.attendance.upsert({
      where: {
        studentId_date_sectionId: { studentId: student.id, date: today, sectionId },
      },
      update: { status: 'PRESENT' },
      create: {
        studentId: student.id,
        sectionId,
        academicYearId,
        date: today,
        status: 'PRESENT',
      },
    });

    return {
      success: true,
      student: { id: student.id, name: `${student.firstName} ${student.lastName}`, admissionNo: student.admissionNo },
      message: `Attendance marked for ${student.firstName} ${student.lastName}`,
    };
  }
}
