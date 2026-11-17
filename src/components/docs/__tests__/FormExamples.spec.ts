import { afterEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import FormValidationExample from '../examples/FormValidationExample.vue'
import InplaceExample from '../examples/InplaceExample.vue'
import InputPasswordExample from '../examples/InputPasswordExample.vue'
import AutoCompleteExample from '../examples/AutoCompleteExample.vue'
import ChipRemoveExample from '../examples/ChipRemoveExample.vue'
import KnobExample from '../examples/KnobExample.vue'
import EditorExample from '../examples/EditorExample.vue'
import FileUploadExample from '../examples/FileUploadExample.vue'

enableAutoUnmount(afterEach)
afterEach(() => vi.restoreAllMocks())
const global = { plugins: [PrimeVue] }

it('rejects empty names, accepts a corrected name, and resets values and feedback', async () => {
  const wrapper = mount(FormValidationExample, { global })
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  expect(wrapper.get('[role="alert"]').text()).not.toBe('')
  expect(wrapper.get('[role="status"]').text()).toBe('')
  const input = wrapper.get<HTMLInputElement>('input[name="produce"]')
  await input.setValue('   ')
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  expect(wrapper.get('[role="alert"]').text()).not.toBe('')
  expect(wrapper.get('[role="status"]').text()).toBe('')
  await input.setValue('  Kale  ')
  await wrapper.get('form').trigger('submit')
  await flushPromises()
  expect(wrapper.find('[role="alert"]').exists()).toBe(false)
  expect(wrapper.get('[role="status"]').text()).toContain('Saved Kale')
  await wrapper.get('button[type="reset"]').trigger('click')
  await wrapper.get('form').trigger('reset')
  await flushPromises()
  expect(input.element.value).toBe('')
  expect(wrapper.get('[role="status"]').text()).toBe('')
})

it('discards cancelled inline edits and commits only a non-empty draft', async () => {
  const wrapper = mount(InplaceExample, { global })
  await wrapper.get('[role="button"]').trigger('click')
  await wrapper.get('input').setValue('Cancelled order')
  await wrapper.get('button[type="button"]').trigger('click')
  expect(wrapper.get('[role="button"]').text()).toBe('Farm order')
  await wrapper.get('[role="button"]').trigger('click')
  expect(wrapper.get<HTMLInputElement>('input').element.value).toBe('Farm order')
  await wrapper.get('input').setValue('  ')
  expect(wrapper.get<HTMLButtonElement>('button[type="submit"]').element.disabled).toBe(true)
  await wrapper.get('form').trigger('submit')
  expect(wrapper.find('input').exists()).toBe(true)
  await wrapper.get('input').setValue('Market order')
  await wrapper.get('form').trigger('submit')
  expect(wrapper.get('[role="button"]').text()).toBe('Market order')
  await flushPromises()
})

it('reveals the entered password without clearing it and restores masking', async () => {
  const wrapper = mount(InputPasswordExample, { global })
  const input = wrapper.get<HTMLInputElement>('input')
  await input.setValue('sample-password')
  const reveal = wrapper.get('button[aria-label="Show password"]')
  expect(input.attributes('type')).toBe('password')
  await reveal.trigger('click')
  expect(input.attributes('type')).toBe('text')
  expect(input.element.value).toBe('sample-password')
  expect(reveal.attributes('aria-pressed')).toBe('true')
  await reveal.trigger('click')
  expect(input.attributes('type')).toBe('password')
})

it('filters suggestions and handles a query with no matches', async () => {
  const wrapper = mount(AutoCompleteExample, { global, attachTo: document.body })
  const input = wrapper.get('input')
  await input.setValue('ca')
  await expect.poll(() => document.body.querySelectorAll('[role="option"]').length).toBe(1)
  expect(document.body.querySelector('[role="option"]')?.textContent).toContain('Carrot')
  await input.setValue('no matching produce')
  await expect
    .poll(() => document.body.querySelector('[role="listbox"]')?.textContent)
    .not.toContain('Carrot')
})

it('removes selected chips through a named button and can reset the selection', async () => {
  const wrapper = mount(ChipRemoveExample, { global })
  await wrapper.get('button[aria-label="Remove Vegetables"]').trigger('click')
  expect(wrapper.get('[role="status"]').text()).toContain('2')
  expect(wrapper.find('button[aria-label="Remove Vegetables"]').exists()).toBe(false)
  await wrapper
    .findAll('button')
    .find((button) => button.text() === 'Reset filters')!
    .trigger('click')
  expect(wrapper.get('[role="status"]').text()).toContain('3')
})

it('keeps capacity adjustments within the displayed limits', async () => {
  const wrapper = mount(KnobExample, { global })
  const increase = wrapper.get<HTMLButtonElement>('button[aria-label="Increase capacity"]')
  const decrease = wrapper.get<HTMLButtonElement>('button[aria-label="Decrease capacity"]')
  for (let i = 0; i < 25; i++) await increase.trigger('click')
  expect(increase.element.disabled).toBe(true)
  expect(wrapper.get('[role="slider"]').attributes('aria-valuenow')).toBe('100')
  for (let i = 0; i < 25; i++) await decrease.trigger('click')
  expect(decrease.element.disabled).toBe(true)
  expect(wrapper.get('[role="slider"]').attributes('aria-valuenow')).toBe('0')
})

it('loads the real editor with a named editable textbox and labelled formatting actions', async () => {
  const wrapper = mount(EditorExample, { global, attachTo: document.body })
  await expect.poll(() => wrapper.find('[role="textbox"]').exists()).toBe(true)
  const textbox = wrapper.get('[role="textbox"]')
  expect(textbox.attributes('contenteditable')).toBe('true')
  expect(textbox.attributes('aria-labelledby')).toBe(
    wrapper.get('#produce-description-label').attributes('id'),
  )
  expect(wrapper.get('button[aria-label="Bold"]').attributes('type')).toBe('button')
})

it('previews selected files locally without issuing an upload request', async () => {
  const send = vi.spyOn(XMLHttpRequest.prototype, 'send')
  const create = vi.fn(() => 'blob:local-preview')
  const revoke = vi.fn()
  vi.stubGlobal(
    'URL',
    class extends URL {
      static createObjectURL = create
      static revokeObjectURL = revoke
    },
  )
  try {
    const wrapper = mount(FileUploadExample, { global })
    const input = wrapper.get<HTMLInputElement>('input[type="file"]')
    Object.defineProperty(input.element, 'files', {
      value: [new File(['image'], 'kale.png', { type: 'image/png' })],
    })
    await input.trigger('change')
    const preview = wrapper
      .findAll('button')
      .find((button) => button.text().includes('Preview selection'))!
    await preview.trigger('click')
    await flushPromises()
    expect(wrapper.get('[role="status"]').text()).toContain('kale.png')
    expect(send).not.toHaveBeenCalled()
    wrapper.unmount()
  } finally {
    vi.unstubAllGlobals()
  }
})
