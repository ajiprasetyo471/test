<script setup>
import { useVenueStore } from '@/stores/venue.store'

const stores = useVenueStore()

const sortingOptions = ref([
  { id: 'lowPrice', label: 'Harga terendah', selected: false, value: 4 },
  { id: 'highPrice', label: 'Harga tertinggi', selected: false, value: 3 },
  { id: 'lowDistance', label: 'Jarak terdekat', selected: false, value: 6 }
])

watchEffect(() => {
  sortingOptions.value.forEach((option) => {
    option.selected = stores.filters.sort == option.value
  })
})

const toggleOption = (selectedId) => {
  sortingOptions.value.forEach((option) => {
    option.selected = option.id === selectedId ? !option.selected : false
  })
}

const resetFilters = () => {
  sortingOptions.value.forEach((option) => {
    option.selected = false
  })
  stores.setFilter('sort', null)
}

const applyFilters = () => {
  const selectedOption = sortingOptions.value.find((option) => option.selected)

  if (selectedOption) {
    const selectedValue = selectedOption.value
    stores.setFilter('sort', selectedValue)
    stores.closeSort()
  }
}
</script>

<template>
  <VDialog v-model="stores.isSort" fullscreen persistent height="52vh" style="margin-top: 48vh">
    <VCard class="rounded-ts-xl rounded-te-xl pa-4">
      <VCardTitle
        class="text-body-2 text-black font-weight-bold border-e-0 border-s-0 border-t-0 border-dashed border-b-thin d-flex justify-space-between align-center pb-4"
        ><span>Urutkan pencarian venue</span>
        <Icon @click="stores.closeSort()" icon="ant-design:close-outlined" class="text-text-grey-3"
      /></VCardTitle>

      <VCardText>
        <!-- Loop melalui opsi sorting -->
        <VCard
          v-for="option in sortingOptions"
          :key="option.id"
          class="pa-2 border-thin rounded-lg mt-2 d-flex align-center justify-space-between w-100"
          elevation="0"
        >
          <span class="ml-2 text-xxs">{{ option.label }}</span>
          <VCheckbox
            hide-details
            color="#00549B"
            class="mr-2"
            density="compact"
            :model-value="option.selected"
            @change="toggleOption(option.id)"
          ></VCheckbox>
        </VCard>
      </VCardText>

      <VCardActions>
        <VRow no-gutters>
          <VCol cols="12">
            <VBtn
              @click="applyFilters"
              class="bg-text-orange rounded-lg py-6"
              elevation="0"
              block
              density="compact"
              >Apply</VBtn
            >
          </VCol>
          <VCol cols="12" class="mt-6 d-flex justify-center">
            <VBtn
              @click="resetFilters"
              class="text-bg-blue text-none text-caption font-weight-bold"
              variant="text"
              density="compact"
            >
              Reset Filter
            </VBtn>
          </VCol>
        </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style scoped>
:deep .v-dialog {
  bottom: 0; /* Posisikan dialog di bawah */
  left: 0;
  right: 0; /* Agar memenuhi lebar */
}
</style>
