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
  ],
})

export default router
