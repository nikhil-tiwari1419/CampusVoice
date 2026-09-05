import { createBrowserRouter, RouterProvider, NavLink, Navigate, useRouteError } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

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

// Global styled error fallback screen
function RouteErrorFallback() {
  const error = useRouteError()

  return (
    <div className="min-h-screen w-full bg-[#080C14] flex flex-col items-center justify-center p-6 text-center select-none font-sans">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mb-4 shadow-lg shadow-rose-500/5">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h1 className="text-2xl font-bold text-slate-100 tracking-tight mb-2">Something went wrong</h1>
      <p className="text-xs sm:text-sm text-slate-400 max-w-sm mb-6">
        {error?.statusText || error?.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <NavLink
        to="/"
        className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-teal-400/10 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </NavLink>
    </div>
  )
}

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
    errorElement: <RouteErrorFallback />,
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
      <Toaster 
        position="top-left" 
        reverseOrder={false} 
        toastOptions={{
          style: {
            background: '#0F172A',
            color: '#F1F5F9',
            border: '1px solid rgba(51, 65, 85, 0.8)',
            borderRadius: '12px',
            fontSize: '13px',
            padding: '12px 16px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 8px 10px -6px rgba(0, 0, 0, 0.5)',
          },
          success: {
            iconTheme: {
              primary: '#2DD4BF',
              secondary: '#0F172A',
            },
          },
          error: {
            iconTheme: {
              primary: '#FB7185',
              secondary: '#0F172A',
            },
          },
        }}
      />
      <RouterProvider router={router} fallbackElement={<Pageloader />} />
    </AuthProvider>
  )
}

export default App

