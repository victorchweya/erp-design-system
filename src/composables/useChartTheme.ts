import { computed } from 'vue'
import { colorMode } from '@/theme/color-mode'

export function useChartTheme() {
  return computed(() => {
    colorMode.value
    const styles = getComputedStyle(document.documentElement)
    const token = (name: string) => styles.getPropertyValue(name).trim()

    return {
      primary: token('--p-primary-color'),
      secondary: token('--p-ftf-indigo-400'),
      secondaryWarm: token('--p-ftf-orange-400'),
      text: token('--p-text-color'),
      muted: token('--p-text-muted-color'),
      border: token('--p-content-border-color'),
    }
  })
}
