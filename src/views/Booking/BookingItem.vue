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

const dynamicStyle = computed(() => {
  return {
    border:
      props.status === 'paid'
        ? '1px solid #B2DDFF;'
        : props.status === 'pending'
          ? '1px solid #ffe5b2'
          : ''
  }
})
</script>

<template>
  <div class="cardTop pa-4">
    <VRow no-gutters>
      <VCol cols="9">
        <h2 class="text-body-2 font-weight-bold">{{ props.title }}</h2>
        <p class="text-xxs text-text-grey-2">{{ props.location }}</p>
      </VCol>
      <VCol cols="3" class="d-flex justify-end">
        <div style="height: 48px; width: 48px; border-radius: 20px !important">
          <VImg
            :src="props.img"
            cover
            style="height: 48px; object-fit: cover; object-position: center"
          />
        </div>
      </VCol>
    </VRow>
  </div>
  <div class="cardBottom pa-4">
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center">
        <Icon icon="solar:calendar-outline" />
        <span class="text-xxs ml-2">{{ props.date }}</span>
      </div>
      <div class="d-flex align-center">
        <Icon icon="solar:clock-circle-outline" />
        <span class="text-xxs ml-2">{{ props.time }}</span>
      </div>
      <v-chip color="orange">
        <span class="text-text-orange text-caption font-weight-black">Rp {{ props.amount }}</span>
      </v-chip>
    </div>
    <VCard
      class="pa-4 mt-4"
      :class="{
        'bg-bg-blue-light-2 border-paid': props.status == 'paid',
        'bg-bg-yellow border-pending': props.status == 'pending',
        'bg-text-red-2': props.status == 'failed'
      }"
      :style="dynamicStyle"
      elevation="0"
      rounded="lg"
    >
      <div class="d-flex align-center justify-space-between">
        <span class="text-caption">Payment Status</span>
        <span class="text-caption font-weight-bold">{{ props.status.toUpperCase() }}</span>
      </div>
    </VCard>
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
