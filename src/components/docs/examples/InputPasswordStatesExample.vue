<template>
  <div class="grid gap-6 sm:grid-cols-2">
    <div class="flex flex-col gap-2">
      <label for="new-password-invalid" class="font-medium">New password</label
      ><InputPassword
        id="new-password-invalid"
        fluid
        autocomplete="new-password"
        invalid
        aria-describedby="new-password-invalid-error"
      />
      <p id="new-password-invalid-error" class="text-danger">Use at least 12 characters.</p>
    </div>
    <div class="flex flex-col gap-2">
      <label for="password-disabled" class="font-medium">Password</label
      ><InputPassword
        id="password-disabled"
        fluid
        autocomplete="current-password"
        disabled
        aria-describedby="password-disabled-help"
      />
      <p id="password-disabled-help" class="text-muted-color">
        Password sign-in is off for single sign-on accounts.
      </p>
    </div>
  </div>
</template>
