<script setup lang="ts">
import type { OrganizationChartNode } from 'primevue/organizationchart'

const teams: OrganizationChartNode[] = [
  {
    key: 'ops',
    label: 'Head of operations',
    data: { name: 'Grace Wanjiru' },
    children: [
      {
        key: 'sourcing',
        label: 'Sourcing lead',
        data: { name: 'Peter Otieno' },
        children: [
          { key: 'buyer-1', label: 'Buyer, vegetables', data: { name: 'Amina Hassan' } },
          { key: 'buyer-2', label: 'Buyer, fruit', data: { name: 'John Kamau' } },
        ],
      },
      {
        key: 'warehouse',
        label: 'Warehouse manager',
        data: { name: 'Mercy Achieng' },
        children: [
          { key: 'shift-1', label: 'Day shift supervisor', data: { name: 'Brian Mutua' } },
          { key: 'shift-2', label: 'Night shift supervisor', data: { name: 'Faith Njeri' } },
        ],
      },
      {
        key: 'logistics',
        label: 'Logistics lead',
        data: { name: 'Samuel Kiprop' },
      },
    ],
  },
]
</script>

<template>
  <div class="overflow-x-auto">
    <OrganizationChart :value="teams" collapsible aria-label="Operations reporting lines">
      <template #default="{ node }">
        <div class="flex flex-col text-left">
          <span class="font-medium">{{ node.data.name }}</span>
          <span class="text-muted-color">{{ node.label }}</span>
        </div>
      </template>
    </OrganizationChart>
  </div>
</template>
