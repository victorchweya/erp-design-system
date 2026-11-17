<script setup lang="ts">
import { ref } from 'vue'
const selected = ref<string[]>(['Kale'])
const produce = ['Kale', 'Carrot', 'Spinach', 'Lime', 'Tomato']
</script>

<template>
  <div class="flex max-w-lg flex-col gap-2">
    <label for="produce-multiple" class="font-medium">Produce in this order</label
    ><MultiSelect
      inputId="produce-multiple"
      v-model="selected"
      :options="produce"
      filter
      display="chip"
      placeholder="Choose produce"
      fluid
    />
    <p class="text-muted-color">{{ selected.length }} selected.</p>
  </div>
</template>
