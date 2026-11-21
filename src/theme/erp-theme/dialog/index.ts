export const root = {
    background: '{overlay.modal.background}',
    borderColor: '{overlay.modal.border.color}',
    color: '{overlay.modal.color}',
    borderRadius: '{overlay.modal.border.radius}',
    shadow: '{overlay.modal.shadow}'
};

export const header = {
    padding: '{overlay.modal.padding}',
    gap: '{spacing.2}'
};

export const title = {
    fontSize: '{font.size.lg}',
    fontWeight: '{font.weight.medium}'
};

export const content = {
    padding: '{overlay.modal.padding}'
};

export const footer = {
    padding: '{overlay.modal.padding}',
    gap: '{spacing.2}'
};

// PrimeVue 5.0.5 hard-codes Dialog animation timings and has no tokens for them.
// The extra class outranks the shipped selectors without depending on stylesheet order.
// The mask leave rule must follow the enter rule because the mask keeps both classes while closing.
export const css = /*css*/ `
    .p-dialog.p-dialog-enter-active {
        animation-duration: dt('motion.duration.slow');
        animation-timing-function: dt('motion.easing.enter');
    }

    .p-dialog.p-dialog-leave-active {
        animation-duration: dt('motion.duration.slow');
        animation-timing-function: dt('motion.easing.exit');
    }

    .p-dialog-mask.p-overlay-mask-enter-active {
        animation-timing-function: dt('motion.easing.enter');
    }

    .p-dialog-mask.p-overlay-mask-leave-active {
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
