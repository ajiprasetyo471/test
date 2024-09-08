<script setup>
import BookingDetailItem from './BookingDetailItem.vue'
</script>

<template>
  <div class="cardCont cardTop px-4 py-10 mt-6">
    <VRow no-gutters>
      <VCol cols="12">
        <h2 class="text-h6 font-weight-black text-center">Booking Success</h2>
      </VCol>
      <VCol cols="12" class="mt-1">
        <p class="text-caption text-text-grey text-center px-8">
          Your booking for British Footbal has been successfully done
        </p>
      </VCol>
    </VRow>
    <VRow no-gutters class="mt-10">
      <VCol cols="12">
        <BookingDetailItem />
      </VCol>
    </VRow>
  </div>
  <div class="cardCont cardBottom px-4 py-10">
    <VRow no-gutters>
      <VCol cols="12" class="mb-2">
        <h6 class="text-body-2 font-weight-bold">Detail Pembayaran</h6>
      </VCol>
      <VCol cols="12">
        <VCard class="pa-4 border-thin rounded-lg" elevation="0">
          <VRow no-gutters class="mb-1">
            <VCol cols="6">
              <p class="text-caption">Harga Lapangan</p>
            </VCol>
            <VCol cols="6">
              <p class="text-caption text-right font-weight-bold">Rp 145.000</p>
            </VCol>
          </VRow>
          <VRow no-gutters class="mb-1">
            <VCol cols="6">
              <p class="text-caption">Biaya Layanan</p>
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
              <p class="text-caption">Asuransi</p>
            </VCol>
            <VCol cols="6">
              <p class="text-caption text-right font-weight-bold">Rp 0</p>
            </VCol>
          </VRow>
          <VRow no-gutters>
            <VCol cols="6">
              <p class="text-caption font-weight-bold">Total Pembayaran</p>
            </VCol>
            <VCol cols="6">
              <p class="text-body-2 text-right font-weight-black">Rp 150.000</p>
            </VCol>
          </VRow>
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
