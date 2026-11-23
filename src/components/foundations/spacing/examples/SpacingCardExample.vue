<script setup lang="ts">
import Pencil from '@primeicons/vue/pencil'
</script>

<template>
  <Card>
    <template #title><h3>Order summary</h3></template>
    <template #content>
      <p class="text-sm text-muted">Review quantities before confirming your order.</p>
    </template>
    <template #footer>
      <div class="flex flex-wrap gap-2">
        <Button type="button" size="small" severity="primary" outlined><Pencil aria-hidden="true" />Edit order</Button>
        <Button type="button" size="small">Confirm order</Button>
      </div>
    </template>
  </Card>
</template>
