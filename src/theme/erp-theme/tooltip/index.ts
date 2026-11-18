export const root = {
    maxWidth: '12.5rem',
    gutter: '0.25rem',
    shadow: '{overlay.popover.shadow}',
    padding: '{spacing.1.5} {spacing.2}',
    borderRadius: '{overlay.popover.border.radius}',
    fontSize: '{font.size.sm}',
    fontWeight: '{font.weight.normal}'
};

export const colorScheme = {
    light: {
        root: {
            background: '{surface.700}',
            color: '{surface.0}'
        }
    },
    dark: {
        root: {
            background: '{surface.700}',
            color: '{surface.0}'
        }
    }
};

export default {
    root,
    colorScheme
};
