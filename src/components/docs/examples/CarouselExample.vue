<script setup lang="ts">
import ChevronLeft from '@primeicons/vue/chevron-left'
import ChevronRight from '@primeicons/vue/chevron-right'
</script>

<template>
  <Carousel aria-label="Produce highlights"
    ><CarouselContent class="h-48"
      ><CarouselItem v-for="name in ['Carrots', 'Limes', 'Kale']" :key="name"
        ><div
          class="flex h-full items-center justify-center rounded-lg border border-surface bg-highlight p-6 text-2xl font-medium text-highlight"
        >
          {{ name }}
        </div></CarouselItem
      ></CarouselContent
    >
    <div class="flex flex-wrap items-center justify-between gap-4 pt-4">
      <CarouselIndicators />
      <div class="flex gap-2">
        <CarouselPrev aria-label="Previous slide" class="rounded-md border border-surface p-2"
          ><ChevronLeft aria-hidden="true" /></CarouselPrev
        ><CarouselNext aria-label="Next slide" class="rounded-md border border-surface p-2"
          ><ChevronRight aria-hidden="true"
        /></CarouselNext>
      </div></div
  ></Carousel>
</template>
