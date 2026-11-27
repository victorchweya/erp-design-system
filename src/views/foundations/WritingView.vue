<script setup lang="ts">
import AnchorNav from '@/components/AnchorNav.vue'
import WritingDoDont from '@/components/foundations/writing/WritingDoDont.vue'
import WritingTerminology from '@/components/foundations/writing/WritingTerminology.vue'
import { writingGuidelines } from '@/components/foundations/writing/writing-guidelines'
import { useActiveSection } from '@/composables/useActiveSection'

const sections = [
  ...writingGuidelines.map(({ id, label }) => ({ id, label })),
  { id: 'writing-terminology', label: 'Terminology' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Writing</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Write interface copy that operations staff, farmers, and buyers can act on quickly. Use
          plain English, sentence case, and the same words for the same things across FTF products.
        </p>
      </header>

      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section
          v-for="guideline in writingGuidelines"
          :id="guideline.id"
          :key="guideline.id"
          :aria-labelledby="`${guideline.id}-title`"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 :id="`${guideline.id}-title`" class="text-2xl font-medium">
            {{ guideline.label }}
          </h2>
          <p class="leading-relaxed text-muted-color">{{ guideline.description }}</p>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li v-for="rule in guideline.rules" :key="rule">{{ rule }}</li>
          </ul>
          <p v-if="guideline.link" class="leading-relaxed text-muted-color">
            {{ guideline.link.text }}
            <RouterLink
              :to="guideline.link.to"
              class="rounded-xs text-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >{{ guideline.link.label }}</RouterLink
            >.
          </p>
          <WritingDoDont
            v-for="example in guideline.examples"
            :key="example.do"
            :example="example"
          />
        </section>

        <section
          id="writing-terminology"
          aria-labelledby="writing-terminology-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="writing-terminology-title" class="text-2xl font-medium">Terminology</h2>
          <p class="leading-relaxed text-muted-color">
            Use one term for each concept so labels, tables, and messages match.
          </p>
          <WritingTerminology />
        </section>
      </div>
    </div>

    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
