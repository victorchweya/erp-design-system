<script setup lang="ts">
import ArrowsH from '@primeicons/vue/arrows-h'
</script>

<template>
  <Compare aria-label="Compare order preparation" class="h-56 w-full"
    ><CompareItem position="before"
      ><div
        class="flex h-56 w-full items-center justify-center bg-surface-100 p-8 text-xl font-medium text-color dark:bg-surface-800"
      >
        Before sorting
      </div></CompareItem
    ><CompareItem position="after"
      ><div
        class="flex h-56 w-full items-center justify-center bg-primary p-8 text-xl font-medium text-primary-contrast"
      >
        Ready for delivery
      </div></CompareItem
    ><CompareHandle
      ><CompareIndicator class="flex items-center justify-center"
        ><ArrowsH aria-hidden="true" /></CompareIndicator></CompareHandle
  ></Compare>
</template>
