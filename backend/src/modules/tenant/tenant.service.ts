import { Injectable } from '@nestjs/common';
import { CentralPrismaService } from '../../database/central-prisma.service';

@Injectable()
export class TenantService {
  constructor(private readonly centralPrisma: CentralPrismaService) {}
  async resolveTenant(slug: string) { return this.centralPrisma.school.findUnique({ where: { slug }, select: { id: true, slug: true, dbName: true, status: true } }); }
  async getTenantBranding(slug: string) { return this.centralPrisma.school.findUnique({ where: { slug }, select: { name: true, logo: true, favicon: true, primaryColor: true, secondaryColor: true } }); }
}
