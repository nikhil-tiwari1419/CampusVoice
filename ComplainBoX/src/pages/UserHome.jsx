import React from "react";
import { useAuth } from "../context/auth";
import { Link } from "react-router-dom";

function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Complaint Box Portal
        </h1>

        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Your voice matters. Raise your concerns, track their status, and help
          us build a better campus experience for everyone.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/complain"
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold shadow-lg transition"
          >
            File a Complaint
          </Link>

          <Link
            to="/about"
            className="bg-white hover:bg-gray-100 text-gray-700 px-7 py-3 rounded-xl font-semibold border border-gray-200 shadow transition"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Welcome Back</p>
              <h2 className="text-2xl font-bold text-gray-800 mt-1 capitalize">
                Hi, {loading ? "Loading..." : user?.username || "Student"}
              </h2>
              <p className="text-gray-500 mt-2 text-sm">
                {user?.email || "Check your complaint updates below."}
              </p>
            </div>

            <div className="h-16 w-16 rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold uppercase shadow">
              {user?.username ? user.username.charAt(0) : "U"}
            </div>
          </div>

          {/* Complaint Status Card */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Latest Complaint
            </h2>

            <ul className="space-y-4">
              <li className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Raised Issue</span>
                <span className="font-semibold text-blue-700">
                  Library Wi-Fi
                </span>
              </li>

              <li className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Date</span>
                <span className="font-semibold">18 Aug 2026</span>
              </li>

              <li className="flex justify-between border-b pb-2">
                <span className="text-gray-500">Department</span>
                <span className="font-semibold">IT Department</span>
              </li>

              <li className="flex justify-between border-b pb-2">
                <span className="text-gray-500">HOD</span>
                <span className="font-semibold">Dr. Sharma</span>
              </li>

              <li className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                  In Progress
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-blue-600">12</h3>
            <p className="text-gray-500 mt-2">Complaints Raised</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-green-600">8</h3>
            <p className="text-gray-500 mt-2">Resolved</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
            <h3 className="text-3xl font-bold text-orange-600">4</h3>
            <p className="text-gray-500 mt-2">Pending</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;