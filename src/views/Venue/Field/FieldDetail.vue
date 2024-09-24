<script setup>
import activityImg2 from '@/assets/images/image-activity-dashboard-2.jpg'
import moment from 'moment'
import FieldHourCont from './FieldHourCont.vue'
import FieldDetailBanner from './FieldDetailBanner.vue'
import { useVenueStore } from '@/stores/venue.store.js'
import { useSnackbarStore } from '@/stores/snackbar'

const stores = useVenueStore()
const snackStores = useSnackbarStore()

const route = useRoute()

const tab = ref('daily')
const selectedMonth = ref(moment(new Date(), 'YYYY-MM'))
const selectedDates = ref([])
const dates = ref(getDates())
const hourCards = ref([])
const reviewCards = ref([])

const venueId = computed(() => {
  return JSON.parse(localStorage.getItem('venueId'))
})

watch(tab, () => {
  stores.setDatesMember([])
  stores.setBookingHour('')
  stores.setBookingDate('')
})

const formattedMonth = (month) => {
  return moment(month, 'YYYY-MM').format('MMMM, YYYY')
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

const selectHour = (hour, index) => {
  if (!hourCards.value[index].disabled) {
    hourCards.value.forEach((hour, i) => {
      hour.selected = i === index
    })

    stores.setBookingHour(hour)
  }
}

const onDateSelected = (dates) => {
  stores.setDatesMember(dates)
}

const getFieldDetailData = (id, venueId) => {
  stores
    .getDetailField(id, venueId)
    .then((res) => {
      console.log(res)
    })
    .catch((err) => {
      console.log(err)
      snackStores.openSnackbar(err?.message, 'error')
    })
}

onMounted(() => {
  getFieldDetailData(route.params.id, stores.venueId ?? venueId)
  hourCards.value = stores.getFieldHourCards()
  reviewCards.value = stores.getFieldReviewCards()
})
</script>

<template>
  <VContainer>
    <FieldDetailBanner
      :logo="stores.fieldDetail?.coverPictureUrl"
      :title="stores.fieldDetail?.name"
      :activity="stores.fieldDetail?.sportNamesId[0]"
      :field="`${stores.fieldDetail?.length} x ${stores.fieldDetail?.width} m`"
      :field-type="stores.fieldDetail?.fieldType"
      :floor-type="stores.fieldDetail?.floorType"
    />
    <VRow v-if="tab == 'member'" no-gutters class="mt-4">
      <VCol cols="12" class="border-b-thin pb-2">
        <p class="text-body-2 font-weight-bold">Review Venue</p>
        <p class="text-xxs">Penilaian venue menurut players.</p>
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

    <VTabs
      v-model="tab"
      class="rounded-pill border-thin text-text-grey-3 mt-6"
      align-tabs="center"
      grow
      density="compact"
      selected-class="bg-bg-blue text-white"
    >
      <VTab class="rounded-pill text-caption" value="daily">Harian</VTab>
      <VTab class="rounded-pill text-caption" value="member">Membership</VTab>
    </VTabs>
    <VTabsWindow v-model="tab">
      <VTabsWindowItem value="daily" class="mt-6">
        <VRow no-gutters>
          <VCol cols="12" class="d-flex align-center justify-space-between">
            <p class="text-body-2 font-weight-bold">Pilih Jadwal Booking</p>
            <!-- <VBtn @click="showDatePicker = true" class="d-flex align-center" variant="text">
              <Icon icon="solar:calendar-outline" />
              <span class="text-caption mx-2">{{ formattedMonth }}</span>
              <Icon icon="mdi-chevron-down" />
            </VBtn> -->

            <VueDatePicker
              style="width: 45%; font-size: 12px !important"
              class="text-caption"
              :format="formattedMonth"
              month-picker
              v-model="selectedMonth"
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
                    v-for="(item, index) in hourCards"
                    :key="index"
                    :disabled="item.isActive == false"
                    class="py-2 border-thin rounded-lg mt-2 position-relative"
                    :class="{
                      'bg-bg-grey-2': item.isActive == false,
                      'bg-text-orange': item.selected == true
                    }"
                    style="width: 48%"
                    elevation="0"
                    @click="item.isActive == true ? selectHour(item, index) : undefined"
                  >
                    <p
                      class="text-center text-xxs"
                      :class="
                        item.isActive == false
                          ? 'text-text-grey-3'
                          : item.selected == true
                            ? 'text-white'
                            : 'text-text-grey'
                      "
                    >
                      {{ item.hour }}
                    </p>
                    <p
                      class="text-center text-caption font-weight-bold"
                      :class="
                        item.isActive == false
                          ? 'text-text-grey-3'
                          : item.selected == true
                            ? 'text-white'
                            : 'text-text-orange'
                      "
                    >
                      Rp{{ item.price }}
                    </p>
                    <div
                      v-if="item.selected == true"
                      class="bg-text-blue position-absolute right-0 px-2"
                      style="
                        top: 30%;
                        border-top-left-radius: 10px;
                        border-bottom-left-radius: 10px;
                      "
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
      </VTabsWindowItem>
      <VTabsWindowItem value="member" class="mt-2">
        <VRow no-gutters>
          <VCol cols="12">
            <VCard
              class="bg-bg-orange pa-4"
              style="border: 1px solid #f2c94c"
              elevation="0"
              rounded="lg"
            >
              <div class="d-flex">
                <Icon icon="ion:warning-outline" class="text-text-orange" />
                <span class="text-caption font-weight-bold ml-2">Aturan Membership</span>
              </div>
              <p class="text-text-grey-4 text-xxs">
                Slot membership yang dapat dipesan adalah slot yang masih tersedia paling lambat
                tanggal 7 setiap bulannya. Anda hanya dapat memilih 1 slot membership dalam 1 kali
                transaksi.
              </p>
            </VCard>
          </VCol>
        </VRow>
        <VRow no-gutters class="mt-6">
          <VCol cols="12">
            <p class="text-body-2 font-weight-bold text-center">Membership untuk bulan</p>
            <div class="d-flex align-center text-text-grey-3 mt-2 justify-center">
              <Icon icon="solar:calendar-outline" />
              <span class="text-caption mx-2">Agustus, 2024</span>
            </div>
          </VCol>
        </VRow>
        <VRow no-gutters class="mt-2">
          <VCol cols="12">
            <p class="text-caption">Jadwal Setiap:</p>
            <VDatePicker
              v-model="selectedDates"
              max-height="300"
              hide-header
              class="mx-auto"
              multiple
              @update:model-value="onDateSelected"
            />
          </VCol>
        </VRow>
      </VTabsWindowItem>
    </VTabsWindow>
  </VContainer>
</template>

<style>
.dp__theme_light {
  --dp-border-color: none;
}

.dp__input {
  font-size: 12px;
}

.v-date-picker-month__day--selected .v-btn {
  background-color: white !important;
  border: 1px solid #f87304 !important;
}
.v-date-picker-month__day--selected .v-btn__content {
  color: black;
}
</style>
