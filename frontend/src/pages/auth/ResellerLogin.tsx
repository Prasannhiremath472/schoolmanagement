import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Box, TextField, Button, Typography, InputAdornment,
  IconButton, Alert, CircularProgress, Divider, Chip,
} from '@mui/material';
import { Visibility, VisibilityOff, Storefront } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../app/store';
import { loginSuperAdmin } from '../../app/store/slices/authSlice';

export default function ResellerLogin() {
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
      const role = result.payload?.user?.role;
      // Reseller role goes to /reseller, all other platform roles go to /super-admin
      if (role === 'RESELLER') {
        navigate('/reseller', { replace: true });
      } else if (['SUPER_ADMIN', 'ADMIN', 'SUPPORT', 'FINANCE'].includes(role)) {
        navigate('/super-admin', { replace: true });
      } else {
        setError('Your account does not have platform access. Try school login instead.');
      }
    } else {
      setError((result.payload as string) || 'Invalid credentials. Please check your email and password.');
    }
  };

  return (
    <Box>
      <Box mb={3} textAlign="center">
        <Box sx={{
          display: 'inline-flex', p: 2, borderRadius: '50%',
          bgcolor: 'rgba(237,108,2,0.1)', mb: 2,
        }}>
          <Storefront sx={{ fontSize: 40, color: 'warning.main' }} />
        </Box>
        <Typography variant="h5" fontWeight={700}>Reseller Portal</Typography>
        <Typography variant="body2" color="text.secondary" mt={0.5}>
          Manage your schools & track commissions
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError('')}>{error}</Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} display="flex" flexDirection="column" gap={2.5}>
        <TextField
          label="Email Address"
          type="email"
          placeholder="reseller@schoolerp.com"
          {...register('email')}
          size="small"
          fullWidth
          autoFocus
        />
        <TextField
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="Reseller@123"
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
          color="warning"
          size="large"
          fullWidth
          disabled={isLoading}
          sx={{ py: 1.5, fontWeight: 700, borderRadius: 2 }}
        >
          {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Sign In to Reseller Portal'}
        </Button>

        <Divider><Chip label="OR" size="small" /></Divider>
        <Button variant="text" size="small" onClick={() => navigate('/login')}>School Login</Button>
        <Button variant="text" size="small" onClick={() => navigate('/super-admin/login')}>Admin Login</Button>
      </Box>
    </Box>
  );
}
