import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import RecordDetailsBlock, {
  type RecordDetailSection,
} from '../backoffice/record-details/RecordDetailsBlock.vue'

enableAutoUnmount(afterEach)
const global = { plugins: [PrimeVue] }
const writeText = vi.fn()
beforeEach(() => {
  writeText.mockReset().mockResolvedValue(undefined)
  vi.stubGlobal('navigator', { clipboard: { writeText } })
})
afterEach(() => vi.unstubAllGlobals())

const sections: RecordDetailSection[] = [
  {
    id: 'payment',
    title: 'Payment',
    items: [
      { key: 'invoice', label: 'Invoice number', value: 'INV-2026-0412', copyable: true },
      { key: 'amount', label: 'Amount', value: 44600, kind: 'currency' },
      { key: 'note', label: 'Note', value: '  ', copyable: true },
    ],
  },
]
const render = (props: Record<string, unknown> = {}) =>
  mount(RecordDetailsBlock, { global, props: { title: 'Payment PAY-20418', sections, ...props } })

it('shows a fallback for empty values and reads it as not provided', () => {
  const wrapper = render()
  const note = wrapper.findAll('dt').find((dt) => dt.text() === 'Note')!.element
    .nextElementSibling as HTMLElement
  expect(note.querySelector('[aria-hidden="true"]')?.textContent).toBe('—')
  expect(note.querySelector('.sr-only')?.textContent).toBe('Not provided')
  // Nothing to copy, so no copy button for an empty value.
  expect(note.querySelector('button')).toBeNull()
})

it('honours the heading level and nests group headings below it', async () => {
  const wrapper = render({ headingTag: 'h1' })
  expect(wrapper.findAll('h1')).toHaveLength(1)
  expect(wrapper.get('h2').text()).toBe('Payment')
  await wrapper.setProps({ headingTag: 'h3' })
  expect(wrapper.find('h1').exists()).toBe(false)
  expect(wrapper.get('h3').text()).toBe('Payment PAY-20418')
  expect(wrapper.get('h4').text()).toBe('Payment')
})

it('copies the raw value from a labelled button and announces it', async () => {
  const wrapper = render()
  const status = wrapper.get('[role="status"]')
  expect(status.text()).toBe('')
  await wrapper.get('button[aria-label="Copy invoice number"]').trigger('click')
  await flushPromises()
  expect(writeText).toHaveBeenCalledWith('INV-2026-0412')
  expect(status.text()).toBe('Invoice number copied')
  expect(wrapper.emitted('copied')).toHaveLength(1)
})

it('tells the user when copying is blocked', async () => {
  writeText.mockRejectedValue(new Error('denied'))
  const wrapper = render()
  await wrapper.get('button[aria-label="Copy invoice number"]').trigger('click')
  await flushPromises()
  expect(wrapper.get('[role="alert"]').text()).toContain('Couldn’t copy invoice number')
  expect(wrapper.emitted('copied')).toBeUndefined()
})

it('shows credit as text and flags an over-limit account without relying on the bar', () => {
  const wrapper = render({ credit: { limit: 100000, used: 120000 } })
  expect(wrapper.get('[role="progressbar"]').attributes('aria-valuenow')).toBe('100')
  expect(wrapper.text()).toContain('Over limit')
  // The amounts are readable text, so the bar is never the only source.
  expect(wrapper.text()).toContain('120,000')
  expect(wrapper.text()).toContain('100,000')
})
