<script setup>
const router = useRouter();
const props = defineProps({
  menu: {
    type: Object,
    required: true,
  },
});

const isOpen = ref(false);

const toggleMenu = (path) => {
  if (path) {
    router.push(path);
  } else {
    isOpen.value = !isOpen.value;
  }
};
</script>

<template>
  <div>
    <VListItem
      class="d-flex justify-space-between"
      @click="toggleMenu(menu.path)"
    >
      <template #prepend>
        <div class="d-flex align-center">
          <VImg height="20" width="20" class="mr-6" :src="menu.icon"></VImg>
          <VListItemTitle class="text-subtitle-1">{{
            menu.title
          }}</VListItemTitle>
        </div>
      </template>
      <template #append>
        <VIcon v-if="menu.submenu.length > 0">{{
          isOpen ? "mdi-chevron-up" : "mdi-chevron-down"
        }}</VIcon>
      </template>
    </VListItem>

    <VList v-if="isOpen && menu.submenu.length > 0" class="pl-10 pt-0">
      <VListItem
        :to="sub.path"
        v-for="(sub, index) in menu.submenu"
        :key="index"
      >
        <!-- <VListItemContent> -->
        <VListItemTitle class="text-subtitle-1">{{ sub.title }}</VListItemTitle>
        <!-- </VListItemContent> -->
      </VListItem>
    </VList>
  </div>
</template>

<style scoped></style>
