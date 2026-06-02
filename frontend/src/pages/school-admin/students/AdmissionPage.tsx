import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Button, Grid, TextField,
  MenuItem, Select, FormControl, InputLabel,
} from '@mui/material';
import { ArrowBack, Save } from '@mui/icons-material';
import { api } from '../../../services/api/client';
import toast from 'react-hot-toast';

interface AdmissionForm {
  admissionNo: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  email?: string;
  phone?: string;
  admissionDate: string;
  bloodGroup?: string;
  category?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  sectionId?: string;
}

export default function AdmissionPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors } } = useForm<AdmissionForm>({
    defaultValues: {
      gender: 'MALE',
      category: 'GENERAL',
      admissionDate: new Date().toISOString().split('T')[0],
    },
  });

  const mutation = useMutation({
    mutationFn: (dto: any) => api.post('/students', dto),
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ['students'] });
      toast.success('Student admitted successfully!');
      navigate(`/students/${data.data?.id}`);
    },
    onError: (err: any) => toast.error(err.response?.data?.message || 'Admission failed'),
  });

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}>
        <Button startIcon={<ArrowBack />} onClick={() => navigate('/students')}>Back</Button>
        <Typography variant="h5" fontWeight={700}>New Admission</Typography>
      </Box>

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit((d) => mutation.mutate(d))}>
            <Typography variant="h6" fontWeight={600} mb={2} color="primary">Personal Information</Typography>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={4}>
                <TextField label="Admission No *" {...register('admissionNo', { required: 'Required' })}
                  error={!!errors.admissionNo} helperText={errors.admissionNo?.message} size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="First Name *" {...register('firstName', { required: 'Required' })}
                  error={!!errors.firstName} helperText={errors.firstName?.message} size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Last Name *" {...register('lastName', { required: 'Required' })}
                  error={!!errors.lastName} helperText={errors.lastName?.message} size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Date of Birth *" type="date"
                  {...register('dateOfBirth', { required: 'Required' })}
                  error={!!errors.dateOfBirth} size="small" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Gender *</InputLabel>
                  <Select {...register('gender')} label="Gender *" defaultValue="MALE">
                    <MenuItem value="MALE">Male</MenuItem>
                    <MenuItem value="FEMALE">Female</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Blood Group" {...register('bloodGroup')} size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <FormControl size="small" fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select {...register('category')} label="Category" defaultValue="GENERAL">
                    <MenuItem value="GENERAL">General</MenuItem>
                    <MenuItem value="OBC">OBC</MenuItem>
                    <MenuItem value="SC">SC</MenuItem>
                    <MenuItem value="ST">ST</MenuItem>
                    <MenuItem value="EWS">EWS</MenuItem>
                    <MenuItem value="OTHER">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Admission Date *" type="date"
                  {...register('admissionDate', { required: 'Required' })}
                  error={!!errors.admissionDate} size="small" fullWidth InputLabelProps={{ shrink: true }} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Phone" {...register('phone')} size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField label="Email" type="email" {...register('email')} size="small" fullWidth />
              </Grid>
              <Grid item xs={12}>
                <TextField label="Address" {...register('address')} size="small" fullWidth multiline rows={2} />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="City" {...register('city')} size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="State" {...register('state')} size="small" fullWidth />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField label="Pincode" {...register('pincode')} size="small" fullWidth />
              </Grid>
            </Grid>

            <Box display="flex" justifyContent="flex-end" gap={2} mt={3} pt={2} borderTop={1} borderColor="divider">
              <Button onClick={() => navigate('/students')}>Cancel</Button>
              <Button type="submit" variant="contained" startIcon={<Save />} disabled={mutation.isPending}>
                {mutation.isPending ? 'Admitting...' : 'Admit Student'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
