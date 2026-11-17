<template>
  <div class="flex flex-wrap items-center gap-4">
    <Badge value="8" aria-label="8 items" /><Badge
      value="8"
      severity="secondary"
      aria-label="8 items, secondary"
    />
    <Badge value="8" severity="success" aria-label="8 completed" /><Badge
      value="8"
      severity="info"
      aria-label="8 updates"
    />
    <Badge value="8" severity="warn" aria-label="8 awaiting review" /><Badge
      value="8"
      severity="danger"
      aria-label="8 errors"
    />
    <Badge value="8" severity="contrast" aria-label="8 items, contrast" />
  </div>
</template>
