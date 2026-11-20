import { createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import appRouter from '@/router'

// Keep the app's paths, redirects, and breadcrumbs without loading every page view.
const Page = { render: () => null }

export function createDocsRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: appRouter.options.routes.map((route) =>
      'component' in route ? ({ ...route, component: Page } as RouteRecordRaw) : route,
    ),
  })
}
