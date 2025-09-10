// Simple local storage helpers for suppliers and invoices

const SUPPLIERS_KEY = 'suppliers';
const INVOICES_KEY = 'invoices';

export function getSuppliers() {
  return JSON.parse(localStorage.getItem(SUPPLIERS_KEY) || '[]');
}

export function saveSuppliers(suppliers) {
  localStorage.setItem(SUPPLIERS_KEY, JSON.stringify(suppliers));
}

export function getInvoices() {
  return JSON.parse(localStorage.getItem(INVOICES_KEY) || '[]');
}

export function saveInvoices(invoices) {
  localStorage.setItem(INVOICES_KEY, JSON.stringify(invoices));
}
