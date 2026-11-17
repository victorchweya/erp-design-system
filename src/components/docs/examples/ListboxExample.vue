<script setup lang="ts">
import { shallowRef, ref } from 'vue'
const selected = shallowRef<string | null>(null)
const several = ref<string[]>([])
const produce = ['Kale', 'Carrot', 'Spinach', 'Lime', 'Tomato']
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <span id="listbox-one-label" class="font-medium">One item</span
      ><Listbox v-model="selected" :options="produce" filter aria-labelledby="listbox-one-label" />
      <p class="text-muted-color">{{ selected || 'None selected' }}</p>
    </div>
    <div class="flex flex-col gap-2">
      <span id="listbox-many-label" class="font-medium">Several items</span
      ><Listbox
        v-model="several"
        :options="produce"
        multiple
        :metaKeySelection="false"
        aria-labelledby="listbox-many-label"
      />
      <p class="text-muted-color">{{ several.length }} selected.</p>
    </div>
  </div>
</template>
