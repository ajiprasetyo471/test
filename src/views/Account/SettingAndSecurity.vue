<template>
  <VContainer>
    <VCard class="pa-4 pb-8 border-thin rounded-lg" elevation="0">
      <VRow no-gutters>
        <VCol cols="12" class="border-b-thin border-e-0 border-s-0 border-t-0 pb-2 mb-4">
          <p class="text-xxs text-text-grey font-weight-light">Setting</p>
        </VCol>
        <VCol cols="12" class="d-flex align-center justify-space-between w-100">
          <div class="d-flex align-center">
            <Icon icon="uiw:bell" class="text-h6" />
            <span class="text-caption font-weight-medium ml-2">Notification</span>
          </div>
          <VSwitch density="compact" hide-details color="#F87304" inset></VSwitch>
        </VCol>
        <VCol cols="12" class="d-flex align-center justify-space-between w-100 mt-6">
          <div class="d-flex align-center">
            <Icon icon="emojione:flag-for-indonesia" class="border-thin rounded-circle text-h6" />
            <p class="text-caption font-weight-medium ml-2">
              Bahasa <span class="text-text-grey">(Indonesia)</span>
            </p>
          </div>
          <Icon icon="material-symbols:chevron-right" />
        </VCol>
      </VRow>
    </VCard>
    <VCard class="pa-4 pb-8 border-thin rounded-lg mt-3" elevation="0">
      <VRow no-gutters>
        <VCol cols="12" class="border-b-thin border-e-0 border-s-0 border-t-0 pb-2 mb-4">
          <p class="text-xxs text-text-grey font-weight-light">Security</p>
        </VCol>

        <VCol cols="12" class="d-flex align-center justify-space-between w-100">
          <div class="d-flex align-center">
            <Icon icon="mdi:email-fast-outline" class="text-h6 font-weight-light" />
            <p class="text-caption font-weight-medium ml-2">
              Email <span class="text-text-grey">(dioluwi@gmail.com)</span>
            </p>
          </div>
          <Icon icon="material-symbols:chevron-right" />
        </VCol>
        <VCol cols="12" class="d-flex align-center justify-space-between w-100 mt-6">
          <div class="d-flex align-center">
            <Icon icon="solar:phone-calling-outline" class="text-h6" />
            <p class="text-caption font-weight-medium ml-2">
              Bahasa <span class="text-text-grey">(Indonesia)</span>
            </p>
          </div>
          <Icon icon="material-symbols:chevron-right" />
        </VCol>
      </VRow>
    </VCard>
  </VContainer>
</template>
