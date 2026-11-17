<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const items = computed(() => {
  const labels = route.meta.breadcrumb ?? []
  return labels.map((label, index) => ({ label, current: index === labels.length - 1 }))
})
</script>

<template>
  <Breadcrumb
    :model="items"
    aria-label="Breadcrumb"
    class="min-w-0 text-sm text-muted-color"
    :dt="{ root: { background: 'transparent', padding: '0' } }"
  >
    <template #item="{ item }">
      <span class="whitespace-nowrap font-medium" :aria-current="item.current ? 'page' : undefined">
        {{ item.label }}
      </span>
    </template>
    <template #separator><span aria-hidden="true">/</span></template>
  </Breadcrumb>
</template>
