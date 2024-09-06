import { activityCardData } from '@/db/db'

export const useActivityStore = defineStore('activityStore', {
  state: () => ({
    activityCards: [],
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
    getActivityCards() {
      this.activityCards = activityCardData
      this.filteredCards = activityCardData
      return activityCardData
    },
    filterActivityCards(query) {
      if (!query || query == '' || query == undefined || query == null) {
        this.filteredCards = this.activityCards
      } else {
        this.filteredCards = this.activityCards.filter((item) =>
          item.title.toLowerCase().includes(query.toLowerCase())
        )
      }
    }
  }
})
