import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Complain Box Portal
        </h2>
        <p className="text-gray-500 max-w-xl mb-8">
          Your voice matters. Raise your concerns, track their status, and help us build a better campus experience for everyone.
        </p>

        <div className="flex gap-4">
          
          <a nav="/complain"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition">
          
            File a Complaint
          </a>
          
          <a nav="/about"
            className="bg-white hover:bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-xl border border-gray-200 shadow-sm transition">
          
            Learn More
          </a>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6 md:px-16 pb-20">
        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">📢 Raise Issues</h3>
          <p className="text-gray-500 text-sm">
            Submit complaints related to hostel, academics, or campus facilities in seconds.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🔍 Track Status</h3>
          <p className="text-gray-500 text-sm">
            Stay updated on the progress of your complaints, from submission to resolution.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6 hover:shadow-md transition">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">🤝 Get Heard</h3>
          <p className="text-gray-500 text-sm">
            Ensure your concerns reach the right authorities and get resolved faster.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home