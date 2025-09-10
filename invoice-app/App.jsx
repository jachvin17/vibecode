import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Suppliers from './components/Suppliers';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';

function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [invoices, setInvoices] = useState([]);

  return (
    <Router>
      <nav style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
        <Link to="/suppliers">Suppliers</Link>
        <Link to="/invoice">New Invoice</Link>
        <Link to="/invoices">Invoices</Link>
      </nav>
      <Routes>
        <Route path="/suppliers" element={<Suppliers suppliers={suppliers} setSuppliers={setSuppliers} />} />
        <Route path="/invoice" element={<InvoiceForm suppliers={suppliers} invoices={invoices} setInvoices={setInvoices} />} />
        <Route path="/invoices" element={<InvoiceList invoices={invoices} suppliers={suppliers} />} />
        <Route path="*" element={<div>Welcome to Czech Invoice App</div>} />
      </Routes>
    </Router>
  );
}

export default App;
