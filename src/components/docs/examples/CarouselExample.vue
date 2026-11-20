<script setup lang="ts">
import ChevronLeft from '@primeicons/vue/chevron-left'
import ChevronRight from '@primeicons/vue/chevron-right'

const highlights = [
  { name: 'Carrots', note: 'Nyandarua, harvested Monday' },
  { name: 'Limes', note: 'Makueni, low stock' },
  { name: 'Kale', note: 'Limuru, harvested this morning' },
]
</script>

<template>
  <Carousel aria-label="Produce highlights" aria-roledescription="carousel">
    <CarouselContent class="h-48">
      <CarouselItem
        v-for="(item, index) in highlights"
        :key="item.name"
        aria-roledescription="slide"
        :aria-label="`${index + 1} of ${highlights.length}`"
      >
        <div
          class="flex h-full flex-col items-center justify-center gap-2 rounded-lg border border-surface bg-highlight p-6 text-highlight"
        >
          <p class="text-2xl font-medium">{{ item.name }}</p>
          <p>{{ item.note }}</p>
        </div>
      </CarouselItem>
    </CarouselContent>
    <div class="flex flex-wrap items-center justify-between gap-4 pt-4">
      <CarouselIndicators />
      <div class="flex gap-2">
        <CarouselPrev aria-label="Previous slide">
          <ChevronLeft aria-hidden="true" />
        </CarouselPrev>
        <CarouselNext aria-label="Next slide">
          <ChevronRight aria-hidden="true" />
        </CarouselNext>
      </div>
    </div>
  </Carousel>
</template>
