import { createRouter, createWebHistory } from 'vue-router'
import ComponentPlaygroundView from '../views/ComponentPlaygroundView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    breadcrumb?: string[]
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'components',
      meta: { breadcrumb: ['Component playground'] },
      component: ComponentPlaygroundView,
    },
    {
      path: '/general',
      name: 'general',
      meta: { breadcrumb: ['Getting started', 'General'] },
      component: () => import('../views/GeneralView.vue'),
    },
    {
      path: '/foundations/color',
      name: 'foundation-color',
      meta: { breadcrumb: ['Foundations', 'Color'] },
      component: () => import('../views/foundations/ColorView.vue'),
    },
    {
      path: '/foundations/motion',
      name: 'foundation-motion',
      meta: { breadcrumb: ['Foundations', 'Motion'] },
      component: () => import('../views/foundations/MotionView.vue'),
    },
    {
      path: '/foundations/spacing',
      name: 'foundation-spacing',
      meta: { breadcrumb: ['Foundations', 'Spacing'] },
      component: () => import('../views/foundations/SpacingView.vue'),
    },
    {
      path: '/foundations/icons',
      name: 'foundation-icons',
      meta: { breadcrumb: ['Foundations', 'Icons'] },
      component: () => import('../views/foundations/IconsView.vue'),
    },
    {
      path: '/foundations/typography',
      name: 'foundation-typography',
      meta: { breadcrumb: ['Foundations', 'Typography'] },
      component: () => import('../views/foundations/TypographyView.vue'),
    },
  ],
})

export default router
