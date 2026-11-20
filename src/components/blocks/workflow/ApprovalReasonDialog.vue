<script setup lang="ts">
import { computed, shallowRef, useId, watch } from 'vue'
import { reasonCopy, type ReasonMode } from './approval-flow'

const props = defineProps<{ mode: ReasonMode; dialogId: string }>()
const emit = defineEmits<{ submit: [reason: string]; afterHide: [] }>()
const visible = defineModel<boolean>('visible', { required: true })

const id = useId()
const draft = shallowRef('')
const error = shallowRef('')
const copy = computed(() => reasonCopy[props.mode])

watch(visible, (open) => {
  if (!open) return
  draft.value = ''
  error.value = ''
})

function submit() {
  const reason = draft.value.trim()
  if (reason.length < 10) {
    error.value = copy.value.error
    return
  }
  emit('submit', reason)
  visible.value = false
}
</script>

<template>
  <Dialog
    :id="dialogId"
    v-model:visible="visible"
    modal
    blockScroll
    :header="copy.header"
    class="w-[calc(100vw-2rem)] max-w-lg"
    @after-hide="emit('afterHide')"
  >
    <form
      :id="`${id}-form`"
      novalidate
      class="flex flex-col gap-4 text-sm"
      @submit.prevent="submit"
    >
      <div class="flex flex-col gap-1">
        <label :for="`${id}-reason`" class="font-medium">{{ copy.label }}</label>
        <Textarea
          :id="`${id}-reason`"
          v-model="draft"
          :rows="4"
          required
          autofocus
          :invalid="!!error"
          :aria-invalid="!!error"
          :aria-describedby="`${id}-help ${id}-error`"
          fluid
        />
        <p :id="`${id}-help`" class="text-muted">{{ copy.help }}</p>
        <Message v-if="error" :id="`${id}-error`" severity="error" variant="simple" size="small">{{
          error
        }}</Message>
      </div>
    </form>
    <template #footer
      ><Button type="button" severity="secondary" outlined @click="visible = false">Cancel</Button
      ><Button
        type="submit"
        :form="`${id}-form`"
        :severity="mode === 'reject' ? 'danger' : undefined"
        >{{ copy.submit }}</Button
      ></template
    >
  </Dialog>
</template>
