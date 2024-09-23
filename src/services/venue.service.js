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
}

export default new VenueService()
