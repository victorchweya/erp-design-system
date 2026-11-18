export default {
  root: {
    background: '{content.background}',
    borderColor: '{content.border.color}',
    borderRadius: '{border.radius.lg}',
    height: '20rem',
  },
  header: { padding: '0.75rem', background: 'transparent', borderColor: '{content.border.color}' },
  input: {
    padding: '0.5rem',
    fontSize: '{font.size.base}',
    fontWeight: '{font.weight.normal}',
    color: '{text.color}',
    placeholderColor: '{text.muted.color}',
  },
  list: { padding: '{navigation.list.padding}' },
  empty: { padding: '1rem', color: '{text.muted.color}' },
  footer: { padding: '0.75rem', background: 'transparent', borderColor: '{content.border.color}' },
}
