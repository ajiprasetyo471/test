<script setup>
import Cart from '@/views/Cart/Cart.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    isFooter: true,
    isCartFooter: true,
    title: 'Keranjang booking'
  }
})
</script>

<template>
  <Cart />
</template>
