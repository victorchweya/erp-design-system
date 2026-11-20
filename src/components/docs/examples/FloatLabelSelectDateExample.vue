<script setup lang="ts">
import { ref, shallowRef } from 'vue'
const collectionCentre = shallowRef<string | null>(null)
const harvestDate = ref<Date | null>(null)
const centres = [
  { label: 'Limuru', value: 'limuru' },
  { label: 'Nyandarua', value: 'nyandarua' },
  { label: 'Meru', value: 'meru' },
  { label: 'Kirinyaga', value: 'kirinyaga' },
]
</script>

<template>
  <div class="grid items-end gap-6 sm:grid-cols-2">
    <FloatLabel variant="on">
      <Select
        v-model="collectionCentre"
        inputId="float-centre"
        ariaLabelledby="float-centre-label"
        :options="centres"
        optionLabel="label"
        optionValue="value"
        fluid
      />
      <label id="float-centre-label" for="float-centre">Collection centre</label>
    </FloatLabel>
    <FloatLabel variant="on">
      <DatePicker
        v-model="harvestDate"
        inputId="float-harvest-date"
        dateFormat="dd/mm/yy"
        showIcon
        iconDisplay="input"
        fluid
      />
      <label for="float-harvest-date">Harvest date</label>
    </FloatLabel>
  </div>
</template>
