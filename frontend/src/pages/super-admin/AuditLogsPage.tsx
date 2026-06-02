import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { api } from '../../services/api/client';

export default function AuditLogsPage() {
  const [page, setPage] = useState(0);
  const { data, isLoading } = useQuery({ queryKey: ['audit-logs', page], queryFn: () => api.get('/super-admin/audit-logs', { page: page + 1, limit: 20 }) });
  const columns: GridColDef[] = [
    { field: 'action', headerName: 'Action', width: 160 },
    { field: 'entity', headerName: 'Entity', width: 140 },
    { field: 'ipAddress', headerName: 'IP Address', width: 140 },
    { field: 'createdAt', headerName: 'Timestamp', flex: 1, valueFormatter: (v: string) => v ? new Date(v).toLocaleString('en-IN') : '—' },
  ];
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Audit Logs</Typography>
      <Card>
        <CardContent>
          <DataGrid rows={data?.data || []} columns={columns} rowCount={data?.meta?.total || 0} loading={isLoading} pageSizeOptions={[20]} paginationMode="server" paginationModel={{ page, pageSize: 20 }} onPaginationModelChange={(m) => setPage(m.page)} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} />
        </CardContent>
      </Card>
    </Box>
  );
}
