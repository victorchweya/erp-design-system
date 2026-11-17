<script setup lang="ts">
const shadows = [
  { label: 'Small', utility: 'shadow-sm' },
  { label: 'Default', utility: 'shadow' },
  { label: 'Medium', utility: 'shadow-md' },
  { label: 'Large', utility: 'shadow-lg' },
  { label: 'Extra large', utility: 'shadow-xl' },
  { label: '2X large', utility: 'shadow-2xl' },
  { label: 'Inner', utility: 'shadow-inner' },
  { label: 'None', utility: 'shadow-none' },
]
</script>

<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <figure
      v-for="shadow in shadows"
      :key="shadow.utility"
      class="flex min-w-0 flex-col gap-4 rounded-lg border border-surface p-4"
    >
      <div
        :class="shadow.utility"
        class="h-16 rounded-lg bg-surface-0 dark:bg-surface-800"
        aria-hidden="true"
      />
      <figcaption class="flex flex-col gap-1">
        <h3 class="text-base font-medium">{{ shadow.label }}</h3>
        <code class="text-xs text-muted-color">{{ shadow.utility }}</code>
      </figcaption>
    </figure>
  </div>
</template>
