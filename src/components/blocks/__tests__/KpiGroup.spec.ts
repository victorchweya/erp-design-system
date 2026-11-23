import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import KpiGroupBlock from '../metrics/KpiGroupBlock.vue'

enableAutoUnmount(afterEach)

const kpis = [
  { label: 'Received', value: 18420, unit: 'kg', detail: 'November', markerClass: 'bg-info' },
  { label: 'Rejected', value: null, unit: 'kg', detail: 'Not recorded', markerClass: 'bg-warn' },
  { label: 'Dispatched', value: '4,860 kg', detail: 'November', markerClass: 'bg-primary' },
]
const valueOf = (wrapper: ReturnType<typeof mount>, label: string) =>
  wrapper.findAll('dt').find((dt) => dt.text() === label)!.element.nextElementSibling as HTMLElement

it('shows the unit with a value and reads a missing value as not available', () => {
  const wrapper = mount(KpiGroupBlock, { global: { plugins: [PrimeVue] }, props: { kpis } })

  expect(valueOf(wrapper, 'Received').textContent?.replace(/\s+/g, ' ').trim()).toBe('18,420 kg')
  // Text values keep working as before, with no unit added.
  expect(valueOf(wrapper, 'Dispatched').textContent?.trim()).toBe('4,860 kg')

  const missing = valueOf(wrapper, 'Rejected')
  expect(missing.querySelector('[aria-hidden="true"]')?.textContent).toBe('—')
  expect(missing.querySelector('.sr-only')?.textContent).toBe('Not available')
  // A unit on its own would read as a measure of nothing.
  expect(missing.textContent).not.toContain('kg')
})
