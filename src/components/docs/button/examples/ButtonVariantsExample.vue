<script setup lang="ts">
const severities = ['primary', 'secondary', 'success', 'info', 'warn', 'help', 'danger', 'contrast'] as const
</script>

<template>
  <div class="flex flex-col gap-6">
    <div v-for="severity in severities" :key="severity" class="flex flex-col gap-2">
      <p class="font-medium capitalize">{{ severity }}</p>
      <div class="flex flex-wrap items-center gap-4">
        <Button type="button" :severity="severity">Filled</Button>
        <Button type="button" :severity="severity" outlined>Outlined</Button>
        <Button type="button" :severity="severity" text>Text</Button>
        <Button type="button" :severity="severity" rounded>Rounded</Button>
        <Button type="button" :severity="severity" raised>Raised</Button>
      </div>
    </div>
  </div>
</template>
