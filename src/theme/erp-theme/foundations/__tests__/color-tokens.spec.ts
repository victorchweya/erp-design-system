import { expect, it } from 'vitest'
import {
  brandColors,
  colorRoles,
  colorValue,
  contrastRatio,
  cream,
  primitives,
  roleByName,
  swatchInk,
  tokenRows,
} from '../color-tokens'

it('preserves the core FTF values and does not fill missing shades', () => {
  expect(brandColors.map(({ label, value }) => [label, value])).toEqual([
    ['Forest', '#1E4A35'],
    ['Lime', '#C2CE86'],
    ['Carrot', '#D78228'],
    ['Soil', '#4C352B'],
  ])
  expect(() => colorValue('neutral.850')).toThrow('Undefined FTF color')
  expect(() => colorValue('purple.950')).toThrow('Undefined FTF color')
  expect(primitives.green?.['950']).toBe(primitives.green?.['900'])
  expect(new Set(tokenRows.map((row) => row.name)).size).toBe(tokenRows.length)
})

it('uses WCAG sRGB contrast and rejects unsupported color formats', () => {
  expect(contrastRatio('#000000', '#FFFFFF')).toBe(21)
  expect(contrastRatio('#FFFFFF', '#FFFFFF')).toBe(1)
  expect(contrastRatio('#D78228', cream.value)).toBeCloseTo(2.738, 3)
  expect(contrastRatio('#D78228', cream.value)).toBeLessThan(3)
  expect(() => contrastRatio('rgba(0,0,0,.5)', '#FFFFFF')).toThrow('opaque six-digit')
})

it('keeps every palette swatch label readable without assigning it a semantic role', () => {
  for (const steps of Object.values(primitives)) {
    for (const background of Object.values(steps)) {
      expect(contrastRatio(swatchInk(background), background)).toBeGreaterThanOrEqual(4.5)
    }
  }
})

it('checks every recommended text pair and leaves proposed dark roles undefined', () => {
  const textPairs = colorRoles
    .filter((role) => role.kind !== 'boundary')
    .flatMap((role) => [role.light, role.dark].filter((pair) => pair !== undefined))
  for (const pair of textPairs) {
    expect(contrastRatio(pair.foreground.value, pair.background.value)).toBeGreaterThanOrEqual(4.5)
  }
  for (const role of colorRoles.filter((role) => role.evidence === 'Proposal')) {
    expect(role.dark).toBeUndefined()
  }
  expect(
    contrastRatio(
      roleByName('primary.color').light.foreground.value,
      roleByName('primary.color').light.background.value,
    ),
  ).toBeCloseTo(10.07, 2)
})

it('exposes existing low-contrast boundaries without treating them as approved pairs', () => {
  const role = roleByName('form.field.border.color')
  expect(role.evidence).toBe('Verified')
  expect(contrastRatio(role.light.foreground.value, role.light.background.value)).toBeLessThan(3)
  expect(role.note).toContain('not endorsed')
})
