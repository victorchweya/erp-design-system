<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import { useEventListener } from '@vueuse/core'

const id = useId()
const visible = shallowRef(false)
const search = shallowRef('')
const result = shallowRef('No command run.')

function run(label: string) {
  result.value = `${label} selected in this preview.`
}

const commands = [
  {
    label: 'Create',
    items: [
      {
        label: 'New purchase order',
        keywords: ['po', 'buy'],
        command: () => run('New purchase order'),
      },
      { label: 'New delivery', keywords: ['dispatch'], command: () => run('New delivery') },
      { label: 'New invoice', keywords: ['bill'], command: () => run('New invoice') },
    ],
  },
  {
    label: 'Go to',
    items: [
      { label: 'Suppliers', command: () => run('Suppliers') },
      { label: 'Warehouses', keywords: ['stock'], command: () => run('Warehouses') },
      { label: 'Reports', command: () => run('Reports') },
    ],
  },
]

function open() {
  search.value = ''
  visible.value = true
}

useEventListener(window, 'keydown', (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault()
    if (visible.value) visible.value = false
    else open()
  }
})
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Button
      type="button"
      severity="primary"
      outlined
      aria-haspopup="dialog"
      :aria-controls="id"
      :aria-expanded="visible"
      aria-keyshortcuts="Control+K Meta+K"
      @click="open"
      >Search commands <kbd class="text-xs text-muted-color">Ctrl K</kbd></Button
    >
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
  <Dialog
    :id="id"
    v-model:visible="visible"
    modal
    dismissableMask
    :showHeader="false"
    :draggable="false"
    position="top"
    aria-label="Command palette"
    :dt="{ content: { padding: '0' } }"
    class="w-[calc(100vw-2rem)] max-w-lg"
  >
    <CommandMenu
      v-model:search="search"
      :model="commands"
      placeholder="Type a command"
      aria-label="Commands"
      emptyFilterMessage="No matching commands"
      :pt="{ input: { 'aria-label': 'Search commands', autofocus: true } }"
      class="border-0"
      @select="visible = false"
    />
  </Dialog>
</template>
