<script setup>
import { useActivityStore } from '@/stores/activity.store.js'
import { useHomeStore } from '@/stores/home.store'

const stores = useActivityStore()
const homeStores = useHomeStore()

const router = useRouter()

const goToDetail = (id) => {
  // appStores.setCurrentActivityId(id)
  router.push(`/activity/${id}`)
}

onMounted(() => {
  stores.getActivityCards()
  homeStores.getActivityItems()
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
