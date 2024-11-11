class TokenService {
  getLocalAccessToken() {
    return localStorage.getItem('accessToken')
  }
  getLocalRefreshToken() {
    return localStorage.getItem('refreshToken')
  }
  updateLocalAccessToken(token) {
    localStorage.setItem('accessToken', token)
  }
  updateLocalRefreshToken(token) {
    localStorage.setItem('refreshToken', token)
  }
  removeAccessToken() {
    localStorage.removeItem('accessToken')
  }
  removeRefreshToken() {
    localStorage.removeItem('refreshToken')
  }
  removeAllToken() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
  }
}
export default new TokenService()
