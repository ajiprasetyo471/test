<script setup>
import activityImg from '@/assets/images/image-activity-detail.jpg'
import activityImg1 from '@/assets/images/image-activity-dashboard-1.jpg'
import activityImg2 from '@/assets/images/image-activity-dashboard-2.jpg'

import ActivityBanner from './ActivityBanner.vue'
import ActivityRecommend from './ActivityRecommend.vue'
</script>

<template>
  <VContainer>
    <ActivityBanner
      :imgs="[activityImg, activityImg1, activityImg2]"
      :title="'Jakarta Fun Football'"
      :location="'Jl. Jombang Raya, Parigi, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15227'"
      :amount="'150.000'"
    />
    <VRow no-gutters class="mt-4">
      <VCol cols="12">
        <h2 class="font-weight-black text-body-1">Detail Aktivitas</h2>
      </VCol>
      <VCol cols="12">
        <VCard class="pa-4 border-thin rounded-lg" elevation="0">
          <VRow no-gutters>
            <VCol cols="6">
              <CardCategoryItem
                :icon="'solar:bag-check-outline'"
                :category="'Kategori'"
                :title="'Publik'"
              />
              <CardCategoryItem
                class="mt-3"
                :icon="'solar:calendar-outline'"
                :category="'Tipe Aktivitas'"
                :title="'Event'"
              />
              <CardCategoryItem
                class="mt-3"
                :icon="'ion:golf-outline'"
                :category="'Tipe Venue'"
                :title="'Outdoor'"
              />
              <CardCategoryItem
                class="mt-3"
                :icon="'solar:calendar-outline'"
                :category="'Hari dan Tanggal'"
                :title="'Selasa, 26 Agustus 2024'"
              />
            </VCol>
            <VCol cols="6">
              <CardCategoryItem
                :icon="'akar-icons:people-group'"
                :category="'Jumlah Peserta'"
                :title="'2/20'"
              />
              <CardCategoryItem
                class="mt-3"
                :icon="'streamline:star-badge'"
                :category="'Level Aktivitas'"
                :title="'Beginner'"
              />
              <CardCategoryItem
                class="mt-3"
                :icon="'solar:dollar-linear'"
                :category="'Metode Pembayaran'"
                :title="'Cash or Transfer'"
              />
              <CardCategoryItem
                class="mt-3"
                :icon="'solar:clock-circle-outline'"
                :category="'Jam Aktivitas'"
                :title="'23:00 - 24:00'"
              />
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
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
    <VRow no-gutters class="mt-4">
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <h2 class="font-weight-black text-body-1">Fasilitas Venue</h2>
        <VBtn
          class="text-xxs text-none text-text-blue"
          append-icon="mdi-chevron-right"
          variant="text"
          >Selengkapnya Aturan Venue</VBtn
        >
      </VCol>
      <VCol cols="12">
        <VCard class="px-4 py-6 border-thin rounded-lg" elevation="0">
          <VRow no-gutters>
            <VCol cols="6">
              <div class="d-flex align-center">
                <Icon
                  icon="streamline:parking-sign"
                  class="text-text-orange"
                  style="font-size: 17px"
                />
                <span class="text-xxs ml-2">Tempat Parkir</span>
              </div>
              <div class="d-flex align-center mt-4">
                <Icon
                  icon="hugeicons:the-prophets-mosque"
                  class="text-text-orange"
                  style="font-size: 17px"
                />
                <span class="text-xxs ml-2">Tempat Ibadah</span>
              </div>
            </VCol>
            <VCol cols="6">
              <div class="d-flex align-center">
                <Icon icon="iconoir:wifi-tag" class="text-text-orange" style="font-size: 17px" />
                <span class="text-xxs ml-2">Wifi</span>
              </div>
              <div class="d-flex align-center mt-4">
                <Icon
                  icon="solar:camera-outline"
                  class="text-text-orange"
                  style="font-size: 17px"
                />
                <span class="text-xxs ml-2">Photographer</span>
              </div>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
    <VRow no-gutters class="mt-4">
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <h2 class="font-weight-black text-body-1">Detail Alamat</h2>
        <VBtn
          class="text-xxs text-none text-text-blue"
          append-icon="mdi-chevron-right"
          variant="text"
          >Lihat Peta</VBtn
        >
      </VCol>
      <VCol cols="12">
        <VCard class="pa-2 pb-4 border-thin" rounded="lg" elevation="0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.02633450596!2d106.79392917482946!3d-6.260261393728288!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f1d33b90081b%3A0x3df9583ec2ec8795!2sPT%20Bayarind%20Artha%20Internusa!5e0!3m2!1sen!2sid!4v1725613597414!5m2!1sen!2sid"
            width="100%"
            height="150"
            style="border: 0; border-radius: 5px"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <p class="text-xs font-weight-black text-text-grey">Tangerang Selatan</p>
          <p class="text-xxs text-text-grey">
            Jl. Jombang Raya, Parigi, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15227
          </p>
        </VCard>
      </VCol>
    </VRow>
    <VRow no-gutters class="mt-4">
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <h2 class="font-weight-black text-body-1">Rekomendasi Aktivitas</h2>
        <VBtn
          class="text-xxs text-none text-text-blue"
          append-icon="mdi-chevron-right"
          variant="text"
          >Lihat Lebih Banyak</VBtn
        >
      </VCol>
      <VCol cols="12">
        <ActivityRecommend
          :img="activityImg2"
          :title="'3 On 3 Community'"
          :location="'Tangerang Selatan'"
          :amount="'100.000'"
        />
      </VCol>
    </VRow>
  </VContainer>
</template>
