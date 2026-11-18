<script setup lang="ts">
import { shallowRef } from 'vue'
import Inbox from '@primeicons/vue/inbox'
import Plus from '@primeicons/vue/plus'
const created = shallowRef(false)
</script>

<template>
  <Card>
    <template #content>
      <div v-if="!created" class="flex flex-col items-center gap-4 py-6 text-center">
        <Inbox :size="32" aria-hidden="true" class="text-muted" />
        <div class="space-y-2">
          <h3 class="text-xl font-medium">No supplier orders yet</h3>
          <p class="text-sm text-muted">
            Create your first order to start planning incoming produce.
          </p>
        </div>
        <Button type="button" @click="created = true"
          ><Plus aria-hidden="true" />Create order</Button
        >
      </div>
      <div v-else class="flex flex-col items-start gap-4">
        <Message severity="success">A draft order was created in this preview.</Message>
        <Button type="button" severity="secondary" outlined @click="created = false"
          >Reset preview</Button
        >
      </div>
    </template>
  </Card>
</template>
