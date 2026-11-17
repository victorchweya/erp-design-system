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
    fontSize: '{font.size.xl}',
    fontWeight: '{font.weight.semibold}'
};

export const content = {
    padding: '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}'
};

export const footer = {
    padding: '0 {overlay.modal.padding} {overlay.modal.padding} {overlay.modal.padding}',
    gap: '{spacing.2}'
};

export default {
    root,
    header,
    title,
    content,
    footer
};
