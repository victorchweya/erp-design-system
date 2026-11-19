import type { Component } from 'vue'

type BlockPage = {
  label: string
  group?: string
  path: string
  load: () => Promise<{ default: Component }>
}

export const blockPages: BlockPage[] = [
  {
    label: 'KPI',
    group: 'KPI / Metric Card',
    path: '/ui-blocks/kpi',
    load: () => import('@/views/blocks/KpiView.vue'),
  },
  {
    label: 'KPI Group',
    group: 'KPI / Metric Card',
    path: '/ui-blocks/kpi-group',
    load: () => import('@/views/blocks/KpiGroupView.vue'),
  },
  {
    label: 'Metric Card',
    group: 'KPI / Metric Card',
    path: '/ui-blocks/metric-card',
    load: () => import('@/views/blocks/MetricCardView.vue'),
  },
  {
    label: 'Metric Group',
    group: 'KPI / Metric Card',
    path: '/ui-blocks/metric-group',
    load: () => import('@/views/blocks/MetricGroupView.vue'),
  },
  {
    label: 'Order entry',
    path: '/ui-blocks/order-entry',
    load: () => import('@/views/blocks/OrderEntryView.vue'),
  },
  {
    label: 'Section headers',
    path: '/ui-blocks/headers',
    load: () => import('@/views/blocks/HeadersView.vue'),
  },
  {
    label: 'Navigation',
    path: '/ui-blocks/navigation',
    load: () => import('@/views/blocks/NavigationView.vue'),
  },
  {
    label: 'Feedback',
    path: '/ui-blocks/feedback',
    load: () => import('@/views/blocks/FeedbackView.vue'),
  },
  {
    label: 'Empty states',
    path: '/ui-blocks/empty-states',
    load: () => import('@/views/blocks/EmptyStatesView.vue'),
  },
  {
    label: 'Tables',
    path: '/ui-blocks/tables',
    load: () => import('@/views/blocks/TablesView.vue'),
  },
  {
    label: 'Drawers',
    path: '/ui-blocks/drawers',
    load: () => import('@/views/blocks/DrawersView.vue'),
  },
  { label: 'Forms', path: '/ui-blocks/forms', load: () => import('@/views/blocks/FormsView.vue') },
  {
    label: 'Authentication',
    path: '/ui-blocks/authentication',
    load: () => import('@/views/blocks/AuthenticationView.vue'),
  },
  {
    label: 'Modals',
    path: '/ui-blocks/modals',
    load: () => import('@/views/blocks/ModalsView.vue'),
  },
  {
    label: 'Popups',
    path: '/ui-blocks/popups',
    load: () => import('@/views/blocks/PopupsView.vue'),
  },
]
