<script setup lang="ts">
import { shallowRef } from 'vue'
const result = shallowRef('No action selected.')
const items = [
  { label: 'View orders', command: () => (result.value = 'View orders selected in this preview.') },
  {
    label: 'View suppliers',
    command: () => (result.value = 'View suppliers selected in this preview.'),
  },
  {
    label: 'Export report',
    command: () => (result.value = 'Export selected in this preview. No file was created.'),
  },
]
import { useTemplateRef } from 'vue'
import ContextMenu from 'primevue/contextmenu'
const menu = useTemplateRef<InstanceType<typeof ContextMenu>>('menu')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="rounded-lg border border-dashed border-surface p-6"
      @contextmenu.prevent="menu?.show($event)"
    >
      <p>Order FTF-1042</p>
      <Button type="button" severity="secondary" outlined @click="menu?.show($event)"
        >Order actions</Button
      >
    </div>
    <ContextMenu ref="menu" :model="items" />
    <p role="status" class="text-muted">{{ result }}</p>
  </div>
</template>
