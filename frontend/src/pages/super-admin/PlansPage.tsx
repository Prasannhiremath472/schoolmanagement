import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Button, Grid, Chip, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Add, Star } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { api } from '../../services/api/client';
import toast from 'react-hot-toast';

export default function PlansPage() {
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const { data } = useQuery({ queryKey: ['plans'], queryFn: () => api.get('/subscriptions/plans') });
  const createMutation = useMutation({
    mutationFn: (dto: any) => api.post('/super-admin/plans', dto),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['plans'] }); setOpenDialog(false); toast.success('Plan created!'); },
  });
  const { register, handleSubmit, reset } = useForm();
  const plans = data?.data || [];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box><Typography variant="h5" fontWeight={700}>Subscription Plans</Typography></Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setOpenDialog(true)}>Create Plan</Button>
      </Box>
      <Grid container spacing={3}>
        {plans.map((plan: any) => (
          <Grid item xs={12} sm={6} md={4} key={plan.id}>
            <Card sx={{ border: plan.billingCycle === 'YEARLY' ? '2px solid' : '1px solid', borderColor: plan.billingCycle === 'YEARLY' ? 'primary.main' : 'divider' }}>
              <CardContent>
                {plan.billingCycle === 'YEARLY' && <Chip label="Popular" color="primary" size="small" icon={<Star fontSize="small" />} sx={{ mb: 1 }} />}
                <Typography variant="h6" fontWeight={700}>{plan.name}</Typography>
                <Typography variant="h4" fontWeight={800} color="primary" my={1}>₹{Number(plan.price).toLocaleString()}<Typography component="span" variant="body2" color="text.secondary">/{plan.billingCycle.toLowerCase()}</Typography></Typography>
                <Typography variant="body2" color="text.secondary" mb={2}>{plan.description}</Typography>
                <Typography variant="caption">Max Students: {plan.maxStudents === -1 ? 'Unlimited' : plan.maxStudents}</Typography><br/>
                <Typography variant="caption">Storage: {plan.storageGB}GB</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create Subscription Plan</DialogTitle>
        <DialogContent>
          <Box component="form" id="plan-form" onSubmit={handleSubmit((d) => createMutation.mutate(d))} display="flex" flexDirection="column" gap={2} pt={1}>
            <TextField label="Plan Name" {...register('name')} size="small" fullWidth />
            <TextField label="Slug" {...register('slug')} size="small" fullWidth />
            <TextField label="Price" type="number" {...register('price')} size="small" fullWidth />
            <FormControl size="small"><InputLabel>Billing Cycle</InputLabel><Select {...register('billingCycle')} label="Billing Cycle"><MenuItem value="MONTHLY">Monthly</MenuItem><MenuItem value="QUARTERLY">Quarterly</MenuItem><MenuItem value="YEARLY">Yearly</MenuItem><MenuItem value="TRIAL">Trial</MenuItem></Select></FormControl>
            <TextField label="Max Students (-1 = unlimited)" type="number" {...register('maxStudents')} size="small" fullWidth defaultValue={-1} />
            <TextField label="Storage (GB)" type="number" {...register('storageGB')} size="small" fullWidth defaultValue={10} />
          </Box>
        </DialogContent>
        <DialogActions><Button onClick={() => setOpenDialog(false)}>Cancel</Button><Button type="submit" form="plan-form" variant="contained">Create</Button></DialogActions>
      </Dialog>
    </Box>
  );
}
