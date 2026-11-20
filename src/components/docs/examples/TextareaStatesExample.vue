<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <label for="rejection-reason-invalid" class="font-medium">Reason for rejection</label
      ><Textarea
        id="rejection-reason-invalid"
        rows="3"
        fluid
        invalid
        aria-describedby="rejection-reason-invalid-error"
      />
      <p id="rejection-reason-invalid-error" class="text-danger">
        Enter a reason so the supplier knows what to fix.
      </p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="dispatch-notes-disabled" class="font-medium">Delivery notes</label
      ><Textarea
        id="dispatch-notes-disabled"
        modelValue="Deliver to gate 2 before 7 am."
        rows="3"
        fluid
        disabled
        aria-describedby="dispatch-notes-disabled-help"
      />
      <p id="dispatch-notes-disabled-help" class="text-muted-color">
        Notes lock once the delivery is dispatched.
      </p>
    </div>
  </div>
</template>
