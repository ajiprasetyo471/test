<script setup>
import moment from 'moment'
import { useVenueStore } from '@/stores/venue.store.js'
import { calculateTotalPrice, formatNumber } from '@/helpers/helpers'

const venueStores = useVenueStore()
const route = useRoute()
const router = useRouter()

const checkoutData = ref(
  venueStores.fieldCheckoutData ?? JSON.parse(localStorage.getItem('fieldCheckoutData'))
)
const loading = ref(false)
const active = ref(route.path || '')
const menuItems = ref([
  // { name: 'home', title: 'Home', icon: 'material-symbols-light:home-outline-rounded', route: '/' },
  {
    name: 'venue',
    title: 'Venue',
    icon: 'material-symbols-light:stadium-outline',
    route: '/venue'
  },
  {
    name: 'activity',
    title: 'Activity',
    icon: 'fluent-emoji-high-contrast:basketball',
    route: '/activity'
  },
  { name: 'booking', title: 'Booking', icon: 'ph:calendar-check-light', route: '/booking' }
  // {
  //   name: 'account',
  //   title: 'Account',
  //   icon: 'material-symbols-light:account-circle-outline',
  //   route: '/account'
  // }
])

const pageMeta = computed({
  get: () => route.meta,
  set: () => route.meta
})

const footerHeight = computed({
  get: () => {
    if (route.meta.isFieldFooter || route.meta.isPaymentFooter || route.meta.isCartFooter) {
      return 100
    } else {
      return 80
    }
  }
})

const isBooking = computed({
  get: () => {
    return venueStores.bookingHour.length > 0
  }
})

const fieldDataCheckout = () => {
  const bodyData = {
    FieldId: venueStores.fieldDetail.id,
    SportId: venueStores.fieldDetail.sportIds[0],
    FieldBookings: venueStores.bookingHour.map((i) => {
      return {
        FieldId: venueStores.fieldDetail.id,
        Date: moment(i.date).format('YYYY-MM-DD'),
        StartTime: i.startTime,
        EndTime: i.endTime
      }
    })
  }
  loading.value = true
  venueStores
    .fieldCheckout(bodyData)
    .then((r) => {
      console.log(r)
      if (r.success) {
        goToPayment()
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

const goToPayment = () => {
  router.push('/venue/payment')
}

const triggerValidation = () => {
  venueStores.setTriggerValidation()
}

// Watch the current route to update the active state
watch(route, (newRoute) => {
  active.value = newRoute.path || ''
})

const setActive = (routePath) => {
  // Jika route yang diklik sudah aktif, jangan ubah state active
  if (active.value !== routePath) {
    active.value = routePath
  }
}

onMounted(() => {
  // console.log('rendered footer')
})
</script>

<template>
  <VBottomNavigation v-if="pageMeta.isFooter == true" v-model="active" app :height="footerHeight">
    <VContainer v-if="pageMeta.isJoinFooter == true">
      <VBtn class="bg-bg-blue rounded-lg" block density="compact">Join</VBtn>
    </VContainer>
    <VContainer v-if="pageMeta.isSaveFooter == true">
      <VBtn class="bg-bg-blue rounded-lg" block density="compact">Simpan</VBtn>
    </VContainer>
    <VContainer v-if="pageMeta.isReportFooter == true">
      <VBtn to="/venue" class="bg-bg-blue rounded-lg" block density="compact">DONE</VBtn>
    </VContainer>
    <VContainer v-if="pageMeta.isFieldFooter == true">
      <div
        class="rounded-lg w-100 d-flex justify-space-between pa-4 align-center"
        :class="isBooking ? 'bg-bg-blue' : 'bg-bg-grey-3'"
      >
        <span v-if="!isBooking" class="text-xxs text-white">Select time would you prefer</span>
        <div v-else class="">
          <p class="text-xxs text-white">{{ venueStores.fieldDetail?.name }}</p>
          <p class="text-body-1 font-weight-bold text-white">
            {{ calculateTotalPrice(venueStores.bookingHour) }}
          </p>
        </div>
        <VBtn
          :readonly="!isBooking"
          class="bg-white rounded-lg d-flex align-center"
          density="compact"
          size="small"
          :loading="loading"
          @click="isBooking ? fieldDataCheckout() : undefined"
        >
          <span v-if="!isBooking" class="text-text-grey-3 text-caption font-weight-bold">NEXT</span>
          <span v-else class="text-black text-caption font-weight-bold">NEXT</span>
          <template #append>
            <VIcon
              size="25"
              class="rounded-circle text-body-1 pa-2 mt-n1 ml-2"
              :class="isBooking ? 'bg-text-orange' : 'bg-bg-grey-3'"
              style="color: white !important"
            >
              mdi-arrow-right
            </VIcon>
          </template>
        </VBtn>
      </div>
    </VContainer>
    <VContainer v-if="pageMeta.isPaymentFooter == true">
      <div
        class="rounded-lg w-100 d-flex justify-space-between pa-4 align-center"
        :class="venueStores.agreePayment == true ? 'bg-bg-blue' : 'bg-bg-grey-3'"
      >
        <div class="">
          <p class="text-xxs text-white">Total Payment</p>
          <p class="text-body-1 font-weight-bold text-white">
            Rp {{ formatNumber(checkoutData?.totalPayment) }}
          </p>
        </div>
        <VBtn
          class="bg-white rounded-lg d-flex align-center"
          density="compact"
          size="small"
          :readonly="venueStores.agreePayment == false"
          @click="venueStores.agreePayment == true ? triggerValidation() : undefined"
        >
          <span
            v-if="venueStores.agreePayment == false"
            class="text-text-grey-3 text-caption font-weight-bold"
            >PAYMENT</span
          >
          <span v-else class="text-black text-caption font-weight-bold">PAYMENT</span>
          <template #append>
            <VIcon
              size="25"
              class="rounded-circle text-body-1 pa-2 mt-n1 ml-2"
              :class="venueStores.agreePayment == true ? 'bg-text-orange' : 'bg-bg-grey-3'"
              style="color: white !important"
            >
              mdi-arrow-right
            </VIcon>
          </template>
        </VBtn>
      </div>
    </VContainer>
    <VContainer v-if="pageMeta.isCartFooter == true">
      <div class="rounded-lg w-100 d-flex justify-space-between pa-4 align-center bg-bg-blue">
        <div class="">
          <p class="text-xxs text-white">Total Payment</p>
          <p class="text-body-1 font-weight-bold text-white">Rp 155.000</p>
        </div>
        <VBtn
          class="bg-white rounded-lg d-flex align-center"
          density="compact"
          size="small"
          @click="goToPayment()"
        >
          <span class="text-black text-caption font-weight-bold">PAYMENT</span>
          <template #append>
            <VIcon
              size="25"
              class="rounded-circle text-body-1 pa-2 mt-n1 ml-2 bg-text-orange"
              style="color: white !important"
            >
              mdi-arrow-right
            </VIcon>
          </template>
        </VBtn>
      </div>
    </VContainer>
    <VBtn
      v-if="pageMeta.isMenuFooter == true"
      v-for="item in menuItems"
      :key="item.name"
      :to="item.route"
      :value="item.route"
      replace
      icon
      class="w-33"
      @click="setActive(item.route)"
    >
      <div class="position-relative d-flex flex-column align-center">
        <Icon
          class=""
          :class="{
            'text-primary':
              item.route === '/' ? active === item.route : active?.includes(item.route)
          }"
          :icon="item.icon"
          style="font-size: 27px"
        />
        <span
          v-if="item.route === '/' ? active === item.route : active?.includes(item.route)"
          class="dot-indicator"
        ></span>
        <span
          class="text-xxs mt-2"
          :class="{
            'text-text-blue':
              item.route === '/' ? active === item.route : active?.includes(item.route)
          }"
          >{{ item.title }}</span
        >
      </div>
    </VBtn>
  </VBottomNavigation>
</template>

<style scoped>
.v-bottom-navigation {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid #ccc;
  padding: 0 8px;
}

.dot-indicator {
  position: absolute;
  bottom: 18px; /* Menyesuaikan posisi dot di bawah ikon */
  width: 4px;
  height: 4px;
  background-color: #1976d2; /* Warna sesuai dengan tema aktif */
  border-radius: 50%;
}
</style>
