import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, GraduationCap } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
      isActive
        ? 'text-teal-400 bg-teal-500/10 border border-teal-500/20 shadow-sm shadow-teal-500/5'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
      isActive
        ? 'text-teal-400 bg-teal-500/10 border border-teal-500/20'
        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
    }`

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/complain', label: 'File a Complaint' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-[#080C14]/80 backdrop-blur-xl border-b border-slate-800/80 sticky top-0 z-50 select-none font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform">
            <GraduationCap className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-slate-100 tracking-tight">
            Campus<span className="text-teal-400">Voice</span>
          </span>
        </NavLink>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-1.5">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink to={to} className={navLinkClass} end={end}>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Hamburger button (mobile only) */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-xl text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-slate-800/80 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out border-b border-slate-800/80 bg-[#0F172A]/95 backdrop-blur-2xl ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-4 py-3 space-y-1">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={mobileNavLinkClass}
                end={end}
                onClick={() => setIsOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar