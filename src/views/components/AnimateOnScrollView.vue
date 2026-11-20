<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/AnimateOnScrollExample.vue'
import code from '@/components/docs/examples/AnimateOnScrollExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Reveal once',
    description:
      'Use the once modifier so content does not hide again when people scroll back. Under reduced motion, the example passes no enterClass so the card is never hidden.',
    component: Example,
    code: code,
  },
]
const api = [
  {
    name: 'enterClass',
    type: 'string',
    default: '—',
    description:
      'Classes added when the element enters the viewport. While it is set, the element starts with opacity 0.',
  },
  {
    name: 'leaveClass',
    type: 'string',
    default: '—',
    description: 'Classes added when the element leaves the viewport. Rarely needed.',
  },
  {
    name: 'threshold',
    type: 'number',
    default: '0.5',
    description:
      'Share of the element that must be visible before it animates. Lower it for tall elements.',
  },
  {
    name: 'root / rootMargin',
    type: 'Element / string',
    default: 'viewport / —',
    description:
      'IntersectionObserver options for a custom scroll container or an earlier trigger.',
  },
  {
    name: '.once modifier',
    type: 'modifier',
    default: '—',
    description: 'Animates only the first time the element enters the viewport.',
  },
]
const accessibility = [
  'With enterClass set, the element stays invisible until it scrolls into view. Check usePreferredReducedMotion() and omit enterClass when motion is reduced, as the example does.',
  'Use it only on long-form pages such as onboarding or announcements. Do not animate tables, forms, or dashboards; see the motion foundation.',
  'The global reduced-motion rule shortens the animation, but it does not stop the directive hiding content until it is in view. That is why the check in script is needed.',
]
</script>

<template>
  <ComponentDoc
    title="AnimateOnScroll"
    componentName="AnimateOnScroll"
    category="Misc"
    description="Animate content as it scrolls into view."
    usage="is a directive imported from primevue/animateonscroll as vAnimateonscroll. Pass enterClass with the tailwindcss-primeui animation utilities, keep durations at 300 ms or less, and skip the animation when reduced motion is requested."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/animateonscroll"
  />
</template>
