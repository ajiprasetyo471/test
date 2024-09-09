<script setup>
import VenueDetail from '@/views/Venue/VenueDetail.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    isFooter: false,
    title: 'Detail Venue'
  }
})
</script>

<template>
  <VenueDetail />
</template>
