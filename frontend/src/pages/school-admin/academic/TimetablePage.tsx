import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, FormControl, InputLabel,
  Select, MenuItem, Grid, Chip, Button, Tooltip,
} from '@mui/material';
import { Schedule, Print } from '@mui/icons-material';
import { api } from '../../../services/api/client';

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
const DAY_SHORT: Record<string, string> = { MONDAY: 'Mon', TUESDAY: 'Tue', WEDNESDAY: 'Wed', THURSDAY: 'Thu', FRIDAY: 'Fri', SATURDAY: 'Sat' };

const SUBJECT_COLORS = ['#1976d2', '#9c27b0', '#2e7d32', '#ed6c02', '#d32f2f', '#00695c', '#4a148c', '#1b5e20'];

export default function TimetablePage() {
  const [academicYearId, setAcademicYearId] = useState('');
  const [classId, setClassId] = useState('');
  const [sectionId, setSectionId] = useState('');

  const { data: years } = useQuery({ queryKey: ['academic-years'], queryFn: () => api.get('/academic/years') });
  const { data: classes } = useQuery({ queryKey: ['classes', academicYearId], queryFn: () => api.get('/academic/classes', { academicYearId }), enabled: !!academicYearId });
  const { data: sections } = useQuery({ queryKey: ['sections', classId], queryFn: () => api.get('/academic/sections', { classId }), enabled: !!classId });
  const { data: timetable, isLoading } = useQuery({ queryKey: ['timetable', sectionId], queryFn: () => api.get(`/academic/timetable/${sectionId}`), enabled: !!sectionId });

  const slots: any[] = timetable?.data || [];

  // Group by day
  const slotsByDay: Record<string, any[]> = {};
  DAYS.forEach((d) => { slotsByDay[d] = []; });
  slots.forEach((s) => { if (slotsByDay[s.dayOfWeek]) slotsByDay[s.dayOfWeek].push(s); });
  DAYS.forEach((d) => { slotsByDay[d].sort((a, b) => a.startTime.localeCompare(b.startTime)); });

  // Unique time slots across all days
  const allTimes = [...new Set(slots.map((s) => s.startTime))].sort();

  // Subject → color mapping
  const subjectColors: Record<string, string> = {};
  const subjects = [...new Set(slots.map((s) => s.subject?.name))];
  subjects.forEach((sub, i) => { subjectColors[sub] = SUBJECT_COLORS[i % SUBJECT_COLORS.length]; });

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Timetable</Typography>
          <Typography variant="body2" color="text.secondary">View and manage class timetables</Typography>
        </Box>
        {sectionId && (
          <Box display="flex" gap={1}>
            <Button variant="outlined" startIcon={<Print />} onClick={() => window.print()}>Print</Button>
            <Button variant="contained" startIcon={<Schedule />}>Create Timetable</Button>
          </Box>
        )}
      </Box>

      {/* Selectors */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small">
                <InputLabel>Academic Year</InputLabel>
                <Select value={academicYearId} label="Academic Year" onChange={(e) => { setAcademicYearId(e.target.value); setClassId(''); setSectionId(''); }}>
                  {(years?.data || []).map((y: any) => <MenuItem key={y.id} value={y.id}>{y.name} {y.isCurrent && '(Current)'}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small" disabled={!academicYearId}>
                <InputLabel>Class</InputLabel>
                <Select value={classId} label="Class" onChange={(e) => { setClassId(e.target.value); setSectionId(''); }}>
                  {(classes?.data || []).map((c: any) => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4}>
              <FormControl fullWidth size="small" disabled={!classId}>
                <InputLabel>Section</InputLabel>
                <Select value={sectionId} label="Section" onChange={(e) => setSectionId(e.target.value)}>
                  {(sections?.data || []).map((s: any) => <MenuItem key={s.id} value={s.id}>Section {s.name}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      {sectionId && (
        <Card>
          <CardContent>
            {isLoading ? (
              <Typography color="text.secondary" textAlign="center" py={4}>Loading timetable...</Typography>
            ) : slots.length === 0 ? (
              <Box textAlign="center" py={6}>
                <Schedule sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography color="text.secondary">No timetable found for this section</Typography>
                <Button variant="contained" sx={{ mt: 2 }}>Create Timetable</Button>
              </Box>
            ) : (
              <Box sx={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                  <thead>
                    <tr>
                      <th style={{ padding: '10px 12px', background: '#f5f5f5', textAlign: 'left', fontSize: 12, fontWeight: 700, width: 90 }}>Time</th>
                      {DAYS.map((day) => (
                        <th key={day} style={{ padding: '10px 12px', background: '#1976d2', color: 'white', textAlign: 'center', fontSize: 12, fontWeight: 700 }}>
                          {DAY_SHORT[day]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {allTimes.map((time, rowIdx) => (
                      <tr key={time} style={{ background: rowIdx % 2 === 0 ? '#fff' : '#fafafa' }}>
                        <td style={{ padding: '10px 12px', fontSize: 11, fontWeight: 600, color: '#555', borderBottom: '1px solid #eee' }}>
                          {time}
                        </td>
                        {DAYS.map((day) => {
                          const slot = slotsByDay[day].find((s) => s.startTime === time);
                          return (
                            <td key={day} style={{ padding: 4, textAlign: 'center', borderBottom: '1px solid #eee', borderLeft: '1px solid #f0f0f0' }}>
                              {slot ? (
                                <Tooltip title={`${slot.teacher?.firstName} ${slot.teacher?.lastName} | Room: ${slot.roomNo || '—'} | ${slot.startTime}–${slot.endTime}`} arrow>
                                  <Box sx={{
                                    bgcolor: subjectColors[slot.subject?.name] || '#1976d2',
                                    color: '#fff',
                                    borderRadius: 1.5,
                                    p: 1,
                                    cursor: 'pointer',
                                    '&:hover': { opacity: 0.9 },
                                  }}>
                                    <Typography variant="caption" display="block" fontWeight={700} lineHeight={1.3}>{slot.subject?.name}</Typography>
                                    <Typography variant="caption" display="block" sx={{ opacity: 0.85, fontSize: 10 }}>
                                      {slot.teacher?.firstName} {slot.teacher?.lastName?.charAt(0)}.
                                    </Typography>
                                  </Box>
                                </Tooltip>
                              ) : (
                                <Typography variant="caption" color="text.disabled">—</Typography>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Legend */}
                <Box mt={2} display="flex" gap={1} flexWrap="wrap">
                  {subjects.map((sub) => (
                    <Chip key={sub} label={sub} size="small" sx={{ bgcolor: subjectColors[sub] || '#1976d2', color: 'white' }} />
                  ))}
                </Box>
              </Box>
            )}
          </CardContent>
        </Card>
      )}

      {!sectionId && (
        <Box textAlign="center" py={8}>
          <Schedule sx={{ fontSize: 72, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">Select Academic Year, Class and Section</Typography>
          <Typography variant="body2" color="text.disabled">to view the timetable</Typography>
        </Box>
      )}
    </Box>
  );
}
