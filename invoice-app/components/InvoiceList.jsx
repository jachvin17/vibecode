import React from 'react';
import jsPDF from 'jspdf';

function InvoiceList({ invoices, suppliers }) {
  const exportPDF = (inv, idx) => {
    const doc = new jsPDF();
    doc.text(`Invoice #${idx + 1}`, 10, 10);
    doc.text(`Supplier: ${inv.supplier.name} (IČO: ${inv.supplier.ico}, DIČ: ${inv.supplier.dic})`, 10, 20);
    doc.text(`Date: ${inv.date}`, 10, 30);
    doc.text(`Due Date: ${inv.dueDate}`, 10, 40);
    doc.text(`Amount: ${inv.amount} ${inv.currency}`, 10, 50);
    doc.text(`VAT: ${inv.vat} ${inv.currency}`, 10, 60);
    doc.text(`Total: ${inv.total} ${inv.currency} (rounded to ${inv.round} decimals)`, 10, 70);
    doc.save(`invoice_${idx + 1}.pdf`);
  };

  return (
    <div>
      <h2>Invoices</h2>
      <ul>
        {invoices.map((inv, idx) => (
          <li key={idx}>
            {inv.supplier.name} | {inv.date} | {inv.amount} + {inv.vat} = {inv.total} {inv.currency}
            <button onClick={() => exportPDF(inv, idx)}>Export PDF</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InvoiceList;
