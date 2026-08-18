import React from 'react'
import { NavLink } from 'react-router-dom'

function LandingPage() {
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive
        ? 'text-blue-600 bg-blue-50'
        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-100'
    }`

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero */}
      <main className="flex-1">
        <section className="max-w-4xl mx-auto text-center px-6 py-24">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1 rounded-full mb-4">
            Powered by ComplainBoX
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            Every Complaint <br /> Deserves a Hearing.
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto mb-10">
            CampusVoice gives every student a direct, transparent channel to
            raise concerns, track progress, and drive real change on campus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <NavLink
              to="/complain"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl shadow transition w-full sm:w-auto"
            >
              File a Complaint
            </NavLink>
            <NavLink
              to="/about"
              className="bg-white hover:bg-gray-100 text-gray-700 font-medium px-8 py-3 rounded-xl border border-gray-200 shadow-sm transition w-full sm:w-auto"
            >
              How It Works
            </NavLink>
          </div>
        </section>

        {/* Stats / Trust strip */}
        <section className="border-y border-gray-200 bg-white">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-10 text-center">
            <div>
              <p className="text-3xl font-bold text-gray-800">500+</p>
              <p className="text-gray-500 text-sm">Complaints Resolved</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">24h</p>
              <p className="text-gray-500 text-sm">Avg. Response Time</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">100%</p>
              <p className="text-gray-500 text-sm">Anonymous & Secure</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">12</p>
              <p className="text-gray-500 text-sm">Departments Connected</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
            <div className="text-3xl mb-3">📢</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Raise Your Voice</h3>
            <p className="text-gray-500 text-sm">
              Submit complaints about hostel, academics, or facilities in just a few clicks.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Track in Real Time</h3>
            <p className="text-gray-500 text-sm">
              Follow your complaint's journey from submission to resolution, transparently.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
            <div className="text-3xl mb-3">🤝</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Get Heard, Get Results</h3>
            <p className="text-gray-500 text-sm">
              Complaints route directly to the right authority — no lost paperwork, no delays.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} CampusVoice · ComplainBoX. All rights reserved.
      </footer>
    </div>
  )
}

export default LandingPage