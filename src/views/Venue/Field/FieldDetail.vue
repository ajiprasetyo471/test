<script setup>
import moment from 'moment'
import activityImg2 from '@/assets/images/image-activity-dashboard-2.jpg'
import FieldDetailBanner from './FieldDetailBanner.vue'
import { useVenueStore } from '@/stores/venue.store.js'
import FieldHourCont from './FieldHourCont.vue'

const stores = useVenueStore()

const tab = ref('daily')
const showDatePicker = ref(false)
const selectedDate = ref(new Date())
const dates = ref(getDates())

const formattedMonth = computed(() => {
  return moment(selectedDate.value, 'YYYY-MM-DD').format('MMMM D, YYYY')
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
      selected: false
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

const selectDate = (date, index) => {
  if (!dates.value[index].disabled) {
    dates.value.forEach((date, i) => {
      date.selected = i === index
    })

    stores.setBookingDate(date)
  }
}
</script>

<template>
  <VContainer>
    <FieldDetailBanner
      :logo="activityImg2"
      :title="'Basket Ball Venue'"
      :activity="'Bola Basket'"
      :field="'21 x 11 m'"
      :field-type="'Outdoor'"
      :floor-type="'Vinyl'"
    />
    <VTabs
      v-model="tab"
      class="rounded-pill border-thin text-text-grey-3 mt-6"
      align-tabs="center"
      grow
      density="compact"
      selected-class="bg-bg-blue text-white"
    >
      <VTab class="rounded-pill text-caption" value="daily">Harian</VTab>
      <VTab class="rounded-pill text-caption" value="member">Memebrship</VTab>
    </VTabs>
    <VTabsWindow v-model="tab">
      <VTabsWindowItem value="daily" class="mt-6">
        <VRow no-gutters>
          <VCol cols="12" class="d-flex align-center justify-space-between">
            <p class="text-body-2 font-weight-bold">Pilih Jadwal Booking</p>
            <VBtn @click="showDatePicker = true" class="d-flex align-center" variant="text">
              <Icon icon="solar:calendar-outline" />
              <span class="text-caption mx-2">{{ formattedMonth }}</span>
              <Icon icon="mdi-chevron-down" />
            </VBtn>
          </VCol>
        </VRow>
        <VRow class="">
          <VCol v-for="(date, index) in dates" :key="index" class="px-2 pt-0" cols="2">
            <VCard
              class="border-thin rounded-lg"
              :class="{
                'bg-bg-grey-2 text-text-grey-3': date.disabled,
                'bg-text-orange text-white': date.selected,
                'bg-white text-black': !date.disabled
              }"
              elevation="0"
              @click="selectDate(date.date, index)"
              :disabled="date.disabled"
            >
              <v-card-title class="d-flex flex-column align-center">
                <div class="text-body-1 font-weight-black">{{ date.date }}</div>
                <div
                  class="text-xxs"
                  :class="{ 'text-text-grey': !date.disabled && !date.selected }"
                >
                  {{ date.day }}
                </div>
              </v-card-title>
            </VCard>
          </VCol>
        </VRow>
        <VRow no-gutters class="mt-6">
          <VCol cols="12" class="d-flex align-center justify-space-between">
            <p class="text-body-2 font-weight-bold">Pilih Jam</p>
          </VCol>
          <VCol cols="12">
            <VExpansionPanels rounded="lg">
              <FieldHourCont
                :icon="'fluent:weather-sunny-low-20-regular'"
                :title="'Pagi ke Siang'"
                :desc="'06:00 - 10:00'"
                :count="2"
              ></FieldHourCont>
              <FieldHourCont
                :icon="'fluent:weather-sunny-48-regular'"
                :title="'Siang ke Sore'"
                :desc="'10:00 - 16:00'"
                :count="4"
              ></FieldHourCont>
              <FieldHourCont
                :icon="'ph:moon-stars-thin'"
                :title="'Sore ke Malam'"
                :desc="'16:00 - 00:00'"
                :count="3"
              >
                <div class="d-flex flex-wrap justify-space-between">
                  <VCard
                    v-for="i in 8"
                    :key="i"
                    class="py-2 border-thin rounded-lg mt-2"
                    style="width: 48%"
                    elevation="0"
                  >
                    <p class="text-center text-xxs text-text-grey">16.00 - 17.00</p>
                    <p class="text-center text-caption text-text-orange font-weight-bold">
                      Rp150.000
                    </p>
                  </VCard>
                </div>
              </FieldHourCont>
            </VExpansionPanels>
          </VCol>
        </VRow>
      </VTabsWindowItem>
      <VTabsWindowItem value="member" class="mt-4"> </VTabsWindowItem>
    </VTabsWindow>

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
  </VContainer>
</template>
