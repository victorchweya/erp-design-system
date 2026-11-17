<script setup lang="ts">
import { shallowRef, ref } from 'vue'
const weight = shallowRef(20)
const range = ref([10, 40])
</script>

<template>
  <div class="flex max-w-lg flex-col gap-8">
    <div class="flex flex-col gap-4">
      <label id="weight-slider-label" for="weight-input" class="font-medium"
        >Order weight (kg)</label
      ><InputNumber
        inputId="weight-input"
        v-model="weight"
        :min="0"
        :max="100"
        :step="5"
        fluid
      /><Slider
        v-model="weight"
        :min="0"
        :max="100"
        :step="5"
        aria-labelledby="weight-slider-label"
      />
    </div>
    <fieldset class="flex min-w-0 flex-col gap-4">
      <legend id="weight-range-label" class="mb-4 font-medium">Weight range (kg)</legend>
      <Slider
        v-model="range"
        range
        :min="0"
        :max="100"
        :step="5"
        aria-labelledby="weight-range-label"
      />
      <p class="text-muted-color">{{ range[0] }}–{{ range[1] }} kg</p>
    </fieldset>
  </div>
</template>
