<script setup lang="ts">
import { computed, type Component } from 'vue'
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import { useActiveSection } from '@/composables/useActiveSection'

const props = defineProps<{
  title: string
  componentName?: string
  category: string
  description: string
  usage: string
  examples: { id: string; title: string; description: string; component: Component; code: string }[]
  accessibility: string[]
  api: { name: string; type: string; default: string; description: string }[]
  source: string
}>()

const sections = computed(() => [
  { id: 'how-to-use', label: 'How to use' },
  ...props.examples.map(({ id, title }) => ({ id, label: title })),
  { id: 'accessibility', label: 'Accessibility' },
  ...(props.api.length ? [{ id: 'api', label: 'Key props' }] : []),
])
const activeSection = useActiveSection(() => sections.value.map(({ id }) => id))
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-xl gap-10 px-6 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">{{ category }}</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">{{ title }}</h1>
        <p class="text-base leading-relaxed text-muted-color">{{ description }}</p>
      </header>
      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />
      <div class="flex flex-col gap-12">
        <section
          id="how-to-use"
          aria-labelledby="usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted-color">
            <Tag severity="secondary" class="align-baseline"
              ><code>{{ componentName ?? title }}</code></Tag
            >
            {{ usage }}
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
          <p class="leading-relaxed text-muted-color">{{ example.description }}</p>
          <CodeExample :title="`${title}: ${example.title}`" :code="example.code"
            ><component :is="example.component"
          /></CodeExample>
        </section>
        <section
          id="accessibility"
          aria-labelledby="accessibility-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="accessibility-title" class="text-2xl font-medium">Accessibility</h2>
          <p v-for="note in accessibility" :key="note" class="leading-relaxed text-muted-color">
            {{ note }}
          </p>
        </section>
        <section
          v-if="api.length"
          id="api"
          aria-labelledby="api-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="api-title" class="text-2xl font-medium">Key props</h2>
          <DataTable :value="api" size="small" showGridlines aria-label="Key component properties">
            <Column field="name" header="Prop"
              ><template #body="{ data }"
                ><code>{{ data.name }}</code></template
              ></Column
            >
            <Column field="type" header="Type"
              ><template #body="{ data }"
                ><code>{{ data.type }}</code></template
              ></Column
            >
            <Column field="default" header="Default"
              ><template #body="{ data }"
                ><code>{{ data.default }}</code></template
              ></Column
            >
            <Column field="description" header="Use" />
          </DataTable>
        </section>
        <p class="text-muted-color">
          Examples use the local ERP theme and PrimeVue 5.0.5.
          <a :href="source" class="font-medium text-primary underline underline-offset-4"
            >PrimeVue API reference</a
          >.
        </p>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
