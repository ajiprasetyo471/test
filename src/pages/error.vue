<script setup>
import Error from '@/views/Error/Error.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isNotHeader: true,
    isFooter: false,
    isMenuFooter: false,
    title: 'Error'
  }
})
</script>

<template>
  <Error />
</template>
