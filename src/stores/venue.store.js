import { venueCardData, venueFieldData, venueFieldHourData, venueFieldReviewData } from '@/db/db'
import venueService from '@/services/venue.service'

export const useVenueStore = defineStore('venueStore', {
  state: () => ({
    venueCards: [],
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
      try {
        this.venueCards = []
        const response = await venueService.list(data)
        const resData = response.data
        if (resData.status) {
          this.venueCards = resData?.data?.venueList
        } else {
          this.venueCards = []
        }
        return resData
      } catch (error) {
        this.venueCards = []
        throw error
      }
    },
    getDetailVenue(id) {
      return venueService.detail(id).then(
        (response) => {
          var resData = response.data
          if (resData.status) {
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
    },
    getDetailGallery(id) {
      return venueService.gallery(id).then(
        (response) => {
          var resData = response.data
          if (resData.status) {
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
