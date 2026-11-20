import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { RouterView, createMemoryHistory, createRouter, type RouteRecordRaw } from 'vue-router'
import appRouter from '@/router'

enableAutoUnmount(afterEach)

// Keep the real not-found view and stub the other pages so navigation does not load them.
const Page = { render: () => null }
const routes = appRouter.options.routes.map((route) =>
  'component' in route && route.name !== 'not-found'
    ? ({ ...route, component: Page } as RouteRecordRaw)
    : route,
)

it('shows the not-found page for an unknown address and links back home', async () => {
  const router = createRouter({ history: createMemoryHistory(), routes })
  await router.push('/orders/<b>FTF-1042</b>')
  await router.isReady()
  const wrapper = mount(RouterView, { global: { plugins: [PrimeVue, router] } })
  await flushPromises()

  expect(router.currentRoute.value.name).toBe('not-found')
  expect(wrapper.findAll('h1')).toHaveLength(1)
  // The requested address is shown as text, never as markup.
  expect(wrapper.get('code').text()).toBe('/orders/<b>FTF-1042</b>')
  expect(wrapper.find('code b').exists()).toBe(false)

  await wrapper.get('a[href="/components"]').trigger('click')
  await flushPromises()
  expect(router.currentRoute.value.path).toBe('/components/core-elements/button')
})
