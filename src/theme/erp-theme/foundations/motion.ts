// Values match Tailwind's default duration and easing utilities.
export const motionDurations = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
} as const

export const motionEasings = {
  standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
  enter: 'cubic-bezier(0, 0, 0.2, 1)',
  exit: 'cubic-bezier(0.4, 0, 1, 1)',
} as const

export const motionTokens = {
  duration: motionDurations,
  easing: motionEasings,
}
