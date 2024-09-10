<script setup>
import { useVenueStore } from '@/stores/venue.store.js'
const venueStores = useVenueStore()
const route = useRoute()
const active = ref(route.path)

const pageMeta = computed({
  get: () => route.meta,
  set: () => route.meta
})

const footerHeight = computed({
  get: () => {
    if (route.meta.isFieldFooter) {
      return 100
    } else {
      return 80
    }
  }
})

const isBooking = computed({
  get: () => {
    return (
      venueStores.datesMember.length > 0 || (venueStores.bookingDate && venueStores.bookingHour)
    )
  }
})

const menuItems = ref([
  { name: 'home', title: 'Home', icon: 'material-symbols-light:home-outline-rounded', route: '/' },
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
  { name: 'booking', title: 'Booking', icon: 'ph:calendar-check-light', route: '/booking' },
  {
    name: 'account',
    title: 'Account',
    icon: 'material-symbols-light:account-circle-outline',
    route: '/account'
  }
])

// Watch the current route to update the active state
watch(route, (newRoute) => {
  active.value = newRoute.path
})
</script>

<template>
  <VBottomNavigation v-if="pageMeta.isFooter == true" v-model="active" app :height="footerHeight">
    <VContainer v-if="pageMeta.isJoinFooter == true">
      <VBtn class="bg-bg-blue rounded-lg" block density="compact">Join</VBtn>
    </VContainer>
    <VContainer v-if="pageMeta.isFieldFooter == true">
      <div
        class="rounded-lg w-100 d-flex justify-space-between pa-4 align-center"
        :class="isBooking ? 'bg-bg-blue' : 'bg-bg-grey-3'"
      >
        <span v-if="!isBooking" class="text-xxs text-white">Silahkan pilih jadwal booking</span>
        <div v-else class="">
          <p class="text-xxs text-white">Basket Ball Venue</p>
          <p
            v-if="venueStores.datesMember.length == 0"
            class="text-body-1 font-weight-bold text-white"
          >
            Rp 150.000
          </p>
          <p
            v-if="venueStores.datesMember.length > 0"
            class="text-body-1 font-weight-bold text-white"
          >
            Rp {{ 150000 * venueStores.datesMember.length }}
          </p>
        </div>
        <VBtn
          readonly
          class="bg-white rounded-lg d-flex align-center"
          density="compact"
          size="small"
        >
          <span v-if="!isBooking" class="text-text-grey-3 text-caption font-weight-bold"
            >BELUM PILIH</span
          >
          <span v-else class="text-black text-caption font-weight-bold">LANJUT</span>
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
    <VBtn
      v-if="pageMeta.isMenuFooter == true"
      v-for="item in menuItems"
      :key="item.name"
      :to="item.route"
      :value="item.route"
      replace
      icon
    >
      <div class="position-relative d-flex flex-column align-center">
        <Icon
          class=""
          :class="{
            'text-primary': item.route === '/' ? active === item.route : active.includes(item.route)
          }"
          :icon="item.icon"
          style="font-size: 27px"
        />
        <span
          v-if="item.route === '/' ? active === item.route : active.includes(item.route)"
          class="dot-indicator"
        ></span>
        <span
          class="text-xxs mt-2"
          :class="{
            'text-text-blue':
              item.route === '/' ? active === item.route : active.includes(item.route)
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
