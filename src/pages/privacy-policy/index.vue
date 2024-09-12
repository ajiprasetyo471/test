<script setup>
import PrivacyPolicy from '@/views/Account/PrivacyPolicy.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    isEditHeader: true,
    isEditHeader: true,
    isFooter: false,
    title: 'Kebijakan Privasi'
  }
})
</script>

<template>
  <PrivacyPolicy />
</template>
