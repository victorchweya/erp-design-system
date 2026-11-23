export type SupplierStatus = 'Active' | 'On hold' | 'Onboarding'

export interface SupplierOrder {
  reference: string
  date: string
  produce: string
  amount: number
  status: 'Received' | 'In transit' | 'Scheduled'
}

export interface SupplierActivity {
  id: string
  date: string
  text: string
}

export interface Supplier {
  id: string
  name: string
  contact: string
  phone: string
  county: string
  produce: string
  paymentTerms: string
  status: SupplierStatus
  notes: string
  orders: SupplierOrder[]
  activity: SupplierActivity[]
}

/** Fields the edit form can change. Orders and activity stay read-only. */
export type SupplierDetails = Pick<
  Supplier,
  'name' | 'contact' | 'phone' | 'county' | 'produce' | 'paymentTerms' | 'status' | 'notes'
>

export const supplierStatuses: SupplierStatus[] = ['Active', 'On hold', 'Onboarding']
export const counties = ['Kiambu', 'Kirinyaga', 'Meru', 'Murang’a', 'Nakuru', 'Nyandarua']
export const paymentTerms = ['On delivery', '7 days', '14 days', '30 days']

// Active uses the Tag default (primary, Kale), so it has no severity.
export const statusSeverity: Record<SupplierStatus, 'warn' | 'info' | undefined> = {
  Active: undefined,
  'On hold': 'warn',
  Onboarding: 'info',
}

export function supplierDetails(supplier: Supplier): SupplierDetails {
  const { name, contact, phone, county, produce, paymentTerms, status, notes } = supplier
  return { name, contact, phone, county, produce, paymentTerms, status, notes }
}

export const sampleSuppliers: Supplier[] = [
  {
    id: 'SUP-201',
    name: 'Limuru Greens Co-op',
    contact: 'Grace Wanjiru',
    phone: '+254 712 340 118',
    county: 'Kiambu',
    produce: 'Kale, spinach',
    paymentTerms: '7 days',
    status: 'Active',
    notes: 'Deliveries before 07:00 at the Nairobi hub.',
    orders: [
      {
        reference: 'PO-3301',
        date: '2026-11-18',
        produce: 'Kale · 400 kg',
        amount: 36000,
        status: 'Received',
      },
      {
        reference: 'PO-3315',
        date: '2026-11-20',
        produce: 'Spinach · 250 kg',
        amount: 27500,
        status: 'In transit',
      },
    ],
    activity: [
      { id: 'a1', date: '2026-11-20T06:40:00+03:00', text: 'PO-3315 dispatched from Limuru.' },
      { id: 'a2', date: '2026-11-18T07:05:00+03:00', text: 'PO-3301 received in full.' },
    ],
  },
  {
    id: 'SUP-202',
    name: 'Kirinyaga Tomato Growers',
    contact: 'Peter Mwangi',
    phone: '+254 722 801 554',
    county: 'Kirinyaga',
    produce: 'Tomatoes',
    paymentTerms: '14 days',
    status: 'Active',
    notes: '',
    orders: [
      {
        reference: 'PO-3308',
        date: '2026-11-19',
        produce: 'Tomatoes · 1,200 kg',
        amount: 96000,
        status: 'Received',
      },
    ],
    activity: [
      { id: 'a1', date: '2026-11-19T08:15:00+03:00', text: 'Quality check passed for PO-3308.' },
    ],
  },
  {
    id: 'SUP-203',
    name: 'Meru Highlands Produce',
    contact: 'Esther Kendi',
    phone: '+254 733 219 870',
    county: 'Meru',
    produce: 'Avocados, bananas',
    paymentTerms: '30 days',
    status: 'On hold',
    notes: 'Hold until updated KRA PIN certificate is received.',
    orders: [],
    activity: [{ id: 'a1', date: '2026-11-12T10:30:00+03:00', text: 'Supplier placed on hold.' }],
  },
  {
    id: 'SUP-204',
    name: 'Nyandarua Potato Farmers',
    contact: 'John Kamau',
    phone: '+254 701 556 203',
    county: 'Nyandarua',
    produce: 'Potatoes, carrots',
    paymentTerms: 'On delivery',
    status: 'Active',
    notes: '',
    orders: [
      {
        reference: 'PO-3320',
        date: '2026-11-21',
        produce: 'Potatoes · 2,000 kg',
        amount: 110000,
        status: 'Scheduled',
      },
    ],
    activity: [{ id: 'a1', date: '2026-11-19T14:00:00+03:00', text: 'PO-3320 scheduled.' }],
  },
  {
    id: 'SUP-205',
    name: 'Nakuru Onion Collective',
    contact: 'Mary Chebet',
    phone: '+254 745 118 902',
    county: 'Nakuru',
    produce: 'Red onions',
    paymentTerms: '7 days',
    status: 'Onboarding',
    notes: 'Awaiting first sample delivery.',
    orders: [],
    activity: [{ id: 'a1', date: '2026-11-17T09:00:00+03:00', text: 'Supplier invited.' }],
  },
  {
    id: 'SUP-206',
    name: 'Murang’a Fruit Hub',
    contact: 'Samuel Njoroge',
    phone: '+254 710 664 381',
    county: 'Murang’a',
    produce: 'Mangoes, passion fruit',
    paymentTerms: '14 days',
    status: 'Active',
    notes: '',
    orders: [
      {
        reference: 'PO-3297',
        date: '2026-11-16',
        produce: 'Mangoes · 600 kg',
        amount: 54000,
        status: 'Received',
      },
    ],
    activity: [{ id: 'a1', date: '2026-11-16T11:20:00+03:00', text: 'PO-3297 received.' }],
  },
]
