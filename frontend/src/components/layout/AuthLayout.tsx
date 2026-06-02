import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper, Typography, useTheme } from '@mui/material';
import { School as SchoolIcon } from '@mui/icons-material';

export default function AuthLayout() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: isDark
          ? 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)'
          : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {/* Left branding panel — hidden on small screens */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', lg: 'flex' },
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          color: '#fff',
        }}
      >
        <SchoolIcon sx={{ fontSize: 80, mb: 3, opacity: 0.95 }} />
        <Typography variant="h3" fontWeight={800} gutterBottom textAlign="center" lineHeight={1.2}>
          School ERP Platform
        </Typography>
        <Typography variant="h6" textAlign="center" maxWidth={420} sx={{ opacity: 0.85, fontWeight: 400 }}>
          Complete School Management — Students, Teachers, Fees, Exams, LMS & More
        </Typography>
        <Box mt={5} display="flex" gap={2} flexWrap="wrap" justifyContent="center">
          {['Multi-Tenant SaaS', 'Real-time Analytics', 'Parent Portal', 'Mobile Apps'].map((feat) => (
            <Box
              key={feat}
              sx={{
                bgcolor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(4px)',
                px: 2, py: 0.8,
                borderRadius: 4,
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              <Typography variant="caption" color="#fff" fontWeight={600}>{feat}</Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Right login panel */}
      <Box
        sx={{
          width: { xs: '100%', lg: 480 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 2, sm: 4 },
          overflowY: 'auto',
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: '100%',
            maxWidth: 420,
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
          }}
        >
          <Outlet />
        </Paper>
      </Box>
    </Box>
  );
}
