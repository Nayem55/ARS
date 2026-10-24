import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api'

const AuthContext = createContext(null)
export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!localStorage.getItem('ars_admin_token')) return setLoading(false)
    api.get('/auth/me').then(({ data }) => setAdmin(data.admin)).catch(() => localStorage.removeItem('ars_admin_token')).finally(() => setLoading(false))
  }, [])
  const login = async (username, password) => {
    // Do not send an expired session along with a fresh login request.
    localStorage.removeItem('ars_admin_token')
    const { data } = await api.post('/auth/login', { username, password })
    localStorage.setItem('ars_admin_token', data.token)
    setAdmin(data.admin)
  }
  const logout = () => { localStorage.removeItem('ars_admin_token'); setAdmin(null) }
  const changeCredentials = async (payload) => {
    const { data } = await api.put('/auth/credentials', payload)
    localStorage.setItem('ars_admin_token', data.token)
    setAdmin(data.admin)
  }
  return <AuthContext.Provider value={{ admin, loading, login, logout, changeCredentials }}>{children}</AuthContext.Provider>
}
export const useAuth = () => useContext(AuthContext)
