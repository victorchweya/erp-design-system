<script setup lang="ts">
import { computed, shallowRef } from 'vue'

const pageSizes = [10, 25, 50]
const totalRecords = 238
const first = shallowRef(0)
const rows = shallowRef(10)
const pageCount = computed(() => Math.ceil(totalRecords / rows.value))
const currentPage = computed(() => Math.floor(first.value / rows.value) + 1)
const targetPage = shallowRef<number | null>(1)

// Keep the first visible record on screen when the page size changes.
function changeRows(value: number) {
  rows.value = value
  first.value = Math.floor(first.value / value) * value
  targetPage.value = currentPage.value
}

function goToPage() {
  if (targetPage.value === null) return
  const pageNumber = Math.min(Math.max(targetPage.value, 1), pageCount.value)
  first.value = (pageNumber - 1) * rows.value
  targetPage.value = pageNumber
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <Paginator
      v-model:first="first"
      :rows="rows"
      :totalRecords="totalRecords"
      template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
      currentPageReportTemplate="{first}–{last} of {totalRecords} invoices"
      @page="targetPage = $event.page + 1"
    />
    <div class="flex flex-wrap items-end justify-center gap-4">
      <div class="flex flex-col gap-1">
        <span id="invoice-page-size-label" class="font-medium">Rows per page</span>
        <Select
          :modelValue="rows"
          :options="pageSizes"
          aria-labelledby="invoice-page-size-label"
          size="small"
          @update:modelValue="changeRows"
        />
      </div>
      <form class="flex items-end gap-2" @submit.prevent="goToPage">
        <div class="flex flex-col gap-1">
          <label for="invoice-page-jump" class="font-medium">Go to page</label>
          <InputNumber
            v-model="targetPage"
            inputId="invoice-page-jump"
            :min="1"
            :max="pageCount"
            :useGrouping="false"
            aria-describedby="invoice-page-jump-help"
            size="small"
            :inputStyle="{ width: '5rem' }"
          />
        </div>
        <Button type="submit" label="Go" severity="primary" outlined size="small" />
      </form>
    </div>
    <p id="invoice-page-jump-help" class="text-center text-muted-color">
      Enter a page from 1 to {{ pageCount }}.
    </p>
  </div>
</template>
