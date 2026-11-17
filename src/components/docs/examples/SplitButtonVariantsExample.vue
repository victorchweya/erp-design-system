<script setup lang="ts">
const items = [{ label: 'Save draft' }, { label: 'Duplicate' }]
</script>

<template>
  <div class="flex flex-wrap gap-4">
    <SplitButton
      label="Secondary"
      :model="items"
      severity="secondary"
      outlined
      :menuButtonProps="{ 'aria-label': 'More secondary actions' }"
    />
    <SplitButton
      label="Small"
      :model="items"
      size="small"
      :menuButtonProps="{ 'aria-label': 'More small actions' }"
    />
    <SplitButton
      label="Unavailable"
      :model="items"
      disabled
      :menuButtonProps="{ 'aria-label': 'Unavailable actions' }"
    />
  </div>
</template>
