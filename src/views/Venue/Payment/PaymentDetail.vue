<script setup>
import moment from 'moment'
import AppTextArea from '@/@core/components/forms/AppTextArea.vue'
import { useVenueStore } from '@/stores/venue.store.js'
import { useHomeStore } from '@/stores/home.store'
import { formatNumber, formatTimeWithoutSeconds, formatDateToIndo } from '@/helpers/helpers'

const stores = useVenueStore()
const homeStores = useHomeStore()

const venueId = ref(stores.venueId ?? localStorage.getItem('venueId'))
const merchantFee = ref(homeStores.merchantFee ?? localStorage.getItem('merchantFee'))
const bayarindFee = ref(homeStores.bayarindFee ?? localStorage.getItem('bayarindFee'))
const loading = ref(false)
const fieldData = ref(stores.fieldDetail ?? JSON.parse(localStorage.getItem('fieldDetail')))
const checkoutData = ref(
  stores.fieldCheckoutData ?? JSON.parse(localStorage.getItem('fieldCheckoutData'))
)
const refVForm = ref()
const form = ref({
  name: '',
  phoneNumber: '',
  email: '',
  communityGroup: '',
  note: ''
})

const deleteItem = (index) => {
  const deletedItem = checkoutData.value.fieldBookings.filter((i) => i.itemIndex != index)

  const bodyData = {
    FieldId: fieldData.value.id,
    SportId: fieldData.value.sportIds[0],
    FieldBookings: deletedItem.map((i) => {
      return {
        FieldId: fieldData.value.id,
        Date: moment(i.date).format('YYYY-MM-DD'),
        StartTime: i.startTime,
        EndTime: i.endTime
      }
    })
  }

  loading.value = true
  stores
    .fieldCheckout(bodyData)
    .then((r) => {
      // console.log(r)
      if (r.responseCode == '200') {
        checkoutData.value.fieldBookings = deletedItem
      }
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}

const calculatePrice = (price) => {
  return Number(price) + Number(bayarindFee.value) + Number(merchantFee.value)
}

const calculateTotalPayment = (price) => {
  const itemCount = checkoutData.value.fieldBookings.length
  const totalFee = (Number(bayarindFee.value) + Number(merchantFee.value)) * itemCount
  return Number(price) + totalFee
}

const onSubmit = () => {
  refVForm.value?.validate().then(({ valid: isValid }) => {
    if (isValid) {
      submit()
      // console.log('submit')
    } else {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  })
}

const submit = async () => {
  const bodyData = {
    FieldId: fieldData.value?.id,
    SportId: fieldData.value?.sportIds?.[0],
    Email: form.value.email,
    Phone: '+62' + parseInt(form.value.phoneNumber),
    Fullname: form.value.name,
    Description: form.value.note ?? null,
    CustomerProfile: form.value.communityGroup ?? null,
    FieldBookings: checkoutData.value?.fieldBookings?.map((item) => {
      return {
        FieldId: item.fieldId,
        Date: item.date,
        StartTime: item.startTime,
        EndTime: item.endTime
      }
    }),
    fieldName: fieldData.value?.name,
    fieldType: fieldData.value?.fieldType,
    venueId: venueId.value.toString(),
    expiryDuration: checkoutData.value?.expiryDuration
  }
  // console.log(bodyData)
  // return false
  stores
    .fieldReservation(bodyData)
    .then((r) => {
      if (r) {
        window.location.href = r.responseData?.paymentUrl
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

watch(
  () => stores.triggerValidation,
  (newVal) => {
    if (newVal) {
      onSubmit()
      stores.resetTriggerValidation() // Reset setelah validasi
    }
  }
)

// onMounted(() => {
//   console.log(checkoutData.value)
// })
</script>

<template>
  <VContainer v-if="!loading" class="pb-8">
    <VCard class="pa-4 border-thin rounded-lg" elevation="0">
      <VRow no-gutters>
        <VCol cols="12" class="d-flex align-center justify-start" style="gap: 10px">
          <div style="width: 40%">
            <div class="" style="height: 64px; border-radius: 20px !important">
              <VImg
                :src="fieldData?.coverPictureUrl"
                cover
                rounded="lg"
                style="height: 64px; object-fit: cover; object-position: center"
              />
            </div>
          </div>
          <div style="width: 73%">
            <VRow no-gutters class="px-2">
              <VCol cols="12">
                <h3 class="font-weight-black text-body-2">{{ fieldData?.venueName }}</h3>
              </VCol>
              <VCol cols="12" class="mt-1">
                <p class="text-xxs text-text-grey">{{ fieldData?.name }}</p>
              </VCol>
              <VCol cols="12" class="mt-1">
                <VChip size="small" class="text-text-orange text-caption font-weight-black">
                  Rp{{ formatNumber(calculatePrice(fieldData?.startingPrice)) }}
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
            <VCol cols="7">
              <CardCategoryItem
                :icon="'solar:bag-check-outline'"
                :category="'Order Type'"
                :title="'Venue'"
              />
            </VCol>
            <VCol cols="5">
              <CardCategoryItem
                :icon="'fluent-emoji-high-contrast:basketball'"
                :category="'Field Type'"
                :title="fieldData?.fieldType"
              />
              <!-- <CardCategoryItem
                class="mt-3"
                :icon="'solar:clock-circle-outline'"
                :category="'Booking Hour'"
                :title="`${formatTimeWithoutSeconds(checkoutData?.fieldBookings?.[0]?.startTime)} - ${formatTimeWithoutSeconds(checkoutData?.fieldBookings?.[0]?.endTime)}`"
              /> -->
            </VCol>
          </VRow>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard class="py-4 px-3 border-thin rounded-lg mt-2" elevation="0">
          <VRow no-gutters class="border-b-thin border-e-0 border-s-0 border-t-0 pb-3">
            <VCol cols="12">
              <CardCategoryItem
                :icon="'solar:calendar-outline'"
                :category="'Date and Time'"
                :title="formatDateToIndo(checkoutData?.fieldBookings?.[0]?.sportNamesId?.[0].date)"
              />
            </VCol>
          </VRow>
          <VRow no-gutters>
            <VCol v-for="item in checkoutData?.fieldBookings" class="mt-3 pl-2" cols="12">
              <FieldItemCheckout
                :index="item?.itemIndex"
                :title="`${formatTimeWithoutSeconds(item?.startTime)} - ${formatTimeWithoutSeconds(item?.endTime)}`"
                :price="`Rp ${formatNumber(calculatePrice(item?.price))}`"
                @delete="deleteItem(item?.itemIndex)"
              />
            </VCol>
          </VRow>
        </VCard>
      </VCol>
    </VRow>
    <VForm ref="refVForm" @submit.prevent="onSubmit">
      <VRow no-gutters class="mt-4">
        <VCol cols="12">
          <h2 class="font-weight-black text-body-2">Booking info</h2>
          <p class="text-xxs text-text-grey-4 mt-1">
            Please ensure that all information provided is accurate and matches your official
            identification. This information is used to verify your identity and prevent
            unauthorized bookings.
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
            v-model="form.phoneNumber"
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
    </VForm>
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
  <VContainer v-if="!loading" class="bg-bg-grey pb-0">
    <VRow no-gutters class="mt-2">
      <VCol cols="12">
        <h2 class="font-weight-black text-body-2">Detail Transaction</h2>
      </VCol>
      <VCol cols="12" class="mt-2">
        <VCard class="pa-4 border-thin rounded-lg" elevation="0">
          <!-- <VRow no-gutters class="mb-1">
            <VCol cols="6">
              <p class="text-caption">Field Price</p>
            </VCol>
            <VCol cols="6">
              <p class="text-caption text-right font-weight-bold">
                Rp {{ formatNumber(checkoutData?.originalPrice) }}
              </p>
            </VCol>
          </VRow>
          <VRow no-gutters class="mb-1">
            <VCol cols="6">
              <p class="text-caption">Service Price</p>
            </VCol>
            <VCol cols="6">
              <p class="text-caption text-right font-weight-bold">
                Rp {{ formatNumber(checkoutData?.serviceFee) }}
              </p>
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
          </VRow> -->
          <VRow no-gutters>
            <VCol cols="6">
              <p class="text-caption font-weight-bold">Total Payment</p>
            </VCol>
            <VCol cols="6">
              <p class="text-body-2 text-right font-weight-black">
                Rp {{ formatNumber(calculateTotalPayment(checkoutData?.totalPayment)) }}
              </p>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
      <VCol cols="12" class="mt-4">
        <VCheckbox
          :model-value="stores.agreePayment"
          @change="stores.setAgreePayment()"
          color="#00549B"
          class="rounded-xl"
        >
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

  <PageSpinLoader v-model:is-loading="loading" />
</template>
