import { createBrowserRouter, RouterProvider, NavLink, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'

import Pageloader from './components/Pageloader'
import MainLayout from './components/Layout/MainLayout'

// 1. Import your AuthProvider and useAuth hook
import { AuthProvider, useAuth } from './context/auth'

// Lazy-loaded pages 
const UserHome = lazy(() => import('./pages/UserHome'))
const AdminHome = lazy(() => import('./pages/AdminHome'))
const Login = lazy(() => import('./pages/Login'))
const ContactUs = lazy(() => import('./pages/ContactUs'))
const About = lazy(() => import('./pages/AboutUs'))
const Grivenceform = lazy(() => import('./pages/Grivenceform'))
const LandingPage = lazy(() => import('./pages/LandingPage'))
const VerifyEmail = lazy(() => import('./pages/VerifyEmail'))

const withSuspense = (Component) => (
  <Suspense fallback={<Pageloader />}>
    <Component />
  </Suspense>
)

// 2. Create a ProtectedRoute component to guard private routes
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth()

  // Wait for the initial session check to finish
  if (loading) return <Pageloader /> 

  // Redirect to login if not authenticated
  if (!isAuthenticated) return <Navigate to="/login" replace />
  
  // Redirect to a user page if an admin route is accessed by a regular user
  if (requireAdmin && !isAdmin) return <Navigate to="/userhome" replace /> 

  return children
}

// 3. Apply the ProtectedRoute wrapper to routes that need it
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <div>Something went wrong. <NavLink to="/">Go home</NavLink></div>,
    children: [
      { index: true, element: withSuspense(LandingPage) },
      
      // --- Protected Routes ---
      { 
        path: 'userhome', 
        element: <ProtectedRoute>{withSuspense(UserHome)}</ProtectedRoute> 
      },
      { 
        path: 'adminhome', 
        element: <ProtectedRoute requireAdmin={true}>{withSuspense(AdminHome)}</ProtectedRoute> 
      },
      { 
        path: 'complain', 
        element: <ProtectedRoute>{withSuspense(Grivenceform)}</ProtectedRoute> 
      },

      // --- Public Routes ---
      { path: 'about', element: withSuspense(About) },
      { path: 'contact', element: withSuspense(ContactUs) },
      { path: 'login', element: withSuspense(Login) },
      { path: 'verify-email', element: withSuspense(VerifyEmail) },
      
      // Catch-all route
      { path: '*', element: withSuspense(LandingPage) }, 
    ],
  },
])

function App() {
  return (
    // 4. Wrap the entire app (including Router and Toaster) in AuthProvider
    <AuthProvider>
      <Toaster position="top-left" reverseOrder={false} />
      <RouterProvider router={router} fallbackElement={<Pageloader />} />
    </AuthProvider>
  )
}

export default App