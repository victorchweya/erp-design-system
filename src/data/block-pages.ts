import type { Component } from 'vue'

type BlockPage = {
  label: string
  group?: string
  /** Component-category pages also appear under Components. */
  section?: 'Components'
  path: string
  load: () => Promise<{ default: Component }>
}

export const blockPages: BlockPage[] = [
  {
    label: 'KPI',
    group: 'KPI / metric card',
    section: 'Components',
    path: '/ui-blocks/kpi',
    load: () => import('@/views/blocks/KpiView.vue'),
  },
  {
    label: 'KPI group',
    group: 'KPI / metric card',
    section: 'Components',
    path: '/ui-blocks/kpi-group',
    load: () => import('@/views/blocks/KpiGroupView.vue'),
  },
  {
    label: 'Metric card',
    group: 'KPI / metric card',
    section: 'Components',
    path: '/ui-blocks/metric-card',
    load: () => import('@/views/blocks/MetricCardView.vue'),
  },
  {
    label: 'Metric group',
    group: 'KPI / metric card',
    section: 'Components',
    path: '/ui-blocks/metric-group',
    load: () => import('@/views/blocks/MetricGroupView.vue'),
  },
  {
    label: 'Order entry',
    path: '/ui-blocks/order-entry',
    load: () => import('@/views/blocks/OrderEntryView.vue'),
  },
  {
    label: 'Product detail',
    path: '/ui-blocks/product-detail',
    load: () => import('@/views/blocks/ProductDetailView.vue'),
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
    label: 'Area chart',
    group: 'Charts',
    section: 'Components',
    path: '/ui-blocks/charts/area',
    load: () => import('@/views/blocks/charts/AreaChartView.vue'),
  },
  {
    label: 'Bar chart',
    group: 'Charts',
    section: 'Components',
    path: '/ui-blocks/charts/bar',
    load: () => import('@/views/blocks/charts/BarChartView.vue'),
  },
  {
    label: 'Bubble & scatter',
    group: 'Charts',
    section: 'Components',
    path: '/ui-blocks/charts/bubble-scatter',
    load: () => import('@/views/blocks/charts/BubbleScatterChartView.vue'),
  },
  {
    label: 'Composed chart',
    group: 'Charts',
    section: 'Components',
    path: '/ui-blocks/charts/composed',
    load: () => import('@/views/blocks/charts/ComposedChartView.vue'),
  },
  {
    label: 'Doughnut & pie',
    group: 'Charts',
    section: 'Components',
    path: '/ui-blocks/charts/doughnut-pie',
    load: () => import('@/views/blocks/charts/DoughnutPieChartView.vue'),
  },
  {
    label: 'Line chart',
    group: 'Charts',
    section: 'Components',
    path: '/ui-blocks/charts/line',
    load: () => import('@/views/blocks/charts/LineChartView.vue'),
  },
  {
    label: 'Polar area',
    group: 'Charts',
    section: 'Components',
    path: '/ui-blocks/charts/polar-area',
    load: () => import('@/views/blocks/charts/PolarAreaChartView.vue'),
  },
  {
    label: 'Radar chart',
    group: 'Charts',
    section: 'Components',
    path: '/ui-blocks/charts/radar',
    load: () => import('@/views/blocks/charts/RadarChartView.vue'),
  },
  {
    label: 'Stacked chart',
    group: 'Charts',
    section: 'Components',
    path: '/ui-blocks/charts/stacked',
    load: () => import('@/views/blocks/charts/StackedChartView.vue'),
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
  {
    label: 'Page templates',
    path: '/ui-blocks/page-templates',
    load: () => import('@/views/blocks/PageTemplatesView.vue'),
  },
  {
    label: 'Documents',
    path: '/ui-blocks/documents',
    load: () => import('@/views/blocks/DocumentsView.vue'),
  },
  {
    label: 'Workflow',
    path: '/ui-blocks/workflow',
    load: () => import('@/views/blocks/WorkflowView.vue'),
  },
  {
    label: 'Comments & attachments',
    path: '/ui-blocks/comments-attachments',
    load: () => import('@/views/blocks/CommentsAttachmentsView.vue'),
  },
  {
    label: 'Import & export',
    path: '/ui-blocks/import-export',
    load: () => import('@/views/blocks/ImportExportView.vue'),
  },
  {
    label: 'Users & permissions',
    path: '/ui-blocks/users-permissions',
    load: () => import('@/views/blocks/UsersPermissionsView.vue'),
  },
  {
    label: 'Notifications',
    path: '/ui-blocks/notifications',
    load: () => import('@/views/blocks/NotificationsView.vue'),
  },
  {
    label: 'Scheduling',
    path: '/ui-blocks/scheduling',
    load: () => import('@/views/blocks/SchedulingView.vue'),
  },
  {
    label: 'Loading states',
    path: '/ui-blocks/loading-states',
    load: () => import('@/views/blocks/LoadingStatesView.vue'),
  },
  {
    label: 'Error pages',
    path: '/ui-blocks/error-pages',
    load: () => import('@/views/blocks/ErrorPagesView.vue'),
  },
  {
    label: 'Status tag',
    path: '/backoffice-blocks/status-tag',
    load: () => import('@/views/blocks/backoffice/StatusTagView.vue'),
  },
  {
    label: 'Decision dialog',
    path: '/backoffice-blocks/decision-dialog',
    load: () => import('@/views/blocks/backoffice/DecisionDialogView.vue'),
  },
  {
    label: 'Record details',
    path: '/backoffice-blocks/record-details',
    load: () => import('@/views/blocks/backoffice/RecordDetailsView.vue'),
  },
  {
    label: 'Order detail',
    path: '/backoffice-blocks/order-detail',
    load: () => import('@/views/blocks/backoffice/OrderDetailView.vue'),
  },
  {
    label: 'Customer detail',
    path: '/backoffice-blocks/customer-detail',
    load: () => import('@/views/blocks/backoffice/CustomerDetailView.vue'),
  },
  {
    label: 'Report embed',
    path: '/backoffice-blocks/report-embed',
    load: () => import('@/views/blocks/backoffice/ReportEmbedView.vue'),
  },
  {
    label: 'Payment allocation',
    path: '/backoffice-blocks/payment-allocation',
    load: () => import('@/views/blocks/backoffice/PaymentAllocationView.vue'),
  },
]
