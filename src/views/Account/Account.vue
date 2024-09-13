<script setup>
import img from '@/assets/images/account-image.jpg'
</script>

<template>
  <VContainer>
    <VCard class="pa-4 border-thin rounded-lg" elevation="0">
      <VRow no-gutters>
        <VCol cols="12" class="d-flex align-center justify-start" style="gap: 10px">
          <div style="width: 25%">
            <div class="" style="height: 80px; width: 80px; border-radius: 20px !important">
              <VImg
                :src="img"
                cover
                rounded="lg"
                style="height: 80px; object-fit: cover; object-position: center"
              />
            </div>
          </div>
          <div style="width: 75%">
            <VRow no-gutters class="px-2">
              <VCol cols="12">
                <h3 class="font-weight-black text-body-2">Norman Ihsan Alpaca</h3>
              </VCol>
              <VCol cols="12" class="mt-1">
                <p class="text-xxs text-text-grey">norman.ihsan</p>
                <p class="text-xxs text-text-grey">norman.ihsan@gmail.com</p>
              </VCol>
              <VCol cols="12" class="mt-2">
                <VBtn
                  to="/account/profile"
                  class="text-bg-blue text-none pa-0 text-caption"
                  density="compact"
                  variant="text"
                >
                  Detail Profile <Icon icon="ic:round-chevron-right" />
                </VBtn>
              </VCol>
            </VRow>
          </div>
        </VCol>
      </VRow>
    </VCard>
    <VCard class="pa-4 pb-8 border-thin rounded-lg mt-3" elevation="0">
      <VRow no-gutters>
        <VCol cols="12" class="border-b-thin border-e-0 border-s-0 border-t-0 pb-2 mb-4">
          <p class="text-xxs text-text-grey font-weight-light">Setting</p>
        </VCol>
        <VCol cols="12">
          <RouterLink
            class="d-flex align-center justify-space-between w-100 text-black text-decoration-none"
            to="/account/setting-security"
          >
            <div class="d-flex align-center">
              <Icon icon="solar:settings-outline" class="text-h6" />
              <span class="text-caption font-weight-medium ml-2">Pengaturan dan Keamanan</span>
            </div>
            <Icon icon="material-symbols:chevron-right" />
          </RouterLink>
        </VCol>
      </VRow>
    </VCard>
    <VCard class="pa-4 pb-8 border-thin rounded-lg mt-3" elevation="0">
      <VRow no-gutters>
        <VCol cols="12" class="border-b-thin border-e-0 border-s-0 border-t-0 pb-2 mb-4">
          <p class="text-xxs text-text-grey font-weight-light">Support</p>
        </VCol>
        <VCol cols="12" class="d-flex align-center justify-space-between w-100">
          <div class="d-flex align-center">
            <Icon icon="solar:headphones-round-outline" class="text-h6" />
            <span class="text-caption font-weight-medium ml-2">Bantuan Pengguna</span>
          </div>
          <Icon icon="material-symbols:chevron-right" />
        </VCol>
        <VCol cols="12" class="d-flex align-center justify-space-between w-100 mt-6">
          <div class="d-flex align-center">
            <Icon icon="solar:chat-line-outline" class="text-h6" />
            <span class="text-caption font-weight-medium ml-2">Chatbot untuk Pemesanan</span>
          </div>
          <Icon icon="material-symbols:chevron-right" />
        </VCol>
        <VCol cols="12" class="d-flex align-center justify-space-between w-100 mt-6">
          <div class="d-flex align-center">
            <Icon icon="solar:star-outline" class="text-h6" />
            <span class="text-caption font-weight-medium ml-2">Beri Kami Feedback</span>
          </div>
          <Icon icon="material-symbols:chevron-right" />
        </VCol>
        <VCol cols="12" class="d-flex align-center justify-space-between w-100 mt-6">
          <div class="d-flex align-center">
            <Icon icon="solar:question-circle-outline" class="text-h6" />
            <span class="text-caption font-weight-medium ml-2">Bantuan</span>
          </div>
          <Icon icon="material-symbols:chevron-right" />
        </VCol>
      </VRow>
    </VCard>
    <VCard class="pa-4 pb-8 border-thin rounded-lg mt-3" elevation="0">
      <VRow no-gutters>
        <VCol cols="12" class="border-b-thin border-e-0 border-s-0 border-t-0 pb-2 mb-4">
          <p class="text-xxs text-text-grey font-weight-light">Support</p>
        </VCol>
        <VCol cols="12">
          <RouterLink
            class="d-flex align-center justify-space-between w-100 text-black text-decoration-none"
            to="/term-conditions"
          >
            <div class="d-flex align-center">
              <Icon icon="fluent:document-text-24-regular" class="text-h6" />
              <span class="text-caption font-weight-medium ml-2">Syarat dan Ketentuan</span>
            </div>
            <Icon icon="material-symbols:chevron-right" />
          </RouterLink>
        </VCol>
        <VCol cols="12" class="mt-6">
          <RouterLink
            class="d-flex align-center justify-space-between w-100 text-black text-decoration-none"
            to="/privacy-policy"
          >
            <div class="d-flex align-center">
              <Icon icon="solar:document-text-outline" class="text-h6" />
              <span class="text-caption font-weight-medium ml-2">Kebijakan Privasi</span>
            </div>
            <Icon icon="material-symbols:chevron-right" />
          </RouterLink>
        </VCol>
      </VRow>
    </VCard>
    <VCard class="px-4 py-8 border-thin rounded-lg mt-3" elevation="0">
      <VRow no-gutters>
        <VCol cols="12" class="d-flex align-center justify-space-between w-100">
          <div class="d-flex align-center">
            <Icon icon="lets-icons:sign-out-squre-light" class="text-h6" />
            <span class="text-caption font-weight-medium ml-2">Keluar Akun</span>
          </div>
          <Icon icon="material-symbols:chevron-right" />
        </VCol>
      </VRow>
    </VCard>
  </VContainer>
</template>
