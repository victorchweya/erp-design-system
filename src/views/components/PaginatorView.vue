<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/PaginatorExample.vue'
import code from '@/components/docs/examples/PaginatorExample.vue?raw'
import TemplateExample from '@/components/docs/examples/PaginatorTemplateExample.vue'
import templateCode from '@/components/docs/examples/PaginatorTemplateExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description:
      'Bind first with v-model and slice the records for the current page. first is the index of the first record, not the page number.',
    component: Example,
    code: code,
  },
  {
    id: 'template',
    title: 'Page size and page jump',
    description:
      'Use template to choose which parts appear, and currentPageReportTemplate to show the visible range. The page size and page jump controls sit outside the paginator so they can have visible labels.',
    component: TemplateExample,
    code: templateCode,
  },
]
const api = [
  {
    name: 'first',
    type: 'number',
    default: '0',
    description: 'Zero-based index of the first record on the page. Use with v-model:first.',
  },
  {
    name: 'rows',
    type: 'number',
    default: '0',
    description: 'Records per page. Use with v-model:rows when people can change it.',
  },
  {
    name: 'totalRecords',
    type: 'number',
    default: '0',
    description: 'Total number of records. With server paging, use the count the API returns.',
  },
  {
    name: 'template',
    type: 'string | object',
    default: "'FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown'",
    description:
      "Parts to show, in order. Pass an object keyed by max width, such as { '640px': 'PrevPageLink CurrentPageReport NextPageLink', default: '…' }, to show fewer parts on small screens.",
  },
  {
    name: 'currentPageReportTemplate',
    type: 'string',
    default: "'({currentPage} of {totalPages})'",
    description:
      'Text for CurrentPageReport. Placeholders: {currentPage}, {totalPages}, {first}, {last}, {rows}, {totalRecords}.',
  },
  {
    name: 'rowsPerPageOptions',
    type: 'number[]',
    default: '-',
    description: 'Page sizes for the built-in RowsPerPageDropdown.',
  },
  {
    name: 'pageLinkSize',
    type: 'number',
    default: '5',
    description: 'Number of page number buttons to show.',
  },
  {
    name: 'alwaysShow',
    type: 'boolean',
    default: 'true',
    description: 'Shows the paginator even when everything fits on one page.',
  },
]
const accessibility = [
  'The paginator is a nav landmark. First, previous, next, last and page number buttons are labelled from the PrimeVue locale, and the current page has aria-current="page".',
  'The built-in RowsPerPageDropdown has no label of its own; screen readers announce only the current number. JumpToPageInput is announced as Jump to Page Input. When people need these, use labelled controls outside the paginator, as in the second example.',
  'CurrentPageReport is plain text and is not announced when the page changes. Move focus to the start of the new results, or announce the change in a live region, when the update is not obvious.',
  'Keep the paginator next to the content it controls, and keep the same position on every page.',
]
</script>

<template>
  <ComponentDoc
    title="Paginator"
    componentName="Paginator"
    category="Data"
    description="Move through a long set of records one page at a time."
    usage="Paginator works from a zero-based first record index, the page size in rows, and totalRecords. Slice local data, or fetch the requested page from the server in the page event. DataTable and DataView include a paginator; use this one for custom lists."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/paginator"
  />
</template>
