<script setup lang="ts">
import { shallowRef } from 'vue'
import vKeyfilter from 'primevue/keyfilter'
const crates = shallowRef('')
const adjustment = shallowRef('')
const weight = shallowRef('')
const price = shallowRef('')
const initials = shallowRef('')
const username = shallowRef('')
</script>

<template>
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    <div class="flex flex-col gap-1">
      <label for="keyfilter-crates" class="font-medium">Crates received</label
      ><InputText
        id="keyfilter-crates"
        v-model="crates"
        v-keyfilter.pint
        inputmode="numeric"
        aria-describedby="keyfilter-crates-help"
        fluid
      />
      <p id="keyfilter-crates-help" class="text-muted-color"><code>pint</code>: digits only.</p>
    </div>
    <div class="flex flex-col gap-1">
      <label for="keyfilter-adjustment" class="font-medium">Stock adjustment (crates)</label
      ><InputText
        id="keyfilter-adjustment"
        v-model="adjustment"
        v-keyfilter.int
        aria-describedby="keyfilter-adjustment-help"
        fluid
      />
      <p id="keyfilter-adjustment-help" class="text-muted-color">
        <code>int</code>: digits and a minus sign, for example -12.
      </p>
    </div>
    <div class="flex flex-col gap-1">
      <label for="keyfilter-weight" class="font-medium">Net weight (kg)</label
      ><InputText
        id="keyfilter-weight"
        v-model="weight"
        v-keyfilter.pnum
        inputmode="decimal"
        aria-describedby="keyfilter-weight-help"
        fluid
      />
      <p id="keyfilter-weight-help" class="text-muted-color">
        <code>pnum</code>: digits and a decimal point.
      </p>
    </div>
    <div class="flex flex-col gap-1">
      <label for="keyfilter-price" class="font-medium">Unit price (KES)</label
      ><InputText
        id="keyfilter-price"
        v-model="price"
        v-keyfilter.money
        inputmode="decimal"
        aria-describedby="keyfilter-price-help"
        fluid
      />
      <p id="keyfilter-price-help" class="text-muted-color">
        <code>money</code>: digits, decimal point, commas and spaces.
      </p>
    </div>
    <div class="flex flex-col gap-1">
      <label for="keyfilter-initials" class="font-medium">Receiver initials</label
      ><InputText
        id="keyfilter-initials"
        v-model="initials"
        v-keyfilter.alpha
        maxlength="3"
        aria-describedby="keyfilter-initials-help"
        fluid
      />
      <p id="keyfilter-initials-help" class="text-muted-color">
        <code>alpha</code>: letters and underscores.
      </p>
    </div>
    <div class="flex flex-col gap-1">
      <label for="keyfilter-username" class="font-medium">Integration username</label
      ><InputText
        id="keyfilter-username"
        v-model="username"
        v-keyfilter.alphanum
        autocomplete="off"
        aria-describedby="keyfilter-username-help"
        fluid
      />
      <p id="keyfilter-username-help" class="text-muted-color">
        <code>alphanum</code>: lowercase letters, digits and underscores.
      </p>
    </div>
  </div>
</template>
