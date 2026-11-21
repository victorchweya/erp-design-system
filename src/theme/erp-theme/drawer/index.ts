export const root = {
    background: '{overlay.modal.background}',
    borderColor: '{overlay.modal.border.color}',
    color: '{overlay.modal.color}',
    shadow: '{overlay.modal.shadow}'
};

export const header = {
    padding: '{spacing.2} {overlay.modal.padding}'
};

export const title = {
    fontSize: '{font.size.lg}',
    fontWeight: '{font.weight.medium}'
};

export const content = {
    padding: '{overlay.modal.padding}'
};

export const footer = {
    padding: '{spacing.2} {overlay.modal.padding}'
};

// PrimeVue 5.0.5 hard-codes Drawer animation timings per position and has no tokens for them.
// Scoping to the mask outranks the shipped position selectors without depending on stylesheet order.
// The mask leave rule must follow the enter rule because the mask keeps both classes while closing.
export const css = /*css*/ `
    .p-drawer-mask .p-drawer.p-drawer-enter-active {
        animation-duration: dt('motion.duration.slow');
        animation-timing-function: dt('motion.easing.enter');
    }

    .p-drawer-mask .p-drawer.p-drawer-leave-active {
        animation-duration: dt('motion.duration.slow');
        animation-timing-function: dt('motion.easing.exit');
    }

    .p-drawer-mask.p-overlay-mask-enter-active {
        animation-timing-function: dt('motion.easing.enter');
    }

    .p-drawer-mask.p-overlay-mask-leave-active {
        animation-timing-function: dt('motion.easing.exit');
    }
`;

export default {
    root,
    header,
    title,
    content,
    footer,
    css
};
