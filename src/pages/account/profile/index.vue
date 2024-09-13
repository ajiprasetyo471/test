<script setup>
import Profile from '@/views/Account/Profile.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    isEditHeader: true,
    isFooter: true,
    isSaveFooter: true,
    title: 'Profile'
  }
})
</script>

<template>
  <Profile />
</template>
