<script setup lang="ts">
import { reactive, shallowRef } from 'vue'

const defaults = {
  name: 'Alex Morgan',
  department: 'Operations',
  notifications: true,
  access: false,
}
const form = reactive({ ...defaults })
const saved = shallowRef(false)
const departments = ['Operations', 'Finance', 'Engineering']

function reset() {
  Object.assign(form, defaults)
  saved.value = false
}
</script>

<template>
  <Card
    class="h-full shadow-none ring-1 ring-surface-200 dark:ring-surface-800"
    role="region"
    aria-labelledby="form-heading"
  >
    <template #title>
      <h2 id="form-heading" class="text-balance text-xl font-semibold">Form controls</h2>
    </template>
    <template #subtitle>Edit an example member and apply a preview.</template>
    <template #content>
      <form class="flex flex-col gap-5 pt-4" @submit.prevent="saved = true">
        <div class="grid gap-5 sm:grid-cols-2">
          <div class="flex min-w-0 flex-col gap-2">
            <label for="member-name" class="font-medium">Full name</label>
            <InputText
              id="member-name"
              v-model="form.name"
              name="memberName"
              required
              class="w-full text-base sm:text-sm"
            />
          </div>
          <div class="flex min-w-0 flex-col gap-2">
            <label id="member-department-label" for="member-department" class="font-medium"
              >Department</label
            >
            <Select
              v-model="form.department"
              inputId="member-department"
              ariaLabelledby="member-department-label"
              name="department"
              :options="departments"
              class="w-full"
            />
          </div>
        </div>

        <div class="flex items-center gap-3">
          <Checkbox
            v-model="form.notifications"
            inputId="member-notifications"
            name="notifications"
            binary
          />
          <label for="member-notifications">Email notifications</label>
        </div>

        <div
          class="flex items-center justify-between gap-4 rounded-border bg-surface-50 p-4 dark:bg-surface-800/50"
        >
          <div class="flex min-w-0 flex-col gap-1">
            <label for="member-access" class="font-medium">Account access</label>
            <p class="text-base text-muted-color sm:text-sm">Allow this member to sign in.</p>
          </div>
          <ToggleSwitch
            v-model="form.access"
            inputId="member-access"
            name="access"
            class="shrink-0"
          />
        </div>

        <div class="flex flex-wrap gap-3">
          <Button type="submit" size="small" severity="secondary">Apply preview</Button>
          <Button type="button" size="small" severity="secondary" outlined @click="reset"
            >Reset</Button
          >
        </div>

        <Message v-if="saved" severity="success"
          >Preview applied for {{ form.name }} in {{ form.department }}.</Message
        >
      </form>
    </template>
  </Card>
</template>
