<script setup lang="ts">
import { shallowRef } from 'vue'
const applyDiscount = shallowRef(false)
const discount = shallowRef<number | null>(5)
</script>

<template>
  <div class="flex flex-col gap-1 sm:max-w-xs">
    <label for="group-discount-rate" class="font-medium">Volume discount (%)</label
    ><InputGroup
      ><InputGroupAddon
        ><Checkbox
          v-model="applyDiscount"
          binary
          inputId="group-apply-discount"
          ariaLabel="Apply volume discount" /></InputGroupAddon
      ><InputNumber
        inputId="group-discount-rate"
        v-model="discount"
        :min="0"
        :max="20"
        :disabled="!applyDiscount"
        aria-describedby="group-discount-help"
        fluid
      /><InputGroupAddon>%</InputGroupAddon></InputGroup
    >
    <p id="group-discount-help" class="text-muted-color">
      Tick the box to apply up to 20% on orders above 500 kg.
    </p>
  </div>
</template>
