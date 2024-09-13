<script setup>
import { monthNames } from '@/helpers/helpers'
import { profileSportInteracts } from '@/db/db'
import { useSportStore } from '@/stores/sport.store'

const stores = useSportStore()

const tab = ref('personal')

const dialogRef = ref(null)
const isDialogOpen = ref(false) // State untuk kontrol visibilitas dialog

const socmedForm = ref({
  facebook: null,
  instagram: null,
  twitter: null
})

const form = ref({
  name: null,
  username: null,
  email: null,
  phoneNumber: null,
  gender: null,
  birthDate: null,
  bio: null
})

// Reactive state
const currentYear = ref(new Date().getFullYear())
const currentMonth = ref(null)
const currentDay = ref(1)
const buttonText = ref('Tanggal Lahir')

const props = defineProps({
  options: {
    type: Array,
    default: () => []
  }
})

// Computed properties for years, months, and days options
const years = computed(() => {
  const currYear = new Date().getFullYear()
  const lastYear = 1930
  return Array.from({ length: currYear - lastYear + 1 }, (_, index) => lastYear + index).reverse()
})

// Modify the months computed property to return month names with their respective index values
const months = computed(() => {
  return monthNames.map((name, index) => ({ label: name, value: index + 1 }))
})

// Update days whenever year or month changes
const days = computed(() => {
  const lastDay = new Date(currentYear.value, currentMonth.value, 0).getDate()
  return Array.from({ length: lastDay }, (_, index) => index + 1)
})

const filteredSports = computed(() => {
  return profileSportInteracts.filter((profile) => profile.isActive == true)
})

// Watch for changes in month and year to update days
watch([currentMonth, currentYear], () => {
  currentDay.value = Math.min(currentDay.value, days.value.length)
})

const handleClick = () => {
  if (dialogRef.value && !dialogRef.value.open) {
    dialogRef.value.showModal()
    isDialogOpen.value = true
  }
}

const closeDialog = () => {
  isDialogOpen.value = false // Tutup dialog
  if (dialogRef.value) {
    dialogRef.value.close()
  }
}
const confirmDialog = () => {
  isDialogOpen.value = false // Tutup dialog
  if (dialogRef.value) {
    dialogRef.value.close()
  }
  updateButtonText()
}

const updateButtonText = () => {
  if (currentMonth.value !== null) {
    buttonText.value = `${currentDay.value} ${monthNames[currentMonth.value - 1]} ${currentYear.value}`
    form.value.birthDate = `${currentYear.value}-${currentMonth.value < 10 ? '0' + currentMonth.value : currentMonth.value}-${currentDay.value}`
  }
}
</script>

<template>
  <VContainer>
    <VRow>
      <VCol cols="12" class="d-flex flex-column align-center justify-center">
        <VCard class="position-relative overflow-visible" elevation="0" width="80" height="80">
          <div class="bg-text-orange w-100 h-100 d-flex align-center justify-center rounded-lg">
            <p class="text-h4 font-weight-bold text-white">NO</p>
          </div>
          <VBtn
            class="rounded-circle bg-white position-absolute bottom-0"
            size="25"
            style="border: 1px solid #f87304; right: -15px; z-index: 20"
          >
            <Icon icon="mage:edit" class="text-text-orange" />
          </VBtn>
        </VCard>
        <p class="text-xxs text-text-grey-3 text-center mt-2">Format foto PNG, JPEG, GIF.</p>
        <p class="text-xxs text-text-grey-3 text-center">Ukuran Maks. 1 MB.</p>
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
      <VTab class="rounded-pill text-caption" value="personal">Data Personal</VTab>
      <VTab class="rounded-pill text-caption" value="socmed">Akun Sosial Media</VTab>
    </VTabs>
    <VTabsWindow v-model="tab">
      <VTabsWindowItem value="personal" class="mt-6">
        <VRow no-gutters class="pb-10 mb-10">
          <VCol cols="12" class="">
            <AppTextField
              label-required
              type="text"
              placeholder="Nama Lengkap"
              label="Nama Lengkap"
              v-model="form.name"
              :rules="[requiredValidator(form.name, 'Nama Lengkap')]"
            ></AppTextField>
          </VCol>
          <VCol cols="12" class="mt-n1">
            <AppTextField
              label-required
              type="text"
              placeholder="Username"
              label="Username"
              v-model="form.username"
              :rules="[requiredValidator(form.username, 'Username')]"
            ></AppTextField>
          </VCol>
          <VCol cols="12" class="mt-n1">
            <AppTextField
              label-required
              disabled
              type="text"
              placeholder="Email"
              label="Email"
              v-model="form.email"
              :rules="[emailValidator]"
            ></AppTextField>
          </VCol>
          <VCol cols="12" class="mt-n1">
            <AppTextField
              label-required
              disabled
              type="text"
              placeholder="Nomor Telepon"
              label="Nomor Telepon"
              v-model="form.phoneNumber"
              :rules="[phoneValidator]"
            >
              <template v-slot:prepend-inner>
                <div class="border-e-thin bg-white pr-2">
                  <Icon
                    icon="emojione:flag-for-indonesia"
                    class="border-thin rounded-circle text-h6 mt-2"
                  />
                </div>
              </template>
            </AppTextField>
          </VCol>
          <VCol cols="12" class="mt-n1">
            <label class="mb-1 text-caption text-black font-weight-bold"> Jenis Kelamin </label>
            <VRadioGroup v-model="form.gender" inline>
              <VRadio color="#F87304" value="laki">
                <template v-slot:label>
                  <span class="text-caption">Laki-laki</span>
                </template>
              </VRadio>
              <VRadio color="#F87304" value="perempuan">
                <template v-slot:label>
                  <span class="text-caption">Perempuan</span>
                </template>
              </VRadio>
            </VRadioGroup>
          </VCol>
          <VCol cols="12" class="mt-n1">
            <label class="mb-1 text-caption text-black font-weight-bold"> Tanggal Lahir </label>
            <VCard @click="handleClick" class="pa-3 border-thin rounded-lg mt-2" elevation="0">
              <span
                class="text-caption"
                :class="buttonText == 'Tanggal Lahir' ? 'text-text-grey-3' : undefined"
                >{{ buttonText }}</span
              >
            </VCard>
          </VCol>
          <VCol cols="12" class="mt-4">
            <div class="w-100 d-flex align-center justify-space-between">
              <label class="text-caption text-black font-weight-bold"> Minat Olahraga </label>
              <VBtn
                to="/sports"
                density="compact"
                size="small"
                class="text-xxs text-none text-text-blue"
                variant="text"
              >
                <Icon icon="mage:edit" />
                <span class="ml-2">Ubah Kategori Olahraga</span>
              </VBtn>
            </div>
            <div class="d-flex align-center justify-space-between flex-wrap">
              <VCard
                style="width: 48%"
                v-for="item in stores.activeSports"
                :key="item.id"
                class="pa-2 border-thin rounded-lg mt-2 d-flex align-center justify-start"
                elevation="0"
              >
                <Icon class="text-text-orange" :icon="item.icon" />
                <span class="ml-2 text-text-grey-3 text-xxs">{{ item.name }}</span>
              </VCard>
            </div>
            <VBtn
              to="/sports"
              class="text-xxs text-none text-text-blue mt-4"
              append-icon="mdi-chevron-right"
              variant="text"
              density="compact"
              size="small"
              >Lihat Selengkapnya</VBtn
            >
          </VCol>
          <VCol cols="12" class="mt-4">
            <label class="mb-1 text-caption text-black font-weight-bold"> Bio </label>

            <QuillEditor
              v-model="form.bio"
              :toolbar="['bold', 'italic', 'underline']"
              theme="snow"
              placeholder="Kamu belum menambahkan keterangan bio..."
            />
          </VCol>
        </VRow>
      </VTabsWindowItem>
      <VTabsWindowItem value="socmed" class="mt-6">
        <VRow no-gutters class="">
          <VCol cols="12">
            <AppTextField
              type="text"
              density="default"
              placeholder="Kamu belum menambahkan akun facebook"
              label="Facebook"
              v-model="socmedForm.facebook"
            >
              <template v-slot:prepend-inner>
                <div class="border-e-thin bg-white pr-2">
                  <Icon icon="uit:facebook-f" class="text-h6 text-text-orange mt-2" />
                </div>
              </template>
            </AppTextField>
          </VCol>
          <VCol cols="12" class="mt-n2">
            <AppTextField
              type="text"
              density="default"
              placeholder="Kamu belum menambahkan akun instagram"
              label="Instagram"
              v-model="socmedForm.instagram"
            >
              <template v-slot:prepend-inner>
                <div class="border-e-thin bg-white pr-2">
                  <Icon icon="basil:instagram-outline" class="text-h6 text-text-orange mt-2" />
                </div>
              </template>
            </AppTextField>
          </VCol>
          <VCol cols="12" class="mt-n2">
            <AppTextField
              type="text"
              density="default"
              placeholder="Kamu belum menambahkan akun X"
              label="Twitter"
              v-model="socmedForm.twitter"
            >
              <template v-slot:prepend-inner>
                <div class="border-e-thin bg-white pr-2">
                  <Icon icon="pajamas:twitter" class="text-h6 text-text-orange mt-2" />
                </div>
              </template>
            </AppTextField>
          </VCol>
        </VRow>
      </VTabsWindowItem>
    </VTabsWindow>

    <dialog ref="dialogRef" v-show="isDialogOpen" class="centered-dialog">
      <div class="picker-container pa-4">
        <p class="align-self-start text-body-2 font-weight-bold">Select Date</p>
        <div class="picker-group my-8">
          <!-- Display month names but keep the value as month index -->
          <VueScrollPicker
            class="picker-item text-caption text-black px-10"
            :options="months"
            v-model="currentMonth"
          >
            <template #default="{ option }">
              <span class="w-100">{{ option.label }}</span>
            </template>
          </VueScrollPicker>
          <VueScrollPicker
            class="picker-item text-caption text-black px-10"
            :options="days"
            v-model="currentDay"
          />
          <VueScrollPicker
            class="picker-item text-caption text-black px-10"
            :options="years"
            v-model="currentYear"
          />
        </div>
        <div class="d-flex align-self-end">
          <VBtn
            class="text-caption text-bg-blue text-none"
            variant="text"
            density="compact"
            size="small"
            @click="closeDialog"
            >Cancel</VBtn
          >
          <VBtn
            class="text-caption text-bg-blue text-none"
            variant="text"
            density="compact"
            size="small"
            @click="confirmDialog"
            >Confirm</VBtn
          >
        </div>
      </div>
    </dialog>
  </VContainer>
</template>

<style scoped>
.picker-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content; /* Ensure dialog height adjusts to content */
  margin: auto; /* Center dialog horizontally */
}

.picker-group {
  display: flex;
}

.picker-item {
  height: 70px;
  overflow: hidden;
}

.centered-dialog {
  width: 80%;
  border: 0;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  outline: none;
  transition: all 0.3s ease;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Center dialog vertically and horizontally */
}

.centered-dialog::backdrop {
  transition: all 0.3s ease;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 1;
}

@starting-style {
  .centered-dialog,
  .centered-dialog::backdrop {
    opacity: 0;
  }
}

.centered-dialog:not([open]),
.centered-dialog:not([open])::backdrop {
  opacity: 0;
}
</style>
