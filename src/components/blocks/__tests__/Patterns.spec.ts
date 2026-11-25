import { afterEach, beforeEach, expect, it, onTestFinished, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import { defineComponent, h } from 'vue'
import { RouterView } from 'vue-router'
import OrdersTableBlock from '../tables/OrdersTableBlock.vue'
import DataStressTableBlock from '../tables/DataStressTableBlock.vue'
import BulkActionsTableBlock from '../tables/BulkActionsTableBlock.vue'
import SupplierFormBlock from '../forms/SupplierFormBlock.vue'
import FilterFormBlock from '../forms/FilterFormBlock.vue'
import EditDrawerBlock from '../drawers/EditDrawerBlock.vue'
import RecordDrawerBlock from '../drawers/RecordDrawerBlock.vue'
import DrawerWidthsBlock from '../drawers/DrawerWidthsBlock.vue'
import ConfirmationModalBlock from '../modals/ConfirmationModalBlock.vue'
import AssignmentModalBlock from '../modals/AssignmentModalBlock.vue'
import RecordTabsBlock from '../navigation/RecordTabsBlock.vue'
import RetryAlertBlock from '../feedback/RetryAlertBlock.vue'
import ActionAlertBlock from '../feedback/ActionAlertBlock.vue'
import EmptyStateWithActionBlock from '../empty-states/EmptyStateWithActionBlock.vue'
import ConfirmPopupBlock from '../popups/ConfirmPopupBlock.vue'
import RecordPopoverBlock from '../popups/RecordPopoverBlock.vue'
import ActionsMenuBlock from '../popups/ActionsMenuBlock.vue'
import OrderEntryBlock from '../order-entry/OrderEntryBlock.vue'
import OrderDetailBlock from '../backoffice/order-detail/OrderDetailBlock.vue'
import CustomerOrdersTable from '../backoffice/customer-detail/CustomerOrdersTable.vue'
import { STANDARD_VAT_RATE, taxableOf, vatOf } from '../documents/documents'
import OperationsDashboardBlock from '../page-templates/OperationsDashboardBlock.vue'
import SupplierListDetailBlock from '../page-templates/SupplierListDetailBlock.vue'
import { createDocsRouter } from '@/layouts/__tests__/docs-router'

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
  global: { plugins: [PrimeVue, ConfirmationService], stubs: { transition: false } },
  attachTo: document.body,
}
const button = (wrapper: Pick<VueWrapper, 'findAll'>, text: RegExp) =>
  wrapper.findAll('button').find((button) => text.test(button.text()))!
const dialog = () => document.querySelector<HTMLElement>('[role="dialog"], [role="alertdialog"]')!
const click = async (element: HTMLElement) => {
  element.click()
  await flushPromises()
}
const modalButton = (text: RegExp) =>
  Array.from(dialog().querySelectorAll<HTMLButtonElement>('button')).find((button) =>
    text.test(button.textContent?.trim() ?? ''),
  )!
async function selectOption(element: HTMLElement, text: string) {
  await click(element)
  await expect.poll(() => document.querySelectorAll('[role="option"]').length).toBeGreaterThan(0)
  await click(
    Array.from(document.querySelectorAll<HTMLElement>('[role="option"]')).find(
      (option) => option.textContent?.trim() === text,
    )!,
  )
}

it('opens focused delivery details from the order summary', async () => {
  const wrapper = mount(OrderDetailBlock, options)
  await button(wrapper, /^Delivery details$/).trigger('click')
  await flushPromises()

  expect(dialog().textContent).toContain('Map preview placeholder')
  expect(dialog().textContent).toContain('Call the contact on arrival.')
  expect(dialog().textContent).not.toContain('KRA PIN')
})

it('filters customer orders by search and status', async () => {
  const wrapper = mount(CustomerOrdersTable, options)
  await wrapper.get('[aria-label="Search customer orders"]').setValue('Village')

  expect(wrapper.text()).toContain('CO-2025-08-528')
  expect(wrapper.text()).not.toContain('CO-2026-07-014')

  await wrapper.get('[aria-label="Search customer orders"]').setValue('')
  await button(wrapper, /^Filter$/).trigger('click')
  await flushPromises()
  await selectOption(
    document.querySelector<HTMLElement>('[aria-label="Filter orders by status"]')!,
    'New',
  )
  expect(wrapper.text()).toContain('CO-2026-07-014')
  expect(wrapper.text()).not.toContain('CO-2025-08-528')

  const search = wrapper.get<HTMLInputElement>('[aria-label="Search customer orders"]')
  await search.setValue('Village')
  await wrapper.get('[aria-label="Clear customer order search"]').trigger('click')
  expect(search.element.value).toBe('')
  expect(document.activeElement).toBe(search.element)
  expect(wrapper.find('[aria-label="Clear customer order search"]').exists()).toBe(false)
  // Clearing the text keeps the New status filter applied.
  expect(wrapper.text()).toContain('CO-2026-07-014')
  expect(wrapper.text()).not.toContain('CO-2025-08-528')
})

it('keeps the order identifier visible, restores columns, and exports filtered rows', async () => {
  const wrapper = mount(DataStressTableBlock, options)
  await wrapper.get('[aria-label="Columns"]').trigger('click')
  await flushPromises()
  const checkbox = (key: string) =>
    document.querySelector<HTMLInputElement>(`input[id$="-column-${key}"]`)!
  expect(checkbox('orderNumber').disabled).toBe(true)
  expect(checkbox('orderNumber').checked).toBe(true)
  await click(checkbox('customer'))
  expect(wrapper.findAll('th').some((cell) => cell.text() === 'Customer')).toBe(false)
  await wrapper.get('[aria-label="Search order or customer"]').setValue('Aero')
  const createObjectURL = vi.fn((_blob: Blob) => 'blob:orders')
  vi.stubGlobal('URL', { createObjectURL, revokeObjectURL: vi.fn() })
  const download = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {})
  onTestFinished(() => download.mockRestore())
  await button(wrapper, /^Export$/).trigger('click')
  const csv = await new Promise<string>((resolve) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.readAsText(createObjectURL.mock.calls[0]![0] as unknown as Blob)
  })
  expect(csv).toContain('CO-2026-11-003')
  expect(csv).not.toContain('CO-2026-11-004')
  expect(csv).not.toContain('"Customer"')
  await wrapper.get('[aria-label="Refresh"]').trigger('click')
  expect(wrapper.findAll('tbody tr')).toHaveLength(1)
  expect(wrapper.findAll('th').some((cell) => cell.text() === 'Customer')).toBe(false)
  const showAll = Array.from(document.querySelectorAll<HTMLButtonElement>('button')).find(
    (b) => b.textContent === 'Show all',
  )!
  await click(showAll)
  expect(wrapper.findAll('th').some((cell) => cell.text() === 'Customer')).toBe(true)
})

it('recovers from an empty sales-orders table by clearing its search', async () => {
  const wrapper = mount(DataStressTableBlock, options)
  await wrapper.get('[aria-label="Search order or customer"]').setValue('no matching order')
  expect(wrapper.findAll('tbody tr')).toHaveLength(1)
  await button(wrapper, /Reset filters/).trigger('click')
  expect(wrapper.findAll('tbody tr')).toHaveLength(3)
})

it('combines table filters and returns to the first page after a search', async () => {
  const wrapper = mount(OrdersTableBlock, options)
  await flushPromises()
  await wrapper
    .findAll('button')
    .find((button) => /next/i.test(button.attributes('aria-label') ?? ''))!
    .trigger('click')
  expect(wrapper.get('tbody').text()).not.toContain('FTF-1042')
  await wrapper.get('input').setValue(' Green Basket ')
  expect(wrapper.get('tbody').text()).toContain('FTF-1042')
  expect(wrapper.get('tbody').text()).toContain('FTF-1046')
  await selectOption(wrapper.get<HTMLElement>('[role="combobox"]').element, 'Pending')
  expect(wrapper.get('tbody').text()).toContain('FTF-1046')
  expect(wrapper.get('tbody').text()).not.toContain('FTF-1042')
  await wrapper.get('input').setValue('no matching order')
  expect(wrapper.findAll('tbody tr')).toHaveLength(1)
  await button(wrapper, /Reset search/).trigger('click')
  expect(wrapper.get('tbody').text()).toContain('FTF-1042')
  expect(wrapper.findAll('tbody tr')).toHaveLength(5)
})

it('confirms only selected orders and clears the bulk selection', async () => {
  const wrapper = mount(BulkActionsTableBlock, options)
  const action = button(wrapper, /Confirm selected/)
  expect(action.attributes('disabled')).toBeDefined()
  await wrapper.get('tbody input[type="checkbox"]').setValue(true)
  expect(action.attributes('disabled')).toBeUndefined()
  await action.trigger('click')
  const rows = wrapper.findAll('tbody tr')
  expect(rows[0]!.text()).toContain('Confirmed')
  expect(rows[1]!.text()).toContain('Pending')
  expect(rows[2]!.text()).toContain('Pending')
  expect(action.attributes('disabled')).toBeDefined()
  expect(wrapper.get<HTMLInputElement>('tbody input[type="checkbox"]').element.checked).toBe(false)
})

it('validates supplier details, saves trimmed values, and resets the form', async () => {
  const wrapper = mount(SupplierFormBlock, options)
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  expect(wrapper.findAll('[role="alert"]').length).toBeGreaterThan(0)
  expect(wrapper.get('[role="status"]').text()).toBe('')
  await wrapper.get('input[name="name"]').setValue('   ')
  await wrapper.get('input[name="email"]').setValue('invalid-email')
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  expect(wrapper.get('[role="status"]').text()).toBe('')
  await wrapper.get('input[name="name"]').setValue('  Valley Growers  ')
  await wrapper.get('input[name="email"]').setValue('team@example.com')
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).toContain('Saved Valley Growers')
  await wrapper.get('button[type="reset"]').trigger('click')
  await flushPromises()
  expect(wrapper.get<HTMLInputElement>('input[name="name"]').element.value).toBe('')
  expect(wrapper.get('[role="status"]').text()).toBe('')
})

it('applies draft filters only on submit and clears the applied result on reset', async () => {
  const wrapper = mount(FilterFormBlock, options)
  const initial = wrapper.get('[role="status"]').text()
  await wrapper.get('input').setValue('Kijani')
  expect(wrapper.get('[role="status"]').text()).toBe(initial)
  await wrapper.get('form').trigger('submit')
  expect(wrapper.get('[role="status"]').text()).toContain('Kijani')
  await wrapper.get('button[type="reset"]').trigger('click')
  await flushPromises()
  expect(wrapper.get<HTMLInputElement>('input').element.value).toBe('')
  expect(wrapper.get('[role="status"]').text()).toBe(initial)
})

it('discards cancelled drawer edits and validates before committing through its footer', async () => {
  const wrapper = mount(EditDrawerBlock, options)
  const trigger = button(wrapper, /Edit delivery/)
  await flushPromises()
  trigger.element.focus()
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  const original = dialog().querySelector('textarea')!.value
  const field = dialog().querySelector('textarea')!
  field.value = 'Discard this address'
  field.dispatchEvent(new Event('input', { bubbles: true }))
  await click(modalButton(/Cancel/))
  await expect.poll(() => !!dialog()).toBe(false)
  await expect.poll(() => document.activeElement).toBe(trigger.element)
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  const draft = dialog().querySelector('textarea')!
  expect(draft.value).toBe(original)
  draft.value = '   '
  draft.dispatchEvent(new Event('input', { bubbles: true }))
  await click(modalButton(/Save changes/))
  expect(dialog().querySelector('[role="alert"]')).not.toBeNull()
  draft.value = '  22 Garden Lane  '
  draft.dispatchEvent(new Event('input', { bubbles: true }))
  await click(modalButton(/Save changes/))
  await expect.poll(() => !!dialog()).toBe(false)
  expect(wrapper.text()).toContain('22 Garden Lane')
  expect(wrapper.get('[role="status"]').text()).not.toBe('')
})

it('closes a record drawer on Escape and restores trigger focus', async () => {
  const wrapper = mount(RecordDrawerBlock, options)
  const trigger = button(wrapper, /View order/)
  await flushPromises()
  trigger.element.focus()
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  await expect.poll(() => dialog().contains(document.activeElement)).toBe(true)
  document.dispatchEvent(
    new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape', bubbles: true }),
  )
  await expect.poll(() => !!dialog()).toBe(false)
  await expect.poll(() => document.activeElement).toBe(trigger.element)
})

it('opens each drawer width from its own trigger and restores focus after closing', async () => {
  const wrapper = mount(DrawerWidthsBlock, options)
  await flushPromises()
  const triggers = wrapper.findAll('button')
  expect(triggers).toHaveLength(4)
  for (const [index, trigger] of triggers.entries()) {
    trigger.element.focus()
    await trigger.trigger('click')
    await expect.poll(() => !!dialog()).toBe(true)
    expect(dialog().getAttribute('aria-label')).toContain(trigger.text())
    expect(trigger.attributes('aria-expanded')).toBe('true')
    expect(wrapper.findAll('button[aria-expanded="true"]')).toHaveLength(1)
    await expect.poll(() => dialog().contains(document.activeElement)).toBe(true)
    if (index === 0) await click(modalButton(/Close drawer/))
    else
      document.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }),
      )
    await expect.poll(() => !!dialog()).toBe(false)
    expect(trigger.attributes('aria-expanded')).toBe('false')
    await expect.poll(() => document.activeElement).toBe(trigger.element)
  }
})

it('cancels confirmation without changing the order and confirms only on the explicit action', async () => {
  const wrapper = mount(ConfirmationModalBlock, options)
  const trigger = button(wrapper, /Review confirmation/)
  await flushPromises()
  trigger.element.focus()
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  await expect.poll(() => document.activeElement).toBe(modalButton(/Cancel/))
  await click(modalButton(/Cancel/))
  await expect.poll(() => !!dialog()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).toBe('')
  await expect.poll(() => document.activeElement).toBe(trigger.element)
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  await click(modalButton(/Confirm order/))
  await expect.poll(() => !!dialog()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).toContain('confirmed')
})

it('validates an assignment and discards a cancelled selection before saving', async () => {
  const wrapper = mount(AssignmentModalBlock, options)
  const trigger = button(wrapper, /Assign order/)
  const initial = wrapper.get('[role="status"]').text()
  await flushPromises()
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  await click(modalButton(/Save assignment/))
  expect(dialog().querySelector('[role="alert"]')).not.toBeNull()
  await selectOption(dialog().querySelector<HTMLElement>('[role="combobox"]')!, 'Amina Hassan')
  await click(modalButton(/Cancel/))
  await expect.poll(() => !!dialog()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).toBe(initial)
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  expect(dialog().textContent).not.toContain('Amina Hassan')
  await selectOption(dialog().querySelector<HTMLElement>('[role="combobox"]')!, 'Brian Otieno')
  await click(modalButton(/Save assignment/))
  await expect.poll(() => !!dialog()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).toContain('Brian Otieno')
})

it('switches record content with its named tabs', async () => {
  const wrapper = mount(RecordTabsBlock, options)
  const items = wrapper.findAll('[role="tab"]').find((tab) => tab.text() === 'Items')!
  await items.trigger('click')
  expect(items.attributes('aria-selected')).toBe('true')
  const panel = wrapper.get(`[id="${items.attributes('aria-controls')}"]`)
  expect(panel.isVisible()).toBe(true)
  expect(panel.text()).toContain('Kale')
})

it('opens only the requested confirmation and leaves records unchanged when dismissed', async () => {
  const wrapper = mount(
    defineComponent({
      components: { ConfirmationModalBlock, ConfirmPopupBlock },
      template: '<div><ConfirmationModalBlock /><ConfirmPopupBlock /></div>',
    }),
    options,
  )
  await flushPromises()
  const popup = wrapper.getComponent(ConfirmPopupBlock)
  const modal = wrapper.getComponent(ConfirmationModalBlock)
  const popupTrigger = button(popup, /^Archive draft$/)
  popupTrigger.element.focus()
  await popupTrigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  expect(document.querySelectorAll('[role="alertdialog"]')).toHaveLength(1)
  await expect.poll(() => document.activeElement).toBe(modalButton(/Keep draft/))
  await click(modalButton(/Keep draft/))
  await expect.poll(() => !!dialog()).toBe(false)
  expect(popup.get('[role="status"]').text()).toBe('')
  expect(popupTrigger.attributes('aria-expanded')).toBe('false')
  await expect.poll(() => document.activeElement).toBe(popupTrigger.element)

  await button(modal, /Review confirmation/).trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  expect(document.querySelectorAll('[role="alertdialog"]')).toHaveLength(1)
  await click(modalButton(/Confirm order/))
  await expect.poll(() => !!dialog()).toBe(false)
  expect(modal.get('[role="status"]').text()).toContain('confirmed')
  expect(popup.get('[role="status"]').text()).toBe('')

  await popupTrigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  await expect.poll(() => document.activeElement).toBe(modalButton(/Keep draft/))
  await click(modalButton(/^Archive draft$/))
  await expect.poll(() => !!dialog()).toBe(false)
  expect(popup.get('[role="status"]').text()).toContain('archived')
  expect(popupTrigger.attributes('aria-expanded')).toBe('false')
})

it('dismisses a confirmation popup with Escape without accepting the action', async () => {
  const wrapper = mount(ConfirmPopupBlock, options)
  const trigger = button(wrapper, /^Archive draft$/)
  await flushPromises()
  trigger.element.focus()
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  await expect.poll(() => dialog().contains(document.activeElement)).toBe(true)
  document.activeElement?.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }),
  )
  await expect.poll(() => !!dialog()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).toBe('')
  expect(trigger.attributes('aria-expanded')).toBe('false')
  await expect.poll(() => document.activeElement).toBe(trigger.element)
})

it('opens a labelled quick view and restores focus after Close or Escape', async () => {
  const wrapper = mount(RecordPopoverBlock, options)
  const trigger = button(wrapper, /Quick view/)
  await flushPromises()
  trigger.element.focus()
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  const labelId = dialog().getAttribute('aria-labelledby')!
  expect(document.getElementById(labelId)?.textContent).toContain('Green Basket')
  expect(dialog().textContent).toContain('Market Road')
  await click(modalButton(/Close quick view/))
  await expect.poll(() => !!dialog()).toBe(false)
  expect(trigger.attributes('aria-expanded')).toBe('false')
  await expect.poll(() => document.activeElement).toBe(trigger.element)
  await trigger.trigger('click')
  await expect.poll(() => !!dialog()).toBe(true)
  await expect.poll(() => dialog().contains(document.activeElement)).toBe(true)
  document.activeElement?.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }),
  )
  await expect.poll(() => !!dialog()).toBe(false)
  await expect.poll(() => document.activeElement).toBe(trigger.element)
})

it('runs a popup menu command and restores focus on Escape', async () => {
  const wrapper = mount(ActionsMenuBlock, options)
  const trigger = button(wrapper, /Order actions/)
  await flushPromises()
  trigger.element.focus()
  await trigger.trigger('click')
  await expect.poll(() => trigger.attributes('aria-expanded')).toBe('true')
  const item = Array.from(document.querySelectorAll<HTMLElement>('[role="menuitem"]')).find(
    (item) => item.textContent?.includes('Duplicate'),
  )!
  await click(item)
  await expect.poll(() => trigger.attributes('aria-expanded')).toBe('false')
  expect(wrapper.get('[role="status"]').text()).toContain('Duplicate')
  await trigger.trigger('click')
  await expect.poll(() => trigger.attributes('aria-expanded')).toBe('true')
  document.activeElement?.dispatchEvent(
    new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }),
  )
  await expect.poll(() => trigger.attributes('aria-expanded')).toBe('false')
  expect(document.activeElement).toBe(trigger.element)
})

it.each([RetryAlertBlock, EmptyStateWithActionBlock])(
  'provides feedback and a way to restore its initial state',
  async (component) => {
    const wrapper = mount(component, options)
    const initial = wrapper.text()
    await wrapper
      .findAll('button')
      .find((button) => button.text().trim())!
      .trigger('click')
    expect(wrapper.text()).not.toBe(initial)
    await wrapper
      .findAll('button')
      .find((button) => button.text().trim())!
      .trigger('click')
    expect(wrapper.text()).toBe(initial)
  },
)

it('announces feedback alert actions without replacing the notices', async () => {
  const wrapper = mount(ActionAlertBlock, options)
  const notices = wrapper.findAll('[role="alert"]').length
  await button(wrapper, /Search customers/).trigger('click')
  expect(wrapper.get('[aria-live="polite"]').text()).not.toBe('')
  expect(wrapper.findAll('[role="alert"]')).toHaveLength(notices)
})

it.each([RetryAlertBlock])(
  'lets a dismissed notice be restored and used again',
  async (component) => {
    const wrapper = mount(component, options)
    const initial = wrapper.text()
    const dismiss = wrapper
      .findAll('button')
      .find((button) => button.attributes('aria-label')?.startsWith('Dismiss'))!
    await dismiss.trigger('click')
    await expect.poll(() => wrapper.find('[role="alert"]').exists()).toBe(false)
    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).toBe(initial)
    await wrapper
      .findAll('button')
      .find((button) => button.text().trim())!
      .trigger('click')
    expect(wrapper.find('[role="alert"]').exists()).toBe(true)
    expect(wrapper.text()).not.toBe(initial)
  },
)

it('recalculates order totals and credit needs after quantity changes and item removal', async () => {
  const wrapper = mount(OrderEntryBlock, options)
  const totals = () => wrapper.get('[aria-label="Order totals"]').text()
  expect(totals()).toContain('51,800')
  expect(button(wrapper, /Prepare payment request/).exists()).toBe(true)
  const quantity = wrapper.get<HTMLInputElement>('input[aria-label="Tomatoes quantity"]')
  quantity.element.value = '2'
  await quantity.trigger('blur')
  expect(totals()).toContain('39,800')
  expect(button(wrapper, /Confirm order/).exists()).toBe(true)
  expect(wrapper.find('input[type="radio"]').exists()).toBe(false)
  await wrapper.get('button[aria-label="Remove Carrots"]').trigger('click')
  expect(totals()).toContain('30,300')
  expect(wrapper.get('tbody').text()).not.toContain('Carrots')
  await button(wrapper, /Reorder last order/).trigger('click')
  expect(totals()).toContain('51,800')
  expect(wrapper.get('tbody').text()).toContain('Carrots')
})

it('adds produce without duplicating a row and keeps quantities within stock', async () => {
  const wrapper = mount(OrderEntryBlock, options)
  await flushPromises()
  await selectOption(wrapper.get<HTMLElement>('[role="combobox"]').element, 'Red onions')
  await button(wrapper, /^Add$/).trigger('click')
  expect(wrapper.get('tbody').text()).toContain('Red onions')
  expect(wrapper.get('[aria-label="Order totals"]').text()).toContain('52,900')
  expect(button(wrapper, /^Add$/).attributes('disabled')).toBeDefined()
  const quantity = wrapper.get<HTMLInputElement>('input[aria-label="Red onions quantity"]')
  quantity.element.value = '99'
  await quantity.trigger('blur')
  expect(
    wrapper.get<HTMLInputElement>('input[aria-label="Red onions quantity"]').element.value,
  ).toBe('30')
  expect(wrapper.get('[aria-label="Order totals"]').text()).toContain('84,800')
})

it('uses the selected credit resolution and blocks an empty or undeliverable order', async () => {
  const wrapper = mount(OrderEntryBlock, options)
  await wrapper.findAll('input[type="radio"]')[1]!.setValue(true)
  await button(wrapper, /Send for credit review/).trigger('click')
  expect(wrapper.get('[role="status"]').text()).toContain('Dispatch remains on hold')
  await wrapper.findAll('input[type="radio"]')[2]!.setValue(true)
  await button(wrapper, /Prepare split order/).trigger('click')
  expect(wrapper.get('[role="status"]').text()).toContain('40,000')
  expect(wrapper.get('[role="status"]').text()).toContain('No items have been allocated')
  await wrapper.get('input[required]').setValue('   ')
  expect(button(wrapper, /Prepare split order/).attributes('disabled')).toBeDefined()
  expect(button(wrapper, /Send to sales lead/).attributes('disabled')).toBeDefined()
  await wrapper.get('input[required]').setValue('14 Muthithi Road, Nairobi')
  for (const remove of wrapper.findAll('button[aria-label^="Remove "]'))
    await remove.trigger('click')
  expect(wrapper.get('[aria-label="Order totals"]').get('dd[aria-live="polite"]').text()).toMatch(
    /\b0$/,
  )
  expect(button(wrapper, /Confirm order/).attributes('disabled')).toBeDefined()
})

it('charges VAT only on standard-rated invoice lines', () => {
  const lines = [
    { price: 1200, quantity: 12, vatRate: 0 },
    { price: 150, quantity: 18, vatRate: STANDARD_VAT_RATE },
    { price: 1500, quantity: 1, vatRate: STANDARD_VAT_RATE },
  ]
  expect(taxableOf(lines)).toBe(4200)
  expect(vatOf(lines)).toBe(672)
  expect(vatOf([{ price: 1200, quantity: 12, vatRate: 0 }])).toBe(0)
})

it('applies dashboard filters to the KPIs, chart data, and recent orders together', async () => {
  // jsdom has no canvas context; Chart.js skips drawing and the text alternatives still render.
  const canvas = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  onTestFinished(() => canvas.mockRestore())
  const wrapper = mount(OperationsDashboardBlock, options)
  await flushPromises()
  const kpi = (label: string) =>
    wrapper.findAll('dt').find((term) => term.text() === label)!.element.nextElementSibling!
      .textContent
  const orderRows = () =>
    wrapper.findAll('table[aria-label="Recent orders"] tbody tr').map((row) => row.text())
  const regionChartRows = () =>
    wrapper
      .findAll('caption')
      .find((caption) => /region and channel/.test(caption.text()))!
      .element.closest('table')!
      .querySelectorAll('tbody th[scope="row"]')

  expect(kpi('Orders')).toBe('11')
  expect(regionChartRows()).toHaveLength(4)

  const regionLabel = wrapper.findAll('label').find((label) => label.text() === 'Region')!
  await selectOption(document.getElementById(regionLabel.attributes('for')!)!, 'Mombasa')

  expect(kpi('Orders')).toBe('2')
  expect(kpi('Needs attention')).toBe('1')
  expect(orderRows()).toHaveLength(2)
  expect(orderRows().join()).toContain('FTF-1060')
  expect(orderRows().join()).toContain('FTF-1053')
  expect(Array.from(regionChartRows(), (row) => row.textContent)).toEqual(['Mombasa'])
  expect(wrapper.get('[role="status"]').text()).toMatch(/^2 orders match/)
})

async function mountSuppliers(url: string) {
  const router = createDocsRouter()
  router.addRoute({
    path: '/ui-blocks/page-templates',
    name: 'blocks-page-templates',
    component: SupplierListDetailBlock,
  })
  await router.push(url)
  await router.isReady()
  const wrapper = mount(defineComponent({ render: () => h(RouterView) }), {
    ...options,
    global: { ...options.global, plugins: [...options.global.plugins, router] },
  })
  await flushPromises()
  return { router, wrapper }
}
const heading = (wrapper: VueWrapper) => wrapper.get('h3').text()
const drawerOpen = () => !!document.querySelector('[role="dialog"] form')
const confirmButton = (text: RegExp) =>
  Array.from(document.querySelectorAll<HTMLButtonElement>('[role="alertdialog"] button')).find(
    (button) => text.test(button.textContent?.trim() ?? ''),
  )!
const goBack = async (router: ReturnType<typeof createDocsRouter>) => {
  router.back()
  await flushPromises()
}

it('restores the supplier view from the query and falls back to the list for unknown values', async () => {
  const { router, wrapper } = await mountSuppliers(
    '/ui-blocks/page-templates?supplier=SUP-202&supplierView=edit&tab=code',
  )
  expect(heading(wrapper)).toBe('Kirinyaga Tomato Growers')
  expect(drawerOpen()).toBe(true)
  wrapper.unmount()

  const unknown = await mountSuppliers(
    '/ui-blocks/page-templates?supplier=SUP-999&supplierView=edit&supplierQ=onion&tab=code',
  )
  expect(heading(unknown.wrapper)).toBe('Suppliers')
  expect(drawerOpen()).toBe(false)
  expect(unknown.wrapper.get('tbody').text()).toContain('Nakuru Onion Collective')
  expect(unknown.wrapper.get('tbody').text()).not.toContain('Limuru Greens Co-op')
  // Invalid keys are dropped; keys owned by other parts of the page are kept.
  expect(unknown.router.currentRoute.value.query).toEqual({ supplierQ: 'onion', tab: 'code' })
  expect(router).not.toBe(unknown.router)
})

it('adds history entries for opening a supplier and its edit form so Back returns through them', async () => {
  const { router, wrapper } = await mountSuppliers('/ui-blocks/page-templates')
  await wrapper.get('input[aria-label="Search suppliers"]').setValue('kiri')
  await flushPromises()
  expect(router.currentRoute.value.query).toEqual({ supplierQ: 'kiri' })

  await button(wrapper, /Kirinyaga/).trigger('click')
  await flushPromises()
  expect(router.currentRoute.value.query).toEqual({ supplier: 'SUP-202', supplierQ: 'kiri' })
  await button(wrapper, /Edit supplier/).trigger('click')
  await flushPromises()
  expect(router.currentRoute.value.query.supplierView).toBe('edit')
  expect(drawerOpen()).toBe(true)

  await goBack(router)
  expect(router.currentRoute.value.query).toEqual({ supplier: 'SUP-202', supplierQ: 'kiri' })
  await expect.poll(drawerOpen).toBe(false)
  expect(heading(wrapper)).toBe('Kirinyaga Tomato Growers')
  await goBack(router)
  expect(heading(wrapper)).toBe('Suppliers')
  expect(wrapper.get<HTMLInputElement>('input[aria-label="Search suppliers"]').element.value).toBe(
    'kiri',
  )
})

it('asks before Back or leaving the page discards unsaved supplier edits', async () => {
  const { router, wrapper } = await mountSuppliers('/ui-blocks/page-templates')
  await button(wrapper, /Limuru/).trigger('click')
  await flushPromises()
  await button(wrapper, /Edit supplier/).trigger('click')
  await flushPromises()
  const name = () =>
    document.getElementById(
      Array.from(document.querySelectorAll('label'))
        .find((label) => label.textContent?.trim() === 'Supplier name')!
        .getAttribute('for')!,
    ) as HTMLInputElement
  name().value = 'Limuru Fresh'
  name().dispatchEvent(new Event('input'))
  await flushPromises()

  await goBack(router)
  expect(document.querySelector('[role="alertdialog"]')).not.toBeNull()
  await click(confirmButton(/Keep editing/))
  expect(router.currentRoute.value.query.supplierView).toBe('edit')
  expect(name().value).toBe('Limuru Fresh')

  // The leave guard waits for the confirmation, so answer it before the navigation settles.
  const leaving = router.push('/ui-blocks/documents')
  await flushPromises()
  await click(confirmButton(/Keep editing/))
  await leaving
  expect(router.currentRoute.value.path).toBe('/ui-blocks/page-templates')

  await goBack(router)
  await click(confirmButton(/Discard changes/))
  expect(router.currentRoute.value.query).toEqual({ supplier: 'SUP-201' })
  await expect.poll(drawerOpen).toBe(false)
  expect(heading(wrapper)).toBe('Limuru Greens Co-op')
})
