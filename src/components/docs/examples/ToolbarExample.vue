<script setup lang="ts">
import { shallowRef } from 'vue'
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
            severity="secondary"
            outlined
            @click="action = 'Export selected.'"
            >Export</Button
          ><Button
            type="button"
            size="small"
            severity="secondary"
            outlined
            @click="action = 'Filters selected.'"
            >Filters</Button
          >
        </div></template
      >
    </Toolbar>
    <p role="status" class="text-muted-color">{{ action }}</p>
  </div>
</template>
