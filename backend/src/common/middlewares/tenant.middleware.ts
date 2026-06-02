import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CentralPrismaService } from '../../database/central-prisma.service';
import { ConfigService } from '@nestjs/config';

interface TenantInfo {
  id: string;
  slug: string;
  dbName: string;
  status: string;
}

// Simple in-memory cache as fallback (works without Redis)
const tenantCache = new Map<string, { data: TenantInfo; expiresAt: number }>();

const PUBLIC_ROUTES = [
  '/api/v1/auth/super-admin',
  '/api/v1/super-admin',
  '/api/v1/health',
  '/api/docs',
  '/api/v1/tenant',
];

@Injectable()
export class TenantMiddleware implements NestMiddleware {
  private readonly logger = new Logger(TenantMiddleware.name);

  constructor(
    private readonly centralPrisma: CentralPrismaService,
    private readonly configService: ConfigService,
  ) {}

  async use(
    req: Request & { tenantDb?: string; tenantSlug?: string; tenantId?: string },
    res: Response,
    next: NextFunction,
  ) {
    const isPublicRoute = PUBLIC_ROUTES.some((r) => req.path.startsWith(r));
    if (isPublicRoute) return next();

    const slug = this.extractTenantSlug(req);
    if (!slug) return next();

    try {
      const tenant = await this.resolveTenant(slug);
      if (!tenant) {
        return res.status(404).json({ message: 'School not found', error: 'TENANT_NOT_FOUND' });
      }
      if (tenant.status === 'SUSPENDED') {
        return res.status(403).json({ message: 'School account is suspended', error: 'TENANT_SUSPENDED' });
      }
      if (tenant.status === 'EXPIRED') {
        return res.status(403).json({ message: 'School subscription has expired', error: 'TENANT_EXPIRED' });
      }

      const dbHost = this.configService.get('DB_HOST', 'localhost');
      const dbPort = this.configService.get('DB_PORT', '5432');
      const dbUser = this.configService.get('DB_USER', 'postgres');
      const dbPass = this.configService.get('DB_PASSWORD', '');

      req.tenantId = tenant.id;
      req.tenantSlug = tenant.slug;
      req.tenantDb = `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${tenant.dbName}?schema=public`;

      next();
    } catch (err) {
      this.logger.error(`Tenant resolution failed for slug: ${slug}`, err);
      next(err);
    }
  }

  private extractTenantSlug(req: Request): string | null {
    // 1. From header
    const headerTenant = req.headers['x-tenant-id'] as string;
    if (headerTenant) return headerTenant;

    // 2. From JWT token
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      try {
        const token = authHeader.split(' ')[1];
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        if (payload.tenantSlug) return payload.tenantSlug;
      } catch { /* ignore */ }
    }

    // 3. From subdomain
    const host = req.hostname;
    const parts = host.split('.');
    if (parts.length >= 3) return parts[0];

    return null;
  }

  private async resolveTenant(slug: string): Promise<TenantInfo | null> {
    const cacheKey = `tenant:${slug}`;
    const now = Date.now();

    // Check in-memory cache first
    const cached = tenantCache.get(cacheKey);
    if (cached && cached.expiresAt > now) {
      return cached.data;
    }

    const school = await this.centralPrisma.school.findUnique({
      where: { slug },
      select: { id: true, slug: true, dbName: true, status: true },
    });

    if (school) {
      // Cache for 10 minutes
      tenantCache.set(cacheKey, { data: school, expiresAt: now + 10 * 60 * 1000 });
    }

    return school;
  }
}
