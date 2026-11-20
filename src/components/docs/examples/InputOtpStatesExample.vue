<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <fieldset class="flex min-w-0 flex-col gap-2">
      <legend class="mb-2 font-medium">Approval code</legend>
      <InputOtp
        defaultValue="4821"
        :length="4"
        integerOnly
        invalid
        :pt="{
          pcInputText: {
            root: {
              'aria-label': 'Approval code digit',
              'aria-describedby': 'approval-code-invalid-error',
            },
          },
        }"
      />
      <p id="approval-code-invalid-error" class="text-danger">
        This code has expired. Request a new code.
      </p>
    </fieldset>
    <fieldset class="flex min-w-0 flex-col gap-2">
      <legend class="mb-2 font-medium">Verification code</legend>
      <InputOtp
        :length="4"
        integerOnly
        disabled
        :pt="{
          pcInputText: {
            root: {
              'aria-label': 'Verification code digit',
              'aria-describedby': 'verification-code-disabled-help',
            },
          },
        }"
      />
      <p id="verification-code-disabled-help" class="text-muted-color">
        Request a code before entering it.
      </p>
    </fieldset>
  </div>
</template>
