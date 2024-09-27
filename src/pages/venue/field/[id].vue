<script setup>
import FieldDetail from '@/views/Venue/Field/FieldDetail.vue'

definePage({
  meta: {
    // layout: "blank",
    // topTitle: "Authorize (Merchant Name)",
    // topLogo: true,
    public: false,
    isDetail: true,
    isShareHeader: true,
    isFooter: true,
    isFieldFooter: true,
    title: 'Detail Field'
  }
})
</script>

<template>
  <FieldDetail />
</template>
