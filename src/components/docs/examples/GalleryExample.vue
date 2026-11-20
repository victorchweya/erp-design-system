<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import logo from '@/assets/brand/logo.svg'
import symbol from '@/assets/brand/symbol.svg'
import ChevronLeft from '@primeicons/vue/chevron-left'
import ChevronRight from '@primeicons/vue/chevron-right'

const images = [
  { src: logo, alt: 'Farm to Feed wordmark', class: 'max-w-full' },
  { src: symbol, alt: 'Farm to Feed symbol', class: 'h-40' },
]
const activeIndex = shallowRef(0)
const caption = computed(
  () => `Image ${activeIndex.value + 1} of ${images.length}: ${images[activeIndex.value]?.alt}`,
)
</script>

<template>
  <div class="flex flex-col gap-2">
    <Gallery
      v-model:activeIndex="activeIndex"
      role="region"
      aria-label="Farm to Feed brand assets"
      class="rounded-lg"
      style="height: 20rem"
    >
      <GalleryBackdrop />
      <GalleryPrev aria-label="Previous image"><ChevronLeft aria-hidden="true" /></GalleryPrev>
      <GalleryNext aria-label="Next image"><ChevronRight aria-hidden="true" /></GalleryNext>
      <GalleryContent>
        <GalleryItem v-for="image in images" :key="image.alt">
          <img :src="image.src" :alt="image.alt" class="bg-surface-0 p-6" :class="image.class" />
        </GalleryItem>
      </GalleryContent>
    </Gallery>
    <p role="status" class="text-muted-color">{{ caption }}</p>
  </div>
</template>
