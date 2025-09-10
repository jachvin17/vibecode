import React, { useState, useEffect } from 'react';
import { Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { getSuppliers, saveSuppliers } from '../data/storage';

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', ico: '', dic: '', address: '' });

  useEffect(() => {
    setSuppliers(getSuppliers());
  }, []);

  const handleOpen = (supplier) => {
    setEditing(supplier ? supplier : null);
    setForm(supplier ? supplier : { name: '', ico: '', dic: '', address: '' });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
    setForm({ name: '', ico: '', dic: '', address: '' });
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    let updated;
    if (editing) {
      updated = suppliers.map(s => s === editing ? form : s);
    } else {
      updated = [...suppliers, form];
    }
    setSuppliers(updated);
    saveSuppliers(updated);
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={() => handleOpen(null)} sx={{ mb: 2 }}>Add Supplier</Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>IČO</TableCell>
            <TableCell>DIČ</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.map((s, idx) => (
            <TableRow key={idx}>
              <TableCell>{s.name}</TableCell>
              <TableCell>{s.ico}</TableCell>
              <TableCell>{s.dic}</TableCell>
              <TableCell>{s.address}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(s)}><EditIcon /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editing ? 'Edit Supplier' : 'Add Supplier'}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Name" name="name" value={form.name} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="IČO" name="ico" value={form.ico} onChange={handleChange} fullWidth required />
          <TextField margin="dense" label="DIČ" name="dic" value={form.dic} onChange={handleChange} fullWidth />
          <TextField margin="dense" label="Address" name="address" value={form.address} onChange={handleChange} fullWidth required />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Suppliers;
