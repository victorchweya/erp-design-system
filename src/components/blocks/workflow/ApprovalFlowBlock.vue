<script setup lang="ts">
import { computed, nextTick, ref, shallowRef, useId, useTemplateRef } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { useConfirm } from 'primevue/useconfirm'
import Check from '@primeicons/vue/check'
import Clock from '@primeicons/vue/clock'
import Times from '@primeicons/vue/times'
import Circle from '@primeicons/vue/circle'
import CheckCircle from '@primeicons/vue/check-circle'
import { formatCurrency } from '@/utils/format'
import ApprovalHistory from './ApprovalHistory.vue'
import ApprovalReasonDialog from './ApprovalReasonDialog.vue'
import {
  initialHistory,
  people,
  request,
  roleOptions,
  stageApprover,
  stageStatus,
  type ApprovalRole,
  type ApprovalStage,
  type HistoryEntry,
  type ReasonMode,
  type StepState,
} from './approval-flow'

const id = useId()
const confirm = useConfirm()
const wide = useMediaQuery('(min-width: 640px)')
const statusHeading = useTemplateRef<HTMLElement>('statusHeading')

const viewer = shallowRef<ApprovalRole>('manager')
const stage = shallowRef<ApprovalStage>('manager')
const rejectedAt = shallowRef<'manager' | 'finance'>('manager')
const history = ref<HistoryEntry[]>(initialHistory())
const announcement = shallowRef('')
const reasonMode = shallowRef<ReasonMode>('reject')
const reasonVisible = shallowRef(false)
let focusAfterDialog = false

const status = computed(() => stageStatus[stage.value])
const approver = computed(() => stageApprover[stage.value])
const isFinal = computed(() => approver.value === null)
const canAct = computed(() => approver.value === viewer.value)
const isReviewStage = computed(() => stage.value === 'manager' || stage.value === 'finance')
const blockedReason = computed(() => {
  if (!approver.value || canAct.value) return ''
  const person = people[approver.value]
  return `Only ${person.name} (${person.title.toLowerCase()}) can act at this step. Switch “View as” to preview their actions.`
})

const stateText: Record<StepState, string> = {
  done: 'Completed',
  current: 'In progress',
  upcoming: 'Not started',
  rejected: 'Rejected',
}
const markerClass: Record<StepState, string> = {
  done: 'bg-success text-success-contrast',
  current: 'bg-warn text-warn-contrast',
  upcoming: 'border border-surface text-muted',
  rejected: 'bg-danger text-danger-contrast',
}
const markerIcon = { done: Check, current: Clock, upcoming: Circle, rejected: Times }

const steps = computed(() => {
  const s = stage.value
  const rejectedHere = (step: 'manager' | 'finance') =>
    s === 'rejected' && rejectedAt.value === step
  const manager: StepState =
    s === 'manager'
      ? 'current'
      : rejectedHere('manager')
        ? 'rejected'
        : s === 'finance' || s === 'approved' || rejectedHere('finance')
          ? 'done'
          : 'upcoming'
  const finance: StepState =
    s === 'finance'
      ? 'current'
      : s === 'approved'
        ? 'done'
        : rejectedHere('finance')
          ? 'rejected'
          : 'upcoming'
  return [
    {
      key: 'requested',
      label: s === 'changes' ? 'Update request' : 'Requested',
      owner: people.requester.name,
      state: (s === 'changes' ? 'current' : 'done') as StepState,
    },
    { key: 'manager', label: 'Manager review', owner: people.manager.name, state: manager },
    { key: 'finance', label: 'Finance review', owner: people.finance.name, state: finance },
    {
      key: 'outcome',
      label: s === 'rejected' ? 'Rejected' : 'Approved',
      owner: 'Final decision',
      state: (s === 'approved' ? 'done' : s === 'rejected' ? 'rejected' : 'upcoming') as StepState,
    },
  ]
})

function record(
  action: string,
  severity: HistoryEntry['severity'],
  next: ApprovalStage,
  comment?: string,
) {
  const actor = people[viewer.value]
  history.value.push({
    id: history.value.length + 1,
    actor,
    action,
    severity,
    at: new Date().toISOString(),
    comment,
  })
  stage.value = next
  const nextApprover = stageApprover[next]
  announcement.value = `${action} by ${actor.name}. ${
    nextApprover ? `Now waiting for ${people[nextApprover].name}.` : 'This request is closed.'
  }`
}

function focusStatus() {
  nextTick(() => statusHeading.value?.focus())
}

function approve() {
  const finalStep = stage.value === 'finance'
  confirm.require({
    group: id,
    header: finalStep ? 'Approve credit limit?' : 'Approve and send to finance?',
    message: finalStep
      ? `Raise the credit limit for ${request.customer} to ${formatCurrency(request.requestedLimit)}?`
      : `Send ${request.reference} to ${people.finance.name} for the finance review?`,
    icon: CheckCircle,
    defaultFocus: 'reject',
    blockScroll: true,
    rejectProps: { label: 'Cancel', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Approve' },
    accept: () => {
      if (finalStep) record('Approved', 'success', 'approved')
      else record('Manager approved', 'success', 'finance')
      focusStatus()
    },
  })
}

function openReason(mode: ReasonMode) {
  reasonMode.value = mode
  reasonVisible.value = true
}

function submitReason(reason: string) {
  focusAfterDialog = true
  if (reasonMode.value === 'reject') {
    rejectedAt.value = stage.value === 'finance' ? 'finance' : 'manager'
    record('Rejected', 'danger', 'rejected', reason)
  } else {
    record('Changes requested', 'info', 'changes', reason)
  }
}

function onReasonHidden() {
  // Cancel returns focus to the trigger; after a decision the trigger is gone or disabled.
  if (!focusAfterDialog) return
  focusAfterDialog = false
  focusStatus()
}

function resubmit() {
  record(
    'Resubmitted request',
    'secondary',
    'manager',
    'Updated with September–November order history.',
  )
  focusStatus()
}

function reset() {
  stage.value = 'manager'
  viewer.value = 'manager'
  history.value = initialHistory()
  announcement.value = 'Preview reset.'
  focusStatus()
}
</script>

<template>
  <Card>
    <template #title>
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div class="flex flex-col gap-1">
          <p class="text-sm font-normal text-muted">
            Credit-limit request · {{ request.reference }}
          </p>
          <h3
            ref="statusHeading"
            :id="`${id}-title`"
            tabindex="-1"
            class="text-xl font-medium focus:outline-none"
          >
            {{ request.customer }}
          </h3>
        </div>
        <Tag :severity="status.severity" class="shrink-0">
          <span class="sr-only">Status: </span>{{ status.label }}
        </Tag>
      </div>
    </template>
    <template #content>
      <div class="flex flex-col gap-6 text-sm">
        <dl class="grid gap-4 sm:grid-cols-3">
          <div>
            <dt class="text-muted">Current limit</dt>
            <dd class="font-medium">{{ formatCurrency(request.currentLimit) }}</dd>
          </div>
          <div>
            <dt class="text-muted">Requested limit</dt>
            <dd class="font-medium">{{ formatCurrency(request.requestedLimit) }}</dd>
          </div>
          <div>
            <dt class="text-muted">Outstanding balance</dt>
            <dd class="font-medium">{{ formatCurrency(request.outstanding) }}</dd>
          </div>
        </dl>

        <section :aria-labelledby="`${id}-steps`" class="flex flex-col gap-3">
          <h4 :id="`${id}-steps`" class="text-base font-medium">Approval steps</h4>
          <Timeline
            :value="steps"
            dataKey="key"
            :layout="wide ? 'horizontal' : 'vertical'"
            :aria-labelledby="`${id}-steps`"
            :pt="{ eventOpposite: { class: 'hidden' } }"
          >
            <template #marker="{ item }">
              <span
                class="flex size-7 shrink-0 items-center justify-center rounded-full"
                :class="markerClass[item.state as StepState]"
                aria-hidden="true"
              >
                <component :is="markerIcon[item.state as StepState]" />
              </span>
            </template>
            <template #content="{ item }">
              <div
                class="flex flex-col gap-0.5 pb-4"
                :aria-current="item.state === 'current' ? 'step' : undefined"
              >
                <p class="font-medium">{{ item.label }}</p>
                <p class="text-muted">{{ item.owner }}</p>
                <p class="text-muted">{{ stateText[item.state as StepState] }}</p>
              </div>
            </template>
          </Timeline>
        </section>

        <div class="flex flex-col gap-3 rounded-lg border border-surface p-4">
          <div class="flex flex-wrap items-center justify-between gap-3">
            <span :id="`${id}-viewer`" class="font-medium">View as</span>
            <SelectButton
              v-model="viewer"
              :options="roleOptions"
              optionLabel="label"
              optionValue="value"
              :allowEmpty="false"
              size="small"
              :aria-labelledby="`${id}-viewer`"
            />
          </div>
          <p class="text-muted">
            Viewing as {{ people[viewer].name }}, {{ people[viewer].title.toLowerCase() }}. This
            switch exists only for the preview.
          </p>
        </div>

        <Message v-if="blockedReason" :id="`${id}-blocked`" severity="secondary" size="small">{{
          blockedReason
        }}</Message>

        <div v-if="isReviewStage" class="flex flex-wrap gap-2">
          <Button
            type="button"
            :disabled="!canAct"
            :aria-describedby="blockedReason ? `${id}-blocked` : undefined"
            @click="approve"
            >Approve</Button
          >
          <Button
            type="button"
            severity="secondary"
            outlined
            :disabled="!canAct"
            aria-haspopup="dialog"
            :aria-controls="`${id}-reason`"
            :aria-describedby="blockedReason ? `${id}-blocked` : undefined"
            @click="openReason('changes')"
            >Request changes</Button
          >
          <Button
            type="button"
            severity="danger"
            outlined
            :disabled="!canAct"
            aria-haspopup="dialog"
            :aria-controls="`${id}-reason`"
            :aria-describedby="blockedReason ? `${id}-blocked` : undefined"
            @click="openReason('reject')"
            >Reject</Button
          >
        </div>
        <div v-else-if="stage === 'changes'" class="flex flex-wrap gap-2">
          <Button
            type="button"
            :disabled="!canAct"
            :aria-describedby="blockedReason ? `${id}-blocked` : undefined"
            @click="resubmit"
            >Resubmit request</Button
          >
        </div>
        <div v-else-if="isFinal" class="flex flex-wrap gap-2">
          <Button type="button" severity="secondary" outlined @click="reset">Reset preview</Button>
        </div>

        <p role="status" class="text-muted" :class="{ 'sr-only': !announcement }">
          {{ announcement }}
        </p>

        <ApprovalHistory :entries="history" :headingId="`${id}-history`" />
      </div>
    </template>
  </Card>
  <ApprovalReasonDialog
    v-model:visible="reasonVisible"
    :dialogId="`${id}-reason`"
    :mode="reasonMode"
    @submit="submitReason"
    @after-hide="onReasonHidden"
  />
  <ConfirmDialog :group="id" class="w-[calc(100vw-2rem)] max-w-lg" />
</template>
