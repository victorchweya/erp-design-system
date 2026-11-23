<script setup lang="ts">
import InfoCircle from '@primeicons/vue/info-circle'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
</script>

<template>
  <div class="flex flex-col gap-3">
    <Message severity="warn">
      <template #icon="{ class: iconClass }">
        <ExclamationTriangle :class="iconClass" aria-hidden="true" />
      </template>
      This purchase order is due for approval today.
    </Message>
    <Message severity="info">
      <template #icon="{ class: iconClass }">
        <InfoCircle :class="iconClass" aria-hidden="true" />
      </template>
      Delivery is scheduled for tomorrow morning.
    </Message>
  </div>
</template>
