import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Button, Tab, Tabs, TextField, InputAdornment, Grid, Chip } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Add, Search, LibraryBooks } from '@mui/icons-material';
import { api } from '../../../services/api/client';

export default function LibraryPage() {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState('');
  const { data, isLoading } = useQuery({ queryKey: ['books', search], queryFn: () => api.get('/library/books', { search, limit: 20 }) });
  const { data: issues } = useQuery({ queryKey: ['active-issues'], queryFn: () => api.get('/library/active-issues', { limit: 20 }) });
  const bookColumns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 2 },
    { field: 'author', headerName: 'Author', flex: 1 },
    { field: 'isbn', headerName: 'ISBN', width: 140 },
    { field: 'availableCopies', headerName: 'Available', width: 100, renderCell: (p) => <Chip label={`${p.value}/${p.row.totalCopies}`} color={p.value > 0 ? 'success' : 'error'} size="small" /> },
    { field: 'shelfNo', headerName: 'Shelf', width: 100 },
  ];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Library</Typography>
        <Box display="flex" gap={1}><Button variant="outlined" startIcon={<Add />}>Add Book</Button><Button variant="contained">Issue Book</Button></Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}><Tabs value={tab} onChange={(_, v) => setTab(v)}><Tab label="Books" /><Tab label="Active Issues" /></Tabs></Box>
      {tab === 0 && <Card><CardContent>
        <TextField size="small" placeholder="Search books..." value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search fontSize="small" /></InputAdornment> }} sx={{ mb: 2 }} />
        <DataGrid rows={data?.data || []} columns={bookColumns} loading={isLoading} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} pageSizeOptions={[20]} />
      </CardContent></Card>}
      {tab === 1 && <Card><CardContent><DataGrid rows={issues?.data || []} columns={[{ field: 'book', headerName: 'Book', flex: 1, valueGetter: (_, r) => r.book?.title }, { field: 'student', headerName: 'Student', flex: 1, valueGetter: (_, r) => r.libraryCard?.student ? `${r.libraryCard.student.firstName} ${r.libraryCard.student.lastName}` : '—' }, { field: 'dueDate', headerName: 'Due Date', width: 130, valueFormatter: (v: string) => new Date(v).toLocaleDateString('en-IN') }]} autoHeight disableRowSelectionOnClick sx={{ border: 'none' }} pageSizeOptions={[20]} /></CardContent></Card>}
    </Box>
  );
}
