import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-linear-to-b from-white via-blue-50 to-cyan-50 text-gray-900 font-sans selection:bg-teal-200 selection:text-teal-900">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout