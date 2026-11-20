// PrimeVue 5.0.5 ships no focus ring or navigation disabled tokens for Gallery, so the
// focusRing and navigation.disabledOpacity groups below are ERP extensions consumed by `css`.
const focusRing = {
  width: '{focus.ring.width}',
  style: '{focus.ring.style}',
  color: '{focus.ring.color}',
  offset: '{focus.ring.offset}',
  shadow: '{focus.ring.shadow}',
}

export default {
  root: { focusRing },
  backdrop: { background: '{content.background}' },
  header: { padding: '0.75rem', background: '{content.background}' },
  footer: {
    padding: '0.75rem',
    background: '{content.background}',
    borderColor: '{content.border.color}',
  },
  item: { transitionDuration: '{transition.duration}' },
  action: {
    size: '2.5rem',
    borderRadius: '{border.radius.lg}',
    color: '{text.color}',
    hoverBackground: '{content.hover.background}',
    hoverColor: '{text.hover.color}',
    disabledOpacity: '{disabled.opacity}',
    transitionDuration: '{transition.duration}',
    icon: { size: '1rem' },
    focusRing,
  },
  navigation: {
    background: '{content.background}',
    size: '2.5rem',
    borderRadius: '{border.radius.lg}',
    color: '{text.color}',
    hoverBackground: '{content.hover.background}',
    hoverColor: '{text.hover.color}',
    disabledOpacity: '{disabled.opacity}',
    offset: '0.75rem',
    transitionDuration: '{transition.duration}',
    icon: { size: '1rem' },
    focusRing,
  },
  thumbnail: {
    size: '4rem',
    padding: '0.25rem',
    background: '{content.background}',
    borderRadius: '{border.radius.md}',
    borderWidth: '2px',
    hoverBorderColor: '{primary.hover.color}',
    activeBorderColor: '{primary.color}',
    activeScale: '1',
    transitionDuration: '{transition.duration}',
    content: { padding: '0.5rem' },
  },
  css: /*css*/ `
    .p-gallery:focus-visible {
      box-shadow: dt('gallery.focus.ring.shadow');
      outline: dt('gallery.focus.ring.width') dt('gallery.focus.ring.style')
        dt('gallery.focus.ring.color');
      outline-offset: dt('gallery.focus.ring.offset');
    }

    .p-gallery-prev:focus-visible,
    .p-gallery-next:focus-visible {
      box-shadow: dt('gallery.navigation.focus.ring.shadow');
      outline: dt('gallery.navigation.focus.ring.width') dt('gallery.navigation.focus.ring.style')
        dt('gallery.navigation.focus.ring.color');
      outline-offset: dt('gallery.navigation.focus.ring.offset');
    }

    .p-gallery-prev:disabled,
    .p-gallery-next:disabled {
      opacity: dt('gallery.navigation.disabled.opacity');
      cursor: default;
      pointer-events: none;
    }

    .p-gallery-action:focus-visible {
      box-shadow: dt('gallery.action.focus.ring.shadow');
      outline: dt('gallery.action.focus.ring.width') dt('gallery.action.focus.ring.style')
        dt('gallery.action.focus.ring.color');
      outline-offset: dt('gallery.action.focus.ring.offset');
    }
  `,
}
