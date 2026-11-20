import type { FormResolverOptions } from '@primevue/forms'
import { formatNumber } from '@/utils/format'

export type StepValue = 'details' | 'produce' | 'payout' | 'review'
type Errors = Record<string, { message: string }[]>

export interface FarmDetails {
  farmName: string
  contactName: string
  phone: string
  county: string | null
  email: string
}

export interface ProduceCapacity {
  produce: string[]
  weeklyCapacityKg: number | null
  supplyPattern: string | null
}

export interface PayoutDetails {
  method: 'mpesa' | 'bank'
  mpesaNumber: string
  bankName: string | null
  accountName: string
  accountNumber: string
}

export interface SupplierDraft {
  details: FarmDetails
  produce: ProduceCapacity
  payout: PayoutDetails
}

export const steps: { value: StepValue; title: string; description: string }[] = [
  { value: 'details', title: 'Farm details', description: 'Who we contact and where the farm is.' },
  {
    value: 'produce',
    title: 'Produce and capacity',
    description: 'What the farm grows and how much it can supply each week.',
  },
  {
    value: 'payout',
    title: 'Payout details',
    description: 'Where FTF sends payment for delivered produce.',
  },
  {
    value: 'review',
    title: 'Review and submit',
    description: 'Check the details before sending them for verification.',
  },
]

export const counties = [
  'Kiambu',
  'Kirinyaga',
  'Machakos',
  'Meru',
  "Murang'a",
  'Nakuru',
  'Nyandarua',
  'Nyeri',
]
export const produceOptions = [
  'Avocados',
  'Cabbage',
  'Carrots',
  'Kale (sukuma wiki)',
  'Potatoes',
  'Red onions',
  'Spinach',
  'Tomatoes',
]
export const supplyPatterns = ['Year-round', 'Seasonal', 'Irrigated, year-round']
export const banks = [
  'Absa Kenya',
  'Co-operative Bank',
  'Equity Bank',
  'Family Bank',
  'KCB Bank',
  'NCBA',
]

export function emptyDraft(): SupplierDraft {
  return {
    details: { farmName: '', contactName: '', phone: '', county: null, email: '' },
    produce: { produce: [], weeklyCapacityKg: null, supplyPattern: null },
    payout: {
      method: 'mpesa',
      mpesaNumber: '',
      bankName: null,
      accountName: '',
      accountNumber: '',
    },
  }
}

const text = (value: unknown) => (typeof value === 'string' ? value.trim() : '')
const compact = (value: string) => value.replace(/[\s-]/g, '')
const kenyanMobile = /^(?:\+254|254|0)(?:7|1)\d{8}$/

export function resolveDetails({ values }: FormResolverOptions) {
  const next: FarmDetails = {
    farmName: text(values.farmName),
    contactName: text(values.contactName),
    phone: compact(text(values.phone)),
    county: typeof values.county === 'string' ? values.county : null,
    email: text(values.email),
  }
  const errors: Errors = {}
  if (!next.farmName) errors.farmName = [{ message: 'Enter the farm or business name.' }]
  if (!next.contactName) errors.contactName = [{ message: 'Enter the contact person’s name.' }]
  if (!kenyanMobile.test(next.phone))
    errors.phone = [{ message: 'Enter a Kenyan mobile number, for example 0712 345 678.' }]
  if (!next.county) errors.county = [{ message: 'Choose the county where the farm is.' }]
  if (next.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(next.email))
    errors.email = [{ message: 'Enter a valid email address or leave it blank.' }]
  return { values: next, errors }
}

export function resolveProduce({ values }: FormResolverOptions) {
  const next: ProduceCapacity = {
    produce: Array.isArray(values.produce) ? values.produce : [],
    weeklyCapacityKg: typeof values.weeklyCapacityKg === 'number' ? values.weeklyCapacityKg : null,
    supplyPattern: typeof values.supplyPattern === 'string' ? values.supplyPattern : null,
  }
  const errors: Errors = {}
  if (!next.produce.length) errors.produce = [{ message: 'Choose at least one product.' }]
  if (next.weeklyCapacityKg === null || next.weeklyCapacityKg < 100)
    errors.weeklyCapacityKg = [{ message: 'Enter a weekly capacity of at least 100 kg.' }]
  if (!next.supplyPattern) errors.supplyPattern = [{ message: 'Choose when the farm can supply.' }]
  return { values: next, errors }
}

export function resolvePayout({ values }: FormResolverOptions) {
  const next: PayoutDetails = {
    method: values.method === 'bank' ? 'bank' : 'mpesa',
    mpesaNumber: compact(text(values.mpesaNumber)),
    bankName: typeof values.bankName === 'string' ? values.bankName : null,
    accountName: text(values.accountName),
    accountNumber: compact(text(values.accountNumber)),
  }
  const errors: Errors = {}
  if (next.method === 'mpesa' && !kenyanMobile.test(next.mpesaNumber))
    errors.mpesaNumber = [{ message: 'Enter the M-Pesa number, for example 0712 345 678.' }]
  if (next.method === 'bank') {
    if (!next.bankName) errors.bankName = [{ message: 'Choose the bank.' }]
    if (!next.accountName) errors.accountName = [{ message: 'Enter the name on the account.' }]
    if (!/^\d{8,16}$/.test(next.accountNumber))
      errors.accountNumber = [{ message: 'Enter an account number of 8 to 16 digits.' }]
  }
  return { values: next, errors }
}

/** Moves focus to the first invalid control after a failed submit. */
export function focusFirstInvalid(event: Event) {
  const form = event.target instanceof HTMLFormElement ? event.target : null
  const focusable = 'input, textarea, [tabindex]:not([tabindex="-1"])'
  requestAnimationFrame(() => {
    const invalid = form?.querySelector<HTMLElement>('.p-invalid, [aria-invalid="true"]')
    const target = invalid?.matches(focusable)
      ? invalid
      : invalid?.querySelector<HTMLElement>(focusable)
    target?.focus()
  })
}

export function maskAccount(value: string) {
  return value.length > 4 ? `•••• ${value.slice(-4)}` : value
}

export function summarise(draft: SupplierDraft) {
  const { details, produce, payout } = draft
  return [
    {
      step: 'details' as StepValue,
      title: 'Farm details',
      rows: [
        ['Farm name', details.farmName],
        ['Contact', details.contactName],
        ['Phone', details.phone],
        ['County', details.county ?? ''],
        ['Email', details.email || 'Not provided'],
      ],
    },
    {
      step: 'produce' as StepValue,
      title: 'Produce and capacity',
      rows: [
        ['Produce', produce.produce.join(', ')],
        ['Weekly capacity', `${formatNumber(produce.weeklyCapacityKg)} kg`],
        ['Supply', produce.supplyPattern ?? ''],
      ],
    },
    {
      step: 'payout' as StepValue,
      title: 'Payout details',
      rows:
        payout.method === 'mpesa'
          ? [
              ['Method', 'M-Pesa'],
              ['M-Pesa number', payout.mpesaNumber],
            ]
          : [
              ['Method', 'Bank transfer'],
              ['Bank', payout.bankName ?? ''],
              ['Account name', payout.accountName],
              ['Account number', maskAccount(payout.accountNumber)],
            ],
    },
  ]
}
