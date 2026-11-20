import { afterEach, beforeEach, expect, it } from 'vitest'
import { $dt, Theme } from '@primeuix/styled'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import ErpTheme from '@/theme/erp-theme'
import loadConfig from 'tailwindcss/loadConfig'
import resolveConfig from 'tailwindcss/resolveConfig'
import defaultTheme from 'tailwindcss/defaultTheme'
import { resolve } from 'node:path'

import { brandTokenReferences, primitives } from '../palette'
import { colorRoles, colorValue, contrastRatio, roleByName, semanticColors } from '../color-tokens'
import { fontSizes, fontWeights } from '../typography'
import { spacing } from '../spacing'
import { controlSizes } from '../controls'

const tailwindConfig = loadConfig(resolve('tailwind.config.js'))
const previousTheme = Theme.getTheme() ?? {}
beforeEach(() => {
  Theme.setTheme({
    preset: ErpTheme,
    options: { prefix: 'p', darkModeSelector: '.app-dark' },
  })
})
afterEach(() => Theme.setTheme(previousTheme))

it('keeps shared PrimeVue spacing aligned with Tailwind and preserves control density', () => {
  expect(spacing).toEqual(defaultTheme.spacing)
  expect(resolveConfig(tailwindConfig).theme.spacing).toEqual(spacing)
  for (const [step, value] of Object.entries(spacing)) {
    expect($dt(`spacing.${step}`).value).toBe(value)
  }
  for (const { key, x, y, font } of controlSizes) {
    const size = key === 'md' ? '' : `${key}.`
    for (const group of [
      'form.field',
      'button',
      'inputtext',
      'select',
      'multiselect',
      'cascadeselect',
      'treeselect',
      'textarea',
    ]) {
      expect($dt(`${group}.${size}padding.x`).value).toBe(spacing[x])
      expect($dt(`${group}.${size}padding.y`).value).toBe(spacing[y])
      expect($dt(`${group}.${size}font.size`).value).toBe(fontSizes[font][0])
    }
    for (const token of [
      `button.${size}icon.only.width`,
      `autocomplete.dropdown.${size}width`,
      `datepicker.dropdown.${size}width`,
      `inputotp.input.${size}width`,
    ]) {
      expect($dt(token).value).toContain($dt(`control.${key}.height`).value)
    }
  }
  expect($dt('card.body.padding').value).toBe(spacing[5])
  expect($dt('card.body.gap').value).toBe(spacing[4])
  expect($dt('card.caption.gap').value).toBe(spacing[1])
  expect($dt('tag.padding').value).toBe(`${spacing[0.5]} ${spacing[1.5]}`)
  expect($dt('datatable.body.cell.padding').value).toBe(`${spacing[3]} ${spacing[4]}`)
  expect($dt('dialog.content.padding').value).toBe(spacing[5])
})

it('keeps the public PrimeVue typography scale aligned with default Tailwind utilities', () => {
  const tailwind = resolveConfig(tailwindConfig)
  for (const [name, [size, lineHeight]] of Object.entries(fontSizes)) {
    const expected = [size, { lineHeight }]
    expect(defaultTheme.fontSize[name as keyof typeof fontSizes]).toEqual(expected)
    expect(tailwind.theme.fontSize[name as keyof typeof fontSizes]).toEqual(expected)
    expect($dt(`font.size.${name}`).value).toBe(size)
  }
  for (const [name, value] of Object.entries(fontWeights)) {
    expect(tailwind.theme.fontWeight[name as keyof typeof fontWeights]).toBe(value)
    expect($dt(`font.weight.${name}`).value).toBe(value)
  }
  for (const token of [
    'form.field.font.size',
    'button.font.size',
    'inputtext.font.size',
    'select.font.size',
    'multiselect.font.size',
    'cascadeselect.font.size',
    'treeselect.font.size',
    'textarea.font.size',
    'togglebutton.font.size',
  ]) {
    expect($dt(token).value).toBe(fontSizes.sm[0])
  }
  expect($dt('typography.font.size').value).toBe(fontSizes.base[0])
  expect($dt('typography.line.height').value).toBe('1.5')
  expect($dt('button.sm.font.size').value).toBe(fontSizes.sm[0])
  expect($dt('inputtext.lg.font.size').value).toBe(fontSizes.base[0])
  expect($dt('badge.sm.font.size').value).toBe(fontSizes.xs[0])
  expect($dt('stepper.step.number.font.size').value).toBe(fontSizes.lg[0])
  expect($dt('avatar.xl.font.size').value).toBe(fontSizes['3xl'][0])
})

it('publishes the verified palette and brand aliases without filling missing shades', () => {
  for (const [family, shades] of Object.entries(primitives)) {
    for (const [shade, value] of Object.entries(shades)) {
      expect($dt(`ftf.${family}.${shade}`).value).toBe(value)
    }
  }
  for (const [brand, reference] of Object.entries(brandTokenReferences)) {
    expect($dt(`ftf.${brand}`).value).toBe(colorValue(reference).value)
  }
  const css = Theme.getCommon().primitive.css
  expect(css).toContain('--p-ftf-kale:var(--p-ftf-green-500)')
  expect(css).toContain('--p-ftf-tamarind:var(--p-ftf-brown-800)')
  expect(css).toContain('--p-ftf-purple-950:#2B1721')
  expect(css).not.toContain('--p-ftf-neutral-850:')
  expect($dt('orange.500').value).toBe('#f97316')
})

it('styles current multi-value and colour controls with resolved shared theme tokens', () => {
  for (const suffix of [
    'background',
    'disabled.background',
    'filled.background',
    'filled.hover.background',
    'filled.focus.background',
    'border.color',
    'hover.border.color',
    'focus.border.color',
    'invalid.border.color',
    'color',
    'disabled.color',
    'padding.x',
    'padding.y',
    'border.radius',
    'focus.ring.width',
    'focus.ring.color',
  ]) {
    expect($dt(`inputtags.${suffix}`).value).toBe($dt(`form.field.${suffix}`).value)
    expect($dt(`inputtags.${suffix}`).value).toBeDefined()
  }
  for (const token of [
    'inputcolor.border.color',
    'inputcolor.area.border.radius',
    'inputcolor.slider.size',
    'inputcolor.handle.size',
    'inputcolor.handle.focus.ring.outline.color',
    'inputcolor.transparency.grid.color',
    'inputcolor.swatch.size',
    'avatar.font.weight',
    'chip.focus.background',
    'chip.label.font.size',
    'card.subtitle.font.size',
    'datepicker.date.font.size',
    'datepicker.time.picker.color',
    'fileupload.file.name.color',
    'inputgroup.addon.font.size',
  ])
    expect($dt(token).value, token).toBeDefined()
  for (const component of ['autocomplete', 'select', 'multiselect', 'listbox', 'cascadeselect']) {
    expect($dt(`${component}.option.font.size`).value).toBe(fontSizes.sm[0])
    expect($dt(`${component}.option.font.weight`).value).toBe(fontWeights.normal)
  }
})

it('resolves primary button states to the documented accessible light and dark pairs', () => {
  for (const [roleName, componentToken] of [
    ['primary.color', 'button.primary.background'],
    ['primary.hover.color', 'button.primary.hover.background'],
    ['primary.active.color', 'button.primary.active.background'],
  ]) {
    const role = roleByName(roleName!)
    const expected = `light-dark(${role.light.background.value},${role.dark!.background.value})`
    expect($dt(roleName!).value).toBe(expected)
    expect($dt(componentToken!).value).toBe(expected)
    for (const pair of [role.light, role.dark!]) {
      expect(contrastRatio(pair.foreground.value, pair.background.value)).toBeGreaterThanOrEqual(
        4.5,
      )
    }
  }
  const primary = roleByName('primary.color')
  expect($dt('primary.contrast.color').value).toBe(
    `light-dark(${primary.light.foreground.value},${primary.dark!.foreground.value})`,
  )
})

it('publishes the same verified neutral ramp as surfaces in both modes', () => {
  for (const [shade, value] of Object.entries(primitives.neutral!)) {
    expect($dt(`surface.${shade}`).value).toBe(value)
  }
  const css = postcss.parse(Theme.getCommon().semantic.css ?? '')
  for (const selector of [':root,:host', '.app-dark']) {
    const declarations: Record<string, string> = {}
    css.walkRules(selector, (rule) => {
      rule.walkDecls((declaration) => {
        declarations[declaration.prop] = declaration.value
      })
    })
    expect(declarations['--p-surface-0']).toBe('var(--p-ftf-neutral-0)')
    expect(declarations['--p-surface-900']).toBe('var(--p-ftf-neutral-900)')
  }
})

it('generates semantic, brand, palette, opacity and dark Tailwind utilities from theme variables', async () => {
  const result = await postcss([
    tailwindcss({
      ...tailwindConfig,
      content: [
        {
          raw: [
            'bg-surface text-surface text-muted text-color text-muted-color bg-surface-0 dark:bg-surface-900 bg-kale bg-lime bg-carrot text-tamarind bg-kale/50 text-warn/50 bg-ftf-green-500 border-ftf-neutral-200 bg-ftf-purple-950 bg-status-warning text-status-warning-contrast',
            ...semanticColors.map(({ name }) => `text-${name} bg-${name} text-${name}-contrast`),
          ].join(' '),
          extension: 'html',
        },
      ],
    }),
  ]).process('@tailwind utilities;', { from: undefined })
  for (const variable of [
    '--p-primary-color',
    '--p-primary-contrast-color',
    '--p-surface-0',
    '--p-surface-900',
    '--p-ftf-kale',
    '--p-ftf-lime',
    '--p-ftf-carrot',
    '--p-ftf-tamarind',
    '--p-ftf-green-500',
    '--p-ftf-neutral-200',
  ]) {
    expect(result.css).toContain(`var(${variable})`)
  }
  expect(result.css).toContain('calc(100% * 0.5)')
  expect(result.css).toContain('.app-dark')
  expect(result.css).toContain('--p-ftf-purple-950')
  expect(result.css).toContain('--p-status-warning-background')
  expect(result.css).toContain('--p-status-warning-color')
  const css = postcss.parse(result.css)
  const variablesFor = (selector: string, property: string) => {
    const values: string[] = []
    css.walkRules(selector, (rule) => {
      rule.walkDecls(property, (declaration) => {
        values.push(declaration.value)
      })
    })
    return values.join(' ')
  }
  for (const { name } of semanticColors) {
    const textToken = name === 'primary' ? 'primary-color' : `severity-${name}-color`
    const backgroundToken = name === 'primary' ? 'primary-color' : `severity-${name}-background`
    if (name === 'secondary') {
      expect(variablesFor('.text-secondary', 'color')).toBe('')
    } else {
      expect(variablesFor(`.text-${name}`, 'color')).toContain(`var(--p-${textToken})`)
    }
    expect(variablesFor(`.bg-${name}`, 'background-color')).toContain(`var(--p-${backgroundToken})`)
    const contrastToken =
      name === 'primary' ? 'primary-contrast-color' : `severity-${name}-contrast-color`
    expect(variablesFor(`.text-${name}-contrast`, 'color')).toContain(`var(--p-${contrastToken})`)
  }
  expect(variablesFor('.bg-surface', 'background-color')).toContain('var(--p-content-background)')
  expect(variablesFor('.text-surface', 'color')).toContain('var(--p-content-background)')
  expect(variablesFor('.text-muted', 'color')).toContain('var(--p-text-muted-color)')
  expect(variablesFor('.text-warn\\/50', 'color')).toContain('calc(100% * 0.5)')
})

it('resolves finalized feedback component defaults and input roles from the foundation pairs', () => {
  const resolvedPairValue = (light: string, dark: string) =>
    light === dark ? light : `light-dark(${light},${dark})`
  for (const severity of ['success', 'info', 'warn', 'error']) {
    const role = roleByName(`message.${severity}.color`)
    for (const component of ['message', 'tag', 'badge']) {
      const componentSeverity =
        severity === 'error' && ['tag', 'badge'].includes(component) ? 'danger' : severity
      expect($dt(`${component}.${componentSeverity}.background`).value).toBe(
        resolvedPairValue(role.light.background.value, role.dark.background.value),
      )
      expect($dt(`${component}.${componentSeverity}.color`).value).toBe(
        resolvedPairValue(role.light.foreground.value, role.dark.foreground.value),
      )
    }
    // Toasts use the light surface in light mode and the dark content surface in dark mode.
    const darkRole = (name: string) => roleByName(name).dark
    expect($dt(`toast.${severity}.background`).value).toBe(
      resolvedPairValue(
        String($dt('surface.0').value),
        darkRole('content.background').background.value,
      ),
    )
    expect($dt(`toast.${severity}.border.color`).value).toBe(
      resolvedPairValue(
        String($dt('surface.50').value),
        darkRole('content.border.color').foreground.value,
      ),
    )
    expect($dt(`toast.${severity}.color`).value).toBe(
      resolvedPairValue(role.light.foreground.value, role.dark.foreground.value),
    )
    expect($dt(`toast.${severity}.detail.color`).value).toBe(
      resolvedPairValue(
        String($dt('surface.600').value),
        darkRole('text.muted.color').foreground.value,
      ),
    )
    expect($dt(`toast.${severity}.shadow`).value).toBe('0 1px 2px 0 rgb(0 0 0 / 0.05)')
  }
  for (const role of colorRoles) {
    expect($dt(role.foregroundToken).value).toBe(
      resolvedPairValue(role.light.foreground.value, role.dark.foreground.value),
    )
    expect($dt(role.backgroundToken).value).toBe(
      resolvedPairValue(role.light.background.value, role.dark.background.value),
    )
  }
  expect($dt('card.subtitle.color').value).toBe($dt('text.muted.color').value)
  expect($dt('inputtext.color').value).toBe($dt('form.field.color').value)
  expect($dt('inputtext.disabled.color').value).toBe($dt('form.field.disabled.color').value)
  expect($dt('select.option.selected.background').value).toBe($dt('highlight.background').value)
  expect($dt('select.option.selected.focus.background').value).toBe(
    $dt('highlight.focus.background').value,
  )
  expect(Theme.getCommon().semantic.css).toContain('--p-status-warning-color:')
  expect(Theme.getCommon().semantic.css).toContain('--p-severity-warn-color:')
})

it('keeps success emerald and distinct from the Kale primary across components', () => {
  expect($dt('severity.success.background').value).toBe('light-dark(#2F7D4A,#7BCB91)')
  expect($dt('severity.success.color').value).toBe('light-dark(#2F7D4A,#7BCB91)')
  expect($dt('message.success.background').value).toBe('light-dark(#EAF6EE,#163D25)')
  expect($dt('message.success.color').value).toBe('light-dark(#2F7D4A,#7BCB91)')
  expect($dt('button.success.background').value).not.toBe($dt('button.primary.background').value)
  expect($dt('tag.success.background').value).toBe($dt('message.success.background').value)
  expect($dt('badge.success.background').value).toBe($dt('message.success.background').value)
})

it('shares accessible severity roles with filled, text, and outlined PrimeVue buttons', () => {
  const resolved = (light: string, dark: string) =>
    light === dark ? light : `light-dark(${light},${dark})`
  for (const role of semanticColors) {
    for (const [state, property] of [
      ['', 'background'],
      ['hover.', 'hover'],
      ['active.', 'active'],
    ] as const) {
      const light = role.light[property].value
      const dark = role.dark[property].value
      expect($dt(`button.${role.name}.${state}background`).value).toBe(resolved(light, dark))
      for (const mode of ['light', 'dark'] as const) {
        expect(
          contrastRatio(role[mode].foreground.value, role[mode][property].value),
        ).toBeGreaterThanOrEqual(4.5)
      }
    }
    expect($dt(`button.${role.name}.color`).value).toBe(
      resolved(role.light.foreground.value, role.dark.foreground.value),
    )
    for (const variant of ['text', 'outlined']) {
      expect($dt(`button.${variant}.${role.name}.color`).value).toBe(
        resolved(role.light.text.value, role.dark.text.value),
      )
    }
    // Text variants blend at most 8% of their text color into the content surface.
    for (const mode of ['light', 'dark'] as const) {
      const foreground = role[mode].text.value
      const surface = roleByName('content.background')[mode].background.value
      for (const opacity of [0, 0.04, 0.08]) {
        const background =
          '#' +
          [1, 3, 5]
            .map((offset) => {
              const ink = parseInt(foreground.slice(offset, offset + 2), 16)
              const fill = parseInt(surface.slice(offset, offset + 2), 16)
              return Math.round(ink * opacity + fill * (1 - opacity))
                .toString(16)
                .padStart(2, '0')
            })
            .join('')
        expect(contrastRatio(foreground, background)).toBeGreaterThanOrEqual(4.5)
      }
    }
  }
})
