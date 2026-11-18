import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount, type VueWrapper } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import { defineComponent } from 'vue'
import OrdersTableBlock from '../tables/OrdersTableBlock.vue'
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
import EmptyStateBlock from '../feedback/EmptyStateBlock.vue'
import ConfirmPopupBlock from '../popups/ConfirmPopupBlock.vue'
import RecordPopoverBlock from '../popups/RecordPopoverBlock.vue'
import ActionsMenuBlock from '../popups/ActionsMenuBlock.vue'

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

it.each([RetryAlertBlock, ActionAlertBlock, EmptyStateBlock])(
  'provides feedback and a way to restore its initial state',
  async (component) => {
    const wrapper = mount(component, options)
    const initial = wrapper.text()
    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).not.toBe(initial)
    await wrapper.get('button').trigger('click')
    expect(wrapper.text()).toBe(initial)
  },
)
