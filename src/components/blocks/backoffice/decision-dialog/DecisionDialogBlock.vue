<script setup lang="ts">
// GOAL: One reason dialog for every decision: record the decision and its reason in one short, focused step.
import { computed, shallowRef, useId, useTemplateRef, watch } from 'vue'
import {
  decisionKinds,
  decisionTitle,
  type DecisionKind,
  type DecisionRecord,
} from './decision-dialog'

const props = withDefaults(
  defineProps<{
    kind: DecisionKind
    /** What is being decided, in lower case: "price change", "stock adjustment". */
    subject?: string
    /** The record affected: reference and one line. */
    record?: DecisionRecord
    /** Overrides whether a reason is required; defaults to the decision kind. */
    reasonRequired?: boolean
    minLength?: number
    maxLength?: number
    /** True while the decision is being saved. */
    busy?: boolean
  }>(),
  { subject: 'request', reasonRequired: undefined, minLength: 10, maxLength: 500, busy: false },
)
const emit = defineEmits<{
  /** The trimmed reason; an empty string when an optional note was left blank. */
  confirm: [reason: string]
  cancel: []
  /** After the closing animation, once focus has moved on. */
  afterHide: []
}>()
const visible = defineModel<boolean>('visible', { required: true })

const id = useId()
const reasonId = `${id}-reason`
// One line holds the hint, which turns into the error, so the text is never repeated.
const messageId = `${id}-message`
const countId = `${id}-count`
const reasonField = useTemplateRef<{ $el: HTMLTextAreaElement }>('reasonField')

const draft = shallowRef('')
const touched = shallowRef(false)

const copy = computed(() => decisionKinds[props.kind])
const required = computed(() => props.reasonRequired ?? copy.value.required)
const title = computed(() => decisionTitle(props.kind, props.subject))
const dismissLabel = computed(() => (props.kind === 'cancel' ? 'Go back' : 'Cancel'))
const trimmed = computed(() => draft.value.trim())
const valid = computed(() => !required.value || trimmed.value.length >= props.minLength)
const showError = computed(() => touched.value && !valid.value)
const hint = computed(() =>
  required.value ? `At least ${props.minLength} characters. ${copy.value.hint}` : copy.value.hint,
)
const describedBy = computed(() => `${messageId} ${countId}`)
// Escape closes an empty dialog only. Typed text is never lost silently: use Cancel to discard it.
const closeOnEscape = computed(() => !props.busy && !trimmed.value)

// Every opening starts with an empty reason.
watch(visible, (open) => {
  if (!open) return
  draft.value = ''
  touched.value = false
})

function dismiss() {
  if (props.busy) return
  visible.value = false
  emit('cancel')
}

function submit() {
  if (props.busy) return
  if (!valid.value) {
    touched.value = true
    reasonField.value?.$el.focus()
    return
  }
  emit('confirm', trimmed.value)
}
</script>

<template>
  <Dialog
    :visible="visible"
    modal
    blockScroll
    :header="title"
    :closable="!busy"
    :closeOnEscape="closeOnEscape"
    :dt="{
      header: { padding: '{spacing.4} {spacing.4} {spacing.2}' },
      content: { padding: '{spacing.2} {spacing.4}' },
      footer: { padding: '{spacing.2} {spacing.4} {spacing.4}' },
    }"
    class="w-[calc(100vw-2rem)] max-w-md"
    @update:visible="(open: boolean) => !open && dismiss()"
    @after-hide="emit('afterHide')"
  >
    <form
      :id="`${id}-form`"
      novalidate
      class="flex flex-col gap-3 text-sm"
      @submit.prevent="submit"
    >
      <p
        v-if="record"
        class="flex min-w-0 gap-1.5"
        :title="`${record.reference} · ${record.summary}`"
      >
        <span class="sr-only">Affects</span>
        <span class="shrink-0 font-semibold">{{ record.reference }}</span>
        <span class="min-w-0 truncate text-muted">{{ record.summary }}</span>
      </p>
      <div class="flex flex-col gap-1.5">
        <label :for="reasonId" class="font-medium">{{ copy.reasonLabel }}</label>
        <Textarea
          :id="reasonId"
          ref="reasonField"
          v-model="draft"
          :rows="3"
          size="small"
          :maxlength="maxLength"
          :required="required"
          :readonly="busy"
          :invalid="showError"
          :aria-invalid="showError"
          :aria-describedby="describedBy"
          autofocus
          fluid
          @blur="touched = true"
        />
        <div class="flex items-start justify-between gap-x-3">
          <Message v-if="showError" :id="messageId" severity="error" variant="simple" size="small">
            Required: enter at least {{ minLength }} characters ({{ trimmed.length }} so far).
          </Message>
          <p v-else :id="messageId" class="min-w-0 text-muted">{{ hint }}</p>
          <p :id="countId" class="shrink-0 tabular-nums text-muted">
            {{ draft.length }} / {{ maxLength }}<span class="sr-only"> characters</span>
          </p>
        </div>
      </div>
      <p role="status" class="sr-only">{{ busy ? 'Saving' : '' }}</p>
    </form>
    <template #footer>
      <Button
        type="button"
        size="small"
        severity="secondary"
        outlined
        :disabled="busy"
        @click="dismiss"
        >{{ dismissLabel }}</Button
      >
      <Button
        type="submit"
        size="small"
        :form="`${id}-form`"
        :severity="copy.destructive ? 'danger' : undefined"
        :loading="busy"
        :disabled="!valid || busy"
        >{{ title }}</Button
      >
    </template>
  </Dialog>
</template>
