import React, { useState } from 'react';

function InvoiceForm({ suppliers, invoices, setInvoices }) {
  const [supplierIdx, setSupplierIdx] = useState('');
  const [date, setDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [amount, setAmount] = useState('');
  const [vat, setVat] = useState('');
  const [currency, setCurrency] = useState('CZK');
  const [round, setRound] = useState(2);

  const handleAdd = () => {
    if (supplierIdx === '' || !date || !amount) return;
    const supplier = suppliers[supplierIdx];
    const total = Number(amount) + Number(vat || 0);
    const rounded = Number(total).toFixed(round);
    setInvoices([
      ...invoices,
      {
        supplier,
        date,
        dueDate,
        amount: Number(amount),
        vat: Number(vat || 0),
        currency,
        total: Number(rounded),
        round,
      },
    ]);
    setSupplierIdx(''); setDate(''); setDueDate(''); setAmount(''); setVat(''); setCurrency('CZK'); setRound(2);
  };

  return (
    <div>
      <h2>New Invoice</h2>
      <select value={supplierIdx} onChange={e => setSupplierIdx(e.target.value)}>
        <option value="">Select supplier</option>
        {suppliers.map((s, idx) => (
          <option key={idx} value={idx}>{s.name} (IČO: {s.ico})</option>
        ))}
      </select>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} placeholder="Date" />
      <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} placeholder="Due Date" />
      <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount (bez DPH)" />
      <input type="number" value={vat} onChange={e => setVat(e.target.value)} placeholder="VAT (DPH)" />
      <input value={currency} onChange={e => setCurrency(e.target.value)} placeholder="Currency" />
      <label>Rounding:
        <select value={round} onChange={e => setRound(Number(e.target.value))}>
          <option value={0}>0</option>
          <option value={1}>1</option>
          <option value={2}>2</option>
        </select>
      </label>
      <button onClick={handleAdd}>Add Invoice</button>
    </div>
  );
}

export default InvoiceForm;
