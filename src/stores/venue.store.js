import { venueCardData, venueFieldData } from '@/db/db'

export const useVenueStore = defineStore('venueStore', {
  state: () => ({
    venueCards: [],
    fieldCards: [],
    filteredCards: []
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
      this.filteredCards = venueCardData
      return venueCardData
    },
    getFieldCards() {
      this.fieldCards = venueFieldData
      return venueFieldData
    },
    filterVenueCards(query) {
      if (!query || query == '' || query == undefined || query == null) {
        this.filteredCards = this.venueCards
      } else {
        this.filteredCards = this.venueCards.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      }
    }
  }
})
