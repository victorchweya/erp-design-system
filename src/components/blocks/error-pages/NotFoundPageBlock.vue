<script setup lang="ts">
import Compass from '@primeicons/vue/compass'
import Envelope from '@primeicons/vue/envelope'
import Home from '@primeicons/vue/home'
import ErrorPage from './ErrorPage.vue'

withDefaults(
  defineProps<{
    headingTag?: 'h1' | 'h2' | 'h3'
    /** The address that could not be found. Rendered as plain text. */
    path?: string
    homeTo?: string
    supportHref?: string
  }>(),
  { headingTag: 'h2', homeTo: '/' },
)
</script>

<template>
  <ErrorPage
    :heading-tag="headingTag"
    heading="We can’t find that page"
    description="The page may have moved, or the link may be incomplete. Check the address or go to the home page."
  >
    <template #icon><Compass :size="32" aria-hidden="true" class="text-muted" /></template>
    <p v-if="path" class="max-w-md text-sm text-muted">
      Address: <code class="break-all text-color">{{ path }}</code>
    </p>
    <template #actions>
      <Button asChild v-slot="slotProps">
        <RouterLink :to="homeTo" :class="slotProps.class">
          <Home aria-hidden="true" />Go to home
        </RouterLink>
      </Button>
      <Button v-if="supportHref" as="a" :href="supportHref" severity="secondary" outlined>
        <Envelope aria-hidden="true" />Contact support
      </Button>
    </template>
  </ErrorPage>
</template>
