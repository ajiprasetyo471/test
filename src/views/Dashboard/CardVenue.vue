<script setup>
const props = defineProps({
  img: {
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
        <h3 class="font-weight-black text-body-2">British School Jakarta Tennis</h3>
      </VCol>
      <VCol cols="12" class="mt-2">
        <div class="d-flex justify-start">
          <Icon icon="solar:map-point-linear" class="mr-4 text-text-grey" />
          <p class="text-xs text-text-grey">Serpong, Tangerang Selatan</p>
        </div>
        <div class="d-flex justify-start mt-1">
          <Icon icon="guidance:stadium" class="mr-4 text-text-grey" />
          <p class="text-xs text-text-grey">Futsal, Bola Basket</p>
        </div>
      </VCol>
      <VCol cols="12" class="mt-4">
        <span class="text-text-orange text-body-2 font-weight-black"> Rp 428.000 </span>
      </VCol>
    </VRow>
  </VCard>
</template>
