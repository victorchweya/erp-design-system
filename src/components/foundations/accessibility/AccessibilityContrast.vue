<script setup lang="ts">
import { contrastRatio, roleByName } from '@/theme/erp-theme/foundations/color-tokens'
import type { ColorPair } from '@/theme/erp-theme/foundations/color-tokens'

const textRoles = [
  'text.color',
  'text.muted.color',
  'form.field.placeholder.color',
  'severity.primary.background',
  'severity.success.background',
  'severity.info.background',
  'severity.warn.background',
  'severity.danger.background',
  'severity.danger.color',
]
const boundaryRoles = [
  'focus.ring.color',
  'form.field.focus.border.color',
  'form.field.invalid.border.color',
  'form.field.icon.color',
  'form.field.border.color',
  'content.border.color',
  'form.field.disabled.color',
]

function ratio({ foreground, background }: ColorPair) {
  return contrastRatio(foreground.value, background.value)
}

const rows = [
  ...textRoles.map((name) => ({ name, minimum: 4.5 })),
  ...boundaryRoles.map((name) => ({ name, minimum: 3 })),
].map(({ name, minimum }) => {
  const role = roleByName(name)
  const light = ratio(role.light)
  const dark = ratio(role.dark)
  const exempt = role.kind === 'disabled' || role.kind === 'decorative'
  const passes = Math.min(light, dark) >= minimum
  return {
    name,
    label: role.label,
    light: `${light.toFixed(2)}:1`,
    dark: `${dark.toFixed(2)}:1`,
    minimum: exempt ? 'Exempt' : `${minimum}:1`,
    result: exempt
      ? { label: role.kind === 'disabled' ? 'Disabled' : 'Decorative', severity: 'secondary' }
      : passes
        ? { label: 'Pass', severity: 'success' }
        : { label: 'Below', severity: 'warn' },
  }
})
const inputBorderNote = roleByName('form.field.border.color').note
</script>

<template>
  <div class="flex flex-col gap-3">
    <DataTable
      :value="rows"
      dataKey="name"
      size="small"
      showGridlines
      scrollable
      aria-label="Contrast ratios for FTF colour roles"
    >
      <Column field="label" header="Role"
        ><template #body="{ data }"
          ><span class="flex flex-col"
            ><span class="font-medium">{{ data.label }}</span
            ><code class="text-xs text-muted-color">{{ data.name }}</code></span
          ></template
        ></Column
      >
      <Column field="light" header="Light"
        ><template #body="{ data }"
          ><span class="whitespace-nowrap tabular-nums">{{ data.light }}</span></template
        ></Column
      >
      <Column field="dark" header="Dark"
        ><template #body="{ data }"
          ><span class="whitespace-nowrap tabular-nums">{{ data.dark }}</span></template
        ></Column
      >
      <Column field="minimum" header="Minimum"
        ><template #body="{ data }"
          ><span class="whitespace-nowrap tabular-nums">{{ data.minimum }}</span></template
        ></Column
      >
      <Column header="Result"
        ><template #body="{ data }"
          ><Tag :severity="data.result.severity" :value="data.result.label" /></template
      ></Column>
    </DataTable>
    <p class="text-muted-color">
      Ratios are calculated from the token pairs in
      <code class="text-color">color-tokens.ts</code>. Input border default: {{ inputBorderNote }}
    </p>
  </div>
</template>
