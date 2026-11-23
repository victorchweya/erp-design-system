import { produce, type ProduceItem } from './order-entry'

/**
 * Rules for receiving reconciliation, one line at a time.
 *
 * - Received is what arrived. Rejected is the part of it that was refused.
 * - Accepted = Received − Rejected.
 * - A rejection needs a reason.
 * - More than the ordered quantity cannot be received here. The backoffice allows up to 10% extra
 *   through a separate excess flow (new order or donation); this check blocks it instead.
 */
export interface ReconciliationLine extends Pick<ProduceItem, 'id' | 'name' | 'pack'> {
  ordered: number
  /** Packs that arrived. `null` means not counted yet. */
  received: number | null
  /** Packs refused out of those received. `null` counts as 0. */
  rejected: number | null
  reason: string | null
}

export type ReconciliationField = 'received' | 'rejected' | 'reason'

export interface ReconciliationIssue {
  lineId: string
  field: ReconciliationField
  /** Short text for the field, e.g. “More than the 12 ordered.” */
  message: string
  /** Same text with the product name, for a list of everything that blocks saving. */
  problem: string
}

export interface ReconciliationResult {
  id: string
  ordered: number
  received: number
  rejected: number
  accepted: number
  reason: string | null
}

export const rejectionReasons = [
  { value: 'damaged', label: 'Damaged' },
  { value: 'short-weight', label: 'Short weight' },
  { value: 'wrong-grade', label: 'Wrong grade' },
  { value: 'quality', label: 'Quality' },
  { value: 'other', label: 'Other' },
]

const count = (value: number | null) => (value !== null && Number.isFinite(value) ? value : 0)

export function acceptedQuantity(line: Pick<ReconciliationLine, 'received' | 'rejected'>) {
  return Math.max(0, count(line.received) - count(line.rejected))
}

export function validateLine(line: ReconciliationLine): ReconciliationIssue[] {
  const issues: ReconciliationIssue[] = []
  const add = (field: ReconciliationField, message: string) =>
    issues.push({ lineId: line.id, field, message, problem: `${line.name}: ${message}` })
  const received = line.received
  const rejected = count(line.rejected)
  if (received === null || !Number.isFinite(received) || received < 0) {
    add('received', 'Enter how many arrived, or 0.')
  } else if (received > line.ordered) {
    add('received', `More than the ${line.ordered} ordered.`)
  }
  if (rejected < 0) add('rejected', 'Cannot be negative.')
  else if (received !== null && rejected > received) add('rejected', `More than the ${received} received.`)
  if (rejected > 0 && !line.reason) add('reason', 'Choose why it was rejected.')
  return issues
}

/** Every problem that blocks saving, in table order. */
export function reconciliationProblems(lines: ReconciliationLine[]) {
  return lines.flatMap(validateLine)
}

export function canSave(lines: ReconciliationLine[]) {
  return lines.length > 0 && reconciliationProblems(lines).length === 0
}

export function reconciliationTotals(lines: ReconciliationLine[]) {
  return lines.reduce(
    (total, line) => ({
      ordered: total.ordered + line.ordered,
      received: total.received + count(line.received),
      rejected: total.rejected + count(line.rejected),
      accepted: total.accepted + acceptedQuantity(line),
    }),
    { ordered: 0, received: 0, rejected: 0, accepted: 0 },
  )
}

/** The saved record: a reason is kept only for lines that have a rejection. */
export function reconciliationResults(lines: ReconciliationLine[]): ReconciliationResult[] {
  return lines.map((line) => {
    const rejected = count(line.rejected)
    return {
      id: line.id,
      ordered: line.ordered,
      received: count(line.received),
      rejected,
      accepted: acceptedQuantity(line),
      reason: rejected > 0 ? line.reason : null,
    }
  })
}

export function sampleReconciliation(): ReconciliationLine[] {
  const lines: Array<[number, number, number | null, number | null, string | null]> = [
    [0, 12, 12, 0, null],
    [1, 10, 10, 2, 'damaged'],
    [2, 8, 7, 0, null],
    [3, 6, 6, 2, null],
    [4, 4, null, null, null],
  ]
  return lines.map(([index, ordered, received, rejected, reason]) => {
    const { id, name, pack } = produce[index]!
    return { id, name, pack, ordered, received, rejected, reason }
  })
}
