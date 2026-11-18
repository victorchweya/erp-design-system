<template>
  <div class="grid gap-6 md:grid-cols-2">
    <div class="flex flex-col gap-3">
      <h3 class="font-medium">Outlined</h3>
      <Message severity="success" variant="outlined">Stock was reconciled.</Message>
      <Message severity="info" variant="outlined">A new price list is available.</Message>
      <Message severity="warn" variant="outlined">Two items need review.</Message>
      <Message severity="error" variant="outlined">The import contains errors.</Message>
    </div>
    <div class="flex flex-col gap-3">
      <h3 class="font-medium">Simple</h3>
      <Message severity="success" variant="simple">Stock was reconciled.</Message>
      <Message severity="info" variant="simple">A new price list is available.</Message>
      <Message severity="warn" variant="simple">Two items need review.</Message>
      <Message severity="error" variant="simple">The import contains errors.</Message>
    </div>
  </div>
</template>
