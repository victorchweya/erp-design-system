<script setup lang="ts">
import logo from '@/assets/brand/logo.svg'
import symbol from '@/assets/brand/symbol.svg'
import ChevronLeft from '@primeicons/vue/chevron-left'
import ChevronRight from '@primeicons/vue/chevron-right'
</script>

<template>
  <Gallery style="height: 20rem" aria-label="Farm to Feed brand assets"
    ><GalleryBackdrop /><GalleryPrev aria-label="Previous image"
      ><ChevronLeft aria-hidden="true" /></GalleryPrev
    ><GalleryNext aria-label="Next image"><ChevronRight aria-hidden="true" /></GalleryNext
    ><GalleryContent
      ><GalleryItem
        ><img
          :src="logo"
          alt="Farm to Feed wordmark"
          class="max-w-full bg-white p-6" /></GalleryItem
      ><GalleryItem
        ><img
          :src="symbol"
          alt="Farm to Feed symbol"
          class="h-40 bg-white p-6" /></GalleryItem></GalleryContent
  ></Gallery>
</template>
