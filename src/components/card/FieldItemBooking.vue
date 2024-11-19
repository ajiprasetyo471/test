<script setup>
const props = defineProps({
  price: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="d-flex align-center justify-space-between">
    <div class="d-flex align-center">
      <Icon icon="solar:clock-circle-outline" class="text-text-orange" style="font-size: 17px" />
      <div class="d-flex flex-column ml-4">
        <span class="text-xxxs text-text-grey">Booking Time</span>
        <span class="text-xxs">{{ props.title }}</span>
      </div>
    </div>
    <span class="text-xxs font-weight-black">{{ props.price }}</span>
  </div>
</template>
