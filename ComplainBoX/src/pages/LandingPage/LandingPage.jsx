import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  Megaphone, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  CheckCircle2, 
  Building2,
  Lock,
  ChevronDown,
  HelpCircle,
  Send,
  Loader2,
  Wifi,
  BookOpen,
  Utensils,
  Layers,
  Phone,
  Mail,
  MapPin,
  Check
} from 'lucide-react'
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'

export default function LandingPage() {
  const { user, isAuthenticated, isAdmin } = useAuth()

  // State for interactive FAQ accordion
  const [openFaq, setOpenFaq] = useState(0)

  // Interactive Live Demo for Students
  const [activeDemo, setActiveDemo] = useState(0)
  const demoComplaints = [
    {
      tab: '🛏️ Hostel Room',
      category: 'Hostel Maintenance',
      title: 'Geyser Not Heating & Water Flow Issue',
      location: 'Hostel Block B · Room 204',
      officer: 'Warden Office',
      status: 'Fixed & Verified',
      time: 'Resolved in 3h',
      color: 'emerald',
      step1: 'Student logs issue in 30 seconds with room number',
      step2: 'Electrician dispatched by Warden at 10 AM',
      step3: 'Heating valve replaced and water tested hot',
      note: 'Warden verified hot water restored on all floors.',
    },
    {
      tab: '📶 Campus Wi-Fi',
      category: 'IT Helpdesk',
      title: 'Library Reading Hall Wi-Fi Down',
      location: 'Central Library · 2nd Floor',
      officer: 'Campus IT Team',
      status: 'Fixed & Verified',
      time: 'Resolved in 1h',
      color: 'emerald',
      step1: 'Student reports signal drop directly from phone',
      step2: 'Network team reboots access point & router',
      step3: '100 Mbps high-speed internet back online',
      note: 'Loose patch cable re-crimped and speed tested.',
    },
    {
      tab: '🍽️ Mess & Canteen',
      category: 'Mess Committee',
      title: 'Drinking Water Purifier Filter Service',
      location: 'Dining Hall · Cooler 2',
      officer: 'Mess In-Charge',
      status: 'Under Action',
      time: 'In Progress Today',
      color: 'amber',
      step1: 'Students request standard filter replacement',
      step2: 'RO service technician called to campus',
      step3: 'Fresh pre-filters and membranes being fitted',
      note: 'Technician on-site today replacing filter cartridges.',
    },
    {
      tab: '🔬 Labs & Classes',
      category: 'Academic Cell',
      title: 'Computer Lab 3 Projector Flickering',
      location: 'CS Department · Lab 3',
      officer: 'Lab Assistant',
      status: 'Fixed & Verified',
      time: 'Resolved in 2h',
      color: 'emerald',
      step1: 'Student reports display glitch during lab session',
      step2: 'Staff tests HDMI cable and projector port',
      step3: 'HDMI splitter replaced with a brand new unit',
      note: 'All student monitors and projection tested clear.',
    },
  ]

  // State for Contact Quick-Form
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })
  const [isSending, setIsSending] = useState(false)

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    if (!contactForm.name.trim() || !contactForm.email.trim() || !contactForm.message.trim()) {
      toast.error('Please fill in all contact fields')
      return
    }
    setIsSending(true)
    await new Promise((res) => setTimeout(res, 800))
    setIsSending(false)
    toast.success('Your message has been sent to the Help Desk!')
    setContactForm({ name: '', email: '', message: '' })
  }

  const stats = [
    { value: '500+', label: 'Complaints Resolved', highlight: false },
    { value: '< 24h', label: 'Average Response Time', highlight: true },
    { value: '100%', label: 'Confidentiality Guaranteed', highlight: false },
    { value: '24/7', label: 'Campus Redressal', highlight: true },
  ]

  const categories = [
    {
      icon: Utensils,
      title: 'Hostel & Mess',
      desc: 'Hygiene standards, water supply, room maintenance & meal quality issues.',
      badge: 'Active Cell'
    },
    {
      icon: BookOpen,
      title: 'Academics & Faculty',
      desc: 'Attendance discrepancies, exam scheduling, course material & syllabus queries.',
      badge: 'Direct HOD'
    },
    {
      icon: Wifi,
      title: 'Campus IT & Wi-Fi',
      desc: 'Library network downtime, portal access glitches & computer lab equipment.',
      badge: 'IT Desk'
    },
    {
      icon: Building2,
      title: 'Infrastructure & Labs',
      desc: 'Classroom projectors, electrical repairs, ventilation & lab instrument faults.',
      badge: 'Maintenance'
    },
    {
      icon: ShieldCheck,
      title: 'Anti-Ragging Squad',
      desc: 'Immediate, zero-tolerance reporting with encrypted student identity protection.',
      badge: 'Priority 1'
    },
    {
      icon: Layers,
      title: 'General Affairs',
      desc: 'Campus transport, sports facilities, library books & administration queries.',
      badge: 'Admin Cell'
    },
  ]

  const steps = [
    {
      step: '01',
      title: 'Submit Grievance',
      desc: 'Select your department, detail the issue, and choose between confidential or verified filing.'
    },
    {
      step: '02',
      title: 'Automated Dispatch',
      desc: 'Smart routing sends instant email alerts via Brevo to the designated committee or department head.'
    },
    {
      step: '03',
      title: 'Real-Time Resolution',
      desc: 'Track status updates on your dashboard from Pending to In Progress and final Resolution.'
    }
  ]

  const faqs = [
    {
      q: 'Can administrators identify who submitted a complaint?',
      a: 'If you choose to submit anonymously, personal identifying markers like your email and phone number are stripped from the department officer complaint record. Only the grievance content and academic department are shared.'
    },
    {
      q: 'How fast will my complaint be reviewed?',
      a: 'Initial confirmations are sent instantly to your registered email. Assigned department officers review complaints within 24–48 working hours, and urgent safety matters are flagged for immediate intervention.'
    },
    {
      q: 'What happens after an issue is marked resolved?',
      a: 'You will receive an email notification and can rate your resolution experience via our student Feedback system. If an issue is not solved satisfactorily, you can appeal or open a follow-up complaint.'
    },
    {
      q: 'Who has access to the student grievance portal?',
      a: 'Only enrolled students with verified institutional accounts can submit complaints and view their personal grievance history.'
    }
  ]

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] text-slate-100 font-sans flex flex-col overflow-hidden select-none">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[400px] bg-teal-500/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[350px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[350px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Subtle Matrix / Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <main className="relative flex-1">
        
        {/* ================= HERO SECTION ================= */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-20 pb-16 text-center">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium mb-8 backdrop-blur-md shadow-sm shadow-teal-500/10 animate-in fade-in slide-in-from-top-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span>Student Grievance & Redressal Redefined · CampusVoice</span>
          </div>

          {/* Hero Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-100 leading-[1.12] tracking-tight mb-6 max-w-4xl mx-auto">
            Empowering Student Voices, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-teal-200">
              Accelerating Campus Change.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-400 text-sm sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            A transparent, confidential platform connecting students directly with department heads, hostel wardens, and administrative committees. No paperwork. No delays.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto sm:max-w-none mb-14">
            {isAuthenticated ? (
              <>
                <NavLink
                  to={isAdmin ? '/adminhome' : '/userhome'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-7 py-3 rounded-xl shadow-lg shadow-teal-400/20 hover:shadow-teal-400/30 active:scale-[0.99] transition-all cursor-pointer text-sm"
                >
                  <span>Go to Dashboard</span>
                  <span className="text-xs bg-slate-950/15 px-2 py-0.5 rounded-md font-mono">({user?.username})</span>
                  <ArrowRight className="w-4 h-4" />
                </NavLink>

                <NavLink
                  to="/complaints"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0F172A]/90 hover:bg-slate-800/90 text-slate-200 font-semibold px-7 py-3 rounded-xl border border-slate-800 hover:border-slate-700 shadow-md transition-all cursor-pointer text-sm"
                >
                  <span>Complaint History</span>
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-teal-400 to-teal-300 hover:from-teal-300 hover:to-teal-200 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-400/20 hover:shadow-teal-400/30 active:scale-[0.99] transition-all cursor-pointer text-sm"
              >
                <span>Student Sign In / Register</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            )}
          </div>

          {/* Interactive Live Demo Showcase for Students */}
          <div className="max-w-3xl mx-auto bg-[#0A0F1D]/90 border border-slate-800/90 rounded-2xl p-5 sm:p-6 shadow-2xl shadow-black/90 backdrop-blur-2xl text-left relative overflow-hidden group hover:border-slate-700/90 transition-all">
            {/* Ambient inner card glow */}
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-96 h-24 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Window Top Controls & Status */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3.5 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-semibold text-slate-300 ml-1">
                  Live Resolution Workflow
                </span>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>College Portal Online</span>
              </div>
            </div>

            {/* Interactive Scenario Buttons */}
            <div className="mb-5">
              <p className="text-[11px] text-slate-400 font-medium mb-2.5">
                Select a category to see how complaints are resolved step-by-step:
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {demoComplaints.map((item, idx) => {
                  const isSelected = activeDemo === idx
                  return (
                    <button
                      key={item.tab}
                      type="button"
                      onClick={() => setActiveDemo(idx)}
                      className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-center cursor-pointer border ${
                        isSelected
                          ? 'bg-teal-400 text-slate-950 border-teal-300 shadow-md shadow-teal-400/20 scale-[1.02]'
                          : 'bg-[#0F172A]/80 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-800'
                      }`}
                    >
                      {item.tab}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Dynamic Active Complaint Details */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-800/60 pt-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-xs">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-teal-500/10 text-teal-400 border border-teal-500/20">
                      {demoComplaints[activeDemo].category}
                    </span>
                    <span className="text-slate-500 font-mono text-xs">·</span>
                    <span className="text-xs text-slate-400 font-mono">
                      📍 {demoComplaints[activeDemo].location}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight">
                    {demoComplaints[activeDemo].title}
                  </h3>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end gap-1 shrink-0">
                  <span
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                      demoComplaints[activeDemo].color === 'emerald'
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/10'
                        : 'bg-amber-500/10 border border-amber-500/20 text-amber-400 shadow-sm shadow-amber-500/10'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {demoComplaints[activeDemo].status}
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {demoComplaints[activeDemo].time}
                  </span>
                </div>
              </div>

              {/* 3 Simple Action Steps */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#0F172A]/70 border border-slate-800/80">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    1
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">You Report Online</p>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      {demoComplaints[activeDemo].step1}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-teal-500/20 border border-teal-500/40 text-teal-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    2
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">Staff Dispatched</p>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      {demoComplaints[activeDemo].step2}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                    ✓
                  </div>
                  <div>
                    <p className="text-xs font-bold text-emerald-400">Issue Resolved</p>
                    <p className="text-[11px] text-slate-400 leading-snug mt-0.5">
                      {demoComplaints[activeDemo].step3}
                    </p>
                  </div>
                </div>
              </div>

              {/* Official Remark Callout */}
              <div className="flex items-center justify-between gap-3 text-xs text-slate-400 px-1 pt-1">
                <div className="flex items-center gap-2 truncate">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="truncate text-slate-300">
                    <span className="text-teal-400 font-semibold">
                      {demoComplaints[activeDemo].officer}:
                    </span>{' '}
                    "{demoComplaints[activeDemo].note}"
                  </span>
                </div>
                <span className="shrink-0 text-[10px] font-mono text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/20">
                  100% Private
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ================= STATS / TRUST STRIP ================= */}
        <section className="border-y border-slate-800/80 bg-[#0F172A]/40 backdrop-blur-md">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-10 text-center">
            {stats.map((s, idx) => (
              <div key={idx} className="space-y-1">
                <p className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${s.highlight ? 'text-teal-400' : 'text-slate-100'}`}>
                  {s.value}
                </p>
                <p className="text-slate-400 text-xs sm:text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section id="how-it-works" className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Simple 3-Step Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-3">
              How CampusVoice Works
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Designed from the ground up to eliminate bureaucracy and ensure transparent accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="relative bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl p-7 shadow-xl shadow-black/40 backdrop-blur-xl hover:border-slate-700 transition-all group"
              >
                <span className="text-4xl font-black text-slate-800 group-hover:text-teal-500/30 transition-colors font-mono">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-4 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ================= CATEGORIES SECTION ================= */}
        <section className="border-t border-slate-800/80 bg-[#090D16]/50 py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
                <Building2 className="w-3.5 h-3.5" />
                <span>Coverage Across Campus</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-3">
                Designated Grievance Cells
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Complaints are routed automatically to verified department administrators for immediate action.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat, idx) => {
                const Icon = cat.icon
                return (
                  <div
                    key={idx}
                    className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 shadow-xl shadow-black/40 backdrop-blur-xl hover:border-slate-700/80 transition-all group"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700/60">
                        {cat.badge}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-100 mb-1.5">
                      {cat.title}
                    </h3>
                    <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================= PLATFORM PILLARS / FEATURES ================= */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-4">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero Retaliation Guarantee</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-4">
                A Secure Channel Where Your Identity Stays Protected.
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Students often fear academic consequences or faculty pushback when speaking up. CampusVoice is engineered with cryptographic anonymity, strict authorization safeguards, and auditable response timelines.
              </p>

              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Instant transactional receipts sent directly via institutional mail.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Automatic SLA escalation if a complaint is not reviewed within 48 hours.</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-md bg-teal-500/10 text-teal-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span>Direct post-resolution feedback loop with star ratings and reviews.</span>
                </div>
              </div>
            </div>

            <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/60 backdrop-blur-xl">
              <h3 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Lock className="w-4 h-4 text-teal-400" />
                <span>Student Protection Principles</span>
              </h3>
              <div className="space-y-4 text-xs sm:text-sm text-slate-400">
                <div className="p-4 rounded-xl bg-[#090D16]/60 border border-slate-800/80">
                  <p className="font-semibold text-slate-200 mb-1">Confidential Submissions</p>
                  <p>Department officers only receive the necessary context to resolve issues without student profile exposure.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#090D16]/60 border border-slate-800/80">
                  <p className="font-semibold text-slate-200 mb-1">Authenticated Verification</p>
                  <p>OTP-verified campus email authentication prevents spam, spoofing, and malicious reports.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#090D16]/60 border border-slate-800/80">
                  <p className="font-semibold text-slate-200 mb-1">Permanent Audit Trail</p>
                  <p>Every status update and comment is permanently recorded in the redressal log.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section id="faq" className="border-t border-slate-800/80 bg-[#090D16]/40 py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Frequently Asked Questions</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 tracking-tight mb-2">
                Got Questions? We Have Answers.
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm">
                Common inquiries regarding identity confidentiality, escalation timelines, and cell routing.
              </p>
            </div>

            {/* Interactive Accordion */}
            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx
                return (
                  <div
                    key={faq.q}
                    className="border border-slate-800 rounded-2xl bg-[#0F172A]/70 overflow-hidden transition-all duration-200"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                      className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-slate-200 hover:text-teal-400 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-500 shrink-0 ml-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-400' : ''
                          }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/60 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ================= CONTACT / HELP DESK SECTION ================= */}
        <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-2">
                <Phone className="w-3.5 h-3.5" />
                <span>Student Affairs Help Desk</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                Need Non-Grievance Assistance?
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                For general queries, portal feedback, or technical support, get in touch with our campus student committee.
              </p>

              <div className="space-y-3 pt-3">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-400 shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Official Support Email</p>
                    <p className="font-semibold">support@campusvoice.edu</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-400 shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Helpline Office</p>
                    <p className="font-semibold">+91 98765 43210 (9 AM - 5 PM)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-300">
                  <div className="w-9 h-9 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-teal-400 shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-500">Location</p>
                    <p className="font-semibold">Student Affairs Desk, Admin Block</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:col-span-3 bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/50 backdrop-blur-xl">
              <h3 className="text-base font-bold text-slate-100 mb-1">
                Send a Quick Inquiry
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Our support team typically responds within 24 hours.
              </p>

              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2 px-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Campus Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="student@campus.edu"
                      className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2 px-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                  <textarea
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="How can our student grievance team assist you?..."
                    className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2 px-3.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold text-xs sm:text-sm rounded-xl py-2.5 transition-all shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* ================= FINAL CALL TO ACTION ================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24 text-center">
          <div className="bg-gradient-to-b from-[#0F172A] to-[#090D16] border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-black/80 backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight mb-3">
              Ready to Drive Real Change on Campus?
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Join hundreds of students holding campus facilities and academic administration accountable.
            </p>
            <NavLink
              to="/complain"
              className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-teal-400/20 hover:shadow-teal-400/30 active:scale-[0.99] transition-all cursor-pointer text-sm"
            >
              <span>Submit Your Complaint Now</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </section>

      </main>
    </div>
  )
}