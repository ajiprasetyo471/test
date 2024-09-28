<script setup>
import CartItem from './CartItem.vue'
import { useCartStore } from '@/stores/cart.store.js'

const stores = useCartStore()

const isModalOpen = ref(false)
const listItems = ref([])

const closeModal = () => {
  isModalOpen.value = false
}

const submitModal = () => {
  isModalOpen.value = false
}

onMounted(() => {
  listItems.value = stores.getCartListCard()
})
</script>

<template>
  <VContainer>
    <VRow no-gutters>
      <VCol cols="6">
        <VCheckbox color="#00549B" class="rounded-xl" hide-details>
          <template v-slot:label>
            <p class="text-caption text-text-blue-2 font-weight-black">Select All</p>
          </template>
        </VCheckbox>
      </VCol>
      <VCol cols="6" class="d-flex align-center justify-end">
        <VBtn
          class="text-caption font-weight-black text-none text-text-red-2"
          variant="text"
          @click="isModalOpen = true"
          >Delete Selection</VBtn
        >
      </VCol>
    </VRow>
    <VRow no-gutters class="mt-2">
      <VCol cols="12">
        <div v-for="item in listItems.slice(0, 2)" class="mb-4" :key="item.id">
          <CartItem
            :title="item.title"
            :location="item.location"
            :activities="item.activities"
            :img="item.img"
            :date="item.date"
            :time="item.time"
            :amount="item.amount"
          />
        </div>
      </VCol>
    </VRow>
  </VContainer>
  <ConfirmationModal
    v-model="isModalOpen"
    @close-dialog="closeModal"
    @submit-dialog="submitModal"
  />
</template>
