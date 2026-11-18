<script setup lang="ts">
import Plus from '@primeicons/vue/plus'
import Search from '@primeicons/vue/search'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Button type="button" size="small">
      <Plus class="shrink-0" aria-hidden="true" focusable="false" />
      Add produce
    </Button>
    <Button type="button" iconOnly severity="secondary" outlined aria-label="Search produce">
      <Search aria-hidden="true" focusable="false" />
    </Button>
  </div>
</template>
