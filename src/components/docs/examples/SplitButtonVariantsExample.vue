<script setup lang="ts">
const exportItems = [{ label: 'Export as PDF' }, { label: 'Export as Excel' }]
const approveItems = [{ label: 'Approve and notify supplier' }, { label: 'Approve partially' }]
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <SplitButton
      label="Export CSV"
      :model="exportItems"
      severity="secondary"
      outlined
      :buttonProps="{ type: 'button' }"
      :menuButtonProps="{ type: 'button', 'aria-label': 'More export formats' }"
    />
    <SplitButton
      label="Approve"
      :model="approveItems"
      size="small"
      :buttonProps="{ type: 'button' }"
      :menuButtonProps="{ type: 'button', 'aria-label': 'More approval options' }"
    />
    <SplitButton
      label="Post invoice"
      :model="exportItems"
      disabled
      :buttonProps="{ type: 'button' }"
      :menuButtonProps="{ type: 'button', 'aria-label': 'More invoice actions' }"
    />
  </div>
</template>
