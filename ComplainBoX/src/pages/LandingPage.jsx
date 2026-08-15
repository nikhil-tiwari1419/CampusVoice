import React from 'react'
import { NavLink } from 'react-router-dom'

function LandingPage() {
  return (
    <div>
      <nav>
        <ul className="flex gap-6">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'text-red-600 font-medium' : 'text-gray-700')}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'text-red-600 font-medium' : 'text-gray-700')}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/complain"
              className={({ isActive }) => (isActive ? 'text-red-600 font-medium' : 'text-gray-700')}
            >
              File a complaint
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? 'text-red-600 font-medium' : 'text-gray-700')}
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>

      <main>
        <h1>Welcome to the College Complaint Portal</h1>
        <p>Every complaint gets a hearing.</p>
      </main>
    </div>
  )
}

export default LandingPage
