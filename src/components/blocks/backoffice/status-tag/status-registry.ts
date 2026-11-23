import type { Component } from 'vue'

/**
 * One place that says how every backoffice status reads and looks.
 *
 * Severity meaning is the same in every domain:
 * - success: finished, healthy or approved
 * - info: in progress or neutral information
 * - warn: waiting on someone, or needs attention soon
 * - danger: failed, blocked, rejected or overdue
 * - secondary: inactive, ended or not applicable
 */
// PrimeVue's own Tag severities. `primary` is the Tag default (Kale), so it passes no severity prop.
export const STATUS_SEVERITIES = [
  'primary',
  'secondary',
  'success',
  'info',
  'warn',
  'danger',
  'contrast',
] as const
export type StatusSeverity = (typeof STATUS_SEVERITIES)[number]

export interface StatusDefinition {
  /** Sentence-case text. Always shown: status is never colour alone. */
  label: string
  severity: StatusSeverity
  /** One sentence that says what the state means. Shown in the reference. */
  meaning?: string
  /** Optional leading icon component, for example from @primeicons/vue. */
  icon?: Component
}

export type StatusMap = Record<string, StatusDefinition>

export interface StatusDomainNote {
  title: string
  /** One short line on what the domain covers. Shown under the domain name in the reference. */
  usage: string
}

export interface ResolvedStatus extends StatusDefinition {
  /** False when the value is not registered and the humanised fallback was used. */
  known: boolean
}

export const MISSING_STATUS_LABEL = '—'

/** Lower-case snake_case, so "In Progress", "in-progress" and "in_progress" are one status. */
export function normaliseStatus(value: unknown): string {
  return String(value ?? '')
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, '_')
}

/** "partially_received" becomes "Partially received". */
export function humaniseStatus(value: unknown): string {
  const words = normaliseStatus(value).replace(/_/g, ' ')
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : MISSING_STATUS_LABEL
}

const done = { severity: 'success' } as const

const builtIn = {
  order: {
    new: { label: 'New', severity: 'info', meaning: 'Placed and not yet reviewed.' },
    pending: { label: 'Pending', severity: 'warn', meaning: 'Waiting for confirmation.' },
    confirmed: { label: 'Confirmed', severity: 'info', meaning: 'Accepted and being prepared.' },
    dispatched: { label: 'Dispatched', severity: 'info', meaning: 'Left the warehouse.' },
    partially_delivered: {
      label: 'Partially delivered',
      severity: 'warn',
      meaning: 'Some lines delivered. The rest need follow-up.',
    },
    delivered: { label: 'Delivered', ...done, meaning: 'Received by the customer.' },
    completed: { label: 'Completed', ...done, meaning: 'Delivered, invoiced and closed.' },
    cancelled: { label: 'Cancelled', severity: 'danger', meaning: 'Stopped before delivery.' },
  },
  payment: {
    unpaid: { label: 'Unpaid', severity: 'warn', meaning: 'Invoiced and not yet due.' },
    pending: {
      label: 'Pending',
      severity: 'info',
      meaning: 'Awaiting M-Pesa or bank confirmation.',
    },
    partially_paid: {
      label: 'Partially paid',
      severity: 'warn',
      meaning: 'Part of the balance has been received.',
    },
    paid: { label: 'Paid', ...done, meaning: 'The full balance has been received.' },
    overdue: { label: 'Overdue', severity: 'danger', meaning: 'Unpaid after the due date.' },
    failed: {
      label: 'Failed',
      severity: 'danger',
      meaning: 'The payment attempt did not go through.',
    },
    refunded: {
      label: 'Refunded',
      severity: 'secondary',
      meaning: 'Money returned to the customer.',
    },
  },
  approval: {
    draft: { label: 'Draft', severity: 'secondary', meaning: 'Still being prepared by its owner.' },
    pending_approval: {
      label: 'Pending approval',
      severity: 'warn',
      meaning: 'Submitted and waiting for an approver.',
    },
    approved: { label: 'Approved', ...done, meaning: 'An approver accepted it.' },
    rejected: {
      label: 'Rejected',
      severity: 'danger',
      meaning: 'An approver sent it back with a reason.',
    },
    suspended: {
      label: 'Suspended',
      severity: 'danger',
      meaning: 'Blocked until someone reviews it.',
    },
    superseded: {
      label: 'Superseded',
      severity: 'secondary',
      meaning: 'Replaced by a newer record.',
    },
  },
  period: {
    open: { label: 'Open', ...done, meaning: 'Postings are allowed.' },
    closed: {
      label: 'Closed',
      severity: 'warn',
      meaning: 'Soft closed. Only users with override can post.',
    },
    hard_closed: {
      label: 'Hard closed',
      severity: 'danger',
      meaning: 'Nobody can post. Only an audited reopen changes it.',
    },
  },
  onboarding: {
    invited: {
      label: 'Invited',
      severity: 'info',
      meaning: 'Invitation sent and not yet accepted.',
    },
    pending: {
      label: 'Pending review',
      severity: 'info',
      meaning: 'Details submitted and waiting for review.',
    },
    active: { label: 'Active', ...done, meaning: 'Can trade with FTF.' },
    dormant: {
      label: 'Dormant',
      severity: 'warn',
      meaning: 'Active account with no recent activity.',
    },
    inactive: {
      label: 'Inactive',
      severity: 'secondary',
      meaning: 'Deactivated. Can be reactivated.',
    },
    suspended: {
      label: 'Suspended',
      severity: 'danger',
      meaning: 'Blocked from trading until reviewed.',
    },
    rejected: { label: 'Rejected', severity: 'danger', meaning: 'Did not pass onboarding review.' },
  },
  ticket: {
    open: {
      label: 'Open',
      severity: 'info',
      meaning: 'Raised and waiting for someone to pick it up.',
    },
    assigned: {
      label: 'Assigned',
      severity: 'info',
      meaning: 'Has an owner who has not started yet.',
    },
    in_progress: { label: 'In progress', severity: 'warn', meaning: 'Someone is working on it.' },
    waiting: {
      label: 'Waiting on reporter',
      severity: 'warn',
      meaning: 'Needs an answer from the person who raised it.',
    },
    reopened: {
      label: 'Reopened',
      severity: 'warn',
      meaning: 'The fix did not hold. Needs another look.',
    },
    resolved: {
      label: 'Resolved',
      ...done,
      meaning: 'Fix in place. The reporter can confirm or reopen.',
    },
    closed: {
      label: 'Closed',
      severity: 'secondary',
      meaning: 'Confirmed or timed out. No further action.',
    },
  },
  route: {
    draft: {
      label: 'Draft',
      severity: 'secondary',
      meaning: 'Being planned. Not visible to the driver.',
    },
    assigned: { label: 'Assigned', severity: 'info', meaning: 'Driver and vehicle chosen.' },
    scheduled: { label: 'Scheduled', severity: 'info', meaning: 'Published for a delivery date.' },
    in_progress: {
      label: 'In progress',
      severity: 'warn',
      meaning: 'The vehicle is out on the route now.',
    },
    completed: { label: 'Completed', ...done, meaning: 'All stops finished.' },
    exception: {
      label: 'Exception',
      severity: 'danger',
      meaning: 'A stop failed or the route needs dispatcher action.',
    },
    cancelled: {
      label: 'Cancelled',
      severity: 'danger',
      meaning: 'Called off. Stops return to the unscheduled pool.',
    },
  },
  fleet: {
    live: {
      label: 'Live',
      severity: 'success',
      meaning: 'Reporting its position right now.',
    },
    stale: { label: 'Stale', severity: 'warn', meaning: 'Last position is older than expected.' },
    offline: {
      label: 'Offline',
      severity: 'danger',
      meaning: 'Stopped reporting. Call the driver.',
    },
    no_signal: {
      label: 'No signal',
      severity: 'danger',
      meaning: 'Has never reported a position on this route.',
    },
  },
  compliance: {
    fully_compliant: {
      label: 'Compliant',
      ...done,
      meaning: 'Every line has a verified supporting document.',
    },
    partially_compliant: {
      label: 'Partly compliant',
      severity: 'warn',
      meaning: 'Some lines are missing documents.',
    },
    not_compliant: {
      label: 'Not compliant',
      severity: 'danger',
      meaning: 'No line has a verified document.',
    },
    verification_required: {
      label: 'Verification required',
      severity: 'warn',
      meaning: 'A document is uploaded and needs checking.',
    },
    not_applicable: {
      label: 'Not applicable',
      severity: 'secondary',
      meaning: 'No compliance rule applies.',
    },
  },
  expiry: {
    valid: { label: 'Valid', ...done, meaning: 'Not expiring soon.' },
    expiring_soon: {
      label: 'Expiring soon',
      severity: 'warn',
      meaning: 'Expires within the renewal window.',
    },
    expired: { label: 'Expired', severity: 'danger', meaning: 'Past its expiry date.' },
  },
  promotion: {
    hidden: {
      label: 'Hidden',
      severity: 'secondary',
      meaning: 'Switched off. Customers cannot see or buy it.',
    },
    scheduled: { label: 'Scheduled', severity: 'info', meaning: 'Starts in the future.' },
    active: { label: 'On sale', ...done, meaning: 'Inside its start and end window.' },
    ended: { label: 'Ended', severity: 'secondary', meaning: 'Its end date has passed.' },
  },
  sync: {
    pending: { label: 'Pending', severity: 'info', meaning: 'Queued to send.' },
    processing: { label: 'Processing', severity: 'info', meaning: 'Being sent now.' },
    synced: { label: 'Synced', ...done, meaning: 'The other system accepted it.' },
    failed: {
      label: 'Failed',
      severity: 'danger',
      meaning: 'The other system rejected it. Retry or fix the data.',
    },
  },
  ussd: {
    pending: {
      label: 'Pending',
      severity: 'warn',
      meaning: 'Farmer request waiting for a call-back.',
    },
    closed: { label: 'Closed', severity: 'secondary', meaning: 'Handled. No action left.' },
  },
} satisfies Record<string, StatusMap>

export type BuiltInStatusDomain = keyof typeof builtIn
/** Built-in names autocomplete, and teams can still register their own. */
export type StatusDomainName = BuiltInStatusDomain | (string & {})

/** What each built-in domain covers and when its tags belong on screen. */
export const statusDomainNotes: Record<string, StatusDomainNote> = {
  order: { title: 'Order', usage: 'Fulfilment from placed to delivered. Pair with payment.' },
  payment: {
    title: 'Payment',
    usage: 'Whether an invoice has been paid. Overdue needs a due date.',
  },
  approval: { title: 'Approval', usage: 'Anything that waits for an approver.' },
  period: { title: 'Accounting period', usage: 'Month-end state. Danger means locked.' },
  onboarding: {
    title: 'Supplier and farmer accounts',
    usage: 'Supplier, farmer, driver or vehicle, from invitation to suspension.',
  },
  ticket: {
    title: 'Support ticket',
    usage: 'Where a ticket is in its life.',
  },
  route: { title: 'Route', usage: 'Planned delivery routes. Only a route out now is live.' },
  fleet: { title: 'Fleet tracking', usage: 'Whether a vehicle is reporting its position.' },
  compliance: {
    title: 'Document compliance',
    usage: 'Whether documents cover an order, such as eTIMS.',
  },
  expiry: {
    title: 'Document expiry',
    usage: 'Licences, certificates and agreements with an expiry date.',
  },
  promotion: {
    title: 'Promotion window',
    usage: 'Bundles and offers. Derive it with promotionStatus.',
  },
  sync: { title: 'Integration sync', usage: 'Records sent to QuickBooks, eTIMS or TrackPod.' },
  ussd: { title: 'USSD request', usage: 'Farmer requests made over USSD.' },
}

function normaliseMap(statuses: StatusMap): StatusMap {
  return Object.fromEntries(
    Object.entries(statuses).map(([status, definition]) => [normaliseStatus(status), definition]),
  )
}

/** Domain to status to definition. Register your own with defineStatuses. */
export const statusRegistry: Record<string, StatusMap> = Object.fromEntries(
  Object.entries(builtIn).map(([domain, statuses]) => [domain, statuses as StatusMap]),
)

/** The domains shipped with the design system, in display order. */
export const builtInStatusDomains = Object.keys(builtIn) as BuiltInStatusDomain[]

/**
 * Register or extend a domain in one place, then render it with StatusTagBlock.
 * Statuses you pass replace built-ins with the same key and the rest are kept.
 */
export function defineStatuses<T extends StatusMap>(
  domain: string,
  statuses: T,
  note?: StatusDomainNote,
): T {
  const key = normaliseStatus(domain)
  statusRegistry[key] = { ...statusRegistry[key], ...normaliseMap(statuses) }
  if (note) statusDomainNotes[key] = note
  return statuses
}

/**
 * Look up how a status reads and looks. Never throws: unknown values become
 * a humanised label with the secondary severity so a new API value still shows up.
 */
export function resolveStatus(domain: string, status: unknown): ResolvedStatus {
  const definition = statusRegistry[normaliseStatus(domain)]?.[normaliseStatus(status)]
  if (definition?.label) return { ...definition, known: true }
  return { label: humaniseStatus(status), severity: 'secondary', known: false }
}

export type WindowStatus = 'scheduled' | 'active' | 'ended'
type WindowDate = Date | string | number | null | undefined

function timeOf(value: WindowDate): number | null {
  if (value === null || value === undefined || value === '') return null
  const time = value instanceof Date ? value.getTime() : new Date(value).getTime()
  return Number.isNaN(time) ? null : time
}

/**
 * Status of a start and end window at a moment in time.
 * The start is inclusive and the end is exclusive. A missing or invalid date means that side
 * is open, so a window with no dates is always active. Pass ISO strings with an offset
 * (for example 2026-12-01T00:00:00+03:00) so Nairobi midnight is not read as UTC.
 */
export function windowStatus(
  start: WindowDate,
  end: WindowDate,
  now: Date | number = new Date(),
): WindowStatus {
  const current = typeof now === 'number' ? now : now.getTime()
  const from = timeOf(start)
  const until = timeOf(end)
  if (until !== null && until <= current) return 'ended'
  if (from !== null && from > current) return 'scheduled'
  return 'active'
}

/** Key in the promotion domain: switched-off bundles are hidden whatever their dates say. */
export function promotionStatus(
  promotion: { isActive?: boolean; startsAt?: WindowDate; endsAt?: WindowDate },
  now: Date | number = new Date(),
): 'hidden' | WindowStatus {
  if (promotion.isActive === false) return 'hidden'
  return windowStatus(promotion.startsAt, promotion.endsAt, now)
}
