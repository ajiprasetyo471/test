<script setup>
defineOptions({
  name: 'AppTextArea',
  inheritAttrs: false
})

const props = defineProps({
  errorMessages: {
    type: Array,
    default: () => []
  }
})

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label

  return _elementIdToken
    ? `app-text-area-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}`
    : undefined
})

const label = computed(() => useAttrs().label)
</script>

<template>
  <div class="app-text-area flex-grow-1" :class="$attrs.class">
    <label v-if="label" :for="elementId" class="mb-1 text-caption text-black font-weight-bold">
      {{ label }}
    </label>
    <VTextarea
      v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'outlined',
        id: elementId,
        rules: $attrs.rules || [],
        errorMessages: props.errorMessages
      }"
      rows="4"
      auto-grow
      rounded="lg"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </VTextarea>
  </div>
</template>

<style scoped>
::v-deep .v-input__control .v-field__input {
  font-size: 12px !important;
  background: white !important;
}
</style>
