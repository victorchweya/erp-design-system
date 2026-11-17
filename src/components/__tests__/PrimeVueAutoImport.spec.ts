import { expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import PrimeVueAutoImport from './fixtures/PrimeVueAutoImport.vue'

it('auto-imports PrimeVue components used in templates', () => {
  const wrapper = mount(PrimeVueAutoImport, {
    global: { plugins: [PrimeVue] },
  })

  expect(wrapper.get('button').text()).toBe('Auto-import works')
  wrapper.unmount()
})
