export type ApprovalRole = 'requester' | 'manager' | 'finance'
export type ApprovalStage = 'manager' | 'finance' | 'changes' | 'approved' | 'rejected'
export type StepState = 'done' | 'current' | 'upcoming' | 'rejected'
export type ReasonMode = 'reject' | 'changes'

export interface Person {
  name: string
  title: string
}

export interface HistoryEntry {
  id: number
  actor: Person
  action: string
  severity: 'success' | 'info' | 'warn' | 'danger' | 'secondary'
  at: string
  comment?: string
}

export const people: Record<ApprovalRole, Person> = {
  requester: { name: 'Wanjiru Kamau', title: 'Account manager' },
  manager: { name: 'James Otieno', title: 'Sales manager' },
  finance: { name: 'Grace Mutua', title: 'Finance controller' },
}

export const roleOptions = (Object.keys(people) as ApprovalRole[]).map((role) => ({
  label: people[role].title,
  value: role,
}))

export const request = {
  reference: 'CLR-2081',
  customer: 'Green Basket Kitchen',
  currentLimit: 100000,
  requestedLimit: 250000,
  outstanding: 60000,
  reason: 'Weekly orders have doubled since September. The current limit blocks Friday deliveries.',
}

export const stageStatus: Record<
  ApprovalStage,
  { label: string; severity: 'warn' | 'info' | 'success' | 'danger' }
> = {
  manager: { label: 'Awaiting manager', severity: 'warn' },
  finance: { label: 'Awaiting finance', severity: 'warn' },
  changes: { label: 'Changes requested', severity: 'info' },
  approved: { label: 'Approved', severity: 'success' },
  rejected: { label: 'Rejected', severity: 'danger' },
}

/** The role allowed to act at each stage; final stages have no approver. */
export const stageApprover: Record<ApprovalStage, ApprovalRole | null> = {
  manager: 'manager',
  finance: 'finance',
  changes: 'requester',
  approved: null,
  rejected: null,
}

export const reasonCopy: Record<
  ReasonMode,
  { header: string; label: string; help: string; submit: string; error: string }
> = {
  reject: {
    header: 'Reject request',
    label: 'Reason for rejection',
    help: 'Required. The requester sees this reason in the history.',
    submit: 'Reject request',
    error: 'Enter a reason of at least 10 characters.',
  },
  changes: {
    header: 'Request changes',
    label: 'What needs to change?',
    help: 'Required. Tell the requester what to update before resubmitting.',
    submit: 'Send back for changes',
    error: 'Describe the changes needed in at least 10 characters.',
  },
}

export function initialHistory(): HistoryEntry[] {
  return [
    {
      id: 1,
      actor: people.requester,
      action: 'Submitted request',
      severity: 'secondary',
      at: '2026-11-18T09:12:00+03:00',
      comment: request.reason,
    },
  ]
}
