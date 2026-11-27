<script setup lang="ts">
import ExternalLink from '@primeicons/vue/external-link'
</script>

<template>
  <div class="flex flex-col items-start gap-5">
    <p>
      Review the
      <RouterLink
        to="/foundations/formatting"
        class="rounded-xs text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >formatting guidance</RouterLink
      >
      before displaying order values.
    </p>

    <RouterLink
      to="/ui-blocks/order-entry"
      class="rounded-xs font-medium text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >Order FTF-1049</RouterLink
    >

    <a
      href="https://router.vuejs.org/guide/essentials/navigation.html"
      target="_blank"
      rel="noreferrer"
      class="inline-flex items-center gap-1 rounded-xs text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      Vue Router navigation
      <ExternalLink aria-hidden="true" />
      <span class="sr-only">(opens in a new tab)</span>
    </a>

    <div class="flex flex-wrap items-center gap-3">
      <Button asChild variant="link" v-slot="slotProps">
        <RouterLink to="/ui-blocks/order-entry" :class="slotProps.class"
          >Router link button</RouterLink
        >
      </Button>
      <Button asChild variant="link" v-slot="slotProps">
        <a
          href="https://primevue.org/button/"
          target="_blank"
          rel="noopener"
          :class="slotProps.class"
          >External anchor button<ExternalLink aria-hidden="true" /><span class="sr-only"
            >(opens in a new tab)</span
          ></a
        >
      </Button>
      <Button type="button" variant="link">Quiet action</Button>
    </div>
  </div>
</template>
