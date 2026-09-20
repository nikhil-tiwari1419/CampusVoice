import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext({
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
})

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('cv_theme')
      if (savedTheme !== null) {
        return savedTheme === 'dark'
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    } catch {
      return true
    }
  })

  useEffect(() => {
    try {
      const root = document.documentElement
      if (isDark) {
        root.classList.add('dark')
        localStorage.setItem('cv_theme', 'dark')
      } else {
        root.classList.remove('dark')
        localStorage.setItem('cv_theme', 'light')
      }
    } catch {
      // Ignore localStorage errors
    }
  }, [isDark])

  const toggleTheme = () => setIsDark((prev) => !prev)
  const setTheme = (dark) => setIsDark(!!dark)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export default ThemeContext
