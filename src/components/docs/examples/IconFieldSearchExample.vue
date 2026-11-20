<script setup lang="ts">
import { shallowRef } from 'vue'
import Search from '@primeicons/vue/search'
import MapMarker from '@primeicons/vue/map-marker'
const produce = shallowRef('')
const location = shallowRef('Kawangware, Nairobi')
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-1">
      <label for="iconfield-produce" class="font-medium">Search produce</label
      ><IconField
        ><InputIcon><Search aria-hidden="true" focusable="false" /></InputIcon
        ><InputText
          id="iconfield-produce"
          v-model="produce"
          type="search"
          placeholder="Tomatoes, sukuma wiki…"
          fluid
      /></IconField>
    </div>
    <div class="flex flex-col gap-1">
      <label for="iconfield-location" class="font-medium">Delivery location</label
      ><IconField
        ><InputText id="iconfield-location" v-model="location" autocomplete="off" fluid /><InputIcon
          ><MapMarker aria-hidden="true" focusable="false" /></InputIcon
      ></IconField>
    </div>
  </div>
</template>
