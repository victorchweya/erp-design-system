import { formatCurrency } from '@/utils/format'

/** An invoice that still has a balance to pay. Amounts are in Ksh. */
export interface OpenInvoice {
  id: string
  /** The invoice number shown to people, for example INV-2041. */
  number: string
  /** Date only, in YYYY-MM-DD form. Invoices without a due date are allocated last. */
  dueDate: string | null
  /** What is still owed on the invoice. */
  balance: number
}

/** Invoice id to the amount allocated, in Ksh. Invoices with nothing allocated are left out. */
export type Allocations = Record<string, number>

export interface AllocationCheck {
  /** Total of all open balances. */
  outstanding: number
  allocated: number
  /** Payment minus allocated, never below zero. */
  remainder: number
  /** How far the allocations are over the payment, or 0. */
  overBy: number
  /** What will be stored as customer credit when saved. */
  creditAmount: number
  /** Errors for single invoices, by invoice id. */
  rowErrors: Record<string, string>
  /** Problems that block saving and are about the whole payment. */
  problems: string[]
  /** One sentence saying why saving is not possible yet. Empty when it is. */
  blockedReason: string
  canSave: boolean
}

// Money is added up in cents so that decimal drift (0.1 + 0.2) can never block a balanced payment.
export const toCents = (value: number | null | undefined) => Math.round(Number(value ?? 0) * 100)
const fromCents = (cents: number) => cents / 100

/** Oldest due date first. Invoices without a due date go last, in their given order. */
export function sortOldestDueFirst(invoices: OpenInvoice[]) {
  return invoices
    .map((invoice, index) => ({ invoice, index }))
    .sort((a, b) => {
      const aDue = a.invoice.dueDate
      const bDue = b.invoice.dueDate
      if (aDue && bDue && aDue !== bDue) return aDue < bDue ? -1 : 1
      if (aDue && !bDue) return -1
      if (!aDue && bDue) return 1
      return a.index - b.index
    })
    .map(({ invoice }) => invoice)
}

/** Fills invoices from the oldest due date until the payment runs out. Never exceeds a balance. */
export function autoAllocate(invoices: OpenInvoice[], payment: number): Allocations {
  let remaining = toCents(payment)
  const next: Allocations = {}
  for (const invoice of sortOldestDueFirst(invoices)) {
    const allocated = Math.min(toCents(invoice.balance), remaining)
    if (allocated <= 0) continue
    next[invoice.id] = fromCents(allocated)
    remaining -= allocated
  }
  return next
}

export const clearAllocations = (): Allocations => ({})

/** Sets one invoice's amount. An empty, zero or negative amount removes it. */
export function setAllocation(
  allocations: Allocations,
  invoiceId: string,
  amount: number | null | undefined,
): Allocations {
  const { [invoiceId]: _removed, ...rest } = allocations
  const cents = toCents(amount)
  return cents > 0 ? { ...rest, [invoiceId]: fromCents(cents) } : rest
}

export const totalAllocated = (allocations: Allocations) =>
  fromCents(Object.values(allocations).reduce((sum, amount) => sum + toCents(amount), 0))

/**
 * The rules for booking one payment against open invoices:
 * - no invoice may be allocated more than its balance;
 * - the allocations may not add up to more than the payment;
 * - while the payment is no more than what is owed, all of it must be allocated;
 * - when the payment is more than what is owed, what is left over becomes customer credit;
 * - leaving the payment unapplied stores all of it as customer credit and ignores allocations.
 */
export function validateAllocation(
  invoices: OpenInvoice[],
  allocations: Allocations,
  payment: number,
  options: { leaveUnapplied?: boolean } = {},
): AllocationCheck {
  const paymentCents = toCents(payment)
  const outstandingCents = invoices.reduce((sum, invoice) => sum + toCents(invoice.balance), 0)

  if (options.leaveUnapplied) {
    const canSave = paymentCents > 0
    return {
      outstanding: fromCents(outstandingCents),
      allocated: 0,
      remainder: 0,
      overBy: 0,
      creditAmount: canSave ? fromCents(paymentCents) : 0,
      rowErrors: {},
      problems: [],
      blockedReason: canSave ? '' : 'Enter a payment amount to save.',
      canSave,
    }
  }

  const rowErrors: Record<string, string> = {}
  let allocatedCents = 0
  for (const invoice of invoices) {
    const cents = toCents(allocations[invoice.id])
    allocatedCents += cents
    if (cents > toCents(invoice.balance)) {
      rowErrors[invoice.id] =
        `Allocate at most ${formatCurrency(invoice.balance)}, the balance on ${invoice.number}.`
    }
  }

  const overCents = Math.max(allocatedCents - paymentCents, 0)
  const remainderCents = Math.max(paymentCents - allocatedCents, 0)
  const coversEverything = paymentCents > outstandingCents
  // Only a payment larger than everything owed may keep a remainder, and it becomes credit.
  const creditCents = coversEverything && overCents === 0 ? remainderCents : 0

  const problems: string[] = []
  if (overCents > 0) {
    problems.push(
      `Allocated ${formatCurrency(fromCents(allocatedCents))} is ${formatCurrency(fromCents(overCents))} more than the payment of ${formatCurrency(payment)}. Reduce the allocations to continue.`,
    )
  }

  let blockedReason = ''
  if (paymentCents <= 0) blockedReason = 'Enter a payment amount to save.'
  else if (overCents > 0) blockedReason = 'Reduce the allocations until they fit the payment.'
  else if (Object.keys(rowErrors).length > 0)
    blockedReason = 'Fix the invoice amounts that are more than their balance.'
  else if (remainderCents > 0 && !coversEverything)
    blockedReason = `Allocate the remaining ${formatCurrency(fromCents(remainderCents))} to save.`

  return {
    outstanding: fromCents(outstandingCents),
    allocated: fromCents(allocatedCents),
    remainder: fromCents(remainderCents),
    overBy: fromCents(overCents),
    creditAmount: fromCents(creditCents),
    rowErrors,
    problems,
    blockedReason,
    canSave: blockedReason === '',
  }
}

/** What the block emits when the person saves. */
export interface AllocationSave {
  /** Invoices that receive money, in the order given. Empty when the payment is left unapplied. */
  allocations: { invoiceId: string; invoiceNumber: string; amount: number }[]
  /** Stored as customer credit. 0 when everything is allocated. */
  creditAmount: number
}

export function buildSave(
  invoices: OpenInvoice[],
  allocations: Allocations,
  check: AllocationCheck,
  leaveUnapplied: boolean,
): AllocationSave {
  return {
    allocations: leaveUnapplied
      ? []
      : invoices
          .filter((invoice) => toCents(allocations[invoice.id]) > 0)
          .map((invoice) => ({
            invoiceId: invoice.id,
            invoiceNumber: invoice.number,
            amount: fromCents(toCents(allocations[invoice.id])),
          })),
    creditAmount: check.creditAmount,
  }
}
