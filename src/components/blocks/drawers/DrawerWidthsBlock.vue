<script setup lang="ts">
import { shallowRef, useId } from 'vue'

const id = useId()
const widths = [
  { label: 'Full', percentage: '100%', classes: 'w-full' },
  { label: 'Half (1/2)', percentage: '50%', classes: 'w-full lg:w-1/2' },
  { label: 'One-third (1/3)', percentage: '33⅓%', classes: 'w-full lg:w-1/3' },
  { label: 'One-quarter (1/4)', percentage: '25%', classes: 'w-full lg:w-1/4' },
]
const active = shallowRef(widths[0]!)
const visible = shallowRef(false)
let trigger: HTMLElement | null = null

function open(event: Event, width: (typeof widths)[number]) {
  trigger = event.currentTarget as HTMLElement
  active.value = width
  visible.value = true
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="text-sm text-muted">Choose a width to compare the panels against the viewport.</p>
    <div class="flex flex-wrap gap-2">
      <Button
        v-for="width in widths"
        :key="width.label"
        type="button"
        severity="secondary"
        outlined
        aria-haspopup="dialog"
        :aria-controls="id"
        :aria-expanded="visible && active.label === width.label"
        @click="open($event, width)"
        >{{ width.label }}</Button
      >
    </div>
  </div>
  <Drawer
    :id="id"
    v-model:visible="visible"
    :header="`${active.label} width`"
    :aria-label="`${active.label} width drawer`"
    position="right"
    blockScroll
    :class="active.classes"
    @after-hide="trigger?.focus()"
  >
    <div class="flex flex-col gap-4 text-sm">
      <p class="leading-relaxed text-muted">
        This drawer uses {{ active.percentage }} of the viewport width on screens 1024px and wider.
      </p>
      <p class="leading-relaxed text-muted">
        Below 1024px, all four options use the full width to keep the content readable.
      </p>
      <div>
        <Tag severity="secondary"
          ><code>{{ active.classes }}</code></Tag
        >
      </div>
    </div>
    <template #footer>
      <div class="flex justify-end">
        <Button type="button" severity="secondary" outlined @click="visible = false"
          >Close drawer</Button
        >
      </div>
    </template>
  </Drawer>
</template>
