<script setup lang="ts">
import { shallowRef } from 'vue'

const active = shallowRef('overview')
const tabs = [
  { value: 'overview', label: 'Overview', content: 'Key supplier information and current status.' },
  { value: 'contacts', label: 'Contacts', content: 'People and communication details.' },
  { value: 'orders', label: 'Orders', content: 'Recent and active supplier orders.' },
  { value: 'products', label: 'Products', content: 'Products available from this supplier.' },
  {
    value: 'documents',
    label: 'Documents',
    content: 'Contracts, certificates, and supporting files.',
  },
  { value: 'activity', label: 'Activity', content: 'Recent changes and recorded events.' },
]
</script>

<template>
  <div class="max-w-lg">
    <Tabs v-model:value="active" scrollable>
      <TabList aria-label="Supplier details">
        <Tab v-for="tab in tabs" :key="tab.value" :value="tab.value">{{ tab.label }}</Tab>
      </TabList>
      <TabPanels>
        <TabPanel v-for="tab in tabs" :key="tab.value" :value="tab.value">
          <p class="text-sm text-muted">{{ tab.content }}</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  </div>
</template>
