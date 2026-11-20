<script setup lang="ts">
import { useRoute } from 'vue-router'
import NotFoundPageBlock from '@/components/blocks/error-pages/NotFoundPageBlock.vue'

const route = useRoute()
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-xl px-4 py-10">
    <NotFoundPageBlock
      heading-tag="h1"
      :path="route.fullPath"
      home-to="/components"
      class="flex-1"
    />
  </div>
</template>
