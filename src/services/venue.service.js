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
}

export default new VenueService()
