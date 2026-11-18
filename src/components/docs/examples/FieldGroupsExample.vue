<script setup lang="ts">
import { shallowRef } from 'vue'
import Search from '@primeicons/vue/search'
const amount = shallowRef<number | null>(null)
const search = shallowRef('')
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-1">
      <label for="price-group" class="font-medium">Price</label
      ><InputGroup
        ><InputGroupAddon>KES</InputGroupAddon
        ><InputNumber inputId="price-group" v-model="amount" :min="0" :maxFractionDigits="2" fluid
      /></InputGroup>
    </div>
    <div class="flex flex-col gap-1">
      <label for="search-group" class="font-medium">Search produce</label
      ><IconField
        ><InputIcon><Search :size="16" aria-hidden="true" /></InputIcon
        ><InputText id="search-group" v-model="search" fluid
      /></IconField>
    </div>
  </div>
</template>
