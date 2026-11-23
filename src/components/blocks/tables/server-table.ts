export type ServerOrderStatus = 'Pending' | 'Confirmed' | 'Delivered'
export type ServerTableSortField = 'customer' | 'deliveryDate' | 'crates' | 'totalKes'
export type ServerTableAction = 'view' | 'edit' | 'delete'

export interface ServerOrder {
  id: number
  reference: string
  customer: string
  /** Date only, in YYYY-MM-DD form. */
  deliveryDate: string
  crates: number
  totalKes: number
  status: ServerOrderStatus
}

/** What the table asks the server for. `page` starts at 1. */
export interface ServerTableLoad {
  page: number
  rows: number
  sortField: ServerTableSortField
  sortOrder: 1 | -1
}

export interface ServerTableQuery extends ServerTableLoad {
  search: string
  status: ServerOrderStatus | null
}

export interface ServerTableResult {
  rows: ServerOrder[]
  totalRecords: number
}

export type ServerTablePermissions = Record<ServerTableAction, boolean>

export const serverOrderStatuses: ServerOrderStatus[] = ['Pending', 'Confirmed', 'Delivered']

const customers = [
  'Green Basket',
  'Harvest Kitchen',
  'Market Table',
  'Fresh Corner',
  'Savannah Grill',
  'Java House Westlands',
  'Naivas Kilimani',
  'Mama Oliech Restaurant',
  'Carrefour Two Rivers',
  'Lake Basin Hotel',
  'Karen Provision Store',
  'Rosslyn Bistro',
]

/** Thirty-six orders, enough for several pages at the smallest page size. */
const allOrders: ServerOrder[] = Array.from({ length: 36 }, (_, index) => {
  const day = String(9 + (index % 21)).padStart(2, '0')
  return {
    id: index + 1,
    reference: `FTF-${3001 + index}`,
    customer: customers[(index * 5) % customers.length]!,
    deliveryDate: `2026-11-${day}`,
    crates: 4 + ((index * 7) % 19),
    totalKes: 6200 + ((index * 3917) % 41000),
    status: serverOrderStatuses[index % 3]!,
  }
})

/**
 * A stand-in for the real API. It filters, sorts and slices on the "server", waits a moment,
 * and can fail on request. Abort the signal to drop a request that is no longer wanted.
 */
export function fetchServerOrders(
  query: ServerTableQuery,
  options: { fail?: boolean; delay?: number; signal?: AbortSignal } = {},
): Promise<ServerTableResult> {
  const { fail = false, delay = 500, signal } = options
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException('Aborted', 'AbortError'))
    const timer = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort)
      if (fail) return reject(new Error('The server could not be reached.'))
      const keyword = query.search.trim().toLowerCase()
      const matches = allOrders.filter(
        (order) =>
          (!query.status || order.status === query.status) &&
          (!keyword || `${order.reference} ${order.customer}`.toLowerCase().includes(keyword)),
      )
      const sorted = [...matches].sort((a, b) => {
        const first = a[query.sortField]
        const second = b[query.sortField]
        const result =
          typeof first === 'string'
            ? first.localeCompare(second as string)
            : (first as number) - (second as number)
        return (result || a.id - b.id) * query.sortOrder
      })
      const start = (query.page - 1) * query.rows
      resolve({ rows: sorted.slice(start, start + query.rows), totalRecords: matches.length })
    }, delay)
    function onAbort() {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    }
    signal?.addEventListener('abort', onAbort, { once: true })
  })
}
