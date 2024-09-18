<script setup>
defineOptions({
  name: 'PageSpinLoader',
  inheritAttrs: false
})

const props = defineProps({
  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:isLoading'])

const loadingModelValueUpdate = (val) => {
  emit('update:isLoading', val)
}
</script>

<template>
  <div class="w-screen d-flex justify-center pt-16" v-if="props.isLoading">
    <div class="text-center">
      <VProgressCircular indeterminate color="#1078CA" :size="28" :width="2" />
      <p class="text-body-1 mt-2">Please wait...</p>
    </div>
  </div>
</template>
