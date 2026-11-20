<script setup lang="ts">
defineProps<{ label: string; name?: string; role?: string }>()
</script>

<template>
  <section
    :aria-label="label"
    class="flex min-w-0 flex-col gap-4 rounded-lg border border-surface p-4 break-inside-avoid"
  >
    <h4 class="font-medium">{{ label }}</h4>
    <dl class="grid grid-cols-[auto_1fr] items-end gap-x-3 gap-y-4">
      <dt class="text-muted">Name</dt>
      <dd class="min-h-6 border-b border-surface pb-1">
        <template v-if="name"
          >{{ name }}<span v-if="role" class="text-muted"> · {{ role }}</span></template
        >
        <span v-else class="sr-only">To be completed</span>
      </dd>
      <dt class="text-muted">Signature</dt>
      <dd class="min-h-10 border-b border-surface"><span class="sr-only">To be signed</span></dd>
      <dt class="text-muted">Date</dt>
      <dd class="min-h-6 border-b border-surface"><span class="sr-only">To be completed</span></dd>
    </dl>
  </section>
</template>
