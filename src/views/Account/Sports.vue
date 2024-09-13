<script setup>
import { useSportStore } from '@/stores/sport.store'

const stores = useSportStore()

const activeSports = computed(() => {
  return stores.sports.filter((sport) => sport.isActive)
})

const inactiveSports = computed(() => {
  return stores.sports.filter((sport) => !sport.isActive)
})

const toggleActiveStatus = (id) => {
  stores.toggleActiveStatus(id)
}
</script>

<template>
  <VContainer>
    <VRow no-gutters>
      <VCol cols="12">
        <p class="text-caption">
          Silahkan pilih jenis olahraga yang sesuai dengan minat kamu, kami akan memberikan
          rekomendasi terbaik berdasarkan minat olahraga kamu.
        </p>
      </VCol>
      <VCol cols="12" class="mt-4">
        <p class="mb-1 text-caption text-black font-weight-bold">Kategori olahraga yang diminati</p>
        <VCard
          v-for="item in activeSports"
          :key="item.id"
          class="pa-2 border-thin rounded-lg mt-2 d-flex align-center justify-start w-100"
          elevation="0"
        >
          <VCheckbox
            hide-details
            color="orange"
            class="mr-2"
            density="compact"
            :model-value="item.isActive"
            @change="() => toggleActiveStatus(item.id)"
          ></VCheckbox>
          <Icon class="text-text-orange" :icon="item.icon" />
          <span class="ml-2 text-xxs">{{ item.name }}</span>
        </VCard>
      </VCol>
      <VCol cols="12" class="mt-4">
        <p class="mb-1 text-caption text-black font-weight-bold">Kategori olahraga yang lainnya</p>
        <VCard
          v-for="item in inactiveSports"
          :key="item.id"
          class="pa-2 border-thin rounded-lg mt-2 d-flex align-center justify-start w-100"
          elevation="0"
        >
          <VCheckbox
            hide-details
            density="compact"
            class="mr-2"
            :model-value="item.isActive"
            @change="() => toggleActiveStatus(item.id)"
          ></VCheckbox>
          <Icon class="text-text-orange-2" :icon="item.icon" />
          <span class="ml-2 text-text-grey-3 text-xxs">{{ item.name }}</span>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>
