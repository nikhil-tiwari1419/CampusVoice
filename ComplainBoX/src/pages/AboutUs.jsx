import React from 'react'
import { NavLink } from 'react-router-dom'
import { Target, Eye, ShieldCheck, Users, MessageSquareText, TrendingUp } from 'lucide-react'

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="max-w-4xl mx-auto text-center px-6 py-20">
        <span className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1 rounded-full mb-4">
          About CampusVoice
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
          Built for Students, <br /> By Students.
        </h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">
          CampusVoice is a student-first platform under the ComplainBoX initiative,
          designed to make campus grievances heard, tracked, and resolved — without
          the paperwork, the delays, or the fear of speaking up.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-5xl mx-auto px-6 pb-16 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow p-8">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
            <Target className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Mission</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            To give every student on campus a direct, transparent channel to raise
            concerns — whether about hostels, academics, faculty, or facilities —
            and ensure those concerns actually reach the people who can fix them.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-8">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
            <Eye className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Our Vision</h3>
          <p className="text-gray-500 text-sm leading-relaxed">
            A campus culture where no complaint goes unheard, where accountability
            is the norm, and where students trust the system enough to speak up
            the moment something feels wrong.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white border-y border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-10">
            What We Stand For
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-md transition"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-500 text-sm">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who's Behind It */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center gap-2 justify-center mb-10">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Who's Behind CampusVoice
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {team.map(({ role, desc }) => (
            <div
              key={role}
              className="bg-white rounded-2xl shadow p-6 text-center hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{role}</h3>
              <p className="text-gray-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto text-center px-6 pb-24">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Have Something to Say?
        </h2>
        <p className="text-gray-500 mb-8">
          Don't let an issue go unheard. File your complaint and let's make campus better, together.
        </p>
        <NavLink
          to="/complain"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-xl shadow transition"
        >
          File a Complaint
        </NavLink>
      </section>
    </div>
  )
}

export default AboutUs