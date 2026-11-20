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
    description: 'An array of objects to display.',
  },
  {
    name: 'dataKey',
    type: 'keyof T | Function',
    default: '-',
    description: 'Name of the field that uniquely identifies the a record in the data.',
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
    description: 'When specified as true, enables the pagination.',
  },
  {
    name: 'editMode',
    type: "'cell' | 'row'",
    default: '-',
    description: 'Defines the incell editing mode.',
  },
  {
    name: 'editingRows',
    type: 'T[] | DataTableEditingRows',
    default: '-',
    description: 'A collection of rows to represent the current editing data in row edit mode.',
  },
  {
    name: 'filterDisplay',
    type: "'menu' | 'row'",
    default: '-',
    description: 'Layout of the filter elements.',
  },
  {
    name: 'expandedRows',
    type: 'T[] | DataTableExpandedRows | null',
    default: '-',
    description: 'A collection of row data display as expanded.',
  },
  {
    name: 'rowGroupMode',
    type: "'subheader' | 'rowspan'",
    default: '-',
    description: 'Defines the row group mode.',
  },
  {
    name: 'groupRowsBy',
    type: 'keyof T | (keyof T)[] | Function',
    default: '-',
    description: 'One or more field names to use in row grouping.',
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
  'Give the table an accessible name and use meaningful column headers.',
  'Use the native sorting and pagination controls with the keyboard.',
]
</script>

<template>
  <ComponentDoc
    title="DataTable"
    componentName="DataTable"
    category="Data"
    description="Sort and page through a collection of produce."
    usage="binds rows with value and defines cells with Column. Use small sizing and gridlines for reference tables."
    :examples="examples"
    :api="api"
    :accessibility="accessibility"
    source="https://primevue.dev/datatable"
  />
</template>
