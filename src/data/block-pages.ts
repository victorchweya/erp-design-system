export const blockPages = [
  {
    label: 'Headers',
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
