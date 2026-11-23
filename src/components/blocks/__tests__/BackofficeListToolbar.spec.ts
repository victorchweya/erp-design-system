import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import SupplierOrdersListBlock from '../backoffice/list-toolbar/SupplierOrdersListBlock.vue'

enableAutoUnmount(afterEach)
beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }))
  vi.stubGlobal(
    'ResizeObserver',
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    },
  )
})
afterEach(() => vi.unstubAllGlobals())
const options = {
  global: { plugins: [PrimeVue], stubs: { transition: false } },
  attachTo: document.body,
}
const click = async (element: Element) => {
  element.dispatchEvent(new MouseEvent('click', { bubbles: true }))
  await flushPromises()
}
const button = (wrapper: Pick<VueWrapper, 'findAll'>, text: RegExp) =>
  wrapper
    .findAll('button')
    .find((button) => text.test(button.attributes('aria-label') ?? button.text()))!
const chips = (wrapper: Pick<VueWrapper, 'findAll'>) =>
  wrapper.findAll('[aria-label="Applied filters"] li').map((chip) => chip.text())
async function pickOption(combobox: Element, text: string) {
  await click(combobox.closest('[data-pc-name]')!)
  await click(
    Array.from(document.querySelectorAll('[role="option"]')).find(
      (option) => option.textContent?.trim() === text,
    )!,
  )
  // Close the list so the next control can be used.
  document.body.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  await flushPromises()
}
const comboboxFor = (label: string) =>
  document
    .querySelector<HTMLElement>(`label[for$="-${label}"]`)!
    .parentElement!.querySelector('[role="combobox"]')!
const rowCount = (wrapper: Pick<VueWrapper, 'findAll'>) => wrapper.findAll('tbody tr').length

it('removes only the chosen filter chip and clears every filter and the popover count', async () => {
  const wrapper = mount(SupplierOrdersListBlock, options)
  await wrapper.get('input[type="search"]').setValue('Kijani')
  await pickOption(comboboxFor('status'), 'Accepted')
  expect(chips(wrapper)).toHaveLength(2)
  expect(rowCount(wrapper)).toBe(1)

  await click(document.querySelector('[aria-label="Remove filter Status: Accepted"]')!)
  expect(chips(wrapper)).toEqual(['Search: Kijani'])
  expect(rowCount(wrapper)).toBe(2)

  await click(button(wrapper, /^More filters$/).element)
  await pickOption(comboboxFor('segment'), 'Farmer')
  expect(button(wrapper, /More filters/).text()).toBe('More filters (1)')
  expect(chips(wrapper)).toHaveLength(2)

  await click(button(wrapper, /Clear filters/).element)
  expect(chips(wrapper)).toHaveLength(0)
  expect(rowCount(wrapper)).toBe(12)
  expect(wrapper.get<HTMLInputElement>('input[type="search"]').element.value).toBe('')
  expect(button(wrapper, /More filters/).text()).toBe('More filters')
  // Nothing is applied, so there is nothing left to clear.
  expect(button(wrapper, /Clear filters/)).toBeUndefined()
  expect(document.activeElement).toBe(wrapper.get('input[type="search"]').element)
})

it('lets people hide columns but never the locked column', async () => {
  const wrapper = mount(SupplierOrdersListBlock, options)
  await click(button(wrapper, /^Columns$/).element)
  const checkbox = (label: string) =>
    Array.from(document.querySelectorAll('label'))
      .find((item) => item.textContent?.trim().startsWith(label))!
      .parentElement!.querySelector<HTMLInputElement>('input')!
  expect(checkbox('Order').disabled).toBe(true)
  expect(checkbox('Order').checked).toBe(true)

  await click(checkbox('Supplier segment'))
  const headers = () => wrapper.findAll('th').map((header) => header.text())
  expect(headers()).not.toContain('Supplier segment')
  expect(headers()).toContain('Order')

  await click(
    Array.from(document.querySelectorAll('button')).find((b) => b.textContent === 'Show all')!,
  )
  expect(headers()).toContain('Supplier segment')
})
