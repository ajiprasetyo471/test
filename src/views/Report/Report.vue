<script setup>
import { formatNumber, formatToCapitalized, removeTrailingZeros } from '@/helpers/helpers'
import PageSpinLoader from '@/@core/components/PageSpinLoader.vue'
import ReportDetail from './ReportDetail.vue'
import success from '@/assets/images/payment-success.svg'
import pending from '@/assets/images/payment-pending.svg'
import failed from '@/assets/images/payment-failed.svg'
import { useBookingStore } from '@/stores/booking.store'
import { useSnackbarStore } from '@/stores/snackbar'

const stores = useBookingStore()
const snackStores = useSnackbarStore()

const route = useRoute()

const desc = (status, name) => {
  return status == 'PAID'
    ? `Your booking for ${name} has been successfully`
    : status == 'PENDING'
      ? `We're waiting for your payment to confirm your ${name} booking`
      : 'Payment failed. Your booking has not been confirmed.'
}

const getBookingDetailData = (id) => {
  stores
    .getDetailBooking(id)
    .then((res) => {
      // console.log(res)
    })
    .catch((err) => {
      console.log(err)
      snackStores.openSnackbar(err?.message, 'error')
    })
}

onMounted(() => {
  // getBookingDetailData(route.params.id)
  // getBookingDetailData('FB-0141-505OZEZ3BI9S')
  getBookingDetailData('FB-0141-CQBNWCWP8RDU')
})
</script>

<template>
  <VRow
    v-if="!stores.loading"
    no-gutters
    class="d-flex flex-column justify-center align-center mt-10"
  >
    <VCol cols="12">
      <h2
        class="text-h6 font-weight-black text-center"
        :class="{
          'text-black': stores.bookingDetail?.paymentStatus == 'PAID',
          'text-text-orange': stores.bookingDetail?.paymentStatus == 'PENDING',
          'text-text-red-2': stores.bookingDetail?.paymentStatus == 'FAILED'
        }"
      >
        Payment {{ formatToCapitalized(stores.bookingDetail?.paymentStatus) }}
      </h2>
    </VCol>
    <VCol cols="7" class="my-4">
      <VImg
        :src="
          stores.bookingDetail?.paymentStatus == 'PAID'
            ? success
            : stores.bookingDetail?.paymentStatus == 'PENDING'
              ? pending
              : stores.bookingDetail?.paymentStatus == 'FAILED'
                ? failed
                : failed
        "
        cover
      />
    </VCol>
    <VCol cols="11" class="mt-1">
      <p class="text-caption text-text-grey text-center px-14">
        {{ desc(stores.bookingDetail?.paymentStatus) }}
      </p>
    </VCol>
  </VRow>
  <div v-if="!stores.loading" class="cardCont cardTop px-4 pb-6 mt-4">
    <VRow no-gutters class="mt-3">
      <VCol cols="12">
        <ReportDetail :detail="stores.bookingDetail" />
      </VCol>
    </VRow>
  </div>
  <div v-if="!stores.loading" class="cardCont cardBottom px-4 pt-6 pb-10 mb-10">
    <VRow no-gutters>
      <VCol cols="12" class="mb-2">
        <h6 class="text-body-2 font-weight-bold">Payment Detail</h6>
      </VCol>
      <VCol cols="12">
        <VCard
          class="pa-4 rounded-lg"
          elevation="0"
          :class="{ 'border-thin': stores.bookingDetail?.paymentStatus != 'PENDING' }"
          :style="{
            border:
              stores.bookingDetail?.paymentStatus === 'PENDING' ? '1px solid #ffe5b2' : undefined
          }"
        >
          <!-- <VRow no-gutters class="mb-1">
            <VCol cols="6">
              <p class="text-caption">Field Price</p>
            </VCol>
            <VCol cols="6">
              <p class="text-caption text-right font-weight-bold">Rp 145.000</p>
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
            class="mb-4 pb-4"
            :class="{
              'border-b-thin border-e-0 border-s-0 border-t-0 border-dashed': status != 'pending'
            }"
            :style="{
              borderBottom: status === 'pending' ? '1px dashed #ffe5b2' : undefined
            }"
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
                Rp {{ formatNumber(removeTrailingZeros(stores.bookingDetail?.paymentAmount)) }}
              </p>
            </VCol>
          </VRow>
        </VCard>
      </VCol>
      <VCol cols="12">
        <VCard
          class="pa-4 mt-4"
          :class="{
            'bg-bg-blue-light-2 border-paid': stores.bookingDetail?.paymentStatus == 'PAID',
            'bg-bg-yellow border-pending': stores.bookingDetail?.paymentStatus == 'PENDING',
            'bg-text-red-2': stores.bookingDetail?.paymentStatus == 'FAILED'
          }"
          :style="{
            border:
              stores.bookingDetail?.paymentStatus === 'PAID'
                ? '1px solid #B2DDFF;'
                : stores.bookingDetail?.paymentStatus === 'PENDING'
                  ? '1px solid #ffe5b2'
                  : ''
          }"
          elevation="0"
          rounded="lg"
        >
          <div class="d-flex align-center justify-space-between">
            <span class="text-caption">Payment Status</span>
            <span class="text-caption font-weight-bold">{{
              stores.bookingDetail?.paymentStatus
            }}</span>
          </div>
        </VCard>
      </VCol>
    </VRow>
    <span class="bottom-dots">
      <span class="section dots">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </span>
    </span>
  </div>
  <PageSpinLoader v-model:is-loading="stores.loading" />
</template>

<style scoped lang="scss">
.cardCont {
  max-width: 350px;
  margin: 0 auto;
  background: white;
  display: flex;
  flex-direction: column;
}

.cardTop {
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 2px solid #eaebeb;
  border-bottom: none;
}

.cardBottom {
  border: 2px solid #eaebeb;
  border-top: 2px dashed #eaebeb;
  margin-top: -0.18em;
  padding-top: 1em;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 1.5em; /* Ukuran cekungan lebih besar */
    height: 1.5em; /* Ukuran cekungan lebih besar */
    background: #f9fafb;
    border-radius: 50%;
    top: -0.75em;
  }

  &:before {
    left: -0.75em;
    border-right: 2px solid #b5b5b5;
  }

  &:after {
    right: -0.75em;
    border-left: 2px solid #b5b5b5;
  }

  .bottom-dots {
    position: absolute;
    width: 100%;
    display: block;
    top: 0;
    transform: translateY(-50%);
    z-index: 10;
  }
  .bottom-dots {
    top: 100%;
  }

  .dots span {
    position: absolute;
    width: 20px;
    height: 20px;
    display: block;
    border-radius: 50%;
    top: 0;
    transform: translateY(-50%);
    background-color: #f9fafb;
    border-top: 2px solid #b5b5b5;
  }
  .dots span:nth-child(1) {
    left: 10px;
  }
  .dots span:nth-child(2) {
    left: 45px;
  }
  .dots span:nth-child(3) {
    left: 80px;
  }
  .dots span:nth-child(4) {
    left: 115px;
  }
  .dots span:nth-child(5) {
    left: 150px;
  }
  .dots span:nth-child(6) {
    left: 185px;
  }
  .dots span:nth-child(7) {
    left: 215px;
  }
  .dots span:nth-child(8) {
    left: 250px;
  }
  .dots span:nth-child(9) {
    left: 285px;
  }
}
</style>
