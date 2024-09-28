<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  maxWidth: {
    type: [String, Number],
    default: '450px'
  },
  title: {
    type: String,
    default: 'Create Password Success'
  }
})

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const emits = defineEmits(['close-dialog', 'submit-dialog'])

const close = () => {
  emits('close-dialog')
}

const submit = () => {
  emits('submit-dialog')
}
</script>

<template>
  <VDialog v-model="isVisible" :max-width="maxWidth" :persistent="true">
    <VCard class="pa-2">
      <VCardText>
        <span class="text-body-2">Are you sure want to delete selection?</span>
      </VCardText>

      <VCardActions>
        <VRow no-gutters>
          <VCol cols="12" class="d-flex align-center justify-space-between">
            <VBtn variant="outlined" class="rounded-lg text-none mr-1 w-50" @click="close">
              Tidak
            </VBtn>
            <VBtn variant="outlined" class="bg-bg-blue-2 rounded-lg text-none w-50" @click="submit">
              Ya
            </VBtn>
          </VCol>
        </VRow>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
