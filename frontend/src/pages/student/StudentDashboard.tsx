import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Grid, Avatar, LinearProgress,
  List, ListItem, ListItemText, ListItemAvatar, Chip, Button,
} from '@mui/material';
import {
  Assignment, MenuBook, Grade, Notifications, VideoCall,
  CheckCircle, Cancel, Schedule,
} from '@mui/icons-material';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { api } from '../../services/api/client';

export default function StudentDashboard() {
  const { user } = useSelector((state: RootState) => state.auth);

  const { data: assignments } = useQuery({
    queryKey: ['student-assignments'],
    queryFn: () => api.get('/lms/assignments', { limit: 5, isPublished: true }),
  });

  const { data: liveClasses } = useQuery({
    queryKey: ['live-classes'],
    queryFn: () => api.get('/lms/live-classes'),
  });

  const attendanceChartOptions = {
    chart: { type: 'donut' as const },
    labels: ['Present', 'Absent', 'Late'],
    colors: ['#2e7d32', '#d32f2f', '#ed6c02'],
    legend: { position: 'bottom' as const },
    dataLabels: { enabled: true },
    plotOptions: { pie: { donut: { size: '65%' } } },
  };

  const attendanceData = [85, 10, 5];

  const subjectPerformanceOptions = {
    chart: { type: 'radar' as const, toolbar: { show: false } },
    xaxis: { categories: ['Math', 'Science', 'English', 'Hindi', 'S.Studies'] },
    colors: ['#1976d2'],
    fill: { opacity: 0.3 },
    dataLabels: { enabled: true },
  };

  const performanceSeries = [{ name: 'Percentage', data: [88, 92, 76, 84, 79] }];

  return (
    <Box>
      <Box mb={3} display="flex" alignItems="center" gap={2}>
        <Avatar sx={{ width: 56, height: 56, bgcolor: 'primary.main', fontSize: 22 }}>
          {user?.email?.[0]?.toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h5" fontWeight={700}>Welcome Back!</Typography>
          <Typography variant="body2" color="text.secondary">
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Quick stats */}
        {[
          { label: 'Attendance', value: '87%', icon: <CheckCircle />, color: 'success.main' },
          { label: 'CGPA', value: '8.4', icon: <Grade />, color: 'primary.main' },
          { label: 'Assignments Due', value: `${assignments?.data?.length || 0}`, icon: <Assignment />, color: 'warning.main' },
          { label: 'Live Classes Today', value: `${liveClasses?.data?.filter((lc: any) => lc.status === 'SCHEDULED').length || 0}`, icon: <VideoCall />, color: 'error.main' },
        ].map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box>
                    <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
                    <Typography variant="h4" fontWeight={800} color={stat.color}>{stat.value}</Typography>
                  </Box>
                  <Box sx={{ color: stat.color }}>{stat.icon}</Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {/* Attendance Chart */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Attendance This Month</Typography>
              <ReactApexChart options={attendanceChartOptions} series={attendanceData} type="donut" height={240} />
            </CardContent>
          </Card>
        </Grid>

        {/* Subject Performance */}
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Subject Performance</Typography>
              <ReactApexChart options={subjectPerformanceOptions} series={performanceSeries} type="radar" height={240} />
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Assignments */}
        <Grid item xs={12} md={3}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={1}>Upcoming Assignments</Typography>
              <List dense disablePadding>
                {(assignments?.data || []).slice(0, 5).map((a: any) => (
                  <ListItem key={a.id} disablePadding sx={{ py: 0.5 }}>
                    <ListItemAvatar sx={{ minWidth: 36 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: 'warning.lighter' }}>
                        <Assignment sx={{ fontSize: 14, color: 'warning.main' }} />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography variant="caption" fontWeight={600}>{a.title}</Typography>}
                      secondary={<Typography variant="caption" color={new Date(a.dueDate) < new Date() ? 'error' : 'text.secondary'}>
                        Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}
                      </Typography>}
                    />
                  </ListItem>
                ))}
                {(!assignments?.data?.length) && (
                  <Typography variant="caption" color="text.secondary">No pending assignments</Typography>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Today's Timetable */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Today's Classes</Typography>
              {[
                { time: '8:00 - 8:45', subject: 'Mathematics', teacher: 'Mr. Sharma', room: 'Room 101' },
                { time: '8:45 - 9:30', subject: 'Physics', teacher: 'Ms. Gupta', room: 'Lab 2' },
                { time: '9:45 - 10:30', subject: 'English', teacher: 'Mr. Patel', room: 'Room 205' },
                { time: '10:30 - 11:15', subject: 'Chemistry', teacher: 'Ms. Singh', room: 'Lab 1' },
              ].map((period, i) => (
                <Box key={i} display="flex" alignItems="center" gap={2} mb={1.5}
                  sx={{ p: 1.5, borderRadius: 2, bgcolor: 'background.default', border: '1px solid', borderColor: 'divider' }}>
                  <Box sx={{ textAlign: 'center', minWidth: 70 }}>
                    <Typography variant="caption" color="primary" fontWeight={600}>{period.time}</Typography>
                  </Box>
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight={600}>{period.subject}</Typography>
                    <Typography variant="caption" color="text.secondary">{period.teacher} • {period.room}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Live Classes */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>Live Classes</Typography>
              {(liveClasses?.data || []).slice(0, 4).map((lc: any) => (
                <Box key={lc.id} display="flex" justifyContent="space-between" alignItems="center" mb={1.5}
                  sx={{ p: 1.5, borderRadius: 2, border: '1px solid', borderColor: lc.status === 'LIVE' ? 'error.main' : 'divider' }}>
                  <Box>
                    <Typography variant="body2" fontWeight={600}>{lc.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {new Date(lc.scheduledAt).toLocaleString('en-IN')} • {lc.duration} min
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center" gap={1}>
                    <Chip label={lc.status} color={lc.status === 'LIVE' ? 'error' : lc.status === 'SCHEDULED' ? 'primary' : 'default'} size="small" />
                    {(lc.status === 'LIVE' || lc.status === 'SCHEDULED') && (
                      <Button size="small" variant="contained" color={lc.status === 'LIVE' ? 'error' : 'primary'} href={lc.meetingUrl} target="_blank">
                        {lc.status === 'LIVE' ? 'Join Now' : 'Join'}
                      </Button>
                    )}
                  </Box>
                </Box>
              ))}
              {!liveClasses?.data?.length && <Typography variant="body2" color="text.secondary">No live classes scheduled</Typography>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
