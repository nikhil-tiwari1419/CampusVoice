import React from 'react'
import { NavLink } from 'react-router-dom'
import { Megaphone, Activity, ShieldCheck, ArrowRight, Sparkles, Clock, CheckCircle2, Building2 } from 'lucide-react'
import FAQ from '../components/FAQ'

function LandingPage() {
  return (
    <div className="relative min-h-screen w-full bg-[#080C14] text-slate-100 font-sans flex flex-col overflow-hidden select-none">
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
        <section className="max-w-4xl mx-auto text-center px-4 sm:px-6 pt-24 pb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium mb-6 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span>Powered by ComplainBoX</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 leading-tight tracking-tight mb-6">
            Every Complaint <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
              Deserves a Hearing.
            </span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            CampusVoice gives every student a direct, transparent channel to raise concerns, track progress in real time, and drive tangible change on campus.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto sm:max-w-none">
            <NavLink
              to="/complain"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-7 py-3 rounded-xl shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] transition-all cursor-pointer text-sm"
            >
              <span>File a Complaint</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>

            <NavLink
              to="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#0F172A]/80 hover:bg-slate-800/80 text-slate-200 font-semibold px-7 py-3 rounded-xl border border-slate-800 hover:border-slate-700 shadow-sm transition-all cursor-pointer text-sm"
            >
              How It Works
            </NavLink>

            <NavLink
              to="/Login"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#0F172A]/80 hover:bg-slate-800/80 text-slate-200 font-semibold px-7 py-3 rounded-xl border border-slate-800 hover:border-slate-700 shadow-sm transition-all cursor-pointer text-sm"
            >
              Login / Sign Up
            </NavLink>
          </div>
        </section>

        {/* Stats / Trust Strip */}
        <section className="border-y border-slate-800/80 bg-[#0F172A]/40 backdrop-blur-md">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-10 text-center">
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">500+</p>
              <p className="text-slate-400 text-xs sm:text-sm">Complaints Resolved</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-teal-400 tracking-tight">24h</p>
              <p className="text-slate-400 text-xs sm:text-sm">Avg. Response Time</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">100%</p>
              <p className="text-slate-400 text-xs sm:text-sm">Anonymous & Secure</p>
            </div>
            <div className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold text-teal-400 tracking-tight">12</p>
              <p className="text-slate-400 text-xs sm:text-sm">Departments Connected</p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-7 shadow-xl shadow-black/40 backdrop-blur-xl hover:border-slate-700/80 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Megaphone className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Raise Your Voice</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Submit complaints about hostel, academics, or campus facilities in just a few clicks with verified confidentiality.
            </p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-7 shadow-xl shadow-black/40 backdrop-blur-xl hover:border-slate-700/80 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Track in Real Time</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Follow your complaint's journey from submission to officer review and final resolution transparently.
            </p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-7 shadow-xl shadow-black/40 backdrop-blur-xl hover:border-slate-700/80 transition-all group">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">Get Heard, Get Results</h3>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
              Complaints route directly to the designated department heads — eliminating lost paperwork and administrative delays.
            </p>
          </div>
        </section>
       <FAQ/>
      </main>



      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#080C14] py-8 text-center text-slate-500 text-xs sm:text-sm">
        <p>© {new Date().getFullYear()} CampusVoice · ComplainBoX. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default LandingPage