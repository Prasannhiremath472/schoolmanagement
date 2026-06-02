import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl, ip } = req;
    const start = Date.now();

    res.on('finish', () => {
      const { statusCode } = res;
      const ms = Date.now() - start;
      const tenant = (req as any).tenantSlug || 'platform';
      this.logger.log(`[${tenant}] ${method} ${originalUrl} ${statusCode} ${ms}ms - ${ip}`);
    });

    next();
  }
}
