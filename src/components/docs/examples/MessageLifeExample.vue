<script setup lang="ts">
import { onScopeDispose, shallowRef } from 'vue'

const visible = shallowRef(false)
let timer: ReturnType<typeof setTimeout> | undefined

function showMessage() {
  visible.value = true
  clearTimeout(timer)
  timer = setTimeout(() => {
    visible.value = false
  }, 3000)
}

onScopeDispose(() => clearTimeout(timer))
</script>

<template>
  <div class="flex flex-col items-start gap-4">
    <Button type="button" :disabled="visible" @click="showMessage">Show message</Button>
    <Message v-if="visible" severity="success" :life="3000">
      The stock adjustment was saved.
    </Message>
  </div>
</template>
