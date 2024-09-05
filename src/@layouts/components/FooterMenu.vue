<script setup>
const route = useRoute()
const active = ref(route.path)

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
  <VBottomNavigation v-model="active" app height="80">
    <VBtn
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
          :class="{ 'text-primary': active == item.route }"
          :icon="item.icon"
          style="font-size: 30px"
        />
        <span v-if="active === item.route" class="dot-indicator"></span>
        <span class="text-caption mt-2">{{ item.title }}</span>
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
  bottom: 22px; /* Menyesuaikan posisi dot di bawah ikon */
  width: 4px;
  height: 4px;
  background-color: #1976d2; /* Warna sesuai dengan tema aktif */
  border-radius: 50%;
}
</style>
