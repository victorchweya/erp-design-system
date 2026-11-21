import { brandTokenReferences, paletteDecisions, primitives } from './palette'

export { primitives } from './palette'

export const referenceSource = {
  commit: 'ac29ac16cc12f7a69c49cbc10ba09f75b6149c03',
  repository: 'https://github.com/Farm2Feed/ftfdesignsystem',
  files: ['src/styles/base.css', 'src/theme/ftf-presets.ts', 'src/views/uikit/ColorsDoc.vue'],
}

export interface ColorValue {
  name: string
  value: string
}

export interface ColorPair {
  foreground: ColorValue
  background: ColorValue
}

export interface ColorRole {
  name: string
  label: string
  foregroundToken: string
  backgroundToken: string
  scope?: 'component' | 'custom'
  purpose: string
  group: 'brand' | 'surface' | 'text' | 'inputs' | 'status' | 'accent'
  evidence: 'Verified' | 'FTF decision'
  source: string
  light: ColorPair
  dark: ColorPair
  kind?: 'boundary' | 'decorative' | 'icon' | 'disabled'
  note?: string
}

export function colorValue(name: string): ColorValue {
  const [family, step] = name.split('.')
  const value = primitives[family ?? '']?.[step ?? '']
  if (!value) throw new Error(`Undefined FTF color: ${name}`)
  return { name, value }
}

function pair(foreground: string, background: string): ColorPair {
  return { foreground: colorValue(foreground), background: colorValue(background) }
}

const primaryPairs = {
  light: pair('neutral.0', 'green.500'),
  dark: pair('green.900', 'green.300'),
}

export const brandColors = [
  { label: 'Kale', purpose: 'Primary brand', ...colorValue(brandTokenReferences.kale) },
  { label: 'Lime', purpose: 'Natural brand accent', ...colorValue(brandTokenReferences.lime) },
  { label: 'Carrot', purpose: 'Warm brand accent', ...colorValue(brandTokenReferences.carrot) },
  {
    label: 'Tamarind',
    purpose: 'Earthy brand accent',
    ...colorValue(brandTokenReferences.tamarind),
  },
]

export const secondaryColors = [
  { label: 'Yellow', ...colorValue('yellow.300') },
  { label: 'Cream', ...colorValue('yellow.100') },
  { label: 'Peach', ...colorValue('orange.200') },
  { label: 'Ochre', ...colorValue('orange.400') },
  { label: 'Green', ...colorValue('green.300') },
  { label: 'Violet', ...colorValue('violet.500') },
  { label: 'Purple', ...colorValue('purple.300') },
  { label: 'Indigo', ...colorValue('indigo.400') },
]

export const colorRoles: ColorRole[] = [
  {
    name: 'primary.color',
    label: 'Primary action',
    foregroundToken: 'primary.contrast.color',
    backgroundToken: 'primary.color',
    purpose: 'Primary action fill; pair with primary.contrast.color.',
    group: 'brand',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.primary',
    ...primaryPairs,
  },
  {
    name: 'primary.hover.color',
    label: 'Primary action hover',
    foregroundToken: 'primary.contrast.color',
    backgroundToken: 'primary.hover.color',
    purpose: 'Primary action hover fill.',
    group: 'brand',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.primary',
    light: pair('neutral.0', 'green.600'),
    dark: pair('green.900', 'green.200'),
  },
  {
    name: 'primary.active.color',
    label: 'Primary action pressed',
    foregroundToken: 'primary.contrast.color',
    backgroundToken: 'primary.active.color',
    purpose: 'Primary action pressed fill.',
    group: 'brand',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.primary',
    light: pair('neutral.0', 'green.700'),
    dark: pair('green.900', 'green.100'),
  },
  {
    name: 'content.background',
    label: 'bg-surface',
    foregroundToken: 'content.color',
    backgroundToken: 'content.background',
    purpose: 'Content surface with content.color.',
    group: 'surface',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.content',
    light: pair('neutral.900', 'neutral.0'),
    dark: pair('neutral.0', 'neutral.900'),
  },
  {
    name: 'content.hover.background',
    label: 'Content surface hover',
    foregroundToken: 'content.hover.color',
    backgroundToken: 'content.hover.background',
    purpose: 'Subtle hover surface with content.hover.color.',
    group: 'surface',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.content',
    light: pair('neutral.900', 'neutral.50'),
    dark: pair('neutral.0', 'neutral.800'),
  },
  {
    name: 'overlay.select.background',
    label: 'Select overlay',
    foregroundToken: 'overlay.select.color',
    backgroundToken: 'overlay.select.background',
    purpose: 'Select overlay surface with overlay.select.color.',
    group: 'surface',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.overlay.select',
    light: pair('neutral.900', 'neutral.0'),
    dark: pair('neutral.0', 'neutral.900'),
  },
  {
    name: 'text.color',
    label: 'text-color',
    foregroundToken: 'text.color',
    backgroundToken: 'content.background',
    purpose: 'Primary body text on the content surface.',
    group: 'text',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.content',
    light: pair('neutral.900', 'neutral.0'),
    dark: pair('neutral.0', 'neutral.900'),
  },
  {
    name: 'text-surface',
    label: 'text-surface',
    foregroundToken: 'content.background',
    backgroundToken: 'severity.contrast.background',
    scope: 'custom',
    purpose: 'Surface-coloured text on bg-contrast; follows bg-surface in light and dark mode.',
    group: 'text',
    evidence: 'FTF decision',
    source: 'Tailwind alias of the existing content.background token.',
    light: pair('neutral.0', 'neutral.950'),
    dark: pair('neutral.900', 'neutral.0'),
  },
  {
    name: 'text.muted.color',
    label: 'text-muted',
    foregroundToken: 'text.muted.color',
    backgroundToken: 'content.background',
    purpose: 'Supporting text and descriptions on the content background.',
    group: 'text',
    evidence: 'Verified',
    source: 'ftf-presets.ts · components.card',
    light: pair('neutral.500', 'neutral.0'),
    dark: pair('neutral.400', 'neutral.900'),
  },
  {
    name: 'form.field.placeholder.color',
    label: 'Input placeholder',
    foregroundToken: 'form.field.placeholder.color',
    backgroundToken: 'form.field.background',
    purpose: 'Placeholder text on a field background; keep a visible label.',
    group: 'inputs',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.formField',
    light: pair('neutral.500', 'neutral.0'),
    dark: pair('neutral.400', 'neutral.900'),
  },
  {
    name: 'text.hover.color',
    label: 'Text hover',
    foregroundToken: 'text.hover.color',
    backgroundToken: 'content.hover.background',
    purpose: 'Text on a hovered content surface.',
    group: 'text',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.900', 'neutral.50'),
    dark: pair('neutral.0', 'neutral.800'),
  },
  {
    name: 'text.hover.muted.color',
    label: 'Text secondary hover',
    foregroundToken: 'text.hover.muted.color',
    backgroundToken: 'content.hover.background',
    purpose: 'Emphasized secondary text on a hovered content surface.',
    group: 'text',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.900', 'neutral.50'),
    dark: pair('neutral.0', 'neutral.800'),
  },
  {
    name: 'primary.contrast.color',
    label: 'Text on primary',
    foregroundToken: 'primary.contrast.color',
    backgroundToken: 'primary.color',
    purpose: 'Contrast text for a primary action fill; this is not a general inverse-text token.',
    group: 'text',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.0', 'green.500'),
    dark: pair('green.900', 'green.300'),
  },
  {
    name: 'content.border.color',
    label: 'Border subtle / separator',
    foregroundToken: 'content.border.color',
    backgroundToken: 'content.background',
    purpose: 'Decorative surface separator, not a sufficient control boundary.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'FTF decision · neutral 200 default borders; dark mode uses a faint neutral 800 line.',
    light: pair('neutral.200', 'neutral.0'),
    dark: pair('neutral.800', 'neutral.900'),
    kind: 'decorative',
    note: 'Below 3:1 in both modes: do not rely on this line alone to identify an essential control.',
  },
  {
    name: 'form.field.background',
    label: 'Input background',
    foregroundToken: 'form.field.color',
    backgroundToken: 'form.field.background',
    purpose: 'Field fill paired with form.field.color.',
    group: 'inputs',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.formField',
    light: pair('neutral.900', 'neutral.0'),
    dark: pair('neutral.0', 'neutral.900'),
  },
  {
    name: 'form.field.border.color',
    label: 'Input border default',
    foregroundToken: 'form.field.border.color',
    backgroundToken: 'form.field.background',
    purpose: 'Default input outline against its field background.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'FTF decision · neutral 200 default borders; dark mode uses neutral 700.',
    light: pair('neutral.200', 'neutral.0'),
    dark: pair('neutral.700', 'neutral.900'),
    kind: 'boundary',
    note: 'Below 3:1 in both modes. Keep a visible label and the separate focus indicator.',
  },
  {
    name: 'form.field.focus.border.color',
    label: 'Input border focus',
    foregroundToken: 'form.field.focus.border.color',
    backgroundToken: 'form.field.background',
    purpose: 'Focused field boundary against its field background.',
    group: 'inputs',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.formField',
    light: pair('green.400', 'neutral.0'),
    dark: pair('green.300', 'neutral.900'),
    kind: 'boundary',
  },
  {
    name: 'form.field.invalid.border.color',
    label: 'Input border invalid',
    foregroundToken: 'form.field.invalid.border.color',
    backgroundToken: 'form.field.background',
    purpose: 'Invalid field boundary; also provide an error label.',
    group: 'inputs',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.formField',
    light: pair('red.500', 'neutral.0'),
    dark: pair('red.400', 'neutral.900'),
    kind: 'boundary',
  },
  {
    name: 'focus.ring.color',
    label: 'Focus indicator',
    foregroundToken: 'focus.ring.color',
    backgroundToken: 'content.background',
    purpose: 'Focus indicator on the default content surface.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'FTF v1 decision · opaque focus colors for both modes.',
    light: pair('green.400', 'neutral.0'),
    dark: pair('green.300', 'neutral.900'),
    kind: 'boundary',
  },
  {
    name: 'form.field.color',
    label: 'Input value',
    foregroundToken: 'form.field.color',
    backgroundToken: 'form.field.background',
    purpose: 'Entered field value on the default field fill.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.900', 'neutral.0'),
    dark: pair('neutral.0', 'neutral.900'),
  },
  {
    name: 'form.field.hover.border.color',
    label: 'Input border hover',
    foregroundToken: 'form.field.hover.border.color',
    backgroundToken: 'form.field.background',
    purpose: 'Hovered field boundary; focus also retains keyboard focus behavior.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('green.400', 'neutral.0'),
    dark: pair('green.300', 'neutral.900'),
    kind: 'boundary',
  },
  {
    name: 'form.field.disabled.background',
    label: 'Input background disabled',
    foregroundToken: 'form.field.disabled.color',
    backgroundToken: 'form.field.disabled.background',
    purpose: 'Disabled field fill with disabled value text.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.500', 'neutral.200'),
    dark: pair('neutral.400', 'neutral.700'),
    kind: 'disabled',
  },
  {
    name: 'form.field.disabled.color',
    label: 'Input text disabled',
    foregroundToken: 'form.field.disabled.color',
    backgroundToken: 'form.field.disabled.background',
    purpose: 'Disabled field text only; never use this role for helper text or an enabled control.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.500', 'neutral.200'),
    dark: pair('neutral.400', 'neutral.700'),
    kind: 'disabled',
  },
  {
    name: 'form.field.filled.background',
    label: 'Input background filled',
    foregroundToken: 'form.field.color',
    backgroundToken: 'form.field.filled.background',
    purpose: 'Field fill for the filled variant.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.900', 'neutral.50'),
    dark: pair('neutral.0', 'neutral.800'),
  },
  {
    name: 'form.field.filled.hover.background',
    label: 'Input background filled hover',
    foregroundToken: 'form.field.color',
    backgroundToken: 'form.field.filled.hover.background',
    purpose: 'Hovered fill for the filled variant.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.900', 'neutral.50'),
    dark: pair('neutral.0', 'neutral.800'),
  },
  {
    name: 'form.field.filled.focus.background',
    label: 'Input background filled focus',
    foregroundToken: 'form.field.color',
    backgroundToken: 'form.field.filled.focus.background',
    purpose: 'Focused fill for the filled variant; keep the focus boundary.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.900', 'neutral.50'),
    dark: pair('neutral.0', 'neutral.800'),
  },
  {
    name: 'form.field.invalid.placeholder.color',
    label: 'Input placeholder invalid',
    foregroundToken: 'form.field.invalid.placeholder.color',
    backgroundToken: 'form.field.background',
    purpose: 'Placeholder text for an invalid field; also provide an error description.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('red.500', 'neutral.0'),
    dark: pair('red.100', 'neutral.900'),
  },
  {
    name: 'form.field.float.label.color',
    label: 'Input floating label',
    foregroundToken: 'form.field.float.label.color',
    backgroundToken: 'form.field.background',
    purpose: 'Floating label in its default state. Standard external labels use text.color.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.500', 'neutral.0'),
    dark: pair('neutral.400', 'neutral.900'),
  },
  {
    name: 'form.field.float.label.active.color',
    label: 'Input floating label active',
    foregroundToken: 'form.field.float.label.active.color',
    backgroundToken: 'form.field.background',
    purpose: 'Floating label when the field has a value.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.500', 'neutral.0'),
    dark: pair('neutral.400', 'neutral.900'),
  },
  {
    name: 'form.field.float.label.focus.color',
    label: 'Input floating label focus',
    foregroundToken: 'form.field.float.label.focus.color',
    backgroundToken: 'form.field.background',
    purpose: 'Floating label when its field has focus.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('green.400', 'neutral.0'),
    dark: pair('green.300', 'neutral.900'),
  },
  {
    name: 'form.field.float.label.invalid.color',
    label: 'Input floating label invalid',
    foregroundToken: 'form.field.float.label.invalid.color',
    backgroundToken: 'form.field.background',
    purpose: 'Floating label for an invalid field.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('red.500', 'neutral.0'),
    dark: pair('red.100', 'neutral.900'),
  },
  {
    name: 'form.field.icon.color',
    label: 'Input icon',
    foregroundToken: 'form.field.icon.color',
    backgroundToken: 'form.field.background',
    purpose: 'Field icon on the default field fill; this is a non-text role.',
    group: 'inputs',
    evidence: 'FTF decision',
    source: 'Local PrimeVue preset · semantic roles.',
    light: pair('neutral.400', 'neutral.0'),
    dark: pair('neutral.400', 'neutral.900'),
    kind: 'icon',
  },
  {
    name: 'message.success.color',
    label: 'Success message',
    foregroundToken: 'message.success.color',
    backgroundToken: 'message.success.background',
    scope: 'component',
    purpose:
      'Emerald success text and icon on a soft emerald surface. Tag, Badge, and Toast share this pair.',
    group: 'status',
    evidence: 'FTF decision',
    source: 'FTF decision · emerald feedback pairs distinguish success from primary actions.',
    light: pair('emerald.500', 'emerald.50'),
    dark: pair('emerald.300', 'emerald.900'),
  },
  {
    name: 'message.warn.color',
    label: 'Warning message',
    foregroundToken: 'message.warn.color',
    backgroundToken: 'message.warn.background',
    scope: 'component',
    purpose: 'Warning message text and icon on message.warn.background. Use the warn severity.',
    group: 'status',
    evidence: 'FTF decision',
    source: 'FTF warning pairs use the orange ramp in both modes.',
    light: pair('orange.800', 'orange.50'),
    dark: pair('orange.100', 'orange.900'),
  },
  {
    name: 'message.error.color',
    label: 'Error message',
    foregroundToken: 'message.error.color',
    backgroundToken: 'message.error.background',
    scope: 'component',
    purpose:
      'Error message text and icon on message.error.background. Tag and Badge call this severity danger.',
    group: 'status',
    evidence: 'FTF decision',
    source: 'FTF v1 decision · red error pairs in both modes.',
    light: pair('red.500', 'red.50'),
    dark: pair('red.100', 'red.900'),
  },
  {
    name: 'message.info.color',
    label: 'Info message',
    foregroundToken: 'message.info.color',
    backgroundToken: 'message.info.background',
    scope: 'component',
    purpose: 'Informational message text and icon on message.info.background.',
    group: 'status',
    evidence: 'FTF decision',
    source: 'FTF v1 decision · indigo information pairs in both modes.',
    light: pair('indigo.700', 'indigo.50'),
    dark: pair('indigo.100', 'indigo.900'),
  },
  {
    name: 'highlight.background',
    label: 'Selected item',
    foregroundToken: 'highlight.color',
    backgroundToken: 'highlight.background',
    purpose: 'Selected-item fill with highlight.color.',
    group: 'surface',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.highlight',
    light: pair('green.900', 'green.50'),
    dark: pair('neutral.0', 'green.800'),
  },
  {
    name: 'highlight.focus.background',
    label: 'Selected item focus',
    foregroundToken: 'highlight.focus.color',
    backgroundToken: 'highlight.focus.background',
    purpose: 'Focused selection fill with highlight.focus.color.',
    group: 'surface',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.highlight',
    light: pair('green.900', 'green.100'),
    dark: pair('neutral.0', 'green.700'),
  },
  // Accent roles give the brand colours a job beyond charts. See the Colour page.
  {
    name: 'note.background',
    label: 'Note',
    foregroundToken: 'note.color',
    backgroundToken: 'note.background',
    scope: 'custom',
    purpose: 'Cream surface for panels and bars holding a decision or action, and changed cells.',
    group: 'accent',
    evidence: 'FTF decision',
    source: 'FTF accent roles · Cream.',
    // Dark mode avoids a large coloured panel: a slightly lifted neutral with a warm border.
    light: pair('neutral.900', 'yellow.100'),
    dark: pair('neutral.0', 'neutral.800'),
  },
  {
    name: 'note.border.color',
    label: 'Note border',
    foregroundToken: 'note.border.color',
    backgroundToken: 'note.background',
    scope: 'custom',
    purpose: 'Border and dividers on the note surface.',
    group: 'accent',
    evidence: 'FTF decision',
    source: 'FTF accent roles · Cream border.',
    light: pair('yellow.200', 'yellow.100'),
    dark: pair('yellow.800', 'neutral.800'),
    kind: 'decorative',
  },
  {
    name: 'live.color',
    label: 'Live now',
    foregroundToken: 'live.color',
    backgroundToken: 'content.background',
    scope: 'custom',
    purpose: 'Carrot text for the current step, “now”, and values updating in real time.',
    group: 'accent',
    evidence: 'FTF decision',
    source: 'FTF accent roles · Carrot, darkened for text on white.',
    light: pair('orange.800', 'neutral.0'),
    dark: pair('orange.300', 'neutral.900'),
  },
  {
    name: 'live.marker.color',
    label: 'Live marker',
    foregroundToken: 'live.marker.color',
    backgroundToken: 'content.background',
    scope: 'custom',
    purpose: 'Carrot dot or ring marking the live item.',
    group: 'accent',
    evidence: 'FTF decision',
    source: 'FTF accent roles · Carrot marker.',
    light: pair('orange.600', 'neutral.0'),
    dark: pair('orange.500', 'neutral.900'),
    kind: 'icon',
  },
]

const primary = roleByName('primary.color')
const primaryHover = roleByName('primary.hover.color')
const primaryActive = roleByName('primary.active.color')
const primaryDefinition = {
  light: {
    foreground: primary.light.foreground.name,
    background: primary.light.background.name,
    hover: primaryHover.light.background.name,
    active: primaryActive.light.background.name,
    text: primary.light.background.name,
  },
  dark: {
    foreground: primary.dark.foreground.name,
    background: primary.dark.background.name,
    hover: primaryHover.dark.background.name,
    active: primaryActive.dark.background.name,
    text: primary.dark.background.name,
  },
}

// Shared severity roles extend PrimeVue's semantic tier; they are not another palette.
const severityDefinitions = {
  primary: primaryDefinition,
  secondary: {
    light: {
      foreground: 'neutral.600',
      background: 'neutral.100',
      hover: 'neutral.200',
      active: 'neutral.300',
      text: 'neutral.600',
    },
    dark: {
      foreground: 'neutral.300',
      background: 'neutral.800',
      hover: 'neutral.700',
      active: 'neutral.600',
      text: 'neutral.400',
    },
  },
  success: {
    light: {
      foreground: 'neutral.0',
      background: 'emerald.500',
      hover: 'emerald.600',
      active: 'emerald.700',
      text: 'emerald.500',
    },
    dark: {
      foreground: 'emerald.950',
      background: 'emerald.300',
      hover: 'emerald.200',
      active: 'emerald.100',
      text: 'emerald.300',
    },
  },
  info: {
    light: {
      foreground: 'neutral.0',
      background: 'indigo.700',
      hover: 'indigo.800',
      active: 'indigo.900',
      text: 'indigo.700',
    },
    dark: {
      foreground: 'indigo.900',
      background: 'indigo.100',
      hover: 'indigo.200',
      active: 'indigo.300',
      text: 'indigo.100',
    },
  },
  warn: {
    light: {
      foreground: 'neutral.900',
      background: 'orange.500',
      hover: 'orange.600',
      active: 'orange.700',
      text: 'orange.800',
    },
    dark: {
      foreground: 'neutral.900',
      background: 'orange.400',
      hover: 'orange.300',
      active: 'orange.200',
      text: 'orange.300',
    },
  },
  help: {
    light: {
      foreground: 'neutral.0',
      background: 'purple.500',
      hover: 'purple.600',
      active: 'purple.700',
      text: 'purple.500',
    },
    dark: {
      foreground: 'purple.950',
      background: 'purple.200',
      hover: 'purple.300',
      active: 'purple.400',
      text: 'purple.200',
    },
  },
  danger: {
    light: {
      foreground: 'neutral.0',
      background: 'red.500',
      hover: 'red.600',
      active: 'red.700',
      text: 'red.500',
    },
    dark: {
      foreground: 'red.900',
      background: 'red.100',
      hover: 'red.200',
      active: 'red.300',
      text: 'red.100',
    },
  },
  contrast: {
    light: {
      foreground: 'neutral.0',
      background: 'neutral.950',
      hover: 'neutral.900',
      active: 'neutral.800',
      text: 'neutral.950',
    },
    dark: {
      foreground: 'neutral.950',
      background: 'neutral.0',
      hover: 'neutral.100',
      active: 'neutral.200',
      text: 'neutral.0',
    },
  },
}

export const semanticColors = Object.entries(severityDefinitions).map(([name, definition]) => ({
  name,
  light: {
    ...pair(definition.light.foreground, definition.light.background),
    hover: colorValue(definition.light.hover),
    active: colorValue(definition.light.active),
    text: colorValue(definition.light.text),
  },
  dark: {
    ...pair(definition.dark.foreground, definition.dark.background),
    hover: colorValue(definition.dark.hover),
    active: colorValue(definition.dark.active),
    text: colorValue(definition.dark.text),
  },
}))

colorRoles.push(
  ...semanticColors.flatMap((role): ColorRole[] => {
    const common = {
      scope: 'custom' as const,
      evidence: 'FTF decision' as const,
      source: 'Shared FTF severity roles using the FTF palette.',
    }
    const text: ColorRole = {
      ...common,
      name: `severity.${role.name}.color`,
      label: `text-${role.name}`,
      foregroundToken: `severity.${role.name}.color`,
      backgroundToken: 'content.background',
      group: 'text',
      purpose: `${role.name} text on the content surface. Use text-${role.name}-contrast on bg-${role.name}.`,
      light: { foreground: role.light.text, background: colorValue('neutral.0') },
      dark: { foreground: role.dark.text, background: colorValue('neutral.900') },
    }
    const background: ColorRole = {
      ...common,
      name: `severity.${role.name}.background`,
      label: `bg-${role.name}`,
      foregroundToken: `severity.${role.name}.contrast.color`,
      backgroundToken: `severity.${role.name}.background`,
      group: 'surface',
      purpose: `${role.name} fill paired with text-${role.name}-contrast. PrimeVue filled buttons use this pair.`,
      light: role.light,
      dark: role.dark,
    }
    return role.name === 'secondary' ? [background] : [text, background]
  }),
)

export function roleByName(name: string): ColorRole {
  const role = colorRoles.find((item) => item.name === name)
  if (!role) throw new Error(`Undefined FTF role: ${name}`)
  return role
}

export function contrastRatio(foreground: string, background: string): number {
  const luminance = (hex: string) => {
    if (!/^#[\da-f]{6}$/i.test(hex))
      throw new Error(`Expected an opaque six-digit hex color: ${hex}`)
    const channels = [1, 3, 5].map((offset) => {
      const channel = Number.parseInt(hex.slice(offset, offset + 2), 16) / 255
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    })
    return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722
  }
  const a = luminance(foreground)
  const b = luminance(background)
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)
}

export function swatchInk(background: string): string {
  const white = colorValue('neutral.0').value
  const black = colorValue('neutral.950').value
  return contrastRatio(white, background) >= contrastRatio(black, background) ? white : black
}

export const colorDecisions = [
  'Purple 950 is the new FTF shade #2B1721, darker than purple 900. All existing 950 aliases continue to equal 900.',
  'Purple is the canonical FTF name. The legacy preset registered that family as blue; no separate FTF blue family is introduced.',
  'Neutral 50 and 100 use more even steps between white and neutral 200. Their shared palette references update surfaces and components together.',
  'Neutral 850 is not part of this palette. Dark hover surfaces use neutral 800; no missing intermediate shade is generated.',
  'Status pairs have explicit light/dark mappings. They are FTF v1 decisions using the verified palette, not claims about the old preset.',
  'Essential input boundaries meet 3:1. The subtle content border is decorative and must not be the only way to identify a control.',
]

export const tokenRows = [
  ...colorRoles.map((role) => ({
    name: role.name,
    label: role.label,
    foregroundToken: role.foregroundToken,
    backgroundToken: role.backgroundToken,
    purpose: role.purpose,
    light: [
      { ...role.light.foreground, label: 'Foreground' },
      { ...role.light.background, label: 'Background' },
    ],
    dark: [
      { ...role.dark.foreground, label: 'Foreground' },
      { ...role.dark.background, label: 'Background' },
    ],
    evidence: role.evidence,
    source: role.source,
  })),
  ...Object.entries(primitives).flatMap(([family, steps]) =>
    Object.entries(steps).map(([step, value]) => ({
      name: `ftf.${family}.${step}`,
      label: `${family} ${step}`,
      foregroundToken: '',
      backgroundToken: '',
      purpose: 'Primitive · select a foreground/background role before use.',
      light: [{ name: `${family}.${step}`, value, label: 'Palette' }],
      dark: [],
      evidence: paletteDecisions[`${family}.${step}`] ? 'FTF decision' : 'Verified',
      source:
        paletteDecisions[`${family}.${step}`] ??
        (step === '0' || step === '950'
          ? 'ftf-presets.ts · primitive'
          : 'base.css + ColorsDoc.vue'),
    })),
  ),
]
