<script setup lang="ts">
import AnchorNav from '@/components/AnchorNav.vue'
import DataVizChartExample from '@/components/foundations/data-viz/DataVizChartExample.vue'
import DataVizChartGuide from '@/components/foundations/data-viz/DataVizChartGuide.vue'
import DataVizSwatches from '@/components/foundations/data-viz/DataVizSwatches.vue'
import {
  categoricalSwatches,
  sequentialSwatches,
  statusSwatches,
} from '@/components/foundations/data-viz/data-viz'
import { useActiveSection } from '@/composables/useActiveSection'

const sections = [
  { id: 'dataviz-how-to-use', label: 'How to use' },
  { id: 'dataviz-categorical', label: 'Categorical colours' },
  { id: 'dataviz-sequential', label: 'Sequential colours' },
  { id: 'dataviz-status', label: 'Status colours' },
  { id: 'dataviz-chart-types', label: 'Choosing a chart' },
  { id: 'dataviz-text-alternatives', label: 'Text alternatives' },
  { id: 'dataviz-dark-mode', label: 'Dark mode' },
]
const activeSection = useActiveSection(sections.map(({ id }) => id))
</script>

<template>
  <div class="mx-auto flex w-full max-w-7xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">Foundations</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Data visualization</h1>
        <p class="text-base leading-relaxed text-muted-color">
          Build charts with PrimeVue Chart and the shared chart theme so series colours, axes, and
          text alternatives stay consistent across FTF reports.
        </p>
      </header>

      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />

      <div class="flex flex-col gap-12">
        <section
          id="dataviz-how-to-use"
          aria-labelledby="dataviz-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="dataviz-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted-color">
            Call
            <Tag severity="secondary" class="align-baseline"><code>useChartTheme()</code></Tag>
            from
            <Tag severity="secondary" class="align-baseline"
              ><code>@/composables/useChartTheme</code></Tag
            >
            and build the chart’s data and options as computed values. Use
            <code>kale</code>, <code>carrot</code>, <code>lime</code>, and <code>tamarind</code> for
            series, <code>text</code> for legends, <code>muted</code> for ticks, and
            <code>border</code> for grid lines.
          </p>
          <p class="leading-relaxed text-muted-color">
            Give every chart a title, a subtitle with the period and unit, and a text alternative.
          </p>
          <DataVizChartExample />
        </section>

        <section
          id="dataviz-categorical"
          aria-labelledby="dataviz-categorical-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="dataviz-categorical-title" class="text-2xl font-medium">Categorical colours</h2>
          <p class="leading-relaxed text-muted-color">
            Assign series in this order. They are the core FTF colours, Kale, Carrot, Lime, and
            Tamarind, read from <code>useChartTheme</code>. Most charts need only the first two.
          </p>
          <DataVizSwatches :swatches="categoricalSwatches" label="Series colours" />
          <p class="leading-relaxed text-muted-color">
            Each series colour reaches at least 3:1 against the chart surface in light and dark
            mode, so some differ from the brand swatches: Lime and Carrot are too light for white
            and use darker steps in light mode, and Tamarind uses a lighter step so it doesn’t blend
            with Kale. Dark mode uses the brand Lime itself. Still pair series with a legend, direct
            labels, or a pattern so colour is never the only cue. Translucent fills fall below 3:1;
            when the area, radar, polar area, and bubble blocks add transparency, they keep a solid
            line or border in the series colour. Group anything beyond four series as “Other”.
          </p>
        </section>

        <section
          id="dataviz-sequential"
          aria-labelledby="dataviz-sequential-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="dataviz-sequential-title" class="text-2xl font-medium">Sequential colours</h2>
          <p class="leading-relaxed text-muted-color">
            Recommendation: for ordered values such as heat maps or volume bands, use one hue from
            the green ramp in
            <code>palette.ts</code>. Map low values to light shades and high values to dark shades.
            The lightest steps are faint on white, so show values or borders with them.
          </p>
          <DataVizSwatches :swatches="sequentialSwatches" label="Sequential green ramp" />
        </section>

        <section
          id="dataviz-status"
          aria-labelledby="dataviz-status-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="dataviz-status-title" class="text-2xl font-medium">Status colours</h2>
          <p class="leading-relaxed text-muted-color">
            Use the semantic severity tokens only when a series is itself an outcome, such as
            on-time and late deliveries. Do not use them for ordinary categories. They adapt to dark
            mode but are not part of <code>useChartTheme</code> yet; read them the same way when a
            chart needs them.
          </p>
          <DataVizSwatches :swatches="statusSwatches" label="Status colours" />
        </section>

        <section
          id="dataviz-chart-types"
          aria-labelledby="dataviz-chart-types-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="dataviz-chart-types-title" class="text-2xl font-medium">Choosing a chart</h2>
          <p class="leading-relaxed text-muted-color">
            Start from the question the reader is asking. When a table answers it better, use a
            table.
          </p>
          <DataVizChartGuide />
        </section>

        <section
          id="dataviz-text-alternatives"
          aria-labelledby="dataviz-text-alternatives-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="dataviz-text-alternatives-title" class="text-2xl font-medium">
            Text alternatives
          </h2>
          <p class="leading-relaxed text-muted-color">
            Charts render to a canvas, so screen readers need the content in text. Every chart block
            uses the same two parts:
          </p>
          <ul class="list-disc space-y-2 pl-5 text-muted-color">
            <li>
              <Tag severity="secondary" class="align-baseline"><code>canvasProps</code></Tag>
              sets <code>role="img"</code> and an <code>aria-label</code> that states the main
              finding, such as “Monthly revenue increased from Ksh 12.4 million in June to Ksh 21.4
              million in November.”
            </li>
            <li>
              PrimeVue Chart renders only its canvas and drops content placed inside
              <code>&lt;Chart&gt;</code>, so place the alternative directly after the chart as a
              sibling. Use a <code>sr-only</code> table with a caption and row headers when readers
              need exact values, as the area, bar, stacked, and doughnut blocks do. Use a
              <code>sr-only</code> summary paragraph when the pattern matters more than each value.
            </li>
            <li>Keep the visible title and subtitle in the card, including the period and unit.</li>
          </ul>
        </section>

        <section
          id="dataviz-dark-mode"
          aria-labelledby="dataviz-dark-mode-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="dataviz-dark-mode-title" class="text-2xl font-medium">Dark mode</h2>
          <p class="leading-relaxed text-muted-color">
            <code>useChartTheme</code> reads the CSS variables again whenever the colour mode
            changes, so charts built from its computed values update without a reload. Every series
            colour, and the text, muted, and border values, change with the mode.
          </p>
          <p class="leading-relaxed text-muted-color">
            Do not copy hex values into chart options; they will not follow the mode.
          </p>
        </section>
      </div>
    </div>

    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
