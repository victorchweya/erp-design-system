<script setup lang="ts">
import { tokenRows } from '@/theme/erp-theme/foundations/color-tokens'
</script>

<template>
  <p id="color-table-help" class="text-muted-color">
    Semantic rows list foreground / background. Primitive rows are fixed values, with no automatic
    dark role assigned.
  </p>
  <DataTable
    :value="tokenRows"
    dataKey="name"
    scrollable
    scrollHeight="36rem"
    :tableStyle="{ minWidth: '64rem' }"
    :tableProps="{
      'aria-label': 'FTF color token reference',
      'aria-describedby': 'color-table-help',
    }"
  >
    <Column field="name" header="Token">
      <template #body="{ data }"
        ><code class="text-xs">{{ data.name }}</code></template
      >
    </Column>
    <Column field="purpose" header="Purpose" />
    <Column header="Light · foreground / background">
      <template #body="{ data }">
        <div class="flex flex-col gap-2">
          <code class="text-xs">{{ data.light }}</code
          ><span class="text-xs text-muted-color">{{ data.pairing }}</span>
        </div>
      </template>
    </Column>
    <Column header="Dark · foreground / background">
      <template #body="{ data }">
        <div class="flex flex-col gap-2">
          <code class="text-xs">{{ data.dark }}</code
          ><span class="text-xs text-muted-color">{{ data.darkPairing }}</span>
        </div>
      </template>
    </Column>
    <Column header="Evidence">
      <template #body="{ data }"
        ><div class="flex flex-col gap-2">
          <span class="font-medium">{{ data.evidence }}</span
          ><span class="text-xs text-muted-color">{{ data.source }}</span>
        </div></template
      >
    </Column>
  </DataTable>
</template>
