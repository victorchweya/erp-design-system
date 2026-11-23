export type SupplierOrderStatus =
  'New order' | 'Accepted' | 'Dispatched' | 'Received' | 'Completed' | 'Cancelled'
export type SupplierSegment = 'Farmer' | 'Partner' | 'Exporter' | 'Aggregator'
export type SourcingType = 'Pickup' | 'Delivery'

export interface SupplierOrder {
  reference: string
  supplier: string
  segment: SupplierSegment
  /** Date only, in YYYY-MM-DD form. */
  sourcingDate: string
  sourcingType: SourcingType
  amountKes: number
  status: SupplierOrderStatus
}

export const supplierOrderStatuses: SupplierOrderStatus[] = [
  'New order',
  'Accepted',
  'Dispatched',
  'Received',
  'Completed',
  'Cancelled',
]
export const supplierSegments: SupplierSegment[] = ['Farmer', 'Partner', 'Exporter', 'Aggregator']
export const sourcingTypes: SourcingType[] = ['Pickup', 'Delivery']

/** Column keys match the Column fields of the example table. */
export const supplierOrderColumns = [
  { key: 'reference', label: 'Order', locked: true },
  { key: 'supplier', label: 'Supplier' },
  { key: 'segment', label: 'Supplier segment' },
  { key: 'sourcingDate', label: 'Sourcing date' },
  { key: 'sourcingType', label: 'Sourcing type' },
  { key: 'amountKes', label: 'Amount' },
  { key: 'status', label: 'Status' },
]

export const supplierOrders: SupplierOrder[] = [
  {
    reference: 'FTF-2041',
    supplier: 'Kijani Growers Ltd',
    segment: 'Farmer',
    sourcingDate: '2026-11-16',
    sourcingType: 'Pickup',
    amountKes: 184500,
    status: 'Completed',
  },
  {
    reference: 'FTF-2042',
    supplier: 'Naivasha Fresh Farms',
    segment: 'Exporter',
    sourcingDate: '2026-11-17',
    sourcingType: 'Delivery',
    amountKes: 312800,
    status: 'Received',
  },
  {
    reference: 'FTF-2043',
    supplier: 'Limuru Dairy Co-op',
    segment: 'Partner',
    sourcingDate: '2026-11-17',
    sourcingType: 'Pickup',
    amountKes: 96250,
    status: 'Dispatched',
  },
  {
    reference: 'FTF-2044',
    supplier: 'Kiambu Highland Produce',
    segment: 'Aggregator',
    sourcingDate: '2026-11-18',
    sourcingType: 'Pickup',
    amountKes: 142000,
    status: 'Accepted',
  },
  {
    reference: 'FTF-2045',
    supplier: 'Mwangi Family Farm',
    segment: 'Farmer',
    sourcingDate: '2026-11-18',
    sourcingType: 'Delivery',
    amountKes: 38400,
    status: 'Received',
  },
  {
    reference: 'FTF-2046',
    supplier: 'Thika Greens Aggregators',
    segment: 'Aggregator',
    sourcingDate: '2026-11-19',
    sourcingType: 'Pickup',
    amountKes: 205600,
    status: 'New order',
  },
  {
    reference: 'FTF-2047',
    supplier: 'Kijani Growers Ltd',
    segment: 'Farmer',
    sourcingDate: '2026-11-19',
    sourcingType: 'Pickup',
    amountKes: 127300,
    status: 'Accepted',
  },
  {
    reference: 'FTF-2048',
    supplier: 'Rift Valley Exporters',
    segment: 'Exporter',
    sourcingDate: '2026-11-20',
    sourcingType: 'Delivery',
    amountKes: 458900,
    status: 'Dispatched',
  },
  {
    reference: 'FTF-2049',
    supplier: 'Wanjiru Organics',
    segment: 'Farmer',
    sourcingDate: '2026-11-20',
    sourcingType: 'Delivery',
    amountKes: 54700,
    status: 'Cancelled',
  },
  {
    reference: 'FTF-2050',
    supplier: 'Limuru Dairy Co-op',
    segment: 'Partner',
    sourcingDate: '2026-11-21',
    sourcingType: 'Pickup',
    amountKes: 88100,
    status: 'New order',
  },
  {
    reference: 'FTF-2051',
    supplier: 'Naivasha Fresh Farms',
    segment: 'Exporter',
    sourcingDate: '2026-11-21',
    sourcingType: 'Delivery',
    amountKes: 276400,
    status: 'New order',
  },
  {
    reference: 'FTF-2052',
    supplier: 'Mwangi Family Farm',
    segment: 'Farmer',
    sourcingDate: '2026-11-22',
    sourcingType: 'Pickup',
    amountKes: 41900,
    status: 'Accepted',
  },
]
