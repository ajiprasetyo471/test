<script setup>
import logo from "@/assets/images/logo/bayarind-logo.svg";
import logoSmall from "@/assets/images/logo/logo-small.png";
import home from "@/assets/images/logo/side-home-icon.svg";
import depo from "@/assets/images/logo/side-depo-icon.svg";
import report from "@/assets/images/logo/side-report-icon.svg";
import setting from "@/assets/images/logo/side-setting-icon.svg";
import SidebarMenuItem from "@layouts/components/SidebarMenuItem.vue";
import { useDisplay } from "vuetify/lib/framework.mjs";

const { mdAndUp } = useDisplay();
const isDesktop = computed(() => mdAndUp.value);

const props = defineProps({
  rail: {
    type: Boolean,
    required: true,
  },
});

const menus = [
  {
    title: "Dashboard",
    icon: home,
    path: "/",
    submenu: [],
  },
  {
    title: "Deposit",
    icon: depo,
    path: "/deposit",
    submenu: [],
  },
  {
    title: "Report",
    icon: report,
    submenu: [{ title: "Transaction", path: "/report-transaction" }],
  },
  {
    title: "Integration",
    icon: setting,
    submenu: [
      { title: "Key", path: "/integration/key" },
      { title: "Docs", path: "/integration/docs" },
    ],
  },
  {
    title: "Setting",
    icon: setting,
    submenu: [{ title: "Admin", path: "/setting-admin" }],
  },
];
</script>

<template>
  <!-- <v-navigation-drawer class="bg-bg-sidebar" app> -->
  <!-- Logo Section -->
  <VList v-if="isDesktop" class="d-flex align-center px-4 py-6" nav>
    <VImg
      v-if="props.rail == true"
      :src="logoSmall"
      max-width="150"
      class="mx-auto"
    />
    <VImg v-else :src="logo" max-width="150" class="mx-auto" />
  </VList>

  <!-- Menu List -->
  <VList nav>
    <VListItemGroup>
      <SidebarMenuItem
        v-for="(menu, index) in menus"
        :key="index"
        :menu="menu"
        class="mb-2"
      />
    </VListItemGroup>
  </VList>
  <!-- </v-navigation-drawer> -->
</template>

<style scoped></style>
