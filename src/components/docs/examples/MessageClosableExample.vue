<script setup lang="ts">
import InfoCircle from '@primeicons/vue/info-circle'
</script>

<template>
  <Message severity="info" closable :closeButtonProps="{ 'aria-label': 'Dismiss supplier update' }">
    <template #icon="{ class: iconClass }">
      <InfoCircle :class="iconClass" aria-hidden="true" />
    </template>
    Supplier details were updated.
  </Message>
</template>
