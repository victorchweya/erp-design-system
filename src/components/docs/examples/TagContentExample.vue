<script setup lang="ts">
import Check from '@primeicons/vue/check'
</script>

<template>
  <div class="flex flex-wrap items-center gap-3">
    <Tag severity="success"><Check :size="14" aria-hidden="true" />Completed</Tag>
    <Tag severity="warn" rounded>Awaiting review</Tag><Tag severity="secondary">Vegetables</Tag>
  </div>
</template>
