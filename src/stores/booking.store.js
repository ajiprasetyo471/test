import { bookingListData } from '@/db/db'

export const useBookingStore = defineStore('bookingStore', {
  state: () => ({
    bookingListCard: [],
    bookingHistoryCard: []
  }),
  actions: {
    // async fetchActivityItems() {
    //   try {
    //     const response = await axios.get('https://api.example.com/activities') // Ganti dengan endpoint API yang sesuai
    //     this.activityItems = response.data  // Mengisi state dengan data dari API
    //   } catch (error) {
    //     console.error('Gagal mengambil data aktivitas:', error)
    //   }
    // }
    getBookingListCard() {
      this.bookingListCard = bookingListData
      return bookingListData
    },
    getBookingHistoryCard() {
      this.bookingHistoryCard = bookingListData
      return bookingListData
    }
  }
})
