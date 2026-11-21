<script setup lang="ts">
import { shallowRef } from 'vue'
const active = shallowRef('overview')
</script>

<template>
  <Card>
    <template #title><h3 class="text-xl font-medium">Order FTF-1042</h3></template>
    <template #subtitle>Switch between related details without leaving the order.</template>
    <template #content>
      <Tabs v-model:value="active">
        <TabList aria-label="Order details">
          <Tab value="overview">Overview</Tab>
          <Tab value="items">Items</Tab>
          <Tab value="activity">Activity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="overview">
            <dl class="grid gap-4 text-sm sm:grid-cols-2">
              <div class="space-y-1">
                <dt class="text-muted">Customer</dt>
                <dd>Green Basket</dd>
              </div>
              <div class="space-y-1">
                <dt class="text-muted">Status</dt>
                <dd><Tag class="bg-primary text-primary-contrast">Confirmed</Tag></dd>
              </div>
            </dl>
          </TabPanel>
          <TabPanel value="items"
            ><ul class="list-inside list-disc space-y-2 text-sm">
              <li>Kale · 20 kg</li>
              <li>Carrots · 15 kg</li>
            </ul></TabPanel
          >
          <TabPanel value="activity"
            ><p class="text-sm text-muted">
              Order confirmed by Amina. Delivery scheduled for Friday.
            </p></TabPanel
          >
        </TabPanels>
      </Tabs>
    </template>
  </Card>
</template>
