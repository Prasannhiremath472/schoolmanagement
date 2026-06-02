import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Grid, Chip, LinearProgress,
  Tab, Tabs, Button, FormControl, InputLabel, Select, MenuItem, CircularProgress,
} from '@mui/material';
import { Download, Grade } from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { api } from '../../services/api/client';

export default function StudentResults() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedExam, setSelectedExam] = useState('');
  const [tab, setTab] = useState(0);

  const { data: schedules } = useQuery({
    queryKey: ['exam-schedules'],
    queryFn: () => api.get('/examinations/schedules'),
  });

  const { data: result, isLoading } = useQuery({
    queryKey: ['student-result', user?.id, selectedExam],
    queryFn: () => api.get(`/examinations/results/student/${user?.id}`, { examScheduleId: selectedExam }),
    enabled: !!selectedExam && !!user?.id,
  });

  const subjectData = result?.data?.results || [];

  const barOptions = {
    chart: { type: 'bar' as const, toolbar: { show: false } },
    colors: subjectData.map((r: any) => (r.isPass ? '#2e7d32' : '#d32f2f')),
    xaxis: { categories: subjectData.map((r: any) => r.subject?.name || '') },
    dataLabels: { enabled: true, formatter: (v: number) => `${v}` },
    plotOptions: { bar: { borderRadius: 4, columnWidth: '60%' } },
    yaxis: { min: 0, max: 100, title: { text: 'Marks' } },
  };

  const barSeries = [{ name: 'Marks Obtained', data: subjectData.map((r: any) => Number(r.marksObtained)) }];

  const gradeColor = (grade: string) => {
    if (grade?.startsWith('A')) return 'success';
    if (grade?.startsWith('B')) return 'primary';
    if (grade?.startsWith('C')) return 'warning';
    return 'error';
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>My Results</Typography>
        {selectedExam && (
          <Button variant="outlined" startIcon={<Download />}
            onClick={() => window.open(`/api/v1/pdf/report-card/${user?.id}?examScheduleId=${selectedExam}`, '_blank')}>
            Download Report Card
          </Button>
        )}
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <FormControl size="small" sx={{ minWidth: 280 }}>
            <InputLabel>Select Examination</InputLabel>
            <Select value={selectedExam} label="Select Examination" onChange={(e) => setSelectedExam(e.target.value)}>
              {(schedules?.data || []).map((s: any) => (
                <MenuItem key={s.id} value={s.id}>{s.name} — {s.examType?.name} ({s.class?.name})</MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {isLoading && <CircularProgress />}

      {result?.data && (
        <>
          {/* Summary Card */}
          <Grid container spacing={3} mb={3}>
            {[
              { label: 'Total Marks', value: `${result.data.summary.totalMarks}/${result.data.summary.maxMarks}`, color: 'primary.main' },
              { label: 'Percentage', value: `${Number(result.data.summary.percentage).toFixed(2)}%`, color: 'secondary.main' },
              { label: 'CGPA', value: Number(result.data.summary.cgpa).toFixed(2), color: 'info.main' },
              { label: 'Overall Grade', value: result.data.summary.grade, color: 'success.main' },
              { label: 'Result', value: result.data.summary.overallPass ? 'PASS' : 'FAIL', color: result.data.summary.overallPass ? 'success.main' : 'error.main' },
            ].map((stat) => (
              <Grid item xs={12} sm={6} md key={stat.label}>
                <Card><CardContent sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                  <Typography variant="h5" fontWeight={800} color={stat.color}>{stat.value}</Typography>
                </CardContent></Card>
              </Grid>
            ))}
          </Grid>

          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)}>
              <Tab label="Subject-wise" />
              <Tab label="Performance Chart" />
            </Tabs>
          </Box>

          {tab === 0 && (
            <Card>
              <CardContent>
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f5f5f5' }}>
                        {['Subject', 'Max Marks', 'Marks Obtained', 'Percentage', 'Grade', 'Status'].map((h) => (
                          <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 13, fontWeight: 600 }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {subjectData.map((r: any, i: number) => (
                        <tr key={r.subjectId} style={{ borderBottom: '1px solid #eee', background: i % 2 === 0 ? '#fff' : '#fafafa' }}>
                          <td style={{ padding: '10px 16px', fontWeight: 500 }}>{r.subject?.name}</td>
                          <td style={{ padding: '10px 16px' }}>{r.maxMarks}</td>
                          <td style={{ padding: '10px 16px', fontWeight: 600 }}>
                            {r.isAbsent ? <Chip label="ABSENT" color="error" size="small" /> : r.marksObtained}
                          </td>
                          <td style={{ padding: '10px 16px' }}>
                            <Box>
                              <Typography variant="body2">{((Number(r.marksObtained) / Number(r.maxMarks)) * 100).toFixed(1)}%</Typography>
                              <LinearProgress variant="determinate" value={(Number(r.marksObtained) / Number(r.maxMarks)) * 100} sx={{ height: 4, borderRadius: 1 }} />
                            </Box>
                          </td>
                          <td style={{ padding: '10px 16px' }}>
                            <Chip label={r.grade || '-'} color={gradeColor(r.grade) as any} size="small" />
                          </td>
                          <td style={{ padding: '10px 16px' }}>
                            <Chip label={r.isAbsent ? 'ABSENT' : r.isPass ? 'PASS' : 'FAIL'} color={r.isPass && !r.isAbsent ? 'success' : 'error'} size="small" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>
          )}

          {tab === 1 && (
            <Card>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>Marks by Subject</Typography>
                <ReactApexChart options={barOptions} series={barSeries} type="bar" height={300} />
              </CardContent>
            </Card>
          )}
        </>
      )}

      {!selectedExam && (
        <Box textAlign="center" py={8}>
          <Grade sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
          <Typography color="text.secondary">Select an examination to view results</Typography>
        </Box>
      )}
    </Box>
  );
}
