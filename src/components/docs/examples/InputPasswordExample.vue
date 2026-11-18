<script setup lang="ts">
import { shallowRef } from 'vue'
import Eye from '@primeicons/vue/eye'
import EyeSlash from '@primeicons/vue/eye-slash'
const password = shallowRef('')
const mask = shallowRef(true)
</script>

<template>
  <div class="flex max-w-sm flex-col gap-1">
    <label for="account-password" class="font-medium">Password</label
    ><InputGroup
      ><InputPassword
        id="account-password"
        v-model="password"
        :mask="mask"
        autocomplete="new-password"
        fluid
        aria-describedby="password-help" /><InputGroupAddon
        ><Button
          type="button"
          iconOnly
          text
          severity="secondary"
          aria-label="Show password"
          :aria-pressed="!mask"
          aria-controls="account-password"
          @click="mask = !mask"
          ><Eye v-if="mask" aria-hidden="true" /><EyeSlash
            v-else
            aria-hidden="true" /></Button></InputGroupAddon
    ></InputGroup>
    <p id="password-help" class="text-muted-color">
      This value stays in the preview and is never submitted.
    </p>
  </div>
</template>
