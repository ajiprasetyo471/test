<script setup>
defineOptions({
  name: "ButtonSecondary",
  inheritAttrs: false,
});
</script>

<template>
  <VBtn
    v-bind="{
      ...$attrs,
      variant: 'outlined',
      rounded: 'lg',
    }"
    :class="$attrs.class"
    :disabled="$attrs.loading || $attrs.disabled"
    :height="40.24"
    color="secondary"
  >
    <span class="text-uppercase text-body-1 font-weight-bold text-primary">
      <slot></slot>
    </span>
  </VBtn>
</template>
