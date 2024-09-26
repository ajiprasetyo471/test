<script setup>
const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  desc: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <VExpansionPanel rounded="lg" class="mt-2 border-thin" elevation="0">
    <VExpansionPanelTitle>
      <VRow no-gutters>
        <VCol cols="12" class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <Icon class="text-text-orange" style="font-size: 30px" :icon="props.icon" />
            <div class="ml-4">
              <p class="text-caption font-weight-black">{{ props.title }}</p>
              <p class="text-xxs text-text-grey">{{ props.desc }}</p>
            </div>
          </div>
          <p class="text-text-grey text-xxxs mr-2">
            <span>{{ props.count }}</span> Schedule available
          </p>
        </VCol>
      </VRow>
    </VExpansionPanelTitle>
    <VExpansionPanelText>
      <slot />
    </VExpansionPanelText>
  </VExpansionPanel>
</template>
