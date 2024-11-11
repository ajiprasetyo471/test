class VenueService {
  list(query) {
    return $axios.get('/venues', { params: query })
  }
  detail(id) {
    return $axios.get(`/venues/${id}`)
  }
  gallery(id) {
    return $axios.get(`/venues/${id}/gallery`)
  }
  field(id) {
    return $axios.get(`/venues/${id}/fields`)
  }
  fieldDetail(id, venueId) {
    return $axios.get(`/venues/${venueId}/fields/${id}`)
  }
  fieldTime(id, venueId, query) {
    return $axios.get(`/venues/${venueId}/fields/${id}/timetable`, { params: query })
  }
  fieldCommendation(id, venueId) {
    return $axios.get(`/venues/${venueId}/fields/${id}/commendations`)
  }
  checkout(query) {
    return $axios.post('/xpayments/fieldbookingcheckout', query)
  }
  reservation(query) {
    return $axios.post('/xpayments/fieldbookingreservation', query)
  }
}

export default new VenueService()
