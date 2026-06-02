# Complete Demo Credentials & Testing Guide

## Step 1: Run Seeds (after backend npm install completes)

```bash
cd d:\schoolmanagement\backend

# Install dependencies (if not done)
npm install

# Generate Prisma clients
npm run prisma:generate

# Run database migrations
npm run prisma:migrate:central

# Seed all data (3 scripts in sequence)
npm run seed:all
```

Or run individually:
```bash
npm run prisma:seed     # Platform: super admin, demo school, plans
npm run seed:users      # All role users
npm run seed:demo       # Full demo data (students, fees, exams, etc.)
```

---

## Step 2: Start Servers

```bash
# Terminal 1 — Backend
cd d:\schoolmanagement\backend
npm run start:dev
# → http://localhost:4000
# → Swagger: http://localhost:4000/api/docs

# Terminal 2 — Frontend
cd d:\schoolmanagement\frontend
npm run dev
# → http://localhost:3000
```

---

## ALL LOGIN CREDENTIALS

### 🔑 PLATFORM LEVEL
> Login URL: http://localhost:3000/super-admin/login

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@schoolerp.com | SuperAdmin@123 |
| Reseller | reseller@schoolerp.com | Reseller@123 |
| Finance | finance@schoolerp.com | Finance@123 |

---

### 🏫 SCHOOL LEVEL
> Login URL: http://localhost:3000/login
> **School ID: `demo-school`** (required field)

| Role | Email | Password | Name |
|------|-------|----------|------|
| School Admin | schooladmin@demo-school.com | SchoolAdmin@123 | School Administrator |
| Teacher 1 | teacher@demo-school.com | Teacher@123 | Ramesh Kumar (Math) |
| Teacher 2 | sunita@demo-school.com | Teacher@123 | Sunita Sharma (Science) |
| Teacher 3 | prakash@demo-school.com | Teacher@123 | Prakash Verma (English) |
| Student 1 | student1@demo-school.com | Student@123 | Aarav Sharma (10-A, Roll:01) |
| Student 2 | student2@demo-school.com | Student@123 | Priya Patel (10-A, Roll:02) |
| Student 3 | student3@demo-school.com | Student@123 | Rohit Gupta (10-A, Roll:03) |
| Parent | parent@demo-school.com | Parent@123 | Rajesh Sharma (Aarav's Father) |
| Accountant | accountant@demo-school.com | Accountant@123 | Accountant |
| Librarian | librarian@demo-school.com | Librarian@123 | Librarian |
| Staff | staff@demo-school.com | Staff@123 | Suresh Patel (Admin) |
| Transport Mgr | transport@demo-school.com | Transport@123 | Transport Manager |
| Hostel Warden | warden@demo-school.com | Warden@123 | Hostel Warden |

---

## DEMO DATA OVERVIEW

### 📚 Academic Structure
- **5 Classes**: Class 8 to Class 12
- **2 Sections each**: A and B (10 sections total)
- **6 Subjects per class**: Mathematics, Science, English, Hindi, Social Studies, Computer
- **Academic Year**: 2024-2025 (current)

### 👨‍🏫 Staff
- **12 Teachers** with departments and subjects assigned
- **5 Non-Teaching Staff** (Administrator, Security, Lab, Clerk, Peon)
- Class teachers assigned to all sections

### 🎒 Students (20 total)
- Class 10-A: Aarav, Priya, Rohit, Sneha, Karan, Ananya (6 students)
- Class 10-B: Vikram, Divya, Arjun, Pooja (4 students)
- Class 9-A: Rahul, Swati, Nikhil, Kavya (4 students)
- Class 8-A: Siddharth, Tanvi, Yash (3 students)
- Class 11-A: Ishaan, Riya (2 students)
- Class 12-A: Abhishek (1 student)

### 💰 Fees
- Different fee structures per class (₹4,300 to ₹6,300/term for Class 8-12)
- 4 installments (Term 1-4)
- **Terms 1 & 2**: Fully paid for all students
- **Term 3**: 50% paid for alternate students (creates realistic due/pending status)
- **Term 4**: Pending (upcoming)
- Fee categories: Tuition, Development, Exam, Computer, Sports, Library

### 📋 Attendance
- 30 school days recorded for all 20 students
- Realistic attendance profiles (72%-100% across students)
- Staff attendance for last 20 days

### 📝 Examinations (Class 10)
- **Unit Test 1** (120 days ago) - Results entered ✅
- **Mid Term** (60 days ago) - Results entered ✅
- **Unit Test 2** (in 15 days) - Scheduled, no marks yet
- Grade scale: A+ (91-100) to F (0-32)
- Realistic score profiles showing toppers and average students

### 📖 LMS Content
- 5 Assignments (3 active, 2 overdue)
- 6 Homework assignments (due today/tomorrow)
- 6 Study Materials (PDF, PPT, DOC, Video)
- 5 Live Classes (1 LIVE now, 3 scheduled, 1 completed with recording)
- 1 Quiz with 5 MCQ questions

### 📢 Communication
- 7 Announcements (Annual Day, Exam schedule, Library hours, PTM, Awards, Fee reminder, Staff meeting)
- 5 Circulars (School timing, Uniform policy, Sports Day, Scholarship, Emergency contact)

### 🚌 Transport
- 3 Vehicles: Bus (42 seats), Mini Bus (20 seats), Van (8 seats)
- 3 Routes: Andheri-Bandra, Dadar-Kurla, Powai-Ghatkopar
- 6 students allocated to routes
- Pickup points with timings

### 🏠 Hostel
- Boys Hostel Block A (100 capacity, 5 rooms)
- Girls Hostel Block B (80 capacity, 5 rooms)
- 3 male students allocated to Boys Hostel

### 📚 Library
- 12 books across 7 categories
- 5 library cards issued
- 3 returned books, 2 active issues (1 overdue with ₹10 fine)

### 💼 HR & Payroll
- 3 salary structures (Senior Teacher, Teacher, Staff)
- Oct & Nov salaries: PAID; Dec salary: PENDING
- 4 leave applications (2 approved, 2 pending)

### 💹 Accounting
- 10 account heads (Income, Expense, Asset types)
- 12 transactions (fee collections + expenses)
- 10 expense records (salary, electricity, maintenance, etc.)
- Balance shows realistic income vs expense

### 🎓 Scholarships
- 5 scholarship types (Merit, Sports, RTE, Need-based, Single Parent)

---

## WHAT TO SHOW IN DEMO (Suggested Flow)

### 1. Super Admin Tour (5 min)
- Login → admin@schoolerp.com
- Dashboard → School stats, revenue chart
- Schools → Show demo-school details
- Plans → 5 subscription plans
- Resellers → Earnings model (₹30K-₹2.5L/month)
- White Label → Change school colors/logo
- System Settings → SMTP, Payment gateway config

### 2. School Admin Tour (10 min)
- Login → schooladmin@demo-school.com / School ID: demo-school
- Dashboard → Students, Fee, Attendance charts + Recent Activity
- Students → List 20 students → Click Aarav Sharma → Profile view
- Attendance → Select 10-A → Today's attendance marking demo
- Fees → Show Term-wise payment status → Collect Fee demo
- Exams → Published schedules → Mid Term results
- Notice Board → Create announcement demo

### 3. Teacher View (3 min)
- Login → teacher@demo-school.com / demo-school
- Dashboard → My subjects, pending evaluations
- Attendance → Mark 10-A attendance
- LMS → View assignments, mark homework

### 4. Parent/Student View (3 min)
- Login → parent@demo-school.com / demo-school
- View child's attendance (87% Aarav)
- Fee dues — Term 3 partial, Term 4 pending
- Exam results — Mid term marks
- Circulars and announcements

### 5. Mobile App Demo (5 min)
- Parent App → Dashboard → Quick stats
- Attendance screen → Monthly view
- Fees screen → Payment history + dues
- Timetable → Week view with subjects
- More → Results, Chat, Library, Profile

---

## API Testing via Swagger
```
http://localhost:4000/api/docs
```
1. POST `/api/v1/auth/super-admin/login` with admin credentials
2. Copy `accessToken`
3. Click Authorize → paste token
4. For school APIs: Header `x-tenant-id: demo-school`
