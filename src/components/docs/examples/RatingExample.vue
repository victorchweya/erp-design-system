<script setup lang="ts">
import { shallowRef } from 'vue'
const score = shallowRef<number | null>(null)
</script>

<template>
  <div class="flex flex-col gap-6">
    <fieldset class="flex min-w-0 flex-col gap-3">
      <legend class="mb-2 font-medium">Delivery rating</legend>
      <Rating v-model="score" :stars="5" />
      <p class="text-muted-color">{{ score ?? 0 }} out of 5 stars.</p>
    </fieldset>
    <fieldset class="flex min-w-0 flex-col gap-3">
      <legend class="mb-2 font-medium">Read-only rating</legend>
      <Rating :modelValue="4" readonly />
    </fieldset>
    <fieldset class="flex min-w-0 flex-col gap-3">
      <legend class="mb-2 font-medium">Disabled rating</legend>
      <Rating :modelValue="3" disabled />
    </fieldset>
  </div>
</template>
