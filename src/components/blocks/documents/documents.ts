import { formatCurrency, formatDate, formatNumber } from '@/utils/format'

export const money = formatCurrency
export const date = formatDate
export const amount = formatNumber

/** Example only. Confirm each product's VAT treatment with finance before issuing invoices. */
export const EXAMPLE_VAT_RATE = 0.16

export interface DocumentMeta {
  label: string
  value: string
}

/** Same shape as an order-entry line: a priced product counted in packs. */
export interface DocumentLine {
  id: string
  name: string
  pack: string
  price: number
  quantity: number
}

export function lineTotal(line: Pick<DocumentLine, 'price' | 'quantity'>) {
  return line.price * line.quantity
}

export function subtotalOf(lines: Pick<DocumentLine, 'price' | 'quantity'>[]) {
  return lines.reduce((sum, line) => sum + lineTotal(line), 0)
}

export function vatOf(amount: number, rate = EXAMPLE_VAT_RATE) {
  return Math.round(amount * rate * 100) / 100
}

/** Sample seller details. Replace with the registered company details before use. */
export const seller = {
  name: 'Farm to Feed',
  address: ['Sample business park, Unit 0', 'Nairobi, Kenya'],
  kraPin: 'P000000000X',
  email: 'accounts@example.com',
}

export type InvoiceStatus = 'Draft' | 'Issued' | 'Paid' | 'Overdue'

export const invoiceStatuses: InvoiceStatus[] = ['Draft', 'Issued', 'Paid', 'Overdue']

export const invoiceSeverity: Record<InvoiceStatus, 'secondary' | 'info' | 'success' | 'danger'> = {
  Draft: 'secondary',
  Issued: 'info',
  Paid: 'success',
  Overdue: 'danger',
}

export const invoice = {
  number: 'INV-2026-0418',
  order: 'FTF-1049',
  issued: '2026-11-18',
  due: '2026-12-02',
  paid: '2026-11-27',
  terms: '14 days from invoice date',
  customer: {
    name: 'Green Basket Kitchen',
    contact: 'Amina Hassan',
    address: ['14 Muthithi Road', 'Westlands, Nairobi'],
    kraPin: 'P000000001Y',
  },
  lines: [
    { id: 'FTF-TOM', name: 'Tomatoes', pack: '10 kg crate', price: 1200, quantity: 12 },
    { id: 'FTF-CAR', name: 'Carrots', pack: '10 kg bag', price: 950, quantity: 10 },
    { id: 'FTF-POT', name: 'Potatoes', pack: '20 kg bag', price: 1500, quantity: 8 },
    { id: 'FTF-AVO', name: 'Avocados', pack: '10 kg crate', price: 1800, quantity: 6 },
    { id: 'FTF-KAL', name: 'Kale', pack: '5 kg bag', price: 900, quantity: 4 },
    { id: 'FTF-DEL', name: 'Delivery · Westlands', pack: 'Per drop', price: 1500, quantity: 1 },
  ] satisfies DocumentLine[],
  /** Fictional payment details for layout only. */
  payment: {
    paybill: '000000',
    bank: 'Example Bank Kenya',
    branch: 'Sample branch',
    account: '0000000000000',
  },
}

export interface PurchaseLine extends DocumentLine {
  grade: string
  unit: string
  unitsPerPack: number
}

export const purchaseOrder = {
  number: 'PO-2026-0233',
  raised: '2026-11-20',
  deliveryDate: '2026-11-24',
  deliveryWindow: '5:00 am – 8:00 am',
  deliverTo: ['FTF Nairobi hub (sample address)', 'Gate B, receiving bay 2'],
  supplier: {
    name: 'Kinangop Highland Growers',
    farm: 'Njabini, Nyandarua',
    contact: 'Joseph Mwangi',
    kraPin: 'P000000002Z',
  },
  /** Price is per unit (kg); quantity counts packs. */
  lines: [
    {
      id: 'SUP-CAR',
      name: 'Carrots',
      grade: 'Grade 1, washed',
      unit: 'kg',
      pack: '10 kg bag',
      unitsPerPack: 10,
      price: 62,
      quantity: 40,
    },
    {
      id: 'SUP-POT',
      name: 'Potatoes (Shangi)',
      grade: 'Grade 1, medium',
      unit: 'kg',
      pack: '20 kg bag',
      unitsPerPack: 20,
      price: 55,
      quantity: 30,
    },
    {
      id: 'SUP-CAB',
      name: 'Cabbage',
      grade: 'Firm heads, 1.5–2 kg',
      unit: 'kg',
      pack: '25 kg net',
      unitsPerPack: 25,
      price: 28,
      quantity: 16,
    },
    {
      id: 'SUP-PEA',
      name: 'Garden peas',
      grade: 'Shelled, chilled',
      unit: 'kg',
      pack: '5 kg crate',
      unitsPerPack: 5,
      price: 240,
      quantity: 12,
    },
  ] satisfies PurchaseLine[],
  preparedBy: { name: 'Faith Wanjiru', role: 'Procurement officer' },
  approver: { name: 'Daniel Kiprop', role: 'Procurement lead' },
  terms: [
    'Deliver within the stated window. Late deliveries may be refused if receiving is closed.',
    'Produce must meet the stated grade. Items that fail quality checks are returned and not paid.',
    'Payment is due 7 days after the goods received note, for accepted quantities only.',
    'Prices are fixed for this order and exclude VAT where it applies.',
  ],
}

export function purchaseLineTotal(line: PurchaseLine) {
  return line.price * line.unitsPerPack * line.quantity
}

export interface DeliveryLine {
  id: string
  name: string
  pack: string
  ordered: number
  delivered: number
  rejected: number
  reason?: string
}

export const deliveryNote = {
  number: 'DN-2026-1187',
  order: 'FTF-1049',
  dispatched: '2026-11-18T05:40:00+03:00',
  route: 'Westlands R3 · stop 4 of 9',
  driver: 'Peter Otieno',
  vehicle: 'KXX 000X (sample)',
  customer: {
    name: 'Green Basket Kitchen',
    address: ['14 Muthithi Road', 'Westlands, Nairobi — kitchen entrance'],
  },
  crates: { dispatched: 18, collected: 6 },
  lines: [
    {
      id: 'FTF-TOM',
      name: 'Tomatoes',
      pack: '10 kg crate',
      ordered: 12,
      delivered: 12,
      rejected: 1,
      reason: 'Bruised on arrival',
    },
    { id: 'FTF-CAR', name: 'Carrots', pack: '10 kg bag', ordered: 10, delivered: 10, rejected: 0 },
    {
      id: 'FTF-POT',
      name: 'Potatoes',
      pack: '20 kg bag',
      ordered: 8,
      delivered: 7,
      rejected: 0,
      reason: 'Short-picked at hub',
    },
    {
      id: 'FTF-AVO',
      name: 'Avocados',
      pack: '10 kg crate',
      ordered: 6,
      delivered: 6,
      rejected: 2,
      reason: 'Over-ripe',
    },
    { id: 'FTF-KAL', name: 'Kale', pack: '5 kg bag', ordered: 4, delivered: 4, rejected: 0 },
  ] satisfies DeliveryLine[],
}

/** Packs the customer keeps: delivered minus rejected. */
export function acceptedOf(line: DeliveryLine) {
  return Math.max(0, line.delivered - line.rejected)
}
