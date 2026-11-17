import { shallowRef, watch } from 'vue'

type ColorMode = 'light' | 'dark'
const storageKey = 'erp-color-mode'

function readColorMode(): ColorMode {
  try {
    const saved = localStorage.getItem(storageKey)
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // Storage may be blocked; use the default instead.
  }

  return 'light'
}

export const colorMode = shallowRef<ColorMode>(readColorMode())

watch(
  colorMode,
  (mode) => {
    document.documentElement.classList.toggle('app-dark', mode === 'dark')

    try {
      localStorage.setItem(storageKey, mode)
    } catch {
      // Mode changes still work when storage is unavailable.
    }
  },
  { immediate: true },
)
