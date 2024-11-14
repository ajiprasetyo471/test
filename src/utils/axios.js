import axios from 'axios'
import tokenService from '@/services/token.service'
import { useAuthStore } from '@/stores/auth.store'

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL,
  headers: {
    // 'Access-Control-Allow-Origin': 'http://127.0.0.1:6616',
    // 'Access-Control-Allow-Credentials': 'true',
    // 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',

    'ngrok-skip-browser-warning': 'true'
    // lang: 'id',
    // 'Api-Key': import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY
  }
})

$axios.interceptors.request.use(
  (config) => {
    const token = tokenService.getLocalAccessToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
      // config.headers['Authorization'] = `Bearer dasdasdsa`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Interceptor response untuk menangani error dan refresh token
let isRefreshing = false // flag untuk mencegah banyak refresh token
let failedQueue = [] // antrian request yang gagal untuk diulang setelah token refresh

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token)
    } else {
      prom.reject(error)
    }
  })
  failedQueue = []
}

$axios.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config

    // Cek jika error adalah 401 dan bukan permintaan refresh token
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true // tandai permintaan ini agar tidak mengulang lagi

      if (!isRefreshing) {
        isRefreshing = true
        const store = useAuthStore()
        const tokenRefresh = localStorage.getItem('refreshToken')

        try {
          const refreshResponse = await store.refreshAccessToken({ token: tokenRefresh })

          if (refreshResponse.responseCode === '2000000') {
            const newToken = refreshResponse.responseData.accessToken

            // Simpan token baru dan update header Authorization
            tokenService.updateLocalAccessToken(newToken)
            originalRequest.headers['Authorization'] = `Bearer ${newToken}`

            processQueue(null, newToken) // Proses antrian yang menunggu refresh token
            isRefreshing = false

            // Ulang request yang menyebabkan 401 dengan token baru
            return $axios(originalRequest)
          } else {
            processQueue(error, null) // Jika gagal refresh, proses antrian dengan error
            isRefreshing = false
            // tokenService.removeAllToken() // Hapus token yang tersimpan
            return Promise.reject(error) // Arahkan user untuk login kembali
          }
        } catch (refreshError) {
          processQueue(refreshError, null)
          isRefreshing = false
          // tokenService.removeAllToken()
          return Promise.reject(refreshError)
        }
      } else {
        // Jika refresh token sedang berlangsung, tambahkan request ke dalam antrian
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            return $axios(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }
    }

    return Promise.reject(error)
  }
)
