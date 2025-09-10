import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import Suppliers from './components/Suppliers';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';

function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Czech Invoicing App
          </Typography>
          <Button color="inherit" component={Link} to="/suppliers">Suppliers</Button>
          <Button color="inherit" component={Link} to="/invoice">New Invoice</Button>
          <Button color="inherit" component={Link} to="/invoices">Invoices</Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/invoice" element={<InvoiceForm />} />
          <Route path="/invoices" element={<InvoiceList />} />
          <Route path="*" element={<Suppliers />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
