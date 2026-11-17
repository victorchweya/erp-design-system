import { expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import IconButtonExample from '../examples/IconButtonExample.vue'

it('gives each icon action an accessible name and keeps its SVG decorative', () => {
  const wrapper = mount(IconButtonExample, { global: { plugins: [PrimeVue] } })

  expect(wrapper.get('button[aria-label]').attributes('aria-label')?.trim()).toBeTruthy()
  for (const button of wrapper.findAll('button')) {
    expect(button.attributes('aria-label') || button.text()).toBeTruthy()
    expect(button.attributes('type')).toBe('button')
    const icon = button.get('svg')
    expect(icon.attributes('aria-hidden')).toBe('true')
    expect(icon.attributes('focusable')).toBe('false')
  }

  wrapper.unmount()
})
