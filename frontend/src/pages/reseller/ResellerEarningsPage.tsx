import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Grid, LinearProgress, Chip } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../services/api/client';

const TIERS = [
  { schools: 10, monthly: 30000,  label: '₹30,000/month',  color: '#1976d2' },
  { schools: 25, monthly: 100000, label: '₹1,00,000/month', color: '#9c27b0' },
  { schools: 50, monthly: 250000, label: '₹2,50,000/month', color: '#2e7d32' },
];

export default function ResellerEarningsPage() {
  // Use reseller-portal endpoints (works for RESELLER role)
  const { data: statsData } = useQuery({ queryKey: ['rp-stats-e'], queryFn: () => api.get('/reseller-portal/stats') });

  const stats = statsData?.data || {};
  const schoolCount = stats.activeSchools || 0;
  const commissionPct = stats.reseller?.commissionPct || 10;

  const currentTier = TIERS.reduce((prev, tier) => schoolCount >= tier.schools ? tier : prev, TIERS[0]);
  const nextTier = TIERS.find((t) => t.schools > schoolCount);
  const progressToNext = nextTier ? Math.min(100, (schoolCount / nextTier.schools) * 100) : 100;
  const projectedMonthly = stats.projectedMonthly || 0;

  const chartOptions = {
    chart: { type: 'area' as const, toolbar: { show: false } },
    colors: ['#1976d2'],
    stroke: { curve: 'smooth' as const, width: 2 },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    yaxis: { labels: { formatter: (v: number) => `₹${(v / 1000).toFixed(0)}K` } },
    dataLabels: { enabled: false },
  };
  const chartSeries = [{ name: 'Commission', data: [8000, 12000, 15000, 18000, 22000, 25000, 28000, 30000, 32000, 35000, 38000, 40000] }];

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>Earnings & Projections</Typography>
        <Typography variant="body2" color="text.secondary">Track your earnings potential and milestone progress</Typography>
      </Box>

      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Active Schools', value: schoolCount, color: '#1976d2' },
          { label: 'Projected Monthly', value: `₹${Number(projectedMonthly).toLocaleString('en-IN')}`, color: '#2e7d32' },
          { label: 'Total Earned', value: `₹${Number(stats.totalCommission || 0).toLocaleString('en-IN')}`, color: '#9c27b0' },
          { label: 'Commission Rate', value: `${commissionPct}%`, color: '#ed6c02' },
        ].map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Card><CardContent>
              <Typography variant="body2" color="text.secondary">{s.label}</Typography>
              <Typography variant="h4" fontWeight={800} color={s.color}>{s.value}</Typography>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Milestone tracker */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>🎯 Earning Milestones</Typography>
              {TIERS.map((tier) => {
                const reached = schoolCount >= tier.schools;
                const isCurrent = currentTier.schools === tier.schools;
                return (
                  <Box key={tier.schools} mb={2} sx={{
                    p: 2, borderRadius: 2, border: '2px solid',
                    borderColor: isCurrent ? tier.color : reached ? '#e8f5e9' : 'divider',
                    bgcolor: isCurrent ? `${tier.color}10` : 'transparent',
                  }}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography fontWeight={700} color={reached ? tier.color : 'text.primary'}>
                          {tier.schools} Schools → {tier.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ₹{(tier.monthly / tier.schools).toLocaleString('en-IN')}/school/month
                        </Typography>
                      </Box>
                      <Chip label={reached ? '✓ Done' : `${tier.schools - schoolCount} more`}
                        color={reached ? 'success' : 'default'} size="small" />
                    </Box>
                    {isCurrent && nextTier && (
                      <Box mt={1.5}>
                        <Box display="flex" justifyContent="space-between" mb={0.5}>
                          <Typography variant="caption">Progress to next tier</Typography>
                          <Typography variant="caption" fontWeight={600}>{schoolCount}/{nextTier.schools}</Typography>
                        </Box>
                        <LinearProgress variant="determinate" value={progressToNext}
                          sx={{ height: 6, borderRadius: 3 }} />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </CardContent>
          </Card>
        </Grid>

        {/* Earnings Chart */}
        <Grid item xs={12} md={7}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Monthly Commission Trend</Typography>
              <ReactApexChart options={chartOptions} series={chartSeries} type="area" height={280} />
            </CardContent>
          </Card>
        </Grid>

        {/* Tips */}
        <Grid item xs={12}>
          <Card sx={{ background: 'linear-gradient(135deg, #1976d2, #7b1fa2)', color: '#fff' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={700} mb={2}>💡 How to Earn More</Typography>
              <Grid container spacing={2}>
                {[
                  { tip: '🏫 Add more schools', desc: 'Each active school = monthly commission' },
                  { tip: '📱 Upsell plans', desc: 'Higher tier plans = higher commission' },
                  { tip: '🔄 Reduce churn', desc: 'Keep schools active for consistent income' },
                  { tip: '📈 Reach 50 schools', desc: '₹2.5L/month guaranteed income' },
                ].map((b) => (
                  <Grid item xs={12} sm={6} md={3} key={b.tip}>
                    <Box>
                      <Typography fontWeight={700} fontSize={14}>{b.tip}</Typography>
                      <Typography fontSize={12} sx={{ opacity: 0.85 }}>{b.desc}</Typography>
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
