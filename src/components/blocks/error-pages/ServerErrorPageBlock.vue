<script setup lang="ts">
import { shallowRef } from 'vue'
import Check from '@primeicons/vue/check'
import Copy from '@primeicons/vue/copy'
import Envelope from '@primeicons/vue/envelope'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import Home from '@primeicons/vue/home'
import Replay from '@primeicons/vue/replay'
import ErrorPage from './ErrorPage.vue'

const props = withDefaults(
  defineProps<{
    headingTag?: 'h1' | 'h2' | 'h3'
    /** Reference support can use to find this failure in the logs. */
    reference?: string
    homeTo?: string
    supportHref?: string
  }>(),
  { headingTag: 'h2', reference: 'REF-8F3A-2611', homeTo: '/' },
)
const emit = defineEmits<{ retry: [] }>()

const retrying = shallowRef(false)
const copyState = shallowRef<'idle' | 'copied' | 'failed'>('idle')
const copyMessages = {
  idle: '',
  copied: 'Reference copied.',
  failed: 'The reference couldn’t be copied. Select it and copy it manually.',
}

function retry() {
  retrying.value = true
  emit('retry')
}

async function copyReference() {
  try {
    await navigator.clipboard.writeText(props.reference)
    copyState.value = 'copied'
  } catch {
    copyState.value = 'failed'
  }
}
</script>

<template>
  <ErrorPage
    :heading-tag="headingTag"
    heading="Something went wrong"
    description="This problem is on our side. Try again in a moment. If it keeps happening, contact support and share the reference below."
  >
    <template #icon>
      <ExclamationTriangle :size="32" aria-hidden="true" class="text-error" />
    </template>
    <div class="flex flex-col items-center gap-2">
      <div
        class="flex items-center gap-2 rounded-border border border-surface py-1 pl-3 pr-1 text-sm"
      >
        <span class="text-muted">Reference</span>
        <code class="select-all font-medium">{{ reference }}</code>
        <Button
          type="button"
          iconOnly
          size="small"
          severity="secondary"
          text
          aria-label="Copy reference"
          title="Copy reference"
          @click="copyReference"
        >
          <Check v-if="copyState === 'copied'" aria-hidden="true" />
          <Copy v-else aria-hidden="true" />
        </Button>
      </div>
      <p
        role="status"
        class="text-sm"
        :class="[
          copyState === 'failed' ? 'text-error' : 'text-muted',
          { 'sr-only': copyState === 'idle' },
        ]"
      >
        {{ copyMessages[copyState] }}
      </p>
    </div>
    <template #actions>
      <Button type="button" :loading="retrying" @click="retry">
        <Replay aria-hidden="true" />Try again
      </Button>
      <Button asChild severity="secondary" outlined v-slot="slotProps">
        <RouterLink :to="homeTo" :class="slotProps.class">
          <Home aria-hidden="true" />Go to home
        </RouterLink>
      </Button>
      <Button v-if="supportHref" as="a" :href="supportHref" severity="secondary" text>
        <Envelope aria-hidden="true" />Contact support
      </Button>
    </template>
  </ErrorPage>
</template>
