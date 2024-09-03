<script setup>
defineOptions({
  name: "AppTextField",
  inheritAttrs: false,
});

const props = defineProps({
  labelRequired: {
    type: Boolean,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
  errorMessages: {
    type: Array,
    default: () => [],
  },
  prependInnerIcon: {
    type: String,
    required: false,
  },
});

const elementId = computed(() => {
  const attrs = useAttrs();
  const _elementIdToken = attrs.id || attrs.label;

  return _elementIdToken
    ? `app-text-field-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}`
    : undefined;
});

const label = computed(() => useAttrs().label);
const disabled = computed(() => props.disabled);
</script>

<template>
  <div class="app-text-field flex-grow-1" :class="$attrs.class">
    <VLabel
      v-if="label"
      :for="elementId"
      class="mb-1 text-body-2 text-high-emphasis font-weight-light text-muted"
    >
      {{ label }}
      <span class="text-error ms-1" v-if="props.labelRequired">*</span>
    </VLabel>
    <VTextField
      v-bind="{
        ...$attrs,
        class: null,
        label: undefined,
        variant: 'outlined',
        density: 'compact',
        id: elementId,
        rules: $attrs.rules || [],
        errorMessages: props.errorMessages,
      }"
      :prepend-inner-icon="prependInnerIcon ? prependInnerIcon : ''"
      :disabled="disabled"
    >
      <template v-for="(_, name) in $slots" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </VTextField>
  </div>
</template>
