import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { defineComponent, h } from 'vue'
import { createMemoryHistory, createRouter, RouterView } from 'vue-router'
import RouteDrawerBlock from '../drawers/RouteDrawerBlock.vue'

enableAutoUnmount(afterEach)
beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }))
})
afterEach(() => vi.unstubAllGlobals())

const path = '/ui-blocks/drawers'
async function mountAt(url: string) {
  // Only the page under test is needed, so the app's full route table is not loaded.
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path, component: RouteDrawerBlock }],
  })
  await router.push(url)
  await router.isReady()
  const wrapper = mount(defineComponent({ render: () => h(RouterView) }), {
    global: { plugins: [PrimeVue, router], stubs: { transition: false } },
    attachTo: document.body,
  })
  await flushPromises()
  return { router, wrapper }
}
const drawer = () => document.querySelector<HTMLElement>('.p-drawer')
const view = (id: string) =>
  Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(
    (button) => button.getAttribute('aria-label') === `View order ${id}`,
  )!

it('puts the open record in the address and clears it on close, staying on the page', async () => {
  const { router } = await mountAt(`${path}?tab=code`)
  expect(drawer()).toBeNull()

  view('FTF-1043').click()
  await flushPromises()
  expect(router.currentRoute.value.query).toEqual({ tab: 'code', record: 'FTF-1043' })
  expect(drawer()?.textContent).toContain('Savanna Grocers')

  document.querySelector<HTMLButtonElement>('.p-drawer-close-button')!.click()
  await flushPromises()
  expect(router.currentRoute.value.path).toBe(path)
  expect(router.currentRoute.value.query).toEqual({ tab: 'code' })
  await expect.poll(drawer).toBeNull()
})

it('closes with Back and reopens with Forward', async () => {
  const { router } = await mountAt(path)
  view('FTF-1042').click()
  await flushPromises()
  expect(drawer()).not.toBeNull()

  router.back()
  await flushPromises()
  expect(router.currentRoute.value.query).toEqual({})
  await expect.poll(drawer).toBeNull()

  router.forward()
  await flushPromises()
  expect(router.currentRoute.value.query.record).toBe('FTF-1042')
  expect(drawer()).not.toBeNull()
})

it('opens from a shared link and closing it does not leave the page', async () => {
  const { router } = await mountAt(`${path}?record=FTF-1044`)
  expect(drawer()?.textContent).toContain('Lakeside Foods')

  document.querySelector<HTMLButtonElement>('.p-drawer-close-button')!.click()
  await flushPromises()
  expect(router.currentRoute.value.fullPath).toBe(path)
  await expect.poll(drawer).toBeNull()
})

it('ignores an unknown record id and removes it from the address', async () => {
  const { router } = await mountAt(`${path}?record=FTF-9999`)
  await expect.poll(drawer).toBeNull()
  expect(router.currentRoute.value.query).toEqual({})
})

it('switching records keeps one Back step to close', async () => {
  const { router } = await mountAt(path)
  view('FTF-1042').click()
  await flushPromises()
  view('FTF-1043').click()
  await flushPromises()
  expect(drawer()?.textContent).toContain('Savanna Grocers')
  router.back()
  await flushPromises()
  await expect.poll(drawer).toBeNull()
})

it('copies the current link and announces it politely', async () => {
  const writeText = vi.fn().mockResolvedValue(undefined)
  vi.stubGlobal('navigator', { clipboard: { writeText } })
  await mountAt(`${path}?record=FTF-1042`)
  document.querySelector<HTMLButtonElement>('button[aria-label="Copy link"]')!.click()
  await flushPromises()
  expect(writeText).toHaveBeenCalledWith(location.href)
  expect(drawer()?.querySelector('[role="status"]')?.textContent).toBe('Link copied')
})
