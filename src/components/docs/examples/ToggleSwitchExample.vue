<script setup lang="ts">
import { shallowRef } from 'vue'
const enabled = shallowRef(false)
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-3">
      <ToggleSwitch inputId="delivery-notifications" v-model="enabled" /><label
        for="delivery-notifications"
        class="font-medium"
        >Delivery notifications</label
      >
    </div>
    <p class="text-muted-color">Notifications are {{ enabled ? 'on' : 'off' }} in this preview.</p>
  </div>
</template>
