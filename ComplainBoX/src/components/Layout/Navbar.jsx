import { User } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
    }`

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎓</span>
          <span className="text-xl font-bold text-gray-800">
            Campus<span className="text-blue-600">Voice</span>
          </span>
        </div>

        <ul className="flex gap-2">
          <li><NavLink to="/" className={navLinkClass} end>Home</NavLink></li>
          <li><NavLink to="/userhome" className={navLinkClass}>userHome</NavLink></li>
          <li><NavLink to="/about" className={navLinkClass}>About</NavLink></li>
          <li><NavLink to="/complain" className={navLinkClass}>File a Complaint</NavLink></li>
          <li><NavLink to="/contact" className={navLinkClass}>Contact</NavLink></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar