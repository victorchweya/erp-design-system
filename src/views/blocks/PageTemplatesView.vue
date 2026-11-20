<script setup lang="ts">
import { reactive, type Component } from 'vue'
import AnchorNav from '@/components/AnchorNav.vue'
import CodeExample from '@/components/CodeExample.vue'
import { useActiveSection } from '@/composables/useActiveSection'
import SupplierListDetailBlock from '@/components/blocks/page-templates/SupplierListDetailBlock.vue'
import supplierBlockCode from '@/components/blocks/page-templates/SupplierListDetailBlock.vue?raw'
import supplierListCode from '@/components/blocks/page-templates/SupplierListPanel.vue?raw'
import supplierDetailCode from '@/components/blocks/page-templates/SupplierDetailPanel.vue?raw'
import supplierEditCode from '@/components/blocks/page-templates/SupplierEditDrawer.vue?raw'
import suppliersCode from '@/components/blocks/page-templates/suppliers.ts?raw'
import OperationsDashboardBlock from '@/components/blocks/page-templates/OperationsDashboardBlock.vue'
import dashboardBlockCode from '@/components/blocks/page-templates/OperationsDashboardBlock.vue?raw'
import recentOrdersCode from '@/components/blocks/page-templates/DashboardRecentOrders.vue?raw'
import tasksPanelCode from '@/components/blocks/page-templates/DashboardTasksPanel.vue?raw'
import dashboardDataCode from '@/components/blocks/page-templates/dashboard.ts?raw'
import kpiGroupCode from '@/components/blocks/metrics/KpiGroupBlock.vue?raw'
import trendChartCode from '@/components/blocks/charts/TrendChartBlock.vue?raw'
import compositionChartCode from '@/components/blocks/charts/CompositionChartBlock.vue?raw'
import SettingsPageBlock from '@/components/blocks/page-templates/SettingsPageBlock.vue'
import settingsBlockCode from '@/components/blocks/page-templates/SettingsPageBlock.vue?raw'
import profileFormCode from '@/components/blocks/page-templates/SettingsProfileForm.vue?raw'
import notificationsCode from '@/components/blocks/page-templates/SettingsNotifications.vue?raw'
import dangerZoneCode from '@/components/blocks/page-templates/SettingsDangerZone.vue?raw'
import settingsDataCode from '@/components/blocks/page-templates/settings.ts?raw'

interface SourceFile {
  name: string
  code: string
}

const examples: {
  id: string
  title: string
  description: string
  component: Component
  files: SourceFile[]
}[] = [
  {
    id: 'list-detail-edit',
    title: 'List, detail, and edit',
    description:
      'Search suppliers, open one to review its overview, orders, and activity, then edit it in a drawer. Changes apply only on save, and cancelling with unsaved edits asks for confirmation.',
    component: SupplierListDetailBlock,
    files: [
      { name: 'SupplierListDetailBlock.vue', code: supplierBlockCode },
      { name: 'SupplierListPanel.vue', code: supplierListCode },
      { name: 'SupplierDetailPanel.vue', code: supplierDetailCode },
      { name: 'SupplierEditDrawer.vue', code: supplierEditCode },
      { name: 'suppliers.ts', code: suppliersCode },
    ],
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    description:
      'An operations overview with date range and filters, KPIs, two charts, recent orders, and alerts and tasks. Columns stack when the container is narrow.',
    component: OperationsDashboardBlock,
    files: [
      { name: 'OperationsDashboardBlock.vue', code: dashboardBlockCode },
      { name: 'DashboardRecentOrders.vue', code: recentOrdersCode },
      { name: 'DashboardTasksPanel.vue', code: tasksPanelCode },
      { name: 'dashboard.ts', code: dashboardDataCode },
      { name: 'metrics/KpiGroupBlock.vue', code: kpiGroupCode },
      { name: 'charts/TrendChartBlock.vue', code: trendChartCode },
      { name: 'charts/CompositionChartBlock.vue', code: compositionChartCode },
    ],
  },
  {
    id: 'settings',
    title: 'Settings',
    description:
      'Section navigation with a company profile form, notification toggles, and a confirmed danger-zone action. A save bar appears only when there are unsaved changes.',
    component: SettingsPageBlock,
    files: [
      { name: 'SettingsPageBlock.vue', code: settingsBlockCode },
      { name: 'SettingsProfileForm.vue', code: profileFormCode },
      { name: 'SettingsNotifications.vue', code: notificationsCode },
      { name: 'SettingsDangerZone.vue', code: dangerZoneCode },
      { name: 'settings.ts', code: settingsDataCode },
    ],
  },
]
const selectedFiles = reactive<Record<string, string>>(
  Object.fromEntries(examples.map(({ id, files }) => [id, files[0]!.name])),
)
const sections = [
  { id: 'how-to-use', label: 'How to use' },
  ...examples.map(({ id, title }) => ({ id, label: title })),
]
const activeSection = useActiveSection(sections.map(({ id }) => id))

function sourceOf(example: (typeof examples)[number]) {
  return example.files.find(({ name }) => name === selectedFiles[example.id]) ?? example.files[0]!
}
</script>

<template>
  <div class="mx-auto flex w-full max-w-screen-xl gap-10 px-4 py-10 text-sm">
    <div class="min-w-0 flex-1">
      <header class="mb-8 flex flex-col gap-3">
        <p class="font-medium uppercase tracking-wide text-primary">UI blocks</p>
        <h1 class="text-3xl font-medium tracking-tight sm:text-4xl">Page templates</h1>
        <p class="text-base leading-relaxed text-muted">
          Starting points for common ERP pages: a record list with detail and edit, an operations
          dashboard, and a settings page. Each combines existing blocks and standard components.
        </p>
      </header>
      <AnchorNav :items="sections" :active-id="activeSection" inline class="mb-8 xl:hidden" />
      <div class="flex flex-col gap-12">
        <section
          id="how-to-use"
          aria-labelledby="templates-usage-title"
          class="flex scroll-mt-24 flex-col gap-4"
        >
          <h2 id="templates-usage-title" class="text-2xl font-medium">How to use</h2>
          <p class="leading-relaxed text-muted">
            Switch to <Tag severity="secondary">Code</Tag> and use
            <Tag severity="secondary">Source file</Tag> to copy every file a template needs. Files
            in the same template sit in one folder; the dashboard also reuses the KPI group and
            chart blocks from their existing folders.
          </p>
          <p class="leading-relaxed text-muted">
            Templates keep their state locally. The supplier template switches between list and
            detail without changing the URL; use routes for these views in the ERP so they can be
            bookmarked and opened with the browser’s back button. Focus moves to each new view’s
            heading and returns to the row or button that opened it.
          </p>
          <p class="leading-relaxed text-muted">
            In the dashboard, filters apply to recent orders only; KPIs and charts show static
            sample data. Connect suppliers, orders, metrics, settings, and save actions to your
            services before use.
          </p>
        </section>
        <section
          v-for="example in examples"
          :id="example.id"
          :key="example.id"
          :aria-labelledby="`${example.id}-title`"
          class="flex min-w-0 scroll-mt-24 flex-col gap-4"
        >
          <div class="flex flex-wrap items-end justify-between gap-4">
            <h2 :id="`${example.id}-title`" class="text-2xl font-medium">{{ example.title }}</h2>
            <div class="flex min-w-0 flex-col gap-1">
              <label :for="`${example.id}-source`" class="font-medium">Source file</label>
              <Select
                v-model="selectedFiles[example.id]"
                :inputId="`${example.id}-source`"
                :options="example.files"
                optionLabel="name"
                optionValue="name"
                size="small"
              />
            </div>
          </div>
          <p class="leading-relaxed text-muted">{{ example.description }}</p>
          <CodeExample
            :title="sourceOf(example).name"
            :code="sourceOf(example).code"
            :language="sourceOf(example).name.endsWith('.ts') ? 'TypeScript' : 'Vue'"
            tabbed
            mobilePreview
          >
            <component :is="example.component" />
          </CodeExample>
        </section>
      </div>
    </div>
    <aside class="hidden w-48 shrink-0 xl:block">
      <AnchorNav :items="sections" :active-id="activeSection" class="sticky top-24" />
    </aside>
  </div>
</template>
