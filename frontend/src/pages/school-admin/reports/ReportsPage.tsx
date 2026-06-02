import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { Assessment, Download } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { api } from '../../../services/api/client';

export default function ReportsPage() {
  const { data: dashboard } = useQuery({ queryKey: ['reports-dashboard'], queryFn: () => api.get('/reports/dashboard') });
  const strengthOptions = { chart: { type: 'bar' as const, toolbar: { show: false } }, colors: ['#1976d2'], xaxis: { categories: ['Class 1', 'Class 2', 'Class 3', 'Class 4', 'Class 5', 'Class 6'] }, dataLabels: { enabled: false }, plotOptions: { bar: { borderRadius: 4, horizontal: true } } };
  const strengthSeries = [{ name: 'Students', data: [85, 92, 78, 95, 88, 70] }];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Reports & Analytics</Typography>
        <Button variant="outlined" startIcon={<Download />}>Export Report</Button>
      </Box>
      <Grid container spacing={3}>
        {[{ label: 'Active Students', value: dashboard?.data?.students }, { label: 'Teachers', value: dashboard?.data?.teachers }, { label: 'Staff', value: dashboard?.data?.staff }].map((s) => (<Grid item xs={12} md={4} key={s.label}><Card><CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Assessment color="primary" sx={{ fontSize: 36 }} /><Box><Typography color="text.secondary">{s.label}</Typography><Typography variant="h4" fontWeight={700}>{s.value || 0}</Typography></Box></CardContent></Card></Grid>))}
        <Grid item xs={12}><Card><CardContent><Typography variant="h6" fontWeight={600} mb={2}>Class-wise Student Strength</Typography><ReactApexChart options={strengthOptions} series={strengthSeries} type="bar" height={280} /></CardContent></Card></Grid>
      </Grid>
    </Box>
  );
}
