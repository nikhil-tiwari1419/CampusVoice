import React from 'react'
import Navbar from '../Layout/Navbar.jsx'
import Footer from '../Layout/Footer.jsx'

/**
 * DesktopLayout
 * Dedicated desktop container providing top navigation, full-width responsive
 * content area with ambient glow lighting, and footer for desktop screens (min-width: 768px).
 */
export default function DesktopLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#080C14] text-slate-100 font-sans selection:bg-teal-500/30 selection:text-teal-200">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  )
}
