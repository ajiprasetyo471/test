<script setup>
import { formatNumber } from '@/helpers/helpers'

const props = defineProps({
  img: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: false
  },
  activity: {
    type: String,
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
        <div class="" style="height: 86px; border-radius: 20px !important">
          <VImg
            :src="props.img"
            cover
            style="height: 86px; object-fit: cover; object-position: center"
          />
        </div>
      </VCol>
    </VRow>
    <VRow no-gutters class="pa-2">
      <VCol cols="12">
        <h3 class="font-weight-black text-xs">{{ props.title }}</h3>
      </VCol>
      <VCol v-if="props.location" cols="12" class="mt-1">
        <div class="d-flex justify-start">
          <Icon icon="solar:map-point-linear" class="mr-2 text-text-grey" />
          <p class="text-xxs text-text-grey">{{ props.location }}</p>
        </div>
      </VCol>
      <VCol v-if="props.activity" cols="12" class="mt-1">
        <div class="d-flex justify-start">
          <Icon
            :icon="
              props.activity == 'Futsal'
                ? 'iconoir:basketball-field'
                : 'fluent-emoji-high-contrast:basketball'
            "
            class="mr-2 text-text-grey"
          />
          <p class="text-xxs text-text-grey">{{ props.activity }}</p>
        </div>
      </VCol>
      <VCol cols="12" class="mt-2">
        <span class="text-text-orange text-caption font-weight-black">
          Rp {{ formatNumber(props.amount) }}
        </span>
      </VCol>
    </VRow>
  </VCard>
</template>
