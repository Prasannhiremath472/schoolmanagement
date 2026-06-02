import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../services/api/client';

export default function RevenuePage() {
  const { data } = useQuery({ queryKey: ['revenue', 'monthly'], queryFn: () => api.get('/super-admin/revenue', { period: 'monthly' }) });
  const chartOptions = { chart: { type: 'bar' as const, toolbar: { show: false } }, colors: ['#1976d2'], xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'] }, dataLabels: { enabled: false }, plotOptions: { bar: { borderRadius: 4 } } };
  const series = [{ name: 'Revenue', data: [45000, 62000, 78000, 55000, 90000, 110000, 98000, 125000, 105000, 140000, 130000, 160000] }];
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Revenue Reports</Typography>
      <Grid container spacing={3}>
        {[{ label: 'Total Revenue', value: '₹12,48,000' }, { label: 'Monthly Revenue', value: '₹1,60,000' }, { label: 'Pending Payments', value: '₹45,000' }].map((s) => (
          <Grid item xs={12} md={4} key={s.label}>
            <Card><CardContent><Typography color="text.secondary">{s.label}</Typography><Typography variant="h4" fontWeight={700} color="primary">{s.value}</Typography></CardContent></Card>
          </Grid>
        ))}
        <Grid item xs={12}><Card><CardContent><Typography variant="h6" fontWeight={600} mb={2}>Monthly Revenue</Typography><ReactApexChart options={chartOptions} series={series} type="bar" height={300} /></CardContent></Card></Grid>
      </Grid>
    </Box>
  );
}
