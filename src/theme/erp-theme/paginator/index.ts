export const root = {
    padding: '0.5rem 1rem',
    gap: '0.25rem',
    borderRadius: '{content.border.radius}',
    background: '{content.background}',
    color: '{content.color}',
    transitionDuration: '{transition.duration}'
};

export const navButton = {
    background: 'transparent',
    hoverBackground: '{content.hover.background}',
    selectedBackground: '{highlight.background}',
    color: '{text.muted.color}',
    hoverColor: '{text.hover.muted.color}',
    selectedColor: '{highlight.color}',
    fontSize: '{form.field.font.size}',
    width: '{control.md.height}',
    height: '{control.md.height}',
    borderRadius: '50%',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: '{focus.ring.shadow}'
    }
};

export const currentPageReport = {
    fontSize: '{form.field.font.size}',
    color: '{text.muted.color}'
};

export const jumpToPageInput = {
    maxWidth: '2.5rem'
};

export default {
    root,
    navButton,
    currentPageReport,
    jumpToPageInput
};
