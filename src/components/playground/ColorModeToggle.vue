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
    variant="text"
    severity="secondary"
    size="small"
    :aria-label="colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    :title="colorMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="colorMode = colorMode === 'dark' ? 'light' : 'dark'"
  >
    <Sun v-if="colorMode === 'dark'" :size="18" aria-hidden="true" />
    <Moon v-else :size="18" aria-hidden="true" />
  </Button>
</template>
