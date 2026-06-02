/**
 * TEST USERS SEED SCRIPT
 * Creates all role users in demo-school for testing every portal
 *
 * Run: npx ts-node prisma/seed-test-users.ts
 */

import { PrismaClient as CentralClient } from '../src/generated/central-client';
import { PrismaClient as SchoolClient } from '../src/generated/school-client';
import * as bcrypt from 'bcryptjs';

const centralPrisma = new CentralClient();

const SCHOOL_DB_URL = process.env.SCHOOL_DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/school_demo_school_db';

const schoolPrisma = new SchoolClient({
  datasources: { db: { url: SCHOOL_DB_URL } },
});

async function hash(pw: string) {
  return bcrypt.hash(pw, 10);
}

async function main() {
  console.log('\n🌱 Creating all test role users...\n');

  // ─── 1. PLATFORM LEVEL (Central DB) ─────────────────────────────────────────

  // Super Admin (already created by seed.ts)
  await centralPrisma.platformUser.upsert({
    where: { email: 'admin@schoolerp.com' },
    update: {},
    create: {
      email: 'admin@schoolerp.com',
      password: await hash('SuperAdmin@123'),
      name: 'Super Admin',
      role: 'SUPER_ADMIN',
      isActive: true,
    },
  });
  console.log('✅ Super Admin:   admin@schoolerp.com  /  SuperAdmin@123');

  // Reseller
  await centralPrisma.platformUser.upsert({
    where: { email: 'reseller@schoolerp.com' },
    update: {},
    create: {
      email: 'reseller@schoolerp.com',
      password: await hash('Reseller@123'),
      name: 'Demo Reseller',
      role: 'RESELLER',
      isActive: true,
    },
  });
  await centralPrisma.reseller.upsert({
    where: { email: 'reseller@schoolerp.com' },
    update: {},
    create: {
      name: 'Demo Reseller',
      email: 'reseller@schoolerp.com',
      phone: '+919800000001',
      company: 'EduTech Solutions',
      commissionPct: 15,
      isActive: true,
    },
  });
  console.log('✅ Reseller:      reseller@schoolerp.com  /  Reseller@123');

  // Finance Admin
  await centralPrisma.platformUser.upsert({
    where: { email: 'finance@schoolerp.com' },
    update: {},
    create: {
      email: 'finance@schoolerp.com',
      password: await hash('Finance@123'),
      name: 'Finance Admin',
      role: 'FINANCE',
      isActive: true,
    },
  });
  console.log('✅ Finance Admin: finance@schoolerp.com  /  Finance@123');

  // ─── 2. SCHOOL LEVEL (School DB — demo-school) ───────────────────────────────

  console.log('\n── Demo School Users (School ID: demo-school) ──\n');

  // School Admin
  const adminUser = await schoolPrisma.user.upsert({
    where: { email: 'schooladmin@demo-school.com' },
    update: {},
    create: {
      email: 'schooladmin@demo-school.com',
      phone: '+919800000010',
      passwordHash: await hash('SchoolAdmin@123'),
      role: 'SCHOOL_ADMIN',
      isActive: true,
      isEmailVerified: true,
    },
  });
  console.log('✅ School Admin:    schooladmin@demo-school.com  /  SchoolAdmin@123');

  // Academic Year
  let currentYear = await schoolPrisma.academicYear.findFirst({ where: { name: '2024-2025' } });
  if (!currentYear) {
    currentYear = await schoolPrisma.academicYear.create({
      data: { name: '2024-2025', startDate: new Date('2024-04-01'), endDate: new Date('2025-03-31'), isCurrent: true },
    });
  }

  // Class & Section
  const class10 = await schoolPrisma.class.upsert({
    where: { name_academicYearId: { name: 'Class 10', academicYearId: currentYear.id } },
    update: {},
    create: {
      name: 'Class 10',
      displayName: 'Class X',
      academicYearId: currentYear.id,
      sortOrder: 10,
    },
  });

  const sectionA = await schoolPrisma.section.upsert({
    where: { name_classId: { name: 'A', classId: class10.id } },
    update: {},
    create: { name: 'A', classId: class10.id, capacity: 40 },
  });

  // Subject
  const mathSubject = await schoolPrisma.subject.upsert({
    where: { code_classId: { code: 'MATH10', classId: class10.id } },
    update: {},
    create: {
      name: 'Mathematics',
      code: 'MATH10',
      classId: class10.id,
      subjectType: 'THEORY',
      maxMarks: 100,
      passMarks: 33,
    },
  });

  // ─── Teacher ──────────────────────────────────────────────────────────────────
  const teacherUser = await schoolPrisma.user.upsert({
    where: { email: 'teacher@demo-school.com' },
    update: {},
    create: {
      email: 'teacher@demo-school.com',
      phone: '+919800000020',
      passwordHash: await hash('Teacher@123'),
      role: 'TEACHER',
      isActive: true,
      isEmailVerified: true,
    },
  });

  const teacher = await schoolPrisma.teacher.upsert({
    where: { employeeId: 'EMP001' },
    update: {},
    create: {
      userId: teacherUser.id,
      employeeId: 'EMP001',
      firstName: 'Ramesh',
      lastName: 'Kumar',
      gender: 'MALE',
      qualification: 'M.Sc Mathematics',
      experience: 8,
      joiningDate: new Date('2020-06-01'),
      designation: 'Senior Teacher',
      department: 'Science',
      phone: '+919800000020',
      email: 'teacher@demo-school.com',
    },
  });

  // Assign teacher to subject
  await schoolPrisma.teacherSubject.upsert({
    where: { teacherId_subjectId: { teacherId: teacher.id, subjectId: mathSubject.id } },
    update: {},
    create: { teacherId: teacher.id, subjectId: mathSubject.id, isPrimary: true },
  });

  // Assign teacher as class teacher
  await schoolPrisma.section.update({
    where: { id: sectionA.id },
    data: { classTeacherId: teacher.id },
  });
  console.log('✅ Teacher:         teacher@demo-school.com  /  Teacher@123  (EMP001)');

  // ─── Staff (Non-Teaching) ─────────────────────────────────────────────────────
  const staffUser = await schoolPrisma.user.upsert({
    where: { email: 'staff@demo-school.com' },
    update: {},
    create: {
      email: 'staff@demo-school.com',
      phone: '+919800000030',
      passwordHash: await hash('Staff@123'),
      role: 'STAFF',
      isActive: true,
    },
  });

  await schoolPrisma.staff.upsert({
    where: { employeeId: 'STAFF001' },
    update: {},
    create: {
      userId: staffUser.id,
      employeeId: 'STAFF001',
      firstName: 'Suresh',
      lastName: 'Patel',
      designation: 'Office Administrator',
      department: 'Administration',
      joiningDate: new Date('2021-01-01'),
      phone: '+919800000030',
      email: 'staff@demo-school.com',
    },
  });
  console.log('✅ Staff:           staff@demo-school.com  /  Staff@123  (STAFF001)');

  // ─── Accountant ───────────────────────────────────────────────────────────────
  await schoolPrisma.user.upsert({
    where: { email: 'accountant@demo-school.com' },
    update: {},
    create: {
      email: 'accountant@demo-school.com',
      phone: '+919800000040',
      passwordHash: await hash('Accountant@123'),
      role: 'ACCOUNTANT',
      isActive: true,
    },
  });
  console.log('✅ Accountant:      accountant@demo-school.com  /  Accountant@123');

  // ─── Librarian ────────────────────────────────────────────────────────────────
  await schoolPrisma.user.upsert({
    where: { email: 'librarian@demo-school.com' },
    update: {},
    create: {
      email: 'librarian@demo-school.com',
      phone: '+919800000050',
      passwordHash: await hash('Librarian@123'),
      role: 'LIBRARIAN',
      isActive: true,
    },
  });
  console.log('✅ Librarian:       librarian@demo-school.com  /  Librarian@123');

  // ─── Student (3 students) ─────────────────────────────────────────────────────
  const students = [
    { admissionNo: 'ADM-2024-001', firstName: 'Aarav',  lastName: 'Sharma',  email: 'student1@demo-school.com', phone: '+919800000061' },
    { admissionNo: 'ADM-2024-002', firstName: 'Priya',  lastName: 'Patel',   email: 'student2@demo-school.com', phone: '+919800000062' },
    { admissionNo: 'ADM-2024-003', firstName: 'Rohit',  lastName: 'Gupta',   email: 'student3@demo-school.com', phone: '+919800000063' },
  ];

  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    const sUser = await schoolPrisma.user.upsert({
      where: { email: s.email },
      update: {},
      create: {
        email: s.email,
        phone: s.phone,
        passwordHash: await hash('Student@123'),
        role: 'STUDENT',
        isActive: true,
      },
    });

    const student = await schoolPrisma.student.upsert({
      where: { admissionNo: s.admissionNo },
      update: {},
      create: {
        userId: sUser.id,
        admissionNo: s.admissionNo,
        firstName: s.firstName,
        lastName: s.lastName,
        dateOfBirth: new Date(`${2008 + i}-06-15`),
        gender: i === 1 ? 'FEMALE' : 'MALE',
        category: 'GENERAL',
        admissionDate: new Date('2024-04-01'),
        status: 'ACTIVE',
      },
    });

    // Assign to section
    await schoolPrisma.studentSection.upsert({
      where: { studentId_sectionId: { studentId: student.id, sectionId: sectionA.id } },
      update: {},
      create: {
        studentId: student.id,
        sectionId: sectionA.id,
        rollNo: String(i + 1).padStart(2, '0'),
        isActive: true,
      },
    });
  }
  console.log('✅ Students (3):    student1@demo-school.com  /  Student@123');
  console.log('                    student2@demo-school.com  /  Student@123');
  console.log('                    student3@demo-school.com  /  Student@123');

  // ─── Parent (linked to student 1) ────────────────────────────────────────────
  const parentUser = await schoolPrisma.user.upsert({
    where: { email: 'parent@demo-school.com' },
    update: {},
    create: {
      email: 'parent@demo-school.com',
      phone: '+919800000070',
      passwordHash: await hash('Parent@123'),
      role: 'PARENT',
      isActive: true,
    },
  });

  const parent = await schoolPrisma.parent.upsert({
    where: { userId: parentUser.id },
    update: {},
    create: {
      userId: parentUser.id,
      firstName: 'Rajesh',
      lastName: 'Sharma',
      relation: 'FATHER',
      occupation: 'Business',
      phone: '+919800000070',
      email: 'parent@demo-school.com',
    },
  });

  // Link parent to student 1
  const student1 = await schoolPrisma.student.findUnique({ where: { admissionNo: 'ADM-2024-001' } });
  if (student1) {
    await schoolPrisma.studentParent.upsert({
      where: { studentId_parentId: { studentId: student1.id, parentId: parent.id } },
      update: {},
      create: { studentId: student1.id, parentId: parent.id, isPrimary: true },
    });
  }
  console.log('✅ Parent:          parent@demo-school.com  /  Parent@123  (linked to Aarav Sharma)');

  // ─── Transport Manager ────────────────────────────────────────────────────────
  await schoolPrisma.user.upsert({
    where: { email: 'transport@demo-school.com' },
    update: {},
    create: {
      email: 'transport@demo-school.com',
      phone: '+919800000080',
      passwordHash: await hash('Transport@123'),
      role: 'TRANSPORT_MANAGER',
      isActive: true,
    },
  });
  console.log('✅ Transport Mgr:   transport@demo-school.com  /  Transport@123');

  // ─── Hostel Warden ────────────────────────────────────────────────────────────
  await schoolPrisma.user.upsert({
    where: { email: 'warden@demo-school.com' },
    update: {},
    create: {
      email: 'warden@demo-school.com',
      phone: '+919800000090',
      passwordHash: await hash('Warden@123'),
      role: 'HOSTEL_WARDEN',
      isActive: true,
    },
  });
  console.log('✅ Hostel Warden:   warden@demo-school.com  /  Warden@123');

  // ─── Sample Data ──────────────────────────────────────────────────────────────

  // Fee Category
  await schoolPrisma.feeCategory.upsert({
    where: { name: 'Tuition Fee' },
    update: {},
    create: { name: 'Tuition Fee', description: 'Monthly tuition fee', isActive: true },
  });

  // Book category & book for library
  const bookCat = await schoolPrisma.bookCategory.upsert({
    where: { name: 'Mathematics' },
    update: {},
    create: { name: 'Mathematics' },
  });

  await schoolPrisma.book.upsert({
    where: { isbn: '978-0-13-468599-1' },
    update: {},
    create: {
      isbn: '978-0-13-468599-1',
      title: 'NCERT Mathematics Class 10',
      author: 'NCERT',
      publisher: 'NCERT Publications',
      categoryId: bookCat.id,
      totalCopies: 10,
      availableCopies: 10,
      shelfNo: 'A-01',
    },
  });

  // Vehicle for transport
  await schoolPrisma.vehicle.upsert({
    where: { vehicleNo: 'MH-01-AB-1234' },
    update: {},
    create: {
      vehicleNo: 'MH-01-AB-1234',
      vehicleType: 'Bus',
      model: 'Tata Starbus',
      capacity: 42,
      driverName: 'Ramu Yadav',
      driverPhone: '+919711111111',
      driverLicense: 'MH0120190123456',
      isActive: true,
    },
  });

  // Hostel
  const existingHostel = await schoolPrisma.hostel.findFirst({ where: { name: 'Boys Hostel Block A' } });
  if (!existingHostel) {
    await schoolPrisma.hostel.create({
      data: { name: 'Boys Hostel Block A', type: 'BOYS', capacity: 100, wardenName: 'Mr. Sharma', wardenPhone: '+919722222222', isActive: true },
    });
  }

  // ExamType
  await schoolPrisma.examType.upsert({
    where: { name: 'Unit Test 1' },
    update: {},
    create: { name: 'Unit Test 1', shortName: 'UT1', sortOrder: 1, isActive: true },
  });

  await schoolPrisma.examType.upsert({
    where: { name: 'Mid Term' },
    update: {},
    create: { name: 'Mid Term', shortName: 'MT', sortOrder: 2, isActive: true },
  });

  // Announcement
  await schoolPrisma.announcement.create({
    data: {
      title: 'Welcome to Demo School ERP!',
      content: 'This is a demo announcement. The school portal is now live with all features including attendance, fees, exams, LMS, and more!',
      isPublished: true,
      publishedAt: new Date(),
    },
  });

  // Circular
  await schoolPrisma.circular.create({
    data: {
      circularNo: 'CIR-2024-0001',
      title: 'Annual Day Celebration',
      content: 'Annual Day will be celebrated on 25th March 2025. All students are requested to participate.',
      issuedDate: new Date('2025-01-15'),
    },
  });

  console.log('\n🎉 All test users and sample data created!\n');
  console.log('═'.repeat(65));
  console.log('\n📋 COMPLETE CREDENTIALS REFERENCE\n');
  console.log('School ID (slug): demo-school\n');
  console.log('PLATFORM LEVEL (use Super Admin Login page):');
  console.log('  Super Admin:     admin@schoolerp.com       /  SuperAdmin@123');
  console.log('  Reseller:        reseller@schoolerp.com    /  Reseller@123');
  console.log('  Finance:         finance@schoolerp.com     /  Finance@123\n');
  console.log('SCHOOL LEVEL (use School Login, enter School ID: demo-school):');
  console.log('  School Admin:    schooladmin@demo-school.com  /  SchoolAdmin@123');
  console.log('  Teacher:         teacher@demo-school.com      /  Teacher@123');
  console.log('  Student 1:       student1@demo-school.com     /  Student@123');
  console.log('  Student 2:       student2@demo-school.com     /  Student@123');
  console.log('  Parent:          parent@demo-school.com       /  Parent@123');
  console.log('  Accountant:      accountant@demo-school.com   /  Accountant@123');
  console.log('  Librarian:       librarian@demo-school.com    /  Librarian@123');
  console.log('  Staff:           staff@demo-school.com        /  Staff@123');
  console.log('  Transport Mgr:   transport@demo-school.com    /  Transport@123');
  console.log('  Hostel Warden:   warden@demo-school.com       /  Warden@123');
  console.log('\nMOBILE APP (OTP Login — phone numbers):');
  console.log('  Parent phone:    +919800000070');
  console.log('  Teacher phone:   +919800000020');
  console.log('  Student phone:   +919800000061');
  console.log('═'.repeat(65));
}

main()
  .catch((e) => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(async () => { await centralPrisma.$disconnect(); await schoolPrisma.$disconnect(); });
