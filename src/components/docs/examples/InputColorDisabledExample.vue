<script setup lang="ts">
import { colorValue } from '@/theme/erp-theme/foundations/color-tokens'
const value = colorValue('green.500').value
</script>

<template>
  <fieldset class="flex max-w-xs flex-col gap-3">
    <legend class="mb-3 font-medium">Unavailable colour control</legend>
    <InputColor :modelValue="value" format="hex" disabled
      ><InputColorArea><InputColorAreaBackground /><InputColorAreaHandle /></InputColorArea
      ><label for="disabled-colour-hex">Hex value</label
      ><InputColorInput id="disabled-colour-hex" channel="hex" fluid
    /></InputColor>
  </fieldset>
</template>
