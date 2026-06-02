import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box, List, ListItem, ListItemIcon, ListItemText, ListItemButton,
  Typography, Avatar, Tooltip, Divider, useTheme,
} from '@mui/material';
import {
  Dashboard, People, School, AssignmentTurnedIn, Payment,
  Grade, MenuBook, LibraryBooks, DirectionsBus, Hotel,
  AccountBalance, Assessment, Settings, Person, Group,
  EmojiEvents, Subscriptions, Security, BarChart,
  BrandingWatermark, ManageAccounts, Campaign, Schedule,
  Storefront, AttachMoney,
} from '@mui/icons-material';

interface NavItem {
  label: string;
  icon: React.ReactNode;
  path: string;
}

const superAdminNav: NavItem[] = [
  { label: 'Dashboard',       icon: <Dashboard />,         path: '/super-admin' },
  { label: 'Schools',         icon: <School />,            path: '/super-admin/schools' },
  { label: 'Plans',           icon: <Subscriptions />,     path: '/super-admin/plans' },
  { label: 'Resellers',       icon: <Storefront />,        path: '/super-admin/resellers' },
  { label: 'Revenue',         icon: <BarChart />,          path: '/super-admin/revenue' },
  { label: 'White Label',     icon: <BrandingWatermark />, path: '/super-admin/white-label' },
  { label: 'System Settings', icon: <ManageAccounts />,    path: '/super-admin/system-settings' },
  { label: 'Audit Logs',      icon: <Security />,          path: '/super-admin/audit-logs' },
];

const schoolAdminNav: NavItem[] = [
  { label: 'Dashboard',    icon: <Dashboard />,         path: '/dashboard' },
  { label: 'Students',     icon: <People />,            path: '/students' },
  { label: 'Teachers',     icon: <Person />,            path: '/teachers' },
  { label: 'Timetable',   icon: <Schedule />,          path: '/timetable' },
  { label: 'Attendance',   icon: <AssignmentTurnedIn />,path: '/attendance' },
  { label: 'Fees',         icon: <Payment />,           path: '/fees' },
  { label: 'Examinations', icon: <Grade />,             path: '/exams' },
  { label: 'LMS',          icon: <MenuBook />,          path: '/lms' },
  { label: 'Notice Board', icon: <Campaign />,          path: '/communication' },
  { label: 'Library',      icon: <LibraryBooks />,      path: '/library' },
  { label: 'Transport',    icon: <DirectionsBus />,     path: '/transport' },
  { label: 'Hostel',       icon: <Hotel />,             path: '/hostel' },
  { label: 'HR & Payroll', icon: <Group />,             path: '/hr-payroll' },
  { label: 'Accounting',   icon: <AccountBalance />,    path: '/accounting' },
  { label: 'Reports',      icon: <Assessment />,        path: '/reports' },
  { label: 'Settings',     icon: <Settings />,          path: '/settings' },
];

const studentNav: NavItem[] = [
  { label: 'Dashboard', icon: <Dashboard />, path: '/student/dashboard' },
  { label: 'Learning',  icon: <MenuBook />,  path: '/student/lms' },
  { label: 'Results',   icon: <EmojiEvents />, path: '/student/results' },
];

const teacherNav: NavItem[] = [
  { label: 'Dashboard',  icon: <Dashboard />,          path: '/teacher/dashboard' },
  { label: 'Attendance', icon: <AssignmentTurnedIn />, path: '/teacher/attendance' },
  { label: 'Marks Entry',icon: <Grade />,              path: '/exams/marks-entry' },
  { label: 'LMS',        icon: <MenuBook />,           path: '/lms' },
];

const resellerNav: NavItem[] = [
  { label: 'My Dashboard',  icon: <Dashboard />,    path: '/reseller' },
  { label: 'My Schools',    icon: <School />,        path: '/reseller/schools' },
  { label: 'Commissions',   icon: <AttachMoney />,  path: '/reseller/commissions' },
  { label: 'Earnings',      icon: <BarChart />,      path: '/reseller/earnings' },
];

interface Props { role: string; collapsed: boolean; }

export function Sidebar({ role, collapsed }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const navMap: Record<string, { items: NavItem[]; title: string; color: string }> = {
    'super-admin': { items: superAdminNav, title: 'ERP Platform',     color: '#7c3aed' },
    'student':     { items: studentNav,     title: 'Student Portal',  color: '#0ea5e9' },
    'teacher':     { items: teacherNav,     title: 'Teacher Portal',  color: '#7c3aed' },
    'reseller':    { items: resellerNav,    title: 'Reseller Portal', color: '#f59e0b' },
    'default':     { items: schoolAdminNav, title: 'School ERP',      color: '#1976d2' },
  };

  const { items, title, color } = navMap[role] ?? navMap['default'];

  const isActive = (path: string) =>
    path === '/dashboard'
      ? location.pathname === path
      : location.pathname === path || location.pathname.startsWith(path + '/');

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: isDark ? '#0f172a' : '#ffffff',
        borderRight: `1px solid ${theme.palette.divider}`,
        position: 'sticky',
        top: 0,
        overflowY: 'auto',
        overflowX: 'hidden',
        '&::-webkit-scrollbar': { width: 4 },
        '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 2 },
      }}
    >
      {/* ── Brand Header ─────────────────────────────────────────── */}
      <Box
        sx={{
          px: collapsed ? 1.5 : 2.5,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          minHeight: 56,
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          borderBottom: `1px solid ${theme.palette.divider}`,
          flexShrink: 0,
        }}
      >
        <Avatar
          sx={{
            bgcolor: color,
            width: collapsed ? 34 : 38,
            height: collapsed ? 34 : 38,
            fontSize: 15,
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          {title[0]}
        </Avatar>
        {!collapsed && (
          <Box overflow="hidden">
            <Typography
              variant="subtitle2"
              fontWeight={800}
              noWrap
              sx={{ color, lineHeight: 1.2 }}
            >
              {title}
            </Typography>
            <Typography variant="caption" color="text.disabled" noWrap>
              v1.0.0
            </Typography>
          </Box>
        )}
      </Box>

      {/* ── Navigation ────────────────────────────────────────────── */}
      <List sx={{ flex: 1, py: 1.5, px: 1 }} disablePadding>
        {items.map((item) => {
          const active = isActive(item.path);
          return (
            <ListItem key={item.path} disablePadding sx={{ mb: 0.5 }}>
              <Tooltip title={collapsed ? item.label : ''} placement="right" arrow>
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  sx={{
                    borderRadius: '10px',
                    py: 0.9,
                    px: collapsed ? 1.2 : 1.5,
                    justifyContent: collapsed ? 'center' : 'flex-start',
                    minHeight: 40,
                    position: 'relative',
                    bgcolor: active
                      ? `${color}18`
                      : 'transparent',
                    color: active ? color : 'text.secondary',
                    '&:hover': {
                      bgcolor: active ? `${color}22` : theme.palette.action.hover,
                      color: active ? color : 'text.primary',
                    },
                    transition: 'all 0.15s ease',
                    // Active left border indicator
                    '&::before': active ? {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: '20%',
                      height: '60%',
                      width: 3,
                      borderRadius: '0 4px 4px 0',
                      bgcolor: color,
                    } : {},
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: collapsed ? 0 : 36,
                      color: 'inherit',
                      justifyContent: 'center',
                      '& .MuiSvgIcon-root': { fontSize: 20 },
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {!collapsed && (
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontSize: 13.5,
                        fontWeight: active ? 700 : 500,
                        noWrap: true,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>

      {/* ── Footer ────────────────────────────────────────────────── */}
      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderTop: `1px solid ${theme.palette.divider}`,
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <Typography variant="caption" color="text.disabled" display="block" textAlign="center">
            © 2024 School ERP Platform
          </Typography>
        )}
      </Box>
    </Box>
  );
}
