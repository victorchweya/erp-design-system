<script setup lang="ts">
import { computed, ref, shallowRef, useId, watch } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import ExclamationTriangle from '@primeicons/vue/exclamation-triangle'
import { counties, paymentTerms, supplierStatuses, type SupplierDetails } from './suppliers'

const props = defineProps<{ supplier: SupplierDetails }>()
const emit = defineEmits<{ save: [details: SupplierDetails]; 'after-hide': [] }>()
const visible = defineModel<boolean>('visible', { required: true })

const id = useId()
const confirm = useConfirm()
const draft = ref<SupplierDetails>({ ...props.supplier })
const errors = ref<Partial<Record<'name' | 'phone', string>>>({})
const submitted = shallowRef(false)
const confirmOpen = shallowRef(false)

// Start each edit from the saved record so cancelled changes never leak back in.
watch(visible, (open) => {
  if (!open) return
  draft.value = { ...props.supplier }
  errors.value = {}
  submitted.value = false
})

const dirty = computed(() =>
  (Object.keys(draft.value) as (keyof SupplierDetails)[]).some(
    (key) => draft.value[key] !== props.supplier[key],
  ),
)

function validate() {
  const next: typeof errors.value = {}
  if (!draft.value.name.trim()) next.name = 'Enter the supplier name.'
  if (!/^\+?[0-9 ]{9,16}$/.test(draft.value.phone.trim()))
    next.phone = 'Enter a phone number such as +254 712 340 118.'
  errors.value = next
  return Object.keys(next).length === 0
}

function save() {
  submitted.value = true
  if (!validate()) {
    document.getElementById(`${id}-${Object.keys(errors.value)[0]}`)?.focus()
    return
  }
  emit('save', { ...draft.value, name: draft.value.name.trim(), phone: draft.value.phone.trim() })
  visible.value = false
}

// Every close path (Cancel, close icon, Escape) goes through the unsaved-changes guard.
function requestClose() {
  if (!dirty.value) {
    visible.value = false
    return
  }
  confirmOpen.value = true
  confirm.require({
    group: id,
    header: 'Discard unsaved changes?',
    message: 'Your edits to this supplier have not been saved. Discard them and close the form?',
    icon: ExclamationTriangle,
    defaultFocus: 'reject',
    rejectProps: { label: 'Keep editing', severity: 'secondary', outlined: true },
    acceptProps: { label: 'Discard changes', severity: 'danger' },
    accept: () => {
      confirmOpen.value = false
      visible.value = false
    },
    reject: () => (confirmOpen.value = false),
    onHide: () => (confirmOpen.value = false),
  })
}

function onVisibleUpdate(value: boolean) {
  if (!value && !confirmOpen.value) requestClose()
}
</script>

<template>
  <Drawer
    :id="`${id}-drawer`"
    :visible="visible"
    header="Edit supplier"
    position="right"
    :dismissable="false"
    :closeOnEscape="!confirmOpen"
    blockScroll
    class="w-full sm:w-[28rem]"
    @update:visible="onVisibleUpdate"
    @after-hide="emit('after-hide')"
  >
    <form :id="`${id}-form`" novalidate class="flex flex-col gap-4 text-sm" @submit.prevent="save">
      <p class="text-muted">Changes apply only after you select Save changes.</p>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-name`" class="font-medium">Supplier name</label>
        <InputText
          :id="`${id}-name`"
          v-model="draft.name"
          required
          autofocus
          :invalid="submitted && !!errors.name"
          :aria-describedby="errors.name ? `${id}-name-error` : undefined"
          fluid
        />
        <Message
          v-if="submitted && errors.name"
          :id="`${id}-name-error`"
          severity="error"
          variant="simple"
          size="small"
          >{{ errors.name }}</Message
        >
      </div>
      <div class="grid gap-4 sm:grid-cols-2">
        <div class="flex flex-col gap-1">
          <label :for="`${id}-contact`" class="font-medium">Contact person</label>
          <InputText :id="`${id}-contact`" v-model="draft.contact" fluid />
        </div>
        <div class="flex flex-col gap-1">
          <label :for="`${id}-phone`" class="font-medium">Phone</label>
          <InputText
            :id="`${id}-phone`"
            v-model="draft.phone"
            type="tel"
            autocomplete="tel"
            required
            :invalid="submitted && !!errors.phone"
            :aria-describedby="errors.phone ? `${id}-phone-error` : undefined"
            fluid
          />
          <Message
            v-if="submitted && errors.phone"
            :id="`${id}-phone-error`"
            severity="error"
            variant="simple"
            size="small"
            >{{ errors.phone }}</Message
          >
        </div>
        <div class="flex flex-col gap-1">
          <label :for="`${id}-county`" class="font-medium">County</label>
          <Select :inputId="`${id}-county`" v-model="draft.county" :options="counties" fluid />
        </div>
        <div class="flex flex-col gap-1">
          <label :for="`${id}-terms`" class="font-medium">Payment terms</label>
          <Select
            :inputId="`${id}-terms`"
            v-model="draft.paymentTerms"
            :options="paymentTerms"
            fluid
          />
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-produce`" class="font-medium">Produce supplied</label>
        <InputText :id="`${id}-produce`" v-model="draft.produce" fluid />
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-status`" class="font-medium">Status</label>
        <Select
          :inputId="`${id}-status`"
          v-model="draft.status"
          :options="supplierStatuses"
          fluid
        />
      </div>
      <div class="flex flex-col gap-1">
        <label :for="`${id}-notes`" class="font-medium">Notes</label>
        <Textarea :id="`${id}-notes`" v-model="draft.notes" :rows="3" fluid />
      </div>
    </form>
    <template #footer>
      <div class="flex flex-wrap justify-end gap-2">
        <Button type="button" severity="secondary" outlined @click="requestClose">Cancel</Button>
        <Button type="submit" :form="`${id}-form`">Save changes</Button>
      </div>
    </template>
  </Drawer>
  <ConfirmDialog :group="id" class="w-[calc(100vw-2rem)] max-w-md" />
</template>
