<script setup lang="ts">
import { computed, nextTick, shallowRef, useId, useTemplateRef } from 'vue'
import Pencil from '@primeicons/vue/pencil'
import Trash from '@primeicons/vue/trash'
import { formatDateTime } from '@/utils/format'
import { COMMENT_LIMIT, commentParts, teammate, type RecordComment } from './record-activity'

const props = defineProps<{ comment: RecordComment; own: boolean }>()
const emit = defineEmits<{ save: [body: string]; delete: [event: Event] }>()
const id = useId()
const editing = shallowRef(false)
const draft = shallowRef('')
const error = shallowRef('')
const editor = useTemplateRef<{ $el: HTMLTextAreaElement }>('editor')
const editButton = useTemplateRef<{ $el: HTMLButtonElement }>('editButton')

const author = computed(() => teammate(props.comment.authorId))
const parts = computed(() => commentParts(props.comment.body))

async function startEdit() {
  draft.value = props.comment.body
  error.value = ''
  editing.value = true
  await nextTick()
  editor.value?.$el.focus()
}
async function stopEdit() {
  editing.value = false
  await nextTick()
  editButton.value?.$el.focus()
}
function save() {
  const body = draft.value.trim()
  if (!body) error.value = 'A comment cannot be empty. Delete it instead.'
  else if (body.length > COMMENT_LIMIT)
    error.value = `Shorten your comment to ${COMMENT_LIMIT} characters or fewer.`
  else {
    if (body !== props.comment.body) emit('save', body)
    stopEdit()
  }
}
function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    event.preventDefault()
    stopEdit()
  } else if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault()
    save()
  }
}
</script>

<template>
  <article class="flex gap-3" :aria-labelledby="`${id}-author`">
    <Avatar :label="author.initials" shape="circle" aria-hidden="true" class="shrink-0" />
    <div class="flex min-w-0 flex-1 flex-col gap-1">
      <header class="flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h4 :id="`${id}-author`" class="font-medium">
          {{ author.name }}<span v-if="own" class="sr-only"> (you)</span>
        </h4>
        <span class="text-xs text-muted">
          <time :datetime="comment.createdAt">{{ formatDateTime(comment.createdAt) }}</time>
          <template v-if="comment.editedAt"> · Edited</template>
        </span>
      </header>
      <form v-if="editing" class="flex flex-col gap-2" novalidate @submit.prevent="save">
        <label :for="`${id}-edit`" class="sr-only">Edit comment</label>
        <Textarea
          :id="`${id}-edit`"
          ref="editor"
          v-model="draft"
          rows="3"
          autoResize
          fluid
          :invalid="!!error"
          :aria-describedby="error ? `${id}-error` : undefined"
          @keydown="onKeydown"
        />
        <Message v-if="error" :id="`${id}-error`" severity="error" size="small" variant="simple">{{
          error
        }}</Message>
        <div class="flex flex-wrap gap-2">
          <Button type="submit" size="small">Save comment</Button>
          <Button type="button" size="small" severity="secondary" outlined @click="stopEdit"
            >Cancel</Button
          >
        </div>
      </form>
      <p v-else class="whitespace-pre-line break-words leading-relaxed">
        <template v-for="(part, index) in parts" :key="index">
          <strong v-if="part.mention" class="font-medium text-primary">{{ part.text }}</strong>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
      <div v-if="own && !editing" class="flex gap-1">
        <Button
          ref="editButton"
          type="button"
          size="small"
          variant="text"
          severity="secondary"
          :aria-describedby="`${id}-author`"
          @click="startEdit"
          ><Pencil aria-hidden="true" />Edit</Button
        >
        <Button
          type="button"
          size="small"
          variant="text"
          severity="danger"
          aria-haspopup="dialog"
          :aria-describedby="`${id}-author`"
          @click="emit('delete', $event)"
          ><Trash aria-hidden="true" />Delete</Button
        >
      </div>
    </div>
  </article>
</template>
