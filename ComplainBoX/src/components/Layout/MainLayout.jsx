import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
function MainLaout() {
  return (
    <>
    <Navbar/>
    <main className='md:pl-64 min-h-[94vh]  md:pb-0 text-white font-mono bg-black'>
    <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default MainLaout

