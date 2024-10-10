<script setup>
import { useHomeStore } from '@/stores/home.store.js'
import { useVenueStore } from '@/stores/venue.store.js'
import { useActivityStore } from '@/stores/activity.store'
import { useSnackbarStore } from '@/stores/snackbar'
import { useModalStore } from '@/stores/modal'

const stores = useHomeStore()
const activityStores = useActivityStore()
const venueStores = useVenueStore()
const snackbarStores = useSnackbarStore()
const modalStore = useModalStore()

const route = useRoute()
const router = useRouter()

const searchQuery = ref(venueStores.filters.keyword || '')

const pagePath = computed({
  get: () => route.path,
  set: () => route.path
})

const pageMeta = computed({
  get: () => route.meta,
  set: () => route.meta
})

const headerHeight = computed({
  get: () => {
    if (route.meta.isDetail) {
      return 60
    } else {
      if (route.meta.isActivityItems) {
        return 130
      } else {
        if (route.path === '/booking') {
          return 80
        } else {
          return 170
        }
      }
    }
  }
})

const goToFilter = () => {
  // console.log(route.meta.title)
  if (route.meta.title == 'Venue') {
    router.push('/venue/filter')
  } else if (route.meta.title == 'Activity') {
    router.push('/activity/filter')
  }
}

const filterItems = (query) => {
  switch (route.meta.title) {
    case 'Activity':
      activityStores.filterActivityCards(query)
      break
    case 'Venue':
      venueStores.setFilter('keyword', query ? query : null)
      break
    default:
      break
  }
}

watch(searchQuery, (newQuery) => {
  filterItems(newQuery)
})

onMounted(() => {
  stores.getSportItems()
  stores.getCityItems()
})
</script>

<template>
  <template v-if="pageMeta.isNotHeader == true"> </template>
  <VAppBar
    v-else
    flat
    :class="pageMeta.isDetail ? 'border-b-thin' : 'bg-bg-main'"
    :height="headerHeight"
  >
    <VContainer v-if="pageMeta.isDetail" class="d-flex align-center">
      <VRow no-gutters class="d-flex align-center">
        <VCol cols="2" class="d-flex justify-start">
          <VBtn @click="router.go(-1)" class="border-thin rounded-lg text-h5" size="32">
            <Icon icon="material-symbols:chevron-left" />
          </VBtn>
        </VCol>
        <VCol cols="8">
          <h3 class="text-body-1 font-weight-black text-center">{{ pageMeta.title }}</h3>
        </VCol>
        <VCol cols="2" class="d-flex justify-end">
          <!-- v-if="pageMeta.title !== 'Detail Booking' && pageMeta.title !== 'Detail Pembayaran'" -->
          <VBtn
            v-if="pageMeta.isShareHeader == true"
            class="border-thin rounded-lg text-h5"
            size="32"
            @click="modalStore.openModal()"
          >
            <Icon icon="material-symbols:share-outline" />
          </VBtn>
          <VBtn
            v-if="pageMeta.isEditHeader == true"
            class="border-thin rounded-lg text-h5"
            size="32"
          >
            <Icon icon="mage:edit" />
          </VBtn>
        </VCol>
      </VRow>
    </VContainer>
    <VContainer v-else class="d-flex flex-column">
      <div class="d-flex align-center justify-space-between">
        <div class="d-flex flex-column align-start ml-4">
          <div class="d-flex align-center">
            <Icon icon="solar:map-point-linear" class="mr-2" />
            <span class="font-weight-medium text-caption">Ciputat, Tangerang Selatan</span>
          </div>
        </div>
        <VBtn to="/cart" v-if="pageMeta.isCart" size="35" class="ml-1" icon>
          <Icon style="font-size: 25px" icon="solar:bag-check-outline" />
        </VBtn>
      </div>
      <div v-if="pagePath != '/booking'" class="pt-4">
        <VTextField
          v-model="searchQuery"
          :placeholder="` Cari ${pageMeta.title || ''}`"
          prepend-inner-icon="mdi-magnify"
          hide-details
          density="comfortable"
          variant="outlined"
          rounded="xl"
        >
          <template #append-inner>
            <Icon
              @click="goToFilter()"
              style="font-size: 20px; color: #666666"
              icon="mage:filter"
            />
          </template>
        </VTextField>
      </div>
    </VContainer>
  </VAppBar>

  <VSnackbar
    v-model="snackbarStores.isSnackbarOpen"
    :absolute="true"
    location="top right"
    timeout="2000"
    :color="snackbarStores.color"
  >
    {{ snackbarStores.title }}
  </VSnackbar>
</template>
