<script setup lang="ts">
import { shallowRef, useId } from 'vue'
import Search from '@primeicons/vue/search'
import Spinner from '@primeicons/vue/spinner'

defineProps<{ size?: 'small' | 'large' }>()
const id = useId()
const checked = shallowRef(false)
const view = shallowRef('List')
</script>

<template>
  <div class="flex min-w-0 flex-col gap-4">
    <div class="flex flex-col gap-2">
      <label :for="`${id}-search`" class="font-medium">Mixed control alignment</label>
      <div class="flex items-start gap-2">
        <InputText
          :id="`${id}-search`"
          :size="size"
          placeholder="Search"
          class="min-w-0 w-full flex-1"
        />
        <Button type="button" :size="size" iconOnly aria-label="Search preview"
          ><Search size="var(--p-icon-size)" aria-hidden="true"
        /></Button>
      </div>
    </div>
    <div class="flex flex-wrap items-start gap-2">
      <Button type="button" :size="size">Save</Button>
      <Button type="button" :size="size" severity="secondary" outlined>Cancel</Button>
      <Button type="button" :size="size" disabled aria-busy="true"
        ><Spinner
          size="var(--p-icon-size)"
          class="animate-spin motion-reduce:animate-none"
          aria-hidden="true"
        />Saving</Button
      >
    </div>
    <Button type="button" :size="size" severity="secondary" outlined class="whitespace-normal"
      >Review quantities before confirming your order</Button
    >
    <SplitButton
      label="Export"
      :size="size"
      :model="[{ label: 'Download CSV' }, { label: 'Download PDF' }]"
      :menuButtonProps="{ 'aria-label': 'Export options' }"
    />
    <ToggleButton
      v-model="checked"
      :size="size"
      onLabel="Selected"
      offLabel="Select"
      aria-label="Select this item"
    />
    <SelectButton
      v-model="view"
      :size="size"
      :options="['List', 'Grid']"
      :allowEmpty="false"
      aria-label="Layout preview"
    />
    <div class="flex flex-col gap-2">
      <label :for="`${id}-invalid`" class="font-medium">Invalid</label>
      <InputText
        :id="`${id}-invalid`"
        :size="size"
        invalid
        :aria-describedby="`${id}-error`"
        fluid
      />
      <p :id="`${id}-error`" class="text-sm text-danger">Enter a valid reference.</p>
    </div>
    <div class="flex flex-col gap-2">
      <label :for="`${id}-disabled`" class="font-medium">Disabled</label>
      <InputText :id="`${id}-disabled`" :size="size" modelValue="Unavailable" disabled fluid />
    </div>
    <div class="flex flex-col gap-2">
      <label :for="`${id}-filled`" class="font-medium">Filled</label>
      <InputText :id="`${id}-filled`" :size="size" modelValue="FTF-1042" variant="filled" fluid />
    </div>
    <div class="flex flex-wrap items-center gap-3">
      <div class="flex items-center gap-2">
        <Checkbox :inputId="`${id}-check`" v-model="checked" :size="size" binary /><label
          :for="`${id}-check`"
          >Select</label
        >
      </div>
      <div class="flex items-center gap-2">
        <RadioButton :inputId="`${id}-radio`" :modelValue="true" :value="true" :size="size" /><label
          :for="`${id}-radio`"
          >Option</label
        >
      </div>
      <div class="flex items-center gap-2">
        <ToggleSwitch :inputId="`${id}-switch`" v-model="checked" /><label :for="`${id}-switch`"
          >Enabled</label
        >
      </div>
    </div>
  </div>
</template>
