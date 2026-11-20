<script setup lang="ts">
import { shallowRef } from 'vue'
import Search from '@primeicons/vue/search'
import Times from '@primeicons/vue/times'

const reference = shallowRef('')
const status = shallowRef('')

function findOrder() {
  const value = reference.value.trim()
  status.value = value ? `Searching for order ${value}.` : 'Enter an order reference.'
}

function clearReference() {
  reference.value = ''
  status.value = ''
}
</script>

<template>
  <form class="flex flex-col gap-1 sm:max-w-sm" role="search" @submit.prevent="findOrder">
    <label for="group-order-reference" class="font-medium">Order reference</label
    ><InputGroup
      ><InputText
        id="group-order-reference"
        v-model="reference"
        placeholder="FTF-1042"
        autocomplete="off"
        aria-describedby="group-order-status" /><InputGroupAddon
        ><Button
          type="button"
          iconOnly
          severity="secondary"
          variant="text"
          aria-label="Clear order reference"
          :disabled="!reference"
          @click="clearReference"
          ><Times aria-hidden="true" focusable="false" /></Button></InputGroupAddon
      ><Button type="submit" label="Find"
        ><template #icon="{ class: iconClass }"
          ><Search :class="iconClass" aria-hidden="true" focusable="false" /></template></Button
    ></InputGroup>
    <p id="group-order-status" class="text-muted-color" aria-live="polite">{{ status }}</p>
  </form>
</template>
