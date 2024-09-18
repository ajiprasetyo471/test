<script setup>
import userImage from '@/assets/images/user-image.jpg'
import { useHomeStore } from '@/stores/home.store.js'
import { useVenueStore } from '@/stores/venue.store.js'
import { useActivityStore } from '@/stores/activity.store'

const stores = useHomeStore()
const activityStores = useActivityStore()
const venueStores = useVenueStore()
const route = useRoute()
const router = useRouter()

const searchQuery = ref('')

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
        return 210
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

const filterItems = (query) => {
  switch (route.meta.title) {
    case 'Activity':
      activityStores.filterActivityCards(query)
      break
    case 'Venue':
    case 'Homepage':
      venueStores.filterVenueCards(query)
      break
    default:
      break
  }
}

watch(searchQuery, (newQuery) => {
  filterItems(newQuery)
})

watch(route, () => {
  searchQuery.value = ''
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
      <div
        class="d-flex align-center"
        :class="pagePath == '/' ? 'justify-space-between' : 'justify-start'"
      >
        <VAvatar size="32">
          <VImg :src="userImage" alt="Profile" />
        </VAvatar>
        <div
          class="d-flex flex-column"
          :class="pagePath == '/' ? 'align-center' : 'align-start ml-4'"
        >
          <span class="text-text-grey text-xs">Hallo, Norman</span>
          <div class="d-flex align-center">
            <Icon icon="solar:map-point-linear" class="mr-2" />
            <span class="font-weight-medium text-caption">Ciputat, Tangerang Selatan</span>
          </div>
        </div>
        <div v-if="pagePath == '/'" class="d-flex align-center">
          <VBtn size="35" icon>
            <VBadge dot color="#FF4141">
              <Icon style="font-size: 28px" icon="uiw:bell" />
            </VBadge>
          </VBtn>
          <VBtn size="35" class="ml-1" icon>
            <Icon style="font-size: 28px" icon="mage:message-dots" />
          </VBtn>
        </div>
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
            <Icon style="font-size: 20px; color: #666666" icon="mage:filter" />
          </template>
        </VTextField>
      </div>
      <div v-if="pageMeta.isActivityItems == true">
        <VSheet class="mx-auto mt-4">
          <VSlideGroup>
            <VSlideGroupItem
              v-for="item in stores.activityItems"
              :key="item.id"
              v-slot="{ isSelected, toggle }"
            >
              <VBtn
                :class="isSelected ? 'bg-bg-blue text-white' : undefined"
                class="mx-1 border-thin text-none text-xxs"
                rounded="lg"
                density="comfortable"
                @click="toggle"
              >
                {{ item.title }}
              </VBtn>
            </VSlideGroupItem>
          </VSlideGroup>
        </VSheet>
      </div>
    </VContainer>
  </VAppBar>
</template>
