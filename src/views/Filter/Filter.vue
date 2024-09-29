<script setup>
import { formatNumber } from '@/helpers/helpers'
import moment from 'moment'
import { useHomeStore } from '@/stores/home.store.js'

const stores = useHomeStore()

const showTimePicker = ref(false)

const selectedMonth = ref(moment().format('YYYY-MM'))
const startTime = ref('00:00')
const endTime = ref('00:00')
const selectedDateIndex = ref(0)
const dates = ref(getDates())
const minPrice = 0 // Minimum price for the slider
const maxPrice = 5000000 // Maximum price for the slider
const step = 50000 // Step interval for the slider
const priceRange = ref([minPrice, maxPrice]) // Default price range [start, end]
const selectedCategories = ref([])
const selectedCities = ref([])

const formattedMonth = (month) => {
  return moment(month, 'YYYY-MM').format('MMMM, YYYY')
}

const formattedStartTime = computed(() => {
  return `${moment(startTime.value, 'HH:mm').format('HH:mm')}`
})
const formattedEndTime = computed(() => {
  return `${moment(endTime.value, 'HH:mm').format('HH:mm')}`
})

const onMonthSelected = (newMonth) => {
  selectedMonth.value = newMonth
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
    const todayIndex = dates.findIndex((date) => date.date === today.format('DD'))
    if (todayIndex !== -1) {
      selectedDateIndex.value = todayIndex // Fokus ke tanggal hari ini
    }
  } else {
    selectedDateIndex.value = 0
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
  // console.log('Filters applied')
}

const resetFilters = () => {
  // console.log('Filters reset')
}

onMounted(() => {})
</script>

<template>
  <VContainer v-if="!stores.loading" style="padding-bottom: 150px">
    <VRow no-gutters>
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <VueDatePicker
          style="width: 45%; font-size: 12px !important"
          class="text-caption"
          :format="formattedMonth"
          @update:model-value="onMonthSelected"
          month-picker
          :model-value="selectedMonth"
        >
          <template #input-icon>
            <Icon style="font-size: 20px" class="mt-1 text-black" icon="solar:calendar-outline" />
          </template>
          <template #clear-icon>
            <Icon style="font-size: 18px" class="text-black" icon="mdi:chevron-down" />
          </template>
        </VueDatePicker>
      </VCol>
    </VRow>

    <VSlideGroup v-model="selectedDateIndex" class="mb-8 mt-2">
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
              <div class="text-xxs" :class="{ 'text-text-grey': !date.disabled && !date.selected }">
                {{ date.day }}
              </div>
            </VCardTitle>
          </VCard>
        </VSlideGroupItem>
      </template>
    </VSlideGroup>

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

.dp__theme_light {
  --dp-border-color: none;
}

.dp__input {
  font-size: 12px;
}
</style>
