import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Button, Dialog, DialogTitle,
  DialogContent, DialogActions, TextField, Grid, Chip, InputAdornment,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Add, Search, People } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api/client';
import toast from 'react-hot-toast';

export default function ResellersPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { data, isLoading } = useQuery({
    queryKey: ['resellers', page, search],
    queryFn: () => api.get('/resellers', { page: page + 1, limit: 20, search }),
  });

  const createMutation = useMutation({
    mutationFn: (dto: any) => api.post('/resellers', dto),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['resellers'] }); setOpenDialog(false); reset(); toast.success('Reseller created!'); },
  });

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1.5 },
    { field: 'company', headerName: 'Company', flex: 1 },
    { field: 'commissionPct', headerName: 'Commission %', width: 130, renderCell: (p) => <Chip label={`${p.value}%`} size="small" color="primary" variant="outlined" /> },
    { field: '_count', headerName: 'Schools', width: 100, valueGetter: (_, r) => r._count?.schools || 0, renderCell: (p) => <Chip label={p.value} size="small" icon={<People fontSize="small" />} /> },
    { field: 'isActive', headerName: 'Status', width: 100, renderCell: (p) => <Chip label={p.value ? 'Active' : 'Inactive'} color={p.value ? 'success' : 'default'} size="small" /> },
    { field: 'createdAt', headerName: 'Joined', width: 120, valueFormatter: (v: string) => new Date(v).toLocaleDateString('en-IN') },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box><Typography variant="h5" fontWeight={700}>Resellers</Typography><Typography variant="body2" color="text.secondary">Manage reseller partners and commissions</Typography></Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>Add Reseller</Button>
      </Box>

      <Card>
        <CardContent>
          <TextField size="small" placeholder="Search resellers..." value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} sx={{ mb: 2, minWidth: 260 }} />
          <DataGrid rows={data?.data || []} columns={columns} rowCount={data?.meta?.total || 0} loading={isLoading} pageSizeOptions={[20]} paginationMode="server" paginationModel={{ page, pageSize: 20 }} onPaginationModelChange={(m) => setPage(m.page)} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} />
        </CardContent>
      </Card>

      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); reset(); }} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Add New Reseller</DialogTitle>
        <DialogContent>
          <Box component="form" id="reseller-form" onSubmit={handleSubmit((d) => createMutation.mutate(d))} display="flex" flexDirection="column" gap={2} pt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}><TextField label="Name *" {...register('name', { required: true })} error={!!errors.name} fullWidth size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Email *" type="email" {...register('email', { required: true })} error={!!errors.email} fullWidth size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Phone" {...register('phone')} fullWidth size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Company" {...register('company')} fullWidth size="small" /></Grid>
              <Grid item xs={12}><TextField label="Commission %" type="number" {...register('commissionPct')} defaultValue={10} inputProps={{ min: 0, max: 50 }} fullWidth size="small" helperText="Percentage of subscription revenue" /></Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => { setOpenDialog(false); reset(); }}>Cancel</Button>
          <Button type="submit" form="reseller-form" variant="contained" disabled={createMutation.isPending}>{createMutation.isPending ? 'Creating...' : 'Add Reseller'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
