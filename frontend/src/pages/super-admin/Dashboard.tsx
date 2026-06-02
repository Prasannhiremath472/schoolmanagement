import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Grid, Card, CardContent, Typography, Box, Chip, CircularProgress,
} from '@mui/material';
import {
  School, CheckCircle, Warning, Cancel, TrendingUp, AttachMoney,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../services/api/client';

function StatCard({ title, value, icon, color, subtitle }: any) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>{title}</Typography>
            <Typography variant="h4" fontWeight={700} mt={0.5}>{value ?? '—'}</Typography>
            {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
          </Box>
          <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: `${color}.lighter` || '#f0f0f0' }}>
            {React.cloneElement(icon, { sx: { color: `${color}.main`, fontSize: 28 } })}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function SuperAdminDashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ['super-admin-dashboard'],
    queryFn: () => api.get('/super-admin/dashboard'),
  });

  const stats = data?.data;

  const revenueChartOptions = {
    chart: { type: 'area' as const, toolbar: { show: false }, sparkline: { enabled: false } },
    colors: ['#1976d2'],
    fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.5, opacityTo: 0.1 } },
    stroke: { curve: 'smooth' as const, width: 2 },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    yaxis: { labels: { formatter: (v: number) => `₹${(v / 1000).toFixed(0)}K` } },
    dataLabels: { enabled: false },
    tooltip: { y: { formatter: (v: number) => `₹${v.toLocaleString()}` } },
  };

  const revenueData = [{ name: 'Revenue', data: [45000, 62000, 78000, 55000, 90000, 110000] }];

  const schoolStatusOptions = {
    chart: { type: 'donut' as const },
    labels: ['Active', 'Trial', 'Suspended', 'Expired'],
    colors: ['#2e7d32', '#1976d2', '#ed6c02', '#d32f2f'],
    legend: { position: 'bottom' as const },
    dataLabels: { enabled: true },
  };

  const schoolStatusData = [
    stats?.schools?.active || 0,
    stats?.schools?.trial || 0,
    stats?.schools?.suspended || 0,
    stats?.schools?.expired || 0,
  ];

  if (isLoading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>Platform Dashboard</Typography>
        <Typography variant="body2" color="text.secondary">Overview of all schools and revenue</Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Schools" value={stats?.schools?.total} icon={<School />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Schools" value={stats?.schools?.active} icon={<CheckCircle />} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Trial Schools" value={stats?.schools?.trial} icon={<Warning />} color="warning" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Monthly Revenue" value={`₹${Number(stats?.revenue?.monthly || 0).toLocaleString()}`} icon={<AttachMoney />} color="success" />
        </Grid>

        {/* Revenue Chart */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Revenue Trend</Typography>
              <ReactApexChart options={revenueChartOptions} series={revenueData} type="area" height={280} />
            </CardContent>
          </Card>
        </Grid>

        {/* School Status Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>School Status</Typography>
              <ReactApexChart options={schoolStatusOptions} series={schoolStatusData} type="donut" height={280} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
