<script setup lang="ts">
import { shallowRef } from 'vue'
const result = shallowRef('Choose an order action.')
const items = [
  { label: 'Save draft', command: () => (result.value = 'Draft saved in this preview.') },
  { label: 'Duplicate', command: () => (result.value = 'Duplicate selected in this preview.') },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <SplitButton
      label="Confirm order"
      :model="items"
      :buttonProps="{ type: 'button' }"
      :menuButtonProps="{ type: 'button', 'aria-label': 'More order actions' }"
      @click="result = 'Order confirmed in this preview.'"
    />
    <p role="status" class="text-muted-color">{{ result }}</p>
  </div>
</template>
