<script setup lang="ts">
import { RouterLink } from 'vue-router'
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import AccessibilityContrast from '@/components/foundations/accessibility/AccessibilityContrast.vue'
import AccessibilityKeyboard from '@/components/foundations/accessibility/AccessibilityKeyboard.vue'
import AccessibleFieldErrorExample from '@/components/foundations/accessibility/examples/AccessibleFieldErrorExample.vue'
import fieldErrorCode from '@/components/foundations/accessibility/examples/AccessibleFieldErrorExample.vue?raw'
import AccessibleIconButtonExample from '@/components/foundations/accessibility/examples/AccessibleIconButtonExample.vue'
import iconButtonCode from '@/components/foundations/accessibility/examples/AccessibleIconButtonExample.vue?raw'
import { useActiveSection } from '@/composables/useActiveSection'
import { semantic } from '@/theme/erp-theme/base'
import { controlSizes } from '@/theme/erp-theme/foundations/controls'
import { spacing } from '@/theme/erp-theme/foundations/spacing'
import { fontSizes } from '@/theme/erp-theme/foundations/typography'

const sections = [
  { id: 'a11y-target', label: 'Target' },
  { id: 'a11y-contrast', label: 'Colour contrast' },
  { id: 'a11y-focus', label: 'Focus' },
  { id: 'a11y-keyboard', label: 'Keyboard' },
  { id: 'a11y-labels', label: 'Labels & names' },
  { id: 'a11y-forms', label: 'Forms & errors' },
  { id: 'a11y-live', label: 'Live regions' },
  { id: 'a11y-motion', label: 'Motion' },
  { id: 'a11y-targets', label: 'Touch targets' },
  { id: 'a11y-checklist', label: 'Checklist' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
const { focusRing } = semantic
const lineHeight = Number(semantic.typography.lineHeight)
const controlHeights = controlSizes
  .map(({ label, font, y }) => {
    const height =
      parseFloat(fontSizes[font][0]) * 16 * lineHeight + parseFloat(spacing[y]) * 16 * 2 + 2
    return `${label.toLowerCase()} ${Math.round(height)}px`
  })
  .join(', ')
const chipCode = `<Chip
  :label="filter"
  removable
  :pt="{ removeIcon: { role: 'button', 'aria-label': \`Remove \${filter}\` } }"
/>`
const reducedMotionCss = `@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}`
const checklist = [
  'Every task works with a keyboard alone, in a logical tab order.',
  'Focus is always visible and never hidden behind sticky headers or the topbar.',
  'Focus returns to the trigger when a Dialog, Drawer, or Popover closes.',
  'Every input, Select, and icon-only button has an accessible name.',
  'Errors use the invalid prop, a text message, and aria-describedby.',
  'Text meets 4.5:1 and essential UI boundaries meet 3:1 in light and dark mode.',
  'Status is never shown by colour alone; add text or an icon with a label.',
  'Saves, imports, and filters announce their result through a status region or Toast.',
  'Pages work at 320px wide and at 200% zoom without losing content.',
  'Animations respect reduced motion.',
  'The page has one h1, ordered headings, and a descriptive title.',
]
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Accessibility</h1>
        <p class="text-base leading-relaxed text-muted-color">
          FTF products must work for everyone who runs the business, whether they use a keyboard, a
          screen reader, zoom, or a phone in the field.
        </p>
      </header>

      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section
          id="a11y-target"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-target-title"
        >
          <h2 id="a11y-target-title" class="text-2xl font-medium">Target</h2>
          <p class="leading-relaxed text-muted-color">
            Meet <strong class="font-medium text-color">WCAG 2.2 level AA</strong>. PrimeVue
            components provide roles, ARIA states, and keyboard support; product code is responsible
            for names, labels, error text, focus return, and content.
          </p>
        </section>

        <section
          id="a11y-contrast"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-contrast-title"
        >
          <h2 id="a11y-contrast-title" class="text-2xl font-medium">Colour contrast</h2>
          <p class="leading-relaxed text-muted-color">
            Body text needs at least 4.5:1. Large text (24px, or 18.5px bold) and essential UI such
            as focus indicators, field boundaries, and icons need 3:1. Use the semantic pairs from
            the
            <RouterLink
              to="/foundations/color"
              class="font-medium text-primary underline-offset-4 hover:underline"
              >Colour</RouterLink
            >
            page rather than mixing palette shades.
          </p>
          <AccessibilityContrast />
        </section>

        <section
          id="a11y-focus"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-focus-title"
        >
          <h2 id="a11y-focus-title" class="text-2xl font-medium">Focus</h2>
          <p class="leading-relaxed text-muted-color">
            The preset draws a
            <Tag severity="secondary" class="align-baseline"
              ><code>{{ focusRing.width }} {{ focusRing.style }} {{ focusRing.color }}</code></Tag
            >
            outline with a
            <Tag severity="secondary" class="align-baseline"
              ><code>{{ focusRing.offset }}</code></Tag
            >
            offset on keyboard focus. Form fields show focus by changing their border to the primary
            colour.
          </p>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              Never remove outlines with <code class="text-color">outline: none</code> unless an
              equally visible replacement is in place.
            </li>
            <li>
              Restore focus to the trigger when a Dialog or Drawer closes. PrimeVue does not do this
              automatically; the FTF blocks store the trigger and call
              <code class="text-color">focus()</code> on
              <code class="text-color">@after-hide</code>.
            </li>
            <li>Move focus to the first invalid field after a failed submit.</li>
          </ul>
        </section>

        <section
          id="a11y-keyboard"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-keyboard-title"
        >
          <h2 id="a11y-keyboard-title" class="text-2xl font-medium">Keyboard</h2>
          <p class="leading-relaxed text-muted-color">
            Use the PrimeVue component instead of rebuilding a widget so these patterns come for
            free. Custom controls must use native buttons and links, or match the ARIA pattern for
            the role.
          </p>
          <AccessibilityKeyboard />
        </section>

        <section
          id="a11y-labels"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-labels-title"
        >
          <h2 id="a11y-labels-title" class="text-2xl font-medium">Labels &amp; names</h2>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              Give every field a visible label. Placeholders are hints, not labels. Use
              <code class="text-color">for</code>/<code class="text-color">id</code> for inputs and
              <code class="text-color">aria-labelledby</code> for Select and similar widgets.
            </li>
            <li>
              Icon-only buttons need an <code class="text-color">aria-label</code> that names the
              action and the item. Hide the icon with
              <code class="text-color">aria-hidden="true"</code>.
            </li>
            <li>
              When a PrimeVue element has no prop for its name, pass one through
              <code class="text-color">pt</code>, as the Chip remove icon does.
            </li>
          </ul>
          <CodeExample title="Icon-only buttons" :code="iconButtonCode" tabbed>
            <AccessibleIconButtonExample />
          </CodeExample>
          <CodeExample title="Chip remove label" :code="chipCode" />
        </section>

        <section
          id="a11y-forms"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-forms-title"
        >
          <h2 id="a11y-forms-title" class="text-2xl font-medium">Forms &amp; errors</h2>
          <p class="leading-relaxed text-muted-color">
            Set <code class="text-color">invalid</code> on the field so PrimeVue adds
            <code class="text-color">aria-invalid</code> and the red border, show the reason in a
            Message, and link hint and error text with
            <code class="text-color">aria-describedby</code>. Say how to fix the problem, not just
            that it exists.
          </p>
          <CodeExample title="Field error" :code="fieldErrorCode" tabbed>
            <AccessibleFieldErrorExample />
          </CodeExample>
        </section>

        <section
          id="a11y-live"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-live-title"
        >
          <h2 id="a11y-live-title" class="text-2xl font-medium">Live regions</h2>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              Toast and Message use <code class="text-color">role="alert"</code>, which interrupts
              the screen reader. Reserve them for results people must hear now.
            </li>
            <li>
              For routine confirmations, such as a saved record or an updated filter count, render
              the text in an element with <code class="text-color">role="status"</code> that stays
              in the page.
            </li>
            <li>
              Keep the live region mounted and change its text; regions added at the same time as
              their message are often not announced.
            </li>
          </ul>
        </section>

        <section
          id="a11y-motion"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-motion-title"
        >
          <h2 id="a11y-motion-title" class="text-2xl font-medium">Motion</h2>
          <p class="leading-relaxed text-muted-color">
            A global rule in <code class="text-color">main.css</code> shortens animations and
            transitions and disables smooth scrolling when the system asks for reduced motion. Add
            <code class="text-color">motion-reduce:</code> variants for anything it cannot cover,
            such as a spinning icon. See
            <RouterLink
              to="/foundations/motion"
              class="font-medium text-primary underline-offset-4 hover:underline"
              >Motion</RouterLink
            >.
          </p>
          <CodeExample title="Reduced motion" language="CSS" :code="reducedMotionCss" />
        </section>

        <section
          id="a11y-targets"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-targets-title"
        >
          <h2 id="a11y-targets-title" class="text-2xl font-medium">Touch targets</h2>
          <p class="leading-relaxed text-muted-color">
            WCAG 2.2 AA asks for targets of at least 24 × 24px, or enough space around smaller ones.
            FTF controls are {{ controlHeights }} tall, including icon-only buttons.
          </p>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              Checkbox and RadioButton boxes are smaller than 24px. Always pair them with a
              clickable label and keep a <code class="text-color">gap-2</code> or more between
              options.
            </li>
            <li>Use the default or large size for primary actions on phones and tablets.</li>
            <li>Do not place destructive actions directly beside frequent ones.</li>
          </ul>
        </section>

        <section
          id="a11y-checklist"
          class="flex scroll-mt-24 flex-col gap-4"
          aria-labelledby="a11y-checklist-title"
        >
          <h2 id="a11y-checklist-title" class="text-2xl font-medium">Pre-release checklist</h2>
          <ol class="list-decimal space-y-2 pl-5 text-muted-color">
            <li v-for="item in checklist" :key="item">{{ item }}</li>
          </ol>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
