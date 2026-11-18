<script setup lang="ts">
import { useId } from 'vue'
const id = useId()
const address = defineModel<string>('address', { required: true })
const warehouse = defineModel<string>('warehouse', { required: true })
const slot = defineModel<string>('slot', { required: true })
</script>

<template>
  <Card>
    <template #title><h3 class="text-lg font-medium">Delivery</h3></template>
    <template #content>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="flex min-w-0 flex-col gap-1">
          <label :for="`${id}-warehouse`" class="text-sm font-medium">Dispatch from</label>
          <Select
            :inputId="`${id}-warehouse`"
            v-model="warehouse"
            :options="['Nairobi hub']"
            fluid
          />
        </div>
        <div class="flex min-w-0 flex-col gap-1">
          <label :for="`${id}-slot`" class="text-sm font-medium">Delivery slot</label>
          <Select
            :inputId="`${id}-slot`"
            v-model="slot"
            :options="['Next delivery day · 8am–12pm', 'Next delivery day · 12pm–4pm']"
            fluid
          />
        </div>
        <div class="flex min-w-0 flex-col gap-1 sm:col-span-2">
          <label :for="`${id}-address`" class="text-sm font-medium">Drop-off address</label>
          <InputText :id="`${id}-address`" v-model="address" required fluid />
          <p class="text-xs text-muted">
            Westlands route · delivery fee confirmed in the order summary.
          </p>
        </div>
      </div>
    </template>
  </Card>
</template>
