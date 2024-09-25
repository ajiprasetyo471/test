import { bannerImage } from '@/db/db'
import appService from '@/services/app.service'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    loading: false,
    sportItems: [],
    cityItems: [],
    bannerImageData: []
  }),
  actions: {
    getSportItems(data) {
      this.loading = true
      return appService
        .sports(data)
        .then((response) => {
          var resData = response.data
          if (resData.success && resData?.data) {
            this.sportItems = resData?.data?.sportList.map((item) => {
              return {
                ...item,
                title: item.nameId
              }
            })
          } else {
            this.sportItems = []
          }
          return Promise.resolve(resData)
        })
        .catch((error) => {
          console.log(error)
          this.sportItems = []
          return Promise.reject(error)
        })
        .finally(() => {
          this.loading = false
        })
    },
    getCityItems(data) {
      this.loading = true
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
        .finally(() => {
          this.loading = false
        })
    },
    getBannerImageData() {
      this.bannerImageData = bannerImage
      return bannerImage
    }
  }
})
