import axios from 'axios'

class AuthService {
  validate(query) {
    return axios.post('https://eternal-hot-doe.ngrok-free.app/api/v1.0/webview', query)
  }
  refresh(query) {
    return axios.post('https://eternal-hot-doe.ngrok-free.app/api/v1.0/refresh/token', query)
  }
}

export default new AuthService()
