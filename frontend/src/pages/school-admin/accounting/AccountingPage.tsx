import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Button, Tab, Tabs, Grid, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { api } from '../../../services/api/client';

export default function AccountingPage() {
  const [tab, setTab] = useState(0);
  const [fromDate] = useState(new Date(new Date().getFullYear(), 3, 1).toISOString().split('T')[0]);
  const [toDate] = useState(new Date().toISOString().split('T')[0]);
  const { data: bs } = useQuery({ queryKey: ['balance-sheet'], queryFn: () => api.get('/accounting/balance-sheet', { fromDate, toDate }) });
  const { data: txns } = useQuery({ queryKey: ['transactions'], queryFn: () => api.get('/accounting/transactions', { limit: 20 }) });
  const cols: GridColDef[] = [{ field: 'date', headerName: 'Date', width: 120, valueFormatter: (v: string) => new Date(v).toLocaleDateString('en-IN') }, { field: 'description', headerName: 'Description', flex: 2 }, { field: 'type', headerName: 'Type', width: 100, renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'CREDIT' ? 'success' : 'error'} /> }, { field: 'amount', headerName: 'Amount', width: 130, valueFormatter: (v: number) => `₹${Number(v).toLocaleString()}` }];
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Accounting</Typography>
      <Grid container spacing={3} mb={3}>
        {[{ label: 'Total Income', value: `₹${Number(bs?.data?.totalIncome || 0).toLocaleString()}`, color: 'success.main' }, { label: 'Total Expense', value: `₹${Number(bs?.data?.totalExpense || 0).toLocaleString()}`, color: 'error.main' }, { label: 'Net Balance', value: `₹${Number(bs?.data?.netBalance || 0).toLocaleString()}`, color: 'primary.main' }].map((s) => (<Grid item xs={12} md={4} key={s.label}><Card><CardContent><Typography color="text.secondary">{s.label}</Typography><Typography variant="h4" fontWeight={700} color={s.color}>{s.value}</Typography></CardContent></Card></Grid>))}
      </Grid>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}><Tabs value={tab} onChange={(_, v) => setTab(v)}><Tab label="Transactions" /><Tab label="Expenses" /><Tab label="Account Heads" /></Tabs></Box>
      {tab === 0 && <Card><CardContent><DataGrid rows={txns?.data || []} columns={cols} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} pageSizeOptions={[20]} /></CardContent></Card>}
    </Box>
  );
}
