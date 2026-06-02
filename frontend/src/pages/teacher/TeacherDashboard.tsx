import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Grid, Avatar, Button,
  List, ListItem, ListItemText, ListItemAvatar, Chip,
} from '@mui/material';
import {
  People, AssignmentTurnedIn, Grade, Notifications, MenuBook, Add,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { api } from '../../services/api/client';
import { useNavigate } from 'react-router-dom';

export default function TeacherDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const { data: assignments } = useQuery({
    queryKey: ['teacher-assignments'],
    queryFn: () => api.get('/lms/assignments', { limit: 5, teacherId: user?.id }),
  });

  const { data: homework } = useQuery({
    queryKey: ['teacher-homework'],
    queryFn: () => api.get('/lms/homework', { limit: 5, teacherId: user?.id }),
  });

  const weeklyAttendanceOptions = {
    chart: { type: 'area' as const, toolbar: { show: false } },
    colors: ['#2e7d32', '#d32f2f'],
    stroke: { curve: 'smooth' as const, width: 2 },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
    legend: { position: 'top' as const },
    dataLabels: { enabled: false },
  };

  const attendanceSeries = [
    { name: 'Present', data: [38, 35, 40, 36, 38, 20] },
    { name: 'Absent', data: [2, 5, 0, 4, 2, 3] },
  ];

  const subjectDistributionOptions = {
    chart: { type: 'donut' as const },
    labels: ['Mathematics', 'Physics', 'Chemistry'],
    colors: ['#1976d2', '#9c27b0', '#ed6c02'],
    legend: { position: 'bottom' as const },
  };
  const subjectData = [40, 36, 30];

  return (
    <Box>
      <Box mb={3} display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ width: 52, height: 52, bgcolor: 'secondary.main', fontSize: 20 }}>
          {user?.email?.[0]?.toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700}>Teacher Dashboard</Typography>
          <Typography variant="body2" color="text.secondary">{new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Stats */}
        {[
          { label: 'My Students', value: '120', icon: <People />, color: '#1976d2' },
          { label: "Today's Attendance", value: '87%', icon: <AssignmentTurnedIn />, color: '#2e7d32' },
          { label: 'Pending Evaluations', value: '8', icon: <Grade />, color: '#ed6c02' },
          { label: 'Assignments Posted', value: `${assignments?.meta?.total || 0}`, icon: <MenuBook />, color: '#9c27b0' },
        ].map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                    <Typography variant="h4" fontWeight={800} sx={{ color: stat.color }}>{stat.value}</Typography>
                  </Box>
                  <Avatar sx={{ bgcolor: stat.color + '20', color: stat.color }}>{stat.icon}</Avatar>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Quick Actions</Typography>
              <Box display="flex" gap={1.5} flexWrap="wrap">
                <Button variant="contained" startIcon={<AssignmentTurnedIn />} onClick={() => navigate('/attendance')}>Mark Attendance</Button>
                <Button variant="outlined" startIcon={<Grade />} onClick={() => navigate('/exams/marks-entry')}>Enter Marks</Button>
                <Button variant="outlined" startIcon={<Add />} onClick={() => navigate('/lms')}>Create Assignment</Button>
                <Button variant="outlined" startIcon={<MenuBook />}>Schedule Live Class</Button>
                <Button variant="outlined" startIcon={<Notifications />}>Send Announcement</Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Chart */}
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>This Week's Attendance</Typography>
              <ReactApexChart options={weeklyAttendanceOptions} series={attendanceSeries} type="area" height={220} />
            </CardContent>
          </Card>
        </Grid>

        {/* Subject Distribution */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>My Subjects (Students)</Typography>
              <ReactApexChart options={subjectDistributionOptions} series={subjectData} type="donut" height={220} />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Assignments */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" fontWeight={600}>Recent Assignments</Typography>
                <Button size="small" onClick={() => navigate('/lms')}>View All</Button>
              </Box>
              <List dense disablePadding>
                {(assignments?.data || []).map((a: any) => (
                  <ListItem key={a.id} disablePadding sx={{ py: 0.8 }}>
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'warning.lighter' }}>
                        <MenuBook sx={{ fontSize: 16, color: 'warning.main' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="body2" fontWeight={600}>{a.title}</Typography>}
                      secondary={<Typography variant="caption" color="text.secondary">{a.subject?.name} • {a._count?.submissions || 0} submissions</Typography>}
                    />
                    <Chip label={new Date(a.dueDate) < new Date() ? 'Closed' : 'Active'} size="small" color={new Date(a.dueDate) < new Date() ? 'default' : 'success'} />
                  </ListItem>
                ))}
                {!assignments?.data?.length && <Typography variant="caption" color="text.secondary">No assignments yet</Typography>}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Homework */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Typography variant="h6" fontWeight={600}>Recent Homework</Typography>
                <Button size="small">View All</Button>
              </Box>
              <List dense disablePadding>
                {(homework?.data || []).map((h: any) => (
                  <ListItem key={h.id} disablePadding sx={{ py: 0.8 }}>
                    <ListItemText
                      primary={<Typography variant="body2" fontWeight={600}>{h.title}</Typography>}
                      secondary={<Typography variant="caption" color="text.secondary">{h.subject?.name} • Due: {new Date(h.dueDate).toLocaleDateString('en-IN')}</Typography>}
                    />
                  </ListItem>
                ))}
                {!homework?.data?.length && <Typography variant="caption" color="text.secondary">No homework assigned yet</Typography>}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
