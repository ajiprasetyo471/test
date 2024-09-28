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
  },
  status: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="cardTop pa-4">
    <VRow no-gutters>
      <VCol cols="12" class="d-flex align-center">
        <VBtn size="36" class="bg-bg-blue-light" variant="text">
          <Icon
            class="text-blue"
            style="font-size: 20px"
            icon="material-symbols-light:stadium-outline"
          />
        </VBtn>
        <div class="ml-4">
          <h2 class="text-body-2 font-weight-bold">{{ props.title }}</h2>
          <h2 class="text-body-2 font-weight-bold">British School Jakarta</h2>
          <div class="d-flex align-center mt-2">
            <div class="d-flex align-center">
              <Icon class="text-text-grey" icon="fluent-emoji-high-contrast:basketball" />
              <span class="text-xxs text-text-grey-2">{{ props.activity }}</span>
              <span class="text-xxs text-text-grey-2 ml-1">Bola Basket</span>
            </div>
            <div class="d-flex align-center ml-4">
              <Icon class="text-text-grey" icon="iconoir:basketball-field" />
              <span class="text-xxs text-text-grey-2">{{ props.field }}</span>
              <span class="text-xxs text-text-grey-2 ml-1">21 x 11 m</span>
            </div>
          </div>
        </div>
      </VCol>
    </VRow>
  </div>
  <div class="cardBottom pt-0">
    <div
      class="px-4 pb-2 pt-3 ma-1"
      :class="{
        'bg-bg-grey': status == 'paid',
        'bg-bg-yellow': status == 'pending',
        'bg-text-red-2': status == 'failed'
      }"
      style="border-bottom-left-radius: 15px; border-bottom-right-radius: 15px"
    >
      <p class="text-caption">
        <span
          :class="{
            'text-text-grey': status == 'paid',
            'text-text-grey': status == 'pending',
            'text-white': status == 'failed'
          }"
          >Booking ID: </span
        ><span
          class="font-weight-black"
          :class="{
            'text-white': status == 'failed'
          }"
          >{{ status == 'paid' ? 'DUMMY 800K1N9' : '-' }}</span
        >
      </p>
    </div>
  </div>
  <VCard
    class="d-flex align-center justify-space-between pa-2 pr-4 border-thin rounded-lg mt-3"
    elevation="0"
  >
    <div class="d-flex align-center">
      <VBtn class="bg-white" size="27" variant="text">
        <Icon class="text-text-orange" icon="solar:calendar-outline" />
      </VBtn>
      <div class="ml-2">
        <p class="text-xxs text-text-grey">Date and Day</p>
        <p class="text-xxs">{{ props.date }}</p>
        <p class="text-xxs">Selasa, 26 Agustus 2024</p>
      </div>
    </div>
    <div class="d-flex align-center">
      <VBtn class="bg-white" size="27" variant="text">
        <Icon class="text-text-orange" icon="solar:clock-circle-outline" />
      </VBtn>
      <div class="ml-2">
        <p class="text-xxs text-text-grey">Booking Time</p>
        <p class="text-xxs">{{ props.time }}</p>
        <p class="text-xxs">23:00 - 24:00</p>
      </div>
    </div>
  </VCard>
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
    background: white;
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
