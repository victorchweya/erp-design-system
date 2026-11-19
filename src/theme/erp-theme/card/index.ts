export const root = {
    background: '{content.background}',
    borderRadius: '{border.radius.xl}',
    color: '{content.color}',
    shadow: 'none'
};

export const body = {
    padding: '{spacing.5}',
    gap: '{spacing.4}'
};

export const caption = {
    gap: '{spacing.1}'
};

export const title = {
    fontSize: '{font.size.xl}',
    fontWeight: '{font.weight.medium}'
};

export const subtitle = {
    fontSize: '{font.size.sm}',
    fontWeight: '{font.weight.normal}',
    color: '{text.muted.color}'
};

export const css = /*css*/ `
    .p-card {
        border: 1px solid dt('content.border.color');
    }
`;

export default {
    root,
    body,
    caption,
    title,
    subtitle,
    css
};
