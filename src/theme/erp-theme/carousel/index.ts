const focusRing = {
    width: '{focus.ring.width}',
    style: '{focus.ring.style}',
    color: '{focus.ring.color}',
    offset: '{focus.ring.offset}',
    shadow: '{focus.ring.shadow}'
};

export const root = {
    transitionDuration: '{transition.duration}'
};

export const content = {
    gap: '0.25rem'
};

export const indicatorList = {
    padding: '1rem',
    gap: '0.5rem'
};

export const indicator = {
    width: '2rem',
    height: '0.5rem',
    borderRadius: '{content.border.radius}',
    focusRing
};

// PrimeVue 5.0.5 renders CarouselPrev/CarouselNext as bare buttons with no tokens or base
// styles. These navigation tokens are an ERP extension consumed by `css` below.
export const navigation = {
    size: '2.25rem',
    background: '{content.background}',
    hoverBackground: '{content.hover.background}',
    color: '{text.color}',
    hoverColor: '{text.hover.color}',
    borderWidth: '1px',
    borderColor: '{content.border.color}',
    borderRadius: '{border.radius.md}',
    icon: {
        size: '1rem'
    },
    focusRing
};

export const colorScheme = {
    light: {
        indicator: {
            background: '{surface.200}',
            hoverBackground: '{surface.300}',
            activeBackground: '{primary.color}'
        }
    },
    dark: {
        indicator: {
            background: '{surface.700}',
            hoverBackground: '{surface.600}',
            activeBackground: '{primary.color}'
        }
    }
};

export const css = /*css*/ `
    .p-carousel-prev,
    .p-carousel-next {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: dt('carousel.navigation.size');
        height: dt('carousel.navigation.size');
        padding: 0;
        margin: 0;
        background: dt('carousel.navigation.background');
        color: dt('carousel.navigation.color');
        border: dt('carousel.navigation.border.width') solid dt('carousel.navigation.border.color');
        border-radius: dt('carousel.navigation.border.radius');
        outline-color: transparent;
        cursor: pointer;
        user-select: none;
        transition:
            background dt('carousel.transition.duration'),
            color dt('carousel.transition.duration'),
            outline-color dt('carousel.transition.duration'),
            box-shadow dt('carousel.transition.duration');
    }

    .p-carousel-prev :is(svg, i),
    .p-carousel-next :is(svg, i) {
        font-size: dt('carousel.navigation.icon.size');
        width: dt('carousel.navigation.icon.size');
        height: dt('carousel.navigation.icon.size');
    }

    .p-carousel-prev:not(:disabled):hover,
    .p-carousel-next:not(:disabled):hover {
        background: dt('carousel.navigation.hover.background');
        color: dt('carousel.navigation.hover.color');
    }

    .p-carousel-prev:focus-visible,
    .p-carousel-next:focus-visible {
        box-shadow: dt('carousel.navigation.focus.ring.shadow');
        outline: dt('carousel.navigation.focus.ring.width') dt('carousel.navigation.focus.ring.style')
            dt('carousel.navigation.focus.ring.color');
        outline-offset: dt('carousel.navigation.focus.ring.offset');
    }
`;

export default {
    root,
    content,
    indicatorList,
    indicator,
    navigation,
    colorScheme,
    css
};
