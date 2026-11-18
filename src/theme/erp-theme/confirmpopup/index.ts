export const root = {
    background: '{overlay.popover.background}',
    borderColor: '{overlay.popover.border.color}',
    color: '{overlay.popover.color}',
    borderRadius: '{border.radius.lg}',
    shadow: '{overlay.popover.shadow}',
    gutter: '10px',
    arrowOffset: '1.25rem'
};

export const content = {
    padding: '{spacing.5}',
    gap: '{spacing.3}'
};

export const icon = {
    size: '{font.size.lg}',
    color: '{severity.warn.color}'
};

export const message = {
    color: '{overlay.popover.color}',
    font: {
        size: '{font.size.base}',
        weight: '{font.weight.medium}'
    }
};

export const footer = {
    gap: '{spacing.3}',
    padding: '0 {spacing.5} {spacing.5} {spacing.5}'
};

export default {
    root,
    content,
    icon,
    message,
    footer
};
