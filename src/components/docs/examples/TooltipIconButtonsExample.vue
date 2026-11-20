<script setup lang="ts">
import { shallowRef } from 'vue'
import vTooltip from 'primevue/tooltip'
import Pencil from '@primeicons/vue/pencil'
import Copy from '@primeicons/vue/copy'
import Print from '@primeicons/vue/print'
import Trash from '@primeicons/vue/trash'

const result = shallowRef('No action selected.')
const actions = [
  { label: 'Edit order', icon: Pencil, severity: 'secondary' },
  { label: 'Duplicate order', icon: Copy, severity: 'secondary' },
  { label: 'Print delivery note', icon: Print, severity: 'secondary' },
  { label: 'Cancel order', icon: Trash, severity: 'danger' },
] as const
</script>

<template>
  <div class="flex flex-col gap-4">
    <div role="group" aria-label="Order FTF-1042 actions" class="flex gap-1">
      <Button
        v-for="action in actions"
        :key="action.label"
        v-tooltip.bottom.both="action.label"
        type="button"
        :severity="action.severity"
        text
        iconOnly
        :aria-label="action.label"
        @click="result = `${action.label} selected in this preview.`"
      >
        <component :is="action.icon" aria-hidden="true" focusable="false" />
      </Button>
    </div>
    <p role="status" class="text-sm text-muted-color">{{ result }}</p>
  </div>
</template>
