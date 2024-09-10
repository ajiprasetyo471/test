<script setup>
const props = defineProps({
  logo: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  activity: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  fieldType: {
    type: String,
    required: true
  },
  floorType: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="cardTop pa-4">
    <VRow no-gutters>
      <VCol cols="12" class="d-flex align-center">
        <div class="" style="height: 48px; width: 48px; border-radius: 20px !important">
          <VImg
            :src="props.logo"
            cover
            rounded="lg"
            style="height: 48px; object-fit: cover; object-position: center"
          />
        </div>
        <div class="ml-4">
          <h2 class="text-body-2 font-weight-black">{{ props.title }}</h2>
          <div class="d-flex align-center mt-2">
            <div class="d-flex align-center">
              <Icon class="text-text-grey" icon="fluent-emoji-high-contrast:basketball" />
              <span class="text-xxs text-text-grey-2 ml-2">{{ props.activity }}</span>
            </div>
            <div class="d-flex align-center ml-4">
              <Icon class="text-text-grey" icon="iconoir:basketball-field" />
              <span class="text-xxs text-text-grey-2 ml-2">{{ props.field }}</span>
            </div>
          </div>
        </div>
      </VCol>
    </VRow>
  </div>
  <div class="cardBottom pt-0">
    <div
      class="bg-bg-grey d-flex align-center justify-space-between px-4 py-1 ma-1"
      style="border-bottom-left-radius: 15px; border-bottom-right-radius: 15px"
    >
      <div class="w-50 d-flex flex-column align-center justify-center border-e-sm py-2">
        <span class="text-text-grey text-xxxs">Tipe Lapangan </span>
        <span class="text-text-orange text-xxs">{{ props.fieldType }} </span>
      </div>
      <div class="w-50 d-flex flex-column align-center justify-center py-2">
        <span class="text-text-grey text-xxxs">Tipe Lantai </span>
        <span class="text-text-orange text-xxs">{{ props.floorType }} </span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.cardTop {
  background: white;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border: 2px solid #eaebeb;
  position: relative;
  border-bottom: none;
}

.cardBottom {
  background: white;
  border: 2px solid #eaebeb;
  border-top: 2px dashed #eaebeb;
  border-bottom-left-radius: 20px;
  position: relative;
  border-bottom-right-radius: 20px;
  margin-top: -0.18em;
  position: relative;

  &:before,
  &:after {
    content: '';
    position: absolute;
    display: block;
    width: 1.4em; /* Ukuran cekungan lebih besar */
    height: 1.4em; /* Ukuran cekungan lebih besar */
    background: white;
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
}
</style>
