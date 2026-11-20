<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/CarouselExample.vue'
import code from '@/components/docs/examples/CarouselExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Browse produce highlights one slide at a time with the previous and next buttons, the page indicators or a swipe. It does not autoplay.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'slidesPerPage',
    type: 'number',
    default: '1',
    description:
      'Slides visible at once. Use a fraction, such as 1.2, to hint that more slides follow.',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: 'start',
    description: 'Where each slide snaps within the viewport.',
  },
  {
    name: 'loop',
    type: 'boolean',
    default: 'false',
    description:
      'Wraps from the last slide to the first. Without it, the previous and next buttons disable at the ends.',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: 'horizontal',
    description: 'Scroll direction.',
  },
  {
    name: 'spacing',
    type: 'number',
    default: '16',
    description: 'Gap between slides in pixels.',
  },
  {
    name: 'autoSize',
    type: 'boolean',
    default: 'false',
    description: 'Lets each slide keep its own width instead of a fixed share of the viewport.',
  },
  {
    name: 'page',
    type: 'number',
    default: 'null',
    description: 'Zero-based page index. Use v-model:page to read or set the current page.',
  },
]
const accessibility = [
  'The root has role region. Name it with aria-label and add aria-roledescription="carousel". Slides are groups with no name of their own, so give each one aria-roledescription="slide" and an aria-label such as 1 of 3.',
  'CarouselPrev and CarouselNext are buttons labelled Previous Page and Next Page by default. Give them labels that fit the content, and add a visible focus style, since these parts have no theme styling.',
  'Indicators are buttons labelled Page 1, Page 2 and so on, and the current one has aria-current="page". Each one is a separate Tab stop.',
  'Do not autoplay content people need to read. Moving content must have a pause control, and important information should not live only in a carousel.',
]
</script>

<template>
  <ComponentDoc
    title="Carousel"
    componentName="Carousel"
    category="Media"
    description="Show a set of related items one page at a time, such as product photos or announcements."
    usage="Carousel is built from parts: CarouselContent holds the CarouselItem slides, and CarouselIndicators, CarouselPrev and CarouselNext control them. Scrolling uses native scroll snap, so touch swipes work. Avoid carousels for information people must see, such as order details."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/carousel"
  />
</template>
