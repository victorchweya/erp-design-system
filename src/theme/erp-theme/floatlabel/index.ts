export const root = {
    fontSize: '{form.field.font.size}',
    color: '{form.field.float.label.color}',
    focusColor: '{form.field.float.label.focus.color}',
    activeColor: '{form.field.float.label.active.color}',
    invalidColor: '{form.field.float.label.invalid.color}',
    transitionDuration: '0.2s',
    positionX: '{form.field.padding.x}',
    positionY: '{form.field.padding.y}',
    fontWeight: '{font.weight.medium}',
    active: {
        fontSize: '{font.size.xs}',
        fontWeight: '{font.weight.normal}'
    }
};

export const over = {
    active: {
        top: '-1.25rem'
    }
};

export const inside = {
    input: {
        paddingTop: '1.5rem',
        paddingBottom: '{form.field.padding.y}'
    },
    active: {
        top: '{form.field.padding.y}'
    }
};

export const on = {
    borderRadius: '{border.radius.xs}',
    active: {
        background: '{form.field.background}',
        padding: '0 0.125rem'
    }
};

export default {
    root,
    over,
    in: inside,
    on
};
