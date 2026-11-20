<script setup lang="ts">
import { nextTick, shallowRef, useId, useTemplateRef, watch } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import Comments from '@primeicons/vue/comments'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import CommentComposer from './CommentComposer.vue'
import CommentItem from './CommentItem.vue'
import { CURRENT_USER_ID, teammate, type RecordComment } from './record-activity'

defineProps<{ record: string }>()
const comments = defineModel<RecordComment[]>({ required: true })
const id = useId()
const confirm = useConfirm()
const announcement = shallowRef('')
const composer = useTemplateRef<InstanceType<typeof CommentComposer>>('composer')
let nextId = 0

// Clear first so repeated messages are announced again.
async function announce(message: string) {
  announcement.value = ''
  await nextTick()
  announcement.value = message
}

// Announce comments that arrive from teammates as well as the user's own actions.
watch(
  () => comments.value.length,
  (length, previous) => {
    const latest = comments.value[length - 1]
    if (length > previous && latest && latest.authorId !== CURRENT_USER_ID)
      announce(`New comment from ${teammate(latest.authorId).name}.`)
  },
)

function post(body: string) {
  comments.value = [
    ...comments.value,
    {
      id: `new-comment-${++nextId}`,
      authorId: CURRENT_USER_ID,
      body,
      createdAt: new Date().toISOString(),
    },
  ]
  announce('Comment posted.')
}
function save(commentId: string, body: string) {
  comments.value = comments.value.map((comment) =>
    comment.id === commentId ? { ...comment, body, editedAt: new Date().toISOString() } : comment,
  )
  announce('Comment updated.')
}
function remove(commentId: string, event: Event) {
  confirm.require({
    group: id,
    target: event.currentTarget as HTMLElement,
    message: 'Delete this comment? Teammates will no longer see it.',
    icon: ExclamationTriangle,
    defaultFocus: 'reject',
    rejectProps: { label: 'Keep comment', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Delete comment', severity: 'danger' },
    accept: () => {
      comments.value = comments.value.filter((comment) => comment.id !== commentId)
      announce('Comment deleted.')
      composer.value?.focus()
    },
  })
}
</script>

<template>
  <section class="flex flex-col gap-5 text-sm" :aria-labelledby="`${id}-title`">
    <h3 :id="`${id}-title`" class="sr-only">Comments on {{ record }}</h3>
    <ol v-if="comments.length" class="flex flex-col gap-5" :aria-label="`Comments on ${record}`">
      <li v-for="comment in comments" :key="comment.id">
        <CommentItem
          :comment="comment"
          :own="comment.authorId === CURRENT_USER_ID"
          @save="save(comment.id, $event)"
          @delete="remove(comment.id, $event)"
        />
      </li>
    </ol>
    <div v-else class="flex flex-col items-center gap-2 py-6 text-center">
      <Comments :size="28" aria-hidden="true" class="text-muted" />
      <p class="font-medium">No comments yet</p>
      <p class="text-muted">Start the conversation about {{ record }} below.</p>
    </div>
    <Divider />
    <CommentComposer ref="composer" @post="post" />
    <p role="status" class="sr-only">{{ announcement }}</p>
    <ConfirmPopup :group="id" aria-label="Delete comment" class="max-w-[calc(100vw-2rem)]" />
  </section>
</template>
