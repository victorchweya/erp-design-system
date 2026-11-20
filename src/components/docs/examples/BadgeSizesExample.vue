<script setup lang="ts">
import Bell from '@primeicons/vue/bell'
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap items-center gap-6">
      <span class="flex items-center gap-2">Small <Badge value="2" size="small" /></span>
      <span class="flex items-center gap-2">Default <Badge value="8" /></span>
      <span class="flex items-center gap-2">Large <Badge value="12" size="large" /></span>
      <span class="flex items-center gap-2">Extra large <Badge value="99+" size="xlarge" /></span>
    </div>
    <Button
      type="button"
      severity="secondary"
      outlined
      class="self-start"
      aria-label="Notifications, 3 unread"
    >
      <Bell aria-hidden="true" focusable="false" /><span>Notifications</span
      ><Badge value="3" aria-hidden="true" />
    </Button>
  </div>
</template>
