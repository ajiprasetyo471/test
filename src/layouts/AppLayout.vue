<script setup>
import logo from "@/assets/images/logo/bayarind-logo.svg";

const route = useRoute();

const metaPage = computed({
  get: () => route.meta,
  set: () => route.meta,
});
</script>

<template>
  <VContainer>
    <div class="pa-2 px-3">
      <VRow>
        <VCol cols="12" v-if="metaPage.topLogo">
          <VImg :src="logo" :height="23.42" alt="" position="left" />
        </VCol>
        <VCol cols="12" v-else>
          <p class="font-weight-bold">{{ metaPage.topTitle ?? "" }}</p>
        </VCol>
      </VRow>
    </div>
    <slot />
  </VContainer>
</template>
<style scoped></style>
