<script setup lang="ts">
import { ref } from 'vue'

// In multiple mode, value is an array of open panel values.
const open = ref<string[]>(['supplier', 'items'])
</script>

<template>
  <Accordion v-model:value="open" multiple>
    <AccordionPanel value="supplier">
      <AccordionHeader>Supplier</AccordionHeader>
      <AccordionContent>
        <p>Kiambu Fresh Growers · KRA PIN P051234567X</p>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel value="items">
      <AccordionHeader>Items</AccordionHeader>
      <AccordionContent>
        <p>Sukuma wiki 120 kg, tomatoes 80 kg. Total KES 18,400.</p>
      </AccordionContent>
    </AccordionPanel>
    <AccordionPanel value="invoice" disabled>
      <AccordionHeader>Invoice (available after delivery)</AccordionHeader>
      <AccordionContent>
        <p>No invoice yet.</p>
      </AccordionContent>
    </AccordionPanel>
  </Accordion>
</template>
