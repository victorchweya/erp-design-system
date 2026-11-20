<script setup lang="ts">
import { ref } from 'vue'
import CommentsPanel from './CommentsPanel.vue'
import { sampleComments, type RecordComment } from './record-activity'

const comments = ref<RecordComment[]>(sampleComments())

// Preview only: stands in for a comment pushed from the server.
function simulateReply() {
  comments.value = [
    ...comments.value,
    {
      id: `reply-${comments.value.length + 1}`,
      authorId: 'wanjiru',
      body: 'Invoice will reflect the spinach substitution. @Amina Hassan please confirm the final weights.',
      createdAt: new Date().toISOString(),
    },
  ]
}
</script>

<template>
  <Card class="max-w-2xl">
    <template #title><h3 class="text-lg font-medium">Comments</h3></template>
    <template #subtitle>Order FTF-1042 · Green Basket</template>
    <template #content>
      <CommentsPanel v-model="comments" record="order FTF-1042" />
    </template>
    <template #footer>
      <div class="flex flex-wrap gap-2">
        <Button type="button" size="small" severity="secondary" outlined @click="simulateReply"
          >Simulate teammate reply</Button
        >
        <Button
          type="button"
          size="small"
          severity="secondary"
          variant="text"
          @click="comments = []"
          >Show empty state</Button
        >
      </div>
    </template>
  </Card>
</template>
