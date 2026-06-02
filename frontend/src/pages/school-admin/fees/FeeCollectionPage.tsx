import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Box, Card, CardContent, Typography, Button, Grid, TextField, MenuItem, Select, FormControl, InputLabel, Alert, Divider, Chip } from '@mui/material';
import { ArrowBack, Receipt } from '@mui/icons-material';
import { api } from '../../../services/api/client';
import toast from 'react-hot-toast';

export default function FeeCollectionPage() {
  const navigate = useNavigate();
  const [admissionNo, setAdmissionNo] = useState('');
  const [studentData, setStudentData] = useState<any>(null);
  const [selectedInstallment, setSelectedInstallment] = useState<any>(null);
  const { register, handleSubmit, reset, watch } = useForm({ defaultValues: { paymentMode: 'CASH', paidAmount: '', discount: '0', remarks: '', transactionId: '' } });

  const searchStudent = async () => {
    try {
      const res = await api.get(`/students`, { search: admissionNo, limit: 1 });
      if (res.data?.length) { const feeRes = await api.get(`/fees/student/${res.data[0].id}`, { academicYearId: 'current' }); setStudentData(feeRes.data); }
      else toast.error('Student not found');
    } catch { toast.error('Error fetching student'); }
  };

  const mutation = useMutation({
    mutationFn: (dto: any) => api.post('/fees/collect', dto),
    onSuccess: (res) => { toast.success(`Receipt ${res.data?.receiptNo} generated!`); setStudentData(null); setAdmissionNo(''); reset(); },
  });

  const onSubmit = (data: any) => {
    if (!selectedInstallment) return toast.error('Select an installment');
    mutation.mutate({ studentId: studentData.student.id, installmentId: selectedInstallment.id, paidAmount: +data.paidAmount, discount: +data.discount, paymentMode: data.paymentMode, remarks: data.remarks });
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" gap={2} mb={3}><Button startIcon={<ArrowBack />} onClick={() => navigate('/fees')}>Back</Button><Typography variant="h5" fontWeight={700}>Fee Collection</Typography></Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card><CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>Find Student</Typography>
            <Box display="flex" gap={1}>
              <TextField size="small" label="Admission No" value={admissionNo} onChange={(e) => setAdmissionNo(e.target.value)} fullWidth />
              <Button variant="contained" onClick={searchStudent}>Search</Button>
            </Box>
            {studentData && (
              <Box mt={2}>
                <Typography fontWeight={600}>{studentData.student.firstName} {studentData.student.lastName}</Typography>
                <Typography variant="body2" color="text.secondary">{studentData.student.admissionNo}</Typography>
                <Divider sx={{ my: 1.5 }} />
                <Typography variant="body2">Total Fees: <b>₹{studentData.summary?.totalFees?.toLocaleString()}</b></Typography>
                <Typography variant="body2" color="success.main">Paid: <b>₹{studentData.summary?.totalPaid?.toLocaleString()}</b></Typography>
                <Typography variant="body2" color="error.main">Due: <b>₹{studentData.summary?.totalDue?.toLocaleString()}</b></Typography>
              </Box>
            )}
          </CardContent></Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card><CardContent>
            <Typography variant="h6" fontWeight={600} mb={2}>Payment Details</Typography>
            {studentData?.feeStructure?.feeInstallments?.map((inst: any) => (
              <Box key={inst.id} onClick={() => setSelectedInstallment(inst)} sx={{ p: 2, mb: 1.5, borderRadius: 2, border: '2px solid', borderColor: selectedInstallment?.id === inst.id ? 'primary.main' : 'divider', cursor: 'pointer', '&:hover': { borderColor: 'primary.light' } }}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Box><Typography fontWeight={600}>{inst.name}</Typography><Typography variant="caption" color="text.secondary">Due: {new Date(inst.dueDate).toLocaleDateString('en-IN')}</Typography></Box>
                  <Box textAlign="right"><Typography fontWeight={700}>₹{Number(inst.amount).toLocaleString()}</Typography>{inst.dueAmount > 0 ? <Chip label="Due" color="error" size="small" /> : <Chip label="Paid" color="success" size="small" />}</Box>
                </Box>
              </Box>
            ))}
            {studentData && (
              <Box component="form" onSubmit={handleSubmit(onSubmit)} mt={2} display="flex" flexDirection="column" gap={2}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}><TextField label="Amount *" type="number" {...register('paidAmount')} size="small" fullWidth /></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Discount" type="number" {...register('discount')} size="small" fullWidth /></Grid>
                  <Grid item xs={12} sm={6}><FormControl size="small" fullWidth><InputLabel>Payment Mode</InputLabel><Select {...register('paymentMode')} label="Payment Mode"><MenuItem value="CASH">Cash</MenuItem><MenuItem value="UPI">UPI</MenuItem><MenuItem value="CARD">Card</MenuItem><MenuItem value="CHEQUE">Cheque</MenuItem><MenuItem value="NETBANKING">Net Banking</MenuItem></Select></FormControl></Grid>
                  <Grid item xs={12} sm={6}><TextField label="Transaction ID" {...register('transactionId')} size="small" fullWidth /></Grid>
                  <Grid item xs={12}><TextField label="Remarks" {...register('remarks')} size="small" fullWidth /></Grid>
                </Grid>
                <Button type="submit" variant="contained" startIcon={<Receipt />} disabled={mutation.isPending} size="large">
                  {mutation.isPending ? 'Processing...' : 'Collect & Generate Receipt'}
                </Button>
              </Box>
            )}
          </CardContent></Card>
        </Grid>
      </Grid>
    </Box>
  );
}
