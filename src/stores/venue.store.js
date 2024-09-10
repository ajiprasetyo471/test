import { venueCardData, venueFieldData, venueFieldHourData } from '@/db/db'

export const useVenueStore = defineStore('venueStore', {
  state: () => ({
    venueCards: [],
    filteredCards: [],
    fieldCards: [],
    fieldHourCards: [],
    bookingDate: null,
    bookingHour: null
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
    filterVenueCards(query) {
      if (!query || query == '' || query == undefined || query == null) {
        this.filteredCards = this.venueCards
      } else {
        this.filteredCards = this.venueCards.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      }
    },
    getFieldCards() {
      this.fieldCards = venueFieldData
      return venueFieldData
    },
    getFieldHourCards() {
      this.fieldHourCards = venueFieldHourData
      return venueFieldHourData
    },
    setBookingDate(date) {
      this.bookingDate = date
    },
    setBookingHour(hour) {
      this.bookingHour = hour
    }
  }
})
