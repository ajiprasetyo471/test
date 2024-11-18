import { venueFieldHourData, venueFieldReviewData } from '@/db/db'
import venueService from '@/services/venue.service'

export const useVenueStore = defineStore('venueStore', {
  state: () => ({
    loading: false,
    loadingTime: false,
    loadingPay: false,
    filters: {
      latitude: null,
      longitude: null,
      sportId: [],
      cityId: [],
      maxPrice: null,
      minPrice: null,
      page: null,
      sort: null,
      keyword: null,
      date: null,
      startTime: null,
      endTime: null
    },
    dateTime: null,
    page: 1,
    hasMoreData: true,
    venueCards: [],
    venueCardsHome: [],
    venueId: null,
    venueDetail: null,
    venueGallery: [],
    fieldCards: [],
    fieldDetail: null,
    fieldId: null,
    fieldTimeMorning: [],
    fieldTimeAfternoon: [],
    fieldTimeEvening: [],
    fieldCommendations: [],
    fieldHourCards: [],
    fieldReviewCards: [],
    fieldCheckoutData: null,
    bookingDate: null,
    bookingHour: [],
    datesMember: [],
    isSort: false,
    queryData: null,
    agreePayment: false,
    triggerValidation: false
  }),
  actions: {
    async getVenueCards(filterData) {
      const queryParams = new URLSearchParams()

      if (filterData.sportId.length > 0) {
        filterData.sportId.forEach((id) => {
          queryParams.append('sportId', id)
        })
      }

      if (filterData.cityId.length > 0) {
        filterData.cityId.forEach((id) => {
          queryParams.append('cityId', id)
        })
      }

      for (const key in filterData) {
        if (
          key !== 'sportId' &&
          key !== 'cityId' &&
          filterData[key] !== null &&
          filterData[key] !== ''
        ) {
          queryParams.append(key, filterData[key])
        }
      }
      this.queryData = Object.fromEntries(queryParams.entries())
      // console.log(this.queryData)
      this.loading = true
      try {
        this.venueCards = []
        const response = await venueService.list(queryParams)
        const resData = response.data
        // console.log(resData)
        if (resData?.responseCode == '200') {
          this.venueCards = resData?.responseData?.venueList
        } else {
          this.venueCards = []
        }
        return resData
      } catch (error) {
        this.venueCards = []
        throw error
      } finally {
        this.loading = false
      }
    },
    setFilterData(key, value) {
      this.filters[key] = value
    },
    setFilter(key, value) {
      // if (key === 'keyword') {
      this.page = 1
      this.filters.page = 1
      this.hasMoreData = true
      // }
      if (key === 'sportId') {
        if (Array.isArray(value)) {
          // Update sportId hanya jika nilai value adalah array
          this.filters.sportId = value
        } else {
          // Jika value bukan array, reset sportId
          this.filters.sportId = []
        }
      } else if (key === 'cityId') {
        if (Array.isArray(value)) {
          this.filters.cityId = value
        } else {
          this.filters.cityId = []
        }
      } else {
        // Untuk key lainnya, update nilai seperti biasa
        this.filters[key] = value
      }
      this.applyFilters()
    },

    setLatLong(lat, long) {
      this.filters['latitude'] = lat
      this.filters['longitude'] = long
    },

    async applyFilters() {
      const filterData = { ...this.filters }

      await this.getVenueCards(filterData)
    },
    async getVenueCardsScroll(key, value) {
      this.filters[key] = value
      if (key == 'page') {
        const filterData = { ...this.filters }
        const queryParams = new URLSearchParams()

        if (filterData.sportId.length > 0) {
          filterData.sportId.forEach((id) => {
            queryParams.append('sportId', id)
          })
        }

        if (filterData.cityId.length > 0) {
          filterData.cityId.forEach((id) => {
            queryParams.append('cityId', id)
          })
        }

        for (const key in filterData) {
          if (
            key !== 'sportId' &&
            key !== 'cityId' &&
            filterData[key] !== null &&
            filterData[key] !== ''
          ) {
            queryParams.append(key, filterData[key])
          }
        }
        this.queryData = Object.fromEntries(queryParams.entries())
        // console.log(this.queryData)
        try {
          const response = await venueService.list(queryParams)
          const resData = response.data
          return resData
        } catch (error) {
          throw error
        }
      }
    },
    setQueryData(key, value) {
      if (typeof key === 'string' && key !== '') {
        // Periksa jika 'key' valid dan bukan string kosong
        this.queryData[key] = value
      }
    },
    resetQueryData() {
      this.queryData = null
    },
    getDetailVenue(id) {
      this.loading = true
      return venueService
        .detail(id)
        .then(
          (response) => {
            var resData = response.data
            if (resData.responseCode == '200') {
              this.venueDetail = resData?.responseData
            } else {
              this.venueDetail = null
            }
            return Promise.resolve(resData)
          },
          (error) => {
            this.venueDetail = null
            return Promise.reject(error)
          }
        )
        .finally(() => {
          this.loading = false
        })
    },
    getDetailGallery(id) {
      this.loading = true
      return venueService
        .gallery(id)
        .then(
          (response) => {
            var resData = response.data
            if (resData.responseCode == '200') {
              this.venueGallery = resData?.responseData?.venueGallery.map(
                (item) => item.venuePicture
              )
            } else {
              this.venueGallery = []
            }
            return Promise.resolve(resData)
          },
          (error) => {
            this.venueGallery = []
            return Promise.reject(error)
          }
        )
        .finally(() => {
          this.loading = false
        })
    },
    getDetailField(id, venueId) {
      // console.log(id, venueId)
      this.loading = true
      return venueService
        .fieldDetail(id, venueId)
        .then(
          (response) => {
            var resData = response.data
            if (resData.responseCode == '200') {
              this.fieldDetail = resData?.responseData?.fieldVM
              localStorage.setItem('fieldDetail', JSON.stringify(resData.responseData?.fieldVM))
            } else {
              this.fieldDetail = null
            }
            return Promise.resolve(resData)
          },
          (error) => {
            this.fieldDetail = null
            return Promise.reject(error)
          }
        )
        .finally(() => {
          this.loading = false
        })
    },
    getTimeField(id, venueId, data) {
      // console.log(id, venueId)
      this.loadingTime = true
      return venueService
        .fieldTime(id, venueId, data)
        .then(
          (response) => {
            var resData = response.data
            if (resData.responseCode == '200') {
              this.fieldTimeMorning = resData?.responseData?.morningSlots.map((i) => {
                return {
                  ...i,
                  selected: false
                }
              })
              this.fieldTimeAfternoon = resData?.responseData?.afternoonSlots.map((i) => {
                return {
                  ...i,
                  selected: false
                }
              })
              this.fieldTimeEvening = resData?.responseData?.eveningSlots.map((i) => {
                return {
                  ...i,
                  selected: false
                }
              })
            } else {
              this.fieldTimeMorning = []
              this.fieldTimeAfternoon = []
              this.fieldTimeEvening = []
            }
            return Promise.resolve(resData)
          },
          (error) => {
            this.fieldDetail = null
            return Promise.reject(error)
          }
        )
        .finally(() => {
          this.loadingTime = false
        })
    },

    setDateTime(id, venueId, value) {
      this.dateTime = value
      this.getTimeField(id, venueId, { date: value })
    },

    async getFieldCards(id) {
      this.loading = true
      try {
        this.fieldCards = []
        const response = await venueService.field(id)
        const resData = response.data
        if (resData.responseCode == '200') {
          // console.log(resData?.data?.fieldList)
          this.fieldCards = resData?.responseData?.fieldList
        } else {
          this.fieldCards = []
        }
        return resData
      } catch (error) {
        this.fieldCards = []
        throw error
      } finally {
        this.loading = false
      }
    },
    getFieldCommendations(id, venueId) {
      // console.log(id, venueId)
      this.loading = true
      return venueService
        .fieldCommendation(id, venueId)
        .then(
          (response) => {
            var resData = response.data
            if (resData.responseCode == '200') {
              const data = resData?.responseData
              this.fieldCommendations = [
                { id: 1, review: 'Fasilitas Memadai', count: data.adequateFacilityCount },
                { id: 2, review: 'Kebersihan Terjaga', count: data.maintainedHygieneCount },
                { id: 3, review: 'Keamanan Baik', count: data.goodSecurityCount },
                { id: 4, review: 'Toilet Bersih', count: data.cleanToiletCount },
                { id: 5, review: 'Akses Mudah', count: data.easyAccessCount },
                { id: 6, review: 'Staf Ramah', count: data.helpfulStaffCount }
              ]
            } else {
              this.fieldCommendations = null
            }
            return Promise.resolve(resData)
          },
          (error) => {
            this.fieldCommendations = null
            return Promise.reject(error)
          }
        )
        .finally(() => {
          this.loading = false
        })
    },
    fieldCheckout(data) {
      return venueService.checkout(data).then(
        (res) => {
          const data = res.data
          if (data.responseCode == '200') {
            this.fieldCheckoutData = data.responseData
            localStorage.setItem('fieldCheckoutData', JSON.stringify(data.responseData))
          }
          return Promise.resolve(data)
        },
        (err) => {
          return Promise.reject(err)
        }
      )
    },
    fieldReservation(data) {
      this.loadingPay = true
      return venueService
        .reservation(data)
        .then(
          (res) => {
            const data = res.data
            if (data.responseCode == '2000000') {
              return Promise.resolve(data)
            }
          },
          (err) => {
            return Promise.reject(err)
          }
        )
        .finally(() => {
          this.loadingPay = false
        })
    },
    setVenueCards(cards) {
      this.venueCards = cards
    },
    setPage(val) {
      this.page = val
    },
    setHasMoreData(val) {
      this.hasMoreData = val
    },
    openSort() {
      this.isSort = true
    },
    closeSort() {
      this.isSort = false
    },
    setVenueId(id) {
      this.venueId = id
      localStorage.setItem('venueId', id)
    },
    setFieldId(id) {
      this.fieldId = id
      localStorage.setItem('fieldId', id)
    },
    setVenueCardsHome(cards) {
      this.venueCardsHome = cards
    },

    getFieldHourCards() {
      this.fieldHourCards = venueFieldHourData
      return venueFieldHourData
    },
    getFieldReviewCards() {
      this.fieldReviewCards = venueFieldReviewData
      return venueFieldReviewData
    },
    setBookingDate(date) {
      this.bookingDate = date
    },
    addBookingHour(items) {
      this.bookingHour.push(items)
    },
    removeBookingHour(id) {
      this.bookingHour = this.bookingHour.filter((h) => h.id !== id)
    },
    emptyBookingHour() {
      this.bookingHour = []
    },
    setDatesMember(dates) {
      this.datesMember = dates
    },
    setAgreePayment() {
      this.agreePayment = !this.agreePayment
    },
    setTriggerValidation() {
      this.triggerValidation = true
    },
    resetTriggerValidation() {
      this.triggerValidation = false
    }
  }
})
