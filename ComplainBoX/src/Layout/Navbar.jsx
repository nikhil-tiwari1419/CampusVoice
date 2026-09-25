import { useState, useEffect } from 'react'
import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, ZoomIn } from 'lucide-react'
import { PUBLIC_LINKS, USER_LINKS, ADMIN_LINKS } from '../Ui/Navlink.jsx'
import { useAuth } from '../context/auth.jsx'

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [clickedLink, setClickedLink] = useState(null)
  const [logoZoomOpen, setLogoZoomOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // Close logo zoom modal on Escape key
  useEffect(() => {
    if (!logoZoomOpen) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setLogoZoomOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [logoZoomOpen])

  // Format username (e.g. "tanmay_yawalkar" -> "Tanmay Yawalkar")
  const formatDisplayName = (rawName) => {
    if (!rawName) return ''
    return String(rawName).replace(/_/g, ' ')
  }

  // Determine which links to show based on user role
  const getNavLinks = () => {
    if (!user) return PUBLIC_LINKS
    if (user.role === 'admin' || user.role === 'super_admin') return ADMIN_LINKS
    if (user.role === 'student' || user.role === 'user') return USER_LINKS
    return PUBLIC_LINKS
  }

  const navLinks = getNavLinks()

  const handleLogout = () => {
    setClickedLink(null)
    logout()
    navigate('/')
    setMobileMenuOpen(false)
  }

  // Handle scroll to section for public links
  const handleSectionClick = (section, label) => {
    setClickedLink(label)
    if (location.pathname !== '/' && location.pathname !== '/landingPage') {
      navigate('/')
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) element.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      const element = document.getElementById(section)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setMobileMenuOpen(false)
  }

  const NavLinkItem = ({ item, onClick }) => {
    const isSelected = clickedLink === item.label

    if (item.section) {
      return (
        <button
          type="button"
          onClick={() => {
            handleSectionClick(item.section, item.label)
            onClick?.()
          }}
          className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm lg:text-base font-semibold border transition-all duration-200 cursor-pointer ${
            isSelected
              ? 'bg-teal-50 text-teal-700 border-teal-200 shadow-xs'
              : 'border-transparent text-slate-700 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200'
          }`}
        >
          {item.icon && <item.icon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />}
          <span>{item.label}</span>
        </button>
      )
    }

    return (
      <NavLink
        to={item.path}
        onClick={() => {
          setClickedLink(item.label)
          onClick?.()
        }}
        className={`flex items-center gap-2.5 px-4 py-2 rounded-xl text-sm lg:text-base font-semibold border transition-all duration-200 ${
          isSelected
            ? 'bg-teal-50 text-teal-700 border-teal-200 shadow-xs'
            : 'border-transparent text-slate-700 hover:bg-teal-50 hover:text-teal-700 hover:border-teal-200'
        }`}
      >
        {item.icon && <item.icon className="w-4 h-4 lg:w-5 lg:h-5 shrink-0" />}
        <span>{item.label}</span>
      </NavLink>
    )
  }

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
        <div className="w-full px-4 sm:px-8 lg:px-12">
          <div className="flex justify-between items-center h-18 sm:h-20">
            {/* Logo Section */}
            <div className="flex items-center gap-3 shrink-0">
              {/* Clickable Logo Emblem -> Zooms in */}
              <button
                type="button"
                onClick={() => setLogoZoomOpen(true)}
                title="Click to zoom logo"
                className="group relative w-12 h-12 sm:w-15 sm:h-15 flex items-center justify-center shrink-0 rounded-full focus:outline-none cursor-zoom-in transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <img
                  src="/logo.png"
                  alt="Campus Voice"
                  className="w-full h-full object-contain rounded-full drop-shadow-xs"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-white border border-slate-200 shadow-xs flex items-center justify-center text-teal-600 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3 h-3" />
                </span>
              </button>

              {/* Brand Text -> Navigates Home */}
              <NavLink
                to="/"
                onClick={() => setClickedLink(null)}
                className="flex flex-col text-slate-900 hover:opacity-90 transition-opacity"
              >
                <span className="text-xl sm:text-2xl lg:text-[26px] font-extrabold tracking-tight text-slate-900 leading-none">
                  Campus<span className="text-teal-600">Voice</span>
                </span>
                <span className="hidden sm:inline text-[11px] font-medium text-slate-500 tracking-wide mt-0.5">
                  Student Grievance Portal
                </span>
              </NavLink>
            </div>

            {/* Desktop Navigation — pill container */}
            <div className="hidden md:flex items-center gap-1.5 bg-slate-50/90 border border-slate-200/80 p-1.5 rounded-2xl">
              {navLinks.map((item, index) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <NavLinkItem item={item} />
                  {index < navLinks.length - 1 && (
                    <div className="h-6 w-px bg-slate-300/90" />
                  )}
                </div>
              ))}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 bg-slate-50/90 border border-slate-200/80 pl-2.5 pr-2 py-1.5 rounded-2xl shadow-2xs">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white font-bold text-sm flex items-center justify-center uppercase shadow-xs shrink-0">
                    {(user.username || user.name || user.role || 'U').charAt(0)}
                  </div>
                  <div className="pr-1">
                    <p className="text-sm font-bold text-slate-900 capitalize leading-tight">
                      {formatDisplayName(user.username || user.name || user.role)}
                    </p>
                    <p className="text-[11px] text-teal-600 font-semibold capitalize flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 inline-block" />
                      {formatDisplayName(user.role)}
                    </p>
                  </div>
                  <div className="h-7 w-px bg-slate-300/90" />
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200/70 hover:bg-rose-100 hover:border-rose-300 transition-all cursor-pointer"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-6 py-2.5 rounded-xl text-sm lg:text-base font-bold transition-all duration-200 shadow-sm ${
                      isActive
                        ? 'bg-teal-700 text-white'
                        : 'bg-teal-600 text-white hover:bg-teal-700 shadow-teal-600/20'
                    }`
                  }
                >
                  Login
                </NavLink>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl hover:bg-slate-100 transition-colors text-slate-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-3 border-t border-slate-100 space-y-1.5 animate-in fade-in slide-in-from-top-2">
              {navLinks.map((item) => (
                <div key={item.label}>
                  <NavLinkItem
                    item={item}
                    onClick={() => setMobileMenuOpen(false)}
                  />
                </div>
              ))}

              {/* Mobile Auth Section */}
              <div className="pt-3 mt-2 border-t border-slate-200 space-y-2">
                {user ? (
                  <div className="px-3.5 py-2.5 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-900 capitalize">
                        {formatDisplayName(user.username || user.name || user.role)}
                      </p>
                      <p className="text-[11px] text-teal-600 capitalize">
                        {formatDisplayName(user.role)}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 border border-rose-200 hover:bg-rose-100 transition-colors font-semibold text-xs"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <NavLink
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 transition-all text-sm font-semibold"
                  >
                    Login
                  </NavLink>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Fullscreen Logo Zoom Lightbox Modal */}
      {logoZoomOpen && (
        <div
          onClick={() => setLogoZoomOpen(false)}
          className="fixed inset-0 z-100 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 cursor-zoom-out"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full flex flex-col items-center text-center animate-in zoom-in-95 duration-200 cursor-default"
          >
            <button
              type="button"
              onClick={() => setLogoZoomOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              title="Close preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-60 h-60 sm:w-72 sm:h-72 flex items-center justify-center p-2">
              <img
                src="/logo.png"
                alt="CampusVoice Official Emblem"
                className="w-full h-full object-contain drop-shadow-md transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="mt-3 space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Campus<span className="text-teal-600">Voice</span>
              </h3>
              <p className="text-xs font-medium text-slate-500">
                Official Student Grievance & Resolution Portal
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar