<script setup lang="ts">
import activityImg from '@/assets/images/image-activity-detail.jpg'
import activityImg1 from '@/assets/images/image-activity-dashboard-1.jpg'
import activityImg2 from '@/assets/images/image-activity-dashboard-2.jpg'

import VenueBanner from './VenueBanner.vue'
</script>

<template>
  <VContainer>
    <VenueBanner
      :imgs="[activityImg1, activityImg, activityImg2]"
      :title="'Jakarta Fun Football'"
      :location="'Jl. Jombang Raya, Parigi, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15227'"
      :amount="'150.000'"
    />
    <VRow no-gutters class="mt-4">
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <h2 class="font-weight-black text-body-1">Tentang Venue</h2>
        <VBtn
          class="text-xxs text-none text-text-blue"
          append-icon="mdi-chevron-right"
          variant="text"
          >Selengkapnya Tentang Venue</VBtn
        >
      </VCol>
      <VCol cols="12">
        <VCard class="pa-4 border-thin rounded-lg" elevation="0">
          <p class="text-xxs">
            DM Sport  merupakan salah satu fasilitas olahraga (Sport Complex) yang berada di daerah
            Ciledug, Tangerang Selatan. DM Sport memiliki 1 lapangan bola standar FIFA dan 2
            lapangan mini soccer, dengan menggunakan 100% rumput sintetis berstandar FIFA .
          </p>
          <div class="d-flex justify-space-between align-center mt-4">
            <VBtn
              class="border-thin rounded-lg text-xxxs text-none px-3"
              variant="text"
              density="compact"
              readonly
            >
              <Icon icon="mdi:whatsapp" style="font-size: 17px" class="mr-1" />
              <span>+62 812 3456 7890</span>
            </VBtn>
            <VBtn
              class="border-thin rounded-lg text-xxxs text-none px-3"
              variant="text"
              density="compact"
              readonly
            >
              <Icon icon="iconoir:instagram" style="font-size: 17px" class="mr-1" />
              <span>DM_Arena</span>
            </VBtn>
            <VBtn
              class="border-thin rounded-lg text-xxxs text-none px-3"
              variant="text"
              density="compact"
            >
              <Icon icon="heroicons:qr-code-solid" style="font-size: 17px" class="mr-1" />
              <span>QR Code</span>
            </VBtn>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
