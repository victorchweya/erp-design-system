<script setup lang="ts">
import Clock from '@primeicons/vue/clock'
import Truck from '@primeicons/vue/truck'
</script>

<template>
  <div class="flex flex-col gap-3">
    <Message severity="warn">
      <template #icon><Clock aria-hidden="true" /></template>
      This purchase order is due for approval today.
    </Message>
    <Message severity="info">
      <template #icon><Truck aria-hidden="true" /></template>
      Delivery is scheduled for tomorrow morning.
    </Message>
  </div>
</template>
