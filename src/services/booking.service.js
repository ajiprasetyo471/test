class BookingService {
  list(query) {
    return $axios.get('/bookings', { params: query })
  }
  detail(id) {
    return $axios.get(`/bookings/${id}`)
  }
}

export default new BookingService()
