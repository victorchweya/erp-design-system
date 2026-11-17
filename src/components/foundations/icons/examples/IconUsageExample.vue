<script setup lang="ts">
import Search from '@primeicons/vue/search'
import Check from '@primeicons/vue/check'
</script>

<template>
  <div class="flex flex-wrap gap-6">
    <span class="inline-flex items-center gap-2 text-primary">
      <Search :size="20" aria-hidden="true" focusable="false" />
      Find produce
    </span>
    <span class="inline-flex items-center gap-2 text-success">
      <Check :size="20" aria-hidden="true" focusable="false" />
      Order confirmed
    </span>
  </div>
</template>
