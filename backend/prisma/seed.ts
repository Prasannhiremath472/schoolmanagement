import { PrismaClient as CentralPrismaClient } from '../src/generated/central-client';
import * as bcrypt from 'bcryptjs';

const centralPrisma = new CentralPrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // ─── Create Super Admin ──────────────────────────────────────────────────────
  const adminPassword = await bcrypt.hash('SuperAdmin@123', 12);
  const superAdmin = await centralPrisma.platformUser.upsert({
    where: { email: 'admin@schoolerp.com' },
    update: {},
    create: {
      email: 'admin@schoolerp.com',
      password: adminPassword,
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });
  console.log(`✅ Super Admin created: ${superAdmin.email}`);

  // ─── Create Subscription Plans ──────────────────────────────────────────────
  const plans = [
    { name: 'Trial', slug: 'trial', price: 0, billingCycle: 'TRIAL', trialDays: 30, maxStudents: 100, storageGB: 2, features: { lms: true, reports: true } },
    { name: 'Basic Monthly', slug: 'basic-monthly', price: 999, billingCycle: 'MONTHLY', maxStudents: 500, storageGB: 10, features: { lms: true, reports: true, transport: false, hostel: false } },
    { name: 'Pro Monthly', slug: 'pro-monthly', price: 1999, billingCycle: 'MONTHLY', maxStudents: 2000, storageGB: 50, features: { lms: true, reports: true, transport: true, hostel: true, payroll: true } },
    { name: 'Pro Yearly', slug: 'pro-yearly', price: 19999, billingCycle: 'YEARLY', maxStudents: 2000, storageGB: 50, features: { lms: true, reports: true, transport: true, hostel: true, payroll: true } },
    { name: 'Enterprise', slug: 'enterprise', price: 4999, billingCycle: 'MONTHLY', maxStudents: -1, storageGB: 200, features: { lms: true, reports: true, transport: true, hostel: true, payroll: true, whiteLabel: true, customDomain: true } },
  ];

  for (const plan of plans) {
    await centralPrisma.subscriptionPlan.upsert({
      where: { slug: plan.slug },
      update: {},
      create: {
        name: plan.name,
        slug: plan.slug,
        price: plan.price,
        billingCycle: plan.billingCycle as any,
        trialDays: plan.trialDays || 0,
        maxStudents: plan.maxStudents,
        storageGB: plan.storageGB,
        features: plan.features,
        isActive: true,
      },
    });
    console.log(`✅ Plan created: ${plan.name}`);
  }

  // ─── Create Demo School ──────────────────────────────────────────────────────
  const demoSchool = await centralPrisma.school.upsert({
    where: { slug: 'demo-school' },
    update: {},
    create: {
      name: 'Demo School',
      slug: 'demo-school',
      email: 'admin@demo-school.com',
      phone: '+919876543210',
      address: '123 School Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      country: 'India',
      dbName: 'school_demo_school_db',
      status: 'ACTIVE',
      primaryColor: '#1976d2',
      secondaryColor: '#dc004e',
    },
  });
  console.log(`✅ Demo school created: ${demoSchool.slug}`);

  // ─── System Settings ──────────────────────────────────────────────────────────
  const settings = [
    { key: 'platform.name', value: 'School ERP Platform', group: 'general' },
    { key: 'platform.version', value: '1.0.0', group: 'general' },
    { key: 'platform.support_email', value: 'support@schoolerp.com', group: 'general' },
  ];

  for (const setting of settings) {
    await centralPrisma.systemSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
  console.log('✅ System settings initialized');

  console.log('');
  console.log('🎉 Seed completed successfully!');
  console.log('');
  console.log('Super Admin credentials:');
  console.log('  Email:    admin@schoolerp.com');
  console.log('  Password: SuperAdmin@123');
  console.log('');
  console.log('Demo School:');
  console.log('  Slug:     demo-school');
  console.log('  URL:      http://demo-school.localhost:3000');
}

main()
  .catch((e) => { console.error('Seed failed:', e); process.exit(1); })
  .finally(() => centralPrisma.$disconnect());
