<script setup>
import SectionContainer from './SectionContainer.vue'
import CardVenue from './CardVenue.vue'

import venueImg from '@/assets/images/image-venue-dashboard.jpg'
import activityImg1 from '@/assets/images/image-activity-dashboard-1.jpg'
import activityImg2 from '@/assets/images/image-activity-dashboard-2.jpg'
import bannerImg from '@/assets/images/dashboard-banner.jpg'
</script>

<template>
  <VContainer class="pt-0">
    <SectionContainer :title="'Rekomendasi Venue'" :desc="'Temukan venue terbaik untuk bermain!'">
      <CardVenue :img="venueImg" />
    </SectionContainer>
    <SectionContainer
      :title="'Rekomendasi Aktivitas'"
      :desc="'Seru-seruan dengan olahraga bersama!'"
      class="mt-8"
    >
      <VRow no-gutters>
        <VCol cols="12" class="d-flex" style="gap: 20px">
          <CardComponent
            :img="activityImg1"
            :title="'Jakarta Fun Football'"
            :location="'Jakarta Selatan'"
            :amount="'150.000'"
          />
          <CardComponent
            :img="activityImg2"
            :title="'3 On 3 Community'"
            :location="'Tangerang Selatan'"
            :amount="'100.000'"
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
