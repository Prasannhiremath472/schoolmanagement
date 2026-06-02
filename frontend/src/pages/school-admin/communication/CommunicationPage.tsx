import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Button, Tab, Tabs, Grid,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  FormControl, InputLabel, Select, MenuItem, Chip, Avatar,
  IconButton, Tooltip, Alert,
} from '@mui/material';
import {
  Add, Campaign, Article, Send, Notifications,
  WhatsApp, Sms, Email, Delete,
} from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { api } from '../../../services/api/client';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';

export default function CommunicationPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState(0);
  const [page, setPage] = useState(0);

  // Dialogs
  const [announcementDialog, setAnnouncementDialog] = useState(false);
  const [circularDialog, setCircularDialog] = useState(false);
  const [broadcastDialog, setBroadcastDialog] = useState(false);

  const { register: regAnn, handleSubmit: handleAnn, reset: resetAnn } = useForm();
  const { register: regCirc, handleSubmit: handleCirc, reset: resetCirc } = useForm();
  const { register: regBcast, handleSubmit: handleBcast, reset: resetBcast } = useForm();

  const { data: announcements, isLoading: loadAnn } = useQuery({
    queryKey: ['announcements', page],
    queryFn: () => api.get('/communication/announcements', { page: page + 1, limit: 10 }),
  });

  const { data: circulars, isLoading: loadCirc } = useQuery({
    queryKey: ['circulars', page],
    queryFn: () => api.get('/communication/circulars', { page: page + 1, limit: 10 }),
  });

  const createAnnMutation = useMutation({
    mutationFn: (dto: any) => api.post('/communication/announcements', dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['announcements'] });
      setAnnouncementDialog(false); resetAnn();
      toast.success('Announcement published!');
    },
  });

  const createCircMutation = useMutation({
    mutationFn: (dto: any) => api.post('/communication/circulars', dto),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['circulars'] });
      setCircularDialog(false); resetCirc();
      toast.success('Circular issued!');
    },
  });

  const broadcastMutation = useMutation({
    mutationFn: (dto: any) => api.post('/communication/broadcast', dto),
    onSuccess: (res) => {
      setBroadcastDialog(false); resetBcast();
      toast.success(`Broadcast sent to ${res.data?.totalRecipients || 0} recipients!`);
    },
  });

  const roleOptions = [
    { value: '', label: 'All Users' },
    { value: 'STUDENT', label: 'Students Only' },
    { value: 'PARENT', label: 'Parents Only' },
    { value: 'TEACHER', label: 'Teachers Only' },
    { value: 'STAFF', label: 'Staff Only' },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight={700}>Notice Board & Communication</Typography>
          <Typography variant="body2" color="text.secondary">Manage announcements, circulars, and broadcast messages</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <Button variant="outlined" startIcon={<Send />} onClick={() => setBroadcastDialog(true)} color="warning">
            Broadcast
          </Button>
          <Button variant="outlined" startIcon={<Article />} onClick={() => setCircularDialog(true)}>
            Issue Circular
          </Button>
          <Button variant="contained" startIcon={<Add />} onClick={() => setAnnouncementDialog(true)}>
            New Announcement
          </Button>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Grid container spacing={2} mb={3}>
        {[
          { label: 'Announcements', value: announcements?.meta?.total || 0, icon: <Campaign />, color: '#1976d2' },
          { label: 'Circulars Issued', value: circulars?.meta?.total || 0, icon: <Article />, color: '#9c27b0' },
          { label: 'Push Sent Today', value: '—', icon: <Notifications />, color: '#ed6c02' },
          { label: 'WhatsApp Sent', value: '—', icon: <WhatsApp />, color: '#2e7d32' },
        ].map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
                <Avatar sx={{ bgcolor: `${stat.color}20`, color: stat.color }}>{stat.icon}</Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">{stat.label}</Typography>
                  <Typography variant="h5" fontWeight={700} color={stat.color}>{stat.value}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)}>
          <Tab label="Announcements" icon={<Campaign />} iconPosition="start" />
          <Tab label="Circulars" icon={<Article />} iconPosition="start" />
          <Tab label="SMS History" icon={<Sms />} iconPosition="start" />
          <Tab label="Email History" icon={<Email />} iconPosition="start" />
        </Tabs>
      </Box>

      {/* Announcements */}
      {tab === 0 && (
        <Grid container spacing={2}>
          {(announcements?.data || []).map((ann: any) => (
            <Grid item xs={12} md={6} key={ann.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Campaign color="primary" />
                      <Typography fontWeight={700} fontSize={15}>{ann.title}</Typography>
                    </Box>
                    <Box display="flex" gap={0.5} alignItems="center">
                      {ann.targetRole ? (
                        <Chip label={ann.targetRole} size="small" color="primary" variant="outlined" />
                      ) : (
                        <Chip label="All Users" size="small" />
                      )}
                      <Tooltip title="Delete">
                        <IconButton size="small"><Delete fontSize="small" color="error" /></IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={1.5} sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {ann.content}
                  </Typography>
                  <Typography variant="caption" color="text.disabled">
                    Published: {dayjs(ann.publishedAt || ann.createdAt).format('DD MMM YYYY, hh:mm A')}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
          {!announcements?.data?.length && !loadAnn && (
            <Grid item xs={12}>
              <Box textAlign="center" py={6}>
                <Campaign sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography color="text.secondary">No announcements yet. Create your first one!</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {/* Circulars */}
      {tab === 1 && (
        <Grid container spacing={2}>
          {(circulars?.data || []).map((circ: any) => (
            <Grid item xs={12} md={6} key={circ.id}>
              <Card variant="outlined">
                <CardContent>
                  <Box display="flex" justifyContent="space-between" mb={1}>
                    <Box>
                      <Chip label={circ.circularNo} color="secondary" size="small" sx={{ mb: 0.5 }} />
                      <Typography fontWeight={700} fontSize={15}>{circ.title}</Typography>
                    </Box>
                    <Typography variant="caption" color="text.disabled">
                      {dayjs(circ.issuedDate).format('DD MMM YYYY')}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary" mb={1.5}>{circ.content}</Typography>
                  {circ.fileUrl && (
                    <Button size="small" variant="outlined" href={circ.fileUrl} target="_blank">View Attachment</Button>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
          {!circulars?.data?.length && !loadCirc && (
            <Grid item xs={12}>
              <Box textAlign="center" py={6}>
                <Article sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
                <Typography color="text.secondary">No circulars issued yet.</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      )}

      {tab === 2 && <Alert severity="info">SMS history tracking coming soon. SMS is sent via Twilio.</Alert>}
      {tab === 3 && <Alert severity="info">Email history tracking coming soon. Emails are sent via SMTP.</Alert>}

      {/* Create Announcement Dialog */}
      <Dialog open={announcementDialog} onClose={() => setAnnouncementDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Create Announcement</DialogTitle>
        <DialogContent>
          <Box component="form" id="ann-form" onSubmit={handleAnn((d) => createAnnMutation.mutate(d))} display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField label="Title *" {...regAnn('title', { required: true })} size="small" fullWidth />
            <TextField label="Content *" {...regAnn('content', { required: true })} size="small" fullWidth multiline rows={4} />
            <FormControl size="small" fullWidth>
              <InputLabel>Target Audience</InputLabel>
              <Select {...regAnn('targetRole')} label="Target Audience" defaultValue="">
                {roleOptions.map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAnnouncementDialog(false)}>Cancel</Button>
          <Button type="submit" form="ann-form" variant="contained" disabled={createAnnMutation.isPending}>
            {createAnnMutation.isPending ? 'Publishing...' : 'Publish'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Issue Circular Dialog */}
      <Dialog open={circularDialog} onClose={() => setCircularDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>Issue Circular</DialogTitle>
        <DialogContent>
          <Box component="form" id="circ-form" onSubmit={handleCirc((d) => createCircMutation.mutate({ ...d, issuedDate: new Date().toISOString() }))} display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField label="Circular Title *" {...regCirc('title', { required: true })} size="small" fullWidth />
            <TextField label="Content *" {...regCirc('content', { required: true })} size="small" fullWidth multiline rows={4} />
            <TextField label="Issued Date" type="date" {...regCirc('issuedDate')} size="small" fullWidth InputLabelProps={{ shrink: true }} defaultValue={dayjs().format('YYYY-MM-DD')} />
            <TextField label="Attachment URL (Optional)" {...regCirc('fileUrl')} size="small" fullWidth helperText="Link to uploaded PDF/image" />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setCircularDialog(false)}>Cancel</Button>
          <Button type="submit" form="circ-form" variant="contained" disabled={createCircMutation.isPending}>
            {createCircMutation.isPending ? 'Issuing...' : 'Issue Circular'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Broadcast Dialog */}
      <Dialog open={broadcastDialog} onClose={() => setBroadcastDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle fontWeight={700}>📢 Broadcast Message</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 2 }}>This will send a message to ALL users of selected role(s) via selected channels.</Alert>
          <Box component="form" id="bcast-form" onSubmit={handleBcast((d) => broadcastMutation.mutate({ ...d, targetRoles: [d.targetRole || 'PARENT'], channels: d.channels ? d.channels.split(',') : ['IN_APP'] }))} display="flex" flexDirection="column" gap={2}>
            <TextField label="Title *" {...regBcast('title', { required: true })} size="small" fullWidth />
            <TextField label="Message *" {...regBcast('content', { required: true })} size="small" fullWidth multiline rows={3} />
            <FormControl size="small" fullWidth>
              <InputLabel>Target Role</InputLabel>
              <Select {...regBcast('targetRole')} label="Target Role" defaultValue="PARENT">
                {roleOptions.filter((r) => r.value).map((r) => <MenuItem key={r.value} value={r.value}>{r.label}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl size="small" fullWidth>
              <InputLabel>Channels</InputLabel>
              <Select {...regBcast('channels')} label="Channels" defaultValue="IN_APP,PUSH">
                <MenuItem value="IN_APP">In-App Only</MenuItem>
                <MenuItem value="IN_APP,PUSH">In-App + Push Notification</MenuItem>
                <MenuItem value="IN_APP,PUSH,SMS">In-App + Push + SMS</MenuItem>
                <MenuItem value="IN_APP,PUSH,WHATSAPP">In-App + Push + WhatsApp</MenuItem>
                <MenuItem value="IN_APP,EMAIL">In-App + Email</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setBroadcastDialog(false)}>Cancel</Button>
          <Button type="submit" form="bcast-form" variant="contained" color="warning" disabled={broadcastMutation.isPending}>
            {broadcastMutation.isPending ? 'Sending...' : '📤 Send Broadcast'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
