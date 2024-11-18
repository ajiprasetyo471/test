class AppService {
  sports(query) {
    return $axios.get('/sports', { params: query })
  }
  cities() {
    return $axios.get('/cities')
  }
  fees() {
    return $axios.get('/fee')
  }
  location(lat, lon) {
    return $axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}&accept-language=id`
    )
  }
}

export default new AppService()
