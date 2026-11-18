<script setup lang="ts">
import { shallowRef } from 'vue'
const name = shallowRef('')
</script>

<template>
  <div class="flex max-w-sm flex-col gap-1">
    <label for="produce-name" class="font-medium">Produce name</label
    ><InputText
      id="produce-name"
      v-model="name"
      placeholder="e.g. Kale"
      aria-describedby="produce-name-help"
      fluid
    />
    <p id="produce-name-help" class="text-muted-color">Use the name customers will recognise.</p>
    <p class="text-muted-color">Current value: {{ name || 'Not entered' }}</p>
  </div>
</template>
