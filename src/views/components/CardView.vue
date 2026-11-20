<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import CardExample from '@/components/docs/examples/CardExample.vue'
import code0 from '@/components/docs/examples/CardExample.vue?raw'
import CardContentExample from '@/components/docs/examples/CardContentExample.vue'
import code1 from '@/components/docs/examples/CardContentExample.vue?raw'
const examples = [
  {
    id: 'card-0',
    title: 'Content and actions',
    description:
      'Put a real heading in the title slot, a short status in the subtitle, and actions in the footer.',
    component: CardExample,
    code: code0,
  },
  {
    id: 'card-1',
    title: 'Card grid',
    description:
      'Place related cards in a responsive grid with gap-4. Keep each card the same structure so they are easy to compare.',
    component: CardContentExample,
    code: code1,
  },
]
const api = [
  {
    name: 'title slot',
    type: 'VNode[]',
    default: '—',
    description: 'Card heading. Pass a heading element at the level that fits the page.',
  },
  {
    name: 'subtitle slot',
    type: 'VNode[]',
    default: '—',
    description: 'Short supporting text, shown in the muted colour.',
  },
  {
    name: 'content slot',
    type: 'VNode[]',
    default: '—',
    description: 'Main body of the card.',
  },
  {
    name: 'footer slot',
    type: 'VNode[]',
    default: '—',
    description: 'Actions that apply to the card content.',
  },
  {
    name: 'header slot',
    type: 'VNode[]',
    default: '—',
    description: 'Area above the body, such as an image. It has no padding.',
  },
]
const accessibility = [
  'Choose a heading level that fits the page hierarchy.',
  'A card is a content container. Keep actions as native buttons or links rather than making the whole card a clickable div.',
  'Card adds no role. If a card is an important page region, pass role="region" with aria-labelledby pointing at its heading.',
]
</script>

<template>
  <ComponentDoc
    title="Card"
    category="Panel"
    description="Group related content and actions in a bordered container."
    usage="Card is built from the title, subtitle, content, and footer slots. The theme supplies the border, padding, gap, and radius; cards have no default shadow."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/card"
  />
</template>
