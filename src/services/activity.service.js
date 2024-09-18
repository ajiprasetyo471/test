class ActivityService {
  list(query) {
    return $axios.get('/activities', { params: query })
  }
  detail(id) {
    return $axios.get(`/activities/${id}`)
  }
  gallery(id) {
    return $axios.get(`/activities/${id}/activitygallery`)
  }
}

export default new ActivityService()
