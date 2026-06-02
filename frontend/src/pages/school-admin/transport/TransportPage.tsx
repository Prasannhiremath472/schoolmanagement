import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Button, Tab, Tabs, Grid, Chip } from '@mui/material';
import { DirectionsBus, Add } from '@mui/icons-material';
import { api } from '../../../services/api/client';

export default function TransportPage() {
  const [tab, setTab] = useState(0);
  const { data: vehicles } = useQuery({ queryKey: ['vehicles'], queryFn: () => api.get('/transport/vehicles') });
  const { data: routes } = useQuery({ queryKey: ['routes'], queryFn: () => api.get('/transport/routes') });
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Transport</Typography>
        <Button variant="contained" startIcon={<Add />}>Add Vehicle</Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}><Tabs value={tab} onChange={(_, v) => setTab(v)}><Tab label="Vehicles" /><Tab label="Routes" /><Tab label="Allocations" /></Tabs></Box>
      {tab === 0 && <Grid container spacing={2}>{vehicles?.data?.map((v: any) => (<Grid item xs={12} md={4} key={v.id}><Card variant="outlined"><CardContent><Box display="flex" alignItems="center" gap={1.5} mb={1}><DirectionsBus color="primary" /><Typography fontWeight={600}>{v.vehicleNo}</Typography></Box><Typography variant="body2">{v.vehicleType} | Capacity: {v.capacity}</Typography><Typography variant="body2" color="text.secondary">Driver: {v.driverName || '—'}</Typography><Chip label={v.isActive ? 'Active' : 'Inactive'} color={v.isActive ? 'success' : 'default'} size="small" sx={{ mt: 1 }} /></CardContent></Card></Grid>))}</Grid>}
      {tab === 1 && <Grid container spacing={2}>{routes?.data?.map((r: any) => (<Grid item xs={12} md={4} key={r.id}><Card variant="outlined"><CardContent><Typography fontWeight={600}>Route {r.routeNo}: {r.name}</Typography><Typography variant="body2" color="text.secondary">{r.startPoint} → {r.endPoint}</Typography><Typography variant="body2">Fare: ₹{Number(r.monthlyFare).toLocaleString()}/month</Typography><Typography variant="caption" color="text.secondary">{r.pickupPoints?.length || 0} stops</Typography></CardContent></Card></Grid>))}</Grid>}
    </Box>
  );
}
