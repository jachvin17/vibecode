import React, { useState, useEffect } from 'react';
import { Button, TextField, MenuItem, Box, Typography, Paper, Grid, InputAdornment } from '@mui/material';
import { getSuppliers, getInvoices, saveInvoices } from '../data/storage';

const MANDATORY_FIELDS = [
  { name: 'invoiceNumber', label: 'Invoice Number', required: true },
  { name: 'issueDate', label: 'Issue Date', type: 'date', required: true },
  { name: 'dueDate', label: 'Due Date', type: 'date', required: true },
  { name: 'taxDate', label: 'Taxable Supply Date', type: 'date', required: true },
  { name: 'amount', label: 'Amount', type: 'number', required: true },
  { name: 'vat', label: 'VAT (%)', type: 'number', required: true },
  { name: 'description', label: 'Description', required: true },
];

function InvoiceForm() {
  const [suppliers, setSuppliers] = useState([]);
  const [form, setForm] = useState({
    supplier: '',
    invoiceNumber: '',
    issueDate: '',
    dueDate: '',
    taxDate: '',
    amount: '',
    vat: '',
    description: '',
    rounding: 2,
  });
  const [error, setError] = useState('');

  useEffect(() => {
    setSuppliers(getSuppliers());
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoundingChange = (e) => {
    setForm({ ...form, rounding: parseInt(e.target.value, 10) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.supplier) {
      setError('Supplier is required');
      return;
    }
    for (let field of MANDATORY_FIELDS) {
      if (field.required && !form[field.name]) {
        setError(`${field.label} is required`);
        return;
      }
    }
    setError('');
    // Rounding
    const roundedAmount = Number(Number(form.amount).toFixed(form.rounding));
    const roundedVat = Number(Number(form.vat).toFixed(form.rounding));
    const invoice = {
      ...form,
      amount: roundedAmount,
      vat: roundedVat,
      id: Date.now(),
    };
    const invoices = getInvoices();
    saveInvoices([...invoices, invoice]);
    setForm({
      supplier: '',
      invoiceNumber: '',
      issueDate: '',
      dueDate: '',
      taxDate: '',
      amount: '',
      vat: '',
      description: '',
      rounding: 2,
    });
    setError('Invoice saved!');
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>New Invoice</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          select
          label="Supplier"
          name="supplier"
          value={form.supplier}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        >
          {suppliers.map((s, idx) => (
            <MenuItem key={idx} value={s.name}>{s.name}</MenuItem>
          ))}
        </TextField>
        <Grid container spacing={2}>
          {MANDATORY_FIELDS.map(field => (
            <Grid item xs={12} sm={field.type === 'number' ? 6 : 12} key={field.name}>
              <TextField
                label={field.label}
                name={field.name}
                type={field.type || 'text'}
                value={form[field.name]}
                onChange={handleChange}
                fullWidth
                required={field.required}
                InputProps={field.name === 'amount' ? { endAdornment: <InputAdornment position="end">Kč</InputAdornment> } : {}}
              />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Rounding (decimals)"
            name="rounding"
            type="number"
            value={form.rounding}
            onChange={handleRoundingChange}
            inputProps={{ min: 0, max: 4 }}
            sx={{ width: 200 }}
          />
        </Box>
        {error && <Typography color={error === 'Invoice saved!' ? 'success.main' : 'error'} sx={{ mt: 2 }}>{error}</Typography>}
        <Box sx={{ mt: 3 }}>
          <Button type="submit" variant="contained">Save Invoice</Button>
        </Box>
      </form>
    </Paper>
  );
}

export default InvoiceForm;
