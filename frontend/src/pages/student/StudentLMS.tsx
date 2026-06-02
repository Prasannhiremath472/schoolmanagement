import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Grid, Chip, Button, Tab, Tabs,
  LinearProgress, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, CircularProgress,
} from '@mui/material';
import {
  Assignment, MenuBook, Quiz, VideoCall, Download, Upload, CheckCircle,
} from '@mui/icons-material';
import { api } from '../../services/api/client';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import toast from 'react-hot-toast';

export default function StudentLMS() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [tab, setTab] = useState(0);
  const [submitDialog, setSubmitDialog] = useState<{ open: boolean; assignmentId: string | null }>({ open: false, assignmentId: null });
  const [submitText, setSubmitText] = useState('');
  const queryClient = useQueryClient();

  const { data: assignments, isLoading: loadingAssignments } = useQuery({
    queryKey: ['assignments'],
    queryFn: () => api.get('/lms/assignments', { limit: 20 }),
  });

  const { data: materials } = useQuery({
    queryKey: ['materials'],
    queryFn: () => api.get('/lms/materials'),
  });

  const { data: quizzes } = useQuery({
    queryKey: ['quizzes'],
    queryFn: () => api.get('/lms/quizzes'),
  });

  const { data: liveClasses } = useQuery({
    queryKey: ['live-classes'],
    queryFn: () => api.get('/lms/live-classes'),
  });

  const submitMutation = useMutation({
    mutationFn: ({ assignmentId, remarks }: any) =>
      api.post(`/lms/assignments/${assignmentId}/submit`, { remarks, files: [] }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['assignments'] });
      setSubmitDialog({ open: false, assignmentId: null });
      setSubmitText('');
      toast.success('Assignment submitted!');
    },
  });

  const materialTypeIcon = (type: string) => {
    switch (type) {
      case 'VIDEO': return '🎥';
      case 'PDF': return '📄';
      case 'PPT': return '📊';
      case 'DOC': return '📝';
      default: return '📎';
    }
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Learning Portal</Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Assignments" icon={<Assignment />} iconPosition="start" />
          <Tab label="Study Materials" icon={<MenuBook />} iconPosition="start" />
          <Tab label="Live Classes" icon={<VideoCall />} iconPosition="start" />
          <Tab label="Quizzes" icon={<Quiz />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* ASSIGNMENTS */}
      {tab === 0 && (
        <Grid container spacing={2}>
          {loadingAssignments && <Grid item xs={12}><CircularProgress /></Grid>}
          {(assignments?.data || []).map((a: any) => {
            const isOverdue = new Date(a.dueDate) < new Date();
            return (
              <Grid item xs={12} md={6} key={a.id}>
                <Card variant="outlined" sx={{ borderColor: isOverdue ? 'error.light' : 'divider' }}>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                      <Box flex={1} mr={1}>
                        <Typography variant="h6" fontSize={15} fontWeight={700}>{a.title}</Typography>
                        <Typography variant="body2" color="text.secondary">{a.subject?.name}</Typography>
                      </Box>
                      <Chip
                        label={isOverdue ? 'Overdue' : 'Active'}
                        color={isOverdue ? 'error' : 'success'}
                        size="small"
                      />
                    </Box>
                    {a.description && (
                      <Typography variant="body2" color="text.secondary" mb={1.5} sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {a.description}
                      </Typography>
                    )}
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box>
                        <Typography variant="caption" color={isOverdue ? 'error' : 'text.secondary'}>
                          Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}
                        </Typography>
                        <Typography variant="caption" display="block" color="text.secondary">Max: {a.maxMarks} marks</Typography>
                      </Box>
                      <Button size="small" variant="contained" startIcon={<Upload />}
                        onClick={() => setSubmitDialog({ open: true, assignmentId: a.id })}>
                        Submit
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
          {!assignments?.data?.length && !loadingAssignments && (
            <Grid item xs={12}><Typography color="text.secondary" textAlign="center" py={4}>No assignments posted yet</Typography></Grid>
          )}
        </Grid>
      )}

      {/* STUDY MATERIALS */}
      {tab === 1 && (
        <Grid container spacing={2}>
          {(materials?.data || []).map((m: any) => (
            <Grid item xs={12} sm={6} md={4} key={m.id}>
              <Card variant="outlined" sx={{ '&:hover': { borderColor: 'primary.main', cursor: 'pointer' } }}>
                <CardContent>
                  <Box display="flex" alignItems="center" gap={2} mb={1.5}>
                    <Typography fontSize={32}>{materialTypeIcon(m.type)}</Typography>
                    <Box>
                      <Typography variant="body1" fontWeight={600}>{m.title}</Typography>
                      <Typography variant="caption" color="text.secondary">{m.subject?.name}</Typography>
                    </Box>
                  </Box>
                  {m.description && <Typography variant="body2" color="text.secondary" mb={1.5}>{m.description}</Typography>}
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Chip label={m.type} size="small" variant="outlined" />
                    <Button size="small" startIcon={<Download />} href={m.fileUrl} target="_blank">Download</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* LIVE CLASSES */}
      {tab === 2 && (
        <Grid container spacing={2}>
          {(liveClasses?.data || []).map((lc: any) => (
            <Grid item xs={12} md={6} key={lc.id}>
              <Card variant="outlined" sx={{ borderColor: lc.status === 'LIVE' ? 'error.main' : 'divider', borderWidth: lc.status === 'LIVE' ? 2 : 1 }}>
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="h6" fontSize={15} fontWeight={700}>{lc.title}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {lc.teacher?.firstName} {lc.teacher?.lastName} • {lc.platform?.toUpperCase()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(lc.scheduledAt).toLocaleString('en-IN')} • {lc.duration} min
                      </Typography>
                    </Box>
                    <Chip label={lc.status} color={lc.status === 'LIVE' ? 'error' : lc.status === 'SCHEDULED' ? 'primary' : 'default'} size="small" />
                  </Box>
                  {(lc.status === 'LIVE' || lc.status === 'SCHEDULED') && lc.meetingUrl && (
                    <Box mt={2}>
                      <Button variant="contained" color={lc.status === 'LIVE' ? 'error' : 'primary'} fullWidth href={lc.meetingUrl} target="_blank">
                        {lc.status === 'LIVE' ? '🔴 Join Live Now' : 'Join Class'}
                      </Button>
                    </Box>
                  )}
                  {lc.status === 'COMPLETED' && lc.recordingUrl && (
                    <Button size="small" startIcon={<VideoCall />} href={lc.recordingUrl} target="_blank" sx={{ mt: 1 }}>Watch Recording</Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* QUIZZES */}
      {tab === 3 && (
        <Grid container spacing={2}>
          {(quizzes?.data || []).map((q: any) => (
            <Grid item xs={12} md={6} key={q.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" fontSize={15} fontWeight={700}>{q.title}</Typography>
                  <Typography variant="body2" color="text.secondary" mb={1.5}>{q.description}</Typography>
                  <Grid container spacing={1} mb={2}>
                    <Grid item><Chip label={`${q._count?.questions || 0} questions`} size="small" /></Grid>
                    <Grid item><Chip label={`${q.duration} min`} size="small" /></Grid>
                    <Grid item><Chip label={`${q.maxMarks} marks`} size="small" /></Grid>
                  </Grid>
                  <Button variant="contained" fullWidth startIcon={<Quiz />}>Start Quiz</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Submit Assignment Dialog */}
      <Dialog open={submitDialog.open} onClose={() => setSubmitDialog({ open: false, assignmentId: null })} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Submit Assignment</DialogTitle>
        <DialogContent>
          <TextField
            label="Remarks (optional)"
            multiline rows={3} fullWidth size="small" sx={{ mt: 1 }}
            value={submitText} onChange={(e) => setSubmitText(e.target.value)}
          />
          <Typography variant="caption" color="text.secondary" mt={1} display="block">
            File upload will be available when storage is configured.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setSubmitDialog({ open: false, assignmentId: null })}>Cancel</Button>
          <Button variant="contained" startIcon={<CheckCircle />}
            disabled={submitMutation.isPending}
            onClick={() => submitMutation.mutate({ assignmentId: submitDialog.assignmentId, remarks: submitText })}>
            {submitMutation.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
