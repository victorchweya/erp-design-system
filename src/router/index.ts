import { createRouter, createWebHistory } from 'vue-router'
import { componentPages } from '@/data/component-pages'
import { blockPages } from '@/data/block-pages'

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
      redirect: '/components/core-elements/button',
    },
    {
      path: '/components',
      redirect: '/components/core-elements/button',
    },
    ...componentPages.map((page) => ({
      path: page.path,
      name: `component-${page.path.split('/').pop()}`,
      meta: { breadcrumb: ['Components', page.group, page.label] },
      component: page.load,
    })),
    {
      path: '/ui-blocks',
      redirect: '/ui-blocks/headers',
    },
    ...blockPages.map((page) => ({
      path: page.path,
      name: `blocks-${page.path.split('/').pop()}`,
      meta: { breadcrumb: ['UI blocks', page.label] },
      component: page.load,
    })),
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
