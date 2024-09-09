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
      <VCol cols="12" class="d-flex align-center justify-start" style="gap: 10px">
        <div style="width: 27%">
          <div class="" style="height: 96px; width: 96px; border-radius: 20px !important">
            <VImg
              :src="props.img"
              cover
              rounded="lg"
              style="height: 96px; object-fit: cover; object-position: center"
            />
          </div>
        </div>
        <div style="width: 73%">
          <VRow no-gutters class="px-2">
            <VCol cols="12">
              <h3 class="font-weight-black text-body-2">{{ props.title }}</h3>
            </VCol>
            <VCol cols="12" class="mt-1">
              <div class="d-flex justify-start">
                <Icon icon="solar:map-point-linear" class="mr-2 text-text-grey" />
                <p class="text-xxs text-text-grey">{{ props.location }}</p>
              </div>
              <div class="d-flex justify-start mt-1">
                <Icon icon="iconoir:basketball-field" class="mr-4 text-text-grey" />
                <p class="text-xs text-text-grey">
                  <span v-for="(item, index) in props.activities" :key="index"
                    >{{ item }} {{ index == props.activities.length - 1 ? '' : ', ' }}</span
                  >
                </p>
              </div>
            </VCol>
            <VCol cols="12" class="mt-4">
              <span class="text-text-orange text-caption font-weight-black">
                Rp {{ props.amount }}
              </span>
            </VCol>
          </VRow>
        </div>
      </VCol>
    </VRow>
  </VCard>
</template>
