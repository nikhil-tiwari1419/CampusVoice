import React, { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  GraduationCap,
  LogOut,
  User,
  ShieldCheck,
  FileText,
  LayoutDashboard,
  History,
  MessageSquareHeart,
  LogIn,
  HelpCircle,
  PhoneCall,
  Info
} from 'lucide-react'
import { useAuth } from '../context/auth'
import toast from 'react-hot-toast'

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()

  // Close user dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setUserMenuOpen(false)
      setIsOpen(false)
      toast.success('Signed out successfully')
      navigate('/login')
    } catch (err) {
      toast.error('Failed to log out')
    }
  }

  const navLinkClass = ({ isActive }) =>
    `inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${isActive
      ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/25'
      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive
      ? 'text-teal-400 bg-teal-500/10 border border-teal-500/20'
      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
    }`

  return (
    <nav className="bg-[#080C14]/95 backdrop-blur-2xl border-b border-slate-800/90 sticky top-0 z-50 select-none font-sans shadow-md shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">

        {/* Brand Logo */}
        <NavLink
          to={isAuthenticated ? (isAdmin ? '/adminhome' : '/userhome') : '/'}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform shadow-sm shadow-teal-500/5">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-slate-100 tracking-tight">
            Campus<span className="text-teal-400">Voice</span>
          </span>
        </NavLink>

        {/* Desktop Navigation Links (Segmented Pill Bar) */}
        <div className="hidden md:flex items-center">
          {!isAuthenticated ? (
            // Public Navigation Links
            <ul className="flex items-center gap-1 bg-[#0D1526]/90 border border-slate-800/80 rounded-full p-1 shadow-inner shadow-black/50 backdrop-blur-md">
              <li>
                <NavLink to="/" className={navLinkClass} end>
                  <span>Home</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={navLinkClass}>
                  <span>About</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={navLinkClass}>
                  <span>FAQ</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navLinkClass}>
                  <span>Contact Us</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/complain" className={navLinkClass}>
                  <span>File a Complaint</span>
                </NavLink>
              </li>
            </ul>
          ) : isAdmin ? (
            // Admin Navigation Links
            <ul className="flex items-center gap-1 bg-[#0D1526]/90 border border-slate-800/80 rounded-full p-1 shadow-inner shadow-black/50 backdrop-blur-md">
              <li>
                <NavLink to="/adminhome" className={navLinkClass} end>
                  <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                  <span>Admin Console</span>
                </NavLink>
              </li>
            </ul>
          ) : (
            // Authenticated Student Navigation Links
            <ul className="flex items-center gap-1 bg-[#0D1526]/90 border border-slate-800/80 rounded-full p-1 shadow-inner shadow-black/50 backdrop-blur-md">
              <li>
                <NavLink to="/userhome" className={navLinkClass} end>
                  <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                  <span>Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/complain" className={navLinkClass}>
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span>File Complaint</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/complaints" className={navLinkClass}>
                  <History className="w-3.5 h-3.5 shrink-0" />
                  <span>History</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/feedback" className={navLinkClass}>
                  <MessageSquareHeart className="w-3.5 h-3.5 shrink-0" />
                  <span>Feedback</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/faq" className={navLinkClass}>
                  <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>FAQ</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={navLinkClass}>
                  <PhoneCall className="w-3.5 h-3.5 shrink-0" />
                  <span>Contact Us</span>
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Desktop Right Side (Auth controls & Profile) */}
        <div className="hidden md:flex items-center gap-3">
          {!isAuthenticated ? (
            <NavLink
              to="/login"
              className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] transition-all cursor-pointer"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </NavLink>
          ) : (
            <div className="relative" ref={userMenuRef}>
              {/* Profile button trigger */}
              <button
                type="button"
                onClick={() => setUserMenuOpen((prev) => !prev)}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#0F172A]/80 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-medium transition-all cursor-pointer"
              >
                <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-teal-500/20 to-teal-400/10 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold uppercase text-xs">
                  {user?.username ? user.username.charAt(0) : 'U'}
                </div>
                <div className="text-left">
                  <p className="font-semibold text-slate-100 leading-tight">
                    {user?.username || 'User'}
                  </p>
                  <p className="text-[10px] text-teal-400 font-mono flex items-center gap-1">
                    {isAdmin && <ShieldCheck className="w-2.5 h-2.5" />}
                    {isAdmin ? 'Admin' : 'Student'}
                  </p>
                </div>
              </button>

              {/* Profile dropdown menu */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-[#0F172A] border border-slate-800 rounded-2xl p-1.5 shadow-2xl shadow-black/80 backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-2 border-b border-slate-800/80 mb-1">
                    <p className="text-xs font-semibold text-slate-200 truncate">
                      {user?.username}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  <NavLink
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>My Profile</span>
                  </NavLink>

                  <NavLink
                    to="/faq"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-slate-100 hover:bg-slate-800/60 transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                    <span>Help & FAQs</span>
                  </NavLink>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer text-left"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Hamburger button (Mobile only) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-slate-800/80 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-800/80 bg-[#0F172A]/95 backdrop-blur-2xl ${isOpen ? 'max-h-[32rem] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="px-4 py-3 space-y-2">
          {/* User info strip in mobile menu if authenticated */}
          {isAuthenticated && (
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#090D16]/80 border border-slate-800 mb-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold uppercase text-sm">
                {user?.username ? user.username.charAt(0) : 'U'}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-bold text-slate-100 truncate">{user?.username}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
              </div>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20">
                {isAdmin ? 'Admin' : 'Student'}
              </span>
            </div>
          )}

          {/* Mobile links list */}
          <ul className="space-y-1">
            {!isAuthenticated ? (
              <>
                <li>
                  <NavLink to="/" className={mobileNavLinkClass} end onClick={() => setIsOpen(false)}>
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/about" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    FAQs & Help
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    Contact Help Desk
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/complain" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    File a Complaint
                  </NavLink>
                </li>
                <li className="pt-2">
                  <NavLink
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-4 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-teal-400/10"
                  >
                    <LogIn className="w-4 h-4" />
                    <span>Sign In / Register</span>
                  </NavLink>
                </li>
              </>
            ) : isAdmin ? (
              <>
                <li>
                  <NavLink to="/adminhome" className={mobileNavLinkClass} end onClick={() => setIsOpen(false)}>
                    <LayoutDashboard className="w-4 h-4" />
                    Admin Console
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    <User className="w-4 h-4" />
                    My Profile
                  </NavLink>
                </li>
                <li className="pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/userhome" className={mobileNavLinkClass} end onClick={() => setIsOpen(false)}>
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/complain" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    <FileText className="w-4 h-4" />
                    File a Complaint
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/complaints" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    <History className="w-4 h-4" />
                    Complaint History
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/feedback" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    <MessageSquareHeart className="w-4 h-4" />
                    Feedback
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/profile" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    <User className="w-4 h-4" />
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/faq" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    <HelpCircle className="w-4 h-4" />
                    Help & FAQs
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className={mobileNavLinkClass} onClick={() => setIsOpen(false)}>
                    <PhoneCall className="w-4 h-4" />
                    Contact Us
                  </NavLink>
                </li>
                <li className="pt-2 border-t border-slate-800/80">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar