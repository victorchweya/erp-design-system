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
    description: 'Use a real heading in the title slot and put supporting actions in the footer.',
    component: CardExample,
    code: code0,
  },
  {
    id: 'card-1',
    title: 'Card layouts',
    description: 'Use a responsive grid with gap-4 for related cards.',
    component: CardContentExample,
    code: code1,
  },
]
const api: never[] = []
const accessibility = [
  'Choose a heading level that fits the page hierarchy.',
  'A card is a content container. Keep actions as native buttons or links rather than making the whole card a clickable div.',
]
</script>

<template>
  <ComponentDoc
    title="Card"
    category="Panel"
    description="Group related content and actions in a bordered container."
    usage="Use title, subtitle, content, and footer slots. The theme supplies the border, padding, gap, and radius; cards have no default shadow."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/card"
  />
</template>
