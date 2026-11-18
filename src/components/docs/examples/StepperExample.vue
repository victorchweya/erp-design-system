<template>
  <Stepper value="1"
    ><StepList><Step value="1">Details</Step><Step value="2">Review</Step></StepList
    ><StepPanels
      ><StepPanel v-slot="{ activateCallback }" value="1"
        ><div class="flex flex-col gap-4">
          <p>Check your delivery address and contact details.</p>
          <Button type="button" class="self-start" @click="activateCallback('2')">Next</Button>
        </div></StepPanel
      ><StepPanel v-slot="{ activateCallback }" value="2"
        ><div class="flex flex-col gap-4">
          <p>Review quantities before confirming your order.</p>
          <Button
            type="button"
            severity="secondary"
            class="self-start"
            @click="activateCallback('1')"
            >Back</Button
          >
        </div></StepPanel
      ></StepPanels
    ></Stepper
  >
</template>
