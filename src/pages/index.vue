<script setup>
import Homepage from '@/views/Homepage/Homepage.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isFooter: true,
    isMenuFooter: true,
    title: 'Homepage'
  }
})
</script>

<template>
  <Homepage />
</template>
