import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Avatar, Chip, TextField, InputAdornment, Button } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Search, Add } from '@mui/icons-material';
import { api } from '../../../services/api/client';

export default function TeachersPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const { data, isLoading } = useQuery({ queryKey: ['teachers', page, search], queryFn: () => api.get('/teachers', { page: page + 1, limit: 20, search }) });
  const columns: GridColDef[] = [
    { field: 'employeeId', headerName: 'Employee ID', width: 130 },
    { field: 'name', headerName: 'Teacher', flex: 1, renderCell: (p: GridRenderCellParams) => <Box display="flex" alignItems="center" gap={1.5}><Avatar sx={{ width: 30, height: 30, bgcolor: 'secondary.main', fontSize: 12 }}>{p.row.firstName?.[0]}</Avatar><Typography variant="body2">{p.row.firstName} {p.row.lastName}</Typography></Box>, valueGetter: (_, r) => `${r.firstName} ${r.lastName}` },
    { field: 'designation', headerName: 'Designation', flex: 1 },
    { field: 'department', headerName: 'Department', flex: 1 },
    { field: 'experience', headerName: 'Exp (Yrs)', width: 100 },
    { field: 'status', headerName: 'Status', width: 100, renderCell: (p) => <Chip label={p.value} color={p.value === 'ACTIVE' ? 'success' : 'default'} size="small" /> },
  ];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Teachers</Typography>
        <Button variant="contained" startIcon={<Add />}>Add Teacher</Button>
      </Box>
      <Card><CardContent>
        <TextField size="small" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} sx={{ mb: 2, minWidth: 260 }} />
        <DataGrid rows={data?.data || []} columns={columns} rowCount={data?.meta?.total || 0} loading={isLoading} pageSizeOptions={[20]} paginationMode="server" paginationModel={{ page, pageSize: 20 }} onPaginationModelChange={(m) => setPage(m.page)} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} />
      </CardContent></Card>
    </Box>
  );
}
