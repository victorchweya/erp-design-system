<script setup lang="ts">
import { shallowRef, ref } from 'vue'
const view = shallowRef('Day')
const produce = ref<string[]>(['Vegetables'])
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <span id="delivery-view-label" class="font-medium">Delivery view</span
      ><SelectButton
        v-model="view"
        :options="['Day', 'Week', 'Month']"
        :allowEmpty="false"
        aria-labelledby="delivery-view-label"
      />
    </div>
    <div class="flex flex-col gap-2">
      <span id="produce-types-label" class="font-medium">Include produce</span
      ><SelectButton
        v-model="produce"
        :options="['Vegetables', 'Fruit', 'Herbs']"
        multiple
        aria-labelledby="produce-types-label"
      />
    </div>
  </div>
</template>
