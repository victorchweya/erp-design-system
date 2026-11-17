import { afterEach, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import FormPreview from '../playground/FormPreview.vue'

afterEach(() => vi.unstubAllGlobals())

it('applies an edited preview and resets the form controls', async () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  )
  const wrapper = mount(FormPreview, { global: { plugins: [PrimeVue] } })

  await wrapper.get('#member-name').setValue('Jamie Lee')
  await wrapper.get('#member-notifications').setValue(false)
  await wrapper.get('#member-access').setValue(true)
  await wrapper.get('form').trigger('submit')

  expect(wrapper.text()).toContain('Preview applied for Jamie Lee in Operations.')

  await wrapper.get('button[type="button"]').trigger('click')

  expect(wrapper.get<HTMLInputElement>('#member-name').element.value).toBe('Alex Morgan')
  expect(wrapper.get<HTMLInputElement>('#member-notifications').element.checked).toBe(true)
  expect(wrapper.get<HTMLInputElement>('#member-access').element.checked).toBe(false)
  expect(wrapper.text()).not.toContain('Preview applied')
  wrapper.unmount()
})
