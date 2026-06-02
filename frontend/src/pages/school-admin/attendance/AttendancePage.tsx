import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Button, Grid,
  Avatar, Chip, ToggleButton, ToggleButtonGroup,
  CircularProgress, Alert, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { CheckCircle, Cancel, Schedule, Save, QrCode } from '@mui/icons-material';
import dayjs from 'dayjs';
import { api } from '../../../services/api/client';
import toast from 'react-hot-toast';

const STATUS_OPTIONS = ['PRESENT', 'ABSENT', 'LATE', 'HALF_DAY'];
const STATUS_COLORS: any = { PRESENT: 'success', ABSENT: 'error', LATE: 'warning', HALF_DAY: 'info', NOT_MARKED: 'default' };

interface StudentRecord {
  studentId: string;
  name: string;
  admissionNo: string;
  rollNo: string;
  photo?: string;
  status: string;
  remarks?: string;
}

export default function AttendancePage() {
  const today = dayjs().format('YYYY-MM-DD');
  const [date, setDate] = useState(today);
  const [sectionId, setSectionId] = useState('');
  const [academicYearId, setAcademicYearId] = useState('');
  const [attendance, setAttendance] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const { data: sectionsData } = useQuery({
    queryKey: ['sections-list'],
    queryFn: () => api.get('/academic/sections'),
  });

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['section-attendance', sectionId, date],
    queryFn: () => api.get(`/attendance/section/${sectionId}`, { date }),
    enabled: !!sectionId,
  });

  useEffect(() => {
    if (data?.data) {
      const initial: Record<string, string> = {};
      data.data.forEach((s: StudentRecord) => { initial[s.studentId] = s.status === 'NOT_MARKED' ? 'PRESENT' : s.status; });
      setAttendance(initial);
    }
  }, [data]);

  const markMutation = useMutation({
    mutationFn: (payload: any) => api.post('/attendance/bulk', payload),
    onSuccess: () => { toast.success('Attendance saved!'); setSaved(true); },
    onError: () => toast.error('Failed to save attendance'),
  });

  const handleStatusChange = (studentId: string, status: string) => {
    setAttendance((prev) => ({ ...prev, [studentId]: status }));
    setSaved(false);
  };

  const handleMarkAll = (status: string) => {
    const all: Record<string, string> = {};
    data?.data?.forEach((s: StudentRecord) => { all[s.studentId] = status; });
    setAttendance(all);
    setSaved(false);
  };

  const handleSave = () => {
    if (!sectionId) return toast.error('Select a section first');
    const records = Object.entries(attendance).map(([studentId, status]) => ({ studentId, status }));
    markMutation.mutate({ sectionId, academicYearId, date, records });
  };

  const students: StudentRecord[] = data?.data || [];
  const presentCount = Object.values(attendance).filter((s) => s === 'PRESENT').length;
  const absentCount = Object.values(attendance).filter((s) => s === 'ABSENT').length;

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Attendance</Typography>
          <Typography variant="body2" color="text.secondary">Mark daily student attendance</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<QrCode />} size="small">QR Code</Button>
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
                  {sectionsData?.data?.map((s: any) => (
                    <MenuItem key={s.id} value={s.id}>{s.class?.name} - {s.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={3}>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 8, border: '1px solid #ccc', fontSize: 14 }} max={today} />
            </Grid>
            <Grid item xs={12} sm={5}>
              <Box display="flex" gap={1}>
                <Button size="small" variant="outlined" color="success" onClick={() => handleMarkAll('PRESENT')}>All Present</Button>
                <Button size="small" variant="outlined" color="error" onClick={() => handleMarkAll('ABSENT')}>All Absent</Button>
              </Box>
            </Grid>
          </Grid>

          {sectionId && students.length > 0 && (
            <Box display="flex" gap={2} mt={2}>
              <Chip icon={<CheckCircle />} label={`Present: ${presentCount}`} color="success" size="small" />
              <Chip icon={<Cancel />} label={`Absent: ${absentCount}`} color="error" size="small" />
              <Chip label={`Total: ${students.length}`} size="small" />
            </Box>
          )}
        </CardContent>
      </Card>

      {/* Student List */}
      {isLoading && <CircularProgress />}
      {!sectionId && <Alert severity="info">Please select a section to mark attendance.</Alert>}

      <Grid container spacing={2}>
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={student.studentId}>
            <Card
              variant="outlined"
              sx={{
                borderColor: attendance[student.studentId] === 'PRESENT' ? 'success.main'
                  : attendance[student.studentId] === 'ABSENT' ? 'error.main'
                  : attendance[student.studentId] === 'LATE' ? 'warning.main' : 'divider',
                borderWidth: 2,
                transition: 'all 0.2s',
              }}
            >
              <CardContent sx={{ p: 2 }}>
                <Box display="flex" alignItems="center" gap={1.5} mb={1.5}>
                  <Avatar sx={{ width: 38, height: 38, bgcolor: 'primary.main', fontSize: 14 }}>
                    {student.name.split(' ').map((n) => n[0]).join('')}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" fontWeight={600} lineHeight={1.2}>{student.name}</Typography>
                    <Typography variant="caption" color="text.secondary">Roll: {student.rollNo || '—'}</Typography>
                  </Box>
                </Box>
                <ToggleButtonGroup
                  size="small"
                  exclusive
                  fullWidth
                  value={attendance[student.studentId] || 'PRESENT'}
                  onChange={(_, val) => val && handleStatusChange(student.studentId, val)}
                >
                  <ToggleButton value="PRESENT" sx={{ fontSize: 10, py: 0.5 }}>P</ToggleButton>
                  <ToggleButton value="ABSENT" sx={{ fontSize: 10, py: 0.5 }}>A</ToggleButton>
                  <ToggleButton value="LATE" sx={{ fontSize: 10, py: 0.5 }}>L</ToggleButton>
                  <ToggleButton value="HALF_DAY" sx={{ fontSize: 10, py: 0.5 }}>H</ToggleButton>
                </ToggleButtonGroup>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
