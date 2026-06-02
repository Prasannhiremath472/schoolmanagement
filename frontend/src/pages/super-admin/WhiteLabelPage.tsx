import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Button, TextField, Grid,
  Avatar, Chip, FormControl, InputLabel, Select, MenuItem, Alert,
  CircularProgress,
} from '@mui/material';
import { Save, Palette, Language, Image } from '@mui/icons-material';
import { api } from '../../services/api/client';
import toast from 'react-hot-toast';

// Note: This page allows super admin to configure per-school white-label branding
export default function WhiteLabelPage() {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [branding, setBranding] = useState<any>({});

  const { data: schools } = useQuery({
    queryKey: ['schools-list'],
    queryFn: () => api.get('/super-admin/schools', { limit: 100 }),
  });

  const { data: brandingData, isLoading } = useQuery({
    queryKey: ['school-branding', selectedSchool],
    queryFn: () => api.get(`/super-admin/schools/${selectedSchool}/branding`),
    enabled: !!selectedSchool,
  });

  useEffect(() => {
    if (brandingData?.data) setBranding(brandingData.data);
  }, [brandingData]);

  const saveMutation = useMutation({
    mutationFn: (dto: any) => api.put(`/super-admin/schools/${selectedSchool}/branding`, dto),
    onSuccess: () => toast.success('Branding saved!'),
  });

  const { data: domains } = useQuery({
    queryKey: ['custom-domains'],
    queryFn: () => api.get('/super-admin/custom-domains'),
  });

  return (
    <Box>
      <Box mb={3}>
        <Typography variant="h5" fontWeight={700}>White-Label Branding</Typography>
        <Typography variant="body2" color="text.secondary">Configure custom branding for each school</Typography>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <FormControl size="small" sx={{ minWidth: 320 }}>
            <InputLabel>Select School</InputLabel>
            <Select value={selectedSchool} label="Select School" onChange={(e) => setSelectedSchool(e.target.value)}>
              {(schools?.data || []).map((s: any) => (
                <MenuItem key={s.id} value={s.id}>{s.name} ({s.slug})</MenuItem>
              ))}
            </Select>
          </FormControl>
        </CardContent>
      </Card>

      {selectedSchool && (
        <>
          {isLoading ? <CircularProgress /> : (
            <Grid container spacing={3}>
              {/* Preview */}
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={2}>Preview</Typography>
                    <Box display="flex" flexDirection="column" alignItems="center" gap={2} p={2} sx={{ bgcolor: branding.primaryColor || '#1976d2', borderRadius: 2 }}>
                      {branding.logo ? (
                        <img src={branding.logo} alt="Logo" style={{ height: 60, objectFit: 'contain' }} />
                      ) : (
                        <Avatar sx={{ width: 60, height: 60, bgcolor: 'rgba(255,255,255,0.3)', fontSize: 24 }}>
                          {branding.name?.[0] || 'S'}
                        </Avatar>
                      )}
                      <Typography color="white" fontWeight={700} fontSize={18}>{branding.name || 'School Name'}</Typography>
                    </Box>
                    <Box mt={2} display="flex" gap={1} alignItems="center">
                      <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: branding.primaryColor || '#1976d2', border: '2px solid #eee' }} />
                      <Typography variant="caption">Primary Color</Typography>
                      <Box sx={{ width: 32, height: 32, borderRadius: 1, bgcolor: branding.secondaryColor || '#dc004e', border: '2px solid #eee', ml: 1 }} />
                      <Typography variant="caption">Secondary</Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              {/* Branding Form */}
              <Grid item xs={12} md={8}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={2}>Brand Configuration</Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}><TextField label="School Display Name" value={branding.name || ''} onChange={(e) => setBranding((p: any) => ({ ...p, name: e.target.value }))} fullWidth size="small" /></Grid>
                      <Grid item xs={12}><TextField label="Logo URL" value={branding.logo || ''} onChange={(e) => setBranding((p: any) => ({ ...p, logo: e.target.value }))} fullWidth size="small" helperText="Full URL to logo image (PNG/SVG recommended)" InputProps={{ startAdornment: <Image fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} /> }} /></Grid>
                      <Grid item xs={12}><TextField label="Favicon URL" value={branding.favicon || ''} onChange={(e) => setBranding((p: any) => ({ ...p, favicon: e.target.value }))} fullWidth size="small" helperText="32x32 PNG icon URL" /></Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Primary Color" type="color" value={branding.primaryColor || '#1976d2'} onChange={(e) => setBranding((p: any) => ({ ...p, primaryColor: e.target.value }))} fullWidth size="small" helperText="Main brand color" InputProps={{ startAdornment: <Palette fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} /> }} />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <TextField label="Secondary Color" type="color" value={branding.secondaryColor || '#dc004e'} onChange={(e) => setBranding((p: any) => ({ ...p, secondaryColor: e.target.value }))} fullWidth size="small" helperText="Accent color" />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField label="Custom Domain" value={branding.customDomain || ''} onChange={(e) => setBranding((p: any) => ({ ...p, customDomain: e.target.value }))} fullWidth size="small" helperText="e.g. portal.springdaleschool.com (add CNAME → your server)" InputProps={{ startAdornment: <Language fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} /> }} />
                      </Grid>
                      <Grid item xs={12}><TextField label="School Website" value={branding.website || ''} onChange={(e) => setBranding((p: any) => ({ ...p, website: e.target.value }))} fullWidth size="small" /></Grid>
                    </Grid>
                    <Box mt={3} display="flex" justifyContent="flex-end">
                      <Button variant="contained" startIcon={<Save />} onClick={() => saveMutation.mutate(branding)} disabled={saveMutation.isPending}>
                        {saveMutation.isPending ? 'Saving...' : 'Save Branding'}
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}

          {/* Custom Domain List */}
          <Card sx={{ mt: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} mb={2}>All Custom Domains</Typography>
              <Alert severity="info" sx={{ mb: 2 }}>For each custom domain, add a CNAME record pointing to your server IP. SSL is auto-provisioned via Let's Encrypt.</Alert>
              <Box display="flex" gap={1} flexWrap="wrap">
                {(domains?.data || []).map((d: any) => (
                  <Chip key={d.slug} label={`${d.name}: ${d.customDomain}`} variant="outlined" size="small" />
                ))}
                {!domains?.data?.length && <Typography variant="body2" color="text.secondary">No custom domains configured yet</Typography>}
              </Box>
            </CardContent>
          </Card>
        </>
      )}
    </Box>
  );
}
