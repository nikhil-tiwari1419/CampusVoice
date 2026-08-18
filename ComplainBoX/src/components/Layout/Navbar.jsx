import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, GraduationCap } from 'lucide-react'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
    }`

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-lg text-base font-medium transition ${
      isActive
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
    }`

  const navLinks = [
    { to: '/', label: 'Home', end: true },
    { to: '/about', label: 'About' },
    { to: '/complain', label: 'File a Complaint' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <GraduationCap className="w-7 h-7 text-gray-800" />
          <span className="text-xl font-bold text-gray-800">
            Campus<span className="text-blue-600">Voice</span>
          </span>
        </div>

        {/* Desktop nav links */}
        <ul className="hidden md:flex gap-2">
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
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile dropdown menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="px-4 pb-4 space-y-1 border-t border-gray-100 pt-2">
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