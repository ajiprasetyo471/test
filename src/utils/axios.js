import axios from 'axios'
import tokenService from '@/services/token.service'

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL,
  headers: {
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:6616',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json'
    // lang: 'id',
    // 'Api-Key': import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY
  }
})

// Interceptor untuk request, menambahkan Authorization Bearer token
$axios.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor untuk response, menangani error 401
$axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    if (error.response && error.response.status === 401) {
      try {
        const tokenRefresh = localStorage.getItem('tokenRefresh')

        store
          .validateOTT({
            token: tokenRefresh
          })
          .then((r) => {
            if (r.responseCode == '2000000') {
              const token = r?.responseData?.accessToken
              originalRequest.headers['Authorization'] = `Bearer ${token}`
            }
          })
          .catch((err) => {
            console.log(err)
          })

        // Lakukan ulang request asli yang gagal karena 401
        return $axios(originalRequest)
      } catch (refreshError) {
        tokenService.removeAllToken()
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
