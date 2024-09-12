<script setup>
import Account from '@/views/Account/Account.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isNotHeader: true,
    isFooter: true,
    isMenuFooter: true,
    title: 'Account'
  }
})
</script>

<template>
  <Account />
</template>
