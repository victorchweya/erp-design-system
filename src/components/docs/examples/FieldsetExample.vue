<script setup lang="ts">
import { shallowRef, useId } from 'vue'

const gateId = useId()
const contactId = useId()
const gate = shallowRef('')
const contact = shallowRef('')
</script>

<template>
  <Fieldset legend="Delivery instructions" toggleable>
    <div class="flex max-w-md flex-col gap-4">
      <div class="flex flex-col gap-2">
        <label :for="gateId">Gate or entrance</label>
        <InputText :id="gateId" v-model="gate" />
      </div>
      <div class="flex flex-col gap-2">
        <label :for="contactId">Contact on arrival</label>
        <InputText :id="contactId" v-model="contact" />
      </div>
    </div>
  </Fieldset>
</template>
