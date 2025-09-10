import React, { useState } from 'react';
import InvoiceList from './components/InvoiceList';

function App() {
  const [suppliers, setSuppliers] = useState([]);
  const [invoices, setInvoices] = useState([]);

  return (
    <InvoiceList invoices={invoices} suppliers={suppliers} />
  );
}

export default App;
