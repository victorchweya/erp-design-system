<script setup lang="ts">
import { shallowRef } from 'vue'
import Building from '@primeicons/vue/building'
import Pencil from '@primeicons/vue/pencil'
import CustomerOrdersTable from './CustomerOrdersTable.vue'
import CustomerSidebar from './CustomerSidebar.vue'
import RecordDetailHeaderBlock from '@/components/blocks/headers/RecordDetailHeaderBlock.vue'

const activeTab = shallowRef('orders')
const feedback = shallowRef('')

function selectAction(message: string) {
  feedback.value = message
}
</script>

<template>
  <section
    class="customer-detail flex min-w-0 flex-col gap-6 text-color"
    aria-labelledby="customer-title"
  >
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">
      {{ feedback }}
    </p>

    <RecordDetailHeaderBlock
      title="AFRITOPIA LIMITED (Roco Mama)"
      title-id="customer-title"
      heading-tag="h1"
      back-label="Back to customers"
      @back="selectAction('Back to customers selected in this preview.')"
    >
      <template #status><Tag severity="success">Active</Tag></template>
      <template #actions>
        <Button
          type="button"
          severity="primary"
          outlined
          size="small"
          @click="selectAction('Manage organisation selected in this preview.')"
        >
          <Building aria-hidden="true" />Manage organisation
        </Button>
        <Button
          type="button"
          size="small"
          @click="selectAction('Edit customer selected in this preview.')"
        >
          <Pencil aria-hidden="true" />Edit customer
        </Button>
      </template>
    </RecordDetailHeaderBlock>

    <div class="customer-detail-layout grid min-w-0 items-start gap-4">
      <CustomerSidebar />

      <main class="min-w-0">
        <Tabs v-model:value="activeTab" scrollable lazy>
          <TabList aria-label="Customer related information">
            <Tab value="orders">Orders</Tab>
            <Tab value="invoices">Invoices</Tab>
            <Tab value="addresses">Delivery addresses</Tab>
            <Tab value="users">Users</Tab>
            <Tab value="feedback">Feedback</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="orders"><CustomerOrdersTable /></TabPanel>
            <TabPanel value="invoices">
              <section
                class="rounded-lg border border-surface p-6"
                aria-labelledby="invoices-title"
              >
                <h2 id="invoices-title" class="text-lg font-medium">Invoices</h2>
                <p class="mt-2 text-sm text-muted">No invoices are available in this preview.</p>
              </section>
            </TabPanel>
            <TabPanel value="addresses">
              <section
                class="rounded-lg border border-surface p-6"
                aria-labelledby="addresses-title"
              >
                <h2 id="addresses-title" class="text-lg font-medium">Delivery addresses</h2>
                <dl class="mt-4 grid gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <dt class="text-muted">Spurs Two Rivers Mall</dt>
                    <dd class="mt-1 font-medium">Two Rivers, Limuru Road, Nairobi</dd>
                  </div>
                  <div>
                    <dt class="text-muted">Roco Mama Village Market</dt>
                    <dd class="mt-1 font-medium">Village Market, Gigiri, Nairobi</dd>
                  </div>
                </dl>
              </section>
            </TabPanel>
            <TabPanel value="users">
              <section class="rounded-lg border border-surface p-6" aria-labelledby="users-title">
                <h2 id="users-title" class="text-lg font-medium">Users</h2>
                <p class="mt-2 text-sm text-muted">Yves Kangoye · Operations Manager</p>
              </section>
            </TabPanel>
            <TabPanel value="feedback">
              <section
                class="rounded-lg border border-surface p-6"
                aria-labelledby="feedback-title"
              >
                <h2 id="feedback-title" class="text-lg font-medium">Feedback</h2>
                <p class="mt-2 text-sm text-muted">No customer feedback has been recorded.</p>
              </section>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </main>
    </div>
  </section>
</template>

<style scoped>
.customer-detail {
  container-type: inline-size;
}

@container (min-width: 56rem) {
  .customer-detail-layout {
    grid-template-columns: minmax(17rem, 0.72fr) minmax(0, 2.28fr);
  }
}
</style>
