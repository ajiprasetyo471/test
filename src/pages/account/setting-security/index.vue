<script setup>
import SettingAndSecurity from '@/views/Account/SettingAndSecurity.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    isFooter: false,
    title: 'Setting and Security'
  }
})
</script>

<template>
  <SettingAndSecurity />
</template>
