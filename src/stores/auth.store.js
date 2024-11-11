import authService from '@/services/auth.service'
import tokenService from '@/services/token.service'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    loading: false,
    accessToken: false,
    refreshToken: false
  }),
  actions: {
    validateOTT(data) {
      this.loading = true
      return authService
        .validate(data)
        .then(
          (res) => {
            const data = res.data
            if (data.responseCode == '2000000') {
              this.accessToken = data?.responseData?.accessToken
              this.refreshToken = data?.responseData?.refreshToken
              tokenService.updateLocalAccessToken(data?.responseData?.accessToken)
              tokenService.updateLocalRefreshToken(data?.responseData?.refreshToken)

              console.log('access token hasil validate', data?.responseData?.accessToken)
              console.log('refresh token hasil validate', data?.responseData?.refreshToken)
            }
            return Promise.resolve(data)
          },
          (err) => {
            return Promise.reject(err)
          }
        )
        .finally(() => {
          this.loading = false
        })
    },
    refreshAccessToken(data) {
      this.loading = true
      return authService
        .refresh(data)
        .then(
          (res) => {
            const data = res.data
            if (data.responseCode == '2000000') {
              this.accessToken = data?.responseData?.accessToken
              tokenService.updateLocalAccessToken(data?.responseData?.accessToken)

              console.log('access token hasil refresh', data?.responseData?.accessToken)
            }
            return Promise.resolve(data)
          },
          (err) => {
            return Promise.reject(err)
          }
        )
        .finally(() => {
          this.loading = false
        })
    }
  }
})
