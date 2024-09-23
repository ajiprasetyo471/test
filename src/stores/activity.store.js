// import { activityCardData } from '@/db/db'
import activityService from '@/services/activity.service'

export const useActivityStore = defineStore('activityStore', {
  state: () => ({
    activityCards: [],
    activityDetail: null,
    activityGallery: []
  }),
  actions: {
    async getActivityCards(data) {
      try {
        this.activityCards = []
        const response = await activityService.list(data)
        const resData = response.data
        if (resData.success) {
          this.activityCards = resData?.data?.activitySessions
        } else {
          this.activityCards = []
        }
        return resData
      } catch (error) {
        this.activityCards = []
        throw error
      }
    },
    getDetailActivity(id) {
      return activityService.detail(id).then(
        (response) => {
          var resData = response.data
          if (resData.success) {
            this.activityDetail = resData?.data
          } else {
            this.activityDetail = null
          }
          return Promise.resolve(resData)
        },
        (error) => {
          this.activityDetail = null
          return Promise.reject(error)
        }
      )
    },
    getDetailGallery(id) {
      return activityService.gallery(id).then(
        (response) => {
          var resData = response.data
          if (resData.success) {
            this.activityGallery = resData?.data?.activityGallery
          } else {
            this.activityGallery = []
          }
          return Promise.resolve(resData)
        },
        (error) => {
          this.activityGallery = []
          return Promise.reject(error)
        }
      )
    }
  }
})
