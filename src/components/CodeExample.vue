<script setup lang="ts">
import { shallowRef } from 'vue'
import Copy from '@primeicons/vue/copy'
import Check from '@primeicons/vue/check'
import Mobile from '@primeicons/vue/mobile'

const props = withDefaults(
  defineProps<{
    code: string
    title: string
    language?: 'Vue' | 'CSS' | 'TypeScript'
    tabbed?: boolean
    mobilePreview?: boolean
  }>(),
  { language: 'Vue' },
)

const copyState = shallowRef<'idle' | 'copied' | 'failed'>('idle')
const view = shallowRef('Preview')
const mobile = shallowRef(false)

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copyState.value = 'copied'
  } catch {
    copyState.value = 'failed'
    view.value = 'Code'
  }
}
</script>

<template>
  <!-- Keep this panel flush without passing zero-spacing tokens to nested Cards. -->
  <Card class="min-w-0 overflow-hidden" :pt="{ body: { style: { padding: '0', gap: '0' } } }">
    <template #header>
      <div v-if="!tabbed && $slots.default" class="border-b border-surface p-4 sm:p-6">
        <slot />
      </div>
      <div
        class="flex flex-wrap items-center justify-between gap-4 border-b border-surface px-4 py-3 text-sm"
      >
        <div class="flex min-w-0 flex-wrap items-center gap-3">
          <span
            v-if="language !== 'Vue'"
            class="rounded bg-surface-100 px-2 py-1 text-xs font-medium dark:bg-surface-800"
            >{{ language }}</span
          >
          <span class="font-medium">{{ title }}</span>
        </div>
        <div class="flex items-center gap-3">
          <SelectButton
            v-if="tabbed"
            v-model="view"
            :options="['Preview', 'Code']"
            :allowEmpty="false"
            size="small"
            :aria-label="`${title} view`"
          />
          <Button
            v-if="mobilePreview && tabbed"
            type="button"
            iconOnly
            size="small"
            severity="primary"
            :outlined="!mobile"
            :aria-pressed="mobile"
            aria-label="Toggle mobile preview"
            title="Toggle mobile preview"
            @click="mobile = !mobile"
          >
            <Mobile aria-hidden="true" />
          </Button>
          <Button
            type="button"
            iconOnly
            size="small"
            severity="primary"
            outlined
            class="shrink-0"
            :aria-label="`Copy ${title} code`"
            :title="`Copy ${title} code`"
            @click="copyCode"
          >
            <Check v-if="copyState === 'copied'" aria-hidden="true" />
            <Copy v-else aria-hidden="true" />
          </Button>
        </div>
      </div>
    </template>
    <template #content>
      <div v-if="tabbed" v-show="view === 'Preview'" class="p-4 sm:p-6">
        <div :class="mobile ? 'mx-auto w-[24rem] max-w-full' : 'w-full'"><slot /></div>
      </div>
      <pre
        v-show="!tabbed || view === 'Code'"
        class="m-0 overflow-x-auto p-4 text-sm"
      ><code>{{ code }}</code></pre>
      <p
        role="status"
        class="text-sm"
        :class="copyState === 'failed' ? 'border-t border-surface p-4 text-danger' : 'sr-only'"
      >
        <template v-if="copyState === 'copied'">Code copied.</template>
        <template v-else-if="copyState === 'failed'"
          >Could not copy. Select the code and copy it manually.</template
        >
      </p>
    </template>
  </Card>
</template>
