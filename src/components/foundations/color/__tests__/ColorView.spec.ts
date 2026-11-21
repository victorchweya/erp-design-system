import { afterEach, expect, it, vi } from 'vitest'
import { enableAutoUnmount, mount } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ColorView from '@/views/foundations/ColorView.vue'
import ErpTheme from '@/theme/erp-theme'

enableAutoUnmount(afterEach)
afterEach(() => vi.unstubAllGlobals())

// Rendering the full page with the ERP preset is slow under parallel test load.
it('renders the color documentation without internal audit notes', () => {
  vi.stubGlobal(
    'matchMedia',
    vi.fn(() => ({
      matches: false,
      addEventListener: vi.fn<() => void>(),
      removeEventListener: vi.fn<() => void>(),
    })),
  )
  const wrapper = mount(ColorView, {
    global: {
      plugins: [
        [PrimeVue, { theme: { preset: ErpTheme, options: { darkModeSelector: '.app-dark' } } }],
      ],
    },
  })
  expect(wrapper.get('header h1').text()).toBe('Colour')
  expect(wrapper.get('header p.text-primary').text()).toBe('Foundations')
  const usage = wrapper.get('#color-how-to-use')
  expect(usage.find('pre').exists()).toBe(false)
  expect(usage.findAll('p')).toHaveLength(4)
  expect(usage.findAll('code').map((code) => code.text())).toEqual(
    expect.arrayContaining([
      'bg-primary',
      'text-color',
      'border-surface',
      'var(--p-primary-color)',
      'text-muted',
      'bg-kale',
      'text-primary-contrast',
      'bg-warn',
      'text-warn-contrast',
    ]),
  )
  const usageTags = usage.findAllComponents({ name: 'Tag' })
  expect(usageTags).toHaveLength(11)
  for (const tag of usageTags) {
    expect(tag.props('severity')).toBe('secondary')
    expect(tag.find('code').exists()).toBe(true)
  }
  expect(wrapper.findAll('h2').map((heading) => heading.text())).toEqual([
    'How to use',
    'Brand',
    'Background',
    'Text',
    'Borders & inputs',
    'Status',
    'Palette',
    'Shadows',
    'Token table',
  ])
  for (const link of wrapper.findAll('a[href^="#"]')) {
    expect(wrapper.find(link.attributes('href')!).exists()).toBe(true)
  }
  const shadows = wrapper.get('#color-shadows')
  const shadowUtilities = [
    'shadow-sm',
    'shadow',
    'shadow-md',
    'shadow-lg',
    'shadow-xl',
    'shadow-2xl',
    'shadow-inner',
    'shadow-none',
  ]
  expect(shadows.findAll('code').map((code) => code.text())).toEqual(shadowUtilities)
  shadows.findAll('[role="figure"]').forEach((figure, index) => {
    expect(figure.get('[aria-hidden="true"]').classes()).toContain(shadowUtilities[index])
  })
  expect(wrapper.text()).not.toContain('No dark pairing inferred')
  expect(wrapper.text()).not.toContain('Local PrimeVue examples')
  expect(wrapper.text()).not.toContain('Confirm Order')
  const brand = wrapper.get('#color-brand')
  expect(brand.findAll('[role="figure"]')).toHaveLength(12)
  expect(brand.text()).toContain('Cream#FFF5DF')
  expect(brand.text()).toContain('Peach#F1D3AF')
  expect(brand.text()).toContain('Ochre#E0AF62')
  expect(wrapper.get('table').attributes('aria-label')).toBe('FTF color token reference')
  expect(wrapper.text()).not.toContain('Proposal')
  expect(wrapper.text()).not.toContain('FTF v1 decision')
  expect(wrapper.text()).not.toContain('Verified in legacy FTF')
  expect(wrapper.text()).not.toContain('Foundation decisions')
  expect(wrapper.text()).not.toContain('ftf-presets.ts')
  expect(wrapper.findAll('th').map((heading) => heading.text())).not.toContain('Evidence')
  const table = wrapper.get('table')
  expect(table.findAll('th').map((heading) => heading.text())).toEqual([
    'Role',
    'Token',
    'Light',
    'Dark',
  ])
  const rows = table.findAll('tbody tr')
  const primaryRow = rows.find((row) => row.findAll('td')[1]?.text() === 'primary.color')!
  const lightCell = primaryRow.findAll('td')[2]!
  const darkCell = primaryRow.findAll('td')[3]!
  expect(lightCell.text()).toContain('green.500')
  expect(lightCell.text()).toContain('#1E4A35')
  expect(darkCell.text()).toContain('#85A687')
  expect(lightCell.findAll('[aria-hidden="true"]')).toHaveLength(2)
  expect(darkCell.findAll('[aria-hidden="true"]')).toHaveLength(2)
  expect(lightCell.get('[title="Background"] [aria-hidden="true"]').attributes('style')).toBe(
    'background-color: rgb(30, 74, 53);',
  )
  const paletteRow = rows.find((row) => row.findAll('td')[1]?.text() === 'ftf.green.500')!
  expect(paletteRow.findAll('[aria-hidden="true"]')).toHaveLength(1)
  expect(paletteRow.get('[aria-label="No dark-mode mapping"]').text()).toBe('—')
  expect(wrapper.text()).toContain('#2B1721')
  const text = wrapper.get('#color-text')
  expect(text.findAll('h3').map((heading) => heading.text())).toEqual(
    expect.arrayContaining([
      'text-color',
      'text-surface',
      'text-muted',
      'text-primary',
      'Text hover',
      'text-success',
      'text-warn',
      'text-danger',
      'text-info',
      'text-help',
      'text-contrast',
    ]),
  )
  expect(text.findAll('code').map((token) => token.text())).toContain('text.color')
  expect(text.findAll('code').map((token) => token.text())).toContain('text.muted.color')
  expect(text.findAll('h3').filter((heading) => heading.text() === 'text-muted')).toHaveLength(1)
  expect(wrapper.findAll('code').map((token) => token.text())).not.toContain('text-secondary')
  const warning = text.findAll('[role="figure"]').find((figure) => figure.get('h3').text() === 'text-warn')!
  expect(warning.get('code').text()).toBe('severity.warn.color')
  expect(warning.text()).toContain('Light #8D5317')
  expect(warning.text()).toContain('Dark #EBC194')
  const warningHalves = warning.findAll('[aria-hidden="true"] > div')
  expect(warningHalves[0]!.attributes('style')).toContain('color: rgb(141, 83, 23)')
  expect(warningHalves[1]!.attributes('style')).toContain('color: rgb(235, 193, 148)')
  const background = wrapper.get('#color-background')
  expect(background.findAll('h3').map((heading) => heading.text())).toEqual(
    [
      'surface',
      'primary',
      'secondary',
      'success',
      'info',
      'warn',
      'help',
      'danger',
      'contrast',
    ].map((name) => `bg-${name}`),
  )
  const warningBackground = background
    .findAll('[role="figure"]')
    .find((figure) => figure.get('h3').text() === 'bg-warn')!
  expect(warningBackground.get('code').text()).toBe('severity.warn.background')
  expect(warningBackground.text()).toContain('Light #D78228')
  expect(warningBackground.text()).toContain('Dark #E0AF62')
  const backgroundHalves = warningBackground.findAll('[aria-hidden="true"] > div')
  expect(backgroundHalves[0]!.attributes('style')).toContain(
    'background-color: rgb(215, 130, 40)',
  )
  expect(backgroundHalves[1]!.attributes('style')).toContain(
    'background-color: rgb(224, 175, 98)',
  )
  for (const section of [text, background]) {
    const labels = section.findAll('h3').map((heading) => heading.text())
    expect(new Set(labels).size).toBe(labels.length)
    for (const figure of section.findAll('[role="figure"]')) {
      const halves = figure.findAll('[aria-hidden="true"] > div')
      expect(halves).toHaveLength(2)
      expect(halves.map((half) => half.text())).toEqual(['Aa', 'Aa'])
      expect(figure.text()).toContain('Light #')
      expect(figure.text()).toContain('Dark #')
      expect(figure.text()).not.toContain('Foreground:')
      expect(figure.text()).not.toContain('Passes')
      expect(figure.text()).not.toContain('semantic role')
    }
  }
  const inputs = wrapper.get('#color-inputs')
  expect(inputs.findAll('h3').map((heading) => heading.text())).toEqual([
    'Default border',
    'Hover border',
    'Focus border',
    'Invalid border',
    'Disabled background',
    'Disabled text',
  ])
  expect(inputs.findAll('[role="figure"]')).toHaveLength(6)
  for (const figure of inputs.findAll('[role="figure"]')) {
    expect(figure.text()).toContain('Light #')
    expect(figure.text()).toContain('Dark #')
    expect(figure.text()).not.toContain('Foreground:')
    expect(figure.get('[aria-hidden="true"]').attributes('style')).toContain('var(--p-form-field-')
  }
  const status = wrapper.get('#color-status')
  expect(status.findAll('h3').map((heading) => heading.text())).toEqual([
    'Primary',
    'Secondary',
    'Success',
    'Info',
    'Warn',
    'Danger',
    'Contrast',
  ])
  expect(status.findAll('[role="figure"]')).toHaveLength(7)
  for (const figure of status.findAll('[role="figure"]')) {
    const severity = figure.get('h3').text().toLowerCase()
    expect(figure.text()).toContain(`bg-${severity}`)
    expect(figure.text()).toContain(`text-${severity}-contrast`)
    expect(figure.text()).toContain('Light #')
    expect(figure.text()).toContain('Dark #')
    expect(figure.text()).not.toContain('Foreground:')
    expect(figure.get('[aria-hidden="true"]').attributes('style')).toContain(
      `var(--p-severity-${severity}-background)`,
    )
  }
}, 15_000)
