<script setup>
const search = ref('')
</script>

<template>
  <VAppBar flat class="bg-bg-main" height="170">
    <VContainer class="d-flex flex-column">
      <div class="d-flex justify-space-between align-center">
        <VAvatar size="32">
          <VImg src="https://via.placeholder.com/40" alt="Profile" />
        </VAvatar>
        <div class="d-flex align-center flex-column">
          <span class="text-text-grey text-xs">Hallo, Norman</span>
          <div class="d-flex align-center">
            <Icon icon="solar:map-point-linear" class="mr-2" />
            <span class="font-weight-medium text-caption">Ciputat, Tangerang Selatan</span>
          </div>
        </div>
        <div class="d-flex align-center">
          <VBtn size="35" icon>
            <VBadge color="#FF4141">
              <Icon style="font-size: 28px" icon="uiw:bell" />
            </VBadge>
          </VBtn>
          <VBtn size="35" class="ml-1" icon>
            <Icon style="font-size: 28px" icon="mage:message-dots" />
          </VBtn>
        </div>
      </div>
      <div class="pt-4">
        <VTextField
          v-model="search"
          placeholder=" Cari"
          prepend-inner-icon="mdi-magnify"
          hide-details
          variant="outlined"
          rounded="xl"
        >
          <template #append-inner>
            <Icon style="font-size: 20px; color: #666666" icon="mage:filter" />
          </template>
        </VTextField>
      </div>
    </VContainer>
  </VAppBar>
</template>
