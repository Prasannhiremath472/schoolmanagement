import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Button, Tab, Tabs, Grid, Chip } from '@mui/material';
import { Add, Assignment, MenuBook, Quiz, VideoCall } from '@mui/icons-material';
import { api } from '../../../services/api/client';

export default function LmsPage() {
  const [tab, setTab] = useState(0);
  const { data: assignments } = useQuery({ queryKey: ['assignments'], queryFn: () => api.get('/lms/assignments', { limit: 10 }) });
  const { data: liveClasses } = useQuery({ queryKey: ['live-classes'], queryFn: () => api.get('/lms/live-classes') });
  const { data: quizzes } = useQuery({ queryKey: ['quizzes'], queryFn: () => api.get('/lms/quizzes') });
  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight={700}>Learning Management System</Typography>
        <Button variant="contained" startIcon={<Add />}>Create</Button>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Assignments" icon={<Assignment />} iconPosition="start" />
          <Tab label="Live Classes" icon={<VideoCall />} iconPosition="start" />
          <Tab label="Quizzes" icon={<Quiz />} iconPosition="start" />
          <Tab label="Materials" icon={<MenuBook />} iconPosition="start" />
        </Tabs>
      </Box>
      {tab === 0 && <Grid container spacing={2}>{assignments?.data?.map((a: any) => (<Grid item xs={12} md={6} key={a.id}><Card variant="outlined"><CardContent><Box display="flex" justifyContent="space-between"><Typography fontWeight={600}>{a.title}</Typography><Chip label={a.subject?.name} size="small" /></Box><Typography variant="body2" color="text.secondary" mt={0.5}>{a.description}</Typography><Typography variant="caption" color={new Date(a.dueDate) < new Date() ? 'error.main' : 'text.secondary'}>Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}</Typography><Box mt={1}><Chip label={`${a._count?.submissions || 0} submissions`} size="small" /></Box></CardContent></Card></Grid>))}</Grid>}
      {tab === 1 && <Grid container spacing={2}>{liveClasses?.data?.map((lc: any) => (<Grid item xs={12} md={6} key={lc.id}><Card variant="outlined"><CardContent><Typography fontWeight={600}>{lc.title}</Typography><Typography variant="body2" color="text.secondary">{lc.platform} | {new Date(lc.scheduledAt).toLocaleString('en-IN')}</Typography><Button size="small" variant="outlined" sx={{ mt: 1 }} href={lc.meetingUrl} target="_blank">Join</Button></CardContent></Card></Grid>))}</Grid>}
      {tab === 2 && <Grid container spacing={2}>{quizzes?.data?.map((q: any) => (<Grid item xs={12} md={6} key={q.id}><Card variant="outlined"><CardContent><Typography fontWeight={600}>{q.title}</Typography><Typography variant="body2" color="text.secondary">Duration: {q.duration} min | Max: {q.maxMarks} marks</Typography></CardContent></Card></Grid>))}</Grid>}
      {tab === 3 && <Typography color="text.secondary">Study materials will appear here</Typography>}
    </Box>
  );
}
