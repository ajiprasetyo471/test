<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  }
})
</script>

<template>
  <VRow no-gutters>
    <VCol cols="12" class="mb-2">
      <h2 class="font-weight-black text-body-1">{{ props.title }}</h2>
      <span class="text-text-grey-2 text-caption">{{ props.desc }}</span>
    </VCol>
    <VCol cols="12">
      <slot />
    </VCol>
  </VRow>
</template>
