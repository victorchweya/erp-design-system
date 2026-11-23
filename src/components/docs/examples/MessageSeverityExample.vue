<script setup lang="ts">
import TimesCircle from '@primeicons/vue/times-circle'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import InfoCircle from '@primeicons/vue/info-circle'
import CheckCircle from '@primeicons/vue/check-circle'
</script>

<template>
  <div class="flex flex-col gap-3">
    <Message severity="success">
      <template #icon="{ class: iconClass }">
        <CheckCircle :class="iconClass" aria-hidden="true" />
      </template>
      The purchase order is ready.
    </Message>
    <Message severity="info">
      <template #icon="{ class: iconClass }">
        <InfoCircle :class="iconClass" aria-hidden="true" />
      </template>
      Supplier prices were updated this morning.
    </Message>
    <Message severity="warn">
      <template #icon="{ class: iconClass }">
        <ExclamationTriangle :class="iconClass" aria-hidden="true" />
      </template>
      Review the available stock before confirming.
    </Message>
    <Message severity="error">
      <template #icon="{ class: iconClass }">
        <TimesCircle :class="iconClass" aria-hidden="true" />
      </template>
      The order could not be submitted.
    </Message>
    <Message severity="secondary">The stock count is still processing.</Message>
    <Message severity="contrast">You are working offline.</Message>
  </div>
</template>
