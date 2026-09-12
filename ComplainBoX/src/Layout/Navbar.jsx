import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, GraduationCap, LogOut, Home, FileText, HelpCircle, Mail, User, Users,House, Headphones  } from 'lucide-react'
import { useAuth } from '../context/auth'
import { ThemeToggle } from '../components/ThemeToggle'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    setIsOpen(false)
    navigate('/')
  }

  const publicnavlinks = [
    { label: 'Home', section: 'home', icon: House },
    { label: 'For Artists', section: 'artist-workflow', icon: Headphones },
    { label: 'For Listeners', section: 'listener-workflow', icon: Users },
    { label: 'FAQs', section: 'faqs', icon: HelpCircle },
  ]

  const desktopNavLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/complain', label: 'File a Complaint' },
    { to: '/contact', label: 'Contact' },
  ]

  const mobileMenuItems = [
    { to: '/', icon: Home, label: 'Home', end: true },
    { to: '/complain', icon: FileText, label: 'File Complaint', end: false },
    { to: '/about', icon: HelpCircle, label: 'About', end: false },
    { to: '/contact', icon: Mail, label: 'Contact', end: false },
  ]

  const navlink = user ? user.role === 'admin' ? 

  const desktopNavLinkClass = ({ isActive }) =>
    `px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive
      ? 'text-teal-400 bg-teal-500/10 border border-teal-500/20 shadow-sm'
      : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800/50'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all w-full ${isActive
      ? 'text-teal-400 bg-teal-500/10 border border-teal-500/20'
      : 'text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800/50'
    }`

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-[#080C14]/95 backdrop-blur-md border-b border-gray-200 dark:border-slate-800/60 font-sans select-none">
      {/* Desktop & Mobile Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group cursor-pointer shrink-0">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-teal-600/10 border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="hidden sm:block">
            <span className="text-lg font-bold text-gray-900 dark:text-slate-100 tracking-tight">
              Campus<span className="text-teal-400">Voice</span>
            </span>
            <p className="text-[10px] text-gray-500 dark:text-slate-500 -mt-1">Grievance Portal</p>
          </div>
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {desktopNavLinks.map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              className={desktopNavLinkClass}
              end={end}
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* day/night btn */}
        <ThemeToggle />
        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800/50 border border-gray-300 dark:border-slate-700/50">
                <User className="w-4 h-4 text-teal-400" />
                <span className="text-sm font-medium text-gray-900 dark:text-slate-200 capitalize">
                  {user?.username || 'User'}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg font-medium text-sm transition-all"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className="px-5 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold rounded-lg text-sm transition-all shadow-md shadow-teal-400/20"
            >
              Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2.5 rounded-lg text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-100 hover:bg-gray-100 dark:hover:bg-slate-800/60 border border-gray-300 dark:border-slate-800/50 transition-all"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-slate-800/60 bg-gray-50 dark:bg-[#0F172A]/98 backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 space-y-2">
            {/* Mobile Nav Links */}
            {mobileMenuItems.map(({ to, icon: Icon, label, end }) => (
              <NavLink
                key={to}
                to={to}
                className={mobileNavLinkClass}
                end={end}
                onClick={() => setIsOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span>{label}</span>
              </NavLink>
            ))}

            {/* Mobile Divider */}
            <div className="h-px bg-gray-300 dark:bg-slate-800/40 my-2" />

            {/* Mobile Auth Section */}
            {isAuthenticated ? (
              <>
                <div className="px-4 py-3 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-300 dark:border-slate-700/50">
                  <p className="text-xs text-gray-600 dark:text-slate-500 mb-1">Logged in as</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 capitalize">
                    {user?.username || 'User'}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">{user?.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-lg font-semibold text-sm transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="block w-full px-4 py-3 text-center bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold rounded-lg text-sm transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Login / Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar