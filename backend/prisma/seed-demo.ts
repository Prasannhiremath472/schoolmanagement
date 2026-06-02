/**
 * COMPREHENSIVE DEMO SEED
 * Run: npx ts-node prisma/seed-demo.ts
 *
 * Creates realistic data across ALL modules for client demos:
 * - 5 Classes (8-12), 2 sections each, 6 subjects per class
 * - 12 Teachers, 5 Staff members, 20 Students, 8 Parents
 * - Fee structures, payments, dues
 * - Attendance for last 30 days
 * - Exam results with grades
 * - LMS: assignments, homework, study materials, quizzes, live classes
 * - Library: books, issues, returns
 * - Transport: 3 routes, vehicles, student allocation
 * - Hostel: rooms, allocations
 * - HR: salary structures, processed salaries, leaves
 * - Accounting: account heads, income/expense transactions
 * - Communication: announcements, circulars
 * - Timetable for all sections
 */

import { PrismaClient as SchoolClient } from '../src/generated/school-client';
import * as bcrypt from 'bcryptjs';

const SCHOOL_DB_URL = process.env.SCHOOL_DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5432/school_demo_school_db';

const db = new SchoolClient({ datasources: { db: { url: SCHOOL_DB_URL } } });

const h = (pw: string) => bcrypt.hash(pw, 10);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function futureDays(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(0, 0, 0, 0);
  return d;
}

function randomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function grade(pct: number): { grade: string; gradePoint: number; isPass: boolean } {
  if (pct >= 90) return { grade: 'A+', gradePoint: 10, isPass: true };
  if (pct >= 80) return { grade: 'A', gradePoint: 9, isPass: true };
  if (pct >= 70) return { grade: 'B+', gradePoint: 8, isPass: true };
  if (pct >= 60) return { grade: 'B', gradePoint: 7, isPass: true };
  if (pct >= 50) return { grade: 'C', gradePoint: 6, isPass: true };
  if (pct >= 40) return { grade: 'D', gradePoint: 5, isPass: true };
  return { grade: 'F', gradePoint: 0, isPass: false };
}

// ─── Master Data ─────────────────────────────────────────────────────────────

const TEACHER_DATA = [
  { emp: 'EMP001', first: 'Ramesh',    last: 'Kumar',    gender: 'MALE',   qual: 'M.Sc Mathematics',  exp: 8,  desig: 'Senior Teacher',  dept: 'Mathematics', phone: '+919800000020', email: 'teacher@demo-school.com' },
  { emp: 'EMP002', first: 'Sunita',    last: 'Sharma',   gender: 'FEMALE', qual: 'M.Sc Physics',      exp: 6,  desig: 'Teacher',         dept: 'Science',     phone: '+919800000021', email: 'sunita@demo-school.com' },
  { emp: 'EMP003', first: 'Prakash',   last: 'Verma',    gender: 'MALE',   qual: 'M.A. English',      exp: 10, desig: 'Senior Teacher',  dept: 'English',     phone: '+919800000022', email: 'prakash@demo-school.com' },
  { emp: 'EMP004', first: 'Rekha',     last: 'Patel',    gender: 'FEMALE', qual: 'M.Sc Chemistry',    exp: 5,  desig: 'Teacher',         dept: 'Science',     phone: '+919800000023', email: 'rekha@demo-school.com' },
  { emp: 'EMP005', first: 'Vijay',     last: 'Singh',    gender: 'MALE',   qual: 'M.A. Hindi',        exp: 7,  desig: 'Teacher',         dept: 'Hindi',       phone: '+919800000024', email: 'vijay@demo-school.com' },
  { emp: 'EMP006', first: 'Anita',     last: 'Gupta',    gender: 'FEMALE', qual: 'M.A. Social Sci',   exp: 9,  desig: 'Senior Teacher',  dept: 'Social',      phone: '+919800000025', email: 'anita@demo-school.com' },
  { emp: 'EMP007', first: 'Mohan',     last: 'Das',      gender: 'MALE',   qual: 'M.P.Ed',            exp: 4,  desig: 'PT Teacher',      dept: 'Sports',      phone: '+919800000026', email: 'mohan@demo-school.com' },
  { emp: 'EMP008', first: 'Kavitha',   last: 'Nair',     gender: 'FEMALE', qual: 'M.Sc Biology',      exp: 6,  desig: 'Teacher',         dept: 'Science',     phone: '+919800000027', email: 'kavitha@demo-school.com' },
  { emp: 'EMP009', first: 'Arun',      last: 'Menon',    gender: 'MALE',   qual: 'M.Sc Computer Sci', exp: 5,  desig: 'Computer Teacher',dept: 'Computer',    phone: '+919800000028', email: 'arun@demo-school.com' },
  { emp: 'EMP010', first: 'Deepa',     last: 'Joshi',    gender: 'FEMALE', qual: 'M.A. Sanskrit',     exp: 12, desig: 'Senior Teacher',  dept: 'Sanskrit',    phone: '+919800000029', email: 'deepa@demo-school.com' },
  { emp: 'EMP011', first: 'Suresh',    last: 'Rao',      gender: 'MALE',   qual: 'M.Com Accounts',    exp: 8,  desig: 'Commerce Teacher',dept: 'Commerce',    phone: '+919800000030', email: 'suresh.r@demo-school.com' },
  { emp: 'EMP012', first: 'Meena',     last: 'Kumari',   gender: 'FEMALE', qual: 'M.A. Arts',         exp: 3,  desig: 'Art Teacher',     dept: 'Arts',        phone: '+919800000031', email: 'meena@demo-school.com' },
];

const STAFF_DATA = [
  { emp: 'STAFF001', first: 'Suresh',  last: 'Patel',   desig: 'Office Administrator', dept: 'Administration', phone: '+919800000040', email: 'staff@demo-school.com' },
  { emp: 'STAFF002', first: 'Ganga',   last: 'Devi',    desig: 'Peon',                 dept: 'Housekeeping',   phone: '+919800000041', email: 'ganga@demo-school.com' },
  { emp: 'STAFF003', first: 'Raju',    last: 'Yadav',   desig: 'Security Guard',       dept: 'Security',       phone: '+919800000042', email: 'raju@demo-school.com' },
  { emp: 'STAFF004', first: 'Kamala',  last: 'Bai',     desig: 'Lab Assistant',        dept: 'Science Lab',    phone: '+919800000043', email: 'kamala@demo-school.com' },
  { emp: 'STAFF005', first: 'Bharat',  last: 'Sharma',  desig: 'Clerk',                dept: 'Administration', phone: '+919800000044', email: 'bharat@demo-school.com' },
];

const STUDENT_DATA = [
  // Class 10-A (6 students)
  { adm: 'ADM-2024-001', first: 'Aarav',    last: 'Sharma',    dob: '2009-03-15', gender: 'MALE',   cat: 'GENERAL', phone: '+919800000061', email: 'student1@demo-school.com', blood: 'B+' },
  { adm: 'ADM-2024-002', first: 'Priya',    last: 'Patel',     dob: '2009-07-22', gender: 'FEMALE', cat: 'OBC',     phone: '+919800000062', email: 'student2@demo-school.com', blood: 'A+' },
  { adm: 'ADM-2024-003', first: 'Rohit',    last: 'Gupta',     dob: '2009-11-08', gender: 'MALE',   cat: 'GENERAL', phone: '+919800000063', email: 'student3@demo-school.com', blood: 'O+' },
  { adm: 'ADM-2024-004', first: 'Sneha',    last: 'Verma',     dob: '2009-05-30', gender: 'FEMALE', cat: 'SC',      phone: '+919800000064', email: 'sneha@demo-school.com',    blood: 'AB+' },
  { adm: 'ADM-2024-005', first: 'Karan',    last: 'Singh',     dob: '2009-09-14', gender: 'MALE',   cat: 'GENERAL', phone: '+919800000065', email: 'karan@demo-school.com',    blood: 'B-' },
  { adm: 'ADM-2024-006', first: 'Ananya',   last: 'Reddy',     dob: '2009-01-25', gender: 'FEMALE', cat: 'OBC',     phone: '+919800000066', email: 'ananya@demo-school.com',   blood: 'O-' },
  // Class 10-B (4 students)
  { adm: 'ADM-2024-007', first: 'Vikram',   last: 'Malhotra',  dob: '2009-06-18', gender: 'MALE',   cat: 'GENERAL', phone: '+919800000067', email: 'vikram@demo-school.com',   blood: 'A-' },
  { adm: 'ADM-2024-008', first: 'Divya',    last: 'Nair',      dob: '2009-04-02', gender: 'FEMALE', cat: 'GENERAL', phone: '+919800000068', email: 'divya@demo-school.com',    blood: 'B+' },
  { adm: 'ADM-2024-009', first: 'Arjun',    last: 'Mehta',     dob: '2009-12-19', gender: 'MALE',   cat: 'EWS',     phone: '+919800000069', email: 'arjun@demo-school.com',    blood: 'A+' },
  { adm: 'ADM-2024-010', first: 'Pooja',    last: 'Iyer',      dob: '2009-08-07', gender: 'FEMALE', cat: 'OBC',     phone: '+919800000070', email: 'pooja@demo-school.com',    blood: 'O+' },
  // Class 9-A (4 students)
  { adm: 'ADM-2024-011', first: 'Rahul',    last: 'Joshi',     dob: '2010-02-14', gender: 'MALE',   cat: 'GENERAL', phone: '+919800000071', email: 'rahul@demo-school.com',    blood: 'B+' },
  { adm: 'ADM-2024-012', first: 'Swati',    last: 'Agarwal',   dob: '2010-09-28', gender: 'FEMALE', cat: 'GENERAL', phone: '+919800000072', email: 'swati@demo-school.com',    blood: 'AB-' },
  { adm: 'ADM-2024-013', first: 'Nikhil',   last: 'Bose',      dob: '2010-05-11', gender: 'MALE',   cat: 'SC',      phone: '+919800000073', email: 'nikhil@demo-school.com',   blood: 'A+' },
  { adm: 'ADM-2024-014', first: 'Kavya',    last: 'Pillai',    dob: '2010-11-30', gender: 'FEMALE', cat: 'OBC',     phone: '+919800000074', email: 'kavya@demo-school.com',    blood: 'O+' },
  // Class 8-A (3 students)
  { adm: 'ADM-2024-015', first: 'Siddharth',last: 'Pandey',    dob: '2011-03-22', gender: 'MALE',   cat: 'GENERAL', phone: '+919800000075', email: 'siddharth@demo-school.com',blood: 'B-' },
  { adm: 'ADM-2024-016', first: 'Tanvi',    last: 'Shah',      dob: '2011-07-16', gender: 'FEMALE', cat: 'GENERAL', phone: '+919800000076', email: 'tanvi@demo-school.com',    blood: 'A+' },
  { adm: 'ADM-2024-017', first: 'Yash',     last: 'Saxena',    dob: '2011-10-05', gender: 'MALE',   cat: 'ST',      phone: '+919800000077', email: 'yash@demo-school.com',     blood: 'O+' },
  // Class 11-A (2 students)
  { adm: 'ADM-2024-018', first: 'Ishaan',   last: 'Kapoor',    dob: '2008-01-30', gender: 'MALE',   cat: 'GENERAL', phone: '+919800000078', email: 'ishaan@demo-school.com',   blood: 'AB+' },
  { adm: 'ADM-2024-019', first: 'Riya',     last: 'Choudhary', dob: '2008-06-12', gender: 'FEMALE', cat: 'OBC',     phone: '+919800000079', email: 'riya@demo-school.com',     blood: 'B+' },
  // Class 12-A (1 student)
  { adm: 'ADM-2024-020', first: 'Abhishek', last: 'Tiwari',    dob: '2007-04-08', gender: 'MALE',   cat: 'GENERAL', phone: '+919800000080', email: 'abhishek@demo-school.com', blood: 'O-' },
];

const PARENT_DATA = [
  { first: 'Rajesh',    last: 'Sharma',    rel: 'FATHER', occ: 'Business',      income: 800000,  phone: '+919800000091', email: 'parent@demo-school.com',       studentIdx: 0 },
  { first: 'Meena',     last: 'Patel',     rel: 'MOTHER', occ: 'Teacher',       income: 600000,  phone: '+919800000092', email: 'meena.p@demo-school.com',      studentIdx: 1 },
  { first: 'Sunil',     last: 'Gupta',     rel: 'FATHER', occ: 'Engineer',      income: 1200000, phone: '+919800000093', email: 'sunil.g@demo-school.com',      studentIdx: 2 },
  { first: 'Nirmala',   last: 'Verma',     rel: 'MOTHER', occ: 'Homemaker',     income: 0,       phone: '+919800000094', email: 'nirmala.v@demo-school.com',    studentIdx: 3 },
  { first: 'Harish',    last: 'Singh',     rel: 'FATHER', occ: 'Doctor',        income: 2000000, phone: '+919800000095', email: 'harish.s@demo-school.com',     studentIdx: 4 },
  { first: 'Sunita',    last: 'Reddy',     rel: 'MOTHER', occ: 'Government Job',income: 750000,  phone: '+919800000096', email: 'sunita.r@demo-school.com',     studentIdx: 5 },
  { first: 'Ramesh',    last: 'Malhotra',  rel: 'FATHER', occ: 'Lawyer',        income: 1500000, phone: '+919800000097', email: 'ramesh.m@demo-school.com',     studentIdx: 6 },
  { first: 'Geeta',     last: 'Joshi',     rel: 'MOTHER', occ: 'Nurse',         income: 480000,  phone: '+919800000098', email: 'geeta.j@demo-school.com',      studentIdx: 10 },
];

// ─── MAIN ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('\n🌱 Starting comprehensive demo seed...\n');

  // ── Step 1: Academic Year ───────────────────────────────────────────────────
  console.log('📅 Academic structure...');
  let year = await db.academicYear.findFirst({ where: { name: '2024-2025' } });
  if (!year) {
    year = await db.academicYear.create({
      data: { name: '2024-2025', startDate: new Date('2024-04-01'), endDate: new Date('2025-03-31'), isCurrent: true },
    });
  }

  // ── Step 2: Classes & Sections ──────────────────────────────────────────────
  const classData = [
    { name: 'Class 8',  display: 'VIII', sort: 8  },
    { name: 'Class 9',  display: 'IX',   sort: 9  },
    { name: 'Class 10', display: 'X',    sort: 10 },
    { name: 'Class 11', display: 'XI',   sort: 11 },
    { name: 'Class 12', display: 'XII',  sort: 12 },
  ];

  const classes: any[] = [];
  for (const cd of classData) {
    const cls = await db.class.upsert({
      where: { name_academicYearId: { name: cd.name, academicYearId: year.id } },
      update: {},
      create: { name: cd.name, displayName: cd.display, academicYearId: year.id, sortOrder: cd.sort },
    });
    classes.push(cls);
  }

  // Create 2 sections per class (A and B)
  const sections: any[] = [];
  for (const cls of classes) {
    for (const secName of ['A', 'B']) {
      const sec = await db.section.upsert({
        where: { name_classId: { name: secName, classId: cls.id } },
        update: {},
        create: { name: secName, classId: cls.id, capacity: 40 },
      });
      sections.push(sec);
    }
  }
  // sections order: [8A,8B, 9A,9B, 10A,10B, 11A,11B, 12A,12B]
  const [sec8A, sec8B, sec9A, sec9B, sec10A, sec10B, sec11A, sec11B, sec12A, sec12B] = sections;

  // ── Step 3: Subjects (6 per class) ─────────────────────────────────────────
  console.log('📚 Subjects...');
  const subjectDefs = [
    { name: 'Mathematics',    type: 'THEORY',    maxM: 100, passM: 33 },
    { name: 'Science',        type: 'THEORY',    maxM: 100, passM: 33 },
    { name: 'English',        type: 'THEORY',    maxM: 100, passM: 33 },
    { name: 'Hindi',          type: 'LANGUAGE',  maxM: 100, passM: 33 },
    { name: 'Social Studies', type: 'THEORY',    maxM: 100, passM: 33 },
    { name: 'Computer',       type: 'PRACTICAL', maxM: 100, passM: 33 },
  ];

  const allSubjects: any[] = [];
  for (const cls of classes) {
    for (let i = 0; i < subjectDefs.length; i++) {
      const sd = subjectDefs[i];
      const code = `${sd.name.substring(0, 3).toUpperCase()}-${cls.sortOrder}-0${i + 1}`;
      const sub = await db.subject.upsert({
        where: { code_classId: { code, classId: cls.id } },
        update: {},
        create: {
          name: sd.name, code, classId: cls.id,
          subjectType: sd.type as any, maxMarks: sd.maxM, passMarks: sd.passM,
        },
      });
      allSubjects.push({ ...sub, classIdx: classes.indexOf(cls) });
    }
  }

  // Helper: get subjects for a class index (0=class8, 2=class10, etc.)
  const subjectsForClass = (classIdx: number) => allSubjects.filter(s => s.classIdx === classIdx);

  // ── Step 4: Teachers ────────────────────────────────────────────────────────
  console.log('👨‍🏫 Teachers...');
  const teachers: any[] = [];
  for (const td of TEACHER_DATA) {
    let user = await db.user.findFirst({ where: { OR: [{ email: td.email }, { phone: td.phone }] } });
    if (!user) {
      user = await db.user.create({
        data: { email: td.email, phone: td.phone, passwordHash: await h('Teacher@123'), role: 'TEACHER', isActive: true, isEmailVerified: true },
      });
    }
    const t = await db.teacher.upsert({
      where: { employeeId: td.emp },
      update: {},
      create: {
        userId: user.id, employeeId: td.emp, firstName: td.first, lastName: td.last,
        gender: td.gender as any, qualification: td.qual, experience: td.exp,
        joiningDate: daysAgo(td.exp * 365), designation: td.desig, department: td.dept,
        phone: td.phone, email: td.email, status: 'ACTIVE',
      },
    });
    teachers.push(t);
  }

  // Assign class teachers to sections
  const classteacherMap = [
    [sec8A, teachers[0]], [sec8B, teachers[1]],
    [sec9A, teachers[2]], [sec9B, teachers[3]],
    [sec10A, teachers[0]], [sec10B, teachers[4]],
    [sec11A, teachers[5]], [sec11B, teachers[6]],
    [sec12A, teachers[7]], [sec12B, teachers[8]],
  ];
  for (const [sec, t] of classteacherMap) {
    await db.section.update({ where: { id: sec.id }, data: { classTeacherId: t.id } });
  }

  // Assign teachers to subjects (teacher→subject mapping)
  const teacherSubjectMap: Array<[any, number]> = [
    [teachers[0], 0],  // Ramesh → Math (all classes)
    [teachers[1], 1],  // Sunita → Science
    [teachers[2], 2],  // Prakash → English
    [teachers[4], 3],  // Vijay → Hindi
    [teachers[5], 4],  // Anita → Social Studies
    [teachers[8], 5],  // Arun → Computer
    [teachers[3], 1],  // Rekha → Science (extra)
    [teachers[7], 1],  // Kavitha → Science (bio)
  ];

  for (const cls of classes) {
    const clsSubs = subjectsForClass(classes.indexOf(cls));
    for (const [t, subIdx] of teacherSubjectMap) {
      if (subIdx < clsSubs.length) {
        try {
          await db.teacherSubject.upsert({
            where: { teacherId_subjectId: { teacherId: t.id, subjectId: clsSubs[subIdx].id } },
            update: {},
            create: { teacherId: t.id, subjectId: clsSubs[subIdx].id, isPrimary: true },
          });
        } catch {}
      }
    }
  }

  // ── Step 5: Staff ───────────────────────────────────────────────────────────
  console.log('👷 Staff...');
  const staffList: any[] = [];
  for (const sd of STAFF_DATA) {
    let user = await db.user.findFirst({ where: { OR: [{ email: sd.email }, { phone: sd.phone }] } });
    if (!user) {
      user = await db.user.create({
        data: { email: sd.email, phone: sd.phone, passwordHash: await h('Staff@123'), role: 'STAFF', isActive: true },
      });
    }
    const s = await db.staff.upsert({
      where: { employeeId: sd.emp },
      update: {},
      create: {
        userId: user.id, employeeId: sd.emp, firstName: sd.first, lastName: sd.last,
        designation: sd.desig, department: sd.dept, joiningDate: daysAgo(365),
        phone: sd.phone, email: sd.email, status: 'ACTIVE',
      },
    });
    staffList.push(s);
  }

  // ── Step 6: Students & Parents ──────────────────────────────────────────────
  console.log('🎒 Students...');
  const studentObjects: any[] = [];
  // Section assignment: [10A×6, 10B×4, 9A×4, 8A×3, 11A×2, 12A×1]
  const sectionAssign = [
    sec10A, sec10A, sec10A, sec10A, sec10A, sec10A,  // 0-5
    sec10B, sec10B, sec10B, sec10B,                  // 6-9
    sec9A, sec9A, sec9A, sec9A,                      // 10-13
    sec8A, sec8A, sec8A,                             // 14-16
    sec11A, sec11A,                                  // 17-18
    sec12A,                                          // 19
  ];

  for (let i = 0; i < STUDENT_DATA.length; i++) {
    const sd = STUDENT_DATA[i];
    let user = await db.user.findFirst({ where: { OR: [{ email: sd.email }, { phone: sd.phone }] } });
    if (!user) {
      user = await db.user.create({
        data: { email: sd.email, phone: sd.phone, passwordHash: await h('Student@123'), role: 'STUDENT', isActive: true },
      });
    }
    const student = await db.student.upsert({
      where: { admissionNo: sd.adm },
      update: {},
      create: {
        userId: user.id, admissionNo: sd.adm,
        firstName: sd.first, lastName: sd.last,
        dateOfBirth: new Date(sd.dob), gender: sd.gender as any,
        bloodGroup: sd.blood, category: sd.cat as any,
        city: 'Mumbai', state: 'Maharashtra',
        admissionDate: daysAgo(180), status: 'ACTIVE',
        nationality: 'Indian', emergencyContact: sd.phone,
      },
    });
    studentObjects.push(student);

    // Section assignment
    try {
      await db.studentSection.upsert({
        where: { studentId_sectionId: { studentId: student.id, sectionId: sectionAssign[i].id } },
        update: {},
        create: { studentId: student.id, sectionId: sectionAssign[i].id, rollNo: String(i % 6 + 1).padStart(2, '0'), isActive: true },
      });
    } catch {}
  }

  // Parents
  console.log('👨‍👩‍👧 Parents...');
  for (const pd of PARENT_DATA) {
    let user = await db.user.findFirst({ where: { OR: [{ email: pd.email }, { phone: pd.phone }] } });
    if (!user) {
      user = await db.user.create({
        data: { email: pd.email, phone: pd.phone, passwordHash: await h('Parent@123'), role: 'PARENT', isActive: true },
      });
    }
    const parent = await db.parent.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id, firstName: pd.first, lastName: pd.last,
        relation: pd.rel as any, occupation: pd.occ, annualIncome: pd.income,
        phone: pd.phone, email: pd.email,
      },
    });
    const student = studentObjects[pd.studentIdx];
    if (student) {
      try {
        await db.studentParent.upsert({
          where: { studentId_parentId: { studentId: student.id, parentId: parent.id } },
          update: {},
          create: { studentId: student.id, parentId: parent.id, isPrimary: true },
        });
      } catch {}
    }
  }

  // ── Step 7: Grade Scales ────────────────────────────────────────────────────
  console.log('📊 Grade scales...');
  const gradeScales = [
    { name: 'A+', minPercent: 91, maxPercent: 100, gradePoint: 10.0, remark: 'Outstanding' },
    { name: 'A',  minPercent: 81, maxPercent: 90,  gradePoint: 9.0,  remark: 'Excellent' },
    { name: 'B+', minPercent: 71, maxPercent: 80,  gradePoint: 8.0,  remark: 'Very Good' },
    { name: 'B',  minPercent: 61, maxPercent: 70,  gradePoint: 7.0,  remark: 'Good' },
    { name: 'C',  minPercent: 51, maxPercent: 60,  gradePoint: 6.0,  remark: 'Average' },
    { name: 'D',  minPercent: 41, maxPercent: 50,  gradePoint: 5.0,  remark: 'Below Average' },
    { name: 'E',  minPercent: 33, maxPercent: 40,  gradePoint: 4.0,  remark: 'Satisfactory' },
    { name: 'F',  minPercent: 0,  maxPercent: 32,  gradePoint: 0.0,  remark: 'Fail' },
  ];
  for (const gs of gradeScales) {
    await db.gradeScale.upsert({
      where: { name: gs.name }, update: {},
      create: { ...gs, minPercent: gs.minPercent, maxPercent: gs.maxPercent, gradePoint: gs.gradePoint },
    });
  }

  // ── Step 8: Fee Structure ───────────────────────────────────────────────────
  console.log('💰 Fee structure...');
  const feeCategories = [
    { name: 'Tuition Fee',      desc: 'Monthly academic fee' },
    { name: 'Development Fee',  desc: 'School infrastructure' },
    { name: 'Exam Fee',         desc: 'Examination charges' },
    { name: 'Computer Fee',     desc: 'Lab usage charges' },
    { name: 'Sports Fee',       desc: 'Sports activities' },
    { name: 'Library Fee',      desc: 'Library access fee' },
  ];
  const feeCatObjs: any[] = [];
  for (const fc of feeCategories) {
    const cat = await db.feeCategory.upsert({
      where: { name: fc.name }, update: {},
      create: { name: fc.name, description: fc.desc, isActive: true },
    });
    feeCatObjs.push(cat);
  }

  // Fee structure per class (different amounts)
  const classFeeAmounts: Record<string, number[]> = {
    'Class 8':  [3000, 500, 300, 200, 200, 100],
    'Class 9':  [3500, 500, 300, 200, 200, 100],
    'Class 10': [4000, 500, 500, 200, 200, 100],
    'Class 11': [4500, 700, 500, 300, 200, 100],
    'Class 12': [5000, 700, 500, 300, 200, 100],
  };

  const feeStructures: any[] = [];
  for (const cls of classes) {
    const amounts = classFeeAmounts[cls.name];
    const totalAmount = amounts.reduce((a, b) => a + b, 0);

    try {
      const fs = await db.feeStructure.upsert({
        where: { classId_academicYearId: { classId: cls.id, academicYearId: year.id } },
        update: {},
        create: {
          name: `${cls.name} Annual Fee 2024-25`,
          classId: cls.id, academicYearId: year.id,
          totalAmount: totalAmount * 4, isActive: true,
          feeItems: {
            create: feeCatObjs.map((cat, i) => ({
              feeCategoryId: cat.id, amount: amounts[i], isMandatory: true,
            })),
          },
          feeInstallments: {
            create: [
              { installmentNo: 1, name: 'Term 1 (April-June)',     dueDate: new Date('2024-04-15'), amount: totalAmount, lateFinePerDay: 10 },
              { installmentNo: 2, name: 'Term 2 (July-Sep)',       dueDate: new Date('2024-07-15'), amount: totalAmount, lateFinePerDay: 10 },
              { installmentNo: 3, name: 'Term 3 (Oct-Dec)',        dueDate: new Date('2024-10-15'), amount: totalAmount, lateFinePerDay: 10 },
              { installmentNo: 4, name: 'Term 4 (Jan-Mar)',        dueDate: futureDays(30),         amount: totalAmount, lateFinePerDay: 10 },
            ],
          },
        },
      });
      feeStructures.push(fs);
    } catch {}
  }

  // Collect fee payments for students (Terms 1 & 2 paid, Term 3 partially, Term 4 pending)
  console.log('🧾 Fee payments...');
  const allInstallments = await db.feeInstallment.findMany({
    include: { feeStructure: { include: { class: true } } },
    orderBy: { installmentNo: 'asc' },
  });

  let receiptCounter = 1;
  for (let si = 0; si < studentObjects.length; si++) {
    const student = studentObjects[si];
    const sec = sectionAssign[si];
    const sectionWithClass = await db.section.findUnique({ where: { id: sec.id }, include: { class: true } });
    if (!sectionWithClass) continue;

    const studentInstallments = allInstallments.filter(
      i => i.feeStructure.classId === sectionWithClass.classId,
    );

    for (let ii = 0; ii < studentInstallments.length; ii++) {
      const inst = studentInstallments[ii];
      const receiptNo = `RCP-2024-${String(receiptCounter++).padStart(5, '0')}`;

      // Term 1 & 2: Fully paid
      if (ii < 2) {
        try {
          await db.feePayment.upsert({
            where: { receiptNo },
            update: {},
            create: {
              studentId: student.id, installmentId: inst.id,
              amount: inst.amount, discount: 0, fine: 0,
              payableAmount: inst.amount, paidAmount: inst.amount, dueAmount: 0,
              paymentMode: ii === 0 ? 'CASH' : 'UPI',
              receiptNo, paymentDate: ii === 0 ? daysAgo(180) : daysAgo(90),
              collectedBy: 'schooladmin@demo-school.com',
            },
          });
        } catch {}
      }
      // Term 3: 50% paid for half the students
      else if (ii === 2 && si % 2 === 0) {
        const paid = Number(inst.amount) * 0.5;
        try {
          await db.feePayment.upsert({
            where: { receiptNo },
            update: {},
            create: {
              studentId: student.id, installmentId: inst.id,
              amount: inst.amount, discount: 0, fine: 0,
              payableAmount: inst.amount, paidAmount: paid, dueAmount: paid,
              paymentMode: 'UPI',
              receiptNo, paymentDate: daysAgo(45),
              collectedBy: 'accountant@demo-school.com',
            },
          });
        } catch {}
      }
      // Term 4: Not paid (skip)
    }
  }

  // ── Step 9: Attendance (last 30 school days) ────────────────────────────────
  console.log('📋 Attendance records...');
  const attendanceProfiles = [
    100, 95, 90, 85, 92, 88, 100, 78, 96, 82,  // students 0-9
    94, 98, 72, 88, 100, 91, 86, 95, 89, 93,   // students 10-19
  ];

  for (let day = 30; day >= 1; day--) {
    const date = daysAgo(day);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) continue; // Skip weekends

    for (let si = 0; si < studentObjects.length; si++) {
      const student = studentObjects[si];
      const sec = sectionAssign[si];
      const presentPct = attendanceProfiles[si] || 90;
      const rand = Math.random() * 100;
      let status: string;
      if (rand < presentPct * 0.95) status = 'PRESENT';
      else if (rand < presentPct) status = 'LATE';
      else status = 'ABSENT';

      try {
        await db.attendance.upsert({
          where: { studentId_date_sectionId: { studentId: student.id, date, sectionId: sec.id } },
          update: {},
          create: { studentId: student.id, sectionId: sec.id, academicYearId: year.id, date, status: status as any, markedById: teachers[0].id },
        });
      } catch {}
    }
  }

  // Staff attendance (last 20 days)
  for (let day = 20; day >= 1; day--) {
    const date = daysAgo(day);
    const dow = date.getDay();
    if (dow === 0 || dow === 6) continue;
    for (const t of teachers) {
      const status = Math.random() > 0.05 ? 'PRESENT' : 'ABSENT';
      const checkIn = new Date(date); checkIn.setHours(8, randomBetween(0, 30), 0);
      const checkOut = new Date(date); checkOut.setHours(16, randomBetween(0, 30), 0);
      try {
        await db.staffAttendance.create({
          data: { teacherId: t.id, date, checkIn, checkOut, status: status as any },
        });
      } catch {}
    }
  }

  // ── Step 10: Exam Types, Schedules, Results ─────────────────────────────────
  console.log('📝 Examinations...');
  const examTypes: any[] = [];
  for (const et of [
    { name: 'Unit Test 1', shortName: 'UT1', sortOrder: 1 },
    { name: 'Mid Term',    shortName: 'MT',  sortOrder: 2 },
    { name: 'Unit Test 2', shortName: 'UT2', sortOrder: 3 },
    { name: 'Annual Exam', shortName: 'AE',  sortOrder: 4 },
  ]) {
    const obj = await db.examType.upsert({
      where: { name: et.name }, update: {},
      create: { name: et.name, shortName: et.shortName, sortOrder: et.sortOrder, isActive: true },
    });
    examTypes.push(obj);
  }

  // Create exam schedules for Class 10 (Unit Test 1 completed, Mid Term completed, UT2 upcoming)
  const cls10 = classes[2]; // Class 10
  const cls10Subjects = subjectsForClass(2);

  const examSchedules: any[] = [];
  const schedDefs = [
    { type: 0, name: 'Unit Test 1 - Class 10', start: daysAgo(120), end: daysAgo(115), published: true },
    { type: 1, name: 'Mid Term Exam - Class 10', start: daysAgo(60), end: daysAgo(53), published: true },
    { type: 2, name: 'Unit Test 2 - Class 10', start: futureDays(15), end: futureDays(20), published: true },
  ];

  for (const sd of schedDefs) {
    const sched = await db.examSchedule.create({
      data: {
        examTypeId: examTypes[sd.type].id, classId: cls10.id, academicYearId: year.id,
        name: sd.name, startDate: sd.start, endDate: sd.end, isPublished: sd.published,
        examTimetable: {
          create: cls10Subjects.map((sub, i) => ({
            subjectId: sub.id,
            examDate: new Date(sd.start.getTime() + i * 24 * 60 * 60 * 1000),
            startTime: '09:00', endTime: '12:00',
            venue: `Room ${100 + i}`, maxMarks: 100, passMarks: 33,
          })),
        },
      },
    });
    examSchedules.push(sched);
  }

  // Enter marks for UT1 and Mid Term
  const cls10Students = studentObjects.slice(0, 10); // First 10 are in class 10
  const scoreProfiles = [
    [88, 92, 78, 85, 79, 91],  // Aarav - good student
    [94, 89, 95, 88, 92, 96],  // Priya - excellent
    [72, 68, 74, 71, 69, 78],  // Rohit - average
    [85, 87, 82, 89, 84, 88],  // Sneha - good
    [56, 62, 58, 54, 61, 65],  // Karan - below avg
    [91, 95, 93, 90, 94, 97],  // Ananya - top performer
    [78, 82, 76, 80, 75, 83],  // Vikram
    [88, 86, 90, 85, 89, 91],  // Divya
    [65, 70, 68, 62, 72, 74],  // Arjun
    [79, 83, 77, 81, 80, 85],  // Pooja
  ];

  for (let si = 0; si < Math.min(cls10Students.length, 10); si++) {
    const student = cls10Students[si];
    const sec = sectionAssign[si]; // 0-5 in sec10A, 6-9 in sec10B

    for (let ei = 0; ei < 2; ei++) { // Only UT1 and Mid Term (completed)
      const sched = examSchedules[ei];
      for (let subI = 0; subI < cls10Subjects.length; subI++) {
        const sub = cls10Subjects[subI];
        const baseScore = scoreProfiles[si]?.[subI] ?? randomBetween(60, 90);
        const variation = ei === 0 ? 0 : randomBetween(-5, 8); // Mid term slightly higher
        const marksObtained = Math.min(100, Math.max(20, baseScore + variation));
        const pct = marksObtained;
        const g = grade(pct);

        try {
          await db.examResult.upsert({
            where: { studentId_examScheduleId_subjectId: { studentId: student.id, examScheduleId: sched.id, subjectId: sub.id } },
            update: {},
            create: {
              studentId: student.id, examScheduleId: sched.id, subjectId: sub.id, sectionId: sec.id,
              marksObtained, maxMarks: 100, grade: g.grade, gradePoint: g.gradePoint,
              isPass: g.isPass, isAbsent: false, enteredBy: teachers[0].id,
            },
          });
        } catch {}
      }
    }
  }

  // ── Step 11: Timetable ──────────────────────────────────────────────────────
  console.log('🗓️ Timetables...');
  const timeSlots = [
    { start: '08:00', end: '08:45' }, { start: '08:45', end: '09:30' },
    { start: '09:45', end: '10:30' }, { start: '10:30', end: '11:15' },
    { start: '11:30', end: '12:15' }, { start: '12:15', end: '13:00' },
  ];
  const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  for (let clsIdx = 0; clsIdx < classes.length; clsIdx++) {
    const cls = classes[clsIdx];
    const clsSubs = subjectsForClass(clsIdx);
    const clsSections = [sections[clsIdx * 2], sections[clsIdx * 2 + 1]];

    for (const sec of clsSections) {
      const tt = await db.timetable.create({
        data: { name: `${cls.name}-${sec.name} Timetable 2024-25`, sectionId: sec.id, effectiveFrom: new Date('2024-04-01'), isActive: true },
      });

      for (const day of days) {
        for (let slotI = 0; slotI < 6; slotI++) {
          const subIdx = slotI % clsSubs.length;
          const teacherSubj = teacherSubjectMap[subIdx % teacherSubjectMap.length];
          const teacher = teacherSubj[0];
          try {
            await db.timetableSlot.create({
              data: {
                timetableId: tt.id, sectionId: sec.id, subjectId: clsSubs[subIdx].id,
                teacherId: teacher.id, dayOfWeek: day as any,
                startTime: timeSlots[slotI].start, endTime: timeSlots[slotI].end,
                roomNo: `Room ${100 + clsIdx * 2 + (sec.name === 'A' ? 0 : 1)}`,
              },
            });
          } catch {}
        }
      }
    }
  }

  // ── Step 12: LMS ────────────────────────────────────────────────────────────
  console.log('📖 LMS content...');
  const cls10Math = cls10Subjects[0];
  const cls10Sci  = cls10Subjects[1];
  const cls10Eng  = cls10Subjects[2];

  // Assignments
  const assignmentDefs = [
    { title: 'Quadratic Equations Practice Set', desc: 'Solve all problems from Chapter 4 - Quadratic Equations (Ex 4.1 to 4.4)', sub: cls10Math, teacher: teachers[0], due: futureDays(7),  maxM: 20 },
    { title: 'Chemical Reactions Lab Report',    desc: 'Write a detailed lab report on the acid-base reaction experiment conducted in class', sub: cls10Sci,  teacher: teachers[1], due: futureDays(5),  maxM: 15 },
    { title: 'Essay: My Favorite Book',          desc: 'Write a 500-word essay on your favorite book and why it impacted you', sub: cls10Eng,  teacher: teachers[2], due: futureDays(10), maxM: 25 },
    { title: 'Statistics & Probability',         desc: 'Complete exercises from Chapter 14 on data handling and probability', sub: cls10Math, teacher: teachers[0], due: daysAgo(5),     maxM: 20 },
    { title: 'Carbon Compounds',                 desc: 'Prepare a chart showing the carbon compounds and their properties', sub: cls10Sci,  teacher: teachers[1], due: daysAgo(2),     maxM: 10 },
  ];

  for (const ad of assignmentDefs) {
    await db.assignment.create({
      data: { title: ad.title, description: ad.desc, subjectId: ad.sub.id, teacherId: ad.teacher.id, dueDate: ad.due, maxMarks: ad.maxM, isPublished: true },
    });
  }

  // Homework
  const hwDefs = [
    { title: 'NCERT Ex 4.2 - Questions 1 to 5', desc: 'Solve all 5 problems from Exercise 4.2', sub: cls10Math, teacher: teachers[0], due: futureDays(2) },
    { title: 'Read Chapter 3 - Metals & Non-metals', desc: 'Read the chapter and note down the properties of metals', sub: cls10Sci, teacher: teachers[1], due: futureDays(1) },
    { title: 'Grammar Practice - Tenses', desc: 'Complete the tenses worksheet given in class today', sub: cls10Eng, teacher: teachers[2], due: futureDays(3) },
    { title: 'Trigonometry Revision', desc: 'Revise all trigonometric identities and formulas for test', sub: cls10Math, teacher: teachers[0], due: futureDays(1) },
    { title: 'Draw Human Digestive System', desc: 'Draw a well-labelled diagram of the human digestive system', sub: cls10Sci, teacher: teachers[1], due: futureDays(4) },
    { title: 'Hindi Poem Memorization', desc: 'Learn the poem "Maati Wali" by heart for recitation tomorrow', sub: cls10Subjects[3], teacher: teachers[4], due: futureDays(1) },
  ];

  for (const hw of hwDefs) {
    await db.homework.create({
      data: { title: hw.title, description: hw.desc, subjectId: hw.sub.id, teacherId: hw.teacher.id, dueDate: hw.due, attachments: [] },
    });
  }

  // Study Materials
  const materialDefs = [
    { title: 'NCERT Mathematics Class 10 - Chapter 1 to 5 Notes', desc: 'Comprehensive notes for chapters 1-5', sub: cls10Math, type: 'PDF',   url: 'https://demo.schoolerp.com/materials/math-ch1-5.pdf', size: 2048576 },
    { title: 'Science Diagrams - Human Body Systems', desc: 'Labelled diagrams of all body systems', sub: cls10Sci,  type: 'PDF',   url: 'https://demo.schoolerp.com/materials/sci-diagrams.pdf', size: 3145728 },
    { title: 'English Literature - Poem Explanations', desc: 'Detailed explanation of all poems in the syllabus', sub: cls10Eng,  type: 'DOC',   url: 'https://demo.schoolerp.com/materials/eng-poems.docx', size: 524288 },
    { title: 'Algebra Basics - Video Tutorial', desc: 'Step-by-step video explanation of algebraic expressions', sub: cls10Math, type: 'VIDEO', url: 'https://youtu.be/demo-algebra', size: 0 },
    { title: 'Periodic Table - Revision PPT', desc: 'Interactive periodic table presentation', sub: cls10Sci,  type: 'PPT',   url: 'https://demo.schoolerp.com/materials/periodic-table.pptx', size: 1048576 },
    { title: 'Social Studies Map Work Guide', desc: 'Complete map marking guide for all chapters', sub: cls10Subjects[4], type: 'PDF', url: 'https://demo.schoolerp.com/materials/maps.pdf', size: 4194304 },
  ];

  for (const md of materialDefs) {
    await db.studyMaterial.create({
      data: { title: md.title, description: md.desc, subjectId: md.sub.id, type: md.type as any, fileUrl: md.url, fileSize: md.size, isPublished: true, uploadedBy: teachers[0].id },
    });
  }

  // Live Classes
  const lcDefs = [
    { title: 'Quadratic Equations - Doubt Session', teacher: teachers[0], sub: cls10Math, when: futureDays(2), dur: 60, plat: 'zoom', url: 'https://zoom.us/j/123456789', status: 'SCHEDULED' },
    { title: 'Organic Chemistry - Carbon Bonds',    teacher: teachers[1], sub: cls10Sci,  when: futureDays(3), dur: 45, plat: 'gmeet', url: 'https://meet.google.com/abc-defg-hij', status: 'SCHEDULED' },
    { title: 'English Speaking Practice Session',   teacher: teachers[2], sub: cls10Eng,  when: daysAgo(2),    dur: 45, plat: 'zoom', url: 'https://zoom.us/j/987654321', status: 'COMPLETED', recUrl: 'https://demo.schoolerp.com/recordings/eng-session.mp4' },
    { title: 'Mathematics Olympiad Preparation',    teacher: teachers[0], sub: cls10Math, when: futureDays(7), dur: 90, plat: 'zoom', url: 'https://zoom.us/j/111222333', status: 'SCHEDULED' },
    { title: 'LIVE: Mid Term Results Discussion',   teacher: teachers[0], sub: cls10Math, when: new Date(),     dur: 30, plat: 'gmeet', url: 'https://meet.google.com/xyz-abcd-efg', status: 'LIVE' },
  ];

  for (const lc of lcDefs) {
    await db.liveClass.create({
      data: { title: lc.title, teacherId: lc.teacher.id, platform: lc.plat, meetingUrl: lc.url, scheduledAt: lc.when, duration: lc.dur, status: lc.status as any, recordingUrl: (lc as any).recUrl || null },
    });
  }

  // Quizzes
  const quiz1 = await db.quiz.create({
    data: {
      title: 'Mathematics Chapter 1 Quiz',
      description: 'Test your understanding of Real Numbers',
      subjectId: cls10Math.id,
      duration: 15,
      maxMarks: 10,
      isPublished: true,
      startAt: daysAgo(10),
      endAt: futureDays(30),
      questions: {
        create: [
          { questionText: 'What is the HCF of 26 and 91?', questionType: 'MCQ', marks: 1, sortOrder: 1,
            options: [{ text: '13', isCorrect: true }, { text: '26', isCorrect: false }, { text: '7', isCorrect: false }, { text: '91', isCorrect: false }] },
          { questionText: 'Every composite number can be expressed as a product of primes. This is called:', questionType: 'MCQ', marks: 1, sortOrder: 2,
            options: [{ text: 'Fundamental Theorem of Arithmetic', isCorrect: true }, { text: "Euclid's Division Lemma", isCorrect: false }, { text: 'Prime Factorization', isCorrect: false }, { text: 'None of the above', isCorrect: false }] },
          { questionText: '√2 is an irrational number.', questionType: 'TRUE_FALSE', marks: 1, sortOrder: 3,
            options: [{ text: 'True', isCorrect: true }, { text: 'False', isCorrect: false }] },
          { questionText: 'The HCF of two numbers is 9 and their LCM is 2016. If one number is 144, find the other.', questionType: 'MCQ', marks: 2, sortOrder: 4,
            options: [{ text: '126', isCorrect: true }, { text: '144', isCorrect: false }, { text: '252', isCorrect: false }, { text: '63', isCorrect: false }] },
          { questionText: 'Which of the following is NOT a rational number?', questionType: 'MCQ', marks: 1, sortOrder: 5,
            options: [{ text: '√3', isCorrect: true }, { text: '0.333...', isCorrect: false }, { text: '7/2', isCorrect: false }, { text: '-5', isCorrect: false }] },
        ],
      },
    },
  });

  // ── Step 13: Announcements & Circulars ──────────────────────────────────────
  console.log('📢 Communications...');
  const announcements = [
    { title: '🎉 Annual Day Celebration - 25th March 2025', content: 'We are delighted to announce our Annual Day celebration on 25th March 2025. The event will feature cultural performances, prize distribution, and a special guest lecture. All students are requested to participate enthusiastically. Parents are cordially invited.', role: null },
    { title: '⚠️ Unit Test 2 Schedule Released', content: 'Unit Test 2 for Class 10 is scheduled from 15th January to 20th January 2025. Please check the detailed timetable on the notice board. Students are advised to start preparation immediately. Extra classes will be held on weekends.', role: 'STUDENT' },
    { title: '📚 Library Extended Hours', content: 'Library will remain open from 7:30 AM to 6:00 PM on all school days starting from 1st December. Students can use the library for self-study during free periods.', role: 'STUDENT' },
    { title: '💼 Parent-Teacher Meeting', content: 'Parent-Teacher Meeting is scheduled for 20th December 2024, Saturday from 9:00 AM to 1:00 PM. All parents are requested to attend compulsorily to discuss their ward\'s progress.', role: 'PARENT' },
    { title: '🏆 Congratulations to Science Olympiad Winners!', content: 'Our school students have won 3 Gold Medals and 2 Silver Medals at the National Science Olympiad. Congratulations to Priya Patel (1st Rank), Ananya Reddy (3rd Rank), and team!', role: null },
    { title: '🔔 Fee Payment Reminder', content: 'Term 3 fees are due by 15th October 2024. Late payment will attract a fine of ₹10 per day. Parents can pay online via UPI, Net Banking, or at the school office.', role: 'PARENT' },
    { title: '📋 Staff Meeting - Monday 9 AM', content: 'Mandatory staff meeting on Monday at 9:00 AM in the conference room. Agenda: Academic calendar review, exam schedule, and new teaching methodology workshop.', role: 'TEACHER' },
  ];

  for (const ann of announcements) {
    await db.announcement.create({
      data: { title: ann.title, content: ann.content, targetRole: ann.role as any, isPublished: true, publishedAt: daysAgo(randomBetween(1, 30)) },
    });
  }

  const circulars = [
    { no: 'CIR-2024-0001', title: 'School Timing Change - Winter Schedule', content: 'With effect from 1st December 2024, school will start at 8:30 AM instead of 7:30 AM due to winter season. School will end at 3:00 PM. Bus timings will be adjusted accordingly.', date: daysAgo(30) },
    { no: 'CIR-2024-0002', title: 'Uniform Policy - New Guidelines', content: 'As per the school management decision, new uniform guidelines are effective from 15th November. Sports uniform is mandatory on Wednesdays. Detailed guidelines attached.', date: daysAgo(20) },
    { no: 'CIR-2024-0003', title: 'Annual Sports Day - Registration Open', content: 'Annual Sports Day will be held on 10th January 2025. Students interested in participating should register by 20th December 2024. Events include: Athletics, Cricket, Football, Kabaddi, Chess.', date: daysAgo(15) },
    { no: 'CIR-2024-0004', title: 'Scholarship Applications 2024-25', content: 'Applications are invited for merit and need-based scholarships for the academic year 2024-25. Eligible students with 80% or above attendance and 70% or above marks may apply at the school office by 31st December 2024.', date: daysAgo(10) },
    { no: 'CIR-2024-0005', title: 'Emergency Contact Update', content: 'All parents are requested to update their emergency contact numbers at the school office or through the parent portal. This is mandatory for safety purposes.', date: daysAgo(5) },
  ];

  for (const circ of circulars) {
    try {
      await db.circular.upsert({
        where: { circularNo: circ.no }, update: {},
        create: { circularNo: circ.no, title: circ.title, content: circ.content, issuedDate: circ.date },
      });
    } catch {}
  }

  // ── Step 14: Transport ──────────────────────────────────────────────────────
  console.log('🚌 Transport...');
  const vehicles = [
    { no: 'MH-01-AB-1234', type: 'Bus',      model: 'Tata Starbus',     cap: 42, driver: 'Raju Yadav',   phone: '+919711111111', license: 'MH0120190012345' },
    { no: 'MH-01-CD-5678', type: 'Mini Bus', model: 'Force Traveller',  cap: 20, driver: 'Sanjay Kumar',  phone: '+919722222222', license: 'MH0120180056789' },
    { no: 'MH-01-EF-9012', type: 'Van',      model: 'Toyota Innova',    cap: 8,  driver: 'Mohan Shinde',  phone: '+919733333333', license: 'MH0120200078901' },
  ];

  const vehicleObjs: any[] = [];
  for (const v of vehicles) {
    try {
      const obj = await db.vehicle.upsert({
        where: { vehicleNo: v.no }, update: {},
        create: { vehicleNo: v.no, vehicleType: v.type, model: v.model, capacity: v.cap, driverName: v.driver, driverPhone: v.phone, driverLicense: v.license, isActive: true, insuranceExpiry: futureDays(180), fcExpiry: futureDays(90) },
      });
      vehicleObjs.push(obj);
    } catch {}
  }

  const routes = [
    { no: 'RT-01', name: 'Andheri - Bandra Route', start: 'Andheri East', end: 'Bandra West', mTime: '07:00', aTime: '14:30', fare: 1500, veh: 0, stops: ['Andheri Station', 'Jogeshwari', 'Juhu', 'Vile Parle', 'Santacruz', 'Bandra'] },
    { no: 'RT-02', name: 'Dadar - Kurla Route',    start: 'Dadar',        end: 'Kurla',       mTime: '07:15', aTime: '14:45', fare: 1200, veh: 1, stops: ['Dadar TT', 'Dharavi', 'Sion', 'Chunabhatti', 'Kurla Station'] },
    { no: 'RT-03', name: 'Powai - Ghatkopar',      start: 'Powai',        end: 'Ghatkopar',   mTime: '07:30', aTime: '15:00', fare: 1000, veh: 2, stops: ['IIT Powai', 'Vikhroli', 'Kanjurmarg', 'Ghatkopar'] },
  ];

  const routeObjs: any[] = [];
  for (const r of routes) {
    try {
      const obj = await db.route.create({
        data: {
          routeNo: r.no, name: r.name, vehicleId: vehicleObjs[r.veh]?.id, startPoint: r.start, endPoint: r.end,
          morningTime: r.mTime, afternoonTime: r.aTime, monthlyFare: r.fare, isActive: true,
          pickupPoints: {
            create: r.stops.map((stop, i) => ({ name: stop, morningTime: r.mTime, eveningTime: r.aTime, sortOrder: i + 1 })),
          },
        },
      });
      routeObjs.push(obj);
    } catch {}
  }

  // Allocate students to routes
  for (let i = 0; i < Math.min(6, studentObjects.length); i++) {
    const route = routeObjs[i % routeObjs.length];
    if (!route) continue;
    try {
      await db.transportAllocation.upsert({
        where: { studentId: studentObjects[i].id }, update: {},
        create: { studentId: studentObjects[i].id, routeId: route.id, pickupAddress: `${i + 1} Demo Colony, Mumbai`, isActive: true },
      });
    } catch {}
  }

  // ── Step 15: Hostel ─────────────────────────────────────────────────────────
  console.log('🏠 Hostel...');
  const hostels = [
    { name: 'Boys Hostel Block A', type: 'BOYS', cap: 100, warden: 'Mr. Suresh Warden', wPhone: '+919800000090' },
    { name: 'Girls Hostel Block B', type: 'GIRLS', cap: 80, warden: 'Mrs. Priya Matron', wPhone: '+919800000091' },
  ];

  const hostelObjs: any[] = [];
  for (const h of hostels) {
    try {
      // Check if exists first (name not unique in schema)
      let obj = await db.hostel.findFirst({ where: { name: h.name } });
      if (!obj) {
        obj = await db.hostel.create({
          data: { name: h.name, type: h.type, capacity: h.cap, wardenName: h.warden, wardenPhone: h.wPhone, isActive: true },
        });
      }
      hostelObjs.push(obj);
    } catch {}
  }

  // Rooms
  const hostelRoomObjs: any[] = [];
  for (const hostel of hostelObjs) {
    for (let rn = 1; rn <= 5; rn++) {
      const roomNo = `${hostel.type === 'BOYS' ? 'B' : 'G'}${String(rn).padStart(2, '0')}`;
      try {
        const room = await db.hostelRoom.upsert({
          where: { hostelId_roomNo: { hostelId: hostel.id, roomNo } },
          update: {},
          create: { hostelId: hostel.id, roomNo, floor: `Floor ${Math.ceil(rn / 2)}`, roomType: rn === 1 ? 'SINGLE' : 'DORM', capacity: rn === 1 ? 1 : 4, monthlyFare: rn === 1 ? 4000 : 2500, isActive: true },
        });
        hostelRoomObjs.push({ ...room, hostelType: hostel.type });
      } catch {}
    }
  }

  // Allocate 3 male students to boys hostel
  const boysRooms = hostelRoomObjs.filter(r => r.hostelType === 'BOYS');
  const maleStudents = studentObjects.filter((_, i) => STUDENT_DATA[i]?.gender === 'MALE').slice(0, 3);
  for (let i = 0; i < maleStudents.length; i++) {
    const room = boysRooms[i + 1]; // Skip room B01 (single)
    if (!room) continue;
    try {
      await db.hostelAllocation.upsert({
        where: { studentId: maleStudents[i].id }, update: {},
        create: { studentId: maleStudents[i].id, roomId: room.id, joinDate: daysAgo(180), isActive: true },
      });
    } catch {}
  }

  // ── Step 16: Library ────────────────────────────────────────────────────────
  console.log('📚 Library...');
  const bookCategories = ['Mathematics', 'Science', 'English Literature', 'History', 'Computer Science', 'Hindi', 'Reference'];
  const bookCatObjs: any[] = [];
  for (const bc of bookCategories) {
    const obj = await db.bookCategory.upsert({ where: { name: bc }, update: {}, create: { name: bc } });
    bookCatObjs.push(obj);
  }

  const books = [
    { isbn: '978-81-7450-791-3', title: 'NCERT Mathematics Class 10',       author: 'NCERT',           pub: 'NCERT Publications', catI: 0, copies: 15, shelf: 'A-01', price: 65 },
    { isbn: '978-81-7450-792-0', title: 'NCERT Science Class 10',            author: 'NCERT',           pub: 'NCERT Publications', catI: 1, copies: 15, shelf: 'B-01', price: 75 },
    { isbn: '978-81-7450-793-7', title: 'NCERT English First Flight',         author: 'NCERT',           pub: 'NCERT Publications', catI: 2, copies: 12, shelf: 'C-01', price: 55 },
    { isbn: '978-81-7450-794-4', title: 'Wings of Fire',                     author: 'A.P.J. Abdul Kalam', pub: 'Universities Press', catI: 2, copies: 8, shelf: 'C-02', price: 180 },
    { isbn: '978-81-7450-795-1', title: 'Discovery of India',                author: 'Jawaharlal Nehru', pub: 'Penguin Books',      catI: 3, copies: 5, shelf: 'D-01', price: 450 },
    { isbn: '978-81-7450-796-8', title: 'Computer Science with Python',       author: 'Sumita Arora',    pub: 'Dhanpat Rai',       catI: 4, copies: 10, shelf: 'E-01', price: 380 },
    { isbn: '978-81-7450-797-5', title: 'NCERT Hindi Kshitij Class 10',      author: 'NCERT',           pub: 'NCERT Publications', catI: 5, copies: 12, shelf: 'F-01', price: 55 },
    { isbn: '978-81-7450-798-2', title: 'Oxford Mathematics Dictionary',      author: 'Oxford Press',    pub: 'Oxford University',  catI: 6, copies: 3,  shelf: 'G-01', price: 750 },
    { isbn: '978-81-7450-799-9', title: 'The Alchemist',                     author: 'Paulo Coelho',    pub: 'HarperCollins',     catI: 2, copies: 6,  shelf: 'C-03', price: 250 },
    { isbn: '978-81-7450-800-2', title: 'RD Sharma Mathematics Class 10',    author: 'R.D. Sharma',     pub: 'Dhanpat Rai',       catI: 0, copies: 10, shelf: 'A-02', price: 420 },
    { isbn: '978-81-7450-801-9', title: 'HC Verma Concepts of Physics Vol 1', author: 'H.C. Verma',     pub: 'Bharati Bhawan',    catI: 1, copies: 8,  shelf: 'B-02', price: 390 },
    { isbn: '978-81-7450-802-6', title: 'India After Gandhi',                author: 'Ramachandra Guha',pub: 'HarperCollins',     catI: 3, copies: 4,  shelf: 'D-02', price: 699 },
  ];

  const bookObjs: any[] = [];
  for (const b of books) {
    const obj = await db.book.upsert({
      where: { isbn: b.isbn }, update: {},
      create: { isbn: b.isbn, title: b.title, author: b.author, publisher: b.pub, categoryId: bookCatObjs[b.catI].id, totalCopies: b.copies, availableCopies: b.copies - 2, shelfNo: b.shelf, price: b.price, isActive: true },
    });
    bookObjs.push(obj);
  }

  // Issue library cards and books
  for (let i = 0; i < 5; i++) {
    const student = studentObjects[i];
    const cardNo = `LIB-2024-${String(i + 1).padStart(4, '0')}`;
    try {
      const card = await db.libraryCard.upsert({
        where: { cardNo }, update: {},
        create: { studentId: student.id, cardNo, validTill: futureDays(365), isActive: true },
      });
      // Issue a book (returned)
      if (i < 3) {
        await db.bookIssue.create({
          data: { bookId: bookObjs[i].id, libraryCardId: card.id, issueDate: daysAgo(20), dueDate: daysAgo(6), returnDate: daysAgo(5), fine: 0, isReturned: true },
        });
      }
      // Issue a book (active/overdue)
      if (i >= 3) {
        await db.bookIssue.create({
          data: { bookId: bookObjs[i + 2].id, libraryCardId: card.id, issueDate: daysAgo(15), dueDate: daysAgo(1), fine: 10, finePerDay: 2, isReturned: false },
        });
      }
    } catch {}
  }

  // ── Step 17: HR & Payroll ───────────────────────────────────────────────────
  console.log('💼 HR & Payroll...');
  const salaryStructures = [
    { name: 'Senior Teacher Grade A', basic: 35000, hra: 8750, da: 3500, ta: 1500, other: 2000, pf: 4200, esi: 0, tds: 2500, gross: 50750, net: 44050 },
    { name: 'Teacher Grade B',        basic: 25000, hra: 6250, da: 2500, ta: 1200, other: 1500, pf: 3000, esi: 0, tds: 1500, gross: 36450, net: 31950 },
    { name: 'Staff Grade C',          basic: 15000, hra: 3750, da: 1500, ta: 800,  other: 500,  pf: 1800, esi: 390, tds: 0,   gross: 21550, net: 19360 },
  ];

  const salStructObjs: any[] = [];
  for (const ss of salaryStructures) {
    const obj = await db.salaryStructure.upsert({
      where: { name: ss.name }, update: {},
      create: { name: ss.name, basic: ss.basic, hra: ss.hra, da: ss.da, ta: ss.ta, otherAllowance: ss.other, pf: ss.pf, esi: ss.esi, tds: ss.tds, grossSalary: ss.gross, netSalary: ss.net, isActive: true },
    });
    salStructObjs.push(obj);
  }

  // Process salaries for Nov & Oct
  for (const t of teachers.slice(0, 6)) {
    const struct = t.designation?.includes('Senior') ? salStructObjs[0] : salStructObjs[1];
    for (const monthDef of [{ month: 10, year: 2024, status: 'PAID' }, { month: 11, year: 2024, status: 'PAID' }, { month: 12, year: 2024, status: 'PENDING' }]) {
      try {
        await db.salary.upsert({
          where: { teacherId_month_year: { teacherId: t.id, month: monthDef.month, year: monthDef.year } },
          update: {},
          create: {
            teacherId: t.id, salaryStructureId: struct.id,
            month: monthDef.month, year: monthDef.year,
            workingDays: 26, presentDays: monthDef.status === 'PENDING' ? 20 : 25, leaveDays: monthDef.status === 'PENDING' ? 6 : 1,
            basicPaid: struct.basic, allowances: Number(struct.hra) + Number(struct.da) + Number(struct.ta), deductions: Number(struct.pf) + Number(struct.esi),
            grossSalary: struct.grossSalary, netSalary: struct.netSalary,
            status: monthDef.status as any,
            paymentDate: monthDef.status === 'PAID' ? new Date(`${monthDef.year}-${String(monthDef.month + 1).padStart(2, '0')}-01`) : null,
          },
        });
      } catch {}
    }
  }

  // Leave applications
  const leaveApps = [
    { teacherIdx: 1, type: 'MEDICAL', from: daysAgo(10), to: daysAgo(8), days: 3, reason: 'Fever and cold', status: 'APPROVED' },
    { teacherIdx: 3, type: 'CASUAL',  from: daysAgo(5),  to: daysAgo(5), days: 1, reason: 'Family function', status: 'APPROVED' },
    { teacherIdx: 5, type: 'EARNED',  from: futureDays(10), to: futureDays(12), days: 3, reason: 'Vacation', status: 'PENDING' },
    { teacherIdx: 2, type: 'CASUAL',  from: futureDays(5),  to: futureDays(5),  days: 1, reason: 'Personal work', status: 'PENDING' },
  ];

  for (const la of leaveApps) {
    await db.leaveApplication.create({
      data: {
        teacherId: teachers[la.teacherIdx].id,
        leaveType: la.type as any, fromDate: la.from, toDate: la.to, days: la.days,
        reason: la.reason, status: la.status as any,
        approvedBy: la.status === 'APPROVED' ? 'schooladmin@demo-school.com' : null,
      },
    });
  }

  // ── Step 18: Accounting ─────────────────────────────────────────────────────
  console.log('💹 Accounting...');
  const accountHeads = [
    { name: 'Tuition Fee Income',     code: 'INC-001', type: 'INCOME' },
    { name: 'Development Fee Income', code: 'INC-002', type: 'INCOME' },
    { name: 'Transport Fee Income',   code: 'INC-003', type: 'INCOME' },
    { name: 'Hostel Fee Income',      code: 'INC-004', type: 'INCOME' },
    { name: 'Salary Expense',         code: 'EXP-001', type: 'EXPENSE' },
    { name: 'Electricity Expense',    code: 'EXP-002', type: 'EXPENSE' },
    { name: 'Maintenance Expense',    code: 'EXP-003', type: 'EXPENSE' },
    { name: 'Stationery Expense',     code: 'EXP-004', type: 'EXPENSE' },
    { name: 'Cash in Hand',          code: 'AST-001', type: 'ASSET' },
    { name: 'Bank Account - HDFC',   code: 'AST-002', type: 'ASSET' },
  ];

  const ahObjs: any[] = [];
  for (const ah of accountHeads) {
    const obj = await db.accountHead.upsert({
      where: { code: ah.code }, update: {},
      create: { name: ah.name, code: ah.code, type: ah.type as any, isActive: true },
    });
    ahObjs.push(obj);
  }

  // Transactions (last 3 months)
  const txnDefs = [
    { ahIdx: 0, type: 'CREDIT', amount: 180000, desc: 'Term 2 Tuition Fee Collection - Class 10', date: daysAgo(90), ref: 'TERM2-OCT-2024' },
    { ahIdx: 1, type: 'CREDIT', amount: 25000,  desc: 'Development Fee - Q2 2024',                date: daysAgo(85), ref: 'DEV-Q2-2024' },
    { ahIdx: 2, type: 'CREDIT', amount: 45000,  desc: 'Transport Fee - October 2024',             date: daysAgo(80), ref: 'TRANS-OCT-2024' },
    { ahIdx: 4, type: 'DEBIT',  amount: 250000, desc: 'Staff Salary - October 2024',              date: daysAgo(75), ref: 'SAL-OCT-2024' },
    { ahIdx: 5, type: 'DEBIT',  amount: 18500,  desc: 'Electricity Bill - October 2024',          date: daysAgo(70), ref: 'ELEC-OCT-2024' },
    { ahIdx: 6, type: 'DEBIT',  amount: 12000,  desc: 'Annual Maintenance - AC Servicing',        date: daysAgo(65), ref: 'MAINT-NOV-2024' },
    { ahIdx: 0, type: 'CREDIT', amount: 175000, desc: 'Term 3 Tuition Fee - Partial Collection',  date: daysAgo(45), ref: 'TERM3-NOV-2024' },
    { ahIdx: 3, type: 'CREDIT', amount: 30000,  desc: 'Hostel Fee Collection - November 2024',    date: daysAgo(40), ref: 'HOSTEL-NOV-2024' },
    { ahIdx: 4, type: 'DEBIT',  amount: 255000, desc: 'Staff Salary - November 2024',             date: daysAgo(35), ref: 'SAL-NOV-2024' },
    { ahIdx: 5, type: 'DEBIT',  amount: 17800,  desc: 'Electricity Bill - November 2024',         date: daysAgo(30), ref: 'ELEC-NOV-2024' },
    { ahIdx: 7, type: 'DEBIT',  amount: 8500,   desc: 'Stationery Purchase - Exam Copies',        date: daysAgo(20), ref: 'STAT-DEC-2024' },
    { ahIdx: 6, type: 'DEBIT',  amount: 45000,  desc: 'School Bus Repair & Maintenance',          date: daysAgo(15), ref: 'BUS-REPAIR-2024' },
  ];

  for (let i = 0; i < txnDefs.length; i++) {
    const td = txnDefs[i];
    await db.transaction.create({
      data: {
        accountHeadId: ahObjs[td.ahIdx].id, date: td.date,
        type: td.type as any, amount: td.amount,
        description: td.desc, reference: td.ref,
        voucherNo: `V-2024-${String(i + 1).padStart(4, '0')}`,
      },
    });
  }

  // Expenses
  const expenses = [
    { cat: 'Salary',       amount: 250000, desc: 'Staff Salary - October 2024',   date: daysAgo(75), mode: 'NETBANKING' },
    { cat: 'Electricity',  amount: 18500,  desc: 'MSEB Electricity Bill Oct-2024', date: daysAgo(70), mode: 'NETBANKING' },
    { cat: 'Maintenance',  amount: 12000,  desc: 'AC & Plumbing Maintenance',      date: daysAgo(60), mode: 'CASH' },
    { cat: 'Stationery',   amount: 8500,   desc: 'Exam papers, pens, markers',     date: daysAgo(20), mode: 'CASH' },
    { cat: 'Transport',    amount: 45000,  desc: 'Bus diesel & maintenance',        date: daysAgo(15), mode: 'CHEQUE' },
    { cat: 'Salary',       amount: 255000, desc: 'Staff Salary - November 2024',   date: daysAgo(35), mode: 'NETBANKING' },
    { cat: 'Electricity',  amount: 17800,  desc: 'MSEB Electricity Bill Nov-2024', date: daysAgo(30), mode: 'NETBANKING' },
    { cat: 'Sports',       amount: 15000,  desc: 'Sports equipment - Annual Day',  date: daysAgo(25), mode: 'CASH' },
    { cat: 'Library',      amount: 22000,  desc: 'New books purchase Q3',          date: daysAgo(40), mode: 'CHEQUE' },
    { cat: 'Events',       amount: 35000,  desc: 'Annual Day arrangements',         date: daysAgo(10), mode: 'CASH' },
  ];

  for (const exp of expenses) {
    await db.expense.create({
      data: { category: exp.cat, amount: exp.amount, description: exp.desc, date: exp.date, paymentMode: exp.mode },
    });
  }

  // ── Step 19: Scholarships ───────────────────────────────────────────────────
  console.log('🎓 Scholarships...');
  const scholarships = [
    { name: 'Merit Scholarship (90%+)',    percentage: 25, criteria: 'Students scoring 90% or above in previous year' },
    { name: 'Sports Excellence Award',     percentage: 50, criteria: 'State/National level sports participants' },
    { name: 'RTE Scholarship',             percentage: 100, criteria: 'Students admitted under Right to Education act' },
    { name: 'Need-Based Financial Aid',    percentage: 30, criteria: 'Family income below ₹2.5 lakh per annum' },
    { name: 'Single Parent Scholarship',  percentage: 20, criteria: 'Students from single-parent families' },
  ];

  for (const s of scholarships) {
    const exists = await db.scholarship.findFirst({ where: { name: s.name } });
    if (!exists) {
      await db.scholarship.create({ data: { name: s.name, percentage: s.percentage, criteria: s.criteria, isActive: true } });
    }
  }

  // ── Done ────────────────────────────────────────────────────────────────────
  console.log('\n✅ Demo seed completed successfully!\n');
  console.log('═'.repeat(60));
  console.log('📊 DEMO DATA SUMMARY');
  console.log('═'.repeat(60));
  console.log(`  👨‍🎓 Students:       ${STUDENT_DATA.length} (across 5 classes)`);
  console.log(`  👨‍🏫 Teachers:       ${TEACHER_DATA.length}`);
  console.log(`  👷 Staff:          ${STAFF_DATA.length}`);
  console.log(`  👨‍👩‍👧 Parents:        ${PARENT_DATA.length}`);
  console.log(`  📚 Subjects:       ${classes.length * subjectDefs.length} (6 per class)`);
  console.log(`  📋 Attendance:     30 days × ${STUDENT_DATA.length} students`);
  console.log(`  📝 Exams:          3 (UT1 ✅, Mid Term ✅, UT2 upcoming)`);
  console.log(`  💰 Fee Payments:   Terms 1 & 2 paid, Term 3 partial`);
  console.log(`  📖 LMS:            5 assignments, 6 homework, 6 materials, 5 live classes, 1 quiz`);
  console.log(`  📢 Communication:  7 announcements, 5 circulars`);
  console.log(`  🚌 Transport:      3 vehicles, 3 routes, 6 student allocations`);
  console.log(`  🏠 Hostel:         2 hostels, 10 rooms, 3 allocations`);
  console.log(`  📚 Library:        12 books, 5 library cards, 5 issues`);
  console.log(`  💼 Payroll:        3 salary structures, 18 salary records`);
  console.log(`  💹 Accounting:     10 account heads, 12 transactions, 10 expenses`);
  console.log(`  🎓 Scholarships:   5 scholarship types`);
  console.log('═'.repeat(60));
}

main()
  .catch(e => { console.error('❌ Demo seed failed:', e.message); process.exit(1); })
  .finally(() => db.$disconnect());
