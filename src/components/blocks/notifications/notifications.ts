import type { Component } from 'vue'
import Cog from '@primeicons/vue/cog'
import FileCheck from '@primeicons/vue/file-check'
import ShoppingCart from '@primeicons/vue/shopping-cart'
import Truck from '@primeicons/vue/truck'

export type NotificationType = 'orders' | 'approvals' | 'deliveries' | 'system'

export interface AppNotification {
  id: string
  type: NotificationType
  title: string
  body: string
  createdAt: string
  read: boolean
  /** Where the notification leads in your application. */
  href: string
  linkLabel: string
}

export const notificationTypes: Record<NotificationType, { label: string; icon: Component }> = {
  orders: { label: 'Orders', icon: ShoppingCart },
  approvals: { label: 'Approvals', icon: FileCheck },
  deliveries: { label: 'Deliveries', icon: Truck },
  system: { label: 'System', icon: Cog },
}

export function sampleNotifications(): AppNotification[] {
  return [
    {
      id: 'n1',
      type: 'approvals',
      title: 'Purchase order PO-2291 needs your approval',
      body: 'Kiambu Growers Co-op submitted 480 kg of tomatoes at KSh 62 per kg. The order is above your team’s auto-approval limit.',
      createdAt: '2026-11-20T08:12:00+03:00',
      read: false,
      href: '/purchase-orders/PO-2291',
      linkLabel: 'Review PO-2291',
    },
    {
      id: 'n2',
      type: 'deliveries',
      title: 'Delivery DL-7720 is running 40 minutes late',
      body: 'The truck to Green Basket is held at the Thika Road weighbridge. The customer has been notified of the new arrival time.',
      createdAt: '2026-11-20T07:48:00+03:00',
      read: false,
      href: '/deliveries/DL-7720',
      linkLabel: 'Track DL-7720',
    },
    {
      id: 'n3',
      type: 'orders',
      title: 'Order FTF-1042 was changed by the customer',
      body: 'Green Basket replaced 4 kg of kale with spinach. Check stock before the picking list is printed.',
      createdAt: '2026-11-20T07:15:00+03:00',
      read: false,
      href: '/orders/FTF-1042',
      linkLabel: 'Open order FTF-1042',
    },
    {
      id: 'n4',
      type: 'orders',
      title: 'New order FTF-1051 from Mama Mboga Market',
      body: '18 lines for delivery on Saturday morning. Payment terms: 14 days.',
      createdAt: '2026-11-19T16:30:00+03:00',
      read: true,
      href: '/orders/FTF-1051',
      linkLabel: 'Open order FTF-1051',
    },
    {
      id: 'n5',
      type: 'deliveries',
      title: 'Delivery DL-7712 completed',
      body: 'Signed for by Joseph at Fresh Corner, Westlands. 2 crates returned for credit.',
      createdAt: '2026-11-19T13:05:00+03:00',
      read: true,
      href: '/deliveries/DL-7712',
      linkLabel: 'View proof of delivery',
    },
    {
      id: 'n6',
      type: 'system',
      title: 'Scheduled maintenance on Sunday 22 November',
      body: 'The ERP will be unavailable from 01:00 to 03:00 EAT. Orders placed by customers during this window are queued.',
      createdAt: '2026-11-18T10:00:00+03:00',
      read: true,
      href: '/status',
      linkLabel: 'View system status',
    },
  ]
}
