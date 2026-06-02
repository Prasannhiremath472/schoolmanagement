import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Button, Grid, FormControl,
  InputLabel, Select, MenuItem, Chip, Avatar, ToggleButton,
  ToggleButtonGroup, CircularProgress, Alert, LinearProgress,
} from '@mui/material';
import { Save, QrCode, CheckCircle, Cancel } from '@mui/icons-material';
import dayjs from 'dayjs';
import { api } from '../../services/api/client';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import toast from 'react-hot-toast';

export default function TeacherAttendance() {
  const { user } = useSelector((state: RootState) => state.auth);
  const today = dayjs().format('YYYY-MM-DD');
  const [date, setDate] = useState(today);
  const [sectionId, setSectionId] = useState('');
  const [academicYearId, setAcademicYearId] = useState('');
  const [attendance, setAttendance] = useState<Record<string, string>>({});

  const { data: academicYears } = useQuery({
    queryKey: ['academic-years'],
    queryFn: () => api.get('/academic/years'),
  });

  useEffect(() => {
    const current = academicYears?.data?.find((y: any) => y.isCurrent);
    if (current) setAcademicYearId(current.id);
  }, [academicYears]);

  const { data: sectionsData } = useQuery({
    queryKey: ['teacher-sections', user?.id],
    queryFn: () => api.get('/academic/sections', { teacherId: user?.id }),
  });

  const { data: sectionData, isLoading, refetch } = useQuery({
    queryKey: ['section-attendance', sectionId, date],
    queryFn: () => api.get(`/attendance/section/${sectionId}`, { date }),
    enabled: !!sectionId,
  });

  useEffect(() => {
    if (sectionData?.data) {
      const init: Record<string, string> = {};
      sectionData.data.forEach((s: any) => {
        init[s.studentId] = s.status === 'NOT_MARKED' ? 'PRESENT' : s.status;
      });
      setAttendance(init);
    }
  }, [sectionData]);

  const markMutation = useMutation({
    mutationFn: (payload: any) => api.post('/attendance/bulk', payload),
    onSuccess: () => { toast.success('Attendance saved successfully!'); refetch(); },
    onError: () => toast.error('Failed to save attendance'),
  });

  const handleSave = () => {
    if (!sectionId || !academicYearId) return toast.error('Select section and academic year');
    const records = Object.entries(attendance).map(([studentId, status]) => ({ studentId, status }));
    markMutation.mutate({ sectionId, academicYearId, date, records });
  };

  const students = sectionData?.data || [];
  const presentCount = Object.values(attendance).filter((s) => s === 'PRESENT').length;
  const absentCount = Object.values(attendance).filter((s) => s === 'ABSENT').length;
  const lateCount = Object.values(attendance).filter((s) => s === 'LATE').length;
  const attendanceRate = students.length > 0 ? (presentCount / students.length) * 100 : 0;

  const statusColor = (s: string) => ({ PRESENT: 'success', ABSENT: 'error', LATE: 'warning', HALF_DAY: 'info' }[s] as any || 'default');

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Mark Attendance</Typography>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<QrCode />} size="small">Generate QR</Button>
          <Button variant="contained" startIcon={<Save />} onClick={handleSave} disabled={markMutation.isPending || !sectionId}>
            {markMutation.isPending ? 'Saving...' : 'Save Attendance'}
          </Button>
        </Box>
      </Box>

      {/* Controls */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Section</InputLabel>
                <Select value={sectionId} label="Section" onChange={(e) => setSectionId(e.target.value)}>
                  {(sectionsData?.data || []).map((s: any) => (
                    <MenuItem key={s.id} value={s.id}>{s.class?.name} - {s.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <input type="date" value={date} max={today}
                onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14 }} />
            </Grid>
            <Grid item xs={12} sm={5}>
              {sectionId && students.length > 0 && (
                <Box>
                  <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
                    <Chip icon={<CheckCircle fontSize="small" />} label={`Present: ${presentCount}`} color="success" size="small" />
                    <Chip icon={<Cancel fontSize="small" />} label={`Absent: ${absentCount}`} color="error" size="small" />
                    <Chip label={`Total: ${students.length}`} size="small" />
                  </Box>
                  <LinearProgress variant="determinate" value={attendanceRate} color={attendanceRate >= 75 ? 'success' : 'warning'} sx={{ borderRadius: 1, height: 6 }} />
                  <Typography variant="caption" color="text.secondary">{attendanceRate.toFixed(1)}% attendance</Typography>
                </Box>
              )}
            </Grid>
          </Grid>

          {sectionId && students.length > 0 && (
            <Box mt={2} display="flex" gap={1}>
              <Button size="small" variant="outlined" color="success" onClick={() => { const all: any = {}; students.forEach((s: any) => { all[s.studentId] = 'PRESENT'; }); setAttendance(all); }}>All Present</Button>
              <Button size="small" variant="outlined" color="error" onClick={() => { const all: any = {}; students.forEach((s: any) => { all[s.studentId] = 'ABSENT'; }); setAttendance(all); }}>All Absent</Button>
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Students List */}
      {isLoading && <CircularProgress />}
      {!sectionId && <Alert severity="info">Select a section to mark attendance.</Alert>}

      <Grid container spacing={2}>
        {students.map((student: any) => {
          const status = attendance[student.studentId] || 'PRESENT';
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={student.studentId}>
              <Card variant="outlined" sx={{
                borderColor: status === 'PRESENT' ? 'success.main' : status === 'ABSENT' ? 'error.main' : status === 'LATE' ? 'warning.main' : 'info.main',
                borderWidth: 2, transition: 'all 0.2s',
              }}>
                <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <Avatar sx={{ width: 34, height: 34, bgcolor: 'primary.main', fontSize: 13 }}>
                      {student.name?.split(' ').map((n: string) => n[0]).join('') || '?'}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600} lineHeight={1.2}>{student.name}</Typography>
                      <Typography variant="caption" color="text.secondary">Roll: {student.rollNo || '—'}</Typography>
                    </Box>
                  </Box>
                  <ToggleButtonGroup size="small" exclusive fullWidth value={status}
                    onChange={(_, val) => val && setAttendance((prev) => ({ ...prev, [student.studentId]: val }))}>
                    {['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY'].map((s) => (
                      <ToggleButton key={s} value={s} sx={{ fontSize: 9, py: 0.4, color: status === s ? `${statusColor(s)}.main` : undefined }}>
                        {s === 'HALF_DAY' ? 'H.D' : s[0]}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}
