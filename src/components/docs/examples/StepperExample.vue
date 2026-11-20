<script setup lang="ts">
import { nextTick, shallowRef, useId } from 'vue'

const id = useId()
const supplier = shallowRef<string | null>(null)
const suppliers = ['Kiambu Fresh Growers', 'Limuru Highland Farm', 'Nyeri Valley Co-op']

// Stepper does not move focus. Focus the new step's heading so keyboard users keep their place.
async function goTo(activate: (value: string) => void, value: string) {
  activate(value)
  await nextTick()
  document.getElementById(`${id}-heading-${value}`)?.focus()
}
</script>

<template>
  <Stepper value="1" linear>
    <StepList>
      <Step value="1">Supplier</Step>
      <Step value="2">Items</Step>
      <Step value="3">Review</Step>
    </StepList>
    <StepPanels>
      <StepPanel v-slot="{ activateCallback }" value="1">
        <div class="flex max-w-sm flex-col gap-4">
          <h3 :id="`${id}-heading-1`" tabindex="-1" class="font-medium">Choose a supplier</h3>
          <div class="flex flex-col gap-2">
            <span :id="`${id}-supplier`">Supplier</span>
            <Select
              v-model="supplier"
              :options="suppliers"
              placeholder="Choose a supplier"
              :aria-labelledby="`${id}-supplier`"
              fluid
            />
          </div>
          <Button
            type="button"
            class="self-start"
            :disabled="!supplier"
            @click="goTo(activateCallback, '2')"
            >Next</Button
          >
        </div>
      </StepPanel>
      <StepPanel v-slot="{ activateCallback }" value="2">
        <div class="flex flex-col gap-4">
          <h3 :id="`${id}-heading-2`" tabindex="-1" class="font-medium">Add items</h3>
          <p>Sukuma wiki 120 kg, tomatoes 80 kg.</p>
          <div class="flex flex-wrap gap-2">
            <Button type="button" severity="secondary" outlined @click="goTo(activateCallback, '1')"
              >Back</Button
            >
            <Button type="button" @click="goTo(activateCallback, '3')">Next</Button>
          </div>
        </div>
      </StepPanel>
      <StepPanel v-slot="{ activateCallback }" value="3">
        <div class="flex flex-col gap-4">
          <h3 :id="`${id}-heading-3`" tabindex="-1" class="font-medium">Review and submit</h3>
          <p>Purchase order for {{ supplier }}. Total KES 18,400.</p>
          <div class="flex flex-wrap gap-2">
            <Button type="button" severity="secondary" outlined @click="goTo(activateCallback, '2')"
              >Back</Button
            >
            <Button type="button">Submit order</Button>
          </div>
        </div>
      </StepPanel>
    </StepPanels>
  </Stepper>
</template>
