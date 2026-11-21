import { DISPLAY_PLACEHOLDER, formatCurrency, formatNumber } from '@/utils/format'

export type Region = 'Nairobi' | 'Mombasa' | 'Nakuru' | 'Kisumu'
export type Channel = 'Sales rep' | 'E-commerce' | 'Ask Sprout'
export type OrderStatus = 'Delivered' | 'Out for delivery' | 'Pending' | 'Cancelled'

export interface RecentOrder {
  reference: string
  customer: string
  region: Region
  channel: Channel
  date: string
  amount: number
  status: OrderStatus
}

export interface DashboardAlert {
  id: string
  severity: 'error' | 'warn' | 'info'
  title: string
  detail: string
}

export interface DashboardTask {
  id: string
  label: string
  due: string
  done: boolean
}

export const regions: Region[] = ['Nairobi', 'Mombasa', 'Nakuru', 'Kisumu']
export const channels: Channel[] = ['Sales rep', 'E-commerce', 'Ask Sprout']

export const orderSeverity: Record<OrderStatus, 'success' | 'info' | 'warn' | 'danger'> = {
  Delivered: 'success',
  'Out for delivery': 'info',
  Pending: 'warn',
  Cancelled: 'danger',
}

type OrderRow = [string, string, Region, Channel, string, number, OrderStatus]

// One sample dataset feeds the KPIs, both charts, and the recent orders table.
const orderRows: OrderRow[] = [
  ['FTF-1061', 'Green Basket', 'Nairobi', 'Sales rep', '2026-11-20', 48250, 'Out for delivery'],
  ['FTF-1060', 'Coast Kitchen', 'Mombasa', 'E-commerce', '2026-11-20', 21400, 'Pending'],
  ['FTF-1059', 'Harvest Kitchen', 'Nairobi', 'Ask Sprout', '2026-11-19', 15600, 'Delivered'],
  ['FTF-1058', 'Lakeside Grocers', 'Kisumu', 'Sales rep', '2026-11-19', 33900, 'Delivered'],
  ['FTF-1057', 'Rift Fresh Mart', 'Nakuru', 'E-commerce', '2026-11-18', 9800, 'Cancelled'],
  ['FTF-1056', 'Market Table', 'Nairobi', 'E-commerce', '2026-11-17', 27150, 'Delivered'],
  ['FTF-1055', 'Naivasha Deli', 'Nakuru', 'Ask Sprout', '2026-11-16', 18450, 'Delivered'],
  ['FTF-1054', 'Green Basket', 'Nairobi', 'E-commerce', '2026-11-16', 22700, 'Delivered'],
  ['FTF-1053', 'Nyali Bistro', 'Mombasa', 'Sales rep', '2026-11-15', 41300, 'Delivered'],
  ['FTF-1052', 'Kisumu Fresh', 'Kisumu', 'Ask Sprout', '2026-11-14', 12300, 'Delivered'],
  ['FTF-1051', 'Harvest Kitchen', 'Nairobi', 'Sales rep', '2026-11-14', 36800, 'Delivered'],
  ['FTF-1050', 'Coast Kitchen', 'Mombasa', 'Sales rep', '2026-11-13', 29500, 'Delivered'],
  ['FTF-1049', 'Market Table', 'Nairobi', 'Ask Sprout', '2026-11-12', 14200, 'Cancelled'],
  ['FTF-1048', 'Lakeside Grocers', 'Kisumu', 'E-commerce', '2026-11-11', 19900, 'Delivered'],
  ['FTF-1047', 'Rift Fresh Mart', 'Nakuru', 'Sales rep', '2026-11-10', 31250, 'Delivered'],
  ['FTF-1046', 'Nyali Bistro', 'Mombasa', 'Ask Sprout', '2026-11-09', 16800, 'Delivered'],
  ['FTF-1045', 'Green Basket', 'Nairobi', 'Sales rep', '2026-11-08', 44100, 'Delivered'],
  ['FTF-1044', 'Naivasha Deli', 'Nakuru', 'E-commerce', '2026-11-07', 11600, 'Delivered'],
]

export const recentOrders: RecentOrder[] = orderRows.map(
  ([reference, customer, region, channel, date, amount, status]) => ({
    reference,
    customer,
    region,
    channel,
    date,
    amount,
    status,
  }),
)

export interface DashboardFilters {
  /** Inclusive `YYYY-MM-DD` bounds; null means unbounded. */
  from: string | null
  to: string | null
  region: Region | null
  channel: Channel | null
}

export interface DashboardKpi {
  label: string
  value: string
  detail: string
  markerClass: string
}

export interface ChartSeries {
  label: string
  values: number[]
}

const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

export function dayKey(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function dayLabel(key: string) {
  const [, month, day] = key.split('-').map(Number)
  return `${day} ${monthNames[month! - 1]}`
}

export function filterOrders(orders: RecentOrder[], filters: DashboardFilters) {
  return orders.filter(
    (order) =>
      (!filters.region || order.region === filters.region) &&
      (!filters.channel || order.channel === filters.channel) &&
      (!filters.from || order.date >= filters.from) &&
      (!filters.to || order.date <= filters.to),
  )
}

/** Cancelled orders count as orders but never as revenue or deliveries. */
export function summarizeOrders(orders: RecentOrder[]) {
  const active = orders.filter(({ status }) => status !== 'Cancelled')
  return {
    count: orders.length,
    active: active.length,
    revenue: active.reduce((total, { amount }) => total + amount, 0),
    delivered: orders.filter(({ status }) => status === 'Delivered').length,
    pending: orders.filter(({ status }) => status === 'Pending').length,
    cancelled: orders.length - active.length,
  }
}

/** Every day in the filter range, or in the dataset when the range is open. */
export function dashboardKpis(summary: ReturnType<typeof summarizeOrders>): DashboardKpi[] {
  const deliveredRate = summary.active ? (summary.delivered / summary.active) * 100 : null
  return [
    {
      label: 'Orders',
      value: formatNumber(summary.count),
      detail: `${summary.pending} awaiting confirmation`,
      markerClass: 'bg-info',
    },
    {
      label: 'Revenue',
      value: formatCurrency(summary.revenue),
      detail: `Across ${summary.active} active orders`,
      markerClass: 'bg-primary',
    },
    {
      label: 'Delivered',
      value: deliveredRate === null ? DISPLAY_PLACEHOLDER : `${deliveredRate.toFixed(1)}%`,
      detail: `${summary.delivered} of ${summary.active} active orders`,
      markerClass: 'bg-success',
    },
    {
      label: 'Needs attention',
      value: formatNumber(summary.pending + summary.cancelled),
      detail: `${summary.pending} pending · ${summary.cancelled} cancelled`,
      markerClass: 'bg-warn',
    },
  ]
}

export function daysInRange(orders: RecentOrder[], filters: DashboardFilters) {
  const dates = orders.map(({ date }) => date).sort()
  const first = filters.from ?? dates[0]
  const last = filters.to ?? dates[dates.length - 1]
  if (!first || !last || first > last) return []
  const days: string[] = []
  const [year, month, day] = first.split('-').map(Number)
  for (
    let date = new Date(year!, month! - 1, day);
    dayKey(date) <= last;
    date.setDate(date.getDate() + 1)
  ) {
    days.push(dayKey(date))
  }
  return days
}

export function dailyRevenue(orders: RecentOrder[], days: string[]) {
  return days.map((day) =>
    orders
      .filter(({ date, status }) => date === day && status !== 'Cancelled')
      .reduce((total, { amount }) => total + amount, 0),
  )
}

/** Order counts per region (categories), one series per channel. */
export function ordersByRegionAndChannel(
  orders: RecentOrder[],
  regionList: Region[],
  channelList: Channel[],
): ChartSeries[] {
  return channelList.map((channel) => ({
    label: channel,
    values: regionList.map(
      (region) =>
        orders.filter((order) => order.region === region && order.channel === channel).length,
    ),
  }))
}

export const alerts: DashboardAlert[] = [
  {
    id: 'credit',
    severity: 'error',
    title: 'Credit limit exceeded',
    detail: 'Coast Kitchen is Ksh 12,400 over its limit. FTF-1060 is on hold.',
  },
  {
    id: 'stock',
    severity: 'warn',
    title: 'Low stock: tomatoes',
    detail: 'About 180 kg left at the Nairobi hub. Next supply arrives tomorrow.',
  },
  {
    id: 'route',
    severity: 'info',
    title: 'Route delay',
    detail: 'Westlands deliveries are running about 30 minutes late.',
  },
]

export const initialTasks: DashboardTask[] = [
  { id: 't1', label: 'Approve Coast Kitchen credit request', due: 'Today', done: false },
  { id: 't2', label: 'Confirm Kirinyaga tomato delivery', due: 'Today', done: false },
  { id: 't3', label: 'Review cancelled order FTF-1057', due: 'Tomorrow', done: false },
  { id: 't4', label: 'Send weekly sales summary', due: 'Friday', done: true },
]
