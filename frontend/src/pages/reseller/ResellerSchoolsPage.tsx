import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Grid, Chip, Avatar, TextField, InputAdornment } from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Search, School } from '@mui/icons-material';
import { api } from '../../services/api/client';

export default function ResellerSchoolsPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['reseller-my-schools', page, search],
    queryFn: () => {
      const params: any = { page: page + 1, limit: 20 };
      if (search.trim()) params.search = search.trim();
      return api.get('/reseller-portal/schools', params);
    },
  });

  const columns: GridColDef[] = [
    {
      field: 'name', headerName: 'School Name', flex: 1.5,
      renderCell: (p: GridRenderCellParams) => (
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar sx={{ width: 28, height: 28, bgcolor: p.row.primaryColor || '#1976d2', fontSize: 11 }}>
            {p.row.name?.[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>{p.row.name}</Typography>
            <Typography variant="caption" color="text.secondary">{p.row.slug}</Typography>
          </Box>
        </Box>
      ),
    },
    { field: 'email', headerName: 'Email', flex: 1 },
    { field: 'city', headerName: 'City', width: 120 },
    {
      field: 'status', headerName: 'Status', width: 110,
      renderCell: (p) => <Chip label={p.value} size="small" color={p.value === 'ACTIVE' ? 'success' : p.value === 'TRIAL' ? 'info' : 'default'} />,
    },
    { field: 'createdAt', headerName: 'Joined', width: 110, valueFormatter: (v: string) => new Date(v).toLocaleDateString('en-IN') },
  ];

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>My Schools</Typography>
        <Typography variant="body2" color="text.secondary">Schools registered under your reseller account</Typography>
      </Box>

      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Total', value: data?.meta?.total || 0, color: '#1976d2' },
          { label: 'Active', value: (data?.data || []).filter((s: any) => s.status === 'ACTIVE').length, color: '#2e7d32' },
          { label: 'Trial', value: (data?.data || []).filter((s: any) => s.status === 'TRIAL').length, color: '#ed6c02' },
        ].map((s) => (
          <Grid item xs={12} md={4} key={s.label}>
            <Card><CardContent>
              <Typography color="text.secondary" variant="body2">{s.label} Schools</Typography>
              <Typography variant="h4" fontWeight={800} color={s.color}>{s.value}</Typography>
            </CardContent></Card>
          </Grid>
        ))}
      </Grid>

      <Card>
        <CardContent>
          <TextField size="small" placeholder="Search schools..." value={search} onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
            sx={{ mb: 2, minWidth: 260 }} />
          {(data?.data || []).length === 0 && !isLoading ? (
            <Box textAlign="center" py={6}>
              <School sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography color="text.secondary">No schools assigned yet.</Typography>
              <Typography variant="body2" color="text.disabled" mt={1}>Contact platform admin to assign schools to your account.</Typography>
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
