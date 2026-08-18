// import React from 'react'
// function Home() {
//   return (
//     <div className="min-h-screen bg-gray-50 flex flex-col">

//       {/* Hero Section */}
//       <section className="flex flex-col items-center justify-center text-center px-4 py-5">
//         <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
//           Complain Box Portal
//         </h2>
//         <p className="text-gray-500 max-w-xl mb-8">
//           Your voice matters. Raise your concerns, track their status, and help us build a better campus experience for everyone.
//         </p>

//         <div className="flex gap-4">

//           <a nav="/complain"
//             className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-xl shadow transition">

//             File a Complaint
//           </a>

//           <a nav="/about"
//             className="bg-white hover:bg-gray-100 text-gray-700 font-medium px-6 py-3 rounded-xl border border-gray-200 shadow-sm transition">

//             Learn More
//           </a>
//         </div>
//       </section>

//       {/* Feature Cards */}
//       <section className="grid grid-cols- sm:grid-cols-2 max-w-7xl mx-auto flex-col gap-20 ">
//         <div className=' rounded-xl p-2 flex items-center gap-20 border'>
//           <h2 className='text ' >Hii Sam Altman</h2>
//           <img
//             className='h-20 w-20 border rounded-full p-2'
//             src="./favicon.svg" alt="" />
//         </div>

//         <div className=' mx-auto w-full flex flex-col px-10 border rounded-xl'>
//           <h2 className='p-5 '>Track your Issues</h2>
          
//             <li className='text-xl font-semibold text-blue-800'>raised issue:- </li>
//             <li className='text-xl font-semibold text-blue-800'>Date issue:- </li>
//             <li className='text-xl font-semibold text-blue-800'>department:- </li>
//             <li className='text-xl font-semibold text-blue-800'>HOD:- </li>
//             <li className='text-xl font-semibold text-blue-800'>teacher:- </li>
         
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Home



import React from "react";
import { Link } from "react-router-dom";

function Home() {
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
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Welcome Back</p>
              <h2 className="text-2xl font-bold text-gray-800 mt-1">
                Hi, Sam Altman 👋
              </h2>
              <p className="text-gray-500 mt-2">
                Check your complaint updates below.
              </p>
            </div>

            <img
              src="/favicon.svg"
              alt="Profile"
              className="h-20 w-20 rounded-full border-4 border-blue-100 p-2"
            />
          </div>

          {/* Complaint Status Card */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6">
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
          <div className="bg-white rounded-2xl p-6 shadow text-center">
            <h3 className="text-3xl font-bold text-blue-600">12</h3>
            <p className="text-gray-500 mt-2">Complaints Raised</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow text-center">
            <h3 className="text-3xl font-bold text-green-600">8</h3>
            <p className="text-gray-500 mt-2">Resolved</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow text-center">
            <h3 className="text-3xl font-bold text-orange-600">4</h3>
            <p className="text-gray-500 mt-2">Pending</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
