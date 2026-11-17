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
