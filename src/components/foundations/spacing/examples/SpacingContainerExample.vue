<template>
  <div class="mx-auto w-full max-w-8xl px-4">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <Card class="min-w-0 lg:col-span-8">
        <template #title><h3>Order details</h3></template>
        <template #content>
          <p class="text-sm text-muted">Review the produce in your order.</p>
        </template>
      </Card>
      <Card class="min-w-0 lg:col-span-4">
        <template #title><h3>Delivery</h3></template>
        <template #content>
          <p class="text-sm text-muted">Choose where your order goes.</p>
        </template>
      </Card>
    </div>
  </div>
</template>
