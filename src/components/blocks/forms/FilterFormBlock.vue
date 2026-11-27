<script setup lang="ts">
import Times from '@primeicons/vue/times'
import { reactive, shallowRef, useId, useTemplateRef } from 'vue'
const id = useId()
const filters = reactive({ search: '', status: null as string | null })
const result = shallowRef('No filters applied.')
function apply() {
  const search = filters.search.trim()
  result.value =
    search || filters.status
      ? `Applied: ${[search, filters.status].filter(Boolean).join(' · ')}`
      : 'No filters applied.'
}
function clear() {
  filters.search = ''
  filters.status = null
  apply()
}
const searchInput = useTemplateRef<{ $el: HTMLInputElement }>('searchInput')

function clearSearch() {
  filters.search = ''
  searchInput.value?.$el.focus()
}
</script>

<template>
  <Card>
    <template #title><h3 class="text-xl font-medium">Filter orders</h3></template>
    <template #content>
      <form class="flex flex-col gap-4 text-sm" @submit.prevent="apply" @reset.prevent="clear">
        <div class="flex flex-wrap items-end gap-4">
          <div class="flex min-w-0 flex-1 basis-48 flex-col gap-1">
            <label :for="`${id}-search`" class="font-medium">Reference or customer</label>
            <IconField
              ><InputText
                ref="searchInput"
                :id="`${id}-search`"
                v-model="filters.search"
                fluid
              /><InputIcon v-if="filters.search">
                <button
                  type="button"
                  aria-label="Clear order search"
                  title="Clear order search"
                  class="-m-1 flex rounded-xs p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-primary"
                  @click="clearSearch"
                >
                  <Times aria-hidden="true" focusable="false" />
                </button>
              </InputIcon>
            </IconField>
          </div>
          <div class="flex flex-1 basis-40 flex-col gap-1">
            <label :for="`${id}-status`" class="font-medium">Status</label
            ><Select
              :inputId="`${id}-status`"
              v-model="filters.status"
              :options="['Pending', 'Confirmed']"
              placeholder="All statuses"
              showClear
              fluid
            />
          </div>
          <div class="flex flex-wrap gap-2">
            <Button type="reset" severity="primary" outlined>Clear</Button
            ><Button type="submit">Apply filters</Button>
          </div>
        </div>
        <p role="status" class="text-muted">{{ result }}</p>
      </form>
    </template>
  </Card>
</template>
