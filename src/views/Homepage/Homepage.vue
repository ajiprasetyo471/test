<script setup>
import SectionContainer from './SectionContainer.vue'
import CardVenue from './CardVenue.vue'

import { useHomeStore } from '@/stores/home.store'

const stores = useHomeStore()

const router = useRouter()

const venueRecommendationCard = ref()
const activityRecommendationCards = ref()
const bannerImg = ref()

const goToDetail = (id) => {
  // appStores.setCurrentActivityId(id)
  router.push(`/activity/${id}`)
}

onMounted(() => {
  venueRecommendationCard.value = stores.getVenueRecommendationCard()
  activityRecommendationCards.value = stores.getActivityRecommendationCards()
  bannerImg.value = stores.getBannerImageData()
})
</script>

<template>
  <VContainer class="pt-0">
    <SectionContainer :title="'Rekomendasi Venue'" :desc="'Temukan venue terbaik untuk bermain!'">
      <CardVenue
        :img="venueRecommendationCard?.image"
        :title="venueRecommendationCard?.title"
        :location="venueRecommendationCard?.location"
        :activities="venueRecommendationCard?.activities"
        :amount="venueRecommendationCard?.amount"
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
            v-for="item in activityRecommendationCards"
            @click="goToDetail(item.id)"
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
</template>
