<script setup lang="ts">
import { computed, shallowRef, useId, useTemplateRef } from 'vue'
import type {
  AutoCompleteCompleteEvent,
  AutoCompleteOptionSelectEvent,
} from 'primevue/autocomplete'
import Send from '@primeicons/vue/send'
import { COMMENT_LIMIT, teammates, type Teammate } from './record-activity'

const emit = defineEmits<{ post: [body: string] }>()
const id = useId()
const body = shallowRef('')
const error = shallowRef('')
const mention = shallowRef<Teammate | string | null>(null)
const suggestions = shallowRef<Teammate[]>([])
const textarea = useTemplateRef<{ $el: HTMLTextAreaElement }>('textarea')

const length = computed(() => body.value.trim().length)
const overLimit = computed(() => length.value > COMMENT_LIMIT)
const counter = computed(() =>
  overLimit.value
    ? `${length.value - COMMENT_LIMIT} characters over the ${COMMENT_LIMIT} limit`
    : `${COMMENT_LIMIT - length.value} characters left`,
)

function search(event: AutoCompleteCompleteEvent) {
  const query = event.query.trim().toLowerCase()
  suggestions.value = teammates.filter((person) => person.name.toLowerCase().includes(query))
}
function insertMention(event: AutoCompleteOptionSelectEvent) {
  const person = event.value as Teammate
  const separator = body.value && !/\s$/.test(body.value) ? ' ' : ''
  body.value = `${body.value}${separator}@${person.name} `
  mention.value = null
  focus()
}
function post() {
  if (!length.value) {
    error.value = 'Write a comment before posting.'
    return
  }
  if (overLimit.value) {
    error.value = `Shorten your comment to ${COMMENT_LIMIT} characters or fewer.`
    return
  }
  emit('post', body.value.trim())
  body.value = ''
  error.value = ''
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault()
    post()
  }
}
function focus() {
  textarea.value?.$el.focus()
}
defineExpose({ focus })
</script>

<template>
  <form class="flex flex-col gap-3" novalidate @submit.prevent="post">
    <div class="flex flex-col gap-2">
      <label :for="`${id}-body`" class="font-medium">Add a comment</label>
      <Textarea
        :id="`${id}-body`"
        ref="textarea"
        v-model="body"
        rows="3"
        autoResize
        fluid
        :invalid="!!error || overLimit"
        :aria-describedby="`${id}-hint ${id}-counter${error ? ` ${id}-error` : ''}`"
        aria-keyshortcuts="Control+Enter Meta+Enter"
        @keydown="onKeydown"
        @input="error = ''"
      />
      <div class="flex flex-wrap justify-between gap-x-4 gap-y-1 text-xs text-muted">
        <span :id="`${id}-hint`">Press Ctrl+Enter or ⌘+Enter to post.</span>
        <span :id="`${id}-counter`" :class="{ 'text-danger': overLimit }">{{ counter }}</span>
      </div>
      <Message v-if="error" :id="`${id}-error`" severity="error" size="small" variant="simple">{{
        error
      }}</Message>
    </div>
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div class="flex min-w-0 flex-1 flex-col gap-2 sm:max-w-64">
        <label :for="`${id}-mention`" class="text-xs font-medium">Mention a teammate</label>
        <AutoComplete
          v-model="mention"
          :inputId="`${id}-mention`"
          :suggestions="suggestions"
          optionLabel="name"
          placeholder="Type a name"
          size="small"
          fluid
          completeOnFocus
          @complete="search"
          @option-select="insertMention"
        >
          <template #option="{ option }">
            <div class="flex flex-col">
              <span>{{ option.name }}</span>
              <span class="text-xs text-muted">{{ option.role }}</span>
            </div>
          </template>
        </AutoComplete>
      </div>
      <Button type="submit" size="small"><Send aria-hidden="true" />Post comment</Button>
    </div>
  </form>
</template>
