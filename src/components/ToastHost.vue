<script setup lang="ts">
import { notificationLayers } from '@/theme/erp-theme/foundations/layers'
</script>

<template>
  <Toast :autoZIndex="false" :style="{ zIndex: notificationLayers.toast }">
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot :name="name" v-bind="slotProps ?? {}" />
    </template>
  </Toast>
</template>
