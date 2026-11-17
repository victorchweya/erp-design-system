<script setup lang="ts">
import { tokenRows } from '@/theme/erp-theme/foundations/color-tokens'

const modes = [
  { name: 'light', label: 'Light' },
  { name: 'dark', label: 'Dark' },
] as const
</script>

<template>
  <p id="color-table-help" class="text-muted-color">
    Each role shows its foreground and background colours. Palette colours are fixed; a dash means
    no dark-mode mapping.
  </p>
  <DataTable
    :value="tokenRows"
    dataKey="name"
    size="small"
    scrollable
    tableClass="text-xs"
    :tableStyle="{ minWidth: '52rem' }"
    :tableProps="{
      'aria-label': 'FTF color token reference',
      'aria-describedby': 'color-table-help',
    }"
  >
    <Column field="label" header="Role" />
    <Column field="name" header="Token">
      <template #body="{ data }">
        <code class="text-xs">{{ data.name }}</code>
      </template>
    </Column>
    <Column v-for="mode in modes" :key="mode.name" :header="mode.label">
      <template #body="{ data }">
        <div v-if="data[mode.name].length" class="flex flex-col gap-2">
          <div
            v-for="color in data[mode.name]"
            :key="color.label"
            class="flex items-center gap-2"
            :title="color.label"
          >
            <span
              class="h-5 w-5 shrink-0 rounded-full border border-surface"
              :style="{ backgroundColor: color.value }"
              aria-hidden="true"
            />
            <span class="sr-only">{{ color.label }}: </span>
            <div class="flex flex-col gap-1">
              <span class="text-muted-color">{{ color.name }}</span>
              <code class="text-xs">{{ color.value }}</code>
            </div>
          </div>
        </div>
        <span v-else aria-label="No dark-mode mapping" class="text-muted-color">—</span>
      </template>
    </Column>
  </DataTable>
</template>
