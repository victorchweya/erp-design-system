import { afterEach, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { compileStyle, parse } from '@vue/compiler-sfc'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import { createMemoryHistory, createRouter } from 'vue-router'
import appRouter from '@/router'
import AppMenu from '../components/AppMenu.vue'
import { componentPages } from '@/data/component-pages'
import { blockPages } from '@/data/block-pages'

enableAutoUnmount(afterEach)

it('keeps the active group label scoped and uses the theme text colour for both modes', () => {
  const filename = resolve('src/layouts/components/AppMenu.vue')
  const { descriptor } = parse(readFileSync(filename, 'utf8'))
  const style = compileStyle({
    source: descriptor.styles[0]!.content,
    filename,
    id: 'data-v-menu',
    scoped: true,
  })
  expect(style.errors).toEqual([])
  expect(style.code).toContain('.menu-group-label[data-v-menu]')
  expect(style.code).toContain('color: var(--p-text-color)')
  expect(style.code).not.toContain('.app-dark {')
})

it('navigates to the documentation pages and marks the current link', async () => {
  const router = createRouter({ history: createMemoryHistory(), routes: appRouter.options.routes })
  await router.push('/')
  await router.isReady()
  const wrapper = mount(AppMenu, { global: { plugins: [router] } })

  expect(router.currentRoute.value.path).toBe('/components/core-elements/button')
  expect(wrapper.get('h2').text()).toBe('Getting started')
  expect(wrapper.get('summary').text()).toBe('Foundations')
  for (const path of [
    '/general',
    '/foundations/color',
    '/foundations/motion',
    '/foundations/spacing',
    '/foundations/icons',
    '/foundations/typography',
    '/foundations/formatting',
    '/components/core-elements/button',
    '/ui-blocks/headers',
  ]) {
    await wrapper.get(`a[href="${path}"]`).trigger('click')
    await expect.poll(() => router.currentRoute.value.path).toBe(path)
    await flushPromises()
    expect(router.currentRoute.value.matched).toHaveLength(1)
    expect(wrapper.get(`a[href="${path}"]`).attributes('aria-current')).toBe('page')
    expect(wrapper.get(`a[href="${path}"]`).classes()).toContain('font-medium')
    expect(wrapper.findAll('a[aria-current="page"]')).toHaveLength(1)
    expect(wrapper.find('.menu-group:has([aria-current="page"])').exists()).toBe(
      path !== '/general',
    )
  }
  expect(wrapper.emitted('navigate')).toHaveLength(9)
  await router.push('/general')
  await flushPromises()
  expect(wrapper.find('.menu-group:has([aria-current="page"])').exists()).toBe(false)
})

it('opens every component page and keeps its group and current link active', async () => {
  const router = createRouter({ history: createMemoryHistory(), routes: appRouter.options.routes })
  await router.push('/')
  await router.isReady()
  const wrapper = mount(AppMenu, { global: { plugins: [router] } })
  for (const page of componentPages) {
    await wrapper.get(`a[href="${page.path}"]`).trigger('click')
    await expect.poll(() => router.currentRoute.value.path).toBe(page.path)
    await flushPromises()
    const current = wrapper.get('a[aria-current="page"]')
    expect(current.attributes('href')).toBe(page.path)
    expect(current.element.closest('details')?.open).toBe(true)
    expect(router.currentRoute.value.meta.breadcrumb).toEqual([
      'Components',
      page.group,
      page.label,
    ])
  }
  expect(wrapper.emitted('navigate')).toHaveLength(componentPages.length)
})

it('opens every block category with the correct active link and breadcrumb', async () => {
  const router = createRouter({ history: createMemoryHistory(), routes: appRouter.options.routes })
  await router.push('/ui-blocks')
  await router.isReady()
  const wrapper = mount(AppMenu, { global: { plugins: [router] } })
  for (const page of blockPages) {
    await wrapper.get(`a[href="${page.path}"]`).trigger('click')
    await expect.poll(() => router.currentRoute.value.path).toBe(page.path)
    await flushPromises()
    const current = wrapper.get('a[aria-current="page"]')
    expect(current.attributes('href')).toBe(page.path)
    expect(current.element.closest('details')?.open).toBe(true)
    expect(router.currentRoute.value.meta.breadcrumb).toEqual([
      'UI blocks',
      ...(page.group ? [page.group] : []),
      page.label,
    ])
  }
  expect(wrapper.emitted('navigate')).toHaveLength(blockPages.length)
})
