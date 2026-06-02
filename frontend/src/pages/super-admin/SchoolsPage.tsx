import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Button, TextField,
  Chip, IconButton, Menu, MenuItem, Dialog, DialogTitle,
  DialogContent, DialogActions, Grid, Alert, CircularProgress,
  InputAdornment,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { Add, MoreVert, Search, FilterList } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api/client';
import toast from 'react-hot-toast';

const statusColors: Record<string, any> = {
  ACTIVE: 'success',
  TRIAL: 'info',
  SUSPENDED: 'warning',
  EXPIRED: 'error',
};

export default function SchoolsPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedSchool, setSelectedSchool] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['schools', page, search],
    queryFn: () => api.get('/super-admin/schools', { page: page + 1, limit: 20, search }),
  });

  const createMutation = useMutation({
    mutationFn: (dto: any) => api.post('/super-admin/schools', dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      setOpenDialog(false);
      toast.success('School created successfully!');
    },
    onError: (err: any) => toast.error(err.response?.data?.message),
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: any) => api.patch(`/super-admin/schools/${id}/status`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schools'] });
      toast.success('Status updated');
    },
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'School Name', flex: 1.5, minWidth: 180 },
    { field: 'slug', headerName: 'Slug', flex: 1, minWidth: 130 },
    { field: 'email', headerName: 'Email', flex: 1.5, minWidth: 180 },
    {
      field: 'status', headerName: 'Status', width: 110,
      renderCell: (params: GridRenderCellParams) => (
        <Chip label={params.value} color={statusColors[params.value] || 'default'} size="small" />
      ),
    },
    {
      field: 'createdAt', headerName: 'Created', width: 120,
      valueFormatter: (value: string) => new Date(value).toLocaleDateString('en-IN'),
    },
    {
      field: 'actions', headerName: '', width: 60, sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <IconButton size="small" onClick={(e) => { setAnchorEl(e.currentTarget); setSelectedSchool(params.row); }}>
          <MoreVert fontSize="small" />
        </IconButton>
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Schools</Typography>
          <Typography variant="body2" color="text.secondary">Manage all registered schools</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>
          Add School
        </Button>
      </Box>

      <Card>
        <CardContent>
          <Box display="flex" gap={2} mb={2}>
            <TextField
              size="small"
              placeholder="Search schools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
              sx={{ minWidth: 280 }}
            />
          </Box>

          <DataGrid
            rows={data?.data || []}
            columns={columns}
            rowCount={data?.meta?.total || 0}
            loading={isLoading}
            pageSizeOptions={[20]}
            paginationMode="server"
            paginationModel={{ page, pageSize: 20 }}
            onPaginationModelChange={(m) => setPage(m.page)}
            autoHeight
            disableRowSelectionOnClick
            sx={{ border: 'none', '& .MuiDataGrid-cell': { borderColor: 'divider' } }}
          />
        </CardContent>
      </Card>

      {/* Context Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={() => { statusMutation.mutate({ id: selectedSchool?.id, status: 'ACTIVE' }); setAnchorEl(null); }}>
          Activate
        </MenuItem>
        <MenuItem onClick={() => { statusMutation.mutate({ id: selectedSchool?.id, status: 'SUSPENDED' }); setAnchorEl(null); }}>
          Suspend
        </MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>View Details</MenuItem>
      </Menu>

      {/* Create School Dialog */}
      <Dialog open={openDialog} onClose={() => { setOpenDialog(false); reset(); }} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Add New School</DialogTitle>
        <DialogContent>
          <Box component="form" id="school-form" onSubmit={handleSubmit((d) => createMutation.mutate(d))} display="flex" flexDirection="column" gap={2} pt={1}>
            <Grid container spacing={2}>
              <Grid item xs={12}><TextField label="School Name" {...register('name', { required: true })} error={!!errors.name} helperText={errors.name && 'Required'} fullWidth size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Slug (subdomain)" {...register('slug', { required: true })} placeholder="springdale-school" error={!!errors.slug} helperText="Lowercase letters, hyphens only" fullWidth size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField label="School Email" type="email" {...register('email', { required: true })} error={!!errors.email} fullWidth size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField label="Phone" {...register('phone')} fullWidth size="small" /></Grid>
              <Grid item xs={12} sm={6}><TextField label="City" {...register('city')} fullWidth size="small" /></Grid>
              <Grid item xs={12}><TextField label="Admin Email" type="email" {...register('adminEmail', { required: true })} helperText="Admin login email" error={!!errors.adminEmail} fullWidth size="small" /></Grid>
              <Grid item xs={12}><TextField label="Admin Password" type="password" {...register('adminPassword')} helperText="Default: SchoolAdmin@123" fullWidth size="small" /></Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button type="submit" form="school-form" variant="contained" disabled={createMutation.isPending}>
            {createMutation.isPending ? 'Creating...' : 'Create School'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
