import { afterEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ColorView from '@/views/foundations/ColorView.vue'
import ColorExamples from '../ColorExamples.vue'
import ErpTheme from '@/theme/erp-theme'
import { contrastRatio, roleByName } from '@/theme/erp-theme/foundations/color-tokens'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

it('renders all required sections, matching anchors, evidence, and the Carrot contrast failure', () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn<() => void>(),
      removeEventListener: vi.fn<() => void>(),
    })),
  )
  const wrapper = mount(ColorView, {
    global: {
      plugins: [
        [PrimeVue, { theme: { preset: ErpTheme, options: { darkModeSelector: '.app-dark' } } }],
      ],
    },
  })
  expect(wrapper.findAll('h2').map((heading) => heading.text())).toEqual([
    'How to use',
    'Brand',
    'Surface',
    'Text',
    'Borders & Inputs',
    'Status',
    'Tints',
    'Palette',
    'Token table',
  ])
  for (const link of wrapper.findAll('a[href^="#"]')) {
    expect(wrapper.find(link.attributes('href')!).exists()).toBe(true)
  }
  expect(wrapper.text()).toContain('Carrot on cream: 2.74:1')
  expect(wrapper.text()).toContain('Not defined. No dark pairing inferred.')
  expect(wrapper.get('table').attributes('aria-label')).toBe('FTF color token reference')
  expect(wrapper.text()).toContain('Proposal · not approved')
})

it('confirms locally and scopes the example colors to the same token source', async () => {
  const wrapper = mount(ColorExamples, { global: { plugins: [PrimeVue] } })
  const buttons = wrapper.findAll('button')
  expect(buttons.map((button) => button.text())).toEqual(['Confirm Order', 'Confirm Order'])
  await buttons[0]!.trigger('click')
  expect(wrapper.get('[role="status"]').text()).toBe('Order confirmed in this preview.')
  expect(wrapper.text()).toContain('Completed')
  expect(wrapper.text()).toContain('Review quantities before confirming this order.')
  for (const component of wrapper.findAllComponents({ name: 'Button' })) {
    const dt = component.props('dt')
    const background = dt.colorScheme.light.root.primary.background
    const foreground = dt.colorScheme.light.root.primary.color
    expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5)
  }
  const tag = wrapper.findComponent({ name: 'Tag' })
  expect(tag.props('dt').colorScheme.light.success.color).toBe(
    roleByName('proposal.status.success').light.foreground.value,
  )
  const message = wrapper.findComponent({ name: 'Message' })
  expect(message.props('dt').colorScheme.light.warn.color).toBe(
    roleByName('proposal.status.warning').light.foreground.value,
  )
})
