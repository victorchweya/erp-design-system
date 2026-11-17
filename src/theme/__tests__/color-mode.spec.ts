import { afterEach, beforeEach, expect, it, vi } from 'vitest'

beforeEach(() => {
  vi.resetModules()
  localStorage.clear()
  document.documentElement.classList.remove('app-dark')
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({ matches: true })),
  )
})

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  document.documentElement.classList.remove('app-dark')
})

it('defaults to light even when the system prefers dark', async () => {
  const { colorMode } = await import('../color-mode')
  expect(colorMode.value).toBe('light')
  expect(document.documentElement.classList.contains('app-dark')).toBe(false)
})

it.each(['light', 'dark'])('restores a saved %s choice', async (mode) => {
  localStorage.setItem('erp-color-mode', mode)
  const { colorMode } = await import('../color-mode')
  expect(colorMode.value).toBe(mode)
  expect(document.documentElement.classList.contains('app-dark')).toBe(mode === 'dark')
})

it('ignores an invalid stored choice', async () => {
  localStorage.setItem('erp-color-mode', 'invalid')
  const { colorMode } = await import('../color-mode')
  expect(colorMode.value).toBe('light')
})

it('applies and remembers a new mode', async () => {
  const { colorMode } = await import('../color-mode')
  const { nextTick } = await import('vue')
  colorMode.value = 'dark'
  await nextTick()
  expect(document.documentElement.classList.contains('app-dark')).toBe(true)
  expect(localStorage.getItem('erp-color-mode')).toBe('dark')
})

it('still switches modes when storage is blocked', async () => {
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
    throw new Error('Blocked')
  })
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
    throw new Error('Blocked')
  })
  const { colorMode } = await import('../color-mode')
  const { nextTick } = await import('vue')
  expect(colorMode.value).toBe('light')
  colorMode.value = 'dark'
  await nextTick()
  expect(document.documentElement.classList.contains('app-dark')).toBe(true)
})
