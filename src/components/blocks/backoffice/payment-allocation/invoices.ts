import type { OpenInvoice } from './allocation'

/** Open invoices for one customer, deliberately not in due-date order. */
export const customerInvoices: OpenInvoice[] = [
  { id: 'inv-2063', number: 'INV-2063', dueDate: '2026-12-05', balance: 64250 },
  { id: 'inv-2041', number: 'INV-2041', dueDate: '2026-10-28', balance: 85000 },
  { id: 'inv-2052', number: 'INV-2052', dueDate: '2026-11-14', balance: 42500.5 },
  { id: 'inv-2047', number: 'INV-2047', dueDate: '2026-11-02', balance: 120000 },
  { id: 'inv-2070', number: 'INV-2070', dueDate: '2026-12-19', balance: 31800 },
]
