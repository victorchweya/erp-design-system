import { createRouter, createWebHistory } from 'vue-router'
import ComponentPlaygroundView from '../views/ComponentPlaygroundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'components',
      component: ComponentPlaygroundView,
    },
    {
      path: '/general',
      name: 'general',
      component: () => import('../views/GeneralView.vue'),
    },
    {
      path: '/foundations/color',
      name: 'foundation-color',
      component: () => import('../views/foundations/ColorView.vue'),
    },
    {
      path: '/foundations/motion',
      name: 'foundation-motion',
      component: () => import('../views/foundations/MotionView.vue'),
    },
    {
      path: '/foundations/spacing',
      name: 'foundation-spacing',
      component: () => import('../views/foundations/SpacingView.vue'),
    },
    {
      path: '/foundations/icons',
      name: 'foundation-icons',
      component: () => import('../views/foundations/IconsView.vue'),
    },
    {
      path: '/foundations/typography',
      name: 'foundation-typography',
      component: () => import('../views/foundations/TypographyView.vue'),
    },
  ],
})

export default router
