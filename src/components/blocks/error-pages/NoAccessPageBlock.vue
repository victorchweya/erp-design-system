<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import Envelope from '@primeicons/vue/envelope'
import Home from '@primeicons/vue/home'
import Lock from '@primeicons/vue/lock'
import ErrorPage from './ErrorPage.vue'

const props = withDefaults(
  defineProps<{
    headingTag?: 'h1' | 'h2' | 'h3'
    /** Who approves access, for example a named manager or team. */
    approver?: string
    homeTo?: string
    supportHref?: string
  }>(),
  { headingTag: 'h2', approver: 'your manager', homeTo: '/' },
)
const emit = defineEmits<{ requestAccess: [] }>()

const requested = shallowRef(false)
const description = computed(
  () =>
    `Your account doesn’t include this page yet. Request access and we’ll ask ${props.approver} to approve it.`,
)

function requestAccess() {
  requested.value = true
  emit('requestAccess')
}
</script>

<template>
  <ErrorPage
    :heading-tag="headingTag"
    heading="You don’t have access to this page"
    :description="description"
  >
    <template #icon><Lock :size="32" aria-hidden="true" class="text-muted" /></template>
    <p role="status" class="max-w-md text-sm text-muted" :class="{ 'sr-only': !requested }">
      {{ requested ? `Request sent to ${approver}. You’ll get an email when it’s approved.` : '' }}
    </p>
    <template #actions>
      <Button size="small" type="button" :disabled="requested" @click="requestAccess">
        {{ requested ? 'Access requested' : 'Request access' }}
      </Button>
      <Button size="small" asChild severity="secondary" outlined v-slot="slotProps">
        <RouterLink :to="homeTo" :class="slotProps.class">
          <Home aria-hidden="true" />Go to home
        </RouterLink>
      </Button>
      <Button size="small" v-if="supportHref" as="a" :href="supportHref" severity="primary" text>
        <Envelope aria-hidden="true" />Contact support
      </Button>
    </template>
  </ErrorPage>
</template>
