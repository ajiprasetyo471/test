import { venueFieldHourData, venueFieldReviewData } from '@/db/db'
import venueService from '@/services/venue.service'

export const useVenueStore = defineStore('venueStore', {
  state: () => ({
    loading: false,
    loadingTime: false,
    filters: {
      latitude: null,
      longitude: null,
      sportId: null,
      cityId: null,
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
    fieldHourCards: [],
    fieldReviewCards: [],
    bookingDate: null,
    bookingHour: [],
    datesMember: []
  }),
  actions: {
    async getVenueCards(data) {
      this.loading = true
      try {
        this.venueCards = []
        const response = await venueService.list(data)
        const resData = response.data
        // console.log(resData)
        if (resData.success) {
          this.venueCards = resData?.data?.venueList
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
      this.filters[key] = value
      this.applyFilters()
    },

    async applyFilters() {
      const filterData = { ...this.filters }
      await this.getVenueCards(filterData)
    },
    async getVenueCardsScroll(key, value) {
      this.filters[key] = value
      if (key == 'page') {
        const filterData = { ...this.filters }
        try {
          const response = await venueService.list(filterData)
          const resData = response.data
          return resData
        } catch (error) {
          throw error
        }
      }
    },
    async getVenueCardsHome(data) {
      this.loading = true
      try {
        this.venueCardsHome = null
        const response = await venueService.list(data)
        const resData = response.data
        // console.log(resData)
        if (resData.success) {
          this.venueCardsHome = resData?.data?.venueList
        } else {
          this.venueCardsHome = null
        }
        return resData
      } catch (error) {
        this.venueCardsHome = null
        throw error
      } finally {
        this.loading = false
      }
    },
    getDetailVenue(id) {
      this.loading = true
      return venueService
        .detail(id)
        .then(
          (response) => {
            var resData = response.data
            if (resData.success) {
              this.venueDetail = resData?.data
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
            if (resData.success) {
              this.venueGallery = resData?.data?.venueGallery.map((item) => item.venuePicture)
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
    async getFieldCards(id) {
      this.loading = true
      try {
        this.fieldCards = []
        const response = await venueService.field(id)
        const resData = response.data
        if (resData.success) {
          // console.log(resData?.data?.fieldList)
          this.fieldCards = resData?.data?.fieldList
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
    getDetailField(id, venueId) {
      // console.log(id, venueId)
      this.loading = true
      return venueService
        .fieldDetail(id, venueId)
        .then(
          (response) => {
            var resData = response.data
            if (resData.success) {
              this.fieldDetail = resData?.data?.fieldVM
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
            if (resData.success) {
              this.fieldTimeMorning = resData?.data?.morningSlots.map((i) => {
                return {
                  ...i,
                  selected: false
                }
              })
              this.fieldTimeAfternoon = resData?.data?.afternoonSlots.map((i) => {
                return {
                  ...i,
                  selected: false
                }
              })
              this.fieldTimeEvening = resData?.data?.eveningSlots.map((i) => {
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
    setVenueCards(cards) {
      this.venueCards = cards
    },
    setPage(val) {
      this.page = val
    },
    setHasMoreData(val) {
      this.hasMoreData = val
    },
    setVenueId(id) {
      this.venueId = id
      localStorage.setItem('venueId', JSON.stringify(id))
    },
    setFieldId(id) {
      this.fieldId = id
      localStorage.setItem('fieldId', JSON.stringify(id))
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
    }
  }
})
