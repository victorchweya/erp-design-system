<script setup lang="ts">
import Moon from '@primeicons/vue/moon'
import Sun from '@primeicons/vue/sun'
import { colorMode } from '@/theme/color-mode'
</script>

<template>
  <Button
    type="button"
    iconOnly
    rounded
    text
    severity="secondary"
    :aria-label="colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'"
  >
    <Sun v-if="colorMode === 'dark'" aria-hidden="true" />
    <Moon v-else aria-hidden="true" />
    <span
      class="pointer-events-none absolute left-1/2 top-1/2 size-12 -translate-x-1/2 -translate-y-1/2 pointer-fine:hidden"
      aria-hidden="true"
    />
  </Button>
</template>
