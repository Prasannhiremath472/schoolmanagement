import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const WRITE_METHODS = ['POST', 'PUT', 'PATCH', 'DELETE'];

@Injectable()
export class AuditInterceptor implements NestInterceptor {
  private readonly logger = new Logger('AuditLog');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, user, ip } = req;

    if (!WRITE_METHODS.includes(method)) return next.handle();

    return next.handle().pipe(
      tap(() => {
        const tenant = req.tenantSlug || 'platform';
        const userId = user?.id || 'anonymous';
        this.logger.log(
          `AUDIT [${tenant}] user:${userId} ${method} ${url} ip:${ip}`,
        );
      }),
    );
  }
}
