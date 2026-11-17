<script setup lang="ts">
import { shallowRef } from 'vue'

const members = [
  {
    id: 1,
    name: 'Alex Morgan',
    department: 'Operations',
    role: 'Administrator',
    status: 'Active',
    severity: 'success',
  },
  {
    id: 2,
    name: 'Samira Ali',
    department: 'Finance',
    role: 'Member',
    status: 'Active',
    severity: 'success',
  },
  {
    id: 3,
    name: 'James Otieno',
    department: 'Engineering',
    role: 'Member',
    status: 'Pending',
    severity: 'warn',
  },
  {
    id: 4,
    name: 'Maya Chen',
    department: 'Operations',
    role: 'Viewer',
    status: 'Inactive',
    severity: 'secondary',
  },
]
const selectedMember = shallowRef<(typeof members)[number] | null>(null)
</script>

<template>
  <section
    class="flex min-w-0 flex-col gap-5 border-t border-surface pt-8"
    aria-labelledby="members-heading"
  >
    <div class="flex items-center justify-between gap-4">
      <div class="flex flex-col gap-2">
        <h2 id="members-heading" class="text-balance text-xl font-semibold">Data display</h2>
        <p class="text-base text-muted-color sm:text-sm">
          A sortable table with row selection and status tags.
        </p>
      </div>
      <Tag :value="`${members.length} members`" severity="secondary" class="shrink-0" />
    </div>

    <div class="-mx-4 -my-2 overflow-x-auto whitespace-nowrap sm:-mx-6 lg:-mx-8">
      <div class="inline-block min-w-full px-4 py-2 sm:px-6 lg:px-8">
        <DataTable
          v-model:selection="selectedMember"
          :value="members"
          selectionMode="single"
          dataKey="id"
          tableStyle="min-width: 38rem"
        >
          <Column field="name" header="Name" sortable />
          <Column field="department" header="Department" sortable />
          <Column field="role" header="Role" />
          <Column header="Status">
            <template #body="{ data }">
              <Tag :value="data.status" :severity="data.severity" />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>

    <p class="text-base text-muted-color sm:text-sm" aria-live="polite">
      {{
        selectedMember
          ? `Selected member: ${selectedMember.name}.`
          : 'Select a row or sort a column to test the table.'
      }}
    </p>
  </section>
</template>
