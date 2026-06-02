import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import {
  Box, Card, CardContent, Typography, Button, TextField,
  Chip, IconButton, Avatar, Grid, InputAdornment, MenuItem,
  Select, FormControl, InputLabel,
} from '@mui/material';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import {
  Add, Search, FileDownload, Upload, Visibility,
  Edit, PersonOff,
} from '@mui/icons-material';
import { api } from '../../../services/api/client';
import toast from 'react-hot-toast';

const statusColors: Record<string, any> = {
  ACTIVE: 'success',
  INACTIVE: 'default',
  TRANSFERRED: 'info',
  ALUMNI: 'secondary',
};

export default function StudentsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('ACTIVE');
  const [page, setPage] = useState(0);
  const [selectionModel, setSelectionModel] = useState<string[]>([]);

  const { data, isLoading } = useQuery({
    queryKey: ['students', page, search, status],
    queryFn: () => {
      const params: any = { page: page + 1, limit: 20 };
      if (search?.trim()) params.search = search.trim();
      if (status) params.status = status;
      return api.get('/students', params);
    },
    staleTime: 60000,
  });

  const deactivateMutation = useMutation({
    mutationFn: (id: string) => api.delete(`/students/${id}`),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['students'] }); toast.success('Student deactivated'); },
  });

  const columns: GridColDef[] = [
    {
      field: 'admissionNo', headerName: 'Admission No', width: 130,
      renderCell: (params) => <Typography variant="body2" fontWeight={600} color="primary">{params.value}</Typography>,
    },
    {
      field: 'name', headerName: 'Student Name', flex: 1.5, minWidth: 160,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" alignItems="center" gap={1.5}>
          <Avatar sx={{ width: 30, height: 30, fontSize: 12, bgcolor: 'primary.main' }}>
            {params.row.firstName?.[0]}
          </Avatar>
          <Box>
            <Typography variant="body2" fontWeight={600}>{params.row.firstName} {params.row.lastName}</Typography>
            <Typography variant="caption" color="text.secondary">{params.row.gender}</Typography>
          </Box>
        </Box>
      ),
      valueGetter: (_, row) => `${row.firstName} ${row.lastName}`,
    },
    {
      field: 'class', headerName: 'Class & Section', width: 140,
      renderCell: (params: GridRenderCellParams) => {
        const section = params.row.sections?.[0]?.section;
        return section ? (
          <Chip label={`${section.class?.name} - ${section.name}`} size="small" variant="outlined" />
        ) : '—';
      },
    },
    { field: 'dateOfBirth', headerName: 'Date of Birth', width: 120, valueFormatter: (v: string) => v ? new Date(v).toLocaleDateString('en-IN') : '—' },
    {
      field: 'status', headerName: 'Status', width: 100,
      renderCell: (params) => <Chip label={params.value} color={statusColors[params.value] || 'default'} size="small" />,
    },
    {
      field: 'actions', headerName: 'Actions', width: 120, sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box display="flex" gap={0.5}>
          <IconButton size="small" onClick={() => navigate(`/students/${params.row.id}`)}>
            <Visibility fontSize="small" color="action" />
          </IconButton>
          <IconButton size="small" onClick={() => navigate(`/students/${params.row.id}/edit`)}>
            <Edit fontSize="small" color="action" />
          </IconButton>
          <IconButton size="small" onClick={() => deactivateMutation.mutate(params.row.id)}>
            <PersonOff fontSize="small" color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Students</Typography>
          <Typography variant="body2" color="text.secondary">
            {data?.meta?.total || 0} students registered
          </Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Upload />}>Import</Button>
          <Button variant="outlined" startIcon={<FileDownload />}>Export</Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => navigate('/students/new')}>
            Admit Student
          </Button>
        </Box>
      </Box>

      <Card>
        <CardContent>
          <Box display="flex" gap={2} mb={2} flexWrap="wrap">
            <TextField
              size="small"
              placeholder="Search students..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }}
              sx={{ minWidth: 260 }}
            />
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel>Status</InputLabel>
              <Select value={status} label="Status" onChange={(e) => setStatus(e.target.value)}>
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
                <MenuItem value="TRANSFERRED">Transferred</MenuItem>
                <MenuItem value="ALUMNI">Alumni</MenuItem>
              </Select>
            </FormControl>
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
            checkboxSelection
            onRowSelectionModelChange={(ids) => setSelectionModel(ids as string[])}
            rowSelectionModel={selectionModel}
            autoHeight
            disableRowSelectionOnClick
            rowHeight={56}
            sx={{ border: 'none', '& .MuiDataGrid-columnHeaders': { bgcolor: 'background.default' } }}
          />
        </CardContent>
      </Card>
    </Box>
  );
}
