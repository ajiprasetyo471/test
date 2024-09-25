<script setup>
import PageSpinLoader from '@/@core/components/PageSpinLoader.vue'
import VenueBanner from './VenueBanner.vue'
import moment from 'moment'
import { useVenueStore } from '@/stores/venue.store.js'
import { useSnackbarStore } from '@/stores/snackbar'
import { todaySchedule } from '@/helpers/helpers'

const stores = useVenueStore()
const snackStores = useSnackbarStore()

const route = useRoute()
const router = useRouter()

const currentDay = ref(moment().format('dddd').toLowerCase())

const goToDetail = (id) => {
  // stores.setVenueId(id)
  router.push(`/venue/field/${id}`)
}

const getVenueDetailData = (id) => {
  stores
    .getDetailVenue(id)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
      snackStores.openSnackbar(err?.message, 'error')
    })
}

const getVenueGalleryData = (id) => {
  stores
    .getDetailGallery(id)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
      snackStores.openSnackbar(err?.message, 'error')
    })
}

const getFieldData = async (id) => {
  try {
    const res = await stores.getFieldCards(id)
    console.log(res)
  } catch (err) {
    console.log(err)
    snackStores.openSnackbar(err?.message, 'error')
  }
}

onMounted(() => {
  getVenueDetailData(route.params.id)
  getVenueGalleryData(route.params.id)
  getFieldData(route.params.id)
})
</script>

<template>
  <VContainer v-if="!stores.loading">
    <VenueBanner
      :imgs="stores.venueGallery"
      :logo="stores.venueDetail?.logoPictureUrl"
      :title="stores.venueDetail?.venueName"
      :location="stores.venueDetail?.address"
      :amount="'150.000'"
      :activities="stores.venueDetail?.sportsType"
      :hours="todaySchedule(currentDay, stores.venueDetail)"
    />
    <VRow no-gutters class="mt-4">
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <h2 class="font-weight-black text-body-1">Select Field</h2>
      </VCol>
      <VCol cols="12" class="pt-1 justify-space-between d-flex flex-wrap">
        <CardComponent
          max-width="48%"
          class="mb-4"
          v-for="item in stores.fieldCards"
          :key="item.id"
          :title="item.name"
          :activity="item?.sportNamesId?.length > 0 ? item.sportNamesId[0] : ''"
          :img="item.coverPictureUrl"
          :amount="item.startingPrice"
          @click="goToDetail(item.id)"
        />
      </VCol>
    </VRow>
    <VRow no-gutters class="mt-4">
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <h2 class="font-weight-black text-body-1">About Venue</h2>
        <VBtn
          class="text-xxs text-none text-text-blue"
          append-icon="mdi-chevron-right"
          variant="text"
          >More About Venue</VBtn
        >
      </VCol>
      <VCol cols="12">
        <VCard class="pa-4 border-thin rounded-lg" elevation="0">
          <p v-html="stores.venueDetail?.venueDescription" class="text-xxs"></p>
          <div class="d-flex justify-space-between align-center mt-4">
            <VBtn
              class="border-thin rounded-lg text-xxxs text-none px-3"
              variant="text"
              density="compact"
              readonly
            >
              <Icon icon="mdi:whatsapp" style="font-size: 17px" class="mr-1" />
              <span>{{ stores.venueDetail?.contactNumber }}</span>
            </VBtn>
            <VBtn
              class="border-thin rounded-lg text-xxxs text-none px-3"
              variant="text"
              density="compact"
              readonly
            >
              <Icon icon="iconoir:instagram" style="font-size: 17px" class="mr-1" />
              <span>{{ stores.venueDetail?.instagram }}</span>
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
  <PageSpinLoader v-model:is-loading="stores.loading" />
</template>
