import { DISPLAY_LOCALE, formatApiDate, formatDate } from '@/utils/format'

export type ActivityType = 'status' | 'edit' | 'comment' | 'system'

export interface FieldChange {
  field: string
  before: string
  after: string
}

export interface ActivityEntry {
  id: string
  type: ActivityType
  actor: string
  action: string
  record: string
  at: string
  changes?: FieldChange[]
  comment?: string
}

export const activityTypes: { label: string; value: ActivityType }[] = [
  { label: 'Status change', value: 'status' },
  { label: 'Edit', value: 'edit' },
  { label: 'Comment', value: 'comment' },
  { label: 'System', value: 'system' },
]

export const typeLabel = Object.fromEntries(
  activityTypes.map(({ label, value }) => [value, label]),
) as Record<ActivityType, string>

export const typeSeverity: Record<ActivityType, 'info' | 'warn' | 'secondary' | 'contrast'> = {
  status: 'info',
  edit: 'warn',
  comment: 'secondary',
  system: 'contrast',
}

type Seed = Omit<ActivityEntry, 'id' | 'at'> & { minutesAgo: number }

const seeds: Seed[] = [
  {
    minutesAgo: 6,
    type: 'status',
    actor: 'Amina Hassan',
    action: 'marked as delivered',
    record: 'Order FTF-1042',
    changes: [{ field: 'Status', before: 'Out for delivery', after: 'Delivered' }],
  },
  {
    minutesAgo: 25,
    type: 'comment',
    actor: 'Brian Otieno',
    action: 'commented on',
    record: 'Order FTF-1043',
    comment: 'Customer asked for the tomatoes in two crates rather than one.',
  },
  {
    minutesAgo: 48,
    type: 'edit',
    actor: 'Grace Wanjiku',
    action: 'edited',
    record: 'Order FTF-1043',
    changes: [
      { field: 'Tomatoes quantity', before: '10 crates', after: '12 crates' },
      { field: 'Delivery window', before: '08:00–10:00', after: '10:00–12:00' },
    ],
  },
  {
    minutesAgo: 95,
    type: 'system',
    actor: 'System',
    action: 'sent the payment reminder for',
    record: 'Invoice INV-3307',
  },
  {
    minutesAgo: 140,
    type: 'status',
    actor: 'Brian Otieno',
    action: 'dispatched',
    record: 'Order FTF-1042',
    changes: [{ field: 'Status', before: 'Packed', after: 'Out for delivery' }],
  },
  {
    minutesAgo: 210,
    type: 'edit',
    actor: 'Amina Hassan',
    action: 'updated',
    record: 'Customer Green Basket Kitchen',
    changes: [{ field: 'Credit limit', before: 'KES 100,000', after: 'KES 250,000' }],
  },
  {
    minutesAgo: 320,
    type: 'system',
    actor: 'System',
    action: 'synced stock levels for',
    record: 'Kiambu Fresh Growers',
  },
  {
    minutesAgo: 60 * 24 + 30,
    type: 'comment',
    actor: 'Grace Wanjiku',
    action: 'commented on',
    record: 'Invoice INV-3307',
    comment: 'Payment promised by Friday. Hold further reminders until then.',
  },
  {
    minutesAgo: 60 * 24 + 90,
    type: 'status',
    actor: 'Grace Wanjiku',
    action: 'approved',
    record: 'Purchase request PR-5521',
    changes: [{ field: 'Status', before: 'Awaiting finance', after: 'Approved' }],
  },
  {
    minutesAgo: 60 * 24 + 160,
    type: 'edit',
    actor: 'Brian Otieno',
    action: 'edited',
    record: 'Supplier Meru Avocado Co-op',
    changes: [{ field: 'M-Pesa number', before: '0712 •• 678', after: '0722 •• 104' }],
  },
  {
    minutesAgo: 60 * 24 + 260,
    type: 'system',
    actor: 'System',
    action: 'generated',
    record: 'Invoice INV-3311',
  },
  {
    minutesAgo: 60 * 24 + 400,
    type: 'status',
    actor: 'Amina Hassan',
    action: 'confirmed',
    record: 'Order FTF-1046',
    changes: [{ field: 'Status', before: 'Pending', after: 'Confirmed' }],
  },
  {
    minutesAgo: 60 * 48 + 20,
    type: 'edit',
    actor: 'Grace Wanjiku',
    action: 'edited',
    record: 'Product Red onions',
    changes: [{ field: 'Price per 10 kg bag', before: 'KES 1,050', after: 'KES 1,100' }],
  },
  {
    minutesAgo: 60 * 48 + 75,
    type: 'comment',
    actor: 'Amina Hassan',
    action: 'commented on',
    record: 'Order FTF-1046',
    comment: 'Kitchen entrance is on Muthithi Road; driver should call on arrival.',
  },
  {
    minutesAgo: 60 * 48 + 180,
    type: 'status',
    actor: 'Brian Otieno',
    action: 'cancelled',
    record: 'Order FTF-1039',
    changes: [{ field: 'Status', before: 'Pending', after: 'Cancelled' }],
  },
  {
    minutesAgo: 60 * 48 + 300,
    type: 'system',
    actor: 'System',
    action: 'closed the delivery route for',
    record: 'Westlands run 3',
  },
  {
    minutesAgo: 60 * 72 + 40,
    type: 'edit',
    actor: 'Amina Hassan',
    action: 'edited',
    record: 'Customer Harvest Kitchen',
    changes: [{ field: 'Payment terms', before: '7 days', after: '14 days' }],
  },
  {
    minutesAgo: 60 * 72 + 120,
    type: 'status',
    actor: 'Grace Wanjiku',
    action: 'rejected',
    record: 'Purchase request PR-5518',
    changes: [{ field: 'Status', before: 'Awaiting finance', after: 'Rejected' }],
  },
  {
    minutesAgo: 60 * 72 + 210,
    type: 'comment',
    actor: 'Brian Otieno',
    action: 'commented on',
    record: 'Supplier Kiambu Fresh Growers',
    comment: 'Visited the farm; irrigation is in place for the dry season.',
  },
  {
    minutesAgo: 60 * 72 + 330,
    type: 'system',
    actor: 'System',
    action: 'imported 42 price updates for',
    record: 'Produce catalogue',
  },
]

/** Builds sample entries relative to `now` so relative times stay meaningful. */
export function createActivity(now: Date): ActivityEntry[] {
  return seeds.map(({ minutesAgo, ...entry }, index) => ({
    ...entry,
    id: `ACT-${String(index + 1).padStart(4, '0')}`,
    at: new Date(now.getTime() - minutesAgo * 60_000).toISOString(),
  }))
}

export const actors = [...new Set(seeds.map(({ actor }) => actor))].sort()

const relative = new Intl.RelativeTimeFormat(DISPLAY_LOCALE, { numeric: 'auto' })

export function formatRelative(value: string, now: Date) {
  const seconds = Math.round((new Date(value).getTime() - now.getTime()) / 1000)
  const abs = Math.abs(seconds)
  if (abs < 60) return 'just now'
  if (abs < 3600) return relative.format(Math.round(seconds / 60), 'minute')
  if (abs < 86400) return relative.format(Math.round(seconds / 3600), 'hour')
  return relative.format(Math.round(seconds / 86400), 'day')
}

export function dayLabel(value: string, now: Date) {
  const day = formatApiDate(value)
  if (day === formatApiDate(now)) return 'Today'
  if (day === formatApiDate(now.getTime() - 86_400_000)) return 'Yesterday'
  return formatDate(value)
}

export function groupByDay(entries: ActivityEntry[], now: Date) {
  const groups: { key: string; label: string; entries: ActivityEntry[] }[] = []
  for (const entry of entries) {
    const key = formatApiDate(entry.at)
    const group = groups[groups.length - 1]
    if (group?.key === key) group.entries.push(entry)
    else groups.push({ key, label: dayLabel(entry.at, now), entries: [entry] })
  }
  return groups
}

export function describeChanges(changes: FieldChange[] = []) {
  return changes.map(({ field, before, after }) => `${field}: ${before} → ${after}`).join('; ')
}
