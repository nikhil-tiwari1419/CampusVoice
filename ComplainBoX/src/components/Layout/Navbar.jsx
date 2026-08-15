import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
  const linkClass = ({ isActive }) =>
    isActive ? 'text-red-600 font-medium' : 'text-gray-700 hover:text-red-600'

  return (
    <div className='bg'>
      <ul className="flex gap-6">
        <li>
          <NavLink to="/" className={linkClass} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/complain" className={linkClass}>
            Complain
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={linkClass}>
            About us
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={linkClass}>
            Contact form
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
