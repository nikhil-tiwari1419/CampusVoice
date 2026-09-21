import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRight, Users, Lock, Zap, BookOpen, BarChart3, Shield } from 'lucide-react'
import { useAuth } from '../../context/auth'
import Faq from '../../components/Faq'

export default function LandingPage() {
  const { user } = useAuth()
  const [hoveredCard, setHoveredCard] = useState(null)

  return (
    <main className="relative flex-1 bg-linear-to-b from-white via-blue-50 to-cyan-50">
      {/* ==================== HERO SECTION ==================== */}
      <section id='home' className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/40 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/40 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Main Headline */}
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              <span className="bg-linear-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
                Speak Up About Your Concerns,
              </span>
              <br />
              <span className="text-gray-900">
                Stay Informed About Their Progress,
              </span>
              <br />
              <span className="bg-linear-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
                and Help Make Your Campus Better.
              </span>
            </h1>

            <p className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              CampusVoice
            </p>

            <p className="text-xl sm:text-2xl text-gray-700 font-light mb-4">
              Your Student Grievance Portal
            </p>

            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              A secure and transparent platform where every student voice matters.
              Report concerns, track resolutions, and communicate directly with
              administration. Your grievance, our priority.
            </p>
          </div>

          {/* CTA Cards with Animation */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
            {/* Sign Up Card */}
            <div
              onMouseEnter={() => setHoveredCard('signup')}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-linear-to-r from-teal-400/20 to-cyan-400/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <NavLink
                to="/login"
                className="relative flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-teal-600 to-cyan-600 text-white font-bold rounded-xl hover:shadow-2xl hover:shadow-teal-400/40 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span>Get Started</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${hoveredCard === 'signup' ? 'translate-x-1' : ''}`} />
              </NavLink>
            </div>

            {/* Sign In Card */}
            <div
              onMouseEnter={() => setHoveredCard('signin')}
              onMouseLeave={() => setHoveredCard(null)}
              className="group relative w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-linear-to-r from-gray-300/20 to-blue-300/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <NavLink
                to={user ? (user.role === 'admin' ? '/admindashboard' : '/userdashboard') : '/login'}
                className="relative flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-800 font-bold rounded-xl border-2 border-gray-300 hover:border-gray-400 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                <span>{user ? 'Go to Dashboard' : 'Sign In'}</span>
                <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${hoveredCard === 'signin' ? 'translate-x-1' : ''}`} />
              </NavLink>
            </div>
          </div>

          {/* Stats/Features Row */}
          <div className="grid grid-cols-3 gap-4 mt-16 pt-16 border-t border-gray-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">24/7</p>
              <p className="text-gray-600 text-sm mt-1">Available</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-cyan-600">100%</p>
              <p className="text-gray-600 text-sm mt-1">Confidential</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-teal-600">Quick</p>
              <p className="text-gray-600 text-sm mt-1">Resolution</p>
            </div>
          </div>
        </div>
      </section>

      {/*  HOW TO USE SECTION  */}
      <section id='howtouse' className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How to Use Campus Voice</h2>
            <p className="text-gray-600 text-lg">Simple steps to make your voice heard</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Student Guide */}
            <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-200 hover:border-blue-300 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Students</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Create Account',
                    desc: 'Sign up with your college email and set a secure password'
                  },
                  {
                    step: '2',
                    title: 'File a Complaint',
                    desc: 'Navigate to "Create Complaint" and fill in detailed information about your grievance'
                  },
                  {
                    step: '3',
                    title: 'Track Status',
                    desc: 'Monitor your complaint status in real-time from your dashboard'
                  },
                  {
                    step: '4',
                    title: 'Receive Updates',
                    desc: 'Get email notifications when your complaint is reviewed or resolved'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 min-w-fit rounded-full bg-teal-200 flex items-center justify-center text-teal-600 font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Guide */}
            <div className="bg-linear-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl border-2 border-cyan-200 hover:border-cyan-300 transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-6 h-6 text-cyan-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Administrators</h3>
              </div>

              <div className="space-y-4">
                {[
                  {
                    step: '1',
                    title: 'Access Dashboard',
                    desc: 'Log in with admin credentials to view the comprehensive dashboard'
                  },
                  {
                    step: '2',
                    title: 'Review Complaints',
                    desc: 'View all pending complaints with detailed student information and context'
                  },
                  {
                    step: '3',
                    title: 'Take Action',
                    desc: 'Assign complaints to relevant departments and add resolution comments'
                  },
                  {
                    step: '4',
                    title: 'Monitor Progress',
                    desc: 'Track resolution metrics and generate reports for management review'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-10 h-10 min-w-fit rounded-full bg-cyan-200 flex items-center justify-center text-cyan-600 font-bold text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{item.title}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-4 gap-6 mt-16">
            {[
              { icon: Lock, title: 'Secure & Private', desc: 'End-to-end encryption' },
              { icon: Zap, title: 'Fast Tracking', desc: 'Real-time updates' },
              { icon: BarChart3, title: 'Analytics', desc: 'Resolution metrics' },
              { icon: BookOpen, title: 'Documentation', desc: 'Complete records' }
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-linear-to-br from-teal-100 to-cyan-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <feature.icon className="w-6 h-6 text-teal-600" />
                </div>
                <p className="font-semibold text-gray-900 mb-1">{feature.title}</p>
                <p className="text-gray-600 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FAQ SECTION ==================== */}
      <Faq id='faqs' />

      {/* ==================== FOOTER CTA ==================== */}
      <section id='contact' className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-50">
        <div className="max-w-4xl mx-auto bg-linear-to-r from-gray-100 via-blue-50 to-blue-50 border-2 border-gray-100 rounded-xl p-12 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Make a Difference?</h2>
          <p className="text-gray-700 mb-8">Join thousands of students in making their voices heard. Start your grievance journey today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/login"
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95"
            >
              Get Started Now
            </NavLink>
            <button className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 font-bold rounded-lg border-2 border-gray-300 transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

