import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Grid, Chip, LinearProgress,
  Table, TableBody, TableCell, TableHead, TableRow, Avatar, Button,
} from '@mui/material';
import { School, AttachMoney, TrendingUp, CheckCircle, Storefront } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { api } from '../../services/api/client';

const EARNINGS_MODEL = [
  { schools: 10, monthly: 30000,  label: '₹30,000/month' },
  { schools: 25, monthly: 100000, label: '₹1,00,000/month' },
  { schools: 50, monthly: 250000, label: '₹2,50,000/month' },
];

function StatCard({ title, value, icon, color, subtitle }: any) {
  return (
    <Card>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500}>{title}</Typography>
            <Typography variant="h4" fontWeight={800} color={color} mt={0.5}>{value ?? '—'}</Typography>
            {subtitle && <Typography variant="caption" color="text.secondary">{subtitle}</Typography>}
          </Box>
          <Avatar sx={{ bgcolor: `${color}20`, color }}>{icon}</Avatar>
        </Box>
      </CardContent>
    </Card>
  );
}

export default function ResellerPortal() {
  const { user } = useSelector((state: RootState) => state.auth);

  // Use the new reseller-portal endpoints that work for RESELLER role
  const { data: statsData, isLoading } = useQuery({
    queryKey: ['reseller-portal-stats'],
    queryFn: () => api.get('/reseller-portal/stats'),
  });

  const { data: schoolsData } = useQuery({
    queryKey: ['reseller-portal-schools'],
    queryFn: () => api.get('/reseller-portal/schools', { limit: 5 }),
  });

  const stats = statsData?.data || {};
  const schoolCount = stats.activeSchools || 0;

  const currentTier = EARNINGS_MODEL.reduce(
    (prev, tier) => schoolCount >= tier.schools ? tier : prev,
    EARNINGS_MODEL[0],
  );
  const nextTier = EARNINGS_MODEL.find((t) => t.schools > schoolCount);
  const progressToNext = nextTier ? (schoolCount / nextTier.schools) * 100 : 100;

  const chartOptions = {
    chart: { type: 'bar' as const, toolbar: { show: false } },
    colors: ['#ed6c02'],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] },
    dataLabels: { enabled: false },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
    yaxis: { labels: { formatter: (v: number) => `₹${(v / 1000).toFixed(0)}K` } },
  };
  const earningsSeries = [{ name: 'Commission', data: [8000, 12000, 15000, 18000, 22000, 25000] }];

  if (isLoading) {
    return <Box display="flex" justifyContent="center" mt={8}><Typography color="text.secondary">Loading...</Typography></Box>;
  }

  return (
    <Box>
      {/* Header */}
      <Box mb={3} display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ bgcolor: 'warning.main', width: 52, height: 52 }}>
          <Storefront />
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700}>
            Welcome, {stats.reseller?.name || user?.name || user?.email}!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Reseller Dashboard • Commission Rate: {stats.reseller?.commissionPct || 10}% per school
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Stats */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Schools" value={stats.totalSchools || 0} icon={<School />} color="#1976d2" subtitle="All registered schools" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Schools" value={stats.activeSchools || 0} icon={<CheckCircle />} color="#2e7d32" subtitle="Paying schools" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Earned" value={`₹${Number(stats.totalCommission || 0).toLocaleString('en-IN')}`} icon={<AttachMoney />} color="#ed6c02" subtitle="All time earnings" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Projected Monthly" value={`₹${Number(stats.projectedMonthly || 0).toLocaleString('en-IN')}`} icon={<TrendingUp />} color="#9c27b0" subtitle="Based on active schools" />
        </Grid>

        {/* Milestone Tracker */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={1}>🎯 Earnings Milestones</Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Add more schools to unlock higher earnings!
              </Typography>
              {EARNINGS_MODEL.map((tier) => {
                const reached = schoolCount >= tier.schools;
                const isCurrent = currentTier.schools === tier.schools;
                return (
                  <Box key={tier.schools} mb={1.5} sx={{
                    p: 1.5, borderRadius: 2, border: '2px solid',
                    borderColor: isCurrent ? 'warning.main' : reached ? 'success.light' : 'divider',
                    bgcolor: isCurrent ? 'rgba(237,108,2,0.06)' : 'transparent',
                  }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography fontWeight={700} fontSize={14} color={reached ? 'success.main' : 'text.primary'}>
                          {tier.schools} Schools → {tier.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ₹{(tier.monthly / tier.schools).toLocaleString('en-IN')}/school/month
                        </Typography>
                      </Box>
                      <Chip
                        label={reached ? '✓ Achieved' : `${tier.schools - schoolCount} more`}
                        color={reached ? 'success' : 'default'}
                        size="small"
                      />
                    </Box>
                    {isCurrent && nextTier && (
                      <Box mt={1}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="caption">Progress to next tier</Typography>
                          <Typography variant="caption" fontWeight={600}>{schoolCount}/{nextTier.schools}</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={progressToNext} color="warning" sx={{ height: 6, borderRadius: 3 }} />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>

        {/* Commission Chart */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Monthly Commission Trend</Typography>
              <ReactApexChart options={chartOptions} series={earningsSeries} type="bar" height={220} />
            </CardContent>
          </Card>
        </Grid>

        {/* My Schools table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6" fontWeight={600}>My Schools</Typography>
                <Button size="small" variant="outlined" onClick={() => window.location.href = '/reseller/schools'}>
                  View All →
                </Button>
              </Box>

              {(schoolsData?.data || []).length === 0 ? (
                <Box textAlign="center" py={4} color="text.secondary">
                  <School sx={{ fontSize: 48, opacity: 0.3, mb: 1 }} />
                  <Typography>No schools assigned yet. Contact the platform admin to assign schools to your account.</Typography>
                </Box>
              ) : (
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'background.default' } }}>
                      <TableCell>School Name</TableCell>
                      <TableCell>School ID</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Plan</TableCell>
                      <TableCell>Your Commission</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(schoolsData?.data || []).map((school: any) => (
                      <TableRow key={school.id} hover>
                        <TableCell>
                          <Box display="flex" alignItems="center" gap={1.5}>
                            <Avatar sx={{ width: 28, height: 28, bgcolor: school.primaryColor || '#1976d2', fontSize: 11 }}>
                              {school.name?.[0]}
                            </Avatar>
                            <Typography variant="body2" fontWeight={600}>{school.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Typography variant="caption" color="primary" fontWeight={600}>{school.slug}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={school.status} size="small"
                            color={school.status === 'ACTIVE' ? 'success' : school.status === 'TRIAL' ? 'info' : 'default'} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{school.subscriptions?.[0]?.plan?.name || 'Trial'}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontWeight={600} color={school.status === 'ACTIVE' ? 'success.main' : 'text.disabled'}>
                            {school.status === 'ACTIVE'
                              ? `₹${Math.round(Number(school.subscriptions?.[0]?.plan?.price || 0) * (stats.reseller?.commissionPct || 10) / 100).toLocaleString('en-IN')}/mo`
                              : '—'}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Benefits Banner */}
        <Grid item xs={12}>
          <Card sx={{ background: 'linear-gradient(135deg, #ed6c02, #9c27b0)', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>💰 Reseller Benefits</Typography>
              <Grid container spacing={2}>
                {[
                  { icon: '🏷️', t: '100% White Label',    d: 'Your brand, your identity' },
                  { icon: '♾️', t: 'Unlimited Schools',   d: 'No cap on school count' },
                  { icon: '💳', t: 'One Time License',    d: '₹3L one-time, no recurring fee' },
                  { icon: '📱', t: 'Mobile Apps Included',d: 'Parent, Teacher & Student apps' },
                  { icon: '🔧', t: 'Free Support',        d: 'Dedicated technical support' },
                  { icon: '💬', t: 'WhatsApp + SMS',      d: 'Built-in communication tools' },
                ].map((b) => (
                  <Grid item xs={12} sm={6} md={4} key={b.t}>
                    <Box display="flex" gap={1.5} alignItems="flex-start">
                      <Typography fontSize={22}>{b.icon}</Typography>
                      <Box>
                        <Typography fontWeight={700} fontSize={14}>{b.t}</Typography>
                        <Typography fontSize={12} sx={{ opacity: 0.85 }}>{b.d}</Typography>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
