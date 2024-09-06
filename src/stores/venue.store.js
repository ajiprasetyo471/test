import { venueCardData } from '@/db/db'

export const useVenueStore = defineStore('venueStore', {
  state: () => ({
    venueCards: []
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
    getVenueCards() {
      this.venueCards = venueCardData
      return venueCardData
    }
  }
})
