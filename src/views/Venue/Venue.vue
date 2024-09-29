<script setup>
import VenueItem from './VenueItem.vue'
import PageSpinLoader from '@/@core/components/PageSpinLoader.vue'

import moment from 'moment'
import { useVenueStore } from '@/stores/venue.store.js'
import { useSnackbarStore } from '@/stores/snackbar'
import { VSlideGroupItem } from 'vuetify/lib/components/index.mjs'

const stores = useVenueStore()
const snackStores = useSnackbarStore()

const router = useRouter()

const showTimePicker = ref(false)

const selectedMonth = ref(moment().format('YYYY-MM'))
const startTime = ref('00:00')
const endTime = ref('00:00')
const selectedDateIndex = ref(0)
const dates = ref(getDates())

const formattedMonth = (month) => {
  return moment(month, 'YYYY-MM').format('MMMM, YYYY')
}

const formattedTimeRange = computed(() => {
  return `${moment(startTime.value, 'HH:mm').format('HH:mm')} - ${moment(endTime.value, 'HH:mm').format('HH:mm')}`
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

  stores.setFilter('startTime', startTime.value)
  stores.setFilter('endTime', endTime.value)
}

const goToDetail = (id) => {
  stores.setVenueId(id)
  router.push(`/venue/${id}`)
}

const getVenueList = async () => {
  try {
    const response = await stores.getVenueCards()
    if (response.success) {
      stores.setVenueCards(response.data.venueList)
    } else {
      stores.setVenueCards([])
    }
  } catch (err) {
    console.log(err)
    snackStores.openSnackbar(err?.message, 'error')
  }
}

onMounted(() => {
  getVenueList()
})
</script>

<template>
  <VContainer class="pt-0">
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
        <VBtn @click="showTimePicker = true" class="d-flex align-center" variant="text">
          <Icon icon="solar:clock-circle-outline" class="text-h6" />
          <span class="text-caption mx-2">{{ formattedTimeRange }}</span>
          <Icon icon="mdi-chevron-down" />
        </VBtn>
      </VCol>
    </VRow>

    <VSlideGroup v-model="selectedDateIndex" class="mb-6 mt-2">
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

    <VDialog v-model="showTimePicker">
      <VCard>
        <VCardTitle>Pick a Time Range</VCardTitle>
        <VCardText>
          <VTimePicker v-model="startTime" format="24hr" landscape />
          <VTimePicker v-model="endTime" format="24hr" landscape />
        </VCardText>
        <VCardActions class="position-fixed bottom-0 bg-white w-100" style="z-index: 1000">
          <VBtn @click="showTimePicker = false" text>Cancel</VBtn>
          <VBtn @click="handleTimeSelection" color="primary">OK</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
  <PageSpinLoader v-model:is-loading="stores.loading" />
</template>

<style>
.dp__theme_light {
  --dp-border-color: none;
}

.dp__input {
  font-size: 12px;
}
</style>
