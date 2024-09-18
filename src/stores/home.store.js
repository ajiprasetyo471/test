import { venueRecommendationCardData, activityCardData, bannerImage } from '@/db/db'
import appService from '@/services/app.service'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    activityItems: [],
    cityItems: [],
    venueRecommendationCard: [],
    activityRecommendationCards: [],
    bannerImageData: []
  }),
  actions: {
    getActivityItems(data) {
      return appService
        .sports(data)
        .then((response) => {
          var resData = response.data
          if (resData.success && resData?.data) {
            this.activityItems = resData?.data?.sportList.map((item) => {
              return {
                ...item,
                title: item.nameId
              }
            })
          } else {
            this.activityItems = []
          }
          return Promise.resolve(resData)
        })
        .catch((error) => {
          console.log(error)
          this.activityItems = []
          return Promise.reject(error)
        })
    },
    getCityItems(data) {
      return appService
        .cities(data)
        .then((response) => {
          var resData = response.data
          if (resData.success && resData?.data) {
            this.cityItems = resData?.data?.cityList
          } else {
            this.cityItems = []
          }
          return Promise.resolve(resData)
        })
        .catch((error) => {
          console.log(error)
          this.cityItems = []
          return Promise.reject(error)
        })
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
