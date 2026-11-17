<script setup lang="ts">
import { shallowRef } from 'vue'
const value = shallowRef(40)
</script>

<template>
  <div class="flex flex-wrap gap-8">
    <div class="flex flex-col items-center gap-3">
      <span id="capacity-knob-label" class="font-medium">Capacity (%)</span
      ><Knob v-model="value" :min="0" :max="100" :step="5" aria-labelledby="capacity-knob-label" />
      <div class="flex gap-2">
        <Button
          type="button"
          size="small"
          severity="secondary"
          outlined
          :disabled="value <= 0"
          aria-label="Decrease capacity"
          @click="value = Math.max(0, value - 5)"
          >−5</Button
        ><Button
          type="button"
          size="small"
          severity="secondary"
          outlined
          :disabled="value >= 100"
          aria-label="Increase capacity"
          @click="value = Math.min(100, value + 5)"
          >+5</Button
        >
      </div>
    </div>
    <div class="flex flex-col items-center gap-3">
      <span id="recorded-capacity-label" class="font-medium">Recorded capacity</span
      ><Knob :modelValue="75" readonly aria-labelledby="recorded-capacity-label" />
    </div>
    <div class="flex flex-col items-center gap-3">
      <span id="disabled-capacity-label" class="font-medium">Unavailable</span
      ><Knob :modelValue="25" disabled aria-labelledby="disabled-capacity-label" />
    </div>
  </div>
</template>
