<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import TerminalService from 'primevue/terminalservice'
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
  <Terminal
    welcomeMessage="Type help for available commands. Commands only affect this preview."
    prompt="ftf >"
    :pt="{ commandText: { 'aria-label': 'Preview command' } }"
  />
</template>
