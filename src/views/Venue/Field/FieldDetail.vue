<script setup>
import PageSpinLoader from '@/@core/components/PageSpinLoader.vue'
import FieldHourCont from './FieldHourCont.vue'
import FieldDetailBanner from './FieldDetailBanner.vue'
import moment from 'moment'
import { useVenueStore } from '@/stores/venue.store.js'
import { useSnackbarStore } from '@/stores/snackbar'
import { useModalStore } from '@/stores/modal'

const stores = useVenueStore()
const snackStores = useSnackbarStore()
const modalStore = useModalStore()

const route = useRoute()

const selectedMonth = ref(moment(new Date(), 'YYYY-MM'))
const selectedDateIndex = ref(0)
const dates = ref(getDates())
const hourCards = ref([])
const reviewCards = ref([])

const formattedMonth = (month) => {
  return moment(month, 'YYYY-MM').format('MMMM, YYYY')
}

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
const selectDate = (date, index) => {
  if (!dates.value[index].disabled) {
    dates.value.forEach((date, i) => {
      date.selected = i === index
    })
    selectedDateIndex.value = index // Perbarui indeks yang dipilih

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
  getFieldDetailData(
    route.params.id,
    stores.venueId ? stores.venueId : JSON.parse(localStorage.getItem('venueId'))
  )
  hourCards.value = stores.getFieldHourCards()
  reviewCards.value = stores.getFieldReviewCards()
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
            @click="selectDate(date, index)"
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
    <VRow no-gutters class="mt-6">
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
