<script setup lang="ts">
import symbol from '@/assets/brand/symbol.svg'
import SearchPlus from '@primeicons/vue/search-plus'

const alt = 'Farm to Feed symbol on the crate sticker'
</script>

<template>
  <figure class="flex max-w-xs flex-col gap-3">
    <Image
      :src="symbol"
      :alt="alt"
      width="160"
      preview
      :pt="{
        previewMask: { 'aria-label': 'Enlarge crate sticker artwork' },
        mask: { 'aria-label': 'Crate sticker artwork preview' },
        original: { alt },
      }"
    >
      <template #previewicon><SearchPlus aria-hidden="true" /></template>
    </Image>
    <figcaption class="text-muted-color">Crate sticker artwork, approved for dispatch.</figcaption>
  </figure>
</template>
