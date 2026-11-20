<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/StyleClassExample.vue'
import code from '@/components/docs/examples/StyleClassExample.vue?raw'
import StyleClassAnimationExample from '@/components/docs/examples/StyleClassAnimationExample.vue'
import animationCode from '@/components/docs/examples/StyleClassAnimationExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Toggle a class',
    description:
      'toggleClass adds and removes one class on the target. Keep aria-expanded in sync with your own state.',
    component: Example,
    code: code,
  },
  {
    id: 'animation',
    title: 'Enter and leave animation',
    description:
      'Pair enter and leave classes with the tailwindcss-primeui fadein and fadeout utilities, which run for 150 ms.',
    component: StyleClassAnimationExample,
    code: animationCode,
  },
]
const api = [
  {
    name: 'selector',
    type: "'@next' | '@prev' | '@parent' | '@grandparent' | string",
    default: '—',
    description: 'Target element, relative to the host or as a CSS selector.',
  },
  {
    name: 'toggleClass',
    type: 'string',
    default: '—',
    description: 'Class added and removed on each click, with no animation.',
  },
  {
    name: 'enterFromClass / enterActiveClass',
    type: 'string',
    default: '—',
    description: 'Removed when showing starts / applied while the enter animation runs.',
  },
  {
    name: 'leaveActiveClass / leaveToClass',
    type: 'string',
    default: '—',
    description: 'Applied while the leave animation runs / added when it ends, usually hidden.',
  },
  {
    name: 'hideOnOutsideClick',
    type: 'boolean',
    default: 'false',
    description: 'Runs the leave animation when people click outside the target.',
  },
]
const accessibility = [
  'StyleClass does not manage ARIA. Keep aria-expanded in sync with the visible state and connect the trigger to the target with aria-controls.',
  'hideOnOutsideClick hides the target without telling your code, so aria-expanded goes stale. Use Vue state with Popover or v-show instead.',
  'Under reduced motion, keep the animation classes as they are. The global rule shortens animations to almost zero, and StyleClass still receives the animationend event it waits for.',
]
</script>

<template>
  <ComponentDoc
    title="StyleClass"
    componentName="StyleClass"
    category="Misc"
    description="Add and remove classes on another element, with optional enter and leave animation."
    usage="StyleClass is a directive imported from primevue/styleclass as vStyleclass. It changes classes directly in the DOM. Prefer Vue state with v-show or Transition when visibility also affects application logic."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/styleclass"
  />
</template>
