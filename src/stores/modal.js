// Utilities
import { defineStore } from 'pinia'

export const useModalStore = defineStore('modal', () => {
  const isModalOpen = ref(false)

  function openModal() {
    isModalOpen.value = true
    console.log('open modal')
  }

  function closeModal() {
    isModalOpen.value = false
  }

  return { isModalOpen, openModal, closeModal }
})
