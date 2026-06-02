import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Grid, Avatar, Chip, Button, Tab, Tabs, Divider, CircularProgress } from '@mui/material';
import { ArrowBack, Edit } from '@mui/icons-material';
import { api } from '../../../services/api/client';

export default function StudentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tab, setTab] = React.useState(0);
  const { data, isLoading } = useQuery({ queryKey: ['student', id], queryFn: () => api.get(`/students/${id}`) });
  const student = data?.data;

  if (isLoading) return <Box display="flex" justifyContent="center" mt={8}><CircularProgress /></Box>;
  if (!student) return <Typography>Student not found</Typography>;

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/students')}>Back</Button>
        <Typography variant="h5" fontWeight={700} flex={1}>Student Profile</Typography>
        <Button variant="outlined" startIcon={<Edit />}>Edit</Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card><CardContent sx={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 100, height: 100, mx: 'auto', mb: 2, fontSize: 36, bgcolor: 'primary.main' }}>{student.firstName?.[0]}</Avatar>
            <Typography variant="h6" fontWeight={700}>{student.firstName} {student.lastName}</Typography>
            <Typography color="text.secondary">{student.admissionNo}</Typography>
            <Chip label={student.status} color={student.status === 'ACTIVE' ? 'success' : 'default'} size="small" sx={{ mt: 1 }} />
            {student.sections?.[0] && <Typography variant="body2" color="text.secondary" mt={1}>Class {student.sections[0].section?.class?.name} - {student.sections[0].section?.name}</Typography>}
          </CardContent></Card>
        </Grid>

        <Grid item xs={12} md={9}>
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2 }}>
              <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab label="Personal Info" /><Tab label="Parents" /><Tab label="Documents" /><Tab label="Attendance" /><Tab label="Fees" />
              </Tabs>
            </Box>
            <CardContent>
              {tab === 0 && (
                <Grid container spacing={2}>
                  {[
                    ['Date of Birth', new Date(student.dateOfBirth).toLocaleDateString('en-IN')],
                    ['Gender', student.gender], ['Blood Group', student.bloodGroup || '—'],
                    ['Category', student.category], ['Religion', student.religion || '—'],
                    ['Aadhaar No', student.aadhaarNo || '—'],
                    ['Address', student.address ? `${student.address}, ${student.city}, ${student.state} ${student.pincode}` : '—'],
                    ['Admission Date', new Date(student.admissionDate).toLocaleDateString('en-IN')],
                    ['Previous School', student.previousSchool || '—'],
                  ].map(([label, value]) => (
                    <Grid item xs={12} sm={6} key={label}>
                      <Typography variant="caption" color="text.secondary">{label}</Typography>
                      <Typography variant="body2" fontWeight={500}>{value}</Typography>
                    </Grid>
                  ))}
                </Grid>
              )}
              {tab === 1 && (
                <Box>{student.parents?.map((sp: any) => (
                  <Box key={sp.parentId} mb={2}><Typography fontWeight={600}>{sp.parent.firstName} {sp.parent.lastName} ({sp.parent.relation})</Typography><Typography variant="body2" color="text.secondary">{sp.parent.phone} | {sp.parent.email}</Typography></Box>
                ))}</Box>
              )}
              {tab === 2 && <Typography color="text.secondary">No documents uploaded</Typography>}
              {tab === 3 && <Typography color="text.secondary">Attendance history will appear here</Typography>}
              {tab === 4 && <Typography color="text.secondary">Fee details will appear here</Typography>}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
