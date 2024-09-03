<script setup>
import logo from "@/assets/images/logo/bayarind-logo.svg";
import { useAuthStore } from "@/stores/auth.store";
import { useSnackbarStore } from "@/stores/snackbar";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mobile } = useDisplay();

const isMobile = computed(() => mobile.value);

const snackbarStores = useSnackbarStore();

const stores = useAuthStore();

const router = useRouter();
const loading = ref(false);

const logout = () => {
  loading.value = true;
  stores
    .logout()
    .then((r) => {
      if (r) {
        router.replace("/auth/login");
      }
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
};

const changePassword = () => {
  router.replace("/change-password");
};
</script>

<template>
  <VAppBar class="bg-bg-sidebar" app flat>
    <!-- Button untuk toggle sidebar -->
    <VBtn icon @click="$emit('toggleSidebar')">
      <VIcon>mdi-menu</VIcon>
    </VBtn>

    <VImg v-if="isMobile" :src="logo" max-width="100" class="mx-auto" />
    <VSpacer v-else></VSpacer>

    <VBtn icon>
      <VIcon>mdi-account-circle</VIcon>
      <VMenu activator="parent">
        <VList class="bg-bg-sidebar">
          <VListItem @click="changePassword">
            <VListItemTitle>
              <VIcon class="mr-2">mdi-key</VIcon>
              Change Password
            </VListItemTitle>
          </VListItem>

          <VListItem :disabled="loading" @click="logout">
            <VListItemTitle>
              <VIcon class="mr-2">mdi-logout</VIcon>
              Sign Out
            </VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VBtn>
  </VAppBar>

  <VSnackbar
    v-model="snackbarStores.isSnackbarOpen"
    :absolute="true"
    location="top right"
    timeout="2000"
    :color="snackbarStores.color"
  >
    {{ snackbarStores.title }}
  </VSnackbar>
</template>
