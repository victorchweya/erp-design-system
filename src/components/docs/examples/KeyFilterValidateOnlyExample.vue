<script setup lang="ts">
import { shallowRef } from 'vue'
import vKeyfilter from 'primevue/keyfilter'

// validateOnly tests the value that would result from the key press.
const twoDecimals = { pattern: /^\d*\.?\d{0,2}$/, validateOnly: true }
const weight = shallowRef('')
</script>

<template>
  <div class="flex flex-col gap-1 sm:max-w-xs">
    <label for="keyfilter-dispatch-weight" class="font-medium">Dispatch weight (kg)</label
    ><InputText
      id="keyfilter-dispatch-weight"
      v-model="weight"
      v-keyfilter="twoDecimals"
      inputmode="decimal"
      aria-describedby="keyfilter-dispatch-weight-help"
      fluid
    />
    <p id="keyfilter-dispatch-weight-help" class="text-muted-color">
      Up to two decimal places, for example 24.75.
    </p>
  </div>
</template>
