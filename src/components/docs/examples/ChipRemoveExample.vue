<script setup lang="ts">
import { ref } from 'vue'
const filters = ref(['Vegetables', 'In season', 'Local'])
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-3">
      <Chip
        v-for="filter in filters"
        :key="filter"
        :label="filter"
        removable
        @remove="filters = filters.filter((value) => value !== filter)"
      />
    </div>
    <p role="status" class="text-muted-color">{{ filters.length }} filters selected.</p>
    <Button
      type="button"
      size="small"
      severity="secondary"
      outlined
      class="self-start"
      @click="filters = ['Vegetables', 'In season', 'Local']"
      >Reset filters</Button
    >
  </div>
</template>
