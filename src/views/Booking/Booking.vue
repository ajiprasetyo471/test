<script setup>
import BookingItem from './BookingItem.vue'
import { useBookingStore } from '@/stores/booking.store.js'

const stores = useBookingStore()

const router = useRouter()

const tab = ref('list')
const listItems = ref([])
const historyItems = ref([])

const goToDetail = (id) => {
  // appStores.setCurrentActivityId(id)
  router.push(`/booking/${id}`)
}

onMounted(() => {
  listItems.value = stores.getBookingListCard()
  historyItems.value = stores.getBookingHistoryCard()
})
</script>

<template>
  <VContainer>
    <VTabs
      v-model="tab"
      class="rounded-pill border-thin text-text-grey-3"
      align-tabs="center"
      grow
      selected-class="bg-bg-blue text-white"
    >
      <VTab class="rounded-pill text-caption" value="list">Daftar Pesanan</VTab>
      <VTab class="rounded-pill text-caption" value="history">Riwayat Pesanan</VTab>
    </VTabs>
    <VTabsWindow v-model="tab">
      <VTabsWindowItem value="list" class="mt-4">
        <div v-for="item in listItems" :key="item.id" class="mt-4" @click="goToDetail(item.id)">
          <BookingItem
            :title="item.title"
            :location="item.location"
            :img="item.img"
            :date="item.date"
            :time="item.time"
            :amount="item.amount"
          />
        </div>
      </VTabsWindowItem>
      <VTabsWindowItem value="history" class="mt-4">
        <div v-for="item in historyItems" :key="item.id" class="mt-4" @click="goToDetail(item.id)">
          <BookingItem
            :title="item.title"
            :location="item.location"
            :img="item.img"
            :date="item.date"
            :time="item.time"
            :amount="item.amount"
          />
        </div>
      </VTabsWindowItem>
    </VTabsWindow>
  </VContainer>
</template>
