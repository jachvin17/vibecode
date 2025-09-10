import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Paper, Typography } from '@mui/material';
import { getInvoices } from '../data/storage';
import jsPDF from 'jspdf';

function InvoiceList() {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    setInvoices(getInvoices());
  }, []);

  const exportPDF = (invoice) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Invoice', 10, 15);
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoice.invoiceNumber}`, 10, 30);
    doc.text(`Supplier: ${invoice.supplier}`, 10, 40);
    doc.text(`Issue Date: ${invoice.issueDate}`, 10, 50);
    doc.text(`Due Date: ${invoice.dueDate}`, 10, 60);
    doc.text(`Taxable Supply Date: ${invoice.taxDate}`, 10, 70);
    doc.text(`Description: ${invoice.description}`, 10, 80);
    doc.text(`Amount: ${invoice.amount} Kč`, 10, 90);
    doc.text(`VAT: ${invoice.vat} %`, 10, 100);
    doc.save(`invoice-${invoice.invoiceNumber}.pdf`);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>Invoices</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Invoice Number</TableCell>
            <TableCell>Supplier</TableCell>
            <TableCell>Issue Date</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Amount (Kč)</TableCell>
            <TableCell>VAT (%)</TableCell>
            <TableCell>Export</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {invoices.map((inv, idx) => (
            <TableRow key={idx}>
              <TableCell>{inv.invoiceNumber}</TableCell>
              <TableCell>{inv.supplier}</TableCell>
              <TableCell>{inv.issueDate}</TableCell>
              <TableCell>{inv.dueDate}</TableCell>
              <TableCell>{inv.amount}</TableCell>
              <TableCell>{inv.vat}</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => exportPDF(inv)}>Export PDF</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default InvoiceList;
