<script setup lang="ts">
import { chartGuide } from './data-viz'
</script>

<template>
  <DataTable :value="chartGuide" size="small" showGridlines aria-label="Chart type selection">
    <Column field="question" header="Question" />
    <Column field="chart" header="Chart"
      ><template #body="{ data }"
        ><span class="font-medium">{{ data.chart }}</span></template
      ></Column
    >
    <Column field="note" header="Guidance" />
    <Column header="UI blocks"
      ><template #body="{ data }"
        ><span class="flex flex-wrap gap-x-3 gap-y-1"
          ><RouterLink
            v-for="block in data.blocks"
            :key="block.to"
            :to="block.to"
            class="rounded-xs text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >{{ block.label }}</RouterLink
          ></span
        ></template
      ></Column
    >
  </DataTable>
</template>
