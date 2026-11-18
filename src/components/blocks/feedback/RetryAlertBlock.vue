<script setup lang="ts">
import { shallowRef } from 'vue'
const failed = shallowRef(true)
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Message v-if="failed" severity="error" class="w-full">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="min-w-0 flex-1 basis-64 space-y-1">
          <p class="font-medium">Order history could not be loaded</p>
          <p class="text-sm">Your order is safe. Try loading the history again.</p>
        </div>
        <Button type="button" severity="secondary" outlined size="small" @click="failed = false"
          >Try again</Button
        >
      </div>
    </Message>
    <template v-else>
      <Message severity="success" class="w-full">Order history loaded in this preview.</Message>
      <Button type="button" severity="secondary" outlined size="small" @click="failed = true"
        >Show error again</Button
      >
    </template>
  </div>
</template>
