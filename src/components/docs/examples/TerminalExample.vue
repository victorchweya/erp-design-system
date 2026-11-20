<script setup lang="ts">
import { onMounted, onBeforeUnmount, shallowRef, useId } from 'vue'
import TerminalService from 'primevue/terminalservice'

const id = useId()
const open = shallowRef(false)

function command(text: string) {
  const value = text.trim().toLowerCase()
  const response =
    value === 'help'
      ? 'Commands: help, status'
      : value === 'status'
        ? 'All deliveries are ready in this preview.'
        : 'Unknown command. Type help.'
  TerminalService.emit('response', response)
}
onMounted(() => TerminalService.on('command', command))
onBeforeUnmount(() => TerminalService.off('command', command))
</script>

<template>
  <div class="flex flex-col gap-4">
    <!-- Terminal focuses its input when it mounts, so render it only after people ask for it. -->
    <Button
      type="button"
      class="self-start"
      :label="open ? 'Close console' : 'Open console'"
      :aria-expanded="open"
      :aria-controls="id"
      @click="open = !open"
    />
    <Terminal
      v-if="open"
      :id="id"
      welcomeMessage="Type help for available commands. Commands only affect this preview."
      prompt="ftf >"
      :pt="{ commandText: { 'aria-label': 'Console command' } }"
    />
  </div>
</template>
