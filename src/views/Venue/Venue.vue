<script setup>
import VenueItem from './VenueItem.vue'
import PageSpinLoader from '@/@core/components/PageSpinLoader.vue'
import SortVenue from './SortVenue.vue'

import moment from 'moment'
import { reverseFormatTime, formatTime } from '@/helpers/helpers'
import { useVenueStore } from '@/stores/venue.store.js'
import { useSnackbarStore } from '@/stores/snackbar'
import { useHomeStore } from '@/stores/home.store'
import { useAppStore } from '@/stores/app.store'

const stores = useVenueStore()
const appStores = useAppStore()
const homeStores = useHomeStore()
const snackStores = useSnackbarStore()

const route = useRoute()
const router = useRouter()

const scrollComponent = ref(null)
const selectedItemIds = ref(stores.filters.sportId || [])
const showTimePicker = ref(false)
const selectedMonth = ref({ month: 0, year: 0 })
const startTime = ref(
  stores.filters.startTime
    ? reverseFormatTime(stores.filters.startTime)
    : {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
)
const endTime = ref(
  stores.filters.endTime
    ? reverseFormatTime(stores.filters.endTime)
    : {
        hours: 0,
        minutes: 0,
        seconds: 0
      }
)
const selectedDateIndex = ref(stores.filters.date ? stores.filters.date.split('-')[2] - 1 : 0)
const dates = ref(getDates())
const loadingItem = ref(false)

const latitude = ref(appStores.latitude ? appStores.latitude : localStorage.getItem('latitude'))
const longitude = ref(appStores.longitude ? appStores.longitude : localStorage.getItem('longitude'))

const formattedMonth = computed(() => {
  if (selectedMonth.value.year && selectedMonth.value.month) {
    return moment(
      `${selectedMonth.value.year}-${String(selectedMonth.value.month + 1).padStart(2, '0')}`,
      'YYYY-MM'
    ).format('MMMM, YYYY')
  }
  return moment().format('MMMM, YYYY') // Default jika selectedMonth kosong
})

const formattedTimeRange = computed(() => {
  return `${formatTime(startTime.value)} - ${formatTime(endTime.value)}`
})

const selectItem = (itemId) => {
  if (itemId === 'all') {
    selectedItemIds.value = []
    stores.setFilter('sportId', null)
  } else {
    // Cek apakah item sudah ada dalam array, jika ada, hapus dari array
    const index = selectedItemIds.value.indexOf(itemId)
    if (index === -1) {
      selectedItemIds.value.push(itemId)
    } else {
      selectedItemIds.value.splice(index, 1)
    }

    // Jika semua item dipilih, set filter dengan daftar id
    if (selectedItemIds.value.length > 0) {
      stores.setFilter('sportId', selectedItemIds.value)
    } else {
      stores.setFilter('sportId', null)
    }
  }
}

const onMonthSelected = (newMonth) => {
  selectedMonth.value = { month: newMonth.month, year: newMonth.year }
  dates.value = getDates(newMonth.month, newMonth.year)
}

function getDates(month, year) {
  const dates = []
  const today = moment()
  const currentMonth = today.month()
  const currentYear = today.year()

  const startOfMonth =
    year && month
      ? moment(`${year}-${month + 1}`, 'YYYY-MM')
          .clone()
          .startOf('month')
      : today.clone().startOf('month')
  const endOfMonth =
    year && month
      ? moment(`${year}-${month + 1}`, 'YYYY-MM')
          .clone()
          .endOf('month')
      : today.clone().endOf('month')

  let currentDate = startOfMonth
  while (currentDate.isSameOrBefore(endOfMonth)) {
    dates.push({
      date: currentDate.format('DD'), // Tanggal
      day: currentDate.format('ddd'), // Hari
      disabled:
        !year && !month
          ? currentDate.isBefore(today, 'day')
          : year === currentYear && month === currentMonth
            ? currentDate.isBefore(today, 'day')
            : (year === currentYear && month < currentMonth) || (year < currentYear && month)
              ? true
              : false, // Tanggal sebelum hari ini dinonaktifkan
      selected: false // Tanggal hari ini otomatis terpilih
    })
    currentDate = currentDate.add(1, 'day')
  }

  // Otomatis memilih tanggal hari ini
  if ((month === currentMonth && year === currentYear) || (!year && !month)) {
    if (stores.filters.date) {
      const [year, month, day] = stores.filters.date.split('-')

      selectedDateIndex.value = day - 1
    } else {
      const todayIndex = dates.findIndex((date) => date.date === today.format('DD'))
      if (todayIndex !== -1) {
        selectedDateIndex.value = todayIndex // Fokus ke tanggal hari ini
      }
    }
  } else {
    if (stores.filters.date) {
      const [year, month, day] = stores.filters.date.split('-')

      selectedDateIndex.value = day - 1
    } else {
      selectedDateIndex.value = 0
    }
  }

  return dates
}

// Fungsi untuk memilih tanggal
const selectDate = (index) => {
  if (!dates.value[index].disabled) {
    dates.value.forEach((date, i) => {
      date.selected = i === index
    })
    selectedDateIndex.value = index // Perbarui indeks yang dipilih
  }

  const date = index + 1
  const month = selectedMonth.value?.month
    ? selectedMonth.value.month + 1
    : parseInt(selectedMonth.value.split('-')[1])
  const year = selectedMonth.value?.year
    ? selectedMonth.value.year
    : selectedMonth.value.split('-')[0]

  const selectedDate = `${year}-${month}-${date}`

  stores.setFilter('date', selectedDate)
}

const handleTimeSelection = () => {
  showTimePicker.value = false

  stores.setFilter('startTime', formatTime(startTime.value))
  stores.setFilter('endTime', formatTime(endTime.value))
}

const goToDetail = (id) => {
  stores.setVenueId(id)
  router.push(`/venue/${id}`)
}

const loadMoreVenues = async () => {
  if (loadingItem.value || stores.hasMoreData == false) return

  loadingItem.value = true
  stores.setPage(stores.page + 1)
  try {
    const response = await stores.getVenueCardsScroll('page', stores.page)
    if (response.responseCode == '200' && response.responseData.venueList.length > 0) {
      const result = [...stores.venueCards, ...response.responseData.venueList]
      // const result = response.data.venueList
      stores.setVenueCards(result)
    } else {
      stores.setHasMoreData(false)
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loadingItem.value = false
  }
}

const getVenueList = async () => {
  try {
    const filterData = {
      ...stores.filters,
      latitude: latitude.value,
      longitude: longitude.value,
      page: 1
    }
    stores.setLatLong(latitude.value, longitude.value)
    const response = await stores.getVenueCards(filterData)
    if (response.responseCode == '200') {
      stores.setVenueCards(response.responseData.venueList)
    } else {
      stores.setVenueCards([])
    }
  } catch (err) {
    console.log(err)
    snackStores.openSnackbar(err?.message, 'error')
  }
}

const handleScroll = () => {
  let element = scrollComponent.value
  if (
    element.getBoundingClientRect().bottom < window.innerHeight &&
    stores.hasMoreData == true &&
    !loadingItem.value
  ) {
    loadMoreVenues()
  }
}

watchEffect(() => {
  router.push({ query: stores.queryData })
})

onMounted(() => {
  stores.setPage(1)
  stores.setHasMoreData(true)

  // Ambil query dari URL
  const queryDate = route.query.date
  const queryStartTime = route.query.startTime
  const queryEndTime = route.query.endTime
  const querySort = route.query.sort
  const queryMinPrice = route.query.minPrice
  const queryMaxPrice = route.query.maxPrice
  const queryKeyword = route.query.keyword

  if (queryDate) {
    const [year, month, day] = queryDate.split('-')
    selectedMonth.value = {
      month: parseInt(month - 1), // Pastikan bulan dalam format angka
      year: parseInt(year) // Pastikan tahun dalam format angka
    }
    selectedDateIndex.value = day - 1 // Set default selected date index
    dates.value = getDates(selectedMonth.value.month, selectedMonth.value.year)
    dates.value[day - 1].selected = true

    stores.setFilterData('date', queryDate)
  } else {
    const currentMonth = moment().month() // Bulan saat ini dalam angka (1-12)
    const currentYear = moment().year() // Tahun saat ini
    selectedMonth.value = { month: currentMonth, year: currentYear }
    selectedDateIndex.value = moment().date() - 1 // Default ke tanggal hari ini
    dates.value = getDates(currentMonth, currentYear) // Set tanggal untuk bulan saat ini
  }

  if (queryStartTime) {
    startTime.value = reverseFormatTime(queryStartTime)
    stores.setFilterData('startTime', queryStartTime)
  }

  if (queryEndTime) {
    endTime.value = reverseFormatTime(queryEndTime)
    stores.setFilterData('endTime', queryEndTime)
  }

  if (querySort) {
    stores.setFilterData('sort', querySort)
  }

  if (queryMinPrice) {
    stores.setFilterData('minPrice', queryMinPrice)
  }

  if (queryMaxPrice) {
    stores.setFilterData('maxPrice', queryMaxPrice)
  }

  if (queryKeyword) {
    stores.setFilterData('keyword', queryKeyword)
  }

  window.addEventListener('scroll', handleScroll)
  getVenueList()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div ref="scrollComponent" class="position-relative">
    <VContainer class="pt-0">
      <div ref="scrollComponent">
        <VSheet class="mx-auto mt-2 mb-4 bg-bg-main">
          <VSlideGroup v-model="selectedItemIds">
            <VSlideGroupItem>
              <VBtn
                :class="selectedItemIds.length === 0 ? 'bg-bg-blue text-white' : undefined"
                class="mx-1 my-1 border-thin text-none text-xxs"
                rounded="lg"
                elevation="0"
                density="comfortable"
                @click="selectItem('all')"
              >
                All
              </VBtn>
            </VSlideGroupItem>
            <VSlideGroupItem v-for="item in homeStores.sportItems" :key="item.id">
              <VBtn
                :class="selectedItemIds.includes(item.id) ? 'bg-bg-blue text-white' : undefined"
                class="mx-1 my-1 border-thin text-none text-xxs"
                rounded="lg"
                elevation="0"
                density="comfortable"
                @click="selectItem(item.id)"
              >
                {{ item.title }}
              </VBtn>
            </VSlideGroupItem>
          </VSlideGroup>
        </VSheet>
        <VRow no-gutters>
          <VCol cols="12" class="d-flex align-center justify-space-between">
            <VueDatePicker
              style="width: 45%; font-size: 12px !important"
              class="text-caption"
              :format="() => formattedMonth"
              @update:model-value="onMonthSelected"
              month-picker
              :model-value="selectedMonth"
            >
              <template #input-icon>
                <Icon
                  style="font-size: 20px"
                  class="mt-1 text-black"
                  icon="solar:calendar-outline"
                />
              </template>
              <template #clear-icon>
                <Icon style="font-size: 18px" class="text-black" icon="mdi:chevron-down" />
              </template>
            </VueDatePicker>
            <VBtn @click="showTimePicker = true" class="d-flex align-center" variant="text">
              <Icon icon="solar:clock-circle-outline" class="text-h6" />
              <span class="text-caption mx-2">{{ formattedTimeRange }}</span>
              <Icon icon="mdi-chevron-down" />
            </VBtn>
          </VCol>
        </VRow>

        <VSlideGroup v-model="selectedDateIndex" class="pb-1 mt-2 mb-6">
          <template v-for="(date, index) in dates" :key="index" :value="index">
            <VSlideGroupItem :value="index">
              <VCard
                class="border-thin rounded-lg mx-2"
                :class="{
                  'bg-bg-grey-2 text-text-grey-3': date.disabled,
                  'bg-text-orange text-white': date.selected,
                  'bg-white text-black': !date.disabled && !date.selected
                }"
                elevation="0"
                @click="selectDate(index)"
                :disabled="date.disabled"
              >
                <VCardTitle class="d-flex flex-column align-center">
                  <div class="text-body-1 font-weight-black">{{ date.date }}</div>
                  <div
                    class="text-xxs"
                    :class="{ 'text-text-grey': !date.disabled && !date.selected }"
                  >
                    {{ date.day }}
                  </div>
                </VCardTitle>
              </VCard>
            </VSlideGroupItem>
          </template>
        </VSlideGroup>

        <VenueItem
          v-if="!stores.loading"
          class="mb-4"
          v-for="item in stores.venueCards"
          :key="item.id"
          :title="item.name"
          :location="item.address"
          :activities="item.sportTypes"
          :amount="item.maxPriceRange"
          :img="item.coverPictureUrl"
          @click="goToDetail(item.id)"
        />

        <div v-if="loadingItem" class="text-center text-caption mx-4">Loading...</div>
        <div
          v-if="stores.hasMoreData == false && !loadingItem"
          class="text-center text-caption mx-4 text-text-grey"
        >
          No more data to load
        </div>
      </div>
    </VContainer>
    <VCard
      v-if="!stores.loading"
      elevation="0"
      width="180"
      rounded="xl"
      class="py-2 mx-auto d-flex justify-center align-center"
      style="
        position: sticky;
        bottom: 100px;
        box-shadow: 1px 2px 10px 2px rgba(0, 0, 0, 0.15) !important;
      "
    >
      <VBtn @click="stores.openSort()" class="text-none" variant="text">
        <VRow no-gutters>
          <VCol cols="12">
            <Icon style="font-size: 20px" class="text-text-orange" icon="solar:sort-outline" />
          </VCol>
          <VCol cols="12">
            <p class="text-xxs">Sortir</p>
          </VCol>
        </VRow>
      </VBtn>
      <VBtn to="/venue/filter" class="text-none" variant="text">
        <VRow no-gutters>
          <VCol cols="12">
            <Icon style="font-size: 20px" class="text-text-orange" icon="mdi:filter" />
          </VCol>
          <VCol cols="12">
            <p class="text-xxs">Filter</p>
          </VCol>
        </VRow>
      </VBtn>
    </VCard>
  </div>
  <VDialog v-model="showTimePicker">
    <VCard>
      <VCardTitle>Pick a Time Range</VCardTitle>
      <VCardText style="height: 50vh">
        <VRow no-gutters>
          <VCol cols="12" class="d-flex justify-space-between align-center" style="gap: 10px">
            <VueDatePicker v-model="startTime" time-picker />
            <VueDatePicker v-model="endTime" time-picker />
          </VCol>
        </VRow>
        <!-- <VTimePicker v-model="startTime" format="24hr" landscape />
        <VTimePicker v-model="endTime" format="24hr" landscape /> -->
      </VCardText>
      <VCardActions class="position-fixed bottom-0 bg-white w-100" style="z-index: 1000">
        <VBtn @click="showTimePicker = false" text>Cancel</VBtn>
        <VBtn @click="handleTimeSelection" color="primary">OK</VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
  <SortVenue />
  <PageSpinLoader v-model:is-loading="stores.loading" />
</template>

<style>
.dp__theme_light {
  --dp-border-color: none;
  --dp-background-color: #f9fafb;
}

.dp__input {
  font-size: 12px;
}

.modal-bottom .v-navigation-drawer {
  position: fixed;
  bottom: 0; /* Set to bottom */
  width: 100%; /* Full width */
  max-height: 70%; /* Optional: Control height */
  overflow-y: auto; /* Allow vertical scrolling if content is too long */
  transition: transform 0.3s ease; /* Optional: smooth transition */
}
</style>
