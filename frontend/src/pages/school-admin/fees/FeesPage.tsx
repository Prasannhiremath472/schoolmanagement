import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Button, Grid, Chip, TextField, InputAdornment, Tab, Tabs } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Add, Search, Payment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { api } from '../../../services/api/client';

export default function FeesPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const { data: stats } = useQuery({ queryKey: ['fee-stats'], queryFn: () => api.get('/fees/stats', { academicYearId: 'current' }) });
  const { data, isLoading } = useQuery({ queryKey: ['fee-payments', page, search], queryFn: () => api.get('/fees/payments', { page: page + 1, limit: 20, search }) });
  const columns: GridColDef[] = [
    { field: 'receiptNo', headerName: 'Receipt No', width: 150, renderCell: (p) => <Typography variant="body2" fontWeight={600} color="primary">{p.value}</Typography> },
    { field: 'student', headerName: 'Student', flex: 1, valueGetter: (_, r) => r.student ? `${r.student.firstName} ${r.student.lastName}` : '—' },
    { field: 'paidAmount', headerName: 'Paid', width: 120, valueFormatter: (v: number) => `₹${Number(v).toLocaleString()}` },
    { field: 'paymentMode', headerName: 'Mode', width: 120, renderCell: (p) => <Chip label={p.value} size="small" variant="outlined" /> },
    { field: 'paymentDate', headerName: 'Date', width: 120, valueFormatter: (v: string) => v ? new Date(v).toLocaleDateString('en-IN') : '—' },
  ];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Fees Management</Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Add />}>Fee Structure</Button>
          <Button variant="contained" startIcon={<Payment />} onClick={() => navigate('/fees/collect')}>Collect Fee</Button>
        </Box>
      </Box>
      <Grid container spacing={3} mb={3}>
        {[{ label: 'Total Collected', value: `₹${Number(stats?.data?.totalCollected || 0).toLocaleString()}`, color: 'success.main' }, { label: 'Total Due', value: `₹${Number(stats?.data?.totalDue || 0).toLocaleString()}`, color: 'error.main' }, { label: "Today's Collection", value: `₹${Number(stats?.data?.todayCollection || 0).toLocaleString()}`, color: 'primary.main' }].map((s) => (
          <Grid item xs={12} md={4} key={s.label}>
            <Card><CardContent><Typography color="text.secondary">{s.label}</Typography><Typography variant="h4" fontWeight={700} color={s.color}>{s.value}</Typography></CardContent></Card>
          </Grid>
        ))}
      </Grid>
      <Card><CardContent>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}><Tabs value={tab} onChange={(_, v) => setTab(v)}><Tab label="Recent Payments" /><Tab label="Fee Structures" /><Tab label="Due Reports" /></Tabs></Box>
        <TextField size="small" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} sx={{ mb: 2 }} />
        <DataGrid rows={data?.data || []} columns={columns} rowCount={data?.meta?.total || 0} loading={isLoading} pageSizeOptions={[20]} paginationMode="server" paginationModel={{ page, pageSize: 20 }} onPaginationModelChange={(m) => setPage(m.page)} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} />
      </CardContent></Card>
    </Box>
  );
}
