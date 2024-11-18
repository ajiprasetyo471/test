<script setup>
import PageSpinLoader from '@/@core/components/PageSpinLoader.vue'
import BookingItem from './BookingItem.vue'
import { useBookingStore } from '@/stores/booking.store.js'
import { useSnackbarStore } from '@/stores/snackbar'

const stores = useBookingStore()
const snackStores = useSnackbarStore()

const router = useRouter()

const tab = ref('list')

const goToDetail = (id) => {
  // appStores.setCurrentActivityId(id)
  router.push(`/booking/${id}`)
}

const getBookingList = async (filterData) => {
  try {
    const response = await stores.getBookingCards(filterData)
    if (response.responseCode == '200') {
      stores.setBookingCards(response.responseData)
    } else {
      stores.setBookingCards([])
    }
  } catch (err) {
    console.log(err)
    snackStores.openSnackbar(err?.message, 'error')
  }
}

watch(
  () => tab.value, // Apa yang di-watch
  (newTab) => {
    if (newTab === 'list') {
      getBookingList({ status: 'paid' })
    } else {
      getBookingList()
    }
  }
)

onMounted(() => {
  getBookingList({ status: 'paid' })
})
</script>

<template>
  <VContainer>
    <VTabs
      v-model="tab"
      class="rounded-pill border-thin text-text-grey-3 position-fixed top-0 right-0 left-0 mt-16 mx-4 mx-md-auto w-md-50 bg-white"
      style="z-index: 100"
      align-tabs="center"
      grow
      selected-class="bg-bg-blue text-white"
    >
      <VTab class="rounded-pill text-caption" value="list">Daftar Pesanan</VTab>
      <VTab class="rounded-pill text-caption" value="history">Riwayat Pesanan</VTab>
    </VTabs>
    <VTabsWindow class="mt-10" v-model="tab">
      <VTabsWindowItem value="list" class="mt-4">
        <div
          v-for="item in stores.bookingListCard"
          :key="item?.bookingId"
          class="mt-4"
          @click="goToDetail(item?.bookingId)"
        >
          <BookingItem
            :title="item?.venueName"
            :location="item?.venueAddress"
            :img="item?.venueImage"
            :date="item?.bookingDate"
            :time="item?.BookingTime"
            :amount="item?.paymentAmount"
            :status="item?.paymentStatus"
          />
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="history" class="mt-4">
        <div
          v-for="item in stores.bookingListCard"
          :key="item?.bookingId"
          class="mt-4"
          @click="goToDetail(item?.bookingId)"
        >
          <BookingItem
            :title="item?.venueName"
            :location="item?.venueAddress"
            :img="item?.venueImage"
            :date="item?.bookingDate"
            :time="item?.BookingTime"
            :amount="item?.paymentAmount"
            :status="item?.paymentStatus"
          />
        </div>
      </VTabsWindowItem>
      <PageSpinLoader v-model:is-loading="stores.loading" />
    </VTabsWindow>
  </VContainer>
</template>
