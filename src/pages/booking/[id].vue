<script setup>
import BookingDetail from '@/views/Booking/BookingDetail.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    title: 'Detail Booking'
  }
})
</script>

<template>
  <BookingDetail />
</template>
