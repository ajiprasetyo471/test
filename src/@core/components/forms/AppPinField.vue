<script setup>
defineOptions({
  name: "AppPinField",
  inheritAttrs: false,
});

const props = defineProps({
  modelValue: {
    required: true,
  },
});

const inputRefs = ref();

const emit = defineEmits(["update:modelValue"]);

onMounted(() => {
  inputRefs.value[0].focus();
});

const pinLenght = ref(["", "", "", "", "", ""]);
const isSubmitted = ref(false);

const handleInput = (event, index) => {
  if (event.target.value.length === 1 && index < 5) {
    inputRefs.value[index + 1].focus();
  }
  isSubmitted.value = false;
};

const handleBackspace = (event, index) => {
  if (event.target.value === "" && index > 0) {
    inputRefs.value[index - 1].focus();
  }
};

watchEffect(() => {
  let value = pinLenght.value.join("");
  emit("update:modelValue", value);
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
    <div class="d-flex justify-space-evenly w-75 mx-auto">
      <div
        v-for="(digit, index) in pinLenght"
        :key="index"
        class="pin-item d-flex align-center justify-center border"
        :class="{
          'bg-pinGreyEmpty': digit === '',
          'bg-red': digit === '' && isSubmitted,
          'bg-pinGreyFilled': digit !== '',
        }"
      >
        <input
          ref="inputRefs"
          class="input-pin w-100 h-100 text-transparent bg-transparent"
          type="number"
          maxlength="1"
          @input="handleInput($event, index)"
          @keypress="filterNumber(event)"
          @keydown.backspace="handleBackspace($event, index)"
          v-model="pinLenght[index]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-pin::-ms-clear {
  display: none;
}
.input-pin::-webkit-outer-spin-button,
.input-pin::-webkit-inner-spin-button {
  display: none;
}
.input-pin[type="number"] {
  -moz-appearance: textfield;
}

.pin-item {
  width: 23px;
  height: 23px;
  border-radius: 100%;
}
</style>
