<script setup lang="ts">
import CheckCircle from '@primeicons/vue/check-circle'
import { computed } from 'vue'
import Download from '@primeicons/vue/download'
import type { ImportRow } from './csv'

const props = defineProps<{ rows: ImportRow[] }>()
const emit = defineEmits<{ download: [] }>()

const invalidRows = computed(() => props.rows.filter((row) => row.errors.length))
const validCount = computed(() => props.rows.length - invalidRows.value.length)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-2" role="status">
      <Tag severity="success">{{ validCount }} valid</Tag>
      <Tag :severity="invalidRows.length ? 'danger' : 'secondary'"
        >{{ invalidRows.length }} with errors</Tag
      >
      <span class="text-muted">of {{ rows.length }} rows checked</span>
    </div>
    <DataTable
      v-if="invalidRows.length"
      :value="invalidRows"
      dataKey="line"
      size="small"
      showGridlines
      scrollable
      :tableProps="{ 'aria-label': 'Rows with errors' }"
    >
      <template #header>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <p class="text-sm text-muted">Rows with errors are skipped. Fix them and re-import.</p>
          <Button
            type="button"
            severity="primary"
            outlined
            size="small"
            @click="emit('download')"
          >
            <Download aria-hidden="true" />
            Download error report
          </Button>
        </div>
      </template>
      <Column field="line" header="Row" />
      <Column header="SKU">
        <template #body="{ data }">{{ data.values.sku || '—' }}</template>
      </Column>
      <Column header="Customer">
        <template #body="{ data }">{{ data.values.customer || '—' }}</template>
      </Column>
      <Column header="Qty (kg)">
        <template #body="{ data }">{{ data.values.quantity || '—' }}</template>
      </Column>
      <Column header="Delivery date">
        <template #body="{ data }">{{ data.values.deliveryDate || '—' }}</template>
      </Column>
      <Column header="Issues">
        <template #body="{ data }">
          <ul class="flex flex-col gap-1 text-danger">
            <li v-for="error in data.errors" :key="error">{{ error }}</li>
          </ul>
        </template>
      </Column>
    </DataTable>
    <Message v-else severity="success">
      <template #icon="{ class: iconClass }">
        <CheckCircle :class="iconClass" aria-hidden="true" />
      </template>
      Every row passed validation.
    </Message>
  </div>
</template>
