import { Injectable } from '@nestjs/common';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { TenantPrismaService } from '../../database/tenant-prisma.service';

@Injectable()
export class SchoolService {
  constructor(
    private readonly centralPrisma: CentralPrismaService,
    private readonly tenantPrisma: TenantPrismaService,
  ) {}

  async getSchoolProfile(slug: string) {
    const school = await this.centralPrisma.school.findUnique({
      where: { slug },
      select: { id: true, name: true, logo: true, favicon: true, primaryColor: true, secondaryColor: true, email: true, phone: true, address: true, city: true, state: true, country: true, timezone: true, currency: true },
    });
    return { data: school };
  }

  async updateSchoolSettings(slug: string, dto: any) {
    const school = await this.centralPrisma.school.findUnique({ where: { slug } });
    const settings = await this.centralPrisma.schoolSetting.upsert({
      where: { schoolId: school.id },
      update: dto,
      create: { schoolId: school.id, ...dto },
    });
    return { data: settings, message: 'Settings updated' };
  }

  async getSchoolStats(slug: string) {
    const db = this.tenantPrisma.db;
    const [students, teachers, staff] = await Promise.all([
      db.student.count({ where: { status: 'ACTIVE' } }),
      db.teacher.count({ where: { status: 'ACTIVE' } }),
      db.staff.count({ where: { status: 'ACTIVE' } }),
    ]);
    return { data: { students, teachers, staff } };
  }
}
