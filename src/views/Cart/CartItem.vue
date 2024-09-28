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
  date: {
    type: String,
    required: true
  },
  time: {
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
  <div class="cardTop pa-4">
    <VRow no-gutters>
      <VCol cols="12" class="d-flex align-center">
        <VCheckbox color="#00549B" class="rounded-xl" density="compact" hide-details />
        <h2 class="text-body-2 font-weight-black ml-2">{{ props.title }}</h2>
      </VCol>
    </VRow>
  </div>
  <div class="cardBottom pa-4 d-flex align-center justify-space-between">
    <VRow no-gutters>
      <VCol cols="12" class="d-flex align-center justify-start" style="gap: 10px">
        <div style="width: 30%">
          <div class="" style="height: 64px; border-radius: 20px !important">
            <VImg
              :src="props.img"
              cover
              rounded="lg"
              style="height: 64px; object-fit: cover; object-position: center"
            />
          </div>
        </div>
        <div style="width: 70%">
          <VRow no-gutters class="px-2">
            <div class="d-flex justify-start align-center">
              <!-- <div style="width: 10%"> -->
              <Icon icon="iconoir:basketball-field" class="text-text-grey" />
              <!-- </div> -->
              <p class="text-xxs text-text-grey ml-2">
                <span v-for="(item, index) in props.activities" :key="index"
                  >{{ item }} {{ index == props.activities.length - 1 ? '' : ', ' }}</span
                >
              </p>
            </div>
            <div class="d-flex align-center justify-space-between w-100 mt-1">
              <div class="d-flex align-center">
                <Icon icon="solar:calendar-outline" class="text-text-grey" />
                <span class="text-xxs ml-2 text-text-grey">{{ props.date }}</span>
              </div>
              <div class="d-flex align-center">
                <Icon icon="solar:clock-circle-outline" class="text-text-grey" />
                <span class="text-xxs ml-2 text-text-grey">{{ props.time }}</span>
              </div>
            </div>
            <VCol cols="12" class="mt-1">
              <VChip size="small" class="text-text-orange text-caption font-weight-black">
                Rp150.000
              </VChip>
            </VCol>
          </VRow>
        </div>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped lang="scss">
.cardTop {
  background: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 2px solid #eaebeb;
  position: relative;
  border-bottom: none;
}

.cardBottom {
  background: white;
  border: 2px solid #eaebeb;
  border-top: 2px dashed #eaebeb;
  border-bottom-left-radius: 20px;
  position: relative;
  border-bottom-right-radius: 20px;
  margin-top: -0.18em;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 1.4em; /* Ukuran cekungan lebih besar */
    height: 1.4em; /* Ukuran cekungan lebih besar */
    background: #f9fafb;
    border-radius: 50%;
    top: -0.75em;
  }

  &:before {
    left: -0.75em;
    border-right: 2px solid #b5b5b5;
  }

  &:after {
    right: -0.75em;
    border-left: 2px solid #b5b5b5;
  }
}
</style>
