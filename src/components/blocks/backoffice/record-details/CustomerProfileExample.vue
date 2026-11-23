<script setup lang="ts">
import RecordDetailsBlock, {
  type RecordCreditSummary,
  type RecordDetailSection,
} from './RecordDetailsBlock.vue'

withDefaults(defineProps<{ headingTag?: 'h1' | 'h2' | 'h3' }>(), { headingTag: 'h3' })

const sections: RecordDetailSection[] = [
  {
    id: 'account',
    title: 'Account',
    items: [
      { key: 'code', label: 'Customer code', value: 'FTF-C-0231', copyable: true },
      { key: 'type', label: 'Customer type', value: 'Restaurant group' },
      { key: 'terms', label: 'Payment terms', value: '14 days' },
      { key: 'pin', label: 'KRA PIN', value: 'P051234567K', copyable: true },
      { key: 'since', label: 'Customer since', value: '2024-03-12', kind: 'date' },
      { key: 'orders', label: 'Orders this year', value: 148, kind: 'number' },
    ],
  },
  {
    id: 'contacts',
    title: 'Contacts',
    items: [
      { key: 'contact', label: 'Primary contact', value: 'Wanjiru Kamau' },
      {
        key: 'phone',
        label: 'Phone',
        value: '0722 410 318',
        kind: 'link',
        href: 'tel:+254722410318',
      },
      {
        key: 'email',
        label: 'Email',
        value: 'orders@greenbasket.co.ke',
        kind: 'link',
        href: 'mailto:orders@greenbasket.co.ke',
      },
      { key: 'accounts', label: 'Accounts contact', value: null },
    ],
  },
  {
    id: 'addresses',
    title: 'Addresses',
    items: [
      {
        key: 'billing',
        label: 'Billing address',
        value: 'Rhapta Road, Westlands, Nairobi',
        wide: true,
      },
      {
        key: 'delivery',
        label: 'Delivery address',
        value: 'Loading bay B, 14 Market Road, Industrial Area, Nairobi',
        wide: true,
      },
      { key: 'notes', label: 'Delivery notes', value: '', wide: true },
    ],
  },
]

const credit: RecordCreditSummary = { limit: 500000, used: 312500 }
</script>

<template>
  <RecordDetailsBlock
    title="Green Basket Kitchen"
    :heading-tag="headingTag"
    subtitle="FTF-C-0231 · Westlands, Nairobi"
    initials="GB"
    owner="Wanjiru Mwangi"
    updated-by="Peter Otieno"
    updated-at="2026-11-18T11:30:00Z"
    :sections="sections"
    :credit="credit"
  >
    <template #tags>
      <Tag>Active</Tag>
      <Tag severity="secondary">High priority</Tag>
    </template>
    <template #actions>
      <Button type="button" size="small" severity="secondary" outlined>Edit customer</Button>
    </template>
  </RecordDetailsBlock>
</template>
