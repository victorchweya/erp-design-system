<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <label for="delivery-regions-invalid" class="font-medium">Delivery regions</label
      ><InputTags
        inputId="delivery-regions-invalid"
        fluid
        invalid
        :inputProps="{ 'aria-describedby': 'delivery-regions-invalid-error' }"
      />
      <p id="delivery-regions-invalid-error" class="text-danger">
        Add at least one delivery region.
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="certifications-disabled" class="font-medium">Certifications</label
      ><InputTags
        inputId="certifications-disabled"
        :modelValue="['GlobalG.A.P.', 'KEBS']"
        fluid
        disabled
        :inputProps="{ 'aria-describedby': 'certifications-disabled-help' }"
      />
      <p id="certifications-disabled-help" class="text-muted-color">
        Managed by the compliance team.
      </p>
    </div>
  </div>
</template>
