<script setup lang="ts">
import { shallowRef } from 'vue'
import Box from '@primeicons/vue/box'
import File from '@primeicons/vue/file'
import Images from '@primeicons/vue/images'
import SlidersH from '@primeicons/vue/sliders-h'

const active = shallowRef('attributes')
</script>

<template>
  <Tabs v-model:value="active">
    <TabList aria-label="Product information">
      <Tab value="summary" class="flex items-center gap-2!">
        <File aria-hidden="true" />
        Summary
      </Tab>
      <Tab value="attributes" class="flex items-center gap-2!">
        <SlidersH aria-hidden="true" />
        Attributes
      </Tab>
      <Tab value="assets" class="flex items-center gap-2!">
        <Images aria-hidden="true" />
        Assets
      </Tab>
      <Tab value="variants" class="flex items-center gap-2!">
        <Box aria-hidden="true" />
        Variants
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="summary"
        ><p class="text-sm text-muted">Commercial and operational product summary.</p></TabPanel
      >
      <TabPanel value="attributes"
        ><p class="text-sm text-muted">Required product attributes and specifications.</p></TabPanel
      >
      <TabPanel value="assets"
        ><p class="text-sm text-muted">Product images, documents, and labels.</p></TabPanel
      >
      <TabPanel value="variants"
        ><p class="text-sm text-muted">Pack sizes and product variants.</p></TabPanel
      >
    </TabPanels>
  </Tabs>
</template>
