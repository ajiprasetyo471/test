<script setup>
import PaymentDetail from '@/views/Venue/Payment/PaymentDetail.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    isFooter: true,
    isPaymentFooter: true,
    title: 'Payment Detail'
  }
})
</script>

<template>
  <PaymentDetail />
</template>
