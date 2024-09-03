<script setup>
defineOptions({
  name: "ButtonLoader",
  inheritAttrs: false,
});
</script>

<template>
  <VBtn
    v-bind="{
      ...$attrs,
      variant: 'flat',
      rounded: 'lg',
    }"
    :class="$attrs.class"
    :disabled="$attrs.loading || $attrs.disabled"
    :height="48"
  >
    <template v-slot:loader>
      <v-progress-circular
        :size="18"
        :width="1.5"
        indeterminate
        color="#eaeaea"
        class="me-2"
      ></v-progress-circular>
    </template>
    <slot></slot>
  </VBtn>
</template>
