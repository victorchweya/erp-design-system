<template>
  <Card>
    <template #title><h3>Order summary</h3></template>
    <template #subtitle>Ready for review</template>
    <template #content
      ><p>Review quantities and delivery details before confirming your order.</p></template
    >
    <template #footer
      ><div class="flex flex-wrap gap-2">
        <Button type="button" size="small" severity="secondary" outlined>Edit order</Button
        ><Button type="button" size="small">Confirm order</Button>
      </div></template
    >
  </Card>
</template>
