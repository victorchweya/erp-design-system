<script setup lang="ts">
const orders = ['PO-2318', 'PO-2317', 'PO-2316', 'PO-2315']
</script>

<template>
  <Splitter class="h-64" :pt="{ gutter: { 'aria-label': 'Resize order list' } }">
    <SplitterPanel :size="35" :minSize="20" class="overflow-auto">
      <ul class="flex flex-col gap-2 p-4" aria-label="Purchase orders">
        <li v-for="order in orders" :key="order">{{ order }}</li>
      </ul>
    </SplitterPanel>
    <SplitterPanel :size="65" :minSize="30" class="overflow-auto">
      <div class="flex flex-col gap-2 p-4">
        <h3 class="font-medium">PO-2318</h3>
        <p class="text-muted-color">Kiambu Fresh Growers · KES 18,400 · awaiting approval</p>
      </div>
    </SplitterPanel>
  </Splitter>
</template>
