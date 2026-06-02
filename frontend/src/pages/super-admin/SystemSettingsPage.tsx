import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box, Card, CardContent, Typography, Button, TextField, Grid,
  Tab, Tabs, Divider, Alert, CircularProgress, InputAdornment, IconButton,
} from '@mui/material';
import { Save, Visibility, VisibilityOff } from '@mui/icons-material';
import { api } from '../../services/api/client';
import toast from 'react-hot-toast';

interface SettingField { key: string; label: string; type?: string; helperText?: string; isSecret?: boolean; }

const settingGroups: Record<string, SettingField[]> = {
  general: [
    { key: 'platform.name', label: 'Platform Name' },
    { key: 'platform.support_email', label: 'Support Email', type: 'email' },
    { key: 'platform.domain', label: 'Platform Domain', helperText: 'e.g. schoolerp.com' },
  ],
  smtp: [
    { key: 'smtp.host', label: 'SMTP Host', helperText: 'e.g. smtp.gmail.com' },
    { key: 'smtp.port', label: 'SMTP Port', helperText: '587 for TLS, 465 for SSL' },
    { key: 'smtp.user', label: 'SMTP Username' },
    { key: 'smtp.pass', label: 'SMTP Password', type: 'password', isSecret: true },
    { key: 'smtp.from', label: 'From Name/Email', helperText: 'School ERP <noreply@schoolerp.com>' },
  ],
  sms: [
    { key: 'sms.provider', label: 'SMS Provider', helperText: 'twilio, msg91, etc.' },
    { key: 'sms.account_sid', label: 'Account SID / API Key' },
    { key: 'sms.auth_token', label: 'Auth Token / API Secret', type: 'password', isSecret: true },
    { key: 'sms.from_number', label: 'From Number', helperText: '+1234567890' },
    { key: 'sms.whatsapp_number', label: 'WhatsApp Number' },
  ],
  payment: [
    { key: 'razorpay.key_id', label: 'Razorpay Key ID' },
    { key: 'razorpay.key_secret', label: 'Razorpay Key Secret', type: 'password', isSecret: true },
    { key: 'razorpay.webhook_secret', label: 'Razorpay Webhook Secret', type: 'password', isSecret: true },
    { key: 'stripe.pub_key', label: 'Stripe Publishable Key' },
    { key: 'stripe.secret_key', label: 'Stripe Secret Key', type: 'password', isSecret: true },
    { key: 'stripe.webhook_secret', label: 'Stripe Webhook Secret', type: 'password', isSecret: true },
  ],
  firebase: [
    { key: 'firebase.project_id', label: 'Firebase Project ID' },
    { key: 'firebase.client_email', label: 'Firebase Client Email' },
    { key: 'firebase.private_key', label: 'Firebase Private Key', type: 'password', isSecret: true },
  ],
  storage: [
    { key: 's3.endpoint', label: 'S3 Endpoint URL' },
    { key: 's3.region', label: 'S3 Region', helperText: 'ap-south-1' },
    { key: 's3.bucket', label: 'S3 Bucket Name' },
    { key: 's3.access_key', label: 'S3 Access Key' },
    { key: 's3.secret_key', label: 'S3 Secret Key', type: 'password', isSecret: true },
  ],
};

const groups = Object.keys(settingGroups);
const groupLabels: Record<string, string> = { general: 'General', smtp: 'Email (SMTP)', sms: 'SMS & WhatsApp', payment: 'Payment Gateways', firebase: 'Firebase Push', storage: 'File Storage' };

export default function SystemSettingsPage() {
  const queryClient = useQueryClient();
  const [tab, setTab] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [showSecrets, setShowSecrets] = useState<Record<string, boolean>>({});

  const currentGroup = groups[tab];

  const { data, isLoading } = useQuery({
    queryKey: ['system-settings', currentGroup],
    queryFn: () => api.get('/super-admin/settings', { group: currentGroup }),
  });

  useEffect(() => {
    if (data?.data) {
      const vals: Record<string, string> = {};
      data.data.forEach((s: any) => { vals[s.key] = s.value === '••••••••' ? '' : s.value; });
      setValues((prev) => ({ ...prev, ...vals }));
    }
  }, [data]);

  const saveMutation = useMutation({
    mutationFn: (settings: any[]) => api.post('/super-admin/settings/bulk', { settings }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['system-settings'] }); toast.success('Settings saved!'); },
  });

  const handleSave = () => {
    const fields = settingGroups[currentGroup];
    const settings = fields
      .filter((f) => values[f.key] !== undefined && values[f.key] !== '' && values[f.key] !== '••••••••')
      .map((f) => ({ key: f.key, value: values[f.key], group: currentGroup, isSecret: f.isSecret || false }));
    saveMutation.mutate(settings);
  };

  const fields = settingGroups[currentGroup] || [];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box><Typography variant="h5" fontWeight={700}>System Settings</Typography><Typography variant="body2" color="text.secondary">Configure platform-level settings</Typography></Box>
        <Button variant="contained" startIcon={<Save />} onClick={handleSave} disabled={saveMutation.isPending}>{saveMutation.isPending ? 'Saving...' : 'Save Settings'}</Button>
      </Box>

      <Alert severity="warning" sx={{ mb: 2 }}>Changes here affect the entire platform. Handle with care.</Alert>

      <Card>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
            {groups.map((g) => <Tab key={g} label={groupLabels[g] || g} />)}
          </Tabs>
        </Box>
        <CardContent>
          {isLoading ? <CircularProgress /> : (
            <Grid container spacing={2.5}>
              {fields.map((field) => (
                <Grid item xs={12} sm={6} key={field.key}>
                  <TextField
                    label={field.label}
                    fullWidth
                    size="small"
                    type={field.type === 'password' && !showSecrets[field.key] ? 'password' : 'text'}
                    value={values[field.key] || ''}
                    onChange={(e) => setValues((prev) => ({ ...prev, [field.key]: e.target.value }))}
                    helperText={field.helperText}
                    placeholder={field.isSecret ? 'Enter to update (leave blank to keep current)' : ''}
                    InputProps={field.type === 'password' ? {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton size="small" onClick={() => setShowSecrets((prev) => ({ ...prev, [field.key]: !prev[field.key] }))}>
                            {showSecrets[field.key] ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    } : undefined}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
