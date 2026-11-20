import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { enableAutoUnmount, flushPromises, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import type { Component } from 'vue'
import BubbleScatterChartBlock from '../charts/BubbleScatterChartBlock.vue'
import ComparisonChartBlock from '../charts/ComparisonChartBlock.vue'
import ComposedChartBlock from '../charts/ComposedChartBlock.vue'
import CompositionChartBlock from '../charts/CompositionChartBlock.vue'
import LineChartBlock from '../charts/LineChartBlock.vue'
import PolarAreaChartBlock from '../charts/PolarAreaChartBlock.vue'
import ProportionChartBlock from '../charts/ProportionChartBlock.vue'
import RadarChartBlock from '../charts/RadarChartBlock.vue'
import TrendChartBlock from '../charts/TrendChartBlock.vue'
import DataVizChartExample from '@/components/foundations/data-viz/DataVizChartExample.vue'

enableAutoUnmount(afterEach)
// jsdom has no canvas context; Chart.js skips drawing and PrimeVue Chart still renders its markup.
beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
  vi.spyOn(console, 'error').mockImplementation(() => {})
})
afterEach(() => vi.restoreAllMocks())

const charts: [string, Component][] = [
  ['BubbleScatterChartBlock', BubbleScatterChartBlock],
  ['ComparisonChartBlock', ComparisonChartBlock],
  ['ComposedChartBlock', ComposedChartBlock],
  ['CompositionChartBlock', CompositionChartBlock],
  ['LineChartBlock', LineChartBlock],
  ['PolarAreaChartBlock', PolarAreaChartBlock],
  ['ProportionChartBlock', ProportionChartBlock],
  ['RadarChartBlock', RadarChartBlock],
  ['TrendChartBlock', TrendChartBlock],
  ['DataVizChartExample', DataVizChartExample],
]

describe('chart text alternatives', () => {
  it.each(charts)('%s renders a named chart image and its text alternative', async (_, chart) => {
    const wrapper = mount(chart, { global: { plugins: [PrimeVue] } })
    await flushPromises()

    const canvas = wrapper.get('canvas')
    expect(canvas.attributes('role')).toBe('img')
    expect(canvas.attributes('aria-label')).toBeTruthy()

    // PrimeVue Chart drops its children, so the alternative must render beside the canvas.
    const alternative = wrapper.findAll('table, p').find((element) => element.text())
    expect(alternative).toBeDefined()
    expect(alternative!.element.closest('canvas')).toBeNull()
    if (alternative!.element.tagName === 'TABLE') {
      expect(alternative!.findAll('th[scope="row"]').length).toBeGreaterThan(0)
    }
  })
})
