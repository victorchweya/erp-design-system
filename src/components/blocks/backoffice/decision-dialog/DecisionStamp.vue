<script setup lang="ts">
import { formatDateTime } from '@/utils/format'
import { decisionKinds, type DecisionKind } from './decision-dialog'

defineProps<{
  kind: DecisionKind
  /** Who decided, for example Wanjiku M. */
  by: string
  /** When they decided, as an ISO date and time. */
  at: string
  /** The reason or note saved with the decision. */
  reason?: string
}>()
</script>

<template>
  <div class="flex min-w-0 items-start gap-1.5 text-sm">
    <component :is="decisionKinds[kind].icon" class="mt-0.5 size-4 shrink-0" aria-hidden="true" />
    <div class="min-w-0">
      <p>
        <span class="font-medium">{{ decisionKinds[kind].past }}</span> by {{ by }}
        <span aria-hidden="true">·</span>
        <time :datetime="at" class="text-muted">{{ formatDateTime(at) }}</time>
      </p>
      <p v-if="reason" class="whitespace-pre-line text-muted">
        <span class="sr-only">{{ decisionKinds[kind].stampLabel }}: </span>{{ reason }}
      </p>
    </div>
  </div>
</template>
