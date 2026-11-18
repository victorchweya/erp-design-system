<script setup lang="ts">
import { ref } from 'vue'
import Times from '@primeicons/vue/times'
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
      >
        <template #removeicon="{ removeCallback }">
          <Button
            type="button"
            text
            iconOnly
            severity="secondary"
            size="small"
            :aria-label="`Remove ${filter}`"
            @click="removeCallback"
            ><Times :size="12" aria-hidden="true"
          /></Button>
        </template>
      </Chip>
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
