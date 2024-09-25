<script setup>
import Filter from '@/views/Filter/Filter.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    isFooter: false,
    title: 'Search Filter'
  }
})
</script>

<template>
  <Filter />
</template>
