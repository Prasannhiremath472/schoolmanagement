# School ERP + LMS + Multi-Tenant SaaS Platform

A complete enterprise-grade School Management System built with modern technologies, supporting unlimited schools as separate tenants.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | NestJS 10 + TypeScript + Prisma ORM |
| Database | PostgreSQL 16 (per-tenant isolation) |
| Cache | Redis 7 |
| Queue | BullMQ |
| Auth | JWT + Refresh Tokens + OTP |
| Frontend | React 19 + MUI + Redux Toolkit |
| Mobile | Flutter 3.x (BLoC pattern) |
| Storage | AWS S3 / Hostinger Object Storage |
| Deploy | Docker + Nginx + GitHub Actions |

## Quick Start

### Backend
```bash
cd backend
cp .env.example .env
npm install && npm run prisma:generate && npm run start:dev
```

### Frontend
```bash
cd frontend && npm install && npm run dev
```

### Docker (Full Stack)
```bash
docker compose up -d
docker compose exec api npx prisma migrate deploy --schema=prisma/central.prisma
docker compose exec api npx ts-node prisma/seed.ts
```

## Default Credentials (after seed)
- Super Admin: admin@schoolerp.com / SuperAdmin@123
- API Docs: http://localhost:4000/api/docs

## Modules: Auth, Students, Teachers, Academic, Attendance, Fees, Examinations, LMS, Communication, Transport, Hostel, Library, HR & Payroll, Accounting, Reports, Analytics, Super Admin, Subscriptions