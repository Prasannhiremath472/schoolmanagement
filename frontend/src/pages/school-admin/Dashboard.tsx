import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Grid, Card, CardContent, Typography, Box, Avatar,
  LinearProgress, List, ListItem, ListItemText, ListItemAvatar, Chip,
} from '@mui/material';
import {
  People, Person, AssignmentTurnedIn, Payment,
  TrendingUp, School, Grade, Notifications,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../services/api/client';

function StatCard({ title, value, icon, color, subtitle, progress }: any) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" alignItems="flex-start" justifyContent="space-between">
          <Box flex={1}>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>{title}</Typography>
            <Typography variant="h3" fontWeight={800} mt={0.5} color={`${color}.main`}>{value ?? '—'}</Typography>
            {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
          </Box>
          <Avatar sx={{ bgcolor: `${color}.lighter`, p: 1, width: 52, height: 52 }}>
            {React.cloneElement(icon, { sx: { color: `${color}.main`, fontSize: 26 } })}
          </Avatar>
        </Box>
        {progress !== undefined && (
          <Box mt={2}>
            <Box display="flex" justifyContent="space-between" mb={0.5}>
              <Typography variant="caption" color="text.secondary">Attendance Rate</Typography>
              <Typography variant="caption" fontWeight={600}>{progress}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={progress} color={color} sx={{ borderRadius: 1, height: 6 }} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}

export default function SchoolDashboard() {
  const { data: overview } = useQuery({
    queryKey: ['school-overview'],
    queryFn: () => api.get('/analytics/overview'),
  });

  const { data: attendanceTrend } = useQuery({
    queryKey: ['attendance-trend'],
    queryFn: () => api.get('/analytics/attendance-trend', { days: 30 }),
  });

  const stats = overview?.data;

  const attendanceChartOptions = {
    chart: { type: 'bar' as const, toolbar: { show: false }, stacked: true },
    colors: ['#2e7d32', '#d32f2f', '#ed6c02'],
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    legend: { position: 'top' as const },
    dataLabels: { enabled: false },
    fill: { opacity: 1 },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
  };

  const attendanceSeries = [
    { name: 'Present', data: [342, 335, 348, 320, 340, 180] },
    { name: 'Absent', data: [18, 25, 12, 30, 20, 15] },
    { name: 'Late', data: [5, 8, 5, 10, 8, 3] },
  ];

  const feeChartOptions = {
    chart: { type: 'area' as const, toolbar: { show: false } },
    colors: ['#1976d2', '#9c27b0'],
    stroke: { curve: 'smooth' as const, width: 2 },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    xaxis: { categories: ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'] },
    yaxis: { labels: { formatter: (v: number) => `₹${(v / 1000).toFixed(0)}K` } },
    dataLabels: { enabled: false },
    legend: { position: 'top' as const },
  };

  const feeSeries = [
    { name: 'Collected', data: [180000, 220000, 195000, 240000, 280000, 260000, 310000] },
    { name: 'Due', data: [45000, 38000, 52000, 30000, 25000, 35000, 20000] },
  ];

  const recentActivities = [
    { text: '42 students marked absent', time: '10 min ago', icon: <AssignmentTurnedIn />, color: 'warning' },
    { text: 'Class 10A fee collection: ₹45,000', time: '30 min ago', icon: <Payment />, color: 'success' },
    { text: 'Mid-term exam published for Class 9', time: '1 hr ago', icon: <Grade />, color: 'info' },
    { text: '3 new students admitted', time: '2 hr ago', icon: <People />, color: 'primary' },
    { text: 'Annual Day circular issued', time: '3 hr ago', icon: <Notifications />, color: 'secondary' },
  ];

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>School Dashboard</Typography>
        <Typography variant="body2" color="text.secondary">Welcome back! Here's what's happening today.</Typography>
      </Box>

      <Grid container spacing={3}>
        {/* Stat Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Students" value={stats?.students?.toLocaleString()} icon={<People />} color="primary" subtitle="Active students" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Teachers" value={stats?.teachers} icon={<Person />} color="secondary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Today's Attendance" value="87%" icon={<AssignmentTurnedIn />} color="success" progress={87} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Fee Collected" value={`₹${Number(stats?.totalFees || 0).toLocaleString()}`} icon={<Payment />} color="warning" />
        </Grid>

        {/* Attendance Chart */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Weekly Attendance</Typography>
              <ReactApexChart options={attendanceChartOptions} series={attendanceSeries} type="bar" height={260} />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1}>Recent Activity</Typography>
              <List dense disablePadding>
                {recentActivities.map((act, i) => (
                  <ListItem key={i} disablePadding sx={{ py: 0.8, borderBottom: i < recentActivities.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar sx={{ bgcolor: `${act.color}.lighter`, width: 32, height: 32 }}>
                        {React.cloneElement(act.icon, { sx: { fontSize: 16, color: `${act.color}.main` } })}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="body2">{act.text}</Typography>}
                      secondary={<Typography variant="caption" color="text.disabled">{act.time}</Typography>}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Fee Collection Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={600}>Fee Collection Trend</Typography>
                <Chip label="This Year" size="small" color="primary" variant="outlined" />
              </Box>
              <ReactApexChart options={feeChartOptions} series={feeSeries} type="area" height={220} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
