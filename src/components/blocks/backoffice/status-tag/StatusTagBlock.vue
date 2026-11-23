<script setup lang="ts">
import { computed } from 'vue'
import { resolveStatus, type StatusDomainName } from './status-registry'

// Goal: read a record's state at a glance, and read it the same way on every screen.

/**
 * Renders a status from the shared registry as a default PrimeVue Tag.
 * The label is always visible text, so status is never conveyed by colour alone.
 * Inside a table cell the visible text is the accessible name, and the column header gives context.
 */
const props = defineProps<{
  /** Registry domain, for example "order" or "payment". */
  domain: StatusDomainName
  /** Raw value from the API. Unknown values show a humanised label. */
  status: string | null | undefined
}>()

const resolved = computed(() => resolveStatus(props.domain, props.status))
const hasStatus = computed(() => String(props.status ?? '').trim() !== '')
const showIcon = computed(() => Boolean(resolved.value.icon))
</script>

<template>
  <Tag
    v-if="hasStatus"
    :value="resolved.label"
    :severity="resolved.severity === 'primary' ? undefined : resolved.severity"
    class="whitespace-nowrap"
  >
    <template v-if="showIcon" #icon>
      <component :is="resolved.icon" aria-hidden="true" />
    </template>
  </Tag>
  <span v-else class="text-muted">{{ resolved.label }}</span>
</template>
