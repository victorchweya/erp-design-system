import { afterEach, expect, it } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import CodeExample from '../CodeExample.vue'

enableAutoUnmount(afterEach)
const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
afterEach(() => {
  if (originalClipboard) Object.defineProperty(navigator, 'clipboard', originalClipboard)
  else Reflect.deleteProperty(navigator, 'clipboard')
})

const code = '<template>\n  <p class="p-4">Fresh produce</p>\n</template>\n'
const mountExample = () =>
  mount(CodeExample, {
    props: { title: 'Spacing', code },
    global: { plugins: [PrimeVue] },
  })

it('copies the complete source, preserving markup and whitespace', async () => {
  let clipboardText = ''
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: async (value: string) => {
        clipboardText = value
      },
    },
  })
  const wrapper = mountExample()

  await wrapper.get('button').trigger('click')
  await flushPromises()

  expect(clipboardText).toBe(code)
  expect(wrapper.get('[role="status"]').text()).toMatch(/copied/i)
})

it.each([false, true])(
  'keeps source available when clipboard access fails (available: %s)',
  async (available) => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: available
        ? {
            writeText: async () => {
              throw new Error('Permission denied')
            },
          }
        : undefined,
    })
    const wrapper = mountExample()

    await wrapper.get('button').trigger('click')
    await flushPromises()

    expect(wrapper.get('pre code').element.textContent).toBe(code)
    expect(wrapper.get('[role="status"]').text()).toMatch(/copy.*manually/i)
  },
)

it('switches views without losing preview state and copies the full source from either view', async () => {
  let clipboardText = ''
  Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: {
      writeText: async (value: string) => {
        clipboardText = value
      },
    },
  })
  const wrapper = mount(CodeExample, {
    props: { title: 'Header', code, tabbed: true },
    attachTo: document.body,
    slots: { default: '<input aria-label="Preview value" />' },
    global: { plugins: [PrimeVue] },
  })
  const preview = wrapper.get('input')
  const codeView = wrapper.get('pre')
  const viewButton = (name: string) =>
    wrapper.findAll('button').find((button) => button.text() === name)!
  const copy = wrapper.get('button[aria-label="Copy Header code"]')

  expect(preview.isVisible()).toBe(true)
  expect(codeView.isVisible()).toBe(false)
  await preview.setValue('Keep this value')
  await copy.trigger('click')
  await flushPromises()
  expect(clipboardText).toBe(code)

  await viewButton('Code').trigger('click')
  expect(preview.isVisible()).toBe(false)
  expect(codeView.isVisible()).toBe(true)
  clipboardText = ''
  await copy.trigger('click')
  await flushPromises()
  expect(clipboardText).toBe(code)

  await viewButton('Preview').trigger('click')
  expect(preview.isVisible()).toBe(true)
  expect((preview.element as HTMLInputElement).value).toBe('Keep this value')
  await viewButton('Preview').trigger('click')
  expect(preview.isVisible()).toBe(true)
})

it('reveals source for manual copying if clipboard access fails in preview mode', async () => {
  Object.defineProperty(navigator, 'clipboard', { configurable: true, value: undefined })
  const wrapper = mount(CodeExample, {
    props: { title: 'Header', code, tabbed: true },
    attachTo: document.body,
    slots: { default: '<p>Preview content</p>' },
    global: { plugins: [PrimeVue] },
  })
  await wrapper.get('button[aria-label="Copy Header code"]').trigger('click')
  await flushPromises()
  expect(wrapper.get('pre').isVisible()).toBe(true)
  expect(wrapper.get('pre code').element.textContent).toBe(code)
  expect(wrapper.get('[role="status"]').isVisible()).toBe(true)
})
