import React from 'react'
import { NavLink } from 'react-router-dom'
import { Home, PlusCircle, History, User, GraduationCap } from 'lucide-react'
import { useAuth } from '../context/auth'

/**
 * MobileLayout
 * Mobile-first application layout with a top campus brand header and a sleek
 * native app-style bottom navigation bar for quick one-thumb accessibility.
 */
export default function MobileLayout({ children }) {
  const { isAuthenticated, isAdmin } = useAuth()

  const navItemClass = ({ isActive }) =>
    `flex flex-col items-center justify-center py-2 px-3 text-[10px] font-medium transition-colors ${
      isActive ? 'text-teal-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
    }`

  return (
    <div className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 font-sans pb-20 select-none">
      {/* Mobile Top Header */}
      <header className="sticky top-0 z-40 bg-[#080C14]/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400">
            <GraduationCap className="w-4 h-4" />
          </div>
          <span className="text-base font-bold text-slate-100">
            Campus<span className="text-teal-400">Voice</span>
          </span>
        </NavLink>

        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold">
          {isAuthenticated ? (isAdmin ? 'Admin' : 'Student') : 'Guest'}
        </span>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 py-6">
        {children}
      </main>

      {/* Mobile Bottom Navigation Bar (App-style) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0F172A]/95 backdrop-blur-2xl border-t border-slate-800/80 px-2 flex items-center justify-around">
        <NavLink to={isAuthenticated ? (isAdmin ? '/adminhome' : '/userhome') : '/'} className={navItemClass}>
          <Home className="w-5 h-5 mb-0.5" />
          <span>Home</span>
        </NavLink>

        <NavLink to="/complain" className={navItemClass}>
          <PlusCircle className="w-5 h-5 mb-0.5 text-teal-400" />
          <span>File</span>
        </NavLink>

        <NavLink to="/complaints" className={navItemClass}>
          <History className="w-5 h-5 mb-0.5" />
          <span>History</span>
        </NavLink>

        <NavLink to={isAuthenticated ? '/profile' : '/login'} className={navItemClass}>
          <User className="w-5 h-5 mb-0.5" />
          <span>{isAuthenticated ? 'Profile' : 'Login'}</span>
        </NavLink>
      </nav>
    </div>
  )
}
