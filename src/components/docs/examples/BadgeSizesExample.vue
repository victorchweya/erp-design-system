<script setup lang="ts">
import Bell from '@primeicons/vue/bell'
</script>

<template>
  <div class="flex flex-wrap items-center gap-6">
    <Badge value="2" size="small" aria-label="2 items" /><Badge value="8" aria-label="8 items" />
    <Badge value="12" size="large" aria-label="12 items" /><Badge
      value="99+"
      size="xlarge"
      aria-label="More than 99 items"
    />
    <Button type="button" severity="secondary" outlined aria-label="Notifications, 3 unread">
      <Bell aria-hidden="true" /><span>Notifications</span><Badge value="3" aria-hidden="true" />
    </Button>
  </div>
</template>
