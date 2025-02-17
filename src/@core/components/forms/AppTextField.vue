<script setup>
defineOptions({
  name: 'AppTextField',
  inheritAttrs: false
})

const props = defineProps({
  labelRequired: {
    type: Boolean,
    required: false
  },
  disabled: {
    type: Boolean,
    required: false
  },
  errorMessages: {
    type: Array,
    default: () => []
  },
  prependInnerIcon: {
    type: String,
    required: false
  }
})

const elementId = computed(() => {
  const attrs = useAttrs()
  const _elementIdToken = attrs.id || attrs.label

  return _elementIdToken
    ? `app-text-field-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}`
    : undefined
})

const label = computed(() => useAttrs().label)
const disabled = computed(() => props.disabled)
</script>

<template>
  <div class="app-text-field flex-grow-1" :class="$attrs.class">
    <label v-if="label" :for="elementId" class="mb-1 text-caption text-black font-weight-bold">
      {{ label }}
      <span class="text-text-red ms-1" v-if="props.labelRequired">*</span>
    </label>
    <VTextField
      v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'outlined',
        density: 'compact',
        id: elementId,
        rules: $attrs.rules || [],
        errorMessages: props.errorMessages
      }"
      rounded="lg"
      :prepend-inner-icon="prependInnerIcon ? prependInnerIcon : ''"
      :disabled="disabled"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </VTextField>
  </div>
</template>

<style scoped>
::v-deep .v-input__control .v-field__input {
  font-size: 12px !important;
  background: white !important;
}
</style>
