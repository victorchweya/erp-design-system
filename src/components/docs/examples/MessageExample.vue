<script setup lang="ts">
import InfoCircle from '@primeicons/vue/info-circle'
</script>

<template>
  <Message severity="info">
    <template #icon="{ class: iconClass }">
      <InfoCircle :class="iconClass" aria-hidden="true" />
    </template>
    Orders placed before noon are reviewed today.
  </Message>
</template>
