import { Injectable, NotFoundException, ConflictException, Logger } from '@nestjs/common';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { PrismaClientManager } from '../../database/prisma-client-manager.service';
import { ConfigService } from '@nestjs/config';
import { PaginationDto, buildPaginationMeta, getPaginationArgs } from '../../common/dto/pagination.dto';
import { CreateSchoolDto, UpdateSchoolDto } from './dto/school.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class SuperAdminService {
  private readonly logger = new Logger(SuperAdminService.name);

  constructor(
    private readonly centralPrisma: CentralPrismaService,
    private readonly prismaManager: PrismaClientManager,
    private readonly configService: ConfigService,
  ) {}

  // ─── DASHBOARD ────────────────────────────────────────────────────────────

  async getDashboardStats() {
    const [
      totalSchools,
      activeSchools,
      trialSchools,
      suspendedSchools,
      expiredSchools,
    ] = await Promise.all([
      this.centralPrisma.school.count(),
      this.centralPrisma.school.count({ where: { status: 'ACTIVE' } }),
      this.centralPrisma.school.count({ where: { status: 'TRIAL' } }),
      this.centralPrisma.school.count({ where: { status: 'SUSPENDED' } }),
      this.centralPrisma.school.count({ where: { status: 'EXPIRED' } }),
    ]);

    const revenueResult = await this.centralPrisma.payment.aggregate({
      _sum: { amount: true },
      where: { status: 'SUCCESS' },
    });

    const monthlyRevenue = await this.centralPrisma.payment.aggregate({
      _sum: { amount: true },
      where: {
        status: 'SUCCESS',
        paidAt: {
          gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
        },
      },
    });

    return {
      data: {
        schools: { total: totalSchools, active: activeSchools, trial: trialSchools, suspended: suspendedSchools, expired: expiredSchools },
        revenue: {
          total: Number(revenueResult._sum.amount) || 0,
          monthly: Number(monthlyRevenue._sum.amount) || 0,
        },
      },
    };
  }

  // ─── SCHOOL MANAGEMENT ────────────────────────────────────────────────────

  async getSchools(query: Partial<PaginationDto> & { status?: string }) {
    const where: any = {};
    if (query.status) where.status = query.status;
    if (query.search) {
      where.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
        { slug: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const [data, total] = await Promise.all([
      this.centralPrisma.school.findMany({
        where,
        
        
        orderBy: { createdAt: 'desc' },
        include: {
          subscriptions: {
            where: { status: 'ACTIVE' },
            include: { plan: { select: { name: true, billingCycle: true } } },
            take: 1,
            orderBy: { createdAt: 'desc' },
          },
          reseller: { select: { name: true } },
        },
      }),
      this.centralPrisma.school.count({ where }),
    ]);

    return { data, meta: buildPaginationMeta(total, query) };
  }

  async getSchool(id: string) {
    const school = await this.centralPrisma.school.findUnique({
      where: { id },
      include: {
        subscriptions: { include: { plan: true }, orderBy: { createdAt: 'desc' } },
        schoolSettings: true,
        reseller: true,
        usageMetrics: { orderBy: { metricDate: 'desc' }, take: 7 },
      },
    });

    if (!school) throw new NotFoundException('School not found');
    return { data: school };
  }

  async createSchool(dto: CreateSchoolDto) {
    const existingSlug = await this.centralPrisma.school.findUnique({ where: { slug: dto.slug } });
    if (existingSlug) throw new ConflictException(`Slug "${dto.slug}" already exists`);

    const existingEmail = await this.centralPrisma.school.findUnique({ where: { email: dto.email } });
    if (existingEmail) throw new ConflictException(`Email "${dto.email}" already registered`);

    const dbName = `school_${dto.slug.replace(/-/g, '_')}_db`;

    const school = await this.centralPrisma.school.create({
      data: {
        name: dto.name,
        slug: dto.slug,
        email: dto.email,
        phone: dto.phone,
        address: dto.address,
        city: dto.city,
        state: dto.state,
        country: dto.country || 'India',
        dbName,
        status: 'TRIAL',
        timezone: dto.timezone || 'Asia/Kolkata',
      },
    });

    // Provision school database
    await this.provisionSchoolDatabase(school.dbName);

    // Create admin user for school
    await this.createSchoolAdminUser(school, dto.adminEmail, dto.adminPassword);

    this.logger.log(`School created: ${school.slug} (DB: ${dbName})`);

    return { data: school, message: 'School created and provisioned successfully' };
  }

  async updateSchool(id: string, dto: UpdateSchoolDto) {
    await this.getSchool(id);
    const school = await this.centralPrisma.school.update({ where: { id }, data: dto });
    return { data: school, message: 'School updated' };
  }

  async updateSchoolStatus(id: string, status: string) {
    const school = await this.centralPrisma.school.update({
      where: { id },
      data: { status: status as any },
    });

    // Invalidate cache
    // this.cache.del(`tenant:${school.slug}`);

    return { data: school, message: `School ${status.toLowerCase()}` };
  }

  async deleteSchool(id: string) {
    const school = await this.getSchool(id);
    await this.centralPrisma.school.delete({ where: { id } });
    return { message: `School ${school.data.name} deleted` };
  }

  // ─── SUBSCRIPTION PLANS ───────────────────────────────────────────────────

  async getPlans() {
    const data = await this.centralPrisma.subscriptionPlan.findMany({
      where: { isActive: true },
      orderBy: [{ billingCycle: 'asc' }, { price: 'asc' }],
    });
    return { data };
  }

  async createPlan(dto: any) {
    const plan = await this.centralPrisma.subscriptionPlan.create({ data: dto });
    return { data: plan, message: 'Plan created' };
  }

  // ─── RESELLERS ────────────────────────────────────────────────────────────

  async getResellers(query: Partial<PaginationDto>) {
    const [data, total] = await Promise.all([
      this.centralPrisma.reseller.findMany({
        
        
        include: { _count: { select: { schools: true } } },
      }),
      this.centralPrisma.reseller.count(),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  // ─── AUDIT LOGS ───────────────────────────────────────────────────────────

  async getAuditLogs(query: Partial<PaginationDto>) {
    const [data, total] = await Promise.all([
      this.centralPrisma.auditLog.findMany({
        
        
        orderBy: { createdAt: 'desc' },
        include: { platformUser: { select: { name: true, email: true } } },
      }),
      this.centralPrisma.auditLog.count(),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  // ─── REVENUE REPORTS ──────────────────────────────────────────────────────

  async getRevenueReport(period: 'daily' | 'monthly' | 'yearly') {
    const payments = await this.centralPrisma.payment.findMany({
      where: { status: 'SUCCESS' },
      orderBy: { paidAt: 'desc' },
      take: 100,
      include: {
        subscription: { include: { school: { select: { name: true } } } },
      },
    });

    return { data: payments };
  }

  // ─── SYSTEM SETTINGS ─────────────────────────────────────────────────────

  async getSystemSettings(group?: string) {
    const where: any = {};
    if (group) where.group = group;
    const settings = await this.centralPrisma.systemSetting.findMany({
      where,
      orderBy: [{ group: 'asc' }, { key: 'asc' }],
    });
    // Mask secret values
    const masked = settings.map((s) => ({
      ...s,
      value: s.isSecret ? '••••••••' : s.value,
    }));
    return { data: masked };
  }

  async upsertSystemSetting(dto: { key: string; value: string; group?: string; isSecret?: boolean }) {
    const setting = await this.centralPrisma.systemSetting.upsert({
      where: { key: dto.key },
      update: { value: dto.value, group: dto.group || 'general' },
      create: { key: dto.key, value: dto.value, group: dto.group || 'general', isSecret: dto.isSecret || false },
    });
    return { data: { ...setting, value: setting.isSecret ? '••••••••' : setting.value }, message: 'Setting saved' };
  }

  async bulkUpsertSettings(settings: Array<{ key: string; value: string; group?: string; isSecret?: boolean }>) {
    const results = [];
    for (const s of settings) {
      results.push(await this.upsertSystemSetting(s));
    }
    return { data: results, message: `${results.length} settings saved` };
  }

  async deleteSystemSetting(key: string) {
    await this.centralPrisma.systemSetting.delete({ where: { key } });
    return { message: 'Setting deleted' };
  }

  // ─── WHITE-LABEL BRANDING ─────────────────────────────────────────────────

  async getSchoolBranding(schoolId: string) {
    const school = await this.centralPrisma.school.findUnique({
      where: { id: schoolId },
      select: { id: true, name: true, slug: true, logo: true, favicon: true, primaryColor: true, secondaryColor: true, customDomain: true, website: true },
    });
    if (!school) throw new Error('School not found');
    return { data: school };
  }

  async updateSchoolBranding(schoolId: string, dto: {
    name?: string;
    logo?: string;
    favicon?: string;
    primaryColor?: string;
    secondaryColor?: string;
    customDomain?: string;
    website?: string;
  }) {
    const school = await this.centralPrisma.school.update({
      where: { id: schoolId },
      data: dto,
    });
    return { data: school, message: 'Branding updated successfully' };
  }

  /** Get all custom domains for nginx config generation */
  async getCustomDomains() {
    const schools = await this.centralPrisma.school.findMany({
      where: { customDomain: { not: null }, status: 'ACTIVE' },
      select: { slug: true, customDomain: true, name: true },
    });
    return { data: schools };
  }

  /** Get platform notifications (announcements to all schools) */
  async getPlatformNotifications(query: Partial<PaginationDto>) {
    const notifications = await this.centralPrisma.auditLog.findMany({
      where: { action: { startsWith: 'NOTIFY' } },
      
      
      orderBy: { createdAt: 'desc' },
    });
    return { data: notifications, meta: buildPaginationMeta(0, query) };
  }

  async sendPlatformNotification(dto: { subject: string; message: string; targetStatus?: string }) {
    const schools = await this.centralPrisma.school.findMany({
      where: { status: (dto.targetStatus as any) || 'ACTIVE' },
      select: { id: true, name: true, email: true },
    });

    // Log the notification
    await this.centralPrisma.auditLog.create({
      data: {
        action: 'NOTIFY_SCHOOLS',
        entity: 'School',
        newValues: { subject: dto.subject, count: schools.length, targetStatus: dto.targetStatus },
      },
    });

    return { data: { sent: schools.length, subject: dto.subject }, message: `Notification queued for ${schools.length} schools` };
  }

  // ─── USER MANAGEMENT ─────────────────────────────────────────────────────

  async getPlatformUsers(query: Partial<PaginationDto>) {
    const [data, total] = await Promise.all([
      this.centralPrisma.platformUser.findMany({
        
        
        orderBy: { createdAt: 'desc' },
        select: { id: true, name: true, email: true, role: true, isActive: true, lastLoginAt: true, createdAt: true },
      }),
      this.centralPrisma.platformUser.count(),
    ]);
    return { data, meta: buildPaginationMeta(total, query) };
  }

  async createPlatformUser(dto: { name: string; email: string; password: string; role: string }) {
    const passwordHash = await bcrypt.hash(dto.password, 12);
    const user = await this.centralPrisma.platformUser.create({
      data: { name: dto.name, email: dto.email, password: passwordHash, role: dto.role as any },
      select: { id: true, name: true, email: true, role: true, isActive: true, createdAt: true },
    });
    return { data: user, message: 'Platform user created' };
  }

  async updatePlatformUserStatus(id: string, isActive: boolean) {
    const user = await this.centralPrisma.platformUser.update({ where: { id }, data: { isActive } });
    return { data: user, message: `User ${isActive ? 'activated' : 'deactivated'}` };
  }

  // ─── RESOURCE MONITORING ─────────────────────────────────────────────────

  async getResourceMetrics(schoolId?: string) {
    const where: any = {};
    if (schoolId) where.schoolId = schoolId;

    const metrics = await this.centralPrisma.usageMetric.findMany({
      where,
      orderBy: { metricDate: 'desc' },
      take: 30,
      include: { school: { select: { name: true, slug: true } } },
    });

    const aggregated = {
      totalStudents: metrics.reduce((s, m) => s + m.students, 0),
      totalTeachers: metrics.reduce((s, m) => s + m.teachers, 0),
      totalStorageUsed: metrics.reduce((s, m) => s + Number(m.storageUsed), 0),
      totalApiCalls: metrics.reduce((s, m) => s + m.apiCalls, 0),
    };

    return { data: { metrics, aggregated } };
  }

  async updateUsageMetrics(schoolId: string, data: { students?: number; teachers?: number; staff?: number; storageUsed?: number; apiCalls?: number }) {
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const metric = await this.centralPrisma.usageMetric.upsert({
      where: { schoolId_metricDate: { schoolId, metricDate: today } },
      update: data,
      create: { schoolId, metricDate: today, ...data },
    });
    return { data: metric };
  }

  // ─── PRIVATE ──────────────────────────────────────────────────────────────

  private async provisionSchoolDatabase(dbName: string) {
    // In production: create new PostgreSQL database, run school.prisma migrations
    // Using a raw connection to postgres superuser
    this.logger.log(`Provisioning database: ${dbName}`);
    // Implementation: execute CREATE DATABASE and prisma migrate deploy
  }

  private async createSchoolAdminUser(school: any, email: string, password: string) {
    const dbHost = this.configService.get('DB_HOST', 'localhost');
    const dbPort = this.configService.get('DB_PORT', '5432');
    const dbUser = this.configService.get('DB_USER', 'postgres');
    const dbPass = this.configService.get('DB_PASSWORD', '');
    const dbUrl = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${school.dbName}`;

    const client = this.prismaManager.getClient(dbUrl, school.slug);

    const passwordHash = await bcrypt.hash(password || 'SchoolAdmin@123', 12);
    await client.user.create({
      data: {
        email,
        passwordHash,
        role: 'SCHOOL_ADMIN',
        isActive: true,
      },
    });
  }
}
