<script setup>
import Report from '@/views/Report/Report.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isNotHeader: true,
    isFooter: true,
    isReportFooter: true,
    title: 'Report Transaction'
  }
})
</script>

<template>
  <Report />
</template>
