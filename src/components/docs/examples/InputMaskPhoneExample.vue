<script setup lang="ts">
import { shallowRef } from 'vue'
const phone = shallowRef('')
</script>

<template>
  <div class="flex flex-col gap-1 sm:max-w-xs">
    <label for="supplier-phone" class="font-medium">Supplier phone number</label
    ><InputMask
      id="supplier-phone"
      v-model="phone"
      mask="+254 999 999 999"
      placeholder="+254 712 345 678"
      unmask
      type="tel"
      aria-describedby="supplier-phone-help"
      fluid
    />
    <p id="supplier-phone-help" class="text-muted-color">
      Enter the nine digits after +254, for example 712 345 678.
    </p>
    <p class="text-muted-color">
      Saved value: <code>{{ phone || '—' }}</code>
    </p>
  </div>
</template>
