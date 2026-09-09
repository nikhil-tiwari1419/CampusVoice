import React from 'react'
import { NavLink } from 'react-router-dom'
import { Target, Eye, ShieldCheck, Users, MessageSquareText, TrendingUp, ArrowRight, Sparkles } from 'lucide-react'

function AboutUs() {
  const values = [
    {
      icon: ShieldCheck,
      title: 'Anonymous & Secure',
      description: 'Your identity stays protected. Speak up without fear of consequences.',
    },
    {
      icon: MessageSquareText,
      title: 'Transparent Process',
      description: 'Track every complaint from submission to resolution, in real time.',
    },
    {
      icon: TrendingUp,
      title: 'Real Impact',
      description: 'Complaints are routed directly to the right department for faster action.',
    },
  ]

  const team = [
    { role: 'Student Council', desc: 'Oversees complaint categorization and escalation' },
    { role: 'Administration', desc: 'Reviews and acts on department-level issues' },
    { role: 'Tech Team', desc: 'Maintains and improves the CampusVoice platform' },
  ]

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] text-slate-100 font-sans overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[450px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Hero */}
      <section className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About CampusVoice</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 leading-tight tracking-tight mb-6">
          Built for Students, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-300">
            By Students.
          </span>
        </h1>

        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          CampusVoice is a student-first platform under the ComplainBoX initiative,
          designed to make campus grievances heard, tracked, and resolved — without
          the paperwork, the delays, or the fear of speaking up.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 pb-20 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-7 sm:p-8 shadow-xl shadow-black/40 backdrop-blur-xl hover:border-slate-700/80 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2.5">Our Mission</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            To give every student on campus a direct, transparent channel to raise
            concerns — whether about hostels, academics, faculty, or facilities —
            and ensure those concerns actually reach the people who can fix them.
          </p>
        </div>

        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-7 sm:p-8 shadow-xl shadow-black/40 backdrop-blur-xl hover:border-slate-700/80 transition-all group">
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2.5">Our Vision</h3>
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            A campus culture where no complaint goes unheard, where accountability
            is the norm, and where students trust the system enough to speak up
            the moment something feels wrong.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="relative border-y border-slate-800/80 bg-[#0F172A]/40 backdrop-blur-md py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 text-center mb-10 tracking-tight">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-[#090D16]/60 border border-slate-800/80 rounded-2xl p-6 shadow-lg hover:border-slate-700 transition-all group"
              >
                <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-100 mb-2">{title}</h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who's Behind It */}
      <section className="relative max-w-5xl mx-auto px-4 sm:px-6 py-20">
        <div className="flex items-center gap-2.5 justify-center mb-10">
          <Users className="w-5 h-5 text-teal-400" />
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
            Who's Behind CampusVoice
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map(({ role, desc }) => (
            <div
              key={role}
              className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 text-center shadow-lg shadow-black/30 backdrop-blur-xl hover:border-slate-700 transition-all"
            >
              <div className="h-10 w-10 mx-auto mb-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                {role.charAt(0)}
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1.5">{role}</h3>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative max-w-3xl mx-auto text-center px-4 sm:px-6 pb-24">
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-black/50 backdrop-blur-xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 mb-3 tracking-tight">
            Have Something to Say?
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-7 leading-relaxed">
            Don't let an issue go unheard. File your complaint and let's make campus better, together.
          </p>
          <NavLink
            to="/complain"
            className="inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-8 py-3 rounded-xl shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] transition-all cursor-pointer text-sm"
          >
            <span>File a Complaint</span>
            <ArrowRight className="w-4 h-4" />
          </NavLink>
        </div>
      </section>
    </div>
  )
}

export default AboutUs