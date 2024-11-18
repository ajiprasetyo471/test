import bookingService from '@/services/booking.service'

export const useBookingStore = defineStore('bookingStore', {
  state: () => ({
    loading: false,
    bookingListCard: [],
    bookingId: null,
    bookingDetail: null
  }),
  actions: {
    async getBookingCards(filterData) {
      this.loading = true
      try {
        this.bookingListCard = []
        const response = await bookingService.list(filterData)
        const resData = response.data
        // console.log(resData)
        if (resData?.responseCode == '200') {
          this.bookingListCard = resData?.responseData
        } else {
          this.bookingListCard = []
        }
        return resData
      } catch (error) {
        this.bookingListCard = []
        throw error
      } finally {
        this.loading = false
      }
    },
    setBookingCards(cards) {
      this.bookingListCard = cards
    },
    getDetailBooking(id) {
      this.loading = true
      return bookingService
        .detail(id)
        .then(
          (response) => {
            var resData = response.data
            if (resData.responseCode == '200') {
              this.bookingDetail = resData?.responseData
            } else {
              this.bookingDetail = null
            }
            return Promise.resolve(resData)
          },
          (error) => {
            this.bookingDetail = null
            return Promise.reject(error)
          }
        )
        .finally(() => {
          this.loading = false
        })
    }
  }
})
