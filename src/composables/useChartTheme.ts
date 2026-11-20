import { computed } from 'vue'
import { colorMode } from '@/theme/color-mode'
import { chartSeriesVariable } from '@/theme/erp-theme/foundations/chart-series'

export function useChartTheme() {
  return computed(() => {
    colorMode.value
    const styles = getComputedStyle(document.documentElement)
    const token = (name: string) => styles.getPropertyValue(name).trim()

    return {
      // Series colours in assignment order; see chart-series.ts.
      kale: token(chartSeriesVariable('kale')),
      carrot: token(chartSeriesVariable('carrot')),
      lime: token(chartSeriesVariable('lime')),
      tamarind: token(chartSeriesVariable('tamarind')),
      text: token('--p-text-color'),
      muted: token('--p-text-muted-color'),
      border: token('--p-content-border-color'),
    }
  })
}
