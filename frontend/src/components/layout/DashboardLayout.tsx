import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  Box, Drawer, AppBar, Toolbar, Typography, IconButton,
  Avatar, Menu, MenuItem, Tooltip, Badge, useTheme,
  useMediaQuery, Divider, Chip, Select, FormControl,
  InputAdornment,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Notifications as NotificationsIcon,
  DarkMode, LightMode, Logout,
  School as SchoolIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/api/client';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { toggleDarkMode, toggleSidebarCollapse } from '../../app/store/slices/uiSlice';
import { logout, fullLogout } from '../../app/store/slices/authSlice';
import { Sidebar } from './Sidebar';

const DRAWER_WIDTH = 240;
const COLLAPSED_WIDTH = 64;

interface Props {
  role: 'super-admin' | 'school-admin' | 'teacher' | 'student' | 'reseller';
}

export default function DashboardLayout({ role }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { darkMode, sidebarCollapsed } = useSelector((state: RootState) => state.ui);
  const { user } = useSelector((state: RootState) => state.auth);
  const { name: schoolName } = useSelector((state: RootState) => state.tenant);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSchool, setSelectedSchool] = useState('');

  const drawerWidth = sidebarCollapsed && !isMobile ? COLLAPSED_WIDTH : DRAWER_WIDTH;

  // Fetch school list for switcher (super-admin only)
  const { data: schoolsData } = useQuery({
    queryKey: ['schools-switcher'],
    queryFn: () => api.get('/super-admin/schools', { limit: 100 }),
    enabled: role === 'super-admin',
    staleTime: 5 * 60 * 1000,
  });

  const handleLogout = async () => {
    try { await dispatch(logout()); } catch {}
    dispatch(fullLogout());
    navigate('/login', { replace: true });
  };

  const sidebarContent = (
    <Sidebar role={role} collapsed={sidebarCollapsed && !isMobile} />
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>

      {/* ── Permanent Sidebar (desktop) ───────────────────────────── */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            overflowX: 'hidden',
            border: 'none',
            boxShadow: '2px 0 12px rgba(0,0,0,0.08)',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        {sidebarContent}
      </Drawer>

      {/* ── Temporary Sidebar (mobile) ────────────────────────────── */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH, boxSizing: 'border-box' },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* ── Right side: AppBar + Content ─────────────────────────── */}
      <Box
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minWidth: 0, // prevent flex overflow
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        {/* ── Top AppBar ─────────────────────────────────────────── */}
        <AppBar
          position="sticky"
          elevation={0}
          sx={{
            bgcolor: 'background.paper',
            borderBottom: `1px solid ${theme.palette.divider}`,
            color: 'text.primary',
            zIndex: theme.zIndex.drawer - 1,
          }}
        >
          <Toolbar sx={{ justifyContent: 'space-between', minHeight: '56px !important', px: 2 }}>

            {/* Left: hamburger + school switcher */}
            <Box display="flex" alignItems="center" gap={1}>
              <IconButton
                onClick={() => isMobile ? setMobileOpen(true) : dispatch(toggleSidebarCollapse())}
                size="small"
                edge="start"
              >
                <MenuIcon />
              </IconButton>

              {/* School switcher — super-admin only */}
              {role === 'super-admin' && !isMobile && (
                <FormControl size="small" sx={{ minWidth: 200 }}>
                  <Select
                    value={selectedSchool}
                    onChange={(e) => {
                      const slug = e.target.value as string;
                      setSelectedSchool(slug);
                      localStorage.setItem('tenantSlug', slug);
                      const school = schoolsData?.data?.find((s: any) => s.slug === slug);
                      if (school) localStorage.setItem('tenantName', school.name);
                    }}
                    displayEmpty
                    startAdornment={
                      <InputAdornment position="start">
                        <SchoolIcon fontSize="small" sx={{ color: 'text.secondary', ml: 0.5 }} />
                      </InputAdornment>
                    }
                    sx={{ bgcolor: 'background.default', fontSize: 13, borderRadius: 2 }}
                    renderValue={(v) =>
                      v
                        ? (schoolsData?.data?.find((s: any) => s.slug === v)?.name ?? v)
                        : <em style={{ color: '#999' }}>Switch to School...</em>
                    }
                  >
                    {(schoolsData?.data || []).map((s: any) => (
                      <MenuItem key={s.slug} value={s.slug}>
                        <Box display="flex" alignItems="center" gap={1} width="100%">
                          <Avatar sx={{ width: 22, height: 22, fontSize: 10, bgcolor: s.primaryColor || 'primary.main' }}>
                            {s.name?.[0]}
                          </Avatar>
                          <Typography variant="body2" fontWeight={500} flex={1}>{s.name}</Typography>
                          <Chip
                            label={s.status}
                            size="small"
                            color={s.status === 'ACTIVE' ? 'success' : 'default'}
                            sx={{ fontSize: 9, height: 18 }}
                          />
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}

              {/* School name for school-admin */}
              {schoolName && role !== 'super-admin' && !isMobile && (
                <Chip
                  label={schoolName}
                  size="small"
                  color="primary"
                  variant="outlined"
                  icon={<SchoolIcon sx={{ fontSize: '14px !important' }} />}
                />
              )}
            </Box>

            {/* Right: theme, notifications, avatar */}
            <Box display="flex" alignItems="center" gap={0.5}>
              <Tooltip title={darkMode ? 'Light Mode' : 'Dark Mode'}>
                <IconButton size="small" onClick={() => dispatch(toggleDarkMode())}>
                  {darkMode ? <LightMode fontSize="small" /> : <DarkMode fontSize="small" />}
                </IconButton>
              </Tooltip>

              <Tooltip title="Notifications">
                <IconButton size="small">
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title={user?.email || 'Account'}>
                <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small" sx={{ ml: 0.5 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: 13 }}>
                    {user?.email?.[0]?.toUpperCase() || 'U'}
                  </Avatar>
                </IconButton>
              </Tooltip>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                PaperProps={{ sx: { mt: 1, minWidth: 200, borderRadius: 2 } }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <Box sx={{ px: 2, py: 1.5 }}>
                  <Typography variant="body2" fontWeight={700}>{user?.name || user?.email}</Typography>
                  <Typography variant="caption" color="text.secondary">{user?.role}</Typography>
                </Box>
                <Divider />
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main', gap: 1 }}>
                  <Logout fontSize="small" /> Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* ── Page Content ───────────────────────────────────────── */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 2.5, md: 3 },
            overflowY: 'auto',
            bgcolor: 'background.default',
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
