<script setup>
import { useAppStore } from '@/stores/app.store.js'
import { useActivityStore } from '@/stores/activity.store.js'

const stores = useActivityStore()
const appStores = useAppStore()

const router = useRouter()

const cardItems = ref([])

const goToDetail = (id) => {
  // appStores.setCurrentActivityId(id)
  router.push(`/activity/${id}`)
}

onMounted(() => {
  appStores.getActivityItems()
  stores.getActivityCards()
})
</script>

<template>
  <VContainer class="pt-1 justify-space-between d-flex flex-wrap">
    <CardComponent
      max-width="48%"
      class="mb-4"
      v-for="item in stores.filteredCards"
      :key="item.id"
      :title="item.title"
      :location="item.location"
      :amount="item.amount"
      :img="item.image"
      @click="goToDetail(item.id)"
    />
  </VContainer>
</template>
