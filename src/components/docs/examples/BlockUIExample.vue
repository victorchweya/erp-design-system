<script setup lang="ts">
import { shallowRef } from 'vue'
const blocked = shallowRef(false)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex flex-wrap gap-2">
      <Button type="button" :disabled="blocked" @click="blocked = true">Block region</Button
      ><Button
        type="button"
        severity="secondary"
        outlined
        :disabled="!blocked"
        @click="blocked = false"
        >Unblock region</Button
      >
    </div>
    <BlockUI :blocked="blocked"
      ><fieldset
        :disabled="blocked"
        :aria-busy="blocked"
        class="flex flex-col gap-3 rounded-lg border border-surface p-4"
      >
        <legend>Delivery actions</legend>
        <Button type="button" severity="secondary" outlined class="self-start"
          >Review delivery</Button
        >
      </fieldset></BlockUI
    >
    <p role="status">
      {{
        blocked ? 'Delivery actions are temporarily blocked.' : 'Delivery actions are available.'
      }}
    </p>
  </div>
</template>
