export default {
  root: { borderColor: '{form.field.border.color}' },
  area: { borderRadius: '{form.field.border.radius}' },
  slider: { borderRadius: '{border.radius.sm}', size: '{spacing.3}' },
  handle: {
    size: '{spacing.4}',
    borderColor: '{surface.0}',
    borderWidth: '2px',
    shadow: 'none',
    transitionDuration: '{transition.duration}',
    focusRing: {
      borderWidth: '2px',
      borderColor: '{surface.0}',
      outlineWidth: '{focus.ring.width}',
      outlineColor: '{focus.ring.color}',
      outlineOffset: '{focus.ring.offset}',
    },
  },
  transparencyGrid: {
    color: '{surface.200}',
    background: '{surface.0}',
    tileSize: '{spacing.2}',
  },
  swatch: { size: '{spacing.8}', borderRadius: '{form.field.border.radius}' },
}
