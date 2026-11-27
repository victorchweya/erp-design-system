<script setup lang="ts">
const shadows = [
  { label: 'Small', utility: 'shadow-xs' },
  { label: 'Default', utility: 'shadow-sm' },
  { label: 'Medium', utility: 'shadow-md' },
  { label: 'Large', utility: 'shadow-lg' },
  { label: 'Extra large', utility: 'shadow-xl' },
  { label: '2X large', utility: 'shadow-2xl' },
  { label: 'Inner', utility: 'inset-shadow-sm' },
  { label: 'None', utility: 'shadow-none' },
]
</script>

<template>
  <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
    <Card
      v-for="shadow in shadows"
      :key="shadow.utility"
      class="min-w-0"
      role="figure"
      :aria-label="shadow.label"
    >
      <template #content>
        <div
          :class="shadow.utility"
          class="h-16 rounded-lg bg-surface-0 dark:bg-surface-800"
          aria-hidden="true"
        />
      </template>
      <template #footer>
        <div class="flex flex-col gap-1">
          <h3 class="text-base font-medium">{{ shadow.label }}</h3>
          <code class="text-xs text-muted-color">{{ shadow.utility }}</code>
        </div>
      </template>
    </Card>
  </div>
</template>
