import { chartSeries } from './chart-series'
import { roleByName, semanticColors } from './color-tokens'

const modes = ['light', 'dark'] as const
type Mode = (typeof modes)[number]

const messageBorderTokens: Record<string, Record<Mode, string>> = {
  success: { light: 'emerald.100', dark: 'emerald.800' },
  info: { light: 'indigo.100', dark: 'indigo.800' },
  warn: { light: 'orange.100', dark: 'orange.800' },
  error: { light: 'red.100', dark: 'red.800' },
}

function pairTokens(name: string, mode: Mode) {
  const pair = roleByName(name)[mode]
  return {
    color: `{ftf.${pair.foreground.name}}`,
    background: `{ftf.${pair.background.name}}`,
  }
}

function semanticScheme(mode: Mode) {
  const role = (name: string) => pairTokens(name, mode)
  const content = role('content.background')
  const hover = role('content.hover.background')
  const muted = role('text.muted.color')
  const primary = role('primary.color')
  const highlight = role('highlight.background')
  const highlightFocus = role('highlight.focus.background')
  const note = role('note.background')
  return {
    // Accent roles: note (Cream) and live (Carrot). See color-tokens.ts.
    note: { ...note, borderColor: role('note.border.color').color },
    live: { color: role('live.color').color, markerColor: role('live.marker.color').color },
    chart: Object.fromEntries(chartSeries.map((series) => [series.key, `{ftf.${series[mode]}}`])),
    primary: {
      color: primary.background,
      contrastColor: primary.color,
      hoverColor: role('primary.hover.color').background,
      activeColor: role('primary.active.color').background,
    },
    focusRing: { color: role('focus.ring.color').color },
    text: {
      color: role('text.color').color,
      hoverColor: role('text.hover.color').color,
      mutedColor: muted.color,
      hoverMutedColor: role('text.hover.muted.color').color,
    },
    content: {
      ...content,
      hoverBackground: hover.background,
      hoverColor: hover.color,
      borderColor: role('content.border.color').color,
    },
    formField: {
      ...role('form.field.background'),
      color: role('form.field.color').color,
      disabledBackground: role('form.field.disabled.background').background,
      disabledColor: role('form.field.disabled.color').color,
      filledBackground: role('form.field.filled.background').background,
      filledHoverBackground: role('form.field.filled.hover.background').background,
      filledFocusBackground: role('form.field.filled.focus.background').background,
      borderColor: role('form.field.border.color').color,
      hoverBorderColor: role('form.field.hover.border.color').color,
      focusBorderColor: role('form.field.focus.border.color').color,
      invalidBorderColor: role('form.field.invalid.border.color').color,
      placeholderColor: role('form.field.placeholder.color').color,
      invalidPlaceholderColor: role('form.field.invalid.placeholder.color').color,
      floatLabelColor: role('form.field.float.label.color').color,
      floatLabelActiveColor: role('form.field.float.label.active.color').color,
      floatLabelFocusColor: role('form.field.float.label.focus.color').color,
      floatLabelInvalidColor: role('form.field.float.label.invalid.color').color,
      iconColor: role('form.field.icon.color').color,
    },
    highlight: {
      ...highlight,
      focusBackground: highlightFocus.background,
      focusColor: highlightFocus.color,
    },
    overlay: Object.fromEntries(['select', 'popover', 'modal'].map((name) => [name, content])),
    severity: Object.fromEntries(
      semanticColors.map(({ name, [mode]: colors }) => [
        name,
        {
          color: `{ftf.${colors.text.name}}`,
          background: `{ftf.${colors.background.name}}`,
          contrastColor: `{ftf.${colors.foreground.name}}`,
          hoverBackground: `{ftf.${colors.hover.name}}`,
          activeBackground: `{ftf.${colors.active.name}}`,
        },
      ]),
    ),
    // Keep feedback utility aliases available before any feedback component is mounted.
    status: Object.fromEntries(
      Object.entries({ success: 'success', warning: 'warn', error: 'error', info: 'info' }).map(
        ([name, severity]) => [name, role(`message.${severity}.color`)],
      ),
    ),
  }
}

function feedbackScheme(mode: Mode) {
  return Object.fromEntries(
    ['success', 'info', 'warn', 'error'].map((severity) => {
      const pair = pairTokens(`message.${severity}.color`, mode)
      return [
        severity,
        {
          ...pair,
          borderColor: pair.background,
          shadow: 'none',
          closeButton: {
            hoverBackground: '{content.hover.background}',
            focusRing: { color: pair.color, shadow: 'none' },
          },
        },
      ]
    }),
  )
}

function componentScheme(mode: Mode) {
  const feedback = feedbackScheme(mode)
  const message = Object.fromEntries(
    Object.entries(feedback).map(([severity, tokens]) => [
      severity,
      {
        ...tokens,
        borderColor: `{ftf.${messageBorderTokens[severity]![mode]}}`,
        outlined: { color: tokens.color, borderColor: tokens.color },
        simple: { color: tokens.color },
      },
    ]),
  )
  const tag = Object.fromEntries(
    Object.entries(feedback).map(([severity, tokens]) => [
      severity === 'error' ? 'danger' : severity,
      { color: tokens.color, background: tokens.background },
    ]),
  )
  // Toasts sit on a content surface in both modes; severity colours keep at least 5:1 on it.
  const toastSurface =
    mode === 'light'
      ? {
          background: '{surface.0}',
          borderColor: '{surface.50}',
          detailColor: '{surface.600}',
          secondary: '{surface.600}',
          contrast: '{surface.950}',
          closeHover: '{surface.50}',
        }
      : {
          background: '{content.background}',
          borderColor: '{content.border.color}',
          detailColor: '{text.muted.color}',
          secondary: '{text.muted.color}',
          contrast: '{text.color}',
          closeHover: '{content.hover.background}',
        }
  const toast = Object.fromEntries(
    Object.entries({
      ...feedback,
      secondary: { color: toastSurface.secondary },
      contrast: { color: toastSurface.contrast },
    }).map(([severity, tokens]) => [
      severity,
      {
        ...tokens,
        background: toastSurface.background,
        borderColor: toastSurface.borderColor,
        detailColor: toastSurface.detailColor,
        shadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        closeButton: {
          hoverBackground: toastSurface.closeHover,
          focusRing: { color: tokens.color, shadow: 'none' },
        },
      },
    ]),
  )
  const chipColors = pairTokens('chip.background', mode)
  const chip = {
    root: { ...chipColors, focusBackground: chipColors.background },
    icon: { color: chipColors.color },
    removeIcon: { color: chipColors.color },
  }
  return { message, tag, badge: tag, toast, chip }
}

const light = componentScheme('light')
const dark = componentScheme('dark')

const buttonRoot = Object.fromEntries(
  semanticColors.map(({ name }) => [
    name,
    {
      background: `{severity.${name}.background}`,
      hoverBackground: `{severity.${name}.hover.background}`,
      activeBackground: `{severity.${name}.active.background}`,
      borderColor: `{severity.${name}.background}`,
      hoverBorderColor: `{severity.${name}.hover.background}`,
      activeBorderColor: `{severity.${name}.active.background}`,
      color: `{severity.${name}.contrast.color}`,
      hoverColor: `{severity.${name}.contrast.color}`,
      activeColor: `{severity.${name}.contrast.color}`,
      // Secondary is grey, so its ring uses the shared focus colour like the rest of the theme.
      focusRing: {
        color: name === 'secondary' ? '{focus.ring.color}' : `{severity.${name}.color}`,
        shadow: 'none',
      },
    },
  ]),
)
const buttonText = Object.fromEntries(
  semanticColors.map(({ name }) => [
    name,
    {
      color: `{severity.${name}.color}`,
      hoverBackground: `color-mix(in srgb, {severity.${name}.color}, transparent 96%)`,
      activeBackground: `color-mix(in srgb, {severity.${name}.color}, transparent 92%)`,
    },
  ]),
)
const buttonOutlined = Object.fromEntries(
  Object.entries(buttonText).map(([name, tokens]) => [
    name,
    {
      ...tokens,
      borderColor: tokens.color,
    },
  ]),
)
const buttonColors = { root: buttonRoot, text: buttonText, outlined: buttonOutlined }

export default {
  semantic: { colorScheme: Object.fromEntries(modes.map((mode) => [mode, semanticScheme(mode)])) },
  components: {
    chip: { colorScheme: { light: light.chip, dark: dark.chip } },
    button: { colorScheme: { light: buttonColors, dark: buttonColors } },
    tag: { colorScheme: { light: light.tag, dark: dark.tag } },
    badge: { colorScheme: { light: light.badge, dark: dark.badge } },
    message: { colorScheme: { light: light.message, dark: dark.message } },
    toast: { colorScheme: { light: light.toast, dark: dark.toast } },
  },
}
