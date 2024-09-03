<script setup>
import coutryJson from "@json/country.json";
import { nextTick } from "vue";

defineOptions({
  name: "AppPhoneNumber",
  inheritAttrs: false,
});

const props = defineProps({
  labelRequired: {
    type: Boolean,
    required: false,
  },
  dialNumber: {
    type: String,
    required: false,
  },
  disabled: {
    type: Boolean,
    required: false,
  },
});

const emit = defineEmits(["update:dialNumber"]);

const selectedCountry = ref({
  name: "Indonesia",
  code: "ID",
  emoji: "🇮🇩",
  unicode: "U+1F1EE U+1F1E9",
  image: "ID.svg",
  dial_code: "+62",
});

const elementId = computed(() => {
  const attrs = useAttrs();
  const _elementIdToken = attrs.id || attrs.label;

  return _elementIdToken
    ? `app-text-field-${_elementIdToken}-${Math.random().toString(36).slice(2, 7)}`
    : undefined;
});

const label = computed(() => useAttrs().label);
const disabled = computed(() => props.disabled);

// const currentDialNumber = ref(props.dialNumber || "");

nextTick(() => {
  changeDialCode();
});

const changeDialCode = () => {
  // currentDialNumber.value = selectedCountry.value.dial_code;
  // emit("update:dialNumber", currentDialNumber.value);
};

watchEffect(() => {
  // if (props.dialNumber !== undefined && props.dialNumber >= 0)
  //   currentDialNumber.value = props.dialNumber;
});

const filterNumber = (evt) => {
  evt = evt ? evt : window.event;
  let expect = evt.target.value.toString() + evt.key.toString();

  if (!/^[-+]?[0-9]*\.?[0-9]*$/.test(expect)) {
    evt.preventDefault();
  } else {
    return true;
  }
};
</script>

<template>
  <div class="app-text-field flex-grow-1" :class="$attrs.class">
    <VLabel
      v-if="label"
      :for="elementId"
      class="mb-1 text-body-2 text-high-emphasis font-weight-bold text-muted"
      :class="{ 'text-primary-dark': !$attrs.disabled }"
    >
      {{ label }}
      <span class="text-error ms-1" v-if="props.labelRequired">*</span>
    </VLabel>
    <div class="d-flex border-thin rounded-lg" :class="{ 'bg-grey-lighten-4': disabled }">
      <div class="border-e" style="width: 18%">
        <VSelect
          v-bind="{
            class: 'elevation-0 pa-2 pt-0',
            label: undefined,
            variant: 'plain',
            items: coutryJson,
            id: 'sel' + elementId,
          }"
          v-model="selectedCountry"
          :readonly="disabled"
          item-title="name"
          return-object
          flat
        >
          <template v-slot:selection="data">
            <div class="ps-1 pt-0" style="margin-top: 1px">
              <VImg
                :width="18"
                :src="`${COUNTRY_FLAG_URL}${data.item.raw.image.toLowerCase()}`"
                rounded="pill"
              />
            </div>
          </template>
        </VSelect>
      </div>
      <div style="width: 82%">
        <VTextField
          v-bind="{
            ...$attrs,
            class: 'elevation-0',
            label: undefined,
            variant: 'plain',
            id: elementId,
          }"
          @keypress="filterNumber(event)"
          :readonly="disabled"
          class="pa-2 pt-0"
          flat
        >
          <template #prepend-inner>
            <span style="padding-top: 2px">{{ `(${selectedCountry.dial_code})` }}</span>
          </template>
          <template v-for="(_, name) in $slots" #[name]="slotProps">
            <slot :name="name" v-bind="slotProps || {}" />
          </template>
        </VTextField>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-field__input {
  padding-top: 0px !important;
}
</style>
