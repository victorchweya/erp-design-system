<script setup lang="ts">
import { shallowRef } from 'vue'
import ArrowLeft from '@primeicons/vue/arrow-left'
import Box from '@primeicons/vue/box'
import Check from '@primeicons/vue/check'
import File from '@primeicons/vue/file'
import Images from '@primeicons/vue/images'
import Pencil from '@primeicons/vue/pencil'
import Search from '@primeicons/vue/search'
import SlidersH from '@primeicons/vue/sliders-h'
import Star from '@primeicons/vue/star'

const activeTab = shallowRef('attributes')
const activeMedia = shallowRef(0)
const activityPeriod = shallowRef('Week')
const attributeFilter = shallowRef('All 10')
const attributeSearch = shallowRef('')
const feedback = shallowRef('')

const activityPeriods = ['Day', 'Week', 'Month']
const attributeFilters = ['All 10', 'Required 6', 'Missing 1', 'Localized 4']
const activity = [42, 58, 46, 72, 64, 84, 56, 76, 68, 92, 74, 88]

const productMedia = [
  { label: 'Front view', tone: 'bg-primary-50 dark:bg-primary-950/40' },
  { label: 'Side view', tone: 'bg-ftf-yellow-100 dark:bg-surface-800' },
  { label: 'Open carton', tone: 'bg-surface-100 dark:bg-surface-800' },
  { label: 'Product label', tone: 'bg-primary-100 dark:bg-primary-950/60' },
  { label: 'Packaging', tone: 'bg-surface-200 dark:bg-surface-700' },
]

const attributes = [
  ['Product name', 'Fresh Hass avocado'],
  ['Category', 'Fresh produce · Fruit'],
  ['Grade', 'Class 1'],
  ['Country of origin', 'Kenya'],
  ['Unit of measure', '4 kg carton'],
  ['Shelf life', '14 days'],
]

const inventory = [
  ['Nairobi hub', '184 cartons'],
  ['Mombasa hub', '72 cartons'],
  ['Committed', '48 cartons'],
  ['Available', '208 cartons'],
]

const workflow = [
  { label: 'Product information', complete: true },
  { label: 'Pricing and tax', complete: true },
  { label: 'Supplier assignment', complete: true },
  { label: 'Quality approval', complete: false },
]
// The first incomplete step is the one in progress now.
const currentStep = workflow.findIndex(({ complete }) => !complete)
</script>

<template>
  <section
    class="product-detail flex min-w-0 flex-col gap-4 text-color"
    aria-labelledby="product-title"
  >
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div class="min-w-0 flex-1 basis-64 space-y-3">
        <div class="flex flex-wrap items-center gap-3">
          <Button
            v-tooltip.bottom="'Back to products'"
            type="button"
            severity="secondary"
            text
            size="small"
            iconOnly
            aria-label="Back to products"
            @click="feedback = 'Back to products selected in this preview.'"
          >
            <ArrowLeft aria-hidden="true" />
          </Button>
          <h1 id="product-title" class="text-xl font-medium tracking-tight sm:text-2xl">
            Fresh Hass avocado
          </h1>
          <Tag value="Active" class="bg-primary text-primary-contrast" />
        </div>
        <dl class="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          <div class="flex flex-wrap gap-x-2">
            <dt class="text-muted">Category:</dt>
            <dd>Fresh produce</dd>
          </div>
          <div class="flex flex-wrap gap-x-2">
            <dt class="text-muted">SKU:</dt>
            <dd>FTF-AVO-4KG</dd>
          </div>
          <div class="flex flex-wrap gap-x-2">
            <dt class="text-muted">Updated:</dt>
            <dd><time datetime="2026-11-18">18 Nov 2026</time></dd>
          </div>
          <div class="flex flex-wrap gap-x-2">
            <dt class="text-muted">Last updated by:</dt>
            <dd>Amina Hassan</dd>
          </div>
        </dl>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <Button type="button" @click="feedback = 'Edit product selected in this preview.'">
          <Pencil aria-hidden="true" />
          Edit product
        </Button>
      </div>
    </header>

    <p role="status" class="text-sm text-primary" :class="{ 'sr-only': !feedback }">
      {{ feedback }}
    </p>

    <div class="product-layout grid min-w-0 items-start gap-4">
      <aside class="flex min-w-0 flex-col gap-4" aria-label="Product summary">
        <div class="flex items-center justify-between gap-3">
          <h2 class="font-medium">Product overview</h2>
          <span class="text-xs text-muted">{{ activeMedia + 1 }} of {{ productMedia.length }}</span>
        </div>
        <Card>
          <template #header>
            <div class="relative m-4 mb-0 overflow-hidden rounded-lg">
              <Galleria
                v-model:activeIndex="activeMedia"
                :value="productMedia"
                :numVisible="5"
                :showThumbnailNavigators="false"
                circular
                aria-label="Product media"
              >
                <template #item="{ item }">
                  <div
                    :class="[
                      item.tone,
                      'flex aspect-[4/3] w-full flex-col items-center justify-center gap-3',
                    ]"
                    role="img"
                    :aria-label="item.label"
                  >
                    <Box :size="72" class="text-primary-600" aria-hidden="true" />
                    <span class="text-xs font-medium text-muted">{{ item.label }}</span>
                  </div>
                </template>
                <template #thumbnail="{ item }">
                  <div
                    :class="[item.tone, 'flex size-11 items-center justify-center rounded-md']"
                    :aria-label="item.label"
                  >
                    <Box :size="20" class="text-primary-600" aria-hidden="true" />
                  </div>
                </template>
              </Galleria>
              <div class="absolute right-2 top-2 z-10">
                <Button
                  type="button"
                  severity="secondary"
                  iconOnly
                  aria-label="Add product to favourites"
                  @click="feedback = 'Product added to favourites in this preview.'"
                >
                  <Star aria-hidden="true" />
                </Button>
              </div>
            </div>
          </template>
          <template #title><h3 class="text-lg font-medium">Fresh Hass avocado</h3></template>
          <template #subtitle>Premium export grade</template>
          <template #content>
            <div class="flex flex-col gap-4">
              <div class="flex flex-wrap gap-2">
                <Tag value="Active" severity="success" />
                <Tag value="Fresh produce" severity="secondary" />
              </div>
              <dl class="flex flex-col gap-3 border-t border-surface pt-4 text-sm">
                <div class="flex justify-between gap-3">
                  <dt class="text-muted">SKU</dt>
                  <dd class="font-medium">FTF-AVO-4KG</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-muted">Barcode</dt>
                  <dd class="font-medium tabular-nums">616110057428</dd>
                </div>
                <div class="flex justify-between gap-3">
                  <dt class="text-muted">Owner</dt>
                  <dd class="font-medium">Amina Hassan</dd>
                </div>
              </dl>
              <div class="flex flex-col gap-2 border-t border-surface pt-4">
                <div class="flex items-center justify-between gap-3 text-sm">
                  <span class="text-muted">Product completeness</span>
                  <span class="font-medium">83%</span>
                </div>
                <ProgressBar
                  :value="83"
                  :showValue="false"
                  :dt="{ height: '0.5rem' }"
                  aria-label="Product completeness, 83 percent"
                />
              </div>
              <div class="flex flex-col gap-2 border-t border-surface pt-4">
                <p class="text-xs text-muted">Taxonomy</p>
                <div class="flex flex-wrap gap-2">
                  <Tag value="Fruit" severity="secondary" />
                  <Tag value="Avocado" severity="secondary" />
                  <Tag value="Export grade" severity="secondary" />
                </div>
              </div>
              <div
                class="flex items-center justify-between gap-3 border-t border-surface pt-4 text-sm"
              >
                <span class="text-muted">Created by</span>
                <span class="font-medium">Amina Hassan</span>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="grid grid-cols-2 gap-2">
              <Button type="button" label="Edit details" severity="secondary" outlined />
              <Button type="button" label="Export" severity="secondary" outlined />
            </div>
          </template>
        </Card>
      </aside>

      <main class="flex min-w-0 flex-col gap-4">
        <Card>
          <template #title>
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="text-lg font-medium">Product activity</h3>
              <SelectButton
                v-model="activityPeriod"
                :options="activityPeriods"
                size="small"
                aria-label="Activity period"
              />
            </div>
          </template>
          <template #content>
            <div class="flex flex-col gap-4">
              <div class="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <p class="text-3xl font-medium tabular-nums">128</p>
                  <p class="text-xs text-muted">Updates across product information</p>
                </div>
                <Tag value="+16% from last month" severity="success" />
              </div>
              <div
                class="flex h-28 items-end gap-2 border-b border-surface"
                aria-label="Product updates by week"
              >
                <span
                  v-for="(height, index) in activity"
                  :key="index"
                  class="min-w-1 flex-1 rounded-t-sm bg-primary-500"
                  :style="{ height: `${height}%`, opacity: String(0.5 + index / 24) }"
                />
              </div>
              <div class="flex justify-between text-xs text-muted">
                <span>22 Oct</span><span>5 Nov</span><span>Today</span>
              </div>
            </div>
            <div class="border-t border-surface pt-4">
              <div class="mb-4 flex flex-col gap-1">
                <h3 class="text-lg font-medium">Product information</h3>
                <p class="text-sm text-muted">Core commercial and operational details.</p>
              </div>
              <Tabs v-model:value="activeTab" scrollable>
                <TabList aria-label="Product information sections">
                  <Tab value="pricing" class="flex items-center gap-2!">
                    <File aria-hidden="true" />
                    Summary
                  </Tab>
                  <Tab value="attributes" class="flex items-center gap-2!">
                    <SlidersH aria-hidden="true" />
                    Attributes
                  </Tab>
                  <Tab value="inventory" class="flex items-center gap-2!">
                    <Images aria-hidden="true" />
                    Assets
                  </Tab>
                  <Tab value="suppliers" class="flex items-center gap-2!">
                    <Box aria-hidden="true" />
                    Variants
                  </Tab>
                </TabList>
                <TabPanels>
                  <TabPanel value="attributes">
                    <div class="flex flex-col gap-4">
                      <div class="flex flex-wrap gap-2">
                        <IconField class="min-w-52 flex-1">
                          <InputIcon><Search aria-hidden="true" /></InputIcon>
                          <InputText
                            v-model="attributeSearch"
                            placeholder="Search attributes"
                            aria-label="Search product attributes"
                            fluid
                          />
                        </IconField>
                        <Button type="button" label="Refine" severity="secondary" outlined>
                          <template #icon="{ class: iconClass }">
                            <SlidersH :class="iconClass" aria-hidden="true" />
                          </template>
                        </Button>
                      </div>
                      <SelectButton
                        v-model="attributeFilter"
                        :options="attributeFilters"
                        size="small"
                        aria-label="Filter attributes"
                      />
                      <section
                        class="overflow-hidden rounded-lg border border-surface"
                        aria-labelledby="general-attributes"
                      >
                        <h4
                          id="general-attributes"
                          class="border-b border-surface px-4 py-3 font-medium"
                        >
                          General
                        </h4>
                        <dl class="attribute-grid grid">
                          <div
                            v-for="attribute in attributes"
                            :key="attribute[0]"
                            class="flex min-w-0 flex-col gap-1 border-b border-surface p-4"
                          >
                            <dt class="text-xs text-muted">{{ attribute[0] }}</dt>
                            <dd class="text-sm font-medium">{{ attribute[1] }}</dd>
                          </div>
                        </dl>
                      </section>
                      <section
                        class="overflow-hidden rounded-lg border border-surface"
                        aria-labelledby="specification-attributes"
                      >
                        <h4
                          id="specification-attributes"
                          class="border-b border-surface px-4 py-3 font-medium"
                        >
                          Specifications
                        </h4>
                        <dl class="attribute-grid grid">
                          <div class="flex flex-col gap-1 border-b border-surface p-4">
                            <dt class="text-xs text-muted">Variety</dt>
                            <dd class="text-sm font-medium">Hass</dd>
                          </div>
                          <div class="flex flex-col gap-1 border-b border-surface p-4">
                            <dt class="text-xs text-muted">Size count</dt>
                            <dd class="text-sm font-medium">18–24 fruit</dd>
                          </div>
                          <div class="flex flex-col gap-1 border-b border-surface p-4">
                            <dt class="text-xs text-muted">Packaging</dt>
                            <dd class="text-sm font-medium">Recyclable carton</dd>
                          </div>
                          <div class="flex flex-col gap-1 border-b border-surface p-4">
                            <dt class="text-xs text-muted">Storage</dt>
                            <dd class="text-sm font-medium">5–8°C</dd>
                          </div>
                        </dl>
                      </section>
                    </div>
                  </TabPanel>
                  <TabPanel value="pricing">
                    <dl class="grid gap-4 sm:grid-cols-2">
                      <div class="flex flex-col gap-1">
                        <dt class="text-xs text-muted">Selling price</dt>
                        <dd class="font-medium">Ksh 1,280 / carton</dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt class="text-xs text-muted">Average cost</dt>
                        <dd class="font-medium">Ksh 890 / carton</dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt class="text-xs text-muted">Tax category</dt>
                        <dd class="font-medium">Zero rated</dd>
                      </div>
                      <div class="flex flex-col gap-1">
                        <dt class="text-xs text-muted">Price list</dt>
                        <dd class="font-medium">Wholesale 2026</dd>
                      </div>
                    </dl>
                  </TabPanel>
                  <TabPanel value="inventory">
                    <dl class="grid gap-3 sm:grid-cols-2">
                      <div
                        v-for="item in inventory"
                        :key="item[0]"
                        class="rounded-lg border border-surface p-4"
                      >
                        <dt class="text-xs text-muted">{{ item[0] }}</dt>
                        <dd class="mt-1 text-lg font-medium tabular-nums">{{ item[1] }}</dd>
                      </div>
                    </dl>
                  </TabPanel>
                  <TabPanel value="suppliers">
                    <div class="flex flex-col gap-3">
                      <div class="rounded-lg border border-surface p-4">
                        <p class="font-medium">Kakuzi Produce Limited</p>
                        <p class="mt-1 text-sm text-muted">Primary supplier · 5-day lead time</p>
                      </div>
                      <div class="rounded-lg border border-surface p-4">
                        <p class="font-medium">Murang’a Growers Cooperative</p>
                        <p class="mt-1 text-sm text-muted">Backup supplier · 7-day lead time</p>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </div>
          </template>
        </Card>
      </main>

      <aside class="flex min-w-0 flex-col gap-4" aria-label="Product status">
        <Card>
          <template #title><h3 class="text-lg font-medium">Workflow health</h3></template>
          <template #subtitle>Current product setup cycle.</template>
          <template #content>
            <div class="flex flex-col gap-4">
              <ProgressBar
                :value="75"
                :showValue="false"
                :dt="{ height: '0.5rem' }"
                aria-label="Workflow completion, 75 percent"
              />
              <dl class="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <dt class="text-xs text-muted">Review</dt>
                  <dd class="mt-1 font-medium">6.8 h</dd>
                </div>
                <div>
                  <dt class="text-xs text-muted">Setup</dt>
                  <dd class="mt-1 font-medium">12.5 h</dd>
                </div>
                <div>
                  <dt class="text-xs text-muted">Waiting</dt>
                  <dd class="mt-1 font-medium">4.5 h</dd>
                </div>
              </dl>
              <div class="border-t border-surface pt-4">
                <p class="text-xs text-muted">Average cycle time</p>
                <p class="mt-1 text-2xl font-medium tabular-nums">23.8 h</p>
              </div>
            </div>
          </template>
        </Card>

        <Card>
          <template #title><h3 class="text-lg font-medium">Setup progress</h3></template>
          <template #subtitle>3 of 4 steps completed.</template>
          <template #content>
            <ol class="flex flex-col gap-4">
              <li
                v-for="(step, index) in workflow"
                :key="step.label"
                class="flex items-center gap-3 text-sm"
                :aria-current="index === currentStep ? 'step' : undefined"
              >
                <span
                  :class="[
                    'flex size-6 shrink-0 items-center justify-center rounded-full',
                    step.complete
                      ? 'border border-primary bg-primary text-primary-contrast'
                      : index === currentStep
                        ? 'border-2 border-live'
                        : 'border border-surface text-muted',
                  ]"
                >
                  <Check v-if="step.complete" :size="12" aria-hidden="true" />
                  <span
                    v-else-if="index === currentStep"
                    class="size-2 rounded-full bg-live"
                    aria-hidden="true"
                  />
                  <span v-else class="size-1.5 rounded-full bg-current" aria-hidden="true" />
                </span>
                <span
                  :class="{
                    'font-medium': step.complete || index === currentStep,
                    'text-live': index === currentStep,
                    'text-muted': !step.complete && index !== currentStep,
                  }"
                  >{{ step.label }}</span
                >
              </li>
            </ol>
          </template>
          <template #footer>
            <div class="flex flex-col gap-2">
              <Textarea
                rows="3"
                fluid
                placeholder="Add a review comment"
                aria-label="Review comment"
              />
              <div class="grid grid-cols-2 gap-2">
                <Button type="button" label="Reject" severity="danger" outlined />
                <Button
                  type="button"
                  label="Approve step"
                  @click="feedback = 'Quality step approved in preview.'"
                />
              </div>
            </div>
          </template>
        </Card>
      </aside>
    </div>
  </section>
</template>

<style scoped>
.product-detail {
  container-type: inline-size;
}

@container (min-width: 44rem) {
  .attribute-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .attribute-grid > div:nth-child(odd) {
    border-right: 1px solid var(--p-content-border-color);
  }
}

@container (min-width: 56rem) {
  .product-layout {
    grid-template-columns: minmax(12rem, 0.7fr) minmax(24rem, 1.8fr) minmax(14rem, 0.8fr);
  }
}
</style>
