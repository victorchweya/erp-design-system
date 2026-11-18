<script setup lang="ts">
import { shallowRef } from 'vue'
const loaded = shallowRef(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="text-muted">Scroll down to reveal the deferred summary.</p>
    <div
      class="flex h-80 items-center justify-center rounded-lg border border-dashed border-surface"
    >
      Deferred content is below
    </div>
    <DeferredContent @load="loaded = true"
      ><Message severity="info">The delivery summary is now visible.</Message></DeferredContent
    >
    <p role="status">
      {{
        loaded
          ? 'Content loaded in this preview.'
          : 'Waiting for the content to enter the viewport.'
      }}
    </p>
  </div>
</template>
