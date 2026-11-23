<script setup lang="ts">
import { shallowRef, useId, useTemplateRef } from 'vue'
import type Menu from 'primevue/menu'
import ChevronDown from '@primeicons/vue/chevron-down'
import Copy from '@primeicons/vue/copy'
import Download from '@primeicons/vue/download'
import Pencil from '@primeicons/vue/pencil'
const id = useId()
const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const visible = shallowRef(false)
const feedback = shallowRef('')
const items = [
  {
    label: 'Edit order',
    icon: Pencil,
    command: () => (feedback.value = 'Edit selected in this preview.'),
  },
  {
    label: 'Duplicate order',
    icon: Copy,
    command: () => (feedback.value = 'Duplicate selected in this preview.'),
  },
  { separator: true },
  {
    label: 'Download invoice',
    icon: Download,
    command: () => (feedback.value = 'Download invoice selected in this preview.'),
  },
]
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Button
      :id="`${id}-trigger`"
      type="button"
      severity="primary"
      outlined
      aria-haspopup="menu"
      :aria-controls="`${id}-menu`"
      :aria-expanded="visible"
      @click="menu?.toggle($event)"
      >Order actions<ChevronDown aria-hidden="true"
    /></Button>
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">{{ feedback }}</p>
  </div>
  <Menu
    :id="`${id}-menu`"
    ref="menu"
    :model="items"
    :aria-labelledby="`${id}-trigger`"
    popup
    @show="visible = true"
    @hide="visible = false"
  />
</template>
