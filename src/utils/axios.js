import axios from 'axios'

export const $axios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || process.env.VITE_API_BASE_URL,
  headers: {
    'Access-Control-Allow-Origin': 'http://127.0.0.1:6616',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Content-Type': 'application/json',
    'Api-Key': import.meta.env.VITE_API_KEY || process.env.VITE_API_KEY
  }
  // {
  //   headers: {
  //     'Access-Control-Allow-Origin': 'http://localhost:8080',
  //     'Access-Control-Allow-Credentials': 'true',
  //     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //   },
  // }
})
