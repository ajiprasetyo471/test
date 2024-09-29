<script setup>
import ReportDetail from './ReportDetail.vue'
import success from '@/assets/images/payment-success.svg'
import pending from '@/assets/images/payment-pending.svg'
import failed from '@/assets/images/payment-failed.svg'

const status = ref('pending')

const title = (status) => {
  return status == 'paid' ? 'Success' : status == 'pending' ? 'Pending' : 'Failed'
}

const desc = (status) => {
  return status == 'paid'
    ? 'Your booking for British Footbal has been successfully'
    : status == 'pending'
      ? "We're waiting for your payment to confirm your London Football booking"
      : 'Payment failed. Your booking has not been confirmed.'
}
</script>

<template>
  <VRow no-gutters class="d-flex flex-column justify-center align-center mt-10">
    <VCol cols="12">
      <h2
        class="text-h6 font-weight-black text-center"
        :class="{
          'text-black': status == 'paid',
          'text-text-orange': status == 'pending',
          'text-text-red-2': status == 'failed'
        }"
      >
        Payment {{ title(status) }}
      </h2>
    </VCol>
    <VCol cols="7" class="my-4">
      <VImg
        :src="
          status == 'paid'
            ? success
            : status == 'pending'
              ? pending
              : status == 'failed'
                ? failed
                : undefined
        "
        cover
      />
    </VCol>
    <VCol cols="11" class="mt-1">
      <p class="text-caption text-text-grey text-center px-14">
        {{ desc(status) }}
      </p>
    </VCol>
  </VRow>
  <div class="cardCont cardTop px-4 pb-6 mt-4">
    <VRow no-gutters class="mt-3">
      <VCol cols="12">
        <ReportDetail :status="status" />
      </VCol>
    </VRow>
  </div>
  <div class="cardCont cardBottom px-4 pt-6 pb-10 mb-10">
    <VRow no-gutters>
      <VCol cols="12" class="mb-2">
        <h6 class="text-body-2 font-weight-bold">Payment Detail</h6>
      </VCol>
      <VCol cols="12">
        <VCard
          class="pa-4 rounded-lg"
          elevation="0"
          :class="{ 'border-thin': status != 'pending' }"
          :style="{
            border: status === 'pending' ? '1px solid #ffe5b2' : undefined
          }"
        >
          <VRow no-gutters class="mb-1">
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
      <VCol cols="12">
        <VCard
          class="pa-4 mt-4"
          :class="{
            'bg-bg-blue-light-2 border-paid': status == 'paid',
            'bg-bg-yellow border-pending': status == 'pending',
            'bg-text-red-2': status == 'failed'
          }"
          :style="{
            border:
              status === 'paid'
                ? '1px solid #B2DDFF;'
                : status === 'pending'
                  ? '1px solid #ffe5b2'
                  : ''
          }"
          elevation="0"
          rounded="lg"
        >
          <div class="d-flex align-center justify-space-between">
            <span class="text-caption">Payment Status</span>
            <span class="text-caption font-weight-bold">{{
              status ? status.toUpperCase() : ''
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
