<script setup lang="ts">
import { computed, type Component } from 'vue'
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import { useActiveSection } from '@/composables/useActiveSection'

const props = defineProps<{
  title: string
  description: string
  usage: string[]
  examples: {
    id: string
    title: string
    description: string
    component: Component
    code: string
    props?: Record<string, unknown>
    mobilePreview?: boolean
  }[]
}>()
const sections = computed(() => [
  { id: 'how-to-use', label: 'How to use' },
  ...props.examples.map(({ id, title }) => ({ id, label: title })),
])
const activeSection = useActiveSection(() => sections.value.map(({ id }) => id))
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">UI blocks</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">{{ title }}</h1>
        <p class="text-base leading-relaxed text-muted">
          {{ description }}
        </p>
      </header>
      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />
      <div class="flex flex-col gap-12">
        <section
          id="how-to-use"
          aria-labelledby="usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted">
            Choose a pattern, switch to <Tag severity="secondary">Code</Tag>, and copy its Vue
            source. Replace sample data and local preview actions with your application logic.
          </p>
          <p v-for="note in usage" :key="note" class="leading-relaxed text-muted">{{ note }}</p>
          <p class="leading-relaxed text-muted">
            Patterns use our shared tokens and follow the current light or dark theme. Keep visible
            labels, keyboard access, and feedback when adapting them.
          </p>
        </section>
        <section
          v-for="example in examples"
          :id="example.id"
          :key="example.id"
          :aria-labelledby="`${example.id}-title`"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 :id="`${example.id}-title`" class="text-2xl font-medium">{{ example.title }}</h2>
          <p class="leading-relaxed text-muted">{{ example.description }}</p>
          <CodeExample
            :title="example.title"
            :code="example.code"
            :mobilePreview="example.mobilePreview"
            tabbed
          >
            <component :is="example.component" v-bind="example.props" />
          </CodeExample>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
