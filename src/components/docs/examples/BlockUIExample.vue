<script setup lang="ts">
import { shallowRef } from 'vue'
const blocked = shallowRef(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <Button type="button" :disabled="blocked" @click="blocked = true">Simulate saving</Button
      ><Button
        type="button"
        severity="primary"
        outlined
        :disabled="!blocked"
        @click="blocked = false"
        >Finish saving</Button
      >
    </div>
    <BlockUI :blocked="blocked"
      ><fieldset
        :disabled="blocked"
        class="flex flex-col gap-3 rounded-lg border border-surface p-4"
      >
        <legend>Delivery DLV-5104</legend>
        <Button type="button" severity="primary" outlined class="self-start"
          >Confirm received weight</Button
        >
      </fieldset></BlockUI
    >
    <p role="status">
      {{ blocked ? 'Saving delivery. Actions are paused.' : 'Delivery actions are available.' }}
    </p>
  </div>
</template>
