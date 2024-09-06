import { activityItemsData } from '@/db/db'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    activityItems: []
  }),
  actions: {
    // async fetchActivityItems() {
    //   try {
    //     const response = await axios.get('https://api.example.com/activities') // Ganti dengan endpoint API yang sesuai
    //     this.activityItems = response.data  // Mengisi state dengan data dari API
    //   } catch (error) {
    //     console.error('Gagal mengambil data aktivitas:', error)
    //   }
    // }
    getActivityItems() {
      this.activityItems = activityItemsData
    }
  }
})
