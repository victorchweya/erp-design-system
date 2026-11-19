<script setup lang="ts">
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import LinkExample from '@/components/docs/examples/LinkExample.vue'
import exampleCode from '@/components/docs/examples/LinkExample.vue?raw'
import { useActiveSection } from '@/composables/useActiveSection'

const sections = [
  { id: 'link-how-to-use', label: 'How to use' },
  { id: 'link-examples', label: 'Examples' },
  { id: 'link-accessibility', label: 'Accessibility' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Button</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Links</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Navigate to pages, records, sections, and external resources with clear, recognisable link
          styling.
        </p>
      </header>
      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section id="link-how-to-use" class="flex scroll-mt-24 flex-col gap-4">
          <h2 class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted-color">
            Use <Tag severity="secondary"><code>RouterLink</code></Tag> for destinations inside the
            application and <Tag severity="secondary"><code>&lt;a&gt;</code></Tag> for external
            destinations. Use a Button when the interaction changes data or opens an interface
            without navigating.
          </p>
          <p class="leading-relaxed text-muted-color">
            Links use primary text, an underline with a four-pixel offset, and the shared focus
            indicator. Entity references such as order numbers add
            <Tag severity="secondary"><code>font-medium</code></Tag
            >.
          </p>
          <p class="leading-relaxed text-muted-color">
            PrimeVue Button supports navigation without losing link semantics. Use
            <Tag severity="secondary"><code>asChild</code></Tag> with an anchor or RouterLink so the
            child owns navigation attributes. Add
            <Tag severity="secondary"><code>variant="link"</code></Tag> when navigation should look
            like a text link. A Button with only
            <Tag severity="secondary"><code>variant="link"</code></Tag> remains a button and is for
            quiet actions rather than navigation.
          </p>
        </section>

        <section id="link-examples" class="flex scroll-mt-24 flex-col gap-4">
          <h2 class="text-2xl font-medium">Examples</h2>
          <p class="leading-relaxed text-muted-color">
            Inline links remain the same weight as surrounding text. Entity links use medium weight.
            External links name the new-tab behaviour for screen readers. The final row demonstrates
            PrimeVue anchor, RouterLink, and button semantics.
          </p>
          <CodeExample title="Link patterns" :code="exampleCode"><LinkExample /></CodeExample>
        </section>

        <section id="link-accessibility" class="flex scroll-mt-24 flex-col gap-4">
          <h2 class="text-2xl font-medium">Accessibility</h2>
          <p class="leading-relaxed text-muted-color">
            Keep links underlined so colour is not the only visual cue. Preserve a visible keyboard
            focus indicator and write labels that identify the destination. If a link opens a new
            tab, show an external-link icon and include hidden explanatory text.
          </p>
          <p class="leading-relaxed text-muted-color">
            Do not create disabled links. Show unavailable navigation as plain text or omit it until
            the destination is available.
          </p>
        </section>
      </div>
    </div>

    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
