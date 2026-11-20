<script setup lang="ts">
import { shallowRef, useTemplateRef, type ComponentPublicInstance } from 'vue'
import Search from '@primeicons/vue/search'
import Times from '@primeicons/vue/times'

const query = shallowRef('Avocado')
const input = useTemplateRef<ComponentPublicInstance>('search-input')

function clearQuery() {
  query.value = ''
  // The clear button is removed, so return focus to the field.
  ;(input.value?.$el as HTMLInputElement | undefined)?.focus()
}
</script>

<template>
  <div class="flex flex-col gap-1 sm:max-w-xs">
    <label for="iconfield-clear" class="font-medium">Search suppliers</label
    ><IconField
      ><InputIcon><Search aria-hidden="true" focusable="false" /></InputIcon
      ><InputText
        id="iconfield-clear"
        ref="search-input"
        v-model="query"
        autocomplete="off"
        aria-describedby="iconfield-clear-help"
        fluid
        @keydown.esc="clearQuery" /><InputIcon v-if="query"
        ><button
          type="button"
          class="-m-1 flex rounded-sm p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary"
          aria-label="Clear supplier search"
          @click="clearQuery"
        >
          <Times aria-hidden="true" focusable="false" /></button></InputIcon
    ></IconField>
    <p id="iconfield-clear-help" class="text-muted-color">Press Escape to clear the search.</p>
  </div>
</template>
