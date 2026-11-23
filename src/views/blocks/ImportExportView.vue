<script setup lang="ts">
import BlockDoc from '@/components/blocks/BlockDoc.vue'
import CsvImportBlock from '@/components/blocks/import-export/CsvImportBlock.vue'
import code0 from '@/components/blocks/import-export/CsvImportBlock.vue?raw'
import ExportDialogBlock from '@/components/blocks/import-export/ExportDialogBlock.vue'
import code1 from '@/components/blocks/import-export/ExportDialogBlock.vue?raw'
const examples = [
  {
    id: 'csv-import',
    title: 'CSV import wizard',
    description:
      'Upload a CSV, map its columns to required fields, review row errors, and import only the valid rows.',
    component: CsvImportBlock,
    code: code0,
  },
  {
    id: 'export-dialog',
    title: 'Export dialog',
    description:
      'Choose which rows, columns, and dates to export, then download a CSV built in the browser.',
    component: ExportDialogBlock,
    code: code1,
  },
]
const usage = [
  'Use Export as the button label with the download icon and primary outlined style. Keep formats, row scope, and record type in the surrounding context or export dialog instead of the button label.',
  'The wizard uses the native Stepper in linear mode, so each step must be complete before the next one opens. Files are read in the browser and never uploaded.',
  'The parser, column auto-matching, validation rules, and CSV export helpers live in import-export/csv.ts alongside the mapping and validation-report components. Copy them with the wizard.',
  'Validate again on the server before saving. Replace the known-customer list and sample rows with your own reference data, and keep the downloadable error report so people can fix rows offline.',
]
</script>

<template>
  <BlockDoc
    title="Import and export"
    description="Patterns for bringing records in from CSV files and exporting the rows people choose."
    :usage="usage"
    :examples="examples"
  />
</template>
