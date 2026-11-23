import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ConfirmationService from 'primevue/confirmationservice'
import ApprovalFlowBlock from '../workflow/ApprovalFlowBlock.vue'
import DecisionDialogBlock from '../backoffice/decision-dialog/DecisionDialogBlock.vue'

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

const record = { reference: 'FTF-4410', summary: 'Spoilage write-off, 18 crates of kale' }
const mountDialog = (props: Record<string, unknown> = {}) =>
  mount(DecisionDialogBlock, {
    props: { visible: true, kind: 'reverse', subject: 'stock adjustment', record, ...props },
    global: { plugins: [PrimeVue], stubs: { transition: false } },
    attachTo: document.body,
  })
const reasonField = () => document.querySelector<HTMLTextAreaElement>('textarea')!
const confirmButton = () => document.querySelector<HTMLButtonElement>('button[type="submit"]')!
const type = async (value: string) => {
  const field = reasonField()
  field.value = value
  field.dispatchEvent(new Event('input'))
  await flushPromises()
}

it('keeps a destructive decision disabled until the reason is long enough, then emits it trimmed', async () => {
  const wrapper = mountDialog()
  await flushPromises()
  expect(confirmButton().disabled).toBe(true)
  await type('   short  ')
  expect(confirmButton().disabled).toBe(true)
  await type('  Counted twice by mistake.  ')
  expect(confirmButton().disabled).toBe(false)
  confirmButton().click()
  await flushPromises()
  expect(wrapper.emitted('confirm')).toEqual([['Counted twice by mistake.']])
})

it('ties the error to the reason field only after the person has left it', async () => {
  mountDialog()
  await flushPromises()
  await type('too short')
  expect(document.querySelector('[role="alert"]')).toBeNull()
  reasonField().dispatchEvent(new Event('blur'))
  await flushPromises()
  const error = document.querySelector('[role="alert"]')!
  expect(error).not.toBeNull()
  expect(reasonField().getAttribute('aria-describedby')).toContain(error.id)
})

it('lets an approval go ahead without a note', async () => {
  const wrapper = mountDialog({ kind: 'approve' })
  await flushPromises()
  expect(confirmButton().disabled).toBe(false)
  confirmButton().click()
  await flushPromises()
  expect(wrapper.emitted('confirm')).toEqual([['']])
})

it('keeps typed text when Escape is pressed and clears it when the dialog opens again', async () => {
  const wrapper = mountDialog()
  await flushPromises()
  const escape = async () => {
    document
      .querySelector('[role="dialog"]')!
      .dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', code: 'Escape', bubbles: true }))
    await flushPromises()
  }
  await escape()
  expect(wrapper.emitted('update:visible')).toEqual([[false]])
  const opened = wrapper.emitted('update:visible')!.length
  await type('Posted to the wrong store.')
  await escape()
  expect(wrapper.emitted('update:visible')).toHaveLength(opened)
  expect(reasonField().value).toBe('Posted to the wrong store.')

  document.querySelector<HTMLButtonElement>('button[type="button"]:not([aria-label])')!.click()
  await flushPromises()
  expect(wrapper.emitted('cancel')!.length).toBeGreaterThan(0)
  await wrapper.setProps({ visible: false })
  await flushPromises()
  await wrapper.setProps({ visible: true })
  await flushPromises()
  expect(reasonField().value).toBe('')
})

it('records a rejection from the approval flow with its reason, only once the reason is long enough', async () => {
  const wrapper = mount(ApprovalFlowBlock, {
    global: { plugins: [PrimeVue, ConfirmationService], stubs: { transition: false } },
    attachTo: document.body,
  })
  const reject = [...wrapper.findAll('button')].find((b) => b.text() === 'Reject')!
  await reject.trigger('click')
  await flushPromises()
  expect(confirmButton().disabled).toBe(true)
  await type('Limit is above policy for this customer.')
  confirmButton().click()
  await flushPromises()
  expect(wrapper.text()).toContain('Limit is above policy for this customer.')
  expect(wrapper.text()).toContain('Rejected')
})
