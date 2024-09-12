<script setup>
import ActivityDetail from '@/views/Activity/ActivityDetail.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    isShareHeader: true,
    isFooter: true,
    isJoinFooter: true,
    title: 'Detail Aktifitas'
  }
})
</script>

<template>
  <ActivityDetail />
</template>
