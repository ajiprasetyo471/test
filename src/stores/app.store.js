import appService from '@/services/app.service'

export const useAppStore = defineStore('appStore', {
  state: () => ({
    loading: false,
    latitude: null,
    longitude: null,
    address: null
  }),
  actions: {
    getLocationList(lat, lon) {
      this.latitude = lat
      this.longitude = lon
      this.loading = true
      return appService
        .location(lat, lon)
        .then((response) => {
          var resData = response.data
          if (resData && resData.address) {
            this.address = resData.address
          } else {
            this.address = null
          }
          return Promise.resolve(resData)
        })
        .catch((error) => {
          console.log(error)
          this.address = null
          return Promise.reject(error)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
})
