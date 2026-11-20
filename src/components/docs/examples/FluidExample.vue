<script setup lang="ts">
import { shallowRef, useId } from 'vue'

const nameId = useId()
const countyLabelId = useId()
const name = shallowRef('')
const county = shallowRef<string | null>(null)
const counties = ['Kiambu', 'Nakuru', 'Nyeri', 'Meru']
</script>

<template>
  <Fluid class="flex max-w-md flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label :for="nameId">Supplier name</label>
      <InputText :id="nameId" v-model="name" />
    </div>
    <div class="flex flex-col gap-2">
      <span :id="countyLabelId">County</span>
      <Select
        v-model="county"
        :options="counties"
        placeholder="Choose a county"
        :aria-labelledby="countyLabelId"
      />
    </div>
    <!-- fluid="false" opts a single control out of the Fluid context. -->
    <Button type="button" label="Save supplier" :fluid="false" class="self-start" />
  </Fluid>
</template>
