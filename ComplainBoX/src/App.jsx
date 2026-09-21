import { createBrowserRouter, RouterProvider, NavLink, useRouteError, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { AlertTriangle, ArrowLeft } from 'lucide-react'

import Pageloader from './components/Pageloader'
import MainLayout from './Layout/MainLayout'
import { AuthProvider, useAuth } from './context/auth'
import { ThemeProvider } from './context/theme'

// pages
const Userdashboard = lazy(() => import('./pages/UserProfile/UserDashboard'))
const UserProfile = lazy(()=> import('./pages/UserProfile/Userprofile'))
const ComplainBox = lazy(() => import('./pages/UserProfile/ComplainBox'))
const Feedback = lazy(()=> import('./pages/UserProfile/FeedBack'))
const Allusercomplain = lazy(()=> import('./pages/UserProfile/AllstudentComplain'))


//admin
const Admindashboard = lazy(() => import('./pages/AdminProfile/AdminDashboard'))
const AdminProfile = lazy(() => import('./pages/AdminProfile/AdminProfile'))
const AllStudent = lazy(() => import('./pages/AdminProfile/AllStudents'))
const NewComplain = lazy(() => import('./pages/AdminProfile/NewComplain'))
const CompletedComplain = lazy(() => import('./pages/AdminProfile/CompletedIssues'))


const Login = lazy(() => import('./pages/Auth/Login'))
const UnAuthPerson = lazy(()=> import('./unauthorisedperson'))
const ForgootPass = lazy(()=> import('./pages/Auth/ForgootPassword'))
const LandingPage = lazy(() => import('./pages/LandingPage/WelcomePage'))
const VerifyEmail = lazy(() => import('./pages/Auth/VerifyEmail'))

const withSuspense = (Component) => (
  <Suspense fallback={<Pageloader />}>
    <Component />
  </Suspense>
)

// Global styled error fallback screen
function RouteErrorFallback() {
  const error = useRouteError()

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center justify-center p-6 text-center select-none font-sans">
      <div className="w-14 h-14 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex items-center justify-center mb-4 shadow-lg shadow-rose-200/20">
        <AlertTriangle className="w-7 h-7" />
      </div>
      <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-2">Something went wrong</h1>
      <p className="text-xs sm:text-sm text-slate-600 max-w-sm mb-6">
        {error?.statusText || error?.message || 'An unexpected error occurred while loading this page.'}
      </p>
      <NavLink
        to="/"
        className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-teal-600/20 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Home</span>
      </NavLink>
    </div>
  )
}

// ProtectedRoute
const ProtectedRoute = ({ children, allowedRoles, requiredRoles }) => {
  const { user, loading } = useAuth()
  if (loading) {
    return <Pageloader />                             // Wait for the initial session check to finish
  } 
  if (!user) {
    return <Navigate to='/login' replace/>                       // Redirect to login if not authenticated
  }
  const roleReq = allowedRoles || requiredRoles
  if (roleReq && (!user.role || user.role !== roleReq)) {      // login required with roles 
    return <Navigate to='/unauthorisedperson' />
  } 

  return children
}

// Router configuration
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { index: true, element: withSuspense(LandingPage) },

      // Protected Routes

//user routes hai yaha per
      {
        path: 'userdashboard',
        element: <ProtectedRoute>{withSuspense(Userdashboard)}</ProtectedRoute>
      },
      {
        path: 'userprofile',
        element: <ProtectedRoute>{withSuspense(UserProfile)}</ProtectedRoute>
      },
      {
        path: 'complain',
        element: <ProtectedRoute>{withSuspense(ComplainBox)}</ProtectedRoute>
      },
      {
        path: 'allstudentcomplain',
        element: <ProtectedRoute>{withSuspense(Allusercomplain)}</ProtectedRoute>
      },
      {
        path: 'feedback',
        element: <ProtectedRoute>{withSuspense(Feedback)}</ProtectedRoute>
      },

      // admin routes hai yaha per
      {
        path: 'admindashboard',
        element: <ProtectedRoute allowedRoles='admin'>{withSuspense(Admindashboard)}</ProtectedRoute>
      },
      {
        path: 'adminprofile',
        element: <ProtectedRoute allowedRoles='admin'>{withSuspense(AdminProfile)}</ProtectedRoute>
      },
      {
        path: 'allstudent',
        element: <ProtectedRoute allowedRoles='admin'>{withSuspense(AllStudent)}</ProtectedRoute>
      },
      {
        path: 'newcomplain',
        element: <ProtectedRoute allowedRoles='admin'>{withSuspense(NewComplain)}</ProtectedRoute>
      },
      {
        path: 'completedcomplain',
        element: <ProtectedRoute allowedRoles='admin'>{withSuspense(CompletedComplain)}</ProtectedRoute>
      },


      // --- Public Routes ---
      { path: 'landingPage', element: withSuspense(LandingPage) },
      { path: '404page', element: withSuspense(UnAuthPerson) },
      { path: '*', element: withSuspense(LandingPage) },
    ],
  },
  // Auth routes WITHOUT navbar and footer
  { path: 'login', element: withSuspense(Login) },
  { path: 'verify-email', element: withSuspense(VerifyEmail) },
  { path: 'forgootpass', element: withSuspense(ForgootPass) },
])

function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  )
}

export default App

