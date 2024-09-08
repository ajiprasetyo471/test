import {
  activityItemsData,
  venueRecommendationCardData,
  activityCardData,
  bannerImage
} from '@/db/db'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    activityItems: [],
    venueRecommendationCard: [],
    activityRecommendationCards: [],
    bannerImageData: []
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
    },
    getVenueRecommendationCard() {
      this.venueRecommendationCard = venueRecommendationCardData
      return venueRecommendationCardData
    },
    getActivityRecommendationCards() {
      this.activityRecommendationCards = activityCardData.slice(0, 2)
      return activityCardData.slice(0, 2)
    },
    getBannerImageData() {
      this.bannerImageData = bannerImage
      return bannerImage
    }
  }
})
