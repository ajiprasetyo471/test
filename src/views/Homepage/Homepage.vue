<script setup>
import SectionContainer from './SectionContainer.vue'
import CardVenue from './CardVenue.vue'
import PageSpinLoader from '@/@core/components/PageSpinLoader.vue'

import { useHomeStore } from '@/stores/home.store'
import { useActivityStore } from '@/stores/activity.store'
import { useVenueStore } from '@/stores/venue.store'
import { useSnackbarStore } from '@/stores/snackbar'

const stores = useHomeStore()
const activityStores = useActivityStore()
const venueStores = useVenueStore()
const snackStores = useSnackbarStore()

const router = useRouter()

const venueRecommendation = ref()
const activityRecommendation = ref([])
const bannerImg = ref()
const loading = ref(false)

const goToActivityDetail = (id) => {
  // appStores.setCurrentActivityId(id)
  router.push(`/activity/${id}`)
}

const goToVenueDetail = (id) => {
  // appStores.setCurrentActivityId(id)
  router.push(`/venue/${id}`)
}

const getVenueRecommendation = async () => {
  loading.value = true
  try {
    const response = await venueStores.getVenueCards({ homepage: true })

    if (response.success) {
      venueRecommendation.value = response?.data?.venueList[0]
    } else {
      // snackStores.openSnackbar(response.errors.message[0], 'error')
      venueRecommendation.value = null
    }
  } catch (err) {
    console.log(err)
    snackStores.openSnackbar(err?.message, 'error')
  } finally {
    loading.value = false
  }
}

const getActivityRecommendation = async () => {
  loading.value = true
  try {
    const response = await activityStores.getActivityCards({ bestOffer: true })

    if (response.success) {
      activityRecommendation.value = response?.data?.activitySessions
    } else {
      // snackStores.openSnackbar(response.errors.message[0], 'error')
      activityRecommendation.value = []
    }
  } catch (err) {
    console.log(err)
    snackStores.openSnackbar(err?.message, 'error')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getVenueRecommendation()
  getActivityRecommendation()

  bannerImg.value = stores.getBannerImageData()
})
</script>

<template>
  <VContainer v-if="!loading" class="pt-0">
    <SectionContainer :title="'Rekomendasi Venue'" :desc="'Temukan venue terbaik untuk bermain!'">
      <CardVenue
        :img="venueRecommendation?.coverPictureUrl"
        :title="venueRecommendation?.name"
        :location="venueRecommendation?.address"
        :activities="venueRecommendation?.sportTypes"
        :amount="venueRecommendation?.maxPriceRange"
        @click="goToVenueDetail(venueRecommendation?.id)"
      />
    </SectionContainer>
    <SectionContainer
      :title="'Rekomendasi Aktivitas'"
      :desc="'Seru-seruan dengan olahraga bersama!'"
      class="mt-8"
    >
      <VRow no-gutters>
        <VCol cols="12" class="d-flex" style="gap: 20px">
          <CardComponent
            v-for="item in activityRecommendation.slice(0, 2)"
            @click="goToActivityDetail(item.id)"
            :img="item.image"
            :title="item.title"
            :location="item.location"
            :amount="item.amount"
          />
        </VCol>
      </VRow>
    </SectionContainer>
    <VRow no-gutters class="mt-8">
      <VCol cols="12">
        <div class="" style="height: 120px; border-radius: 20px !important">
          <VImg
            :src="bannerImg"
            cover
            style="height: 120px; object-fit: cover; object-position: center"
          />
        </div>
      </VCol>
    </VRow>
  </VContainer>
  <PageSpinLoader v-model:is-loading="loading" />
</template>
