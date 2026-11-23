<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import Envelope from '@primeicons/vue/envelope'
import Replay from '@primeicons/vue/replay'
import Wifi from '@primeicons/vue/wifi'
import Wrench from '@primeicons/vue/wrench'
import { formatTime } from '@/utils/format'
import ErrorPage from './ErrorPage.vue'

const props = withDefaults(
  defineProps<{
    headingTag?: 'h1' | 'h2' | 'h3'
    variant?: 'offline' | 'maintenance'
    /** Expected end of maintenance, shown in Nairobi time. */
    backBy?: string
    supportHref?: string
  }>(),
  { headingTag: 'h2', variant: 'offline', backBy: '2026-11-20T11:30:00Z' },
)
const emit = defineEmits<{ retry: [] }>()

const retrying = shallowRef(false)
const content = computed(() =>
  props.variant === 'maintenance'
    ? {
        icon: Wrench,
        heading: 'We’re doing planned maintenance',
        description: `FTF is being updated and should be back by ${formatTime(props.backBy)}. Work you’ve already saved is safe.`,
      }
    : {
        icon: Wifi,
        heading: 'You’re offline',
        description:
          'Check your mobile data or Wi-Fi, then try again. Work you’ve already saved is safe.',
      },
)

function retry() {
  retrying.value = true
  emit('retry')
}
</script>

<template>
  <ErrorPage
    :heading-tag="headingTag"
    :heading="content.heading"
    :description="content.description"
  >
    <template #icon>
      <component :is="content.icon" :size="32" aria-hidden="true" class="text-warn" />
    </template>
    <template #actions>
      <Button size="small" type="button" :loading="retrying" @click="retry">
        <Replay aria-hidden="true" />Try again
      </Button>
      <Button size="small" v-if="supportHref" as="a" :href="supportHref" severity="primary" outlined>
        <Envelope aria-hidden="true" />Contact support
      </Button>
    </template>
  </ErrorPage>
</template>
