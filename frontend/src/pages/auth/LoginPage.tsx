import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box, TextField, Button, Typography, InputAdornment,
  IconButton, Alert, Divider, Chip, CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, School } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { loginSchool } from '../../app/store/slices/authSlice';
import { setTenant } from '../../app/store/slices/tenantSlice';

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm({
    defaultValues: { schoolSlug: '', identifier: '', password: '' },
  });

  const onSubmit = async (data: any) => {
    setError('');
    if (!data.schoolSlug) { setError('School ID is required. Enter: demo-school'); return; }
    if (!data.identifier) { setError('Email or phone is required.'); return; }
    if (!data.password)   { setError('Password is required.'); return; }

    // Set tenant before making the login request
    dispatch(setTenant({ slug: data.schoolSlug }));
    localStorage.setItem('tenantSlug', data.schoolSlug);

    const result = await dispatch(loginSchool({ identifier: data.identifier, password: data.password }));
    if (loginSchool.fulfilled.match(result)) {
      const role = result.payload?.user?.role;
      if (role === 'STUDENT')   navigate('/student/dashboard', { replace: true });
      else if (role === 'TEACHER') navigate('/teacher/dashboard', { replace: true });
      else                      navigate('/dashboard', { replace: true });
    } else {
      setError((result.payload as string) || 'Invalid credentials. Please try again.');
    }
  };

  return (
    <Box>
      <Box mb={3} textAlign="center">
        <School sx={{ fontSize: 44, color: 'primary.main', mb: 1 }} />
        <Typography variant="h5" fontWeight={700}>Welcome Back</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Sign in to your school portal
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2.5}>
        <TextField
          label="School ID"
          placeholder="demo-school"
          {...register('schoolSlug')}
          size="small"
          fullWidth
          autoFocus
          helperText="Enter your school slug (e.g. demo-school)"
        />
        <TextField
          label="Email or Phone"
          placeholder="schooladmin@demo-school.com"
          {...register('identifier')}
          size="small"
          fullWidth
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          {...register('password')}
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          fullWidth
          disabled={isLoading}
          sx={{ py: 1.5, fontWeight: 700, borderRadius: 2, mt: 1 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>
        <Divider><Chip label="OR" size="small" /></Divider>
        <Box display="flex" gap={1}>
          <Button variant="outlined" fullWidth onClick={() => navigate('/super-admin/login')}>
            Super Admin
          </Button>
          <Button variant="outlined" fullWidth color="warning" onClick={() => navigate('/reseller/login')}>
            Reseller Login
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
