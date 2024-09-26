<script setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: true
  },
  title: {
    type: String,
    default: ''
  },
  shareUrl: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const isVisible = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})

const shareOptions = [
  {
    name: 'Facebook',
    icon: 'logos:facebook',
    link: `https://www.facebook.com/sharer/sharer.php?u=${props.shareUrl}`
  },
  {
    name: 'Messenger',
    icon: 'logos:messenger',
    link: `fb-messenger://share/?link=${props.shareUrl}`
  },
  {
    name: 'Instagram',
    icon: 'skill-icons:instagram',
    link: `https://www.instagram.com/` // Instagram doesn't have direct link sharing
  },
  {
    name: 'WhatsApp',
    icon: 'logos:whatsapp-icon',
    link: `https://wa.me/?text=${props.shareUrl}`
  },
  {
    name: 'X',
    icon: 'devicon:twitter', // Twitter now renamed to X
    link: `https://twitter.com/intent/tweet?url=${props.shareUrl}`
  },
  {
    name: 'Gmail',
    icon: 'logos:google-gmail',
    link: `mailto:?subject=Check this venue&body=${props.shareUrl}`
  },
  {
    name: 'SMS',
    icon: 'flat-color-icons:sms',
    link: `sms:?body=${props.shareUrl}`
  },
  {
    name: 'Lainnya',
    icon: 'mdi-dots-horizontal',
    link: '#' // Placeholder for more sharing options
  }
]
</script>

<template>
  <VDialog v-model="isVisible">
    <VCard class="pa-2 border-thin rounded-lg pb-8">
      <VCardTitle class="border-b-thin border-e-0 border-s-0 border-t-0 border-dashed pt-0 px-2">
        <span class="text-body-2 text-black font-weight-bold">Share {{ title }}</span>
      </VCardTitle>

      <VCardText class="pa-0">
        <VRow no-gutters>
          <VCol cols="12" class="px-2">
            <p class="text-xxs text-text-grey-6 mt-4">Tap an icon below to your content directly</p>
          </VCol>
          <VCol
            v-for="(option, index) in shareOptions"
            :key="index"
            cols="3"
            class="text-center mt-2"
          >
            <VBtn :href="option.link" variant="text" target="_blank" icon>
              <Icon :icon="option.icon" style="font-size: 25px" />
            </VBtn>
            <p class="text-xxs text-text-grey-5">{{ option.name }}</p>
          </VCol>
        </VRow>
      </VCardText>
    </VCard>
  </VDialog>
</template>
