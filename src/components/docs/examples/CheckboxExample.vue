<script setup lang="ts">
import { shallowRef, ref } from 'vue'
const updates = shallowRef(false)
const produce = ref<string[]>([])
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-2">
      <Checkbox inputId="order-updates" v-model="updates" binary /><label for="order-updates"
        >Send order updates</label
      >
    </div>
    <fieldset class="flex flex-col gap-3">
      <legend class="mb-2 font-medium">Produce categories</legend>
      <div
        v-for="item in ['Vegetables', 'Fruit', 'Herbs']"
        :key="item"
        class="flex items-center gap-2"
      >
        <Checkbox
          :inputId="`category-${item}`"
          v-model="produce"
          name="categories"
          :value="item"
        /><label :for="`category-${item}`">{{ item }}</label>
      </div>
    </fieldset>
    <p class="text-muted-color">{{ produce.length }} categories selected.</p>
  </div>
</template>
