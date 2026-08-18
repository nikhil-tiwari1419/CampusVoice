import React from 'react'
import { NavLink } from 'react-router-dom'
function Footer() {
  return (
    <div className='bg pb-1'
    >
      {/* Footer */}
      <footer className="mt-auto bg-gray-100 text-gray-950">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo + Website Name */}
          <div className="flex items-center gap-3">
            <img
              src="/favicon.svg"
              alt="CampusVoice Logo"
              className="h-10 w-10 rounded-full bg-white p-1"
            />
            <div>
              <h3 className="text-xl font-bold text-black">CampusVoice</h3>
              <p className="text-sm text-gray-400">
                Student Complaint & Grievance Portal
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex gap-6 text-sm">
            <NavLink to="/" className="hover:text-white transition">
              Home
            </NavLink>
            <NavLink to="/complain" className="hover:text-white transition">
              Complaint
            </NavLink>
            <NavLink to="/about" className="hover:text-white transition">
              About
            </NavLink>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} CampusVoice. All rights reserved.
        </div>
      </footer>
    </div>
  )
}

export default Footer