import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, TextField, Table, TableBody, TableCell, TableHead, TableRow, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Save } from '@mui/icons-material';
import { useMutation } from '@tanstack/react-query';
import { api } from '../../../services/api/client';
import toast from 'react-hot-toast';

export default function MarksEntryPage() {
  const [marks, setMarks] = useState<Record<string, string>>({});
  const students = [{ id: '1', name: 'Aarav Sharma', admissionNo: 'ADM-001' }, { id: '2', name: 'Priya Patel', admissionNo: 'ADM-002' }];
  const mutation = useMutation({ mutationFn: (dto: any) => api.post('/examinations/marks/bulk', dto), onSuccess: () => toast.success('Marks saved!') });
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} mb={3}>Marks Entry</Typography>
      <Card><CardContent>
        <Box display="flex" gap={2} mb={3}>
          <FormControl size="small" sx={{ minWidth: 200 }}><InputLabel>Exam Schedule</InputLabel><Select label="Exam Schedule" value=""><MenuItem value="1">Mid Term - Class 10</MenuItem></Select></FormControl>
          <FormControl size="small" sx={{ minWidth: 160 }}><InputLabel>Subject</InputLabel><Select label="Subject" value=""><MenuItem value="1">Mathematics</MenuItem></Select></FormControl>
        </Box>
        <Table size="small">
          <TableHead><TableRow><TableCell>Admission No</TableCell><TableCell>Student Name</TableCell><TableCell width={150}>Marks (Max: 100)</TableCell><TableCell width={100}>Absent</TableCell></TableRow></TableHead>
          <TableBody>
            {students.map((s) => (
              <TableRow key={s.id}>
                <TableCell>{s.admissionNo}</TableCell>
                <TableCell>{s.name}</TableCell>
                <TableCell><TextField size="small" type="number" value={marks[s.id] || ''} onChange={(e) => setMarks((p) => ({ ...p, [s.id]: e.target.value }))} inputProps={{ min: 0, max: 100 }} sx={{ width: 120 }} /></TableCell>
                <TableCell><input type="checkbox" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Box mt={2} display="flex" justifyContent="flex-end"><Button variant="contained" startIcon={<Save />} onClick={() => mutation.mutate({ marks: [] })}>Save Marks</Button></Box>
      </CardContent></Card>
    </Box>
  );
}
