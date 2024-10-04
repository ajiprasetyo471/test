<script setup>
import PageSpinLoader from '@/@core/components/PageSpinLoader.vue'
import FieldHourCont from './FieldHourCont.vue'
import FieldDetailBanner from './FieldDetailBanner.vue'
import moment from 'moment'
import { formatTimeWithoutSeconds, formatNumber } from '@/helpers/helpers'
import { useVenueStore } from '@/stores/venue.store.js'
import { useSnackbarStore } from '@/stores/snackbar'
import { useModalStore } from '@/stores/modal'

const stores = useVenueStore()
const snackStores = useSnackbarStore()
const modalStore = useModalStore()

const route = useRoute()

const selectedMonth = ref({ month: 0, year: 0 })
const selectedDateIndex = ref(
  stores.dateTime && stores.fieldId == route.params.id ? stores.dateTime.split('-')[2] - 1 : 0
)
const dates = ref(getDates())
const selectedHours = ref([])
const reviewCards = ref([])

const formattedMonth = computed(() => {
  if (selectedMonth.value.year && selectedMonth.value.month) {
    return moment(
      `${selectedMonth.value.year}-${String(selectedMonth.value.month + 1).padStart(2, '0')}`,
      'YYYY-MM'
    ).format('MMMM, YYYY')
  }
  return moment().format('MMMM, YYYY') // Default jika selectedMonth kosong
})

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
    if (stores.dateTime && stores.fieldId == route.params.id) {
      const [year, month, day] = stores.dateTime.split('-')

      selectedDateIndex.value = day - 1
    } else {
      const todayIndex = dates.findIndex((date) => date.date === today.format('DD'))
      if (todayIndex !== -1) {
        selectedDateIndex.value = todayIndex // Fokus ke tanggal hari ini
      }
    }
  } else {
    if (stores.dateTime && stores.fieldId == route.params.id) {
      const [year, month, day] = stores.dateTime.split('-')

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

  stores.setDateTime(
    route.params.id,
    stores.venueId ? stores.venueId : JSON.parse(localStorage.getItem('venueId')),
    selectedDate
  )

  stores.setFieldId(route.params.id)
  stores.setBookingDate(selectedDate)
}

const selectHourMorning = (hour) => {
  if (!hour.disabled) {
    const selectedHour = stores.fieldTimeMorning.find((h) => h.id === hour.id)

    if (selectedHour) {
      selectedHour.selected = !selectedHour.selected // Toggle selected status

      if (selectedHour.selected) {
        stores.addBookingHour(hour) // Tambahkan jika dipilih
      } else {
        stores.removeBookingHour(hour.id) // Hapus jika tidak dipilih
      }
    }
  }
}

const selectHourAfternoon = (hour) => {
  if (!hour.disabled) {
    const selectedHour = stores.fieldTimeAfternoon.find((h) => h.id === hour.id)

    if (selectedHour) {
      selectedHour.selected = !selectedHour.selected // Toggle selected status

      if (selectedHour.selected) {
        stores.addBookingHour(hour) // Tambahkan jika dipilih
      } else {
        stores.removeBookingHour(hour.id) // Hapus jika tidak dipilih
      }
    }
  }
}

const selectHourEvening = (hour) => {
  if (!hour.disabled) {
    const selectedHour = stores.fieldTimeEvening.find((h) => h.id === hour.id)

    if (selectedHour) {
      selectedHour.selected = !selectedHour.selected // Toggle selected status

      if (selectedHour.selected) {
        stores.addBookingHour(hour) // Tambahkan jika dipilih
      } else {
        stores.removeBookingHour(hour.id) // Hapus jika tidak dipilih
      }
    }
  }
}

const getFieldDetailData = (id, venueId) => {
  stores
    .getDetailField(id, venueId)
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      console.log(err)
      snackStores.openSnackbar(err?.message, 'error')
    })
}
const getFieldTimeData = (id, venueId) => {
  const date =
    stores.dateTime && stores.fieldId == route.params.id
      ? stores.dateTime
      : moment().format('YYYY-MM-DD')
  stores
    .getTimeField(id, venueId, { date: date })
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      console.log(err)
      snackStores.openSnackbar(err?.message, 'error')
    })
}

onMounted(() => {
  if (stores.dateTime && stores.fieldId == route.params.id) {
    const [year, month, day] = stores.dateTime.split('-')
    selectedMonth.value = {
      month: parseInt(month - 1), // Pastikan bulan dalam format angka
      year: parseInt(year) // Pastikan tahun dalam format angka
    }
    selectedDateIndex.value = day - 1 // Set default selected date index
    dates.value = getDates(selectedMonth.value.month, selectedMonth.value.year)
    dates.value[day - 1].selected = true
  } else {
    const currentMonth = moment().month() // Bulan saat ini dalam angka (1-12)
    const currentYear = moment().year() // Tahun saat ini
    selectedMonth.value = { month: currentMonth, year: currentYear }
    selectedDateIndex.value = moment().date() - 1 // Default ke tanggal hari ini
    dates.value = getDates(currentMonth, currentYear) // Set tanggal untuk bulan saat ini
  }
  getFieldDetailData(
    route.params.id,
    stores.venueId ? stores.venueId : JSON.parse(localStorage.getItem('venueId'))
  )
  getFieldTimeData(
    route.params.id,
    stores.venueId ? stores.venueId : JSON.parse(localStorage.getItem('venueId'))
  )
  reviewCards.value = stores.getFieldReviewCards()
  stores.emptyBookingHour()
})
</script>

<template>
  <VContainer v-if="!stores.loading">
    <FieldDetailBanner
      :logo="stores.fieldDetail?.coverPictureUrl"
      :title="stores.fieldDetail?.name"
      :activity="stores.fieldDetail?.sportNamesId[0]"
      :field="`${stores.fieldDetail?.length} x ${stores.fieldDetail?.width} m`"
      :field-type="stores.fieldDetail?.fieldType"
      :floor-type="stores.fieldDetail?.floorType"
    />
    <VRow no-gutters class="mt-4">
      <VCol cols="12" class="border-b-thin pb-2">
        <p class="text-body-2 font-weight-bold">Review Venue</p>
        <p class="text-xxs">Players' ratings of the venue.</p>
      </VCol>
      <VCol cols="12">
        <VSheet class="mt-2">
          <VSlideGroup>
            <VSlideGroupItem v-for="item in reviewCards" :key="item.id" v-slot="{ toggle }">
              <VBtn
                class="mr-1 border-thin text-none text-xxs"
                rounded="lg"
                density="comfortable"
                elevation="0"
                @click="toggle"
              >
                <span class="text-text-grey-3">{{ item.review }}</span>
                <span class="text-text-orange">({{ item.count }})</span>
              </VBtn>
            </VSlideGroupItem>
          </VSlideGroup>
        </VSheet>
      </VCol>
    </VRow>

    <VRow no-gutters class="mt-4">
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <p class="text-body-2 font-weight-bold">Select booking schedule</p>
        <!-- <VBtn @click="showDatePicker = true" class="d-flex align-center" variant="text">
              <Icon icon="solar:calendar-outline" />
              <span class="text-caption mx-2">{{ formattedMonth }}</span>
              <Icon icon="mdi-chevron-down" />
            </VBtn> -->

        <VueDatePicker
          style="width: 45%; font-size: 12px !important"
          class="text-caption"
          :format="() => formattedMonth"
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
    <VSlideGroup v-model="selectedDateIndex" class="pb-1 mt-2">
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
    <VRow no-gutters class="mt-6" v-if="!stores.loadingTime">
      <VCol cols="12" class="d-flex align-center justify-space-between">
        <p class="text-body-2 font-weight-bold">Which time would you prefer?</p>
      </VCol>
      <VCol cols="12">
        <VExpansionPanels rounded="lg">
          <FieldHourCont
            :icon="'fluent:weather-sunny-low-20-regular'"
            :title="'Pagi ke Siang'"
            :desc="'06:00 - 10:00'"
            :count="2"
          >
            <div class="d-flex flex-wrap justify-space-between">
              <VCard
                v-for="(item, index) in stores.fieldTimeMorning"
                :key="item.id"
                :disabled="item.available == false"
                class="py-2 border-thin rounded-lg mt-2 position-relative"
                :class="{
                  'bg-bg-grey-2': item.available == false,
                  'bg-text-orange': item.selected == true
                }"
                style="width: 48%"
                elevation="0"
                @click="item.available == true ? selectHourMorning(item) : undefined"
              >
                <p
                  class="text-center text-xxs"
                  :class="
                    item.available == false
                      ? 'text-text-grey-3'
                      : item.selected == true
                        ? 'text-white'
                        : 'text-text-grey'
                  "
                >
                  {{
                    `${formatTimeWithoutSeconds(item.startTime)} - ${formatTimeWithoutSeconds(item.endTime)}`
                  }}
                </p>
                <p
                  class="text-center text-caption font-weight-bold"
                  :class="
                    item.available == false
                      ? 'text-text-grey-3'
                      : item.selected == true
                        ? 'text-white'
                        : 'text-text-orange'
                  "
                >
                  Rp{{ formatNumber(item.price) }}
                </p>
                <div
                  v-if="item.selected == true"
                  class="bg-text-blue position-absolute right-0 px-2"
                  style="top: 30%; border-top-left-radius: 10px; border-bottom-left-radius: 10px"
                  size="x-small"
                >
                  <Icon
                    icon="fluent-emoji-high-contrast:check-mark"
                    class="text-white text-caption"
                  />
                </div>
              </VCard></div
          ></FieldHourCont>
          <FieldHourCont
            :icon="'fluent:weather-sunny-48-regular'"
            :title="'Siang ke Sore'"
            :desc="'10:00 - 16:00'"
            :count="4"
          >
            <div class="d-flex flex-wrap justify-space-between">
              <VCard
                v-for="(item, index) in stores.fieldTimeAfternoon"
                :key="item.id"
                :disabled="item.available == false"
                class="py-2 border-thin rounded-lg mt-2 position-relative"
                :class="{
                  'bg-bg-grey-2': item.available == false,
                  'bg-text-orange': item.selected == true
                }"
                style="width: 48%"
                elevation="0"
                @click="item.available == true ? selectHourAfternoon(item) : undefined"
              >
                <p
                  class="text-center text-xxs"
                  :class="
                    item.available == false
                      ? 'text-text-grey-3'
                      : item.selected == true
                        ? 'text-white'
                        : 'text-text-grey'
                  "
                >
                  {{
                    `${formatTimeWithoutSeconds(item.startTime)} - ${formatTimeWithoutSeconds(item.endTime)}`
                  }}
                </p>
                <p
                  class="text-center text-caption font-weight-bold"
                  :class="
                    item.available == false
                      ? 'text-text-grey-3'
                      : item.selected == true
                        ? 'text-white'
                        : 'text-text-orange'
                  "
                >
                  Rp{{ formatNumber(item.price) }}
                </p>
                <div
                  v-if="item.selected == true"
                  class="bg-text-blue position-absolute right-0 px-2"
                  style="top: 30%; border-top-left-radius: 10px; border-bottom-left-radius: 10px"
                  size="x-small"
                >
                  <Icon
                    icon="fluent-emoji-high-contrast:check-mark"
                    class="text-white text-caption"
                  />
                </div>
              </VCard></div
          ></FieldHourCont>
          <FieldHourCont
            :icon="'ph:moon-stars-thin'"
            :title="'Sore ke Malam'"
            :desc="'16:00 - 00:00'"
            :count="3"
          >
            <div class="d-flex flex-wrap justify-space-between">
              <VCard
                v-for="(item, index) in stores.fieldTimeEvening"
                :key="item.id"
                :disabled="item.available == false"
                class="py-2 border-thin rounded-lg mt-2 position-relative"
                :class="{
                  'bg-bg-grey-2': item.available == false,
                  'bg-text-orange': item.selected == true
                }"
                style="width: 48%"
                elevation="0"
                @click="item.available == true ? selectHourEvening(item) : undefined"
              >
                <p
                  class="text-center text-xxs"
                  :class="
                    item.available == false
                      ? 'text-text-grey-3'
                      : item.selected == true
                        ? 'text-white'
                        : 'text-text-grey'
                  "
                >
                  {{
                    `${formatTimeWithoutSeconds(item.startTime)} - ${formatTimeWithoutSeconds(item.endTime)}`
                  }}
                </p>
                <p
                  class="text-center text-caption font-weight-bold"
                  :class="
                    item.available == false
                      ? 'text-text-grey-3'
                      : item.selected == true
                        ? 'text-white'
                        : 'text-text-orange'
                  "
                >
                  Rp{{ formatNumber(item.price) }}
                </p>
                <div
                  v-if="item.selected == true"
                  class="bg-text-blue position-absolute right-0 px-2"
                  style="top: 30%; border-top-left-radius: 10px; border-bottom-left-radius: 10px"
                  size="x-small"
                >
                  <Icon
                    icon="fluent-emoji-high-contrast:check-mark"
                    class="text-white text-caption"
                  />
                </div>
              </VCard>
            </div>
          </FieldHourCont>
        </VExpansionPanels>
      </VCol>
    </VRow>
    <PageSpinLoader v-model:is-loading="stores.loadingTime" />
  </VContainer>
  <ShareModal
    v-if="!stores.loading"
    v-model="modalStore.isModalOpen"
    :title="'Field'"
    :share-url="stores.fieldDetail?.shareLinkUrl"
  />
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
