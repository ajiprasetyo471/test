<script setup>
// import Homepage from '@/views/Homepage/Homepage.vue'

// definePage({
//   meta: {
//     // layout: "blank",
//     // topTitle: "Authorize (Merchant Name)",
//     // topLogo: true,
//     public: false,
//     isFooter: true,
//     isMenuFooter: true,
//     title: 'Homepage'
//   }
// })

const router = useRouter()

onBeforeMount(() => {
  router.replace('/venue')
})
</script>

<template>
  <!-- <Homepage /> -->
</template>
