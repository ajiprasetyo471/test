<script setup>
defineOptions({
  name: "ButtonPrimary",
  inheritAttrs: false,
});
</script>

<template>
  <VBtn
    v-bind="{
      ...$attrs,
      variant: 'tonal',
      size: 'large',
    }"
    :class="$attrs.class"
    :disabled="$attrs.loading || $attrs.disabled"
    :height="40.24"
  >
    <span>
      <slot></slot>
    </span>
  </VBtn>
</template>
