<script setup>
import { formatNumber } from '@/helpers/helpers'
import moment from 'moment'
import { useHomeStore } from '@/stores/home.store.js'

const stores = useHomeStore()

const showDatePicker = ref(false)
const showTimePicker = ref(false)

const selectedDate = ref()
const startTime = ref('00:00')
const endTime = ref('00:00')
const dates = ref(getDates())
const minPrice = 0 // Minimum price for the slider
const maxPrice = 5000000 // Maximum price for the slider
const step = 50000 // Step interval for the slider
const priceRange = ref([minPrice, maxPrice]) // Default price range [start, end]
const selectedCategories = ref([])
const selectedCities = ref([])

const formattedDate = computed(() => {
  return selectedDate.value
    ? moment(selectedDate.value, 'YYYY-MM-DD').format('MMMM D, YYYY')
    : 'Select Date'
})

const formattedTimeRange = computed(() => {
  return `${moment(startTime.value, 'HH:mm').format('HH:mm')} - ${moment(endTime.value, 'HH:mm').format('HH:mm')}`
})

const formattedStartTime = computed(() => {
  return `${moment(startTime.value, 'HH:mm').format('HH:mm')}`
})
const formattedEndTime = computed(() => {
  return `${moment(endTime.value, 'HH:mm').format('HH:mm')}`
})

const onDateSelected = (newDate) => {
  selectedDate.value = newDate
}

function getDates() {
  const dates = []
  const today = moment() // Tanggal hari ini
  const startOfRange = today.clone().subtract(2, 'days') // 2 hari sebelum hari ini
  const endOfRange = today.clone().add(3, 'days') // 3 hari setelah hari ini

  let currentDate = startOfRange
  while (currentDate.isSameOrBefore(endOfRange)) {
    dates.push({
      date: currentDate.format('DD'), // Tanggal
      day: currentDate.format('ddd'), // Hari
      disabled: currentDate.isBefore(today, 'day'), // Tanggal sebelum hari ini
      selected: false // Tanggal hari ini otomatis terpilih
    })
    currentDate = currentDate.add(1, 'day')
  }

  // Temukan tanggal hari ini dan letakkan di urutan ke-3
  const todayIndex = dates.findIndex((date) => date.date === today.format('DD'))
  if (todayIndex !== -1 && todayIndex !== 2) {
    const [todayCard] = dates.splice(todayIndex, 1)
    dates.splice(2, 0, todayCard)
  }

  return dates
}

const selectDate = (index) => {
  if (!dates.value[index].disabled) {
    dates.value.forEach((date, i) => {
      date.selected = i === index
    })
  }
}

// Function to check if a category is selected
const isCategorySelected = (category) => {
  return selectedCategories.value.includes(category)
}

// Function to toggle category selection
const toggleCategory = (category) => {
  if (category === 'All') {
    selectedCategories.value = ['All']
  } else {
    const index = selectedCategories.value.indexOf(category)
    if (index === -1) {
      selectedCategories.value.push(category)
      selectedCategories.value = selectedCategories.value.filter((c) => c !== 'All')
    } else {
      selectedCategories.value.splice(index, 1)
    }
  }
}

// Function to check if a city is selected
const isCitySelected = (city) => {
  return selectedCities.value.includes(city)
}

// Function to toggle city selection
const toggleCity = (city) => {
  const index = selectedCities.value.indexOf(city)
  if (index === -1) {
    selectedCities.value.push(city)
  } else {
    selectedCities.value.splice(index, 1)
  }
}

const applyFilters = () => {
  // Logika untuk mengaplikasikan filter
  console.log('Filters applied')
}

const resetFilters = () => {
  // Logika untuk mereset filter
  console.log('Filters reset')
}

onMounted(() => {
  const todayIndex = dates.value.findIndex((date) => date.selected)
  if (todayIndex !== -1) {
    selectDate(todayIndex)
  }
})
</script>

<template>
  <VContainer v-if="!stores.loading" style="padding-bottom: 150px">
    <VRow no-gutters>
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <VBtn @click="showDatePicker = true" class="d-flex align-center" variant="text">
          <Icon icon="solar:calendar-outline" class="text-h6" />
          <span class="text-caption mx-2">{{ formattedDate }}</span>
          <Icon icon="mdi-chevron-down" />
        </VBtn>
        <VBtn @click="showTimePicker = true" class="d-flex align-center" variant="text">
          <Icon icon="solar:clock-circle-outline" class="text-h6" />
          <span class="text-caption mx-2">{{ formattedTimeRange }}</span>
          <Icon icon="mdi-chevron-down" />
        </VBtn>
      </VCol>
    </VRow>

    <VRow class="mb-6 mt-0">
      <VCol v-for="(date, index) in dates" :key="index" class="px-2" cols="2">
        <VCard
          class="border-thin rounded-lg"
          :class="{
            'bg-bg-grey-2 text-text-grey-3': date.disabled,
            'bg-text-orange text-white': date.selected,
            'bg-white text-black': !date.disabled
          }"
          elevation="0"
          @click="selectDate(index)"
          :disabled="date.disabled"
        >
          <v-card-title class="d-flex flex-column align-center">
            <div class="text-body-1 font-weight-black">{{ date.date }}</div>
            <div class="text-xxs" :class="{ 'text-text-grey': !date.disabled && !date.selected }">
              {{ date.day }}
            </div>
          </v-card-title>
        </VCard>
      </VCol>
    </VRow>

    <VRow no-gutters>
      <VCol cols="12">
        <p class="text-body-2 font-weight-bold">Which time would you prefer?</p>
      </VCol>
      <VCol cols="12" class="d-flex align-center">
        <VCard
          @click="showTimePicker = true"
          class="px-4 py-2 w-50 border-thin rounded-lg mt-2 mr-2"
          elevation="0"
        >
          <VRow no-gutters>
            <VCol cols="12">
              <p class="text-xxs text-text-grey">Dari jam</p>
              <p class="text-text-orange text-caption font-weight-black mt-1">
                {{ formattedStartTime }}
              </p>
            </VCol>
          </VRow>
        </VCard>
        <VCard
          @click="showTimePicker = true"
          class="px-4 py-2 w-50 border-thin rounded-lg mt-2"
          elevation="0"
        >
          <VRow no-gutters>
            <VCol cols="12">
              <p class="text-xxs text-text-grey">Sampai jam</p>
              <p class="text-text-orange text-caption font-weight-black mt-1">
                {{ formattedEndTime }}
              </p>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>

    <VRow no-gutters class="mt-6">
      <VCol cols="12">
        <p class="text-body-2 font-weight-bold">Price range</p>
      </VCol>
      <VCol cols="12">
        <VRangeSlider
          v-model="priceRange"
          :min="minPrice"
          :max="maxPrice"
          :step="step"
          thumb-color="#F87304"
          track-color="#A3A3A3"
          track-fill-color="#F87304"
          class="mt-2"
          thumb-size="22"
          track-size="1"
          tick-size="4"
          hide-details
        >
        </VRangeSlider>
      </VCol>

      <VCol cols="12" class="d-flex align-center">
        <VCard class="px-4 py-2 w-50 border-thin rounded-lg mt-2 mr-2" elevation="0">
          <VRow no-gutters>
            <VCol cols="12">
              <p class="text-xxs text-text-grey">Minimal</p>
              <p class="text-text-orange text-caption font-weight-black mt-1">
                Rp {{ formatNumber(priceRange[0]) }}
              </p>
            </VCol>
          </VRow>
        </VCard>
        <VCard class="px-4 py-2 w-50 border-thin rounded-lg mt-2" elevation="0">
          <VRow no-gutters>
            <VCol cols="12">
              <p class="text-xxs text-text-grey">Maksimal</p>
              <p class="text-text-orange text-caption font-weight-black mt-1">
                Rp {{ formatNumber(priceRange[1]) }}
              </p>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>

    <VRow no-gutters class="mt-6">
      <VCol cols="12">
        <p class="text-body-2">
          <span class="font-weight-bold">Field Category</span> (Can choose more than one)
        </p>
      </VCol>
      <VCol cols="12" class="d-flex flex-wrap mt-4">
        <VBtn
          :class="isCategorySelected('All') ? 'bg-text-orange text-white' : 'text-text-grey-3'"
          class="mx-1 border-thin text-none text-xxs mb-3"
          rounded="lg"
          elevation="0"
          density="comfortable"
          @click="toggleCategory('All')"
        >
          All
        </VBtn>
        <VBtn
          v-for="item in stores.sportItems"
          :key="item.id"
          :class="isCategorySelected(item.title) ? 'bg-text-orange text-white' : 'text-text-grey-3'"
          class="mx-1 border-thin text-none text-xxs mb-3"
          rounded="lg"
          elevation="0"
          density="comfortable"
          @click="toggleCategory(item.title)"
        >
          {{ item.title }}
        </VBtn>
      </VCol>
    </VRow>
    <VRow no-gutters class="mt-6">
      <VCol cols="12">
        <p class="text-body-2">
          <span class="font-weight-bold">Location</span> (Can choose more than one)
        </p>
      </VCol>
      <VCol cols="12" class="d-flex flex-wrap mt-4">
        <VBtn
          v-for="item in stores.cityItems"
          :key="item.id"
          :class="isCitySelected(item.name) ? 'bg-text-orange text-white' : 'text-text-grey-3'"
          class="mx-1 border-thin text-none text-xxs mb-3"
          rounded="lg"
          elevation="0"
          density="comfortable"
          @click="toggleCity(item.name)"
        >
          {{ item.name }}
        </VBtn>
      </VCol>
    </VRow>

    <VDialog v-model="showDatePicker">
      <VCard>
        <VDatePicker
          v-model="selectedDate"
          @update:model-value="onDateSelected"
          @click:cancel="showDatePicker = false"
        />
        <VCardActions class="position-fixed bottom-0 bg-white w-100">
          <VBtn @click="showDatePicker = false" text>Cancel</VBtn>
          <VBtn @click="showDatePicker = false" color="primary">OK</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>

    <VDialog v-model="showTimePicker">
      <VCard>
        <VCardTitle>Pick a Time Range</VCardTitle>
        <VCardText>
          <VTimePicker v-model="startTime" format="24hr" title="Select Start Time" landscape />
          <VTimePicker v-model="endTime" format="24hr" title="Select End Time" landscape />
        </VCardText>
        <VCardActions class="position-fixed bottom-0 bg-white w-100" style="z-index: 1000">
          <VBtn @click="showTimePicker = false" text>Cancel</VBtn>
          <VBtn @click="showTimePicker = false" color="primary">OK</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
  <VContainer class="sticky-footer bg-bg-main" max-width="100%">
    <VRow no-gutters>
      <VCol cols="12">
        <VBtn
          class="bg-text-orange rounded-lg py-6"
          elevation="0"
          block
          density="compact"
          @click="applyFilters"
          >Apply</VBtn
        >
      </VCol>
      <VCol cols="12" class="mt-6 d-flex justify-center">
        <VBtn
          class="text-bg-blue text-none text-caption font-weight-bold"
          variant="text"
          density="compact"
          @click="resetFilters"
        >
          Reset Filter
        </VBtn>
      </VCol>
    </VRow>
  </VContainer>
  <PageSpinLoader v-model:is-loading="stores.loading" />
</template>

<style scoped>
.filter-container {
  padding-bottom: 100px; /* Tambahan padding untuk mengakomodasi tombol di bawah */
}

/* Sticky footer untuk tombol Apply dan Reset */
.sticky-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 16px;
  z-index: 10;
}
</style>
