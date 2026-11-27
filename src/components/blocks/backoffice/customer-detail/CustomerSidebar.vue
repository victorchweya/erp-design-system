<script setup lang="ts">
import { DISPLAY_PLACEHOLDER, formatCurrency } from '@/utils/format'

interface Detail {
  label: string
  value: string
  href?: string
}

const businessDetails: Detail[] = [
  { label: 'Category', value: 'Hotel / Restaurant' },
  { label: 'Customer group', value: DISPLAY_PLACEHOLDER },
  { label: 'Parent organisation', value: 'Independent' },
  { label: 'Onboarded by', value: DISPLAY_PLACEHOLDER },
  { label: 'Account manager', value: DISPLAY_PLACEHOLDER },
  { label: 'Customer profile', value: DISPLAY_PLACEHOLDER },
]

const contactDetails: Detail[] = [
  { label: 'Primary contact', value: 'Yves Kangoye' },
  { label: 'Primary phone', value: '0790 619 078', href: 'tel:+254790619078' },
  {
    label: 'Primary email',
    value: 'kangoyeyves@yahoo.com',
    href: 'mailto:kangoyeyves@yahoo.com',
  },
  { label: 'Secondary contact', value: 'Yves Kangoye' },
  { label: 'Designation', value: 'Operations Manager' },
  { label: 'Secondary phone', value: '0790 619 078', href: 'tel:+254790619078' },
  {
    label: 'Secondary email',
    value: 'kangoyeyves@yahoo.com',
    href: 'mailto:kangoyeyves@yahoo.com',
  },
]

const billingDetails: Detail[] = [
  { label: 'Billing name', value: 'AFRITOPIA LIMITED' },
  { label: 'Billing address', value: '624-00621, 0000, Nairobi' },
  { label: 'KRA PIN', value: 'P051529912I' },
  { label: 'Payment types', value: 'Cash on Delivery, Credit' },
  { label: 'Invoice due', value: '30 days' },
]

const creditDetails: Detail[] = [
  { label: 'Available credit', value: DISPLAY_PLACEHOLDER },
  { label: 'Used credit', value: formatCurrency(1196) },
  { label: 'Approved limit', value: 'No approved limit' },
]
</script>

<template>
  <aside class="min-w-0" aria-label="Customer information">
    <Card>
      <template #content>
        <div class="flex flex-col gap-6">
          <section class="flex flex-col gap-4" aria-labelledby="customer-business-title">
            <h2 id="customer-business-title" class="text-base font-medium">Business details</h2>
            <dl class="flex flex-col gap-3 text-sm">
              <div
                v-for="detail in businessDetails"
                :key="detail.label"
                class="flex items-start justify-between gap-4"
              >
                <dt class="text-muted">{{ detail.label }}</dt>
                <dd class="max-w-48 wrap-break-word text-right font-medium">{{ detail.value }}</dd>
              </div>
            </dl>
          </section>

          <section
            class="flex flex-col gap-4 border-t border-surface pt-6"
            aria-labelledby="customer-contact-title"
          >
            <h2 id="customer-contact-title" class="text-base font-medium">Contact details</h2>
            <dl class="flex flex-col gap-3 text-sm">
              <div
                v-for="detail in contactDetails"
                :key="detail.label"
                class="flex items-start justify-between gap-4"
              >
                <dt class="text-muted">{{ detail.label }}</dt>
                <dd class="max-w-48 wrap-break-word text-right font-medium">
                  <a v-if="detail.href" :href="detail.href" class="text-primary hover:underline">{{
                    detail.value
                  }}</a>
                  <template v-else>{{ detail.value }}</template>
                </dd>
              </div>
            </dl>
          </section>

          <section
            class="flex flex-col gap-4 border-t border-surface pt-6"
            aria-labelledby="customer-billing-title"
          >
            <h2 id="customer-billing-title" class="text-base font-medium">Billing details</h2>
            <dl class="flex flex-col gap-3 text-sm">
              <div
                v-for="detail in billingDetails"
                :key="detail.label"
                class="flex items-start justify-between gap-4"
              >
                <dt class="text-muted">{{ detail.label }}</dt>
                <dd class="max-w-48 wrap-break-word text-right font-medium">{{ detail.value }}</dd>
              </div>
            </dl>
          </section>

          <section
            class="flex flex-col gap-4 border-t border-surface pt-6"
            aria-labelledby="customer-credit-title"
          >
            <h2 id="customer-credit-title" class="text-base font-medium">Credit</h2>
            <dl class="flex flex-col gap-3 text-sm">
              <div
                v-for="detail in creditDetails"
                :key="detail.label"
                class="flex items-start justify-between gap-4"
              >
                <dt class="text-muted">{{ detail.label }}</dt>
                <dd class="max-w-48 wrap-break-word text-right font-medium tabular-nums">
                  {{ detail.value }}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </template>
    </Card>
  </aside>
</template>
