export default {
  root: {
    background: '{content.background}',
    borderColor: '{content.border.color}',
    borderRadius: '{border.radius.lg}',
    focusRing: {
      width: '{focus.ring.width}',
      style: '{focus.ring.style}',
      color: '{focus.ring.color}',
      offset: '{focus.ring.offset}',
      shadow: '{focus.ring.shadow}',
    },
  },
  viewport: { padding: '0' },
  scrollbar: {
    background: 'transparent',
    margin: '0.25rem',
    size: '0.5rem',
    transitionDuration: '{transition.duration}',
  },
  handle: { background: '{text.muted.color}' },
  mask: { fadeSize: '2rem' },
}
