<script setup>
import Activity from '@/views/Activity/Activity.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isActivityItems: true,
    title: 'Activity'
  }
})
</script>

<template>
  <Activity />
</template>
