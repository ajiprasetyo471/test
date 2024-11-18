import { bannerImage } from '@/db/db'
import appService from '@/services/app.service'

export const useHomeStore = defineStore('homeStore', {
  state: () => ({
    loading: false,
    sportItems: [],
    cityItems: [],
    bannerImageData: [],
    bayarindFee: null,
    merchantFee: null
  }),
  actions: {
    getSportItems(data) {
      this.loading = true
      return appService
        .sports(data)
        .then((response) => {
          var resData = response.data
          if (resData?.responseCode == '200') {
            this.sportItems = resData?.responseData?.sportList.map((item) => {
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
          if (resData?.responseCode == '200') {
            this.cityItems = resData?.responseData?.cityList
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
    getFees(data) {
      this.loading = true
      return appService
        .fees(data)
        .then((response) => {
          var resData = response.data
          if (resData?.responseCode == '200') {
            this.bayarindFee = resData?.responseData?.bayarindFee
            this.merchantFee = resData?.responseData?.merchantFee
            localStorage.setItem(
              'bayarindFee',
              Math.round(parseFloat(resData?.responseData?.bayarindFee))
            )
            localStorage.setItem(
              'merchantFee',
              Math.round(parseFloat(resData?.responseData?.merchantFee))
            )
          } else {
            this.bayarindFee = null
            this.merchantFee = null
            localStorage.removeItem('bayarindFee')
            localStorage.removeItem('merchantFee')
          }
          return Promise.resolve(resData)
        })
        .catch((error) => {
          console.log(error)
          this.bayarindFee = null
          this.merchantFee = null
          localStorage.removeItem('bayarindFee')
          localStorage.removeItem('merchantFee')
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
