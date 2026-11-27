// Stacking order for the app shell and PrimeVue overlays.
// PrimeVue increments from these bases as overlays open, so later overlays stack above earlier ones.
export const appShellLayers = {
  topbar: 20,
  sidebar: 30,
} as const

// Keep feedback outside the automatic overlay stack so later modals cannot cover it.
export const notificationLayers = {
  toast: 10000,
} as const

export const overlayZIndex = {
  overlay: 1000,
  menu: 1000,
  modal: 1100,
  tooltip: 1100,
} as const
