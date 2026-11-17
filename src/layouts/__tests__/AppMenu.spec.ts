import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import appRouter from '@/router'
import AppMenu from '../components/AppMenu.vue'

enableAutoUnmount(afterEach)

it('navigates to the documentation pages and marks the current link', async () => {
  const router = createRouter({ history: createMemoryHistory(), routes: appRouter.options.routes })
  await router.push('/')
  await router.isReady()
  const wrapper = mount(AppMenu, { global: { plugins: [router] } })

  expect(wrapper.get('h2').text()).toBe('Getting started')
  expect(wrapper.get('summary').text()).toBe('Foundations')
  for (const path of [
    '/general',
    '/foundations/color',
    '/foundations/motion',
    '/foundations/spacing',
    '/foundations/icons',
    '/foundations/typography',
  ]) {
    await wrapper.get(`a[href="${path}"]`).trigger('click')
    await expect.poll(() => router.currentRoute.value.path).toBe(path)
    await flushPromises()
    expect(router.currentRoute.value.matched).toHaveLength(1)
    expect(wrapper.get(`a[href="${path}"]`).attributes('aria-current')).toBe('page')
    expect(wrapper.findAll('a[aria-current="page"]')).toHaveLength(1)
    expect(wrapper.find('.menu-group:has([aria-current="page"])').exists()).toBe(
      path.startsWith('/foundations/'),
    )
  }
  expect(wrapper.emitted('navigate')).toHaveLength(6)
  await router.push('/general')
  await flushPromises()
  expect(wrapper.find('.menu-group:has([aria-current="page"])').exists()).toBe(false)
})
