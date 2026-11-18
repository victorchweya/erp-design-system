import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import HeadersView from '@/views/blocks/HeadersView.vue'
import PageHeader01 from '../headers/PageHeader01.vue'
import PageHeader02 from '../headers/PageHeader02.vue'
import PageHeader03 from '../headers/PageHeader03.vue'

enableAutoUnmount(afterEach)
const global = { plugins: [PrimeVue], stubs: { transition: false } }

it.each([PageHeader01, PageHeader02, PageHeader03])(
  'provides a page heading that can fit an embedded context',
  async (component) => {
    const wrapper = mount(component, { global })
    expect(wrapper.findAll('h1')).toHaveLength(1)
    await wrapper.setProps({ headingTag: 'h3' })
    expect(wrapper.find('h1').exists()).toBe(false)
    expect(wrapper.findAll('h3')).toHaveLength(1)
  },
)

it('keeps one page heading and announces actions in each gallery preview', async () => {
  const wrapper = mount(HeadersView, { global, attachTo: document.body })
  expect(wrapper.findAll('h1')).toHaveLength(1)
  expect(wrapper.findAll('h3')).toHaveLength(3)
  for (const component of [PageHeader01, PageHeader02, PageHeader03]) {
    const block = wrapper.getComponent(component)
    expect(block.get('[role="status"]').text()).toBe('')
    await block.get('button').trigger('click')
    expect(block.get('[role="status"]').text()).not.toBe('')
  }
})

it('opens the record actions with keyboard focus, runs a menu action, and closes on Escape', async () => {
  const wrapper = mount(PageHeader03, { global, attachTo: document.body })
  await flushPromises()
  const trigger = wrapper.get<HTMLButtonElement>('button[aria-haspopup="menu"]')
  trigger.element.focus()
  await trigger.trigger('click')
  await flushPromises()
  await expect.poll(() => trigger.attributes('aria-expanded')).toBe('true')
  const menu = document.getElementById(trigger.attributes('aria-controls')!)!
  expect(menu.contains(document.activeElement)).toBe(true)
  ;(menu.querySelector('[role="menuitem"]') as HTMLElement).click()
  await expect.poll(() => wrapper.get('[role="status"]').text()).not.toBe('')
  await expect.poll(() => trigger.attributes('aria-expanded')).toBe('false')

  await trigger.trigger('click')
  await expect.poll(() => trigger.attributes('aria-expanded')).toBe('true')
  document.activeElement?.dispatchEvent(
    new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape', bubbles: true }),
  )
  await expect.poll(() => trigger.attributes('aria-expanded')).toBe('false')
  expect(document.activeElement).toBe(trigger.element)
})
