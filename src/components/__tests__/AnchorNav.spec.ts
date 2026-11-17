import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import AnchorNav from '../AnchorNav.vue'

enableAutoUnmount(afterEach)

const items = [
  { id: 'intro', label: 'Introduction' },
  { id: 'examples', label: 'Examples' },
]

it('renders section anchors and updates the active marker', async () => {
  const wrapper = mount(AnchorNav, { props: { items, activeId: 'intro' } })
  expect(wrapper.attributes('aria-label')).toBe('On this page')
  expect(wrapper.findAll('a').map((link) => link.attributes('href'))).toEqual([
    '#intro',
    '#examples',
  ])
  expect(wrapper.get('a[aria-current="location"]').text()).toBe('Introduction')
  expect(wrapper.get('a[aria-current="location"]').classes()).toContain('border-primary')

  await wrapper.setProps({ activeId: 'examples' })
  expect(wrapper.findAll('a[aria-current="location"]')).toHaveLength(1)
  expect(wrapper.get('a[aria-current="location"]').text()).toBe('Examples')
  expect(wrapper.get('a[href="#intro"]').classes()).not.toContain('font-medium')

  await wrapper.setProps({ items: [{ id: 'details', label: 'Details' }], activeId: 'details' })
  expect(wrapper.findAll('a')).toHaveLength(1)
  expect(wrapper.get('a[aria-current="location"]').attributes('href')).toBe('#details')
})

it('supports the inline layout and caller classes', () => {
  const wrapper = mount(AnchorNav, {
    props: { items, activeId: 'examples', inline: true },
    attrs: { class: 'mb-8 xl:hidden' },
  })
  expect(wrapper.classes()).toEqual(expect.arrayContaining(['mb-8', 'xl:hidden', 'p-4']))
  expect(wrapper.get('a[aria-current="location"]').classes()).toContain('text-primary')
  expect(wrapper.get('a[aria-current="location"]').classes()).not.toContain('border-l-2')
})
