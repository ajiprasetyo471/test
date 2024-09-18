class AppService {
  sports(query) {
    return $axios.get('/sports', { params: query })
  }
  cities() {
    return $axios.get('/cities')
  }
}

export default new AppService()
