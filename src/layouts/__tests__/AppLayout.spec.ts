import { afterEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import { nextTick } from 'vue'
import AppLayout from '../AppLayout.vue'
import { createDocsRouter } from './docs-router'

enableAutoUnmount(afterEach)
afterEach(() => {
  vi.unstubAllGlobals()
})

async function mountLayout(desktop: boolean) {
  const media = {
    matches: desktop,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => media),
  )
  const router = createDocsRouter()
  await router.push('/')
  await router.isReady()
  const wrapper = mount(AppLayout, {
    attachTo: document.body,
    global: { plugins: [PrimeVue, router], stubs: { transition: false } },
    slots: { default: '<h1>Documentation</h1>' },
  })
  return { wrapper, media }
}

it('starts open on desktop, toggles the sidebar, and resets it when the viewport changes', async () => {
  const { wrapper, media } = await mountLayout(true)
  const toggle = () => wrapper.get('#sidebar-toggle')
  expect(wrapper.get('header').classes()).toContain('h-14')
  expect(wrapper.get('main').classes()).toContain('pt-14')

  const userMenu = wrapper.get('#user-menu-trigger')
  expect(userMenu.attributes('aria-expanded')).toBe('false')
  await userMenu.trigger('click')
  await flushPromises()
  await expect.poll(() => userMenu.attributes('aria-expanded')).toBe('true')
  await expect
    .poll(() => document.getElementById('user-menu')?.textContent)
    .toContain('Amina Hassan')
  expect(document.getElementById('user-menu')?.textContent).toContain('Profile')

  expect(toggle().attributes('aria-expanded')).toBe('true')
  expect(wrapper.get('aside').classes()).toContain('w-64')
  expect(wrapper.get('main').element.parentElement?.classList.contains('lg:pl-64')).toBe(true)
  expect(wrapper.find('aside #sidebar-toggle').exists()).toBe(true)
  expect(wrapper.find('header #sidebar-toggle').exists()).toBe(false)

  await toggle().trigger('click')
  expect(toggle().attributes('aria-expanded')).toBe('false')
  expect(wrapper.get('main').element.parentElement?.classList.contains('lg:pl-64')).toBe(false)
  expect(wrapper.find('header #sidebar-toggle').exists()).toBe(true)
  expect(wrapper.findAll('#sidebar-toggle')).toHaveLength(1)
  expect(wrapper.get('aside').attributes()).toHaveProperty('inert')

  await toggle().trigger('click')
  expect(toggle().attributes('aria-expanded')).toBe('true')
  expect(wrapper.find('aside #sidebar-toggle').exists()).toBe(true)

  const onChange = media.addEventListener.mock.calls[0]![1]
  onChange({ matches: false })
  await nextTick()
  expect(wrapper.find('aside').exists()).toBe(false)
  expect(toggle().attributes('aria-expanded')).toBe('false')

  onChange({ matches: true })
  await nextTick()
  expect(wrapper.find('aside').exists()).toBe(true)
  expect(toggle().attributes('aria-expanded')).toBe('true')
  wrapper.unmount()
  expect(media.removeEventListener).toHaveBeenCalledWith('change', onChange)
})

it('starts closed on mobile and dismisses the drawer after selecting a section', async () => {
  const { wrapper } = await mountLayout(false)
  const toggle = wrapper.get('#sidebar-toggle')
  expect(toggle.attributes('aria-expanded')).toBe('false')

  await toggle.trigger('click')
  expect(toggle.attributes('aria-expanded')).toBe('true')
  expect(document.getElementById('app-sidebar')?.classList.contains('w-64')).toBe(true)
  const link = document.querySelector<HTMLAnchorElement>(
    '#app-sidebar a[href="/foundations/color"]',
  )!
  expect(link).not.toBeNull()
  link.click()
  await flushPromises()
  expect(toggle.attributes('aria-expanded')).toBe('false')
})
