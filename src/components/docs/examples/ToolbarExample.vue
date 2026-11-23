<script setup lang="ts">
import { shallowRef } from 'vue'
import Download from '@primeicons/vue/download'
import SlidersH from '@primeicons/vue/sliders-h'
const action = shallowRef('Choose an order action.')
</script>

<template>
  <div class="flex flex-col gap-4">
    <Toolbar aria-label="Order actions">
      <template #start
        ><Button type="button" size="small" @click="action = 'New order selected.'"
          >New order</Button
        ></template
      >
      <template #end
        ><div class="flex flex-wrap gap-2">
          <Button
            type="button"
            size="small"
            severity="primary"
            outlined
            @click="action = 'Export selected.'"
            ><Download aria-hidden="true" />Export</Button
          ><Button
            type="button"
            size="small"
            severity="primary"
            outlined
            @click="action = 'Filters selected.'"
            ><SlidersH aria-hidden="true" />Filters</Button
          >
        </div></template
      >
    </Toolbar>
    <p role="status" class="text-muted-color">{{ action }}</p>
  </div>
</template>
