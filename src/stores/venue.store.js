import { venueCardData, venueFieldData, venueFieldHourData, venueFieldReviewData } from '@/db/db'
import venueService from '@/services/venue.service'

export const useVenueStore = defineStore('venueStore', {
  state: () => ({
    loading: false,
    venueCards: [],
    venueCardsHome: [],
    venueId: null,
    venueDetail: null,
    venueGallery: [],
    fieldCards: [],
    fieldDetail: null,
    fieldHourCards: [],
    fieldReviewCards: [],
    bookingDate: null,
    bookingHour: null,
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
          console.log(resData?.data?.fieldList)
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
      console.log(id, venueId)
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
    setVenueCards(cards) {
      this.venueCards = cards
    },
    setVenueId(id) {
      this.venueId = id
      localStorage.setItem('venueId', JSON.stringify(id))
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
    setBookingHour(hour) {
      this.bookingHour = hour
    },
    setDatesMember(dates) {
      this.datesMember = dates
    }
  }
})
