<script setup lang="ts">
import Plus from '@primeicons/vue/plus'
import ArrowRight from '@primeicons/vue/arrow-right'
import Search from '@primeicons/vue/search'
import Heart from '@primeicons/vue/heart'
</script>

<template>
  <div class="flex flex-wrap items-center gap-4">
    <Button type="button">
      <Plus :size="16" class="shrink-0" aria-hidden="true" focusable="false" />
      Add produce
    </Button>
    <Button type="button" severity="secondary" outlined>
      Continue
      <ArrowRight :size="16" class="shrink-0" aria-hidden="true" focusable="false" />
    </Button>
    <Button type="button" iconOnly outlined aria-label="Search produce">
      <Search :size="16" aria-hidden="true" focusable="false" />
    </Button>
    <Button type="button" iconOnly rounded text aria-label="Save favourite">
      <Heart :size="16" aria-hidden="true" focusable="false" />
    </Button>
  </div>
</template>
