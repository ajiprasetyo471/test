<script setup>
import Venue from '@/views/Venue/Venue.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isActivityItems: true,
    isCart: true,
    isFooter: true,
    isMenuFooter: true,
    title: 'Venue'
  }
})
</script>

<template>
  <Venue />
</template>
