<script setup>
import logo from '@/assets/images/detail-venue-logo.jpg'
import activityImg1 from '@/assets/images/image-venue-dashboard.jpg'
import activityImg2 from '@/assets/images/image-activity-detail.jpg'
import activityImg3 from '@/assets/images/image-activity-dashboard-1.jpg'
import activityImg4 from '@/assets/images/image-activity-dashboard-2.jpg'
import VenueBanner from './VenueBanner.vue'
import { useVenueStore } from '@/stores/venue.store.js'

const stores = useVenueStore()

const router = useRouter()

const cardItems = ref()

const goToDetail = (id) => {
  // appStores.setCurrentActivityId(id)
  router.push(`/venue/field/${id}`)
}

onMounted(() => {
  cardItems.value = stores.getFieldCards()
})
</script>

<template>
  <VContainer>
    <VenueBanner
      :imgs="[activityImg1, activityImg2, activityImg3, activityImg4]"
      :logo="logo"
      :title="'British School Jakarta Football'"
      :location="'Jl. Jombang Raya, Parigi, Kec. Pd. Aren, Kota Tangerang Selatan, Banten 15227'"
      :amount="'150.000'"
      :activities="['Futsal, Bola Basket']"
      :hours="'09:00 - 24:00'"
    />
    <VRow no-gutters class="mt-4">
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <h2 class="font-weight-black text-body-1">Pilih Lapangan</h2>
      </VCol>
      <VCol cols="12" class="pt-1 justify-space-between d-flex flex-wrap">
        <CardComponent
          max-width="48%"
          class="mb-4"
          v-for="item in cardItems"
          :key="item.id"
          :title="item.title"
          :activity="item.activity"
          :img="item.image"
          :amount="item.amount"
          @click="goToDetail(item.id)"
        />
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
            British School Jakarta (BSJ) didirikan di atas lahan seluas 18 hektar di Bintaro, 7km di
            arah barat daya dari Ibukota, dengan arsitektur yang di desain untuk mendukung kegiatan
            belajar-mengajar dengan kondisi terbaik.
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
              <span>britishschooljkt</span>
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
