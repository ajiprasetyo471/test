<script setup>
import Booking from '@/views/Booking/Booking.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isFooter: true,
    isMenuFooter: true,
    title: 'Booking'
  }
})
</script>

<template>
  <Booking />
</template>
