import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Button, Tab, Tabs, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { api } from '../../../services/api/client';

export default function HrPayrollPage() {
  const [tab, setTab] = useState(0);
  const { data: leaves } = useQuery({ queryKey: ['leaves'], queryFn: () => api.get('/hr-payroll/leaves', { limit: 20 }) });
  const { data: salaries } = useQuery({ queryKey: ['salaries'], queryFn: () => api.get('/hr-payroll/salaries', { limit: 20 }) });
  const leaveColumns: GridColDef[] = [{ field: 'leaveType', headerName: 'Type', width: 120 }, { field: 'fromDate', headerName: 'From', width: 120, valueFormatter: (v: string) => new Date(v).toLocaleDateString('en-IN') }, { field: 'toDate', headerName: 'To', width: 120, valueFormatter: (v: string) => new Date(v).toLocaleDateString('en-IN') }, { field: 'days', headerName: 'Days', width: 80 }, { field: 'status', headerName: 'Status', width: 120, renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'APPROVED' ? 'success' : p.value === 'REJECTED' ? 'error' : 'default'} /> }, { field: 'reason', headerName: 'Reason', flex: 1 }];
  const salaryColumns: GridColDef[] = [{ field: 'month', headerName: 'Month', width: 80 }, { field: 'year', headerName: 'Year', width: 80 }, { field: 'netSalary', headerName: 'Net Salary', width: 130, valueFormatter: (v: number) => `₹${Number(v).toLocaleString()}` }, { field: 'status', headerName: 'Status', width: 120, renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'PAID' ? 'success' : 'default'} /> }];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>HR & Payroll</Typography>
        <Box display="flex" gap={1}><Button variant="outlined">Apply Leave</Button><Button variant="contained">Process Salary</Button></Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}><Tabs value={tab} onChange={(_, v) => setTab(v)}><Tab label="Leave Applications" /><Tab label="Salary Records" /><Tab label="Salary Structures" /></Tabs></Box>
      {tab === 0 && <Card><CardContent><DataGrid rows={leaves?.data || []} columns={leaveColumns} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} pageSizeOptions={[20]} /></CardContent></Card>}
      {tab === 1 && <Card><CardContent><DataGrid rows={salaries?.data || []} columns={salaryColumns} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} pageSizeOptions={[20]} /></CardContent></Card>}
    </Box>
  );
}
