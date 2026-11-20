<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import vKeyfilter from 'primevue/keyfilter'

// KeyFilter tests each key press. The full SKU format is still validated separately.
const skuKeys = /^[A-Za-z0-9-]$/
const skuFormat = /^FTF-[A-Z]{3}-\d{3}$/i

const sku = shallowRef('')
const touched = shallowRef(false)
const invalid = computed(() => touched.value && sku.value !== '' && !skuFormat.test(sku.value))
</script>

<template>
  <div class="flex flex-col gap-1 sm:max-w-xs">
    <label for="keyfilter-sku" class="font-medium">Product SKU</label
    ><InputText
      id="keyfilter-sku"
      v-model="sku"
      v-keyfilter="skuKeys"
      :invalid="invalid"
      @blur="touched = true"
      autocomplete="off"
      :aria-describedby="invalid ? 'keyfilter-sku-help keyfilter-sku-error' : 'keyfilter-sku-help'"
      fluid
    />
    <p id="keyfilter-sku-help" class="text-muted-color">
      Letters, digits and hyphens, for example FTF-TOM-001.
    </p>
    <p v-if="invalid" id="keyfilter-sku-error" class="text-danger">Use the format FTF-ABC-123.</p>
  </div>
</template>
