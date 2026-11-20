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

export const recentOrders: RecentOrder[] = [
  {
    reference: 'FTF-1061',
    customer: 'Green Basket',
    region: 'Nairobi',
    channel: 'Sales rep',
    date: '2026-11-20',
    amount: 48250,
    status: 'Out for delivery',
  },
  {
    reference: 'FTF-1060',
    customer: 'Coast Kitchen',
    region: 'Mombasa',
    channel: 'E-commerce',
    date: '2026-11-20',
    amount: 21400,
    status: 'Pending',
  },
  {
    reference: 'FTF-1059',
    customer: 'Harvest Kitchen',
    region: 'Nairobi',
    channel: 'Ask Sprout',
    date: '2026-11-19',
    amount: 15600,
    status: 'Delivered',
  },
  {
    reference: 'FTF-1058',
    customer: 'Lakeside Grocers',
    region: 'Kisumu',
    channel: 'Sales rep',
    date: '2026-11-19',
    amount: 33900,
    status: 'Delivered',
  },
  {
    reference: 'FTF-1057',
    customer: 'Rift Fresh Mart',
    region: 'Nakuru',
    channel: 'E-commerce',
    date: '2026-11-18',
    amount: 9800,
    status: 'Cancelled',
  },
  {
    reference: 'FTF-1056',
    customer: 'Market Table',
    region: 'Nairobi',
    channel: 'E-commerce',
    date: '2026-11-17',
    amount: 27150,
    status: 'Delivered',
  },
  {
    reference: 'FTF-1055',
    customer: 'Nyali Bistro',
    region: 'Mombasa',
    channel: 'Sales rep',
    date: '2026-11-15',
    amount: 41300,
    status: 'Delivered',
  },
]

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
