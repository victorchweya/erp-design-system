<script lang="ts">
export type RecordDetailKind = 'text' | 'currency' | 'date' | 'number' | 'link'

export interface RecordDetailItem {
  /** Stable id. Also names the `value-<key>` slot that replaces the rendered value. */
  key: string
  label: string
  /** Empty, null, undefined, and values that cannot be formatted show the fallback. */
  value?: string | number | Date | null
  kind?: RecordDetailKind
  /** Link target for `kind: 'link'`, such as `tel:` or `mailto:`. Defaults to the value. */
  href?: string
  /** Adds a labelled copy button. */
  copyable?: boolean
  /** Spans both columns in the page variant. Use for addresses and notes. */
  wide?: boolean
}

export interface RecordDetailSection {
  id: string
  /** Visible group heading. Leave out for an untitled group. */
  title?: string
  items: RecordDetailItem[]
}

/** `limit: null` means unlimited. */
export interface RecordCreditSummary {
  limit: number | null
  used: number
  title?: string
}
</script>

<script setup lang="ts">
// Goal: scan a record's key facts at a glance, without scrolling.
import { computed, nextTick, onBeforeUnmount, shallowRef, useId } from 'vue'
import Check from '@primeicons/vue/check'
import Copy from '@primeicons/vue/copy'
import { DISPLAY_PLACEHOLDER, formatCurrency, formatDate, formatNumber } from '@/utils/format'

const props = withDefaults(
  defineProps<{
    /** Record name. Without it, the block renders details only. */
    title?: string
    /** Use h1 once per page. Sections below it use the next level. */
    headingTag?: 'h1' | 'h2' | 'h3' | 'h4'
    subtitle?: string
    /** Initials for the avatar, such as `GB`. No avatar without it. */
    initials?: string
    owner?: string
    updatedBy?: string
    /** ISO date or date-time. */
    updatedAt?: string
    sections: RecordDetailSection[]
    credit?: RecordCreditSummary
    /** `sidebar` is a narrow panel with right-aligned values. `page` puts label and value on one line, in two columns from lg. */
    variant?: 'page' | 'sidebar'
    emptyText?: string
    /** Read aloud in place of the visual fallback. */
    emptyLabel?: string
  }>(),
  {
    headingTag: 'h2',
    variant: 'page',
    emptyText: '—',
    emptyLabel: 'Not provided',
  },
)
const emit = defineEmits<{ copied: [item: RecordDetailItem] }>()
defineSlots<{
  /** Status and priority tags beside the title. */
  tags?: () => unknown
  /** Header actions, such as Edit. */
  actions?: () => unknown
  /** Replaces the rendered value of the item with the same key. */
  [slot: `value-${string}`]: (props: {
    item: RecordDetailItem
    text: string | null
    empty: boolean
  }) => unknown
}>()

const uid = useId()
const sidebar = computed(() => props.variant === 'sidebar')
const headingLevel = computed(() => Number(props.headingTag.slice(1)))
const sectionTag = computed(() => `h${Math.min(headingLevel.value + (props.title ? 1 : 0), 6)}`)

function formatValue(item: RecordDetailItem) {
  const { value } = item
  if (value === null || value === undefined || (typeof value === 'string' && !value.trim()))
    return null
  const text =
    item.kind === 'currency'
      ? formatCurrency(value as number | string)
      : item.kind === 'date'
        ? formatDate(value)
        : item.kind === 'number'
          ? formatNumber(value as number | string)
          : String(value)
  return text === DISPLAY_PLACEHOLDER ? null : text
}

// Lower-case ordinary labels ("Invoice number") but keep acronyms ("KRA PIN").
function copyTarget(label: string) {
  return /^[A-Z][a-z]/.test(label) ? label[0]!.toLowerCase() + label.slice(1) : label
}

const rows = computed(() =>
  props.sections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      const text = formatValue(item)
      return {
        item,
        text,
        copyText:
          text === null
            ? null
            : item.value instanceof Date
              ? item.value.toISOString()
              : String(item.value),
        copyTarget: copyTarget(item.label),
      }
    }),
  })),
)

// Subtitle, owner and last update read as one muted line under the title.
const meta = computed(() => {
  const parts: { key: string; text: string; datetime?: string; date?: string }[] = []
  if (props.subtitle) parts.push({ key: 'subtitle', text: props.subtitle })
  if (props.owner) parts.push({ key: 'owner', text: `Owner: ${props.owner}` })
  if (props.updatedBy || props.updatedAt) {
    parts.push({
      key: 'updated',
      text: `Updated${props.updatedBy ? ` by ${props.updatedBy}` : ''}${props.updatedAt ? ' on ' : ''}`,
      datetime: props.updatedAt,
      date: props.updatedAt ? formatDate(props.updatedAt) : undefined,
    })
  }
  return parts
})
// Groups after the header or credit line get a hairline divider.
const dividedFrom = computed(() => (props.title || props.credit ? 0 : 1))

const creditUnlimited = computed(() => props.credit?.limit === null)
const creditPercent = computed(() => {
  const { limit = 0, used = 0 } = props.credit ?? {}
  return limit ? Math.min(Math.round((used / limit) * 100), 100) : 0
})
const creditOver = computed(() => !!props.credit?.limit && props.credit.used > props.credit.limit)
const creditAvailable = computed(() =>
  props.credit?.limit == null ? null : Math.max(props.credit.limit - props.credit.used, 0),
)

const copiedKey = shallowRef('')
const copyStatus = shallowRef<{ kind: 'idle' | 'copied' | 'failed'; message: string }>({
  kind: 'idle',
  message: '',
})
let timer: ReturnType<typeof setTimeout> | undefined
onBeforeUnmount(() => clearTimeout(timer))

async function copy(row: (typeof rows.value)[number]['items'][number]) {
  if (row.copyText === null) return
  clearTimeout(timer)
  // Clear first so repeated copies are announced again.
  copyStatus.value = { kind: 'idle', message: '' }
  await nextTick()
  try {
    await navigator.clipboard.writeText(row.copyText)
    copiedKey.value = row.item.key
    copyStatus.value = { kind: 'copied', message: `${row.item.label} copied` }
    emit('copied', row.item)
    timer = setTimeout(() => {
      copiedKey.value = ''
      copyStatus.value = { kind: 'idle', message: '' }
    }, 3000)
  } catch {
    copiedKey.value = ''
    copyStatus.value = {
      kind: 'failed',
      message: `Couldn’t copy ${row.copyTarget}. Select it and copy it manually.`,
    }
  }
}
</script>
<template>
  <component
    :is="title ? 'section' : 'div'"
    :aria-labelledby="title ? `${uid}-title` : undefined"
    class="flex min-w-0 flex-col gap-3 text-sm text-color"
  >
    <header v-if="title" class="flex flex-wrap items-start justify-between gap-x-4 gap-y-2">
      <div class="flex min-w-0 flex-1 basis-60 items-center gap-3">
        <Avatar
          v-if="initials"
          :label="initials"
          shape="circle"
          aria-hidden="true"
          class="shrink-0"
        />
        <div class="min-w-0">
          <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
            <component
              :is="headingTag"
              :id="`${uid}-title`"
              class="min-w-0 break-words text-lg font-medium"
            >
              {{ title }}
            </component>
            <slot name="tags" />
          </div>
          <p v-if="meta.length" class="flex flex-wrap gap-x-1.5 text-muted">
            <template v-for="(part, index) in meta" :key="part.key">
              <span v-if="index > 0" aria-hidden="true">·</span>
              <span
                >{{ part.text
                }}<template v-if="part.datetime">
                  <time :datetime="part.datetime">{{ part.date }}</time></template
                ></span
              >
            </template>
          </p>
        </div>
      </div>
      <div v-if="$slots.actions" class="flex shrink-0 gap-2"><slot name="actions" /></div>
    </header>

    <section
      v-if="credit"
      :aria-labelledby="`${uid}-credit`"
      class="flex flex-col gap-1 border-t border-surface pt-2"
    >
      <component :is="sectionTag" :id="`${uid}-credit`" class="text-sm font-medium">{{
        credit.title ?? 'Credit'
      }}</component>
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-0.5">
        <dl class="flex flex-wrap items-baseline gap-x-4 gap-y-0.5 tabular-nums">
          <div class="flex gap-1.5">
            <dt class="font-medium">Used</dt>
            <dd class="text-muted">{{ formatCurrency(credit.used) }}</dd>
          </div>
          <div class="flex gap-1.5">
            <dt class="font-medium">Limit</dt>
            <dd class="text-muted">
              {{ creditUnlimited ? 'Unlimited' : formatCurrency(credit.limit) }}
            </dd>
          </div>
          <div class="flex gap-1.5">
            <dt class="font-medium">Available</dt>
            <dd class="text-muted">
              {{ creditUnlimited ? 'Unlimited' : formatCurrency(creditAvailable) }}
            </dd>
          </div>
        </dl>
        <Tag v-if="creditOver" severity="warn">Over limit</Tag>
      </div>
      <ProgressBar
        v-if="!creditUnlimited"
        :value="creditPercent"
        :showValue="false"
        :dt="{ height: '0.375rem' }"
        aria-label="Credit used"
        class="mt-1 max-w-md"
      />
    </section>

    <component
      :is="section.title ? 'section' : 'div'"
      v-for="(section, index) in rows"
      :key="section.id"
      :aria-labelledby="section.title ? `${uid}-${section.id}` : undefined"
      class="flex flex-col gap-1"
      :class="{ 'border-t border-surface pt-2': index >= dividedFrom }"
    >
      <component
        :is="sectionTag"
        v-if="section.title"
        :id="`${uid}-${section.id}`"
        class="text-sm font-medium"
        >{{ section.title }}</component
      >
      <dl :class="sidebar ? 'flex flex-col' : 'grid gap-x-8 lg:grid-cols-2'">
        <div
          v-for="row in section.items"
          :key="row.item.key"
          class="group min-w-0 py-1.5 sm:py-1"
          :class="
            sidebar
              ? 'flex items-baseline justify-between gap-3'
              : [
                  'flex flex-col sm:grid sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline sm:gap-x-3',
                  { 'lg:col-span-2': row.item.wide },
                ]
          "
        >
          <dt class="font-medium" :class="{ 'shrink-0': sidebar }">{{ row.item.label }}</dt>
          <dd
            class="m-0 flex min-w-0 items-center gap-1 text-muted"
            :class="{ 'justify-end text-right': sidebar }"
          >
            <slot
              :name="`value-${row.item.key}`"
              :item="row.item"
              :text="row.text"
              :empty="row.text === null"
            >
              <template v-if="row.text === null">
                <span aria-hidden="true">{{ emptyText }}</span>
                <span class="sr-only">{{ emptyLabel }}</span>
              </template>
              <a
                v-else-if="row.item.kind === 'link'"
                :href="row.item.href ?? row.text"
                class="min-w-0 break-words text-color underline underline-offset-2"
                >{{ row.text }}</a
              >
              <span
                v-else
                class="min-w-0 break-words"
                :class="{
                  'tabular-nums': row.item.kind === 'currency' || row.item.kind === 'number',
                }"
                >{{ row.text }}</span
              >
            </slot>
            <Button
              v-if="row.item.copyable && row.copyText !== null"
              type="button"
              iconOnly
              size="small"
              severity="primary"
              text
              :aria-label="`Copy ${row.copyTarget}`"
              :title="`Copy ${row.copyTarget}`"
              @click="copy(row)"
            >
              <Check v-if="copiedKey === row.item.key" aria-hidden="true" />
              <Copy v-else aria-hidden="true" />
            </Button>
          </dd>
        </div>
      </dl>
    </component>
    <Message v-if="copyStatus.kind === 'failed'" severity="error" variant="simple" size="small">
      {{ copyStatus.message }}
    </Message>
    <p v-else role="status" class="sr-only">{{ copyStatus.message }}</p>
  </component>
</template>
