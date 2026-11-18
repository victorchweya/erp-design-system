<script setup lang="ts">
import vAnimateonscroll from 'primevue/animateonscroll'
</script>

<template>
  <div class="flex flex-col gap-4">
    <p class="text-muted">Scroll down to reveal the card.</p>
    <div class="h-64" />
    <Card v-animateonscroll="{ enterClass: 'reveal' }"
      ><template #title><h3>Fresh produce, less waste</h3></template
      ><template #content><p>Shaping the Future of Food</p></template></Card
    >
  </div>
</template>

<style scoped>
@keyframes reveal {
  from {
    opacity: 0;
    transform: translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media (prefers-reduced-motion: no-preference) {
  .reveal {
    animation: reveal 400ms ease-out both;
  }
}
</style>
