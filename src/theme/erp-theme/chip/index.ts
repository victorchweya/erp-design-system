export const root = {
    focusBackground: '{content.hover.background}',
    borderRadius: '16px',
    paddingX: '{spacing.2}',
    paddingY: '{spacing.1}',
    gap: '{spacing.1}',
    transitionDuration: '{transition.duration}'
};

export const label = {
    fontSize: '{font.size.sm}',
    fontWeight: '{font.weight.normal}'
};

export const image = {
    width: '{spacing.6}',
    height: '{spacing.6}'
};

export const icon = {
    size: '{font.size.xs}'
};

export const removeIcon = {
    size: '{font.size.xs}',
    focusRing: {
        width: '{focus.ring.width}',
        style: '{focus.ring.style}',
        color: '{focus.ring.color}',
        offset: '{focus.ring.offset}',
        shadow: '{form.field.focus.ring.shadow}'
    }
};

export const colorScheme = {
    light: {
        root: {
            background: '{surface.100}',
            color: '{surface.800}'
        },
        icon: {
            color: '{surface.800}'
        },
        removeIcon: {
            color: '{surface.800}'
        }
    },
    dark: {
        root: {
            background: '{surface.800}',
            color: '{surface.0}'
        },
        icon: {
            color: '{surface.0}'
        },
        removeIcon: {
            color: '{surface.0}'
        }
    }
};

export default {
    root,
    label,
    image,
    icon,
    removeIcon,
    colorScheme
};
