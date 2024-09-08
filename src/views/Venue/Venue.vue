<script setup>
import moment from 'moment'
import { useHomeStore } from '@/stores/home.store'

const homeStores = useHomeStore()

const showDatePicker = ref(false)
const showTimePicker = ref(false)

const selectedDate = ref(new Date())
const startTime = ref('18:00')
const endTime = ref('21:00')
const dates = ref(getDates())

const formattedDate = computed(() => {
  return moment(selectedDate.value, 'YYYY-MM-DD').format('MMMM D, YYYY')
})

const formattedTimeRange = computed(() => {
  return `${moment(startTime.value, 'HH:mm').format('HH:mm')} - ${moment(endTime.value, 'HH:mm').format('HH:mm')}`
})

function onDateSelected(newDate) {
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
      selected: currentDate.isSame(today, 'day') // Tanggal hari ini otomatis terpilih
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

function selectDate(index) {
  if (!dates.value[index].disabled) {
    dates.value.forEach((date, i) => {
      date.selected = i === index
    })
  }
}

onMounted(() => {
  homeStores.getActivityItems()
  const todayIndex = dates.value.findIndex((date) => date.selected)
  if (todayIndex !== -1) {
    selectDate(todayIndex)
  }
})
</script>

<template>
  <VContainer class="pt-0">
    <VRow no-gutters>
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <VBtn @click="showDatePicker = true" class="d-flex align-center" variant="text">
          <Icon icon="solar:calendar-outline" />
          <span class="text-caption mx-2">{{ formattedDate }}</span>
          <Icon icon="mdi-chevron-down" />
        </VBtn>
        <VBtn @click="showTimePicker = true" class="d-flex align-center" variant="text">
          <Icon icon="solar:clock-circle-outline" />
          <span class="text-caption mx-2">{{ formattedTimeRange }}</span>
          <Icon icon="mdi-chevron-down" />
        </VBtn>
      </VCol>
    </VRow>

    <VRow>
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
          <VTimePicker v-model="startTime" format="24hr" landscape />
          <VTimePicker v-model="endTime" format="24hr" landscape />
        </VCardText>
        <VCardActions class="position-fixed bottom-0 bg-white w-100" style="z-index: 1000">
          <VBtn @click="showTimePicker = false" text>Cancel</VBtn>
          <VBtn @click="showTimePicker = false" color="primary">OK</VBtn>
        </VCardActions>
      </VCard>
    </VDialog>
  </VContainer>
</template>
