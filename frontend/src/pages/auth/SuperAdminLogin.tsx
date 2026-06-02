import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box, TextField, Button, Typography, InputAdornment,
  IconButton, Alert, CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff, AdminPanelSettings } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { loginSuperAdmin } from '../../app/store/slices/authSlice';

export default function SuperAdminLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const { register, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = async (data: any) => {
    setError('');
    if (!data.email || !data.password) {
      setError('Email and password are required.');
      return;
    }
    const result = await dispatch(loginSuperAdmin({ email: data.email, password: data.password }));
    if (loginSuperAdmin.fulfilled.match(result)) {
      navigate('/super-admin', { replace: true });
    } else {
      setError((result.payload as string) || 'Login failed. Check credentials.');
    }
  };

  return (
    <Box>
      <Box mb={3} textAlign="center">
        <AdminPanelSettings sx={{ fontSize: 44, color: 'secondary.main', mb: 1 }} />
        <Typography variant="h5" fontWeight={700}>Super Admin</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>Platform Administration</Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2.5}>
        <TextField
          label="Email"
          type="email"
          placeholder="admin@schoolerp.com"
          {...register('email')}
          size="small"
          fullWidth
          autoFocus
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="SuperAdmin@123"
          {...register('password')}
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
          fullWidth
          disabled={isLoading}
          sx={{ py: 1.5, fontWeight: 700, borderRadius: 2, mt: 1 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Admin Login'}
        </Button>
        <Box display="flex" gap={1} justifyContent="center">
          <Button variant="text" size="small" onClick={() => navigate('/login')}>School Login</Button>
          <Button variant="text" size="small" color="warning" onClick={() => navigate('/reseller/login')}>Reseller Login</Button>
        </Box>
      </Box>
    </Box>
  );
}
