export interface RouteDrawerOrder {
  id: string
  customer: string
  status: 'Confirmed' | 'Packing' | 'Delivered'
  severity: 'success' | 'info' | 'secondary'
  delivery: string
  address: string
  items: number
}

export const routeDrawerOrders: RouteDrawerOrder[] = [
  {
    id: 'FTF-1042',
    customer: 'Green Basket',
    status: 'Confirmed',
    severity: 'success',
    delivery: 'Friday, 20 November',
    address: '14 Market Road, Nairobi',
    items: 12,
  },
  {
    id: 'FTF-1043',
    customer: 'Savanna Grocers',
    status: 'Packing',
    severity: 'info',
    delivery: 'Friday, 20 November',
    address: 'Moi Avenue, Nakuru',
    items: 8,
  },
  {
    id: 'FTF-1044',
    customer: 'Lakeside Foods',
    status: 'Delivered',
    severity: 'secondary',
    delivery: 'Wednesday, 18 November',
    address: 'Kenyatta Road, Kisumu',
    items: 21,
  },
]
