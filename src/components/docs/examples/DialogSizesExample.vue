<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'

const id = useId()
const sizes = [
  { label: 'Small', width: 'max-w-sm', use: 'a short message or a single field' },
  { label: 'Medium', width: 'max-w-lg', use: 'most forms' },
  { label: 'Large', width: 'max-w-3xl', use: 'tables and side-by-side details' },
]
const active = shallowRef(sizes[1]!)
const visible = shallowRef(false)
const dialogClass = computed(() => ['w-[calc(100vw-2rem)]', active.value.width])

function open(size: (typeof sizes)[number]) {
  active.value = size
  visible.value = true
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <Button
      v-for="size in sizes"
      :key="size.label"
      type="button"
      severity="secondary"
      outlined
      aria-haspopup="dialog"
      :aria-controls="id"
      :aria-expanded="visible && active.label === size.label"
      @click="open(size)"
      >{{ size.label }}</Button
    >
  </div>
  <Dialog
    :id="id"
    v-model:visible="visible"
    modal
    :draggable="false"
    :header="`${active.label} dialog`"
    :class="dialogClass"
  >
    <div class="flex flex-col gap-3 text-sm">
      <p>
        Use a {{ active.label.toLowerCase() }} dialog for {{ active.use }}. This one uses the
        <code>{{ active.width }}</code> class.
      </p>
      <p class="text-muted-color">
        The dialog fills the screen width, less a 1rem margin on each side, until it reaches its
        maximum width.
      </p>
    </div>
    <template #footer>
      <Button type="button" autofocus @click="visible = false">Done</Button>
    </template>
  </Dialog>
</template>
