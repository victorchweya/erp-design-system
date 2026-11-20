<script setup lang="ts">
import ComponentDoc from '@/components/docs/ComponentDoc.vue'
import Example from '@/components/docs/examples/DataTableExample.vue'
import code from '@/components/docs/examples/DataTableExample.vue?raw'
import CellEditExample from '@/components/docs/examples/DataTableCellEditExample.vue'
import cellEditCode from '@/components/docs/examples/DataTableCellEditExample.vue?raw'
import RowEditExample from '@/components/docs/examples/DataTableRowEditExample.vue'
import rowEditCode from '@/components/docs/examples/DataTableRowEditExample.vue?raw'
import FilterMenuExample from '@/components/docs/examples/DataTableFilterMenuExample.vue'
import filterMenuCode from '@/components/docs/examples/DataTableFilterMenuExample.vue?raw'
import RowExpansionExample from '@/components/docs/examples/DataTableRowExpansionExample.vue'
import rowExpansionCode from '@/components/docs/examples/DataTableRowExpansionExample.vue?raw'
import RowGroupExample from '@/components/docs/examples/DataTableRowGroupExample.vue'
import rowGroupCode from '@/components/docs/examples/DataTableRowGroupExample.vue?raw'
import FooterTotalsExample from '@/components/docs/examples/DataTableFooterTotalsExample.vue'
import footerTotalsCode from '@/components/docs/examples/DataTableFooterTotalsExample.vue?raw'
import ColumnToggleExample from '@/components/docs/examples/DataTableColumnToggleExample.vue'
import columnToggleCode from '@/components/docs/examples/DataTableColumnToggleExample.vue?raw'
import ResizeReorderExample from '@/components/docs/examples/DataTableResizeReorderExample.vue'
import resizeReorderCode from '@/components/docs/examples/DataTableResizeReorderExample.vue?raw'
import ExportExample from '@/components/docs/examples/DataTableExportExample.vue'
import exportCode from '@/components/docs/examples/DataTableExportExample.vue?raw'
import LazyExample from '@/components/docs/examples/DataTableLazyExample.vue'
import lazyCode from '@/components/docs/examples/DataTableLazyExample.vue?raw'
import StateExample from '@/components/docs/examples/DataTableStateExample.vue'
import stateCode from '@/components/docs/examples/DataTableStateExample.vue?raw'

const examples = [
  {
    id: 'example',
    title: 'Basic usage',
    description: 'Sort and page through a collection of produce.',
    component: Example,
    code: code,
  },
  {
    id: 'cell-edit',
    title: 'Cell editing',
    description: 'Edit quantities and prices in place, with validation before a value is saved.',
    component: CellEditExample,
    code: cellEditCode,
  },
  {
    id: 'row-edit',
    title: 'Row editing',
    description: 'Edit a whole row, then save or cancel the change.',
    component: RowEditExample,
    code: rowEditCode,
  },
  {
    id: 'filter-menu',
    title: 'Column filter menus',
    description: 'Filter each column from its header menu by text, status, date and amount.',
    component: FilterMenuExample,
    code: filterMenuCode,
  },
  {
    id: 'row-expansion',
    title: 'Row expansion',
    description: 'Expand an order to see its line items without leaving the table.',
    component: RowExpansionExample,
    code: rowExpansionCode,
  },
  {
    id: 'row-group',
    title: 'Row grouping and subtotals',
    description: 'Group deliveries by route with a subtotal under each group.',
    component: RowGroupExample,
    code: rowGroupCode,
  },
  {
    id: 'footer-totals',
    title: 'Footer totals',
    description: 'Show totals for the visible rows in a footer row.',
    component: FooterTotalsExample,
    code: footerTotalsCode,
  },
  {
    id: 'column-toggle',
    title: 'Column toggle',
    description:
      'Choose optional columns from a labelled MultiSelect. The receipt number is not an option, so every row stays identifiable.',
    component: ColumnToggleExample,
    code: columnToggleCode,
  },
  {
    id: 'resize-reorder',
    title: 'Resize and reorder columns',
    description:
      'Drag column edges to resize and headers to reorder. Fit mode keeps the table inside the page by taking width from the next column. Expand mode is better for wide, scrollable tables. Drag reordering and resizing have no keyboard support, so the Move left and Move right buttons give keyboard users another way to reorder.',
    component: ResizeReorderExample,
    code: resizeReorderCode,
  },
  {
    id: 'export',
    title: 'CSV export',
    description:
      'Export the filtered, sorted rows or only the selected rows to CSV. Selection and action columns are left out. Amounts are exported as plain numbers under an Amount (KES) header.',
    component: ExportExample,
    code: exportCode,
  },
  {
    id: 'lazy',
    title: 'Lazy loading',
    description:
      'Request one page at a time from the server whenever the page, sort or filter changes. The table shows skeleton rows on first load, a loading overlay after that, and an error with Retry when a request fails.',
    component: LazyExample,
    code: lazyCode,
  },
  {
    id: 'state',
    title: 'Saved table state',
    description:
      'Keep sorting, filters, page and column widths in session storage under a namespaced key. Reset view clears the saved state. Storage is plain text, so never save free-text searches or customer details.',
    component: StateExample,
    code: stateCode,
  },
]
const api = [
  {
    name: 'value',
    type: 'null | readonly T[]',
    default: '-',
    description: 'Records to display, one per row.',
  },
  {
    name: 'dataKey',
    type: 'keyof T | Function',
    default: '-',
    description:
      'Field that uniquely identifies each record. Needed so selection, expansion and editing follow the right row after sorting or paging.',
  },
  {
    name: 'rows',
    type: 'number',
    default: '0',
    description: 'Number of rows to display per page.',
  },
  {
    name: 'paginator',
    type: 'boolean',
    default: 'false',
    description: 'Shows a paginator under the table.',
  },
  {
    name: 'selectionMode',
    type: "'single' | 'multiple'",
    default: '-',
    description:
      'Makes rows selectable by click and keyboard. For checkbox selection, add a Column with selectionMode instead.',
  },
  {
    name: 'selection',
    type: 'T | T[]',
    default: '-',
    description: 'Selected row or rows. Use with v-model:selection.',
  },
  {
    name: 'tableProps',
    type: 'object',
    default: '-',
    description:
      "Attributes for the table element. Use it to give the table an accessible name with 'aria-label'.",
  },
  {
    name: 'editMode',
    type: "'cell' | 'row'",
    default: '-',
    description:
      'Edit one cell at a time (cell) or a whole row with save and cancel buttons (row).',
  },
  {
    name: 'editingRows',
    type: 'T[] | DataTableEditingRows',
    default: '-',
    description: 'Rows currently being edited in row mode. Use with v-model:editingRows.',
  },
  {
    name: 'filterDisplay',
    type: "'menu' | 'row'",
    default: '-',
    description: 'Show column filters in a header menu (menu) or in a row under the headers (row).',
  },
  {
    name: 'expandedRows',
    type: 'T[] | DataTableExpandedRows | null',
    default: '-',
    description: 'Rows currently expanded. Use with v-model:expandedRows.',
  },
  {
    name: 'rowGroupMode',
    type: "'subheader' | 'rowspan'",
    default: '-',
    description: 'Group rows under a subheader row (subheader) or merge repeated cells (rowspan).',
  },
  {
    name: 'groupRowsBy',
    type: 'keyof T | (keyof T)[] | Function',
    default: '-',
    description:
      'Field or fields to group rows by. Sort by the same field so groups stay together.',
  },
  {
    name: 'lazy',
    type: 'boolean',
    default: 'false',
    description: 'Defers paging, sorting and filtering to page, sort and filter event handlers.',
  },
  {
    name: 'totalRecords',
    type: 'number',
    default: '0',
    description: 'Number of matching records on the server. Used by the paginator in lazy mode.',
  },
  {
    name: 'resizableColumns',
    type: 'boolean',
    default: 'false',
    description: 'When enabled, columns can be resized by dragging their edges.',
  },
  {
    name: 'columnResizeMode',
    type: "'fit' | 'expand'",
    default: 'fit',
    description: 'Whether resizing keeps the table width (fit) or changes it (expand).',
  },
  {
    name: 'reorderableColumns',
    type: 'boolean',
    default: 'false',
    description: 'When enabled, columns can be reordered by dragging their headers.',
  },
  {
    name: 'stateStorage',
    type: "'session' | 'local'",
    default: 'session',
    description: 'Storage used to keep the table state.',
  },
  {
    name: 'stateKey',
    type: 'string',
    default: '-',
    description: 'Unique storage key. Setting it makes the table save its state.',
  },
]
const accessibility = [
  "Name every table with tableProps, for example { 'aria-label': 'Purchase orders' }, or with a visible caption linked by aria-labelledby. Keep column headers short and specific.",
  'Sortable headers are focusable. Tab moves between them, Enter or Space sorts, and aria-sort reports the current direction.',
  'With selectionMode, rows take focus: Up and Down Arrow move between rows, and Enter or Space selects. Checkbox and radio selection columns are labelled from the PrimeVue locale.',
  'Expanders, filter menus and row editor buttons are labelled from the PrimeVue locale. Custom cell editors and action buttons need their own labels, such as Edit FTF-1042.',
  'Do not rely on colour alone for status cells. Pair a Tag severity with a text value.',
]
</script>

<template>
  <ComponentDoc
    title="DataTable"
    componentName="DataTable"
    category="Data"
    description="Show records in rows and columns that people can sort, filter, page, select and edit."
    usage="binds an array of records with value and defines each column with Column. Set dataKey to a unique field. Use size small and showGridlines for dense ERP lists, and lazy with totalRecords when the server does the paging, sorting and filtering."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/datatable"
  />
</template>
