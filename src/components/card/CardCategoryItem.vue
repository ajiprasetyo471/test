<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  category: {
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
  <div class="d-flex">
    <VBtn class="border-thin rounded-lg" variant="text" readonly size="32">
      <Icon :icon="props.icon" class="text-text-orange" style="font-size: 17px" />
    </VBtn>
    <div class="d-flex flex-column ml-2">
      <span class="text-xxxs text-text-grey">{{ props.category }}</span>
      <span class="text-xxs">{{ props.title }}</span>
    </div>
  </div>
</template>
