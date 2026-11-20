<template>
  <div class="grid gap-4 sm:grid-cols-3">
    <div class="flex flex-col gap-1">
      <label for="group-size-small">Small</label
      ><InputGroup
        ><InputGroupAddon>KES</InputGroupAddon
        ><InputNumber inputId="group-size-small" size="small" placeholder="0" fluid
      /></InputGroup>
    </div>
    <div class="flex flex-col gap-1">
      <label for="group-size-default">Default</label
      ><InputGroup
        ><InputGroupAddon>KES</InputGroupAddon
        ><InputNumber inputId="group-size-default" placeholder="0" fluid
      /></InputGroup>
    </div>
    <div class="flex flex-col gap-1">
      <label for="group-size-large">Large</label
      ><InputGroup
        ><InputGroupAddon>KES</InputGroupAddon
        ><InputNumber inputId="group-size-large" size="large" placeholder="0" fluid
      /></InputGroup>
    </div>
  </div>
</template>
