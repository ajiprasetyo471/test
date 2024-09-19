import { venueCardData, venueFieldData, venueFieldHourData, venueFieldReviewData } from '@/db/db'
import venueService from '@/services/venue.service'

export const useVenueStore = defineStore('venueStore', {
  state: () => ({
    loading: false,
    venueCards: [],
    venueCardsHome: [],
    venueDetail: null,
    venueGallery: [],
    fieldCards: [],
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
        console.log(resData)
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
        console.log(resData)
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
              this.venueGallery = resData?.data?.venueGallery
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
    setVenueCards(cards) {
      this.venueCards = cards
    },
    setVenueCardsHome(cards) {
      this.venueCardsHome = cards
    },

    getFieldCards() {
      this.fieldCards = venueFieldData
      return venueFieldData
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
