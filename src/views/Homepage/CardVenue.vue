<script setup>
import { formatNumber } from '@/helpers/helpers'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  img: {
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
        <div class="" style="height: 176px; border-radius: 20px !important">
          <VImg
            :src="props.img"
            cover
            style="height: 176px; object-fit: cover; object-position: center"
          />
        </div>
      </VCol>
    </VRow>
    <VRow no-gutters class="pa-2">
      <VCol cols="12">
        <h3 class="font-weight-black text-body-2">{{ props.title }}</h3>
      </VCol>
      <VCol cols="12" class="mt-2">
        <div class="d-flex justify-start">
          <div style="width: 10%">
            <Icon icon="solar:map-point-linear" class="mr-4 text-text-grey" />
          </div>
          <p style="width: 90%" class="text-xs text-text-grey">{{ props.location }}</p>
        </div>
        <div class="d-flex justify-start mt-1">
          <div style="width: 10%">
            <Icon icon="iconoir:basketball-field" class="mr-4 text-text-grey" />
          </div>
          <p style="width: 90%" class="text-xs text-text-grey">
            <span v-for="(item, index) in props.activities" :key="index"
              >{{ item }} {{ index == props.activities.length - 1 ? '' : ', ' }}</span
            >
          </p>
        </div>
      </VCol>
      <VCol cols="12" class="mt-4">
        <span class="text-text-orange text-body-2 font-weight-black">
          Rp {{ formatNumber(props.amount) }}
        </span>
      </VCol>
    </VRow>
  </VCard>
</template>
