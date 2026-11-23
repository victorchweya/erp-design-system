<script setup lang="ts">
import { computed } from 'vue'
import StatusTagBlock from './StatusTagBlock.vue'
import { builtInStatusDomains, statusDomainNotes, statusRegistry } from './status-registry'

// One dense reference: domains flow into two columns on wide screens, never split mid-list.
const domains = computed(() =>
  builtInStatusDomains.map((domain) => ({
    domain,
    note: statusDomainNotes[domain]!,
    rows: Object.entries(statusRegistry[domain] ?? {}).map(([status, definition]) => ({
      status,
      meaning: definition.meaning,
      severity: definition.severity,
    })),
  })),
)
</script>

<template>
  <div class="gap-x-10 lg:columns-2">
    <div v-for="{ domain, note, rows } in domains" :key="domain" class="mb-5 break-inside-avoid">
      <h3 class="flex items-baseline gap-2 text-sm font-medium">
        {{ note.title }}
        <code class="font-normal text-muted">{{ domain }}</code>
      </h3>
      <p class="mb-1 text-muted">{{ note.usage }}</p>
      <dl class="grid grid-cols-[max-content_1fr] gap-x-3 text-sm">
        <div
          v-for="row in rows"
          :key="row.status"
          class="col-span-2 grid grid-cols-subgrid items-center border-t border-surface py-1"
        >
          <dt class="flex items-center gap-2">
            <StatusTagBlock :domain="domain" :status="row.status" />
            <span class="text-muted">{{ row.severity }}</span>
          </dt>
          <dd class="text-muted">{{ row.meaning }}</dd>
        </div>
      </dl>
    </div>
  </div>
</template>
