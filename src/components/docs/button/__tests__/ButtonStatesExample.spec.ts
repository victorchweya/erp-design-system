import { afterEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ButtonStatesExample from '../examples/ButtonStatesExample.vue'

enableAutoUnmount(afterEach)
afterEach(() => vi.useRealTimers())

it('blocks repeat actions while busy and restores interaction after completion', async () => {
  vi.useFakeTimers()
  const wrapper = mount(ButtonStatesExample, { global: { plugins: [PrimeVue] } })
  const button = wrapper.get<HTMLButtonElement>('button[aria-busy]')

  await button.trigger('click')
  expect(button.attributes('aria-busy')).toBe('true')
  expect(button.element.disabled).toBe(true)
  expect(wrapper.get('[role="status"]').text()).toMatch(/processing/i)

  await button.trigger('click')
  await vi.advanceTimersByTimeAsync(1200)
  expect(button.attributes('aria-busy')).toBe('false')
  expect(button.element.disabled).toBe(false)
  expect(wrapper.get('[role="status"]').text()).toMatch(/complete/i)

  await button.trigger('click')
  wrapper.unmount()
  expect(vi.getTimerCount()).toBe(0)
})
