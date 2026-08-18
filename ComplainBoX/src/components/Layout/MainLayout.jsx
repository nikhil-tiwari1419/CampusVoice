import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
function MainLaout() {
  return (
    <>
    <Navbar/>
    <main className=' min-h-[94vh] '>
    <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default MainLaout
