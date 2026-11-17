import { afterEach, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'

afterEach(() => {
  vi.unstubAllGlobals()
  localStorage.clear()
  document.documentElement.classList.remove('app-dark')
})

it('switches modes and updates the accessible action label', async () => {
  localStorage.setItem('erp-color-mode', 'light')
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: false })),
  )
  const { default: ColorModeToggle } = await import('../ColorModeToggle.vue')
  const wrapper = mount(ColorModeToggle, { global: { plugins: [PrimeVue] } })

  await wrapper.get('button[aria-label="Switch to dark mode"]').trigger('click')
  expect(document.documentElement.classList.contains('app-dark')).toBe(true)
  expect(localStorage.getItem('erp-color-mode')).toBe('dark')

  await wrapper.get('button[aria-label="Switch to light mode"]').trigger('click')
  expect(document.documentElement.classList.contains('app-dark')).toBe(false)
  expect(localStorage.getItem('erp-color-mode')).toBe('light')
  expect(wrapper.get('button').attributes('aria-label')).toBe('Switch to dark mode')
  expect(wrapper.get('svg').attributes('aria-hidden')).toBe('true')
  wrapper.unmount()
})
