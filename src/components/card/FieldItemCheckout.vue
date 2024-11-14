<script setup>
const props = defineProps({
  index: {
    type: Number,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['delete'])

const deleteItem = () => {
  emit('delete')
}
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
    <div class="d-flex align-center ga-5">
      <span class="text-xxs font-weight-black">{{ props.price }}</span>
      <Icon
        @click="deleteItem()"
        icon="solar:trash-bin-trash-linear"
        class="text-text-red-3"
        style="font-size: 15px"
      />
    </div>
  </div>
</template>
