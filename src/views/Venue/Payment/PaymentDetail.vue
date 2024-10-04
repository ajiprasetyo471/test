<script setup>
import AppTextArea from '@/@core/components/forms/AppTextArea.vue'
import activityImg2 from '@/assets/images/image-activity-dashboard-2.jpg'

const form = ref({
  name: '',
  phoneNumber: '',
  email: '',
  communityGroup: '',
  note: ''
})

onMounted(() => {})
</script>

<template>
  <VContainer class="pb-8">
    <VCard class="pa-4 border-thin rounded-lg" elevation="0">
      <VRow no-gutters>
        <VCol cols="12" class="d-flex align-center justify-start" style="gap: 10px">
          <div style="width: 40%">
            <div class="" style="height: 64px; border-radius: 20px !important">
              <VImg
                :src="activityImg2"
                cover
                rounded="lg"
                style="height: 64px; object-fit: cover; object-position: center"
              />
            </div>
          </div>
          <div style="width: 73%">
            <VRow no-gutters class="px-2">
              <VCol cols="12">
                <h3 class="font-weight-black text-body-2">British School Jakarta</h3>
              </VCol>
              <VCol cols="12" class="mt-1">
                <p class="text-xxs text-text-grey">Basket Ball Venue 1</p>
              </VCol>
              <VCol cols="12" class="mt-1">
                <VChip size="small" class="text-text-orange text-caption font-weight-black">
                  Rp150.000
                </VChip>
              </VCol>
            </VRow>
          </div>
        </VCol>
      </VRow>
    </VCard>
    <VRow no-gutters class="mt-4">
      <VCol cols="12">
        <h2 class="font-weight-black text-body-2">Booking Details</h2>
        <p class="text-xxs text-text-grey-4 mt-1">
          It is important to confirm that all order information is correct.
        </p>
      </VCol>
      <VCol cols="12">
        <VCard class="py-4 px-3 border-thin rounded-lg mt-2" elevation="0">
          <VRow no-gutters>
            <VCol cols="6">
              <CardCategoryItem
                :icon="'solar:bag-check-outline'"
                :category="'Order Type'"
                :title="'Venue'"
              />
              <CardCategoryItem
                class="mt-3"
                :icon="'solar:calendar-outline'"
                :category="'Date and Time'"
                :title="'Sunday, 26 Agustus 2024'"
              />
            </VCol>
            <VCol cols="6">
              <CardCategoryItem
                :icon="'fluent-emoji-high-contrast:basketball'"
                :category="'Field Type'"
                :title="'Bola Basket'"
              />
              <CardCategoryItem
                class="mt-3"
                :icon="'solar:clock-circle-outline'"
                :category="'Booking Hour'"
                :title="'23:00 - 24:00'"
              />
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
    <VRow no-gutters class="mt-4">
      <VCol cols="12">
        <h2 class="font-weight-black text-body-2">Booking info</h2>
        <p class="text-xxs text-text-grey-4 mt-1">
          Please ensure that all information provided is accurate and matches your official
          identification. This information is used to verify your identity and prevent unauthorized
          bookings.
        </p>
      </VCol>
      <VCol cols="12" class="mt-2">
        <AppTextField
          label-required
          type="text"
          placeholder="Nama Pemesan"
          label="Name"
          v-model="form.name"
          :rules="[requiredValidator(form.name, 'Nama Pemesan')]"
        ></AppTextField>
      </VCol>
      <VCol cols="12" class="mt-n1">
        <AppTextField
          label-required
          type="text"
          placeholder="Nomor Telepon"
          label="Phone Number"
          v-model="form.name"
          :rules="[requiredValidator(form.phoneNumber, 'Nomor Telepon'), phoneValidator]"
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
        <AppTextField
          label-required
          type="text"
          placeholder="Email"
          label="Email"
          v-model="form.email"
          :rules="[requiredValidator(form.email, 'Email'), emailValidator]"
        ></AppTextField>
      </VCol>
      <VCol cols="12" class="mt-n1">
        <AppTextField
          type="text"
          placeholder="Comunity Name/Group"
          label="Comunity Name"
          v-model="form.communityGroup"
        ></AppTextField>
      </VCol>
      <VCol cols="12" class="mt-n1">
        <AppTextArea
          type="text"
          placeholder="Write description"
          label="Notes"
          v-model="form.note"
        ></AppTextArea>
      </VCol>
    </VRow>
    <VRow no-gutters class="mt-2">
      <VCol cols="12">
        <h2 class="font-weight-black text-body-2">Payment</h2>
        <p class="text-xxs text-text-grey-4 mt-1">
          Your transactions are safeguarded with the latest security measures.
        </p>
      </VCol>
      <!-- <VCol cols="12" class="mt-2">
        <VCard
          class="pa-4 border-thin rounded-lg mt-2 d-flex align-center justify-space-between w-100"
          elevation="0"
        >
          <div class="d-flex align-center">
            <Icon
              icon="streamline:discount-percent-coupon"
              class="text-text-orange text-h6 mt-n1"
            />
            <span class="text-caption font-weight-medium ml-4">Gunakan Voucher</span>
          </div>
          <Icon icon="material-symbols:chevron-right" />
        </VCard>
      </VCol> -->
      <VCol cols="12" class="mt-6">
        <VCard
          class="bg-bg-orange pa-4"
          style="border: 1px solid #f2c94c"
          elevation="0"
          rounded="lg"
        >
          <div class="d-flex">
            <Icon icon="ion:warning-outline" class="text-text-orange" />
            <span class="text-caption font-weight-bold ml-2">Booking Cancellation Policy</span>
          </div>
          <p class="text-text-grey-4 mt-2 text-xxs">
            Cancellation policy depends on each venue's rules.
          </p>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
  <VContainer class="bg-bg-grey pb-0">
    <VRow no-gutters class="mt-2">
      <VCol cols="12">
        <h2 class="font-weight-black text-body-2">Detail Transaction</h2>
      </VCol>
      <VCol cols="12" class="mt-2">
        <VCard class="pa-4 border-thin rounded-lg" elevation="0">
          <VRow no-gutters class="mb-1">
            <VCol cols="6">
              <p class="text-caption">Field Price</p>
            </VCol>
            <VCol cols="6">
              <p class="text-caption text-right font-weight-bold">Rp 150.000</p>
            </VCol>
          </VRow>
          <VRow no-gutters class="mb-1">
            <VCol cols="6">
              <p class="text-caption">Service Price</p>
            </VCol>
            <VCol cols="6">
              <p class="text-caption text-right font-weight-bold">Rp 5.000</p>
            </VCol>
          </VRow>
          <VRow
            no-gutters
            class="mb-4 pb-4 border-b-thin border-e-0 border-s-0 border-t-0 border-dashed"
          >
            <VCol cols="6">
              <p class="text-caption">Insurance</p>
            </VCol>
            <VCol cols="6">
              <p class="text-caption text-right font-weight-bold">Rp 0</p>
            </VCol>
          </VRow>
          <VRow no-gutters>
            <VCol cols="6">
              <p class="text-caption font-weight-bold">Total Payment</p>
            </VCol>
            <VCol cols="6">
              <p class="text-body-2 text-right font-weight-black">Rp 150.000</p>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
      <VCol cols="12" class="mt-4">
        <VCheckbox color="#00549B" class="rounded-xl">
          <!-- v-model="isAgree" :disabled="!!errorMessage" -->
          <template v-slot:label>
            <p class="text-xxs">
              I fully agree to and accept all
              <RouterLink
                to="/term-conditions"
                class="text-decoration-none font-weight-bold text-text-blue"
              >
                <!-- @click.prevent="isOpenUa = true" -->
                terms and conditions
              </RouterLink>
              set forth by Gelora, including the insurance terms
            </p>
          </template>
        </VCheckbox>
      </VCol>
    </VRow>
  </VContainer>
</template>
