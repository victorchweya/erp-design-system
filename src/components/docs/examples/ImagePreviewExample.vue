<script setup lang="ts">
import logo from '@/assets/brand/logo.svg'

const alt = 'Farm to Feed wordmark printed on the packaging label'
</script>

<template>
  <figure class="flex max-w-sm flex-col gap-3">
    <Image
      :src="logo"
      :alt="alt"
      width="320"
      preview
      imageClass="rounded-md border border-surface bg-white p-6"
      :pt="{
        previewMask: { 'aria-label': 'Enlarge packaging label artwork' },
        mask: { 'aria-label': 'Packaging label artwork preview' },
        original: { alt, class: 'rounded-md bg-white p-8' },
      }"
    />
    <figcaption class="text-muted-color">
      Packaging label artwork for Sukuma wiki, 1 kg bunch. Select the image to zoom and rotate.
    </figcaption>
  </figure>
</template>
