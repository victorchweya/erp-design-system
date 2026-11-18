<script setup lang="ts">
import { shallowRef } from 'vue'
const reviewed = shallowRef(false)
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Message v-if="!reviewed" severity="warn" class="w-full">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div class="min-w-0 flex-1 basis-64 space-y-1">
          <p class="font-medium">Quantities need review</p>
          <p class="text-sm">
            Two items changed since this order was created. Review them before confirming.
          </p>
        </div>
        <Button type="button" severity="warn" size="small" @click="reviewed = true"
          >Mark as reviewed</Button
        >
      </div>
    </Message>
    <Message v-else severity="success" class="w-full"
      >Quantities reviewed in this preview. The order is ready for confirmation.</Message
    >
    <Button
      v-if="reviewed"
      type="button"
      severity="secondary"
      outlined
      size="small"
      @click="reviewed = false"
      >Reset preview</Button
    >
  </div>
</template>
