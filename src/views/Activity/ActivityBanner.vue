<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  imgs: {
    type: Array,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  activities: {
    type: Array,
    required: false
  },
  amount: {
    type: String,
    required: true
  }
})
</script>

<template>
  <VCard class="pa-2 border-thin rounded-lg" elevation="0">
    <VRow no-gutters>
      <VCol cols="12">
        <VCarousel :show-arrows="false" class="rounded-lg" height="176">
          <VCarouselItem
            v-for="(img, index) in props.imgs"
            :key="index"
            :src="img"
            cover
          ></VCarouselItem>
        </VCarousel>
      </VCol>
    </VRow>
    <VRow no-gutters class="pa-2">
      <VCol cols="12">
        <h3 class="font-weight-black text-body-2">{{ props.title }}</h3>
      </VCol>
      <VCol cols="12" class="mt-2">
        <p class="text-xs text-text-grey">{{ props.location }}</p>
      </VCol>
      <VCol cols="12" class="mt-4 d-flex align-center justify-space-between">
        <span class="text-text-orange text-body-2 font-weight-black"> Rp {{ props.amount }} </span>
        <VBtn class="bg-text-orange text-none" variant="text" rounded density="comfortable">
          Join
        </VBtn>
      </VCol>
    </VRow>
  </VCard>
</template>

<style scoped>
::v-deep .v-carousel__controls__item.v-btn.v-btn--icon .v-btn__content .mdi-circle {
  color: #fff; /* Background color of non-active ones */
}

::v-deep .v-carousel__controls__item.v-btn.v-btn--icon.v-btn--active .v-btn__content .mdi-circle {
  color: #f87304; /* Colour for active one */
}
</style>
