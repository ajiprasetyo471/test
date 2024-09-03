<script setup>
defineOptions({
  name: "AppOtpField",
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
  error: {
    type: [String, Boolean],
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

const disabled = computed(() => props.disabled);
</script>

<template>
  <div class="app-text-field flex-grow-1" :class="$attrs.class">
    <div
      class="border text-grey-900 w-100 bg-white rounded-lg outline-none pa-0"
      :class="{ 'border-error border-md': error }"
    >
      <VOtpInput
        v-bind="{
          ...$attrs,
          autofocus: true,
          class: 'pa-0',
          width: 160,
          height: 52,
          label: undefined,
          variant: 'plain',
          id: elementId,
        }"
        :bg-color="disabled ? '#F5F5F5' : ''"
        :base-color="disabled ? '#F5F5F5' : ''"
      >
        <template v-for="(_, name) in $slots" #[name]="slotProps">
          <slot :name="name" v-bind="slotProps || {}" />
        </template>
      </VOtpInput>
    </div>
    <p class="text-caption text-error mt-1" v-if="error" v-html="error"></p>
  </div>
</template>

<style lang="scss">
.v-otp-input__field {
  font-weight: bold;
}
</style>
