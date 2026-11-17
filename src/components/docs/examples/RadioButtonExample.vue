<script setup lang="ts">
import { shallowRef } from 'vue'
const delivery = shallowRef('Standard')
</script>

<template>
  <fieldset class="flex flex-col gap-3">
    <legend class="mb-2 font-medium">Delivery method</legend>
    <div
      v-for="method in ['Standard', 'Express', 'Collection']"
      :key="method"
      class="flex items-center gap-2"
    >
      <RadioButton
        :inputId="`delivery-${method}`"
        v-model="delivery"
        name="delivery-method"
        :value="method"
      /><label :for="`delivery-${method}`">{{ method }}</label>
    </div>
    <p class="text-muted-color">Selected: {{ delivery }}</p>
  </fieldset>
</template>
