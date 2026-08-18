import { createBrowserRouter, RouterProvider, NavLink } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

import Pageloader from './components/Pageloader'
import MainLayout from './components/Layout/MainLayout'

// Lazy-loaded pages — each becomes its own JS chunk, only fetched when visited
const UserHome = lazy(() => import('./pages/UserHome'))
const AdminHome = lazy(() => import('./pages/AdminHome'))
const Login = lazy(() => import('./pages/Login'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const About = lazy(() => import('./pages/AboutUs'))
const Grivenceform = lazy(() => import('./pages/Grivenceform'))
const LandingPage = lazy(() => import('./pages/LandingPage'))

const withSuspense = (Component) => (
  <Suspense fallback={<Pageloader />}>
    <Component />
  </Suspense>
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>Something went wrong. <NavLink to="/">Go home</NavLink></div>,
    children: [
      { index: true, element: withSuspense(LandingPage) },
      { path: 'userhome', element: withSuspense(UserHome) },
      { path: 'adminhome', element: withSuspense(AdminHome) },
      { path: 'about', element: withSuspense(About) },
      { path: 'contact', element: withSuspense(ContactUs) },
      { path: 'complain', element: withSuspense(Grivenceform) },
      { path: 'login', element: withSuspense(Login) },
      { path: '*', element: withSuspense(LandingPage) }, // catch-all → home
    ],
  },
])

function App() {
  return (
    <>
      <Toaster position="top-left" reverseOrder={false} />
      <RouterProvider router={router} fallbackElement={<Pageloader />} />
    </>
  )
}

export default App