import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import { defineComponent, nextTick, shallowRef } from 'vue'
import { useActiveSection } from '../useActiveSection'

enableAutoUnmount(afterEach)
let positions: Record<string, number>

beforeEach(() => {
  vi.useFakeTimers()
  positions = { intro: 200, brand: 800, surface: 1400, table: 2400 }
  vi.stubGlobal('scrollY', 0)
  vi.stubGlobal('innerHeight', 800)
  vi.spyOn(document.documentElement, 'scrollHeight', 'get').mockReturnValue(3000)
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (
    this: HTMLElement,
  ) {
    return new DOMRect(0, positions[this.id] ?? 0, 100, 400)
  })
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

function mountSections() {
  const ids = shallowRef(['intro', 'brand', 'surface', 'table'])
  const wrapper = mount(
    defineComponent({
      setup() {
        return { ids, active: useActiveSection(ids) }
      },
      template: `<main>
      <section v-for="id in ids" :id="id" :key="id" style="scroll-margin-top:96px"></section>
      <output>{{ active }}</output>
    </main>`,
    }),
    { attachTo: document.body },
  )
  return { wrapper, ids }
}

async function scroll() {
  window.dispatchEvent(new Event('scroll'))
  await vi.advanceTimersByTimeAsync(17)
  await nextTick()
}

it('tracks the reading section in both directions using its anchor offset', async () => {
  const { wrapper } = mountSections()
  await nextTick()
  expect(wrapper.get('output').text()).toBe('intro')

  positions.intro = -504
  positions.brand = 96
  await scroll()
  expect(wrapper.get('output').text()).toBe('brand')

  positions.intro = -1104
  positions.brand = -600
  positions.surface = 80
  await scroll()
  expect(wrapper.get('output').text()).toBe('surface')

  positions.intro = -440
  positions.brand = 160
  positions.surface = 800
  await scroll()
  expect(wrapper.get('output').text()).toBe('intro')
})

it('handles restored scroll positions and selects the last section at the document bottom', async () => {
  positions = { intro: -1000, brand: -200, surface: 300, table: 900 }
  const { wrapper } = mountSections()
  await nextTick()
  expect(wrapper.get('output').text()).toBe('brand')

  positions.table = 300
  vi.stubGlobal('scrollY', 2200)
  await scroll()
  expect(wrapper.get('output').text()).toBe('table')
})

it('updates reactive sections and removes pending work on unmount', async () => {
  const { wrapper, ids } = mountSections()
  positions.palette = 90
  ids.value = ['palette']
  await nextTick()
  expect(wrapper.get('output').text()).toBe('palette')

  const request = vi.spyOn(window, 'requestAnimationFrame')
  const cancel = vi.spyOn(window, 'cancelAnimationFrame')
  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event('resize'))
  expect(request).toHaveBeenCalledTimes(1)
  wrapper.unmount()
  expect(cancel).toHaveBeenCalledOnce()
  window.dispatchEvent(new Event('scroll'))
  window.dispatchEvent(new Event('resize'))
  expect(request).toHaveBeenCalledTimes(1)
})
