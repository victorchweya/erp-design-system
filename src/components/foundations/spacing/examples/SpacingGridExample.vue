<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    <Card v-for="produce in ['Kale', 'Carrot', 'Lime']" :key="produce" class="min-w-0">
      <template #title
        ><h3>{{ produce }}</h3></template
      >
      <template #content><p class="text-sm text-muted">Fresh from the farm</p></template>
    </Card>
  </div>
</template>
