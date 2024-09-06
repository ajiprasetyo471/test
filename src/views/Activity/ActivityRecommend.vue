<script setup>
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
    required: true
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
      <VCol cols="6">
        <div class="" style="height: 96px; border-radius: 20px !important">
          <VImg
            :src="props.img"
            cover
            style="height: 96px; object-fit: cover; object-position: center"
          />
        </div>
      </VCol>
      <VCol cols="6">
        <VRow no-gutters class="px-2">
          <VCol cols="12">
            <h3 class="font-weight-black text-body-2">{{ props.title }}</h3>
          </VCol>
          <VCol cols="12" class="mt-1">
            <div class="d-flex justify-start">
              <Icon icon="solar:map-point-linear" class="mr-2 text-text-grey" />
              <p class="text-xxs text-text-grey">{{ props.location }}</p>
            </div>
          </VCol>
          <VCol cols="12" class="mt-8">
            <span class="text-text-orange text-caption font-weight-black">
              Rp {{ props.amount }}
            </span>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </VCard>
</template>
