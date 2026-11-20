<script setup lang="ts">
import { computed, shallowRef, watch } from 'vue'
import Check from '@primeicons/vue/check'
import Spinner from '@primeicons/vue/spinner'

const customers: Record<string, string> = {
  'FTF-C-0187': 'Mama Njeri Grocers, Kawangware',
  'FTF-C-0342': 'Baraka Fresh Mart, Githurai 45',
  'FTF-C-0519': 'Kibandaski Cafe, Kayole',
}

const account = shallowRef('')
const checking = shallowRef(false)
const customer = shallowRef<string | null>(null)

watch(account, (value, _previous, onCleanup) => {
  customer.value = null
  const reference = value.trim().toUpperCase()
  if (!reference) {
    checking.value = false
    return
  }
  checking.value = true
  // Simulates an account lookup; cancel it when the value changes again.
  const timer = setTimeout(() => {
    customer.value = customers[reference] ?? null
    checking.value = false
  }, 700)
  onCleanup(() => clearTimeout(timer))
})

const status = computed(() => {
  if (checking.value) return 'Checking account…'
  if (customer.value) return `Account found: ${customer.value}.`
  return account.value.trim() ? 'No customer has this account number.' : ''
})
</script>

<template>
  <div class="flex flex-col gap-1 sm:max-w-sm">
    <label for="iconfield-account" class="font-medium">Customer account number</label
    ><IconField
      ><InputText
        id="iconfield-account"
        v-model="account"
        placeholder="FTF-C-0187"
        autocomplete="off"
        :aria-busy="checking"
        aria-describedby="iconfield-account-help iconfield-account-status"
        fluid /><InputIcon v-if="checking"
        ><Spinner
          class="motion-safe:animate-spin"
          aria-hidden="true"
          focusable="false" /></InputIcon
      ><InputIcon v-else-if="customer" class="text-success"
        ><Check aria-hidden="true" focusable="false" /></InputIcon
    ></IconField>
    <p id="iconfield-account-help" class="text-muted-color">Try FTF-C-0187 or FTF-C-0342.</p>
    <p id="iconfield-account-status" aria-live="polite">{{ status }}</p>
  </div>
</template>
