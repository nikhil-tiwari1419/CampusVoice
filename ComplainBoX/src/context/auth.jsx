import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api'

// Axios instance — sends cookies with every request
const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
})

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true) // true while checking session on load

  // Check if user is already logged in (cookie-based session)
  const checkAuth = useCallback(async () => {
    try {
      const res = await api.get('/auth/is-auth')
      setUser(res.data.user)
    } catch (err) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  // Axios response interceptor — auto-refresh access token on 401, then retry once
  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config

        if (
          error.response?.status === 401 &&
          !originalRequest._retry &&
          !originalRequest.url.includes('/auth/login') &&
          !originalRequest.url.includes('/auth/refresh-token')
        ) {
          originalRequest._retry = true
          try {
            await api.post('/auth/refresh-token')
            return api(originalRequest) // retry the original request
          } catch (refreshErr) {
            setUser(null)
            return Promise.reject(refreshErr)
          }
        }

        return Promise.reject(error)
      }
    )

    return () => api.interceptors.response.eject(interceptor)
  }, [])

  const register = async ({ username, email, password }) => {
    const res = await api.post('/auth/register', { username, email, password })
    return res.data // { success, message } — user still needs to verify email via OTP
  }

  const verifyEmail = async ({ email, otp }) => {
    const res = await api.post('/auth/verify-email', { email, otp })
    return res.data
  }

  const login = async ({ email, username, password }) => {
    const res = await api.post('/auth/login', { email, username, password })
    setUser(res.data.user)
    return res.data
  }

  const logout = async () => {
    try {
      await api.post('/auth/logout')
    } finally {
      setUser(null)
    }
  }

  const forgotPassword = async (email) => {
    const res = await api.post('/auth/forgot-pass', { email })
    return res.data
  }

  const resetPassword = async ({ email, otp, newPassword }) => {
    const res = await api.post('/auth/reset-pass', { email, otp, newPassword })
    return res.data
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    register,
    verifyEmail,
    login,
    logout,
    forgotPassword,
    resetPassword,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default api