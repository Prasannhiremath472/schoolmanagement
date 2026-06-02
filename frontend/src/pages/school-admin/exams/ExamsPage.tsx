import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Button, Grid, Chip } from '@mui/material';
import { Add, Grade } from '@mui/icons-material';
import { api } from '../../../services/api/client';

export default function ExamsPage() {
  const { data } = useQuery({ queryKey: ['exam-schedules'], queryFn: () => api.get('/examinations/schedules') });
  const schedules = data?.data || [];
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Examinations</Typography>
        <Box display="flex" gap={1}><Button variant="outlined" startIcon={<Add />}>Exam Type</Button><Button variant="contained" startIcon={<Grade />}>Schedule Exam</Button></Box>
      </Box>
      <Grid container spacing={2}>
        {schedules.map((s: any) => (
          <Grid item xs={12} md={6} key={s.id}>
            <Card><CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                <Box>
                  <Typography variant="h6" fontWeight={600}>{s.name}</Typography>
                  <Typography variant="body2" color="text.secondary">{s.examType?.name} | Class {s.class?.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{new Date(s.startDate).toLocaleDateString('en-IN')} - {new Date(s.endDate).toLocaleDateString('en-IN')}</Typography>
                </Box>
                <Chip label={s.isPublished ? 'Published' : 'Draft'} color={s.isPublished ? 'success' : 'default'} size="small" />
              </Box>
              <Box display="flex" gap={1} mt={2}>
                <Button size="small" variant="outlined">Enter Marks</Button>
                <Button size="small" variant="outlined">Results</Button>
                {!s.isPublished && <Button size="small" variant="contained">Publish</Button>}
              </Box>
            </CardContent></Card>
          </Grid>
        ))}
        {schedules.length === 0 && <Grid item xs={12}><Card><CardContent sx={{ textAlign: 'center', py: 4 }}><Grade sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} /><Typography color="text.secondary">No exams scheduled yet</Typography></CardContent></Card></Grid>}
      </Grid>
    </Box>
  );
}
