<script setup lang="ts">
import { computed, ref, shallowRef, useId } from 'vue'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'
import ArrowLeft from '@primeicons/vue/arrow-left'
import ArrowRight from '@primeicons/vue/arrow-right'
import FileIcon from '@primeicons/vue/file'
import Download from '@primeicons/vue/download'
import ImportColumnMapping from './ImportColumnMapping.vue'
import ImportValidationReport from './ImportValidationReport.vue'
import {
  autoMatchColumns,
  downloadCsv,
  importFields,
  parseCsv,
  sampleCsv,
  sampleCsvName,
  toCsv,
  validateRows,
  type ColumnMapping,
  type CsvTable,
} from './csv'

const id = useId()
const step = shallowRef<string | number>('1')
const fileName = shallowRef('')
const table = shallowRef<CsvTable | null>(null)
const uploadError = shallowRef('')
const mapping = ref<ColumnMapping>(autoMatchColumns([]))
const imported = shallowRef<number | null>(null)

const rows = computed(() => (table.value ? validateRows(table.value, mapping.value) : []))
const validRows = computed(() => rows.value.filter((row) => !row.errors.length))
const invalidRows = computed(() => rows.value.filter((row) => row.errors.length))
const mappingComplete = computed(() => {
  const columns = Object.values(mapping.value).filter(Boolean)
  return (
    importFields.every((field) => !field.required || mapping.value[field.key]) &&
    new Set(columns).size === columns.length
  )
})
const customerCount = computed(
  () => new Set(validRows.value.map((row) => row.values.customer.toLowerCase())).size,
)

function load(name: string, text: string) {
  const parsed = parseCsv(text)
  if (!parsed.headers.length || !parsed.rows.length) {
    uploadError.value = `${name} has no data rows. Check that the first row contains column headings.`
    table.value = null
    return
  }
  uploadError.value = ''
  fileName.value = name
  table.value = parsed
  mapping.value = autoMatchColumns(parsed.headers)
  imported.value = null
}

async function selectFile(event: FileUploadUploaderEvent) {
  const file = Array.isArray(event.files) ? event.files[0] : event.files
  if (!file) return
  try {
    load(file.name, await file.text())
  } catch {
    uploadError.value = `${file.name} could not be read. Choose the file again.`
  }
}

function downloadErrorReport() {
  const headers = ['Row', ...importFields.map((field) => field.label), 'Issues']
  const data = invalidRows.value.map((row) => [
    row.line,
    ...importFields.map((field) => row.values[field.key]),
    row.errors.join('; '),
  ])
  downloadCsv(fileName.value.replace(/\.csv$/i, '') + '-errors.csv', toCsv(headers, data))
}

function confirmImport() {
  imported.value = validRows.value.length
}

function reset() {
  table.value = null
  fileName.value = ''
  uploadError.value = ''
  imported.value = null
  step.value = '1'
}
</script>

<template>
  <Card>
    <template #title><h3 class="text-xl font-medium">Import order lines</h3></template>
    <template #subtitle>Upload a CSV, match its columns, and import the rows that pass.</template>
    <template #content>
      <Stepper v-model:value="step" linear aria-label="Import order lines" class="text-sm">
        <StepList>
          <Step value="1">Upload</Step>
          <Step value="2">Map columns</Step>
          <Step value="3">Validate</Step>
          <Step value="4">Import</Step>
        </StepList>
        <StepPanels>
          <StepPanel v-slot="{ activateCallback }" value="1">
            <div class="flex flex-col gap-4">
              <p class="text-muted">
                Use a UTF-8 CSV with one order line per row. Required columns: delivery date
                (YYYY-MM-DD), customer, SKU, and quantity in kg.
              </p>
              <div class="flex flex-wrap items-center gap-3">
                <FileUpload
                  mode="basic"
                  name="orders"
                  accept=".csv,text/csv"
                  :maxFileSize="1000000"
                  customUpload
                  auto
                  chooseLabel="Choose CSV file"
                  @uploader="selectFile"
                />
                <Button
                  type="button"
                  severity="secondary"
                  outlined
                  @click="load(sampleCsvName, sampleCsv)"
                  >Use sample file</Button
                >
              </div>
              <Message v-if="uploadError" severity="error" role="alert">{{ uploadError }}</Message>
              <p v-else role="status" class="flex items-center gap-2 text-muted">
                <template v-if="table">
                  <FileIcon aria-hidden="true" />
                  {{ fileName }}: {{ table.rows.length }} rows, {{ table.headers.length }} columns
                  detected. Nothing has been uploaded.
                </template>
                <template v-else>No file selected.</template>
              </p>
              <div class="flex justify-end">
                <Button type="button" :disabled="!table" @click="activateCallback('2')">
                  Next
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="2">
            <div class="flex flex-col gap-4">
              <ImportColumnMapping v-if="table" v-model="mapping" :headers="table.headers" />
              <div class="flex flex-wrap justify-between gap-2">
                <Button type="button" severity="secondary" outlined @click="activateCallback('1')">
                  <ArrowLeft aria-hidden="true" />
                  Back
                </Button>
                <Button
                  type="button"
                  :disabled="!mappingComplete"
                  :aria-describedby="mappingComplete ? undefined : `${id}-mapping-hint`"
                  @click="activateCallback('3')"
                >
                  Validate rows
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
              <p v-if="!mappingComplete" :id="`${id}-mapping-hint`" class="text-right text-muted">
                Map every required field to a different column to continue.
              </p>
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="3">
            <div class="flex flex-col gap-4">
              <ImportValidationReport :rows="rows" @download="downloadErrorReport" />
              <div class="flex flex-wrap justify-between gap-2">
                <Button type="button" severity="secondary" outlined @click="activateCallback('2')">
                  <ArrowLeft aria-hidden="true" />
                  Back
                </Button>
                <Button type="button" :disabled="!validRows.length" @click="activateCallback('4')">
                  Continue with {{ validRows.length }} valid rows
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          </StepPanel>
          <StepPanel v-slot="{ activateCallback }" value="4">
            <div class="flex flex-col gap-4">
              <template v-if="imported === null">
                <p>
                  Import <strong>{{ validRows.length }}</strong> order lines from
                  <strong>{{ fileName }}</strong
                  >.
                  <template v-if="invalidRows.length">
                    {{ invalidRows.length }} rows with errors will be skipped.
                  </template>
                </p>
                <div class="flex flex-wrap justify-between gap-2">
                  <Button
                    type="button"
                    severity="secondary"
                    outlined
                    @click="activateCallback('3')"
                  >
                    <ArrowLeft aria-hidden="true" />
                    Back
                  </Button>
                  <Button type="button" @click="confirmImport"
                    >Import {{ validRows.length }} rows</Button
                  >
                </div>
              </template>
              <template v-else>
                <Message severity="success" role="status">
                  Imported {{ imported }} order lines for {{ customerCount }} customers in this
                  preview. {{ invalidRows.length }} rows were skipped.
                </Message>
                <div class="flex flex-wrap gap-2">
                  <Button
                    v-if="invalidRows.length"
                    type="button"
                    severity="secondary"
                    outlined
                    @click="downloadErrorReport"
                  >
                    <Download aria-hidden="true" />
                    Download error report
                  </Button>
                  <Button type="button" @click="reset">Start a new import</Button>
                </div>
              </template>
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </template>
  </Card>
</template>
