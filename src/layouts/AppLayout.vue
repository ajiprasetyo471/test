<script setup>
import Header from '@/@layouts/components/Header.vue'
import Footer from '@/@layouts/components/Footer.vue'
import SortVenue from '@/views/Venue/SortVenue.vue'
import { useAppStore } from '@/stores/app.store.js'
import { useSnackbarStore } from '@/stores/snackbar'

const stores = useAppStore()
const snackStores = useSnackbarStore()

const latitude = ref(null)
const longitude = ref(null)

function getLocationData() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position) {
          latitude.value = position.coords.latitude
          longitude.value = position.coords.longitude
          // console.log(latitude.value, longitude.value)
          localStorage.setItem('latitude', latitude.value)
          localStorage.setItem('longitude', longitude.value)

          stores
            .getLocationList(latitude.value, longitude.value)
            .then((res) => {
              const address = JSON.stringify(res.address)
              localStorage.setItem('address', address)
            })
            .catch((err) => {
              console.log(err)
              snackStores.openSnackbar(err?.message, 'error')
            })
        }
      },
      (error) => {
        console.log('Error getting location:', error.message)
        snackStores.openSnackbar(error?.message, 'error')
      }
    )
  } else {
    console.log('Geolocation is not supported by this browser.')
    snackStores.openSnackbar('Geolocation is not supported by this browser.', 'error')
  }
}

onMounted(() => {
  getLocationData()
})
</script>

<template>
  <VApp>
    <Header />
    <VMain class="bg-bg-main">
      <slot />
    </VMain>
    <SortVenue />
    <Footer />
  </VApp>
</template>
<style scoped></style>
