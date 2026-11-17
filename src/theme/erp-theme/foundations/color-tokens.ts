// Verified against Farm2Feed/ftfdesignsystem, commit ac29ac16cc12f7a69c49cbc10ba09f75b6149c03.
// 950 aliases and neutral endpoints are explicit in ftf-presets.ts; purple has no named 950.
export const primitives: Record<string, Record<string, string>> = {
  green: {
    '50': '#F0F6F3',
    '100': '#DFEDDF',
    '200': '#BFDCC0',
    '300': '#85A687',
    '400': '#4A7C5A',
    '500': '#1E4A35',
    '600': '#1A3F2E',
    '700': '#163327',
    '800': '#122C20',
    '900': '#0E1F16',
    '950': '#0E1F16',
  },
  orange: {
    '50': '#FDFAF5',
    '100': '#F7E6D4',
    '200': '#EFC9A4',
    '300': '#EBC194',
    '400': '#E0A86A',
    '500': '#D78228',
    '600': '#C47423',
    '700': '#AC6820',
    '800': '#8D5317',
    '900': '#814E18',
    '950': '#814E18',
  },
  indigo: {
    '50': '#F7F8FD',
    '100': '#E8EAFC',
    '200': '#D0D5F7',
    '300': '#BAC1F5',
    '400': '#8C98EE',
    '500': '#707ABE',
    '600': '#6470B5',
    '700': '#545B8F',
    '800': '#454873',
    '900': '#3A3E57',
    '950': '#3A3E57',
  },
  neutral: {
    '0': '#FFFFFF',
    '50': '#F7F7F7',
    '100': '#F9F9F9',
    '200': '#E6E6E6',
    '300': '#D0D0D0',
    '400': '#808080',
    '500': '#666666',
    '600': '#404040',
    '700': '#333333',
    '800': '#1A1A1A',
    '900': '#080808',
    '950': '#000000',
  },
  red: {
    '50': '#FEF5F5',
    '100': '#FBEAEA',
    '200': '#F4BFBF',
    '300': '#E57373',
    '400': '#D64545',
    '500': '#B71C1C',
    '600': '#A01717',
    '700': '#8B1515',
    '800': '#6D0E0E',
    '900': '#5A0A0A',
    '950': '#5A0A0A',
  },
  yellow: {
    '50': '#FFFAF0',
    '100': '#FCF6DE',
    '200': '#F9ECBD',
    '300': '#F5E091',
    '400': '#DDCA83',
    '500': '#AC9D66',
    '600': '#9D8C5C',
    '700': '#8E7B51',
    '800': '#6B5E3F',
    '900': '#564930',
    '950': '#564930',
  },
  olive: {
    '50': '#F9FAF6',
    '100': '#F3F5E7',
    '200': '#DAE2B6',
    '300': '#C2CE86',
    '400': '#9BA56B',
    '500': '#747C50',
    '600': '#6B7248',
    '700': '#5C6440',
    '800': '#475030',
    '900': '#343A24',
    '950': '#343A24',
  },
  brown: {
    '50': '#F9F7F6',
    '100': '#EFEDEC',
    '200': '#DBD3D0',
    '300': '#A99E99',
    '400': '#8B7F7A',
    '500': '#7B6A62',
    '600': '#6E5F58',
    '700': '#5F5149',
    '800': '#4C352B',
    '900': '#3D2A20',
    '950': '#3D2A20',
  },
  violet: {
    '50': '#F8F6F9',
    '100': '#EDDDE6',
    '200': '#DABACC',
    '300': '#BF87A6',
    '400': '#A870A8',
    '500': '#A35380',
    '600': '#944B76',
    '700': '#824266',
    '800': '#6B3655',
    '900': '#532A43',
    '950': '#532A43',
  },
  purple: {
    '50': '#F8F5FB',
    '100': '#E9DCEB',
    '200': '#D4B9D6',
    '300': '#B58BBB',
    '400': '#9D77A8',
    '500': '#8D5370',
    '600': '#804C66',
    '700': '#704055',
    '800': '#573243',
    '900': '#412433',
  },
}

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
  purpose: string
  group: 'brand' | 'surface' | 'text' | 'inputs' | 'status' | 'tints'
  evidence: 'Verified' | 'Proposal'
  source: string
  light: ColorPair
  dark?: ColorPair
  kind?: 'boundary'
  note?: string
}

export const cream: ColorValue = { name: 'proposal.cream', value: '#FDF6E4' }

export function colorValue(name: string): ColorValue {
  if (name === cream.name) return cream
  const [family, step] = name.split('.')
  const value = primitives[family ?? '']?.[step ?? '']
  if (!value) throw new Error(`Undefined FTF color: ${name}`)
  return { name, value }
}

function pair(foreground: string, background: string): ColorPair {
  return { foreground: colorValue(foreground), background: colorValue(background) }
}

export const brandColors = [
  { label: 'Forest', purpose: 'Primary brand', ...colorValue('green.500') },
  { label: 'Lime', purpose: 'Natural brand accent', ...colorValue('olive.300') },
  { label: 'Carrot', purpose: 'Warm brand accent', ...colorValue('orange.500') },
  { label: 'Soil', purpose: 'Earth brand accent', ...colorValue('brown.800') },
]

export const secondaryColors = [
  { label: 'Indigo', purpose: 'Cool accent', ...colorValue('indigo.500') },
  { label: 'Neutral', purpose: 'Surface and text ramp', ...colorValue('neutral.500') },
  { label: 'Red', purpose: 'Danger family', ...colorValue('red.500') },
  { label: 'Yellow', purpose: 'Warning family', ...colorValue('yellow.500') },
  { label: 'Violet', purpose: 'Expressive accent', ...colorValue('violet.500') },
  { label: 'Purple', purpose: 'Deep accent', ...colorValue('purple.500') },
]

export const colorRoles: ColorRole[] = [
  {
    name: 'primary.color',
    purpose: 'Primary action fill; pair with primary.contrast.color.',
    group: 'brand',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.primary',
    light: pair('neutral.0', 'green.500'),
    dark: pair('green.900', 'green.300'),
  },
  {
    name: 'primary.hover.color',
    purpose: 'Primary action hover fill.',
    group: 'brand',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.primary',
    light: pair('neutral.0', 'green.600'),
    dark: pair('green.900', 'green.200'),
  },
  {
    name: 'primary.active.color',
    purpose: 'Primary action pressed fill.',
    group: 'brand',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.primary',
    light: pair('neutral.0', 'green.700'),
    dark: pair('green.900', 'green.100'),
  },
  {
    name: 'content.background',
    purpose: 'Content surface with content.color.',
    group: 'surface',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.content',
    light: pair('neutral.900', 'neutral.0'),
    dark: pair('neutral.0', 'neutral.900'),
  },
  {
    name: 'content.hover.background',
    purpose: 'Subtle hover surface with content.hover.color.',
    group: 'surface',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.content',
    light: pair('neutral.900', 'neutral.50'),
    dark: pair('neutral.0', 'neutral.800'),
  },
  {
    name: 'overlay.select.background',
    purpose: 'Select overlay surface with overlay.select.color.',
    group: 'surface',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.overlay.select',
    light: pair('neutral.900', 'neutral.0'),
    dark: pair('neutral.0', 'neutral.900'),
  },
  {
    name: 'content.color',
    purpose: 'Body text on the content surface.',
    group: 'text',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.content',
    light: pair('neutral.900', 'neutral.0'),
    dark: pair('neutral.0', 'neutral.900'),
  },
  {
    name: 'card.subtitle.color',
    purpose: 'Secondary text on the card surface.',
    group: 'text',
    evidence: 'Verified',
    source: 'ftf-presets.ts · components.card',
    light: pair('neutral.500', 'neutral.0'),
    dark: pair('neutral.400', 'neutral.900'),
  },
  {
    name: 'form.field.placeholder.color',
    purpose: 'Placeholder text on a field background; keep a visible label.',
    group: 'text',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.formField',
    light: pair('neutral.500', 'neutral.0'),
    dark: pair('neutral.400', 'neutral.900'),
  },
  {
    name: 'content.border.color',
    purpose: 'Decorative surface separator, not a sufficient control boundary.',
    group: 'inputs',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.content',
    light: pair('neutral.200', 'neutral.0'),
    dark: pair('neutral.700', 'neutral.900'),
    kind: 'boundary',
    note: 'Below 3:1: do not rely on this line alone to identify an essential control.',
  },
  {
    name: 'form.field.background',
    purpose: 'Field fill paired with form.field.color.',
    group: 'inputs',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.formField',
    light: pair('neutral.900', 'neutral.0'),
    dark: pair('neutral.0', 'neutral.900'),
  },
  {
    name: 'form.field.border.color',
    purpose: 'Existing input rim against its field background.',
    group: 'inputs',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.formField',
    light: pair('neutral.200', 'neutral.0'),
    dark: pair('neutral.700', 'neutral.900'),
    kind: 'boundary',
    note: 'Below 3:1: the old value is documented, not endorsed as a sole identifying boundary.',
  },
  {
    name: 'form.field.focus.border.color',
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
    purpose: 'Invalid field boundary; also provide an error label.',
    group: 'inputs',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.formField',
    light: pair('red.500', 'neutral.0'),
    dark: pair('red.400', 'neutral.900'),
    kind: 'boundary',
  },
  {
    name: 'proposal.status.success',
    purpose: 'Completed tag foreground on a soft success fill.',
    group: 'status',
    evidence: 'Proposal',
    source: 'Verified green values; new foreground/background role.',
    light: pair('green.700', 'green.50'),
  },
  {
    name: 'proposal.status.warning',
    purpose: 'Warning message text and essential icon on a soft warning fill.',
    group: 'status',
    evidence: 'Proposal',
    source: 'Verified yellow values; new foreground/background role.',
    light: pair('yellow.800', 'yellow.50'),
  },
  {
    name: 'proposal.status.error',
    purpose: 'Error text on a soft danger fill.',
    group: 'status',
    evidence: 'Proposal',
    source: 'Verified red values; new foreground/background role.',
    light: pair('red.500', 'red.50'),
  },
  {
    name: 'proposal.status.info',
    purpose: 'Informational text on a cool accent fill.',
    group: 'status',
    evidence: 'Proposal',
    source: 'Verified indigo values; new foreground/background role.',
    light: pair('indigo.700', 'indigo.50'),
  },
  {
    name: 'highlight.background',
    purpose: 'Selected-item fill with highlight.color.',
    group: 'tints',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.highlight',
    light: pair('green.900', 'green.50'),
    dark: pair('neutral.0', 'green.800'),
  },
  {
    name: 'highlight.focus.background',
    purpose: 'Focused selection fill with highlight.focus.color.',
    group: 'tints',
    evidence: 'Verified',
    source: 'ftf-presets.ts · semantic.highlight',
    light: pair('green.900', 'green.100'),
    dark: pair('neutral.0', 'green.700'),
  },
  {
    name: 'proposal.tint.natural',
    purpose: 'Natural accent tint; pairing needs design approval.',
    group: 'tints',
    evidence: 'Proposal',
    source: 'Verified olive values; new foreground/background role.',
    light: pair('olive.800', 'olive.100'),
  },
  {
    name: 'proposal.tint.warm',
    purpose: 'Warm accent tint with a darker orange foreground.',
    group: 'tints',
    evidence: 'Proposal',
    source: 'Verified orange values; new foreground/background role.',
    light: pair('orange.800', 'orange.100'),
  },
  {
    name: 'proposal.tint.cream',
    purpose: 'Soil text on the cream surface supplied in this brief.',
    group: 'tints',
    evidence: 'Proposal',
    source: 'Soil is verified; #FDF6E4 comes from the brief, not the old token files.',
    light: pair('brown.800', cream.name),
  },
]

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

export const tokenGaps = [
  'Status families are named in ColorsDoc.vue, but dedicated success, warning, error and info foreground/background pairs are not explicitly set in ftf-presets.ts. The proposed pairs here have no approved dark mapping.',
  'No complete light/dark mapping is defined for every brand accent or tint. A primitive is a fixed color, not a promise that the same UI role works in both modes.',
  'Purple is named purple in base.css and ColorsDoc.vue, but its ramp is registered under blue in the preset. No independent FTF blue ramp or named purple.950 is verified.',
  'The preset references neutral.850 for dark table hover, but that shade is absent. Existing 950 aliases equal 900; they are not additional invented shades.',
  'Neutral 50 is #F7F7F7 and 100 is #F9F9F9, so their brightness order is unusual. Both source values are retained.',
  'The global focus ring is rgba(24, 24, 27, 0.35). Its contrast depends on the composited surface; it has no explicit per-mode mapping and is not a verified opaque pair here.',
  'The cream #FDF6E4 comes from this brief and is not in the three legacy token files. Raw Carrot on cream fails both normal-text and essential-icon thresholds.',
]

export const tokenRows = [
  ...colorRoles.map((role) => ({
    name: role.name,
    purpose: role.purpose,
    light: role.light.foreground.value + ' / ' + role.light.background.value,
    dark: role.dark
      ? role.dark.foreground.value + ' / ' + role.dark.background.value
      : 'Not defined',
    pairing: `${role.light.foreground.name} on ${role.light.background.name}`,
    darkPairing: role.dark
      ? `${role.dark.foreground.name} on ${role.dark.background.name}`
      : 'No dark pair inferred',
    evidence: role.evidence,
    source: role.source,
  })),
  ...Object.entries(primitives).flatMap(([family, steps]) =>
    Object.entries(steps).map(([step, value]) => ({
      name: `${family}.${step}`,
      purpose: 'Primitive · select a foreground/background role before use.',
      light: value,
      dark: 'Fixed primitive; no role mapping',
      pairing: 'Context-dependent',
      darkPairing: '',
      evidence: 'Verified',
      source:
        step === '0' || step === '950' ? 'ftf-presets.ts · primitive' : 'base.css + ColorsDoc.vue',
    })),
  ),
]
