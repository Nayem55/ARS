import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:1022/api' })
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('ars_admin_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // A server restart or a changed signing key invalidates existing browser sessions.
    // Remove that session so it cannot interfere with the next sign-in attempt.
    if (error.response?.status === 401) localStorage.removeItem('ars_admin_token')
    return Promise.reject(error)
  }
)
export default api
