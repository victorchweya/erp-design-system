import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { createMemoryHistory, createRouter } from 'vue-router'
import appRouter from '@/router'
import AppBreadcrumb from '../components/AppBreadcrumb.vue'

enableAutoUnmount(afterEach)

it('updates the breadcrumb and current page when navigating between sections', async () => {
  const router = createRouter({ history: createMemoryHistory(), routes: appRouter.options.routes })
  await router.push('/foundations/color')
  await router.isReady()
  const wrapper = mount(AppBreadcrumb, { global: { plugins: [PrimeVue, router] } })
  const breadcrumb = wrapper.get('nav[aria-label="Breadcrumb"]')

  expect(breadcrumb.text()).toContain('Foundations')
  expect(breadcrumb.get('[aria-current="page"]').text()).toBe('Color')
  expect(breadcrumb.findAll('a')).toHaveLength(0)

  await router.push('/foundations/motion')
  expect(breadcrumb.get('[aria-current="page"]').text()).toBe('Motion')
  expect(breadcrumb.text()).not.toContain('Color')

  await router.push('/general')
  expect(breadcrumb.text()).toContain('Getting started')
  expect(breadcrumb.get('[aria-current="page"]').text()).toBe('General')
  expect(breadcrumb.text()).not.toContain('Foundations')

  for (const path of ['/', '/components']) {
    await router.push(path)
    expect(router.currentRoute.value.path).toBe('/components/core-elements/button')
    expect(breadcrumb.text()).toContain('Components')
    expect(breadcrumb.text()).toContain('Button')
    expect(breadcrumb.get('[aria-current="page"]').text()).toBe('Button')
    expect(breadcrumb.findAll('[aria-current="page"]')).toHaveLength(1)
  }

  await router.push('/ui-blocks')
  expect(router.currentRoute.value.path).toBe('/ui-blocks/headers')
  expect(breadcrumb.text()).toContain('Blocks')
  expect(breadcrumb.text()).toContain('UI blocks')
  expect(breadcrumb.get('[aria-current="page"]').text()).toBe('Section headers')
})
