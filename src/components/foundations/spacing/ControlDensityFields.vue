<script setup lang="ts">
import { ref, shallowRef, useId } from 'vue'
import Check from '@primeicons/vue/check'
import type { AutoCompleteCompleteEvent } from 'primevue/autocomplete'

defineProps<{ size?: 'small' | 'large' }>()
const id = useId()
const produce = ['Carrot', 'Kale', 'Lime', 'Spinach', 'Tomato']
const selected = shallowRef('Kale')
const multiple = ref(['Kale'])
const tags = ref(['Kale', 'Carrot'])
const query = shallowRef('')
const suggestions = shallowRef<string[]>([])
const quantity = shallowRef(12)
const date = shallowRef<Date | null>(null)
const tree = [{ key: '0', label: 'Produce', children: [{ key: '0-0', label: 'Carrots' }] }]
const categories = [{ name: 'Vegetables', items: [{ name: 'Carrots' }, { name: 'Kale' }] }]
function search({ query }: AutoCompleteCompleteEvent) {
  suggestions.value = produce.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
}
</script>

<template>
  <div class="flex min-w-0 flex-col gap-4">
    <div class="flex flex-col gap-1">
      <label :for="`${id}-text`" class="font-medium">Text</label>
      <InputText :id="`${id}-text`" :size="size" modelValue="Fresh produce" fluid />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-password`" class="font-medium">Password</label>
      <InputPassword :id="`${id}-password`" :size="size" autocomplete="new-password" fluid />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-quantity`" class="font-medium">Number with spinner</label>
      <InputNumber
        :inputId="`${id}-quantity`"
        v-model="quantity"
        :size="size"
        showButtons
        :min="0"
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-quantity-horizontal`" class="font-medium">Horizontal spinner</label>
      <InputNumber
        :inputId="`${id}-quantity-horizontal`"
        v-model="quantity"
        :size="size"
        showButtons
        buttonLayout="horizontal"
        :min="0"
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-select`" class="font-medium">Select</label>
      <Select :inputId="`${id}-select`" v-model="selected" :options="produce" :size="size" fluid />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-multi`" class="font-medium">MultiSelect with chips</label>
      <MultiSelect
        :inputId="`${id}-multi`"
        v-model="multiple"
        :options="produce"
        :size="size"
        display="chip"
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-auto`" class="font-medium">AutoComplete</label>
      <AutoComplete
        :inputId="`${id}-auto`"
        v-model="query"
        :size="size"
        :suggestions="suggestions"
        @complete="search"
        dropdown
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-auto-multi`" class="font-medium">AutoComplete with chips</label>
      <AutoComplete
        :inputId="`${id}-auto-multi`"
        v-model="multiple"
        :size="size"
        :suggestions="suggestions"
        @complete="search"
        multiple
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-date`" class="font-medium">DatePicker with trigger</label>
      <DatePicker :inputId="`${id}-date`" v-model="date" :size="size" showIcon fluid />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-tree`" class="font-medium">TreeSelect</label>
      <TreeSelect
        :inputId="`${id}-tree`"
        :options="tree"
        :size="size"
        placeholder="Choose a category"
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-cascade`" class="font-medium">CascadeSelect</label>
      <CascadeSelect
        :inputId="`${id}-cascade`"
        :options="categories"
        optionLabel="name"
        optionGroupLabel="name"
        :optionGroupChildren="['items']"
        :size="size"
        placeholder="Choose produce"
        fluid
      />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-tags`" class="font-medium">InputTags</label>
      <InputTags :inputId="`${id}-tags`" v-model="tags" :size="size" fluid />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-notes`" class="font-medium">Textarea</label>
      <Textarea :id="`${id}-notes`" :size="size" :rows="2" placeholder="Delivery notes" fluid />
    </div>
    <div class="flex flex-col gap-1">
      <label :for="`${id}-group`" class="font-medium">Input group</label>
      <InputGroup
        ><InputGroupAddon>KES</InputGroupAddon
        ><InputNumber
          :inputId="`${id}-group`"
          :size="size"
          :modelValue="1200"
          fluid /><InputGroupAddon
          ><Button
            type="button"
            :size="size"
            iconOnly
            text
            severity="primary"
            aria-label="Check amount"
            ><Check aria-hidden="true" /></Button></InputGroupAddon
      ></InputGroup>
    </div>
    <fieldset class="min-w-0">
      <legend class="mb-2 font-medium">One-time code</legend>
      <InputOtp :size="size" integerOnly aria-label="Verification code" />
    </fieldset>
  </div>
</template>
