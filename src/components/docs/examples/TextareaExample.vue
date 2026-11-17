<script setup lang="ts">
import { shallowRef } from 'vue'
const notes = shallowRef('')
</script>

<template>
  <div class="flex max-w-lg flex-col gap-2">
    <label for="delivery-notes" class="font-medium">Delivery notes</label
    ><Textarea
      id="delivery-notes"
      v-model="notes"
      autoResize
      rows="3"
      maxlength="240"
      fluid
      aria-describedby="delivery-notes-help"
    />
    <p id="delivery-notes-help" class="text-muted-color">
      Optional instructions for the driver. {{ notes.length }}/240 characters.
    </p>
  </div>
</template>
