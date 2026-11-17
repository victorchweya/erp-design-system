<script setup lang="ts">
import { shallowRef } from 'vue'
import Check from '@primeicons/vue/check'
import Search from '@primeicons/vue/search'
import User from '@primeicons/vue/user'

const clicks = shallowRef(0)
</script>

<template>
  <Card
    class="h-full shadow-none ring-1 ring-surface-200 dark:ring-surface-800"
    role="region"
    aria-labelledby="buttons-heading"
  >
    <template #title>
      <h2 id="buttons-heading" class="text-balance text-xl font-semibold">Buttons & feedback</h2>
    </template>
    <template #subtitle>Compare emphasis, disabled states, and status colors.</template>
    <template #content>
      <div class="flex flex-col gap-7 pt-4">
        <div class="flex flex-col gap-3">
          <h3 class="text-base font-medium sm:text-sm">Variants</h3>
          <div class="flex flex-wrap gap-3">
            <Button type="button" size="small" @click="clicks++">
              <Check :size="16" class="shrink-0" aria-hidden="true" />
              Primary
            </Button>
            <Button type="button" size="small" severity="secondary">
              <User :size="16" class="shrink-0" aria-hidden="true" />
              Secondary
            </Button>
            <Button type="button" size="small" outlined>
              <Search :size="16" class="shrink-0" aria-hidden="true" />
              Outlined
            </Button>
            <Button type="button" size="small" text>Text</Button>
          </div>
          <p class="text-base text-muted-color tabular-nums sm:text-sm" role="status">
            Primary clicks: {{ clicks }}
          </p>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-base font-medium sm:text-sm">States</h3>
          <div class="flex flex-wrap gap-3">
            <Button type="button" size="small" severity="danger" outlined>Danger</Button>
            <Button type="button" size="small" severity="secondary" disabled>Disabled</Button>
          </div>
        </div>

        <div class="flex flex-col gap-3">
          <h3 class="text-base font-medium sm:text-sm">Status tags</h3>
          <div class="flex flex-wrap gap-2">
            <Tag value="Active" severity="success" />
            <Tag value="Pending" severity="warn" />
            <Tag value="Inactive" severity="secondary" />
          </div>
        </div>

        <Message severity="info">Try the primary button to check its click state.</Message>
      </div>
    </template>
  </Card>
</template>
