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
  logo: {
    type: String,
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
  hours: {
    type: String,
    required: true
  }
})
</script>

<template>
  <VCard class="pa-2 border-thin rounded-lg" elevation="0">
    <VRow no-gutters>
      <VCol cols="12">
        <VCarousel :show-arrows="false" class="rounded-lg" height="200">
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
      <VCol cols="2">
        <div class="" style="height: 48px; width: 48px; border-radius: 20px !important">
          <VImg
            :src="props.logo"
            cover
            rounded="lg"
            style="height: 48px; object-fit: cover; object-position: center"
          />
        </div>
      </VCol>
      <VCol cols="10" class="">
        <h3 class="font-weight-black text-body-2">{{ props.title }}</h3>
        <p class="text-xs text-text-grey">{{ props.location }}</p>
      </VCol>
      <VCol cols="12" class="mt-4 d-flex align-center justify-space-between">
        <div class="d-flex justify-start mt-1">
          <Icon icon="iconoir:basketball-field" class="mr-2 text-text-grey" />
          <p class="text-xs text-text-grey">
            <span v-for="(item, index) in props.activities" :key="index"
              >{{ item }} {{ index == props.activities.length - 1 ? '' : ', ' }}</span
            >
          </p>
        </div>
        <div class="d-flex justify-start mt-1">
          <Icon icon="solar:clock-circle-outline" class="mr-2 text-text-grey" />
          <p class="text-xs text-text-grey">
            Jam Operasional:
            <span class="text-text-orange font-weight-bold">{{ props.hours }}</span>
          </p>
        </div>
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
