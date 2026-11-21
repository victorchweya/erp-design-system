<script setup lang="ts">
import { computed, ref, shallowRef, useId } from 'vue'
import Lock from '@primeicons/vue/lock'
import { roles, type Role } from './roles'

type Permission = { id: string; label: string; grantedTo: Role[] }
type PermissionGroup = { module: string; permissions: Permission[] }

const groups: PermissionGroup[] = [
  {
    module: 'Orders',
    permissions: [
      { id: 'orders.view', label: 'View orders', grantedTo: roles.slice() },
      { id: 'orders.edit', label: 'Create and edit orders', grantedTo: ['Operations', 'Sales'] },
      { id: 'orders.cancel', label: 'Cancel orders', grantedTo: ['Operations'] },
    ],
  },
  {
    module: 'Inventory',
    permissions: [
      {
        id: 'inventory.view',
        label: 'View stock levels',
        grantedTo: ['Operations', 'Sales', 'Warehouse', 'Viewer'],
      },
      { id: 'inventory.adjust', label: 'Adjust stock', grantedTo: ['Operations', 'Warehouse'] },
    ],
  },
  {
    module: 'Procurement',
    permissions: [
      { id: 'procurement.create', label: 'Raise purchase orders', grantedTo: ['Operations'] },
      { id: 'procurement.approve', label: 'Approve purchase orders', grantedTo: ['Finance'] },
      { id: 'procurement.suppliers', label: 'Manage suppliers', grantedTo: ['Operations'] },
    ],
  },
  {
    module: 'Finance',
    permissions: [
      { id: 'finance.view', label: 'View invoices', grantedTo: ['Finance', 'Sales'] },
      { id: 'finance.approve', label: 'Approve invoices', grantedTo: ['Finance'] },
      { id: 'finance.payments', label: 'Record payments', grantedTo: ['Finance'] },
    ],
  },
  {
    module: 'Users',
    permissions: [
      { id: 'users.view', label: 'View users', grantedTo: ['Operations'] },
      { id: 'users.manage', label: 'Invite and manage users', grantedTo: [] },
    ],
  },
]
const editableRoles = roles.filter((role) => role !== 'Admin')

const key = (role: Role, permission: Permission) => `${role}|${permission.id}`
const initial = Object.fromEntries(
  groups.flatMap(({ permissions }) =>
    permissions.flatMap((permission) =>
      editableRoles.map((role) => [key(role, permission), permission.grantedTo.includes(role)]),
    ),
  ),
) as Record<string, boolean>

const id = useId()
const saved = shallowRef<Record<string, boolean>>(initial)
const draft = ref<Record<string, boolean>>({ ...initial })
const feedback = shallowRef('')

const changedKeys = computed(
  () => new Set(Object.keys(draft.value).filter((cell) => draft.value[cell] !== saved.value[cell])),
)
const status = computed(() => {
  const count = changedKeys.value.size
  if (count) return `${count} unsaved ${count === 1 ? 'change' : 'changes'}.`
  return feedback.value || 'All changes saved.'
})

function accessibleName(role: Role, permission: Permission) {
  return `${role}: ${permission.label.toLowerCase()}`
}

function save() {
  const count = changedKeys.value.size
  saved.value = { ...draft.value }
  feedback.value = `Saved ${count} permission ${count === 1 ? 'change' : 'changes'} in this preview.`
}

function discard() {
  draft.value = { ...saved.value }
  feedback.value = 'Changes discarded.'
}
</script>

<template>
  <div class="flex flex-col gap-4 text-sm">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <div>
        <h5 :id="`${id}-title`" class="text-base font-medium">Roles and permissions</h5>
        <p class="text-muted">
          Choose what each role can do. Admin always has every permission and cannot be changed.
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button
          type="button"
          severity="secondary"
          outlined
          size="small"
          :disabled="!changedKeys.size"
          @click="discard"
          >Discard</Button
        >
        <Button type="button" size="small" :disabled="!changedKeys.size" @click="save"
          >Save changes</Button
        >
      </div>
    </div>
    <p role="status" :class="changedKeys.size ? 'font-medium text-warn' : 'text-muted'">
      {{ status }}
    </p>
    <div
      class="overflow-x-auto rounded-border border border-surface"
      role="region"
      :aria-labelledby="`${id}-title`"
      tabindex="0"
    >
      <table class="w-full min-w-[44rem] border-collapse">
        <caption class="sr-only">
          Permissions by role. Columns are roles; rows are permissions grouped by module.
        </caption>
        <thead>
          <tr>
            <th scope="col" class="border-b border-surface p-3 text-left font-medium">
              Permission
            </th>
            <th
              v-for="role in roles"
              :key="role"
              scope="col"
              class="border-b border-l border-surface p-3 text-center font-medium"
            >
              <span class="inline-flex items-center gap-1">
                {{ role }}
                <template v-if="role === 'Admin'">
                  <Lock aria-hidden="true" class="text-muted" />
                  <span class="sr-only">(locked)</span>
                </template>
              </span>
            </th>
          </tr>
        </thead>
        <tbody v-for="group in groups" :key="group.module">
          <tr>
            <th
              scope="rowgroup"
              :colspan="roles.length + 1"
              class="border-b border-surface bg-emphasis px-3 py-2 text-left font-medium"
            >
              {{ group.module }}
            </th>
          </tr>
          <tr v-for="permission in group.permissions" :key="permission.id">
            <th scope="row" class="border-b border-surface p-3 text-left font-normal">
              {{ permission.label }}
            </th>
            <td
              v-for="role in roles"
              :key="role"
              class="border-b border-l border-surface p-3 text-center"
              :class="{
                'bg-note': role !== 'Admin' && changedKeys.has(key(role, permission)),
              }"
            >
              <Checkbox
                v-if="role === 'Admin'"
                :modelValue="true"
                binary
                disabled
                :aria-label="`${accessibleName(role, permission)} (always allowed)`"
              />
              <Checkbox
                v-else
                v-model="draft[key(role, permission)]"
                binary
                :aria-label="accessibleName(role, permission)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
