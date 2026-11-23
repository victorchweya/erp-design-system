<script setup lang="ts">
import { nextTick, shallowRef, useId, useTemplateRef } from 'vue'
import DecisionDialogBlock from './DecisionDialogBlock.vue'
import DecisionStamp from './DecisionStamp.vue'
import { decisionKinds, decisionTitle, type DecisionKind, type DecisionRecord } from './decision-dialog'

defineProps<{
  kind: DecisionKind
  subject: string
  record: DecisionRecord
  /** Who decides in this preview. */
  actor?: string
}>()

interface Stamp {
  at: string
  reason: string
}

const id = useId()
const visible = shallowRef(false)
const busy = shallowRef(false)
const stamp = shallowRef<Stamp | null>(null)
const trigger = useTemplateRef<{ $el: HTMLElement }>('trigger')
const reset = useTemplateRef<{ $el: HTMLElement }>('reset')

// Replace with your API call. The dialog stays open and shows its busy state until it settles.
function confirm(reason: string) {
  busy.value = true
  setTimeout(() => {
    stamp.value = { at: new Date().toISOString(), reason }
    busy.value = false
    visible.value = false
    // The trigger is replaced by the stamp, so hand focus to the next control.
    nextTick(() => reset.value?.$el.focus())
  }, 800)
}

function undo() {
  stamp.value = null
  nextTick(() => trigger.value?.$el.focus())
}
</script>

<template>
  <div class="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
    <DecisionStamp
      v-if="stamp"
      :kind="kind"
      :by="actor ?? 'Wanjiku M.'"
      :at="stamp.at"
      :reason="stamp.reason"
    />
    <Button
      v-if="!stamp"
      ref="trigger"
      type="button"
      size="small"
      :severity="decisionKinds[kind].destructive ? 'danger' : 'primary'"
      :outlined="kind !== 'approve'"
      aria-haspopup="dialog"
      :aria-controls="id"
      :aria-expanded="visible"
      @click="visible = true"
      >{{ decisionTitle(kind, subject) }}</Button
    >
    <Button v-else ref="reset" type="button" size="small" severity="secondary" text @click="undo"
      >Reset preview</Button
    >
    <DecisionDialogBlock
      :id="id"
      v-model:visible="visible"
      :kind="kind"
      :subject="subject"
      :record="record"
      :busy="busy"
      @confirm="confirm"
    />
  </div>
</template>
