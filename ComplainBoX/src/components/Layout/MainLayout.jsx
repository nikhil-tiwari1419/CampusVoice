import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout