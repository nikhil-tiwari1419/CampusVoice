import { NavLink } from 'react-router-dom'
import { Megaphone, Activity, Sparkles, ShieldCheck, ArrowRight, Users, TrendingUp, CheckCircle2, Clock } from 'lucide-react'
import FAQ from '../../components/FAQ'
import ContactUs from '../../components/ContactUs'
import AboutUs from '../../components/AboutUs'


function LandingPage() {
  const stats = [
    { number: '500+', label: 'Complaints Resolved', icon: CheckCircle2 },
    { number: '24h', label: 'Avg. Response', icon: Clock },
    { number: '100%', label: 'Anonymous & Secure', icon: ShieldCheck },
    // { number: '12', label: 'Departments', icon: Building2 },
  ]

  const features = [
    {
      icon: Megaphone,
      title: 'Raise Your Voice',
      desc: 'Submit complaints about hostel, academics, or campus facilities in just a few clicks with verified confidentiality.',
    },
    {
      icon: Activity,
      title: 'Track in Real Time',
      desc: 'Follow your complaint\'s journey from submission to officer review and final resolution transparently.',
    },
    {
      icon: ShieldCheck,
      title: 'Get Heard, Get Results',
      desc: 'Complaints route directly to designated department heads — eliminating lost paperwork and delays.',
    },
  ]

  return (
    <div className="relative min-h-screen w-full bg-white dark:bg-[#080C14] text-gray-900 dark:text-slate-100 font-sans flex flex-col overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
          'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Main Content */}
      <main className="relative flex-1">

        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 pb-10 sm:pb-0">
          <div className="max-w-5xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

              {/* Left: Text Content */}
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                <div className="space-y-3 sm:space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-teal-100 dark:bg-teal-500/10 border border-teal-300 dark:border-teal-500/20 text-teal-700 dark:text-teal-400 text-xs sm:text-sm font-medium backdrop-blur-md w-fit mx-auto lg:mx-0">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                    </span>
                    <span>Powered by ComplainBoX</span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-slate-100 leading-tight tracking-tight">
                    Every Complaint<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-emerald-500 dark:from-teal-400 dark:to-emerald-300">
                      Deserves a Hearing.
                    </span>
                  </h1>

                  <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    CampusVoice gives every student a direct, transparent channel to raise concerns, track progress in real time, and drive tangible change on campus.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center lg:justify-start pt-2 sm:pt-4">
                  <NavLink
                    to="/complain"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-md shadow-teal-400/20 hover:shadow-teal-400/40 active:scale-[0.98] transition-all cursor-pointer text-sm sm:text-base"
                  >
                    <span>File a Complaint</span>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </NavLink>

                  <NavLink
                    to="/about"
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-gray-100 dark:bg-[#0F172A]/80 hover:bg-gray-200 dark:hover:bg-slate-800/80 text-gray-900 dark:text-slate-200 font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-gray-300 dark:border-slate-800 hover:border-gray-400 dark:hover:border-slate-700 shadow-sm transition-all cursor-pointer text-sm sm:text-base"
                  >
                    How It Works
                  </NavLink>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3 justify-center lg:justify-start pt-4">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-300 dark:border-slate-700/50 text-xs sm:text-sm text-gray-700 dark:text-slate-300">
                    <Users className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                    <span>500+ Students</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-300 dark:border-slate-700/50 text-xs sm:text-sm text-gray-700 dark:text-slate-300">
                    <TrendingUp className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                    <span>95% Resolved</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-slate-800/40 border border-gray-300 dark:border-slate-700/50 text-xs sm:text-sm text-gray-700 dark:text-slate-300">
                    <ShieldCheck className="w-4 h-4 text-teal-500 dark:text-teal-400" />
                    <span>100% Secure</span>
                  </div>
                </div>
              </div>

              {/* Right: Visual Hero Card */}
              <div className="hidden lg:flex items-center justify-center">
                <div className="relative w-full max-w-md aspect-square">
                  {/* Floating Cards */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {/* Main Card */}
                    <div className="absolute w-72 h-96 bg-gradient-to-br from-[#0F172A] to-slate-900/50 border border-slate-700/50 rounded-3xl p-6 shadow-2xl shadow-black/50 backdrop-blur-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className="inline-block p-2.5 bg-teal-500/10 border border-teal-500/20 rounded-xl mb-4">
                            <Megaphone className="w-6 h-6 text-teal-400" />
                          </div>
                          <h3 className="text-xl font-bold text-slate-100 mb-2">File Complaint</h3>
                          <p className="text-sm text-slate-400">Submit your grievance securely</p>
                        </div>
                        <div className="text-4xl font-bold text-teal-400">500+</div>
                      </div>
                    </div>

                    {/* Secondary Card 1 */}
                    <div className="absolute w-64 h-80 bg-gradient-to-br from-[#0F172A] to-slate-900/50 border border-slate-700/50 rounded-3xl p-5 shadow-2xl shadow-black/50 backdrop-blur-xl transform rotate-6 translate-x-32 translate-y-20">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className="inline-block p-2.5 bg-sky-500/10 border border-sky-500/20 rounded-xl mb-4">
                            <Activity className="w-6 h-6 text-sky-400" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-1">Track Status</h3>
                          <p className="text-xs text-slate-400">Real-time updates</p>
                        </div>
                        <div className="text-3xl font-bold text-sky-400">24h</div>
                      </div>
                    </div>

                    {/* Secondary Card 2 */}
                    <div className="absolute w-64 h-80 bg-gradient-to-br from-[#0F172A] to-slate-900/50 border border-slate-700/50 rounded-3xl p-5 shadow-2xl shadow-black/50 backdrop-blur-xl transform -rotate-12 -translate-x-32 translate-y-20">
                      <div className="h-full flex flex-col justify-between">
                        <div>
                          <div className="inline-block p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl mb-4">
                            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                          </div>
                          <h3 className="text-lg font-bold text-slate-100 mb-1">Get Results</h3>
                          <p className="text-xs text-slate-400">95% resolved</p>
                        </div>
                        <div className="text-3xl font-bold text-emerald-400">95%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Strip */}
        <section className="border-y border-gray-300 dark:border-slate-800/80 bg-gray-50 dark:bg-[#0F172A]/40 backdrop-blur-md">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 px-4 sm:px-6 py-8 sm:py-12 text-center">
            {stats.map(({ number, label, icon: Icon }) => (
              <div key={label} className="space-y-2">
                <Icon className="w-6 h-6 text-teal-500 dark:text-teal-400 mx-auto" />
                <p className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-slate-100 tracking-tight">{number}</p>
                <p className="text-gray-600 dark:text-slate-400 text-xs sm:text-sm">{label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-teal-100 dark:bg-teal-500/10 border border-teal-300 dark:border-teal-500/20 text-teal-700 dark:text-teal-400 text-xs sm:text-sm font-medium mb-4 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              <span>Key Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-3 sm:mb-4">Built for Students</h2>
            <p className="text-gray-600 dark:text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
              A complete solution for filing, tracking, and resolving student grievances
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {features.map(({ icon: Icon, title, desc }, idx) => (
              <div key={idx} className="bg-white dark:bg-[#0F172A]/80 border border-gray-200 dark:border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-xl shadow-gray-900/5 dark:shadow-black/40 backdrop-blur-xl hover:border-gray-300 dark:hover:border-slate-700/80 transition-all group">
                <div className="w-12 h-12 rounded-xl bg-teal-100 dark:bg-teal-500/10 border border-teal-300 dark:border-teal-500/20 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-slate-100 mb-2">{title}</h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ, Contact, About Sections */}
        <FAQ/>
        <ContactUs/>
        <AboutUs/>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-300 dark:border-slate-800/80 bg-white dark:bg-[#080C14] py-8 text-center text-gray-600 dark:text-slate-500 text-xs sm:text-sm">
        <p>© {new Date().getFullYear()} CampusVoice · ComplainBoX. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage