<script setup lang="ts">
import { writingTerms } from './writing-guidelines'
</script>

<template>
  <DataTable :value="writingTerms" size="small" showGridlines aria-label="ERP terminology">
    <Column field="term" header="Term"
      ><template #body="{ data }"
        ><span class="font-medium">{{ data.term }}</span></template
      ></Column
    >
    <Column field="meaning" header="Meaning" />
    <Column field="avoid" header="Avoid"
      ><template #body="{ data }"
        ><span class="text-muted-color">{{ data.avoid }}</span></template
      ></Column
    >
  </DataTable>
</template>
