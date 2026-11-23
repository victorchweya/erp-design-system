<script setup lang="ts">
import { shallowRef, useId, useTemplateRef } from 'vue'
import type Menu from 'primevue/menu'
import ArrowLeft from '@primeicons/vue/arrow-left'
import EllipsisV from '@primeicons/vue/ellipsis-v'
import Pencil from '@primeicons/vue/pencil'
import RecordDetailHeaderBlock from './RecordDetailHeaderBlock.vue'

withDefaults(defineProps<{ headingTag?: 'h1' | 'h2' | 'h3' }>(), { headingTag: 'h2' })
const menu = useTemplateRef<InstanceType<typeof Menu>>('menu')
const menuId = useId()
const menuOpen = shallowRef(false)
const feedback = shallowRef('')
const items = [
  {
    label: 'Duplicate order',
    command: () => (feedback.value = 'Duplicate selected in this preview.'),
  },
  {
    label: 'Download invoice',
    command: () => (feedback.value = 'Download invoice selected in this preview.'),
  },
]
</script>

<template>
  <div class="flex flex-col gap-4 text-color">
    <RecordDetailHeaderBlock
      title="Order FTF-1042"
      :heading-tag="headingTag"
      back-label="Back to orders"
      :show-back="false"
    >
      <template #status><Tag severity="success">Confirmed</Tag></template>
      <template #metadata>
        <dl class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div class="flex flex-wrap gap-x-2">
            <dt class="text-muted">Customer:</dt>
            <dd>Green Basket</dd>
          </div>
          <div class="flex flex-wrap gap-x-2">
            <dt class="text-muted">Delivery:</dt>
            <dd><time datetime="2026-11-20">20 Nov 2026</time></dd>
          </div>
          <div class="flex flex-wrap gap-x-2">
            <dt class="text-muted">Items:</dt>
            <dd>12</dd>
          </div>
          <div class="flex flex-wrap gap-x-2">
            <dt class="text-muted">Last updated by:</dt>
            <dd>Amina Hassan</dd>
          </div>
        </dl>
      </template>
      <template #actions>
        <Button type="button" @click="feedback = 'Edit order selected in this preview.'">
          <Pencil aria-hidden="true" />
          Edit order
        </Button>
        <Button
          type="button"
          severity="primary"
          outlined
          iconOnly
          aria-label="More order actions"
          aria-haspopup="menu"
          :aria-controls="menuId"
          :aria-expanded="menuOpen"
          @click="menu?.toggle($event)"
        >
          <EllipsisV aria-hidden="true" />
        </Button>
        <Button
          v-tooltip.bottom="'Back to orders'"
          type="button"
          severity="primary"
          outlined
          iconOnly
          aria-label="Back to orders"
          @click="feedback = 'Back to orders selected in this preview.'"
        >
          <ArrowLeft aria-hidden="true" />
        </Button>
        <Menu
          :id="menuId"
          ref="menu"
          :model="items"
          popup
          @show="menuOpen = true"
          @hide="menuOpen = false"
        />
      </template>
    </RecordDetailHeaderBlock>
    <p role="status" class="text-sm text-muted" :class="{ 'sr-only': !feedback }">{{ feedback }}</p>
  </div>
</template>
