import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Grid, Chip } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { api } from '../../services/api/client';

export default function ResellerCommissionsPage() {
  const [page, setPage] = useState(0);

  // Use reseller-portal endpoints
  const { data: statsData } = useQuery({ queryKey: ['rp-stats'], queryFn: () => api.get('/reseller-portal/stats') });
  const { data, isLoading } = useQuery({
    queryKey: ['rp-commissions', page],
    queryFn: () => api.get('/reseller-portal/commissions', { page: page + 1, limit: 20 }),
  });

  const stats = statsData?.data || {};

  const columns: GridColDef[] = [
    { field: 'school', headerName: 'School', flex: 1, valueGetter: (_: any, r: any) => r.school?.name || '—' },
    { field: 'amount', headerName: 'Commission (₹)', width: 150, valueFormatter: (v: number) => `₹${Number(v).toLocaleString('en-IN')}` },
    {
      field: 'status', headerName: 'Status', width: 120,
      renderCell: (p: GridRenderCellParams) => <Chip label={p.value} size="small" color={p.value === 'PAID' ? 'success' : p.value === 'PENDING' ? 'warning' : 'default'} />,
    },
    { field: 'paidAt', headerName: 'Paid On', width: 120, valueFormatter: (v: string) => v ? new Date(v).toLocaleDateString('en-IN') : '—' },
    { field: 'createdAt', headerName: 'Earned On', width: 120, valueFormatter: (v: string) => new Date(v).toLocaleDateString('en-IN') },
  ];

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>Commissions</Typography>
        <Typography variant="body2" color="text.secondary">Your commission history and payouts</Typography>
      </Box>

      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Total Earned', value: `₹${Number(stats.totalCommission || 0).toLocaleString('en-IN')}`, color: '#1976d2' },
          { label: 'Pending Payout', value: `₹${Number(stats.pendingCommission || 0).toLocaleString('en-IN')}`, color: '#ed6c02' },
          { label: 'Paid Out', value: `₹${Number(stats.paidCommission || 0).toLocaleString('en-IN')}`, color: '#2e7d32' },
          { label: 'Active Schools', value: stats.activeSchools || 0, color: '#9c27b0' },
        ].map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Card><CardContent>
              <Typography color="text.secondary" variant="body2">{s.label}</Typography>
              <Typography variant="h5" fontWeight={800} color={s.color}>{s.value}</Typography>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600} mb={2}>Commission History</Typography>
          {(data?.data || []).length === 0 && !isLoading ? (
            <Box textAlign="center" py={4} color="text.secondary">
              <Typography>No commission records yet. Commissions are generated when schools renew subscriptions.</Typography>
            </Box>
          ) : (
            <DataGrid rows={data?.data || []} columns={columns} rowCount={data?.meta?.total || 0} loading={isLoading}
              pageSizeOptions={[20]} paginationMode="server" paginationModel={{ page, pageSize: 20 }}
              onPaginationModelChange={(m) => setPage(m.page)} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} />
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
