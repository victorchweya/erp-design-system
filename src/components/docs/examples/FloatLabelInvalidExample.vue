<script setup lang="ts">
import { computed, shallowRef } from 'vue'
const driverName = shallowRef('')
const route = shallowRef<string | null>(null)
const submitted = shallowRef(false)
const routes = [
  { label: 'Nairobi CBD', value: 'nairobi-cbd' },
  { label: 'Westlands and Kileleshwa', value: 'westlands' },
  { label: 'Thika Road', value: 'thika-road' },
]
const driverInvalid = computed(() => submitted.value && !driverName.value.trim())
const routeInvalid = computed(() => submitted.value && !route.value)
const confirmation = computed(() =>
  submitted.value && !driverInvalid.value && !routeInvalid.value
    ? `${driverName.value.trim()} assigned to the selected route.`
    : '',
)

function onSubmit() {
  submitted.value = true
}
</script>

<template>
  <form class="flex flex-col gap-6" novalidate @submit.prevent="onSubmit">
    <div class="grid gap-6 sm:grid-cols-2">
      <div class="flex flex-col gap-2">
        <FloatLabel variant="on">
          <InputText
            id="invalid-driver"
            v-model="driverName"
            :invalid="driverInvalid"
            :aria-describedby="driverInvalid ? 'invalid-driver-error' : undefined"
            aria-required="true"
            autocomplete="name"
            fluid
          />
          <label for="invalid-driver">Driver name</label>
        </FloatLabel>
        <p v-if="driverInvalid" id="invalid-driver-error" class="text-danger">
          Enter the driver's full name.
        </p>
      </div>
      <div class="flex flex-col gap-2">
        <IftaLabel>
          <Select
            v-model="route"
            inputId="invalid-route"
            ariaLabelledby="invalid-route-label"
            :options="routes"
            optionLabel="label"
            optionValue="value"
            :invalid="routeInvalid"
            :pt="{
              label: { 'aria-describedby': routeInvalid ? 'invalid-route-error' : undefined },
            }"
            fluid
          />
          <label id="invalid-route-label" for="invalid-route">Delivery route</label>
        </IftaLabel>
        <p v-if="routeInvalid" id="invalid-route-error" class="text-danger">
          Choose a delivery route.
        </p>
      </div>
    </div>
    <div class="flex flex-wrap items-center gap-4">
      <Button type="submit" label="Assign driver" />
      <p role="status" class="text-muted-color">{{ confirmation }}</p>
    </div>
  </form>
</template>
