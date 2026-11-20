<template>
  <div class="flex max-w-sm flex-col gap-4" aria-busy="true">
    <div class="flex items-center gap-3">
      <Skeleton shape="circle" size="3rem" />
      <div class="flex flex-1 flex-col gap-2"><Skeleton width="70%" /><Skeleton width="45%" /></div>
    </div>
    <Skeleton height="6rem" /><Skeleton width="85%" /><Skeleton width="60%" />
    <span class="sr-only" role="status">Loading order details.</span>
  </div>
</template>
