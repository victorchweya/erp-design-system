<script setup lang="ts">
import InfoCircle from '@primeicons/vue/info-circle'
</script>

<template>
  <div class="flex flex-col items-start gap-3">
    <Message severity="info" size="small">
      <template #icon="{ class: iconClass }">
        <InfoCircle :class="iconClass" aria-hidden="true" />
      </template>
      Small message
    </Message>
    <Message severity="info">
      <template #icon="{ class: iconClass }">
        <InfoCircle :class="iconClass" aria-hidden="true" />
      </template>
      Default message
    </Message>
    <Message severity="info" size="large">
      <template #icon="{ class: iconClass }">
        <InfoCircle :class="iconClass" aria-hidden="true" />
      </template>
      Large message
    </Message>
  </div>
</template>
