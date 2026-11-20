<script setup lang="ts">
import { shallowRef } from 'vue'
import { colorValue } from '@/theme/erp-theme/foundations/color-tokens'
const value = shallowRef(colorValue('green.500').value)
</script>

<template>
  <fieldset class="flex max-w-xs flex-col gap-3">
    <legend class="mb-3 font-medium">Custom label colour</legend>
    <InputColor v-model="value" format="hex">
      <InputColorArea><InputColorAreaBackground /><InputColorAreaHandle /></InputColorArea>
      <div class="flex items-center gap-3">
        <InputColorSlider class="flex-1"
          ><InputColorSliderTrack /><InputColorSliderHandle /></InputColorSlider
        ><InputColorSwatch aria-hidden="true"><InputColorSwatchBackground /></InputColorSwatch>
      </div>
      <label id="label-colour-hex-label" for="label-colour-hex">Hex value</label
      ><InputColorInput
        id="label-colour-hex"
        channel="hex"
        aria-labelledby="label-colour-hex-label"
        fluid
      />
    </InputColor>
    <p class="text-muted-color">Selected: {{ value }}</p>
  </fieldset>
</template>
