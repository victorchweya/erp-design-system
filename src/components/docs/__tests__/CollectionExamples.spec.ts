import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import PaginatorExample from '../examples/PaginatorExample.vue'
import PickListExample from '../examples/PickListExample.vue'
import FocusTrapExample from '../examples/FocusTrapExample.vue'
import BlockUIExample from '../examples/BlockUIExample.vue'
import CommandMenuExample from '../examples/CommandMenuExample.vue'
import TerminalExample from '../examples/TerminalExample.vue'

enableAutoUnmount(afterEach)
beforeEach(() => {
  vi.stubGlobal('matchMedia', () => ({
    matches: false,
    addEventListener() {},
    removeEventListener() {},
  }))
})
afterEach(() => vi.unstubAllGlobals())
const options = { global: { plugins: [PrimeVue] }, attachTo: document.body }

it('changes the visible records when paging', async () => {
  const wrapper = mount(PaginatorExample, options)
  expect(wrapper.get('ul').text()).toContain('Delivery 1')
  await wrapper.get('button[aria-label="Next Page"]').trigger('click')
  expect(wrapper.get('ul').text()).toContain('Delivery 6')
  expect(
    wrapper
      .get('ul')
      .findAll('li')
      .map((item) => item.text()),
  ).not.toContain('Delivery 1')
  await wrapper.get('button[aria-label="Last Page"]').trigger('click')
  expect(wrapper.get('ul').text()).toContain('Delivery 24')
  expect(wrapper.get('ul').findAll('li')).toHaveLength(4)
})

it('names each transfer list and moves only the selected supplier', async () => {
  const wrapper = mount(PickListExample, options)
  const source = wrapper.get('[role="listbox"][aria-label="Available suppliers"]')
  const target = wrapper.get('[role="listbox"][aria-label="Assigned suppliers"]')
  await source.findAll('[role="option"]')[0]!.trigger('click')
  await wrapper.get('button[aria-label="Move to Target"]').trigger('click')
  expect(source.text()).not.toContain('Valley Growers')
  expect(source.text()).toContain('Green Acres')
  expect(target.text()).toContain('Valley Growers')
  expect(target.text()).not.toContain('Green Acres')
})

it('offers an Escape exit from the focus trap and restores trigger focus', async () => {
  const wrapper = mount(FocusTrapExample, options)
  const trigger = wrapper.findAll('button')[0]!
  trigger.element.focus()
  await trigger.trigger('click')
  await flushPromises()
  expect(document.activeElement).toBe(wrapper.get('input').element)
  await wrapper.get('input').trigger('keydown', { key: 'Escape' })
  await flushPromises()
  expect(document.activeElement).toBe(trigger.element)
  expect(trigger.element.disabled).toBe(false)
})

it('blocks keyboard controls as well as pointer access and can unblock them', async () => {
  const wrapper = mount(BlockUIExample, options)
  const [block, unblock] = wrapper.findAll('button')
  await block!.trigger('click')
  expect(wrapper.get('fieldset').element.disabled).toBe(true)
  expect(wrapper.get('fieldset button').element.matches(':disabled')).toBe(true)
  expect(unblock!.element.disabled).toBe(false)
  await unblock!.trigger('click')
  expect(wrapper.get('fieldset button').element.matches(':disabled')).toBe(false)
})

it('filters commands and runs the selected matching command', async () => {
  const wrapper = mount(CommandMenuExample, options)
  await wrapper.get('input').setValue('create')
  expect(wrapper.get('[role="menu"]').text()).toContain('Create order')
  expect(wrapper.get('[role="menu"]').text()).not.toContain('View suppliers')
  await wrapper.get('[role="menuitem"]').trigger('click')
  expect(wrapper.get('[role="status"]').text()).toContain('Create order selected')
  await wrapper.get('input').setValue('no matching command')
  expect(wrapper.find('[role="menuitem"]').exists()).toBe(false)
})

it('handles only its local terminal commands and still works after remounting', async () => {
  const first = mount(TerminalExample, options)
  await first.get('input').setValue('status')
  await first.get('input').trigger('keydown', { key: 'Enter' })
  expect(first.text()).toContain('All deliveries are ready')
  first.unmount()
  const second = mount(TerminalExample, options)
  await second.get('input').setValue('<script>status</script>')
  await second.get('input').trigger('keydown', { key: 'Enter' })
  expect(second.text()).toContain('Unknown command')
  expect(second.find('script').exists()).toBe(false)
  await second.get('input').setValue('help')
  await second.get('input').trigger('keydown', { key: 'Enter' })
  expect(second.text()).toContain('Commands: help, status')
})
