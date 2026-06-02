import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { RootState } from './app/store';
import { lightTheme, darkTheme } from './theme';
import { useNotificationSocket } from './hooks/useSocket';

// Layouts
const DashboardLayout = lazy(() => import('./components/layout/DashboardLayout'));
const AuthLayout = lazy(() => import('./components/layout/AuthLayout'));

// Auth Pages
const LoginPage = lazy(() => import('./pages/auth/LoginPage'));
const SuperAdminLogin = lazy(() => import('./pages/auth/SuperAdminLogin'));

// Super Admin Pages
const SuperAdminDashboard = lazy(() => import('./pages/super-admin/Dashboard'));
const SchoolsPage = lazy(() => import('./pages/super-admin/SchoolsPage'));
const PlansPage = lazy(() => import('./pages/super-admin/PlansPage'));
const RevenuePage = lazy(() => import('./pages/super-admin/RevenuePage'));
const AuditLogsPage = lazy(() => import('./pages/super-admin/AuditLogsPage'));
const ResellersPage = lazy(() => import('./pages/super-admin/ResellersPage'));
const SystemSettingsPage = lazy(() => import('./pages/super-admin/SystemSettingsPage'));
const WhiteLabelPage = lazy(() => import('./pages/super-admin/WhiteLabelPage'));

// School Admin Pages
const SchoolDashboard = lazy(() => import('./pages/school-admin/Dashboard'));
const CommunicationPage = lazy(() => import('./pages/school-admin/communication/CommunicationPage'));
const TimetablePage = lazy(() => import('./pages/school-admin/academic/TimetablePage'));
const StudentsPage = lazy(() => import('./pages/school-admin/students/StudentsPage'));
const StudentDetailPage = lazy(() => import('./pages/school-admin/students/StudentDetailPage'));
const AdmissionPage = lazy(() => import('./pages/school-admin/students/AdmissionPage'));
const TeachersPage = lazy(() => import('./pages/school-admin/teachers/TeachersPage'));
const AttendancePage = lazy(() => import('./pages/school-admin/attendance/AttendancePage'));
const FeesPage = lazy(() => import('./pages/school-admin/fees/FeesPage'));
const FeeCollectionPage = lazy(() => import('./pages/school-admin/fees/FeeCollectionPage'));
const ExamsPage = lazy(() => import('./pages/school-admin/exams/ExamsPage'));
const MarksEntryPage = lazy(() => import('./pages/school-admin/exams/MarksEntryPage'));
const LmsPage = lazy(() => import('./pages/school-admin/lms/LmsPage'));
const LibraryPage = lazy(() => import('./pages/school-admin/library/LibraryPage'));
const TransportPage = lazy(() => import('./pages/school-admin/transport/TransportPage'));
const HrPayrollPage = lazy(() => import('./pages/school-admin/hr/HrPayrollPage'));
const AccountingPage = lazy(() => import('./pages/school-admin/accounting/AccountingPage'));
const ReportsPage = lazy(() => import('./pages/school-admin/reports/ReportsPage'));
const SettingsPage = lazy(() => import('./pages/school-admin/SettingsPage'));

// Student Portal
const StudentDashboard = lazy(() => import('./pages/student/StudentDashboard'));
const StudentResults = lazy(() => import('./pages/student/StudentResults'));
const StudentLMS = lazy(() => import('./pages/student/StudentLMS'));

// Teacher Portal
const TeacherDashboard = lazy(() => import('./pages/teacher/TeacherDashboard'));
const TeacherAttendance = lazy(() => import('./pages/teacher/TeacherAttendance'));

// Reseller Portal
const ResellerPortal = lazy(() => import('./pages/reseller/ResellerPortal'));
const ResellerSchoolsPage = lazy(() => import('./pages/reseller/ResellerSchoolsPage'));
const ResellerCommissionsPage = lazy(() => import('./pages/reseller/ResellerCommissionsPage'));
const ResellerEarningsPage = lazy(() => import('./pages/reseller/ResellerEarningsPage'));
const ResellerLogin = lazy(() => import('./pages/auth/ResellerLogin'));

// Hostel Page
const HostelPage = lazy(() => import('./pages/school-admin/hostel/HostelPage'));

// Guards
import { ProtectedRoute } from './components/common/ProtectedRoute';

const LoadingScreen = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress size={48} />
  </Box>
);

function AppWithSocket() {
  useNotificationSocket(); // Initialize socket based on auth state
  return null;
}

export default function App() {
  const { darkMode } = useSelector((state: RootState) => state.ui);
  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppWithSocket />
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            {/* Auth Routes */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/super-admin/login" element={<SuperAdminLogin />} />
            </Route>

            {/* Super Admin Routes */}
            <Route element={<ProtectedRoute requiredRole="platform" />}>
              <Route element={<DashboardLayout role="super-admin" />}>
                <Route path="/super-admin" element={<SuperAdminDashboard />} />
                <Route path="/super-admin/schools" element={<SchoolsPage />} />
                <Route path="/super-admin/plans" element={<PlansPage />} />
                <Route path="/super-admin/revenue" element={<RevenuePage />} />
                <Route path="/super-admin/audit-logs" element={<AuditLogsPage />} />
                <Route path="/super-admin/resellers" element={<ResellersPage />} />
                <Route path="/super-admin/system-settings" element={<SystemSettingsPage />} />
                <Route path="/super-admin/white-label" element={<WhiteLabelPage />} />
              </Route>
            </Route>

            {/* School Admin Routes */}
            <Route element={<ProtectedRoute requiredRole="school" />}>
              <Route element={<DashboardLayout role="school-admin" />}>
                <Route path="/dashboard" element={<SchoolDashboard />} />
                <Route path="/students" element={<StudentsPage />} />
                <Route path="/students/new" element={<AdmissionPage />} />
                <Route path="/students/:id" element={<StudentDetailPage />} />
                <Route path="/teachers" element={<TeachersPage />} />
                <Route path="/attendance" element={<AttendancePage />} />
                <Route path="/fees" element={<FeesPage />} />
                <Route path="/fees/collect" element={<FeeCollectionPage />} />
                <Route path="/exams" element={<ExamsPage />} />
                <Route path="/exams/marks-entry" element={<MarksEntryPage />} />
                <Route path="/lms" element={<LmsPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/transport" element={<TransportPage />} />
                <Route path="/hr-payroll" element={<HrPayrollPage />} />
                <Route path="/accounting" element={<AccountingPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/communication" element={<CommunicationPage />} />
                <Route path="/timetable" element={<TimetablePage />} />
                <Route path="/hostel" element={<HostelPage />} />
              </Route>
            </Route>

            {/* Student Portal */}
            <Route element={<ProtectedRoute requiredRole="school" />}>
              <Route element={<DashboardLayout role="student" />}>
                <Route path="/student/dashboard" element={<StudentDashboard />} />
                <Route path="/student/results" element={<StudentResults />} />
                <Route path="/student/lms" element={<StudentLMS />} />
              </Route>
            </Route>

            {/* Teacher Portal */}
            <Route element={<ProtectedRoute requiredRole="school" />}>
              <Route element={<DashboardLayout role="teacher" />}>
                <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
                <Route path="/teacher/attendance" element={<TeacherAttendance />} />
              </Route>
            </Route>

            {/* Reseller Portal */}
            <Route element={<AuthLayout />}>
              <Route path="/reseller/login" element={<ResellerLogin />} />
            </Route>
            <Route element={<ProtectedRoute requiredRole="platform" />}>
              <Route element={<DashboardLayout role="reseller" />}>
                <Route path="/reseller" element={<ResellerPortal />} />
                <Route path="/reseller/schools" element={<ResellerSchoolsPage />} />
                <Route path="/reseller/commissions" element={<ResellerCommissionsPage />} />
                <Route path="/reseller/earnings" element={<ResellerEarningsPage />} />
              </Route>
            </Route>

            {/* Redirects */}
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}
