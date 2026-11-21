import { expect, it } from 'vitest'
import {
  brandColors,
  colorRoles,
  colorValue,
  contrastRatio,
  primitives,
  roleByName,
  secondaryColors,
  semanticColors,
  swatchInk,
  tokenRows,
} from '../color-tokens'

it('preserves core FTF values and records the distinct purple 950 decision', () => {
  expect(brandColors.map(({ label, value }) => [label, value])).toEqual([
    ['Kale', '#1E4A35'],
    ['Lime', '#C2CE86'],
    ['Carrot', '#D78228'],
    ['Tamarind', '#4C352B'],
  ])
  expect(() => colorValue('neutral.850')).toThrow('Undefined FTF color')
  expect(colorValue('purple.950').value).toBe('#2B1721')
  expect(contrastRatio(colorValue('purple.950').value, '#FFFFFF')).toBeGreaterThan(
    contrastRatio(colorValue('purple.900').value, '#FFFFFF'),
  )
  expect(tokenRows.find((row) => row.name === 'ftf.purple.950')?.evidence).toBe('FTF decision')
  expect(primitives.green?.['950']).toBe(primitives.green?.['900'])
  expect(new Set(tokenRows.map((row) => row.name)).size).toBe(tokenRows.length)
})

it('matches the secondary brand palette in guideline order and keeps the approved cream', () => {
  expect(secondaryColors.map(({ name, value }) => [name, value])).toEqual([
    ['yellow.300', '#F5E091'],
    ['yellow.100', '#FFF5DF'],
    ['orange.200', '#F1D3AF'],
    ['orange.400', '#E0AF62'],
    ['green.300', '#85A687'],
    ['violet.500', '#A35380'],
    ['purple.300', '#B58BBB'],
    ['indigo.400', '#8C98EE'],
  ])
})

it('uses WCAG sRGB contrast and rejects unsupported color formats', () => {
  expect(contrastRatio('#000000', '#FFFFFF')).toBe(21)
  expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBe(1)
  expect(() => contrastRatio('rgba(0,0,0,.5)', '#FFFFFF')).toThrow('opaque six-digit')
})

it('orders the neutral ramp from light to dark', () => {
  const contrasts = Object.values(primitives.neutral!).map((color) =>
    contrastRatio(color, '#FFFFFF'),
  )
  expect(contrasts).toEqual([...contrasts].sort((a, b) => a - b))
})

it('uses orange for warnings and dark contrast text on the Carrot fill', () => {
  const warning = semanticColors.find((role) => role.name === 'warn')!
  const message = roleByName('message.warn.color')
  for (const mode of ['light', 'dark'] as const) {
    for (const color of [
      warning[mode].text,
      warning[mode].background,
      warning[mode].hover,
      warning[mode].active,
      message[mode].foreground,
      message[mode].background,
    ]) {
      expect(color.name).toMatch(/^orange\./)
    }
  }
  expect(warning.light.background.value).toBe(
    brandColors.find((color) => color.label === 'Carrot')!.value,
  )
  expect(contrastRatio('#FFFFFF', warning.light.background.value)).toBeLessThan(3)
  expect(
    contrastRatio(warning.light.foreground.value, warning.light.background.value),
  ).toBeGreaterThanOrEqual(4.5)
})

it('uses an accessible emerald success scale distinct from the Kale primary', () => {
  const success = semanticColors.find((role) => role.name === 'success')!
  expect(success.light.background.value).toBe('#2F7D4A')
  expect(success.dark.background.value).toBe('#7BCB91')
  expect(success.light.background.value).not.toBe(colorValue('green.500').value)
  expect(
    contrastRatio(success.light.foreground.value, success.light.background.value),
  ).toBeGreaterThanOrEqual(4.5)
  expect(
    contrastRatio(success.dark.foreground.value, success.dark.background.value),
  ).toBeGreaterThanOrEqual(4.5)
  expect(contrastRatio(success.light.text.value, '#FFFFFF')).toBeGreaterThanOrEqual(4.5)
})

it('uses strong neutral text for light secondary actions', () => {
  const secondary = semanticColors.find((role) => role.name === 'secondary')!
  expect(secondary.light.text.value).toBe('#404040')
  expect(secondary.dark.text.value).toBe('#808080')
})

it('keeps every palette swatch label readable without assigning it a semantic role', () => {
  for (const steps of Object.values(primitives)) {
    for (const background of Object.values(steps)) {
      expect(contrastRatio(swatchInk(background), background)).toBeGreaterThanOrEqual(4.5)
    }
  }
})

it('checks every finalized light and dark text pairing', () => {
  const textPairs = colorRoles
    .filter((role) => !role.kind)
    .flatMap((role) => [role.light, role.dark].filter((pair) => pair !== undefined))
  for (const pair of textPairs) {
    expect(contrastRatio(pair.foreground.value, pair.background.value)).toBeGreaterThanOrEqual(4.5)
  }
  for (const role of colorRoles) {
    expect(role.dark).toBeDefined()
    expect(role.name).not.toContain('proposal')
  }
  expect(
    contrastRatio(
      roleByName('primary.color').light.foreground.value,
      roleByName('primary.color').light.background.value,
    ),
  ).toBeCloseTo(10.07, 2)
})

it('keeps focus boundaries and icons accessible and records the softer default border', () => {
  for (const role of colorRoles.filter(
    (role) =>
      (role.kind === 'boundary' || role.kind === 'icon') && role.name !== 'form.field.border.color',
  )) {
    for (const pair of [role.light, role.dark]) {
      expect(contrastRatio(pair.foreground.value, pair.background.value)).toBeGreaterThanOrEqual(3)
    }
  }
  const divider = roleByName('content.border.color')
  expect(divider.kind).toBe('decorative')
  expect(
    contrastRatio(divider.light.foreground.value, divider.light.background.value),
  ).toBeLessThan(3)
  const inputBorder = roleByName('form.field.border.color')
  // Light mode keeps the soft neutral 200 line. Dark mode uses its own faint lines: a bright
  // #E6E6E6 outline on black is harsh, so dividers and cards use neutral 800 and inputs neutral 700.
  for (const role of [divider, inputBorder]) {
    expect(role.light.foreground.value).toBe('#E6E6E6')
  }
  expect(divider.dark.foreground.value).toBe('#1A1A1A')
  expect(inputBorder.dark.foreground.value).toBe('#333333')
  for (const role of [divider, inputBorder]) {
    expect(contrastRatio(role.dark.foreground.value, role.dark.background.value)).toBeLessThan(3)
  }
  expect(
    contrastRatio(inputBorder.light.foreground.value, inputBorder.light.background.value),
  ).toBeLessThan(3)
  const disabled = roleByName('form.field.disabled.color')
  expect(disabled.kind).toBe('disabled')
  expect(
    contrastRatio(disabled.dark.foreground.value, disabled.dark.background.value),
  ).toBeLessThan(4.5)
})
