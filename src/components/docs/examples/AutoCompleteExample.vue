<script setup lang="ts">
import { shallowRef } from 'vue'
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete'
const produce = ['Kale', 'Carrot', 'Spinach', 'Lime', 'Tomato']
const selected = shallowRef('')
const suggestions = shallowRef<string[]>([])
function search(event: AutoCompleteCompleteEvent) {
  const query = event.query.trim().toLowerCase()
  suggestions.value = produce.filter((item) => item.toLowerCase().includes(query))
}
</script>

<template>
  <div class="flex max-w-sm flex-col gap-1">
    <label for="produce-search" class="font-medium">Find produce</label
    ><AutoComplete
      inputId="produce-search"
      v-model="selected"
      :suggestions="suggestions"
      @complete="search"
      dropdown
      forceSelection
      fluid
      :inputProps="{ 'aria-describedby': 'produce-search-help' }"
    />
    <p id="produce-search-help" class="text-muted-color">
      Type to filter or open the list. Choose one of the suggestions.
    </p>
    <p class="text-muted-color">Selected: {{ selected || 'None' }}</p>
  </div>
</template>
