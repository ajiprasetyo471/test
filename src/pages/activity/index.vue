<script setup>
import Activity from '@/views/Activity/Activity.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isNotHeader: true,
    isFooter: true,
    isMenuFooter: true,
    title: 'Activity'
  }
})
</script>

<template>
  <Activity />
</template>
