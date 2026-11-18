<script setup lang="ts">
import { computed, shallowRef, useId } from 'vue'
import Trash from '@primeicons/vue/trash'
import Replay from '@primeicons/vue/replay'
import { money, produce, type OrderLine } from './order-entry'

const props = defineProps<{ items: OrderLine[] }>()
const emit = defineEmits<{
  quantity: [id: string, quantity: number | null]
  remove: [id: string]
  add: [id: string]
  reorder: []
}>()
const id = useId()
const selected = shallowRef<string | null>(null)
const available = computed(() =>
  produce.filter((item) => !props.items.some((line) => line.id === item.id)),
)
const packs = computed(() => props.items.reduce((sum, item) => sum + item.quantity, 0))
function add() {
  if (!selected.value) return
  emit('add', selected.value)
  selected.value = null
}
</script>

<template>
  <Card class="min-w-0">
    <template #title>
      <div class="flex flex-wrap items-center justify-between gap-2">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-lg font-medium">Items</h3>
          <Tag severity="secondary">{{ items.length }} products · {{ packs }} packs</Tag>
        </div>
        <Button type="button" size="small" severity="secondary" text @click="emit('reorder')">
          <Replay aria-hidden="true" /> Reorder last order
        </Button>
      </div>
    </template>
    <template #content>
      <DataTable
        :value="items"
        dataKey="id"
        size="small"
        showGridlines
        :tableStyle="{ minWidth: '34rem' }"
        :tableProps="{ 'aria-label': 'Order items' }"
      >
        <Column header="Produce">
          <template #body="{ data }">
            <div class="flex flex-col gap-1">
              <span class="font-medium">{{ data.name }}</span>
              <span class="text-xs text-muted"
                >{{ data.pack }} · {{ data.stock }} packs available</span
              >
            </div>
          </template>
        </Column>
        <Column header="Price / pack" bodyClass="whitespace-nowrap tabular-nums">
          <template #body="{ data }">{{ money(data.price) }}</template>
        </Column>
        <Column header="Quantity">
          <template #body="{ data }">
            <InputNumber
              :modelValue="data.quantity"
              :aria-label="`${data.name} quantity`"
              :min="1"
              :max="data.stock"
              :maxFractionDigits="0"
              :allowEmpty="false"
              :useGrouping="false"
              showButtons
              size="small"
              inputClass="w-20 tabular-nums"
              @update:modelValue="emit('quantity', data.id, $event)"
            />
          </template>
        </Column>
        <Column header="Total" bodyClass="whitespace-nowrap text-right tabular-nums">
          <template #body="{ data }">{{ money(data.price * data.quantity) }}</template>
        </Column>
        <Column header="">
          <template #body="{ data }">
            <Button
              type="button"
              size="small"
              severity="secondary"
              text
              iconOnly
              :aria-label="`Remove ${data.name}`"
              @click="emit('remove', data.id)"
              ><Trash aria-hidden="true"
            /></Button>
          </template>
        </Column>
        <template #empty>Add produce below to start this order.</template>
      </DataTable>
    </template>
    <template #footer>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-produce`" class="text-sm font-medium">Add produce</label>
        <div class="flex gap-2">
          <Select
            :inputId="`${id}-produce`"
            v-model="selected"
            :options="available"
            optionLabel="name"
            optionValue="id"
            filter
            :disabled="!available.length"
            :placeholder="available.length ? 'Find produce' : 'All produce added'"
            class="min-w-0 flex-1"
          />
          <Button type="button" severity="secondary" outlined :disabled="!selected" @click="add"
            >Add</Button
          >
        </div>
      </div>
    </template>
  </Card>
</template>
