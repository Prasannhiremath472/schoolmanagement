# School ERP + LMS + Multi-Tenant SaaS Platform - Architecture Document

## System Overview

This platform is a multi-tenant SaaS School ERP + LMS system supporting unlimited schools,
each with isolated databases, white-label branding, and comprehensive school management features.

---

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         INTERNET / CDN                               │
└─────────────────────────────┬───────────────────────────────────────┘
                              │
┌─────────────────────────────▼───────────────────────────────────────┐
│                    NGINX REVERSE PROXY (SSL Termination)             │
│              Subdomain Routing: {school}.erp.domain.com             │
└────────┬─────────────────────────────────────────┬──────────────────┘
         │                                         │
┌────────▼──────────┐                   ┌──────────▼──────────────────┐
│   React Admin     │                   │   Flutter Mobile Apps        │
│   Panel (Vite)    │                   │  (Parent / Teacher / Student) │
│   Port: 3000      │                   │   Firebase Push Notifications │
└────────┬──────────┘                   └──────────┬──────────────────┘
         │                                         │
┌────────▼─────────────────────────────────────────▼──────────────────┐
│                   NestJS API Gateway (Port: 4000)                    │
│  ┌─────────────────────────────────────────────────────────────────┐ │
│  │           Tenant Resolver Middleware                             │ │
│  │   Reads: x-tenant-id header / subdomain / JWT claim             │ │
│  │   Resolves → School DB Connection                               │ │
│  └─────────────────────────────────────────────────────────────────┘ │
│  ┌────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │    Auth    │ │  Rate Limit  │ │  RBAC Guard  │ │  Audit Log   │  │
│  │  JWT/OTP   │ │   (Redis)    │ │   (Casl)     │ │  Interceptor │  │
│  └────────────┘ └──────────────┘ └──────────────┘ └──────────────┘  │
│  ┌──────────────────────────────────────────────────────────────────┐ │
│  │                    Module Controllers                            │ │
│  │  Students │ Teachers │ Attendance │ Fees │ Exams │ LMS │ etc.   │ │
│  └──────────────────────────────────────────────────────────────────┘ │
│  ┌───────────────┐  ┌──────────────────┐  ┌────────────────────────┐ │
│  │  Socket.IO    │  │    BullMQ        │  │    Event Emitter       │ │
│  │  Real-time    │  │  Background Jobs │  │    Domain Events       │ │
│  └───────────────┘  └──────────────────┘  └────────────────────────┘ │
└──────────────────────────────────────────────────────────────────────┘
         │                │                  │
┌────────▼───────┐ ┌──────▼────────┐ ┌──────▼──────────────────────────┐
│  Central DB    │ │   Redis       │ │  Per-School PostgreSQL DB         │
│  (PostgreSQL)  │ │  Cache+Queue  │ │  school_001_db                   │
│  - platforms   │ │  Sessions     │ │  school_002_db                   │
│  - schools     │ │  Rate Limit   │ │  school_N_db                     │
│  - plans       │ │  PubSub       │ │  (Prisma Multi-Schema)           │
│  - resellers   │ └───────────────┘ └─────────────────────────────────┘
└────────────────┘                   
         │
┌────────▼────────────────────────────────────────────────────────────┐
│              Object Storage (AWS S3 / Hostinger S3-Compatible)       │
│         Profile Photos │ Documents │ Videos │ PDFs │ Receipts        │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Multi-Tenant Database Strategy

### Approach: Database-Per-Tenant

Each school gets its own PostgreSQL database. The central database stores:
- Platform metadata (schools, plans, subscriptions)
- Tenant routing information
- Super admin users
- Reseller info

School databases store:
- All school-specific data (students, teachers, fees, attendance, etc.)
- Completely isolated - no data leakage between schools

### Tenant Resolution Flow

```
Request → Nginx → NestJS
  1. Extract tenant identifier from:
     - Subdomain: abc-school.erp.domain.com → slug = "abc-school"
     - Header: x-tenant-id: abc-school
     - JWT claim: { tenantId: "abc-school" }
  2. Redis cache lookup: tenant:{slug} → { dbName, dbUrl, status }
  3. If not cached → Query central DB → Cache for 10 minutes
  4. Create Prisma Client for school DB (pooled via PrismaClientManager)
  5. Inject into request context
```

---

## Key Design Principles

- **Clean Architecture**: Domain → Application → Infrastructure → Presentation
- **Repository Pattern**: All DB operations through repositories
- **SOLID Principles**: Each module is self-contained
- **Event-Driven**: Domain events for cross-module communication
- **CQRS-Ready**: Commands and queries separated in services
- **Security First**: OWASP Top 10 mitigations throughout

---

## Module Architecture

```
src/modules/{module}/
  ├── {module}.module.ts          # NestJS module definition
  ├── {module}.controller.ts      # HTTP controllers
  ├── {module}.service.ts         # Business logic
  ├── {module}.repository.ts      # Data access layer
  ├── dto/
  │   ├── create-{module}.dto.ts
  │   └── update-{module}.dto.ts
  ├── entities/
  │   └── {module}.entity.ts
  └── tests/
      ├── {module}.service.spec.ts
      └── {module}.controller.spec.ts
```

---

## Security Architecture

| Layer | Mechanism |
|-------|-----------|
| Transport | HTTPS / TLS 1.3 |
| Auth | JWT (15m access) + Refresh Token (7d) |
| Authorization | RBAC with Casl |
| Rate Limiting | Redis-backed per IP and per user |
| Input Validation | class-validator + Zod |
| SQL Injection | Prisma ORM parameterized queries |
| XSS | Helmet.js + Content Security Policy |
| CSRF | SameSite cookies + CSRF tokens |
| Audit | Every write operation logged |
| Data Encryption | AES-256 for sensitive fields |

---

## Scalability Strategy

- **Horizontal Scaling**: Stateless NestJS instances behind load balancer
- **Redis Clustering**: Session and cache distribution
- **Database Connection Pooling**: PgBouncer per school DB
- **Job Queue**: BullMQ with multiple workers
- **CDN**: Static assets and media via CloudFront/Cloudflare
- **Caching**: Multi-level (Redis L1, PostgreSQL materialized views L2)
