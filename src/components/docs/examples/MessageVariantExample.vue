<script setup lang="ts">
import TimesCircle from '@primeicons/vue/times-circle'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import InfoCircle from '@primeicons/vue/info-circle'
import CheckCircle from '@primeicons/vue/check-circle'
</script>

<template>
  <div class="grid gap-6 md:grid-cols-2">
    <div class="flex flex-col gap-3">
      <h3 class="font-medium">Outlined</h3>
      <Message severity="success" variant="outlined">
        <template #icon="{ class: iconClass }">
          <CheckCircle :class="iconClass" aria-hidden="true" />
        </template>
        Stock was reconciled.
      </Message>
      <Message severity="info" variant="outlined">
        <template #icon="{ class: iconClass }">
          <InfoCircle :class="iconClass" aria-hidden="true" />
        </template>
        A new price list is available.
      </Message>
      <Message severity="warn" variant="outlined">
        <template #icon="{ class: iconClass }">
          <ExclamationTriangle :class="iconClass" aria-hidden="true" />
        </template>
        Two items need review.
      </Message>
      <Message severity="error" variant="outlined">
        <template #icon="{ class: iconClass }">
          <TimesCircle :class="iconClass" aria-hidden="true" />
        </template>
        The import contains errors.
      </Message>
    </div>
    <div class="flex flex-col gap-3">
      <h3 class="font-medium">Simple</h3>
      <Message severity="success" variant="simple">Stock was reconciled.</Message>
      <Message severity="info" variant="simple">A new price list is available.</Message>
      <Message severity="warn" variant="simple">Two items need review.</Message>
      <Message severity="error" variant="simple">The import contains errors.</Message>
    </div>
  </div>
</template>
