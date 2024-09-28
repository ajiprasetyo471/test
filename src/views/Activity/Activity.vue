<script setup>
import acivity from '@/assets/images/activity-img.jpg'
</script>

<template>
  <VImg
    :src="acivity"
    cover
    style="height: calc(100vh - 80px); width: 100%; object-fit: cover; object-position: center"
  />
</template>
