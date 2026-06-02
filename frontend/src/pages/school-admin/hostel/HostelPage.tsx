import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Button, Grid, Chip,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Tab, Tabs, Avatar, LinearProgress, Table, TableHead,
  TableBody, TableRow, TableCell, IconButton, Tooltip,
  FormControl, InputLabel, Select, MenuItem, Alert,
} from '@mui/material';
import {
  Add, Hotel, People, Payment, CheckCircle,
  Edit, PersonOff, MenuBook,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { api } from '../../../services/api/client';
import toast from 'react-hot-toast';

export default function HostelPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState(0);
  const [selectedHostel, setSelectedHostel] = useState<any>(null);
  const [openHostelDialog, setOpenHostelDialog] = useState(false);
  const [openRoomDialog, setOpenRoomDialog] = useState(false);
  const [openAllocDialog, setOpenAllocDialog] = useState(false);
  const [openFeeDialog, setOpenFeeDialog] = useState(false);

  const { register: regH, handleSubmit: handleH, reset: resetH } = useForm();
  const { register: regR, handleSubmit: handleR, reset: resetR } = useForm();
  const { register: regA, handleSubmit: handleA, reset: resetA } = useForm();
  const { register: regF, handleSubmit: handleF, reset: resetF } = useForm();

  const { data: hostels, isLoading } = useQuery({
    queryKey: ['hostels'],
    queryFn: () => api.get('/hostel'),
  });

  const { data: stats } = useQuery({
    queryKey: ['hostel-stats'],
    queryFn: () => api.get('/hostel/stats'),
  });

  const { data: allocations } = useQuery({
    queryKey: ['hostel-allocations'],
    queryFn: () => api.get('/hostel/allocations/all', { limit: 50 }),
  });

  const { data: rooms } = useQuery({
    queryKey: ['hostel-rooms', selectedHostel?.id],
    queryFn: () => api.get(`/hostel/${selectedHostel.id}/rooms`),
    enabled: !!selectedHostel?.id,
  });

  const createHostelMutation = useMutation({
    mutationFn: (dto: any) => api.post('/hostel', dto),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['hostels'] }); setOpenHostelDialog(false); resetH(); toast.success('Hostel created!'); },
  });

  const createRoomMutation = useMutation({
    mutationFn: (dto: any) => api.post('/hostel/rooms', { ...dto, hostelId: selectedHostel?.id }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['hostel-rooms'] }); setOpenRoomDialog(false); resetR(); toast.success('Room created!'); },
  });

  const allocateMutation = useMutation({
    mutationFn: (dto: any) => api.post('/hostel/allocate', dto),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['hostel-allocations'] }); setOpenAllocDialog(false); resetA(); toast.success('Student allocated!'); },
  });

  const collectFeeMutation = useMutation({
    mutationFn: (dto: any) => api.post('/hostel/fees/collect', dto),
    onSuccess: (res: any) => { setOpenFeeDialog(false); resetF(); toast.success(`Fee collected! Receipt: ${res.data?.receiptNo}`); },
  });

  const hostelList = hostels?.data || [];
  const statsList = stats?.data || [];

  const totalCapacity = statsList.reduce((s: number, h: any) => s + (h.totalCapacity || 0), 0);
  const totalOccupied = statsList.reduce((s: number, h: any) => s + (h.occupied || 0), 0);
  const occupancyPct = totalCapacity > 0 ? Math.round((totalOccupied / totalCapacity) * 100) : 0;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Hostel Management</Typography>
          <Typography variant="body2" color="text.secondary">Manage hostels, rooms, and student allocations</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Payment />} onClick={() => setOpenFeeDialog(true)}>Collect Fee</Button>
          <Button variant="outlined" startIcon={<People />} onClick={() => setOpenAllocDialog(true)}>Allocate Student</Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => setOpenHostelDialog(true)}>Add Hostel</Button>
        </Box>
      </Box>

      {/* Stats */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Total Hostels', value: hostelList.length, color: '#1976d2', icon: <Hotel /> },
          { label: 'Total Capacity', value: totalCapacity, color: '#9c27b0', icon: <Hotel /> },
          { label: 'Occupied', value: totalOccupied, color: '#2e7d32', icon: <People /> },
          { label: 'Vacant', value: totalCapacity - totalOccupied, color: '#ed6c02', icon: <CheckCircle /> },
        ].map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: `${s.color}20`, color: s.color }}>{s.icon}</Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">{s.label}</Typography>
                  <Typography variant="h5" fontWeight={700} color={s.color}>{s.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Occupancy bar */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" mb={1}>
            <Typography variant="body2" fontWeight={600}>Overall Occupancy</Typography>
            <Typography variant="body2" fontWeight={700} color={occupancyPct > 80 ? 'error.main' : 'success.main'}>{occupancyPct}%</Typography>
          </Box>
          <LinearProgress variant="determinate" value={occupancyPct} color={occupancyPct > 80 ? 'error' : 'success'} sx={{ height: 8, borderRadius: 4 }} />
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Hostels & Rooms" />
          <Tab label="All Allocations" />
          <Tab label="Fee Dues" />
          <Tab label="Attendance" />
        </Tabs>
      </Box>

      {/* TAB 0: Hostels */}
      {tab === 0 && (
        <Grid container spacing={2}>
          {hostelList.map((hostel: any) => {
            const hStat = statsList.find((s: any) => s.id === hostel.id);
            return (
              <Grid item xs={12} md={6} key={hostel.id}>
                <Card variant="outlined" sx={{ cursor: 'pointer', borderColor: selectedHostel?.id === hostel.id ? 'primary.main' : 'divider', borderWidth: selectedHostel?.id === hostel.id ? 2 : 1 }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                      <Box display="flex" alignItems="center" gap={1.5}>
                        <Avatar sx={{ bgcolor: hostel.type === 'BOYS' ? '#1976d220' : '#e91e6320', color: hostel.type === 'BOYS' ? '#1976d2' : '#e91e63' }}>
                          <Hotel />
                        </Avatar>
                        <Box>
                          <Typography fontWeight={700}>{hostel.name}</Typography>
                          <Chip label={hostel.type} size="small" color={hostel.type === 'BOYS' ? 'primary' : 'secondary'} />
                        </Box>
                      </Box>
                      <Box textAlign="right">
                        <Typography variant="caption" color="text.secondary">Occupancy</Typography>
                        <Typography fontWeight={700} color={hStat?.occupancyRate > 80 ? 'error.main' : 'success.main'}>{hStat?.occupancyRate || 0}%</Typography>
                      </Box>
                    </Box>

                    <Grid container spacing={1} mb={2}>
                      {[
                        { label: 'Rooms', value: hStat?.totalRooms || hostel.rooms?.length || 0 },
                        { label: 'Capacity', value: hStat?.totalCapacity || hostel.capacity },
                        { label: 'Occupied', value: hStat?.occupied || 0 },
                        { label: 'Vacant', value: (hStat?.totalCapacity || hostel.capacity) - (hStat?.occupied || 0) },
                      ].map((stat) => (
                        <Grid item xs={3} key={stat.label}>
                          <Box textAlign="center" sx={{ p: 1, borderRadius: 1, bgcolor: 'background.default' }}>
                            <Typography variant="h6" fontWeight={700}>{stat.value}</Typography>
                            <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    <Typography variant="caption" color="text.secondary">
                      Warden: {hostel.wardenName || '—'} | {hostel.wardenPhone || ''}
                    </Typography>

                    <Box mt={1.5} display="flex" gap={1}>
                      <Button size="small" variant="outlined" onClick={() => { setSelectedHostel(hostel); }}>
                        View Rooms
                      </Button>
                      <Button size="small" variant="outlined" startIcon={<Add />}
                        onClick={() => { setSelectedHostel(hostel); setOpenRoomDialog(true); }}>
                        Add Room
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}

          {/* Rooms for selected hostel */}
          {selectedHostel && (
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={2}>
                    Rooms — {selectedHostel.name}
                  </Typography>
                  <Grid container spacing={1.5}>
                    {(rooms?.data || []).map((room: any) => {
                      const occupied = room.allocations?.length || 0;
                      const pct = room.capacity > 0 ? (occupied / room.capacity) * 100 : 0;
                      return (
                        <Grid item xs={6} sm={4} md={3} lg={2} key={room.id}>
                          <Box sx={{ p: 1.5, borderRadius: 2, border: '1px solid', borderColor: pct >= 100 ? 'error.light' : pct > 50 ? 'warning.light' : 'success.light', bgcolor: pct >= 100 ? '#fff5f5' : pct > 50 ? '#fffde7' : '#f0fff4', textAlign: 'center' }}>
                            <Typography variant="subtitle2" fontWeight={700}>Room {room.roomNo}</Typography>
                            <Typography variant="caption" color="text.secondary" display="block">{room.floor} | {room.roomType}</Typography>
                            <Typography variant="body2" fontWeight={600} color={pct >= 100 ? 'error.main' : 'success.main'}>{occupied}/{room.capacity}</Typography>
                            <Typography variant="caption">₹{Number(room.monthlyFare).toLocaleString()}/mo</Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                    {rooms?.data?.length === 0 && <Grid item xs={12}><Alert severity="info">No rooms added yet. Click "Add Room" to create rooms.</Alert></Grid>}
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          )}

          {hostelList.length === 0 && !isLoading && (
            <Grid item xs={12}>
              <Box textAlign="center" py={8}>
                <Hotel sx={{ fontSize: 72, color: 'text.disabled', mb: 2 }} />
                <Typography color="text.secondary">No hostels added yet.</Typography>
                <Button variant="contained" sx={{ mt: 2 }} startIcon={<Add />} onClick={() => setOpenHostelDialog(true)}>Add First Hostel</Button>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* TAB 1: Allocations */}
      {tab === 1 && (
        <Card>
          <CardContent>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 700, bgcolor: 'background.default' } }}>
                  <TableCell>Student</TableCell>
                  <TableCell>Hostel</TableCell>
                  <TableCell>Room</TableCell>
                  <TableCell>Join Date</TableCell>
                  <TableCell>Monthly Fare</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(allocations?.data || []).map((alloc: any) => (
                  <TableRow key={alloc.id} hover>
                    <TableCell>
                      <Box>
                        <Typography variant="body2" fontWeight={600}>{alloc.student?.firstName} {alloc.student?.lastName}</Typography>
                        <Typography variant="caption" color="text.secondary">{alloc.student?.admissionNo}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{alloc.room?.hostel?.name || '—'}</TableCell>
                    <TableCell><Chip label={`Room ${alloc.room?.roomNo}`} size="small" /></TableCell>
                    <TableCell>{alloc.joinDate ? new Date(alloc.joinDate).toLocaleDateString('en-IN') : '—'}</TableCell>
                    <TableCell>₹{Number(alloc.room?.monthlyFare || 0).toLocaleString()}/mo</TableCell>
                    <TableCell><Chip label={alloc.isActive ? 'Active' : 'Vacated'} color={alloc.isActive ? 'success' : 'default'} size="small" /></TableCell>
                    <TableCell>
                      {alloc.isActive && (
                        <Tooltip title="Vacate Student">
                          <IconButton size="small" color="error" onClick={() => api.patch(`/hostel/vacate/${alloc.studentId}`)}>
                            <PersonOff fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
                {!allocations?.data?.length && <TableRow><TableCell colSpan={7} align="center" sx={{ py: 4, color: 'text.secondary' }}>No allocations found</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* TAB 2: Fee Dues */}
      {tab === 2 && (
        <Grid container spacing={2}>
          {hostelList.map((hostel: any) => (
            <Grid item xs={12} md={6} key={hostel.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={1}>{hostel.name}</Typography>
                  <Button size="small" variant="outlined" onClick={() => toast('Select month/year to view dues', { icon: 'ℹ️' })}>
                    View Dues for Current Month
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {hostelList.length === 0 && <Grid item xs={12}><Alert severity="info">No hostels configured yet.</Alert></Grid>}
        </Grid>
      )}

      {/* TAB 3: Attendance */}
      {tab === 3 && (
        <Grid container spacing={2}>
          {hostelList.map((hostel: any) => (
            <Grid item xs={12} md={6} key={hostel.id}>
              <Card>
                <CardContent>
                  <Typography variant="h6" fontWeight={600} mb={1}>{hostel.name}</Typography>
                  <Button size="small" variant="contained" onClick={() => toast('Mark hostel attendance for today', { icon: '✅' })}>
                    Mark Attendance Today
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {hostelList.length === 0 && <Alert severity="info">No hostels configured yet.</Alert>}
        </Grid>
      )}

      {/* Add Hostel Dialog */}
      <Dialog open={openHostelDialog} onClose={() => setOpenHostelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Add New Hostel</DialogTitle>
        <DialogContent>
          <Box component="form" id="hostel-form" onSubmit={handleH((d) => createHostelMutation.mutate(d))} display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField label="Hostel Name *" {...regH('name', { required: true })} size="small" fullWidth />
            <FormControl size="small" fullWidth>
              <InputLabel>Type</InputLabel>
              <Select {...regH('type')} label="Type" defaultValue="BOYS">
                <MenuItem value="BOYS">Boys</MenuItem>
                <MenuItem value="GIRLS">Girls</MenuItem>
                <MenuItem value="MIXED">Mixed</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Total Capacity" type="number" {...regH('capacity')} size="small" fullWidth defaultValue={50} />
            <TextField label="Warden Name" {...regH('wardenName')} size="small" fullWidth />
            <TextField label="Warden Phone" {...regH('wardenPhone')} size="small" fullWidth />
            <TextField label="Address" {...regH('address')} size="small" fullWidth />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenHostelDialog(false)}>Cancel</Button>
          <Button type="submit" form="hostel-form" variant="contained" disabled={createHostelMutation.isPending}>
            {createHostelMutation.isPending ? 'Creating...' : 'Create Hostel'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add Room Dialog */}
      <Dialog open={openRoomDialog} onClose={() => setOpenRoomDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Add Room — {selectedHostel?.name}</DialogTitle>
        <DialogContent>
          <Box component="form" id="room-form" onSubmit={handleR((d) => createRoomMutation.mutate(d))} display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField label="Room Number *" {...regR('roomNo', { required: true })} size="small" fullWidth placeholder="e.g. B01" />
            <TextField label="Floor" {...regR('floor')} size="small" fullWidth placeholder="e.g. Floor 1" />
            <FormControl size="small" fullWidth>
              <InputLabel>Room Type</InputLabel>
              <Select {...regR('roomType')} label="Room Type" defaultValue="DORM">
                <MenuItem value="DORM">Dormitory</MenuItem>
                <MenuItem value="SINGLE">Single</MenuItem>
                <MenuItem value="DOUBLE">Double</MenuItem>
              </Select>
            </FormControl>
            <TextField label="Capacity" type="number" {...regR('capacity')} size="small" fullWidth defaultValue={4} />
            <TextField label="Monthly Fare (₹)" type="number" {...regR('monthlyFare', { required: true })} size="small" fullWidth defaultValue={2500} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenRoomDialog(false)}>Cancel</Button>
          <Button type="submit" form="room-form" variant="contained" disabled={createRoomMutation.isPending}>Add Room</Button>
        </DialogActions>
      </Dialog>

      {/* Allocate Student Dialog */}
      <Dialog open={openAllocDialog} onClose={() => setOpenAllocDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Allocate Student to Hostel</DialogTitle>
        <DialogContent>
          <Box component="form" id="alloc-form" onSubmit={handleA((d) => allocateMutation.mutate({ ...d, joinDate: d.joinDate || new Date().toISOString() }))} display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField label="Student ID (UUID)" {...regA('studentId', { required: true })} size="small" fullWidth helperText="Enter the student's system ID" />
            <TextField label="Room ID (UUID)" {...regA('roomId', { required: true })} size="small" fullWidth helperText="Enter the room's system ID" />
            <TextField label="Join Date" type="date" {...regA('joinDate')} size="small" fullWidth InputLabelProps={{ shrink: true }} defaultValue={new Date().toISOString().split('T')[0]} />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenAllocDialog(false)}>Cancel</Button>
          <Button type="submit" form="alloc-form" variant="contained" disabled={allocateMutation.isPending}>Allocate</Button>
        </DialogActions>
      </Dialog>

      {/* Collect Hostel Fee Dialog */}
      <Dialog open={openFeeDialog} onClose={() => setOpenFeeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Collect Hostel Fee</DialogTitle>
        <DialogContent>
          <Box component="form" id="fee-form" onSubmit={handleF((d) => collectFeeMutation.mutate(d))} display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField label="Student ID" {...regF('studentId', { required: true })} size="small" fullWidth />
            <TextField label="Amount (₹)" type="number" {...regF('amount', { required: true })} size="small" fullWidth />
            <Grid container spacing={2}>
              <Grid item xs={6}><TextField label="Month" type="number" {...regF('month')} size="small" fullWidth defaultValue={new Date().getMonth() + 1} inputProps={{ min: 1, max: 12 }} /></Grid>
              <Grid item xs={6}><TextField label="Year" type="number" {...regF('year')} size="small" fullWidth defaultValue={new Date().getFullYear()} /></Grid>
            </Grid>
            <FormControl size="small" fullWidth>
              <InputLabel>Payment Mode</InputLabel>
              <Select {...regF('paymentMode')} label="Payment Mode" defaultValue="CASH">
                <MenuItem value="CASH">Cash</MenuItem>
                <MenuItem value="UPI">UPI</MenuItem>
                <MenuItem value="NETBANKING">Net Banking</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenFeeDialog(false)}>Cancel</Button>
          <Button type="submit" form="fee-form" variant="contained" disabled={collectFeeMutation.isPending}>Collect Fee</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
