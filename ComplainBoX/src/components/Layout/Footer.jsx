import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  GraduationCap, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Clock, 
  Heart,
  ExternalLink
} from 'lucide-react'

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }


  return (
    <footer className="relative mt-auto bg-[#080C14] border-t border-slate-800/80 text-slate-400 font-sans select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[180px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Column 1: Brand, Status & Social Links (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <NavLink to="/" onClick={scrollToTop} className="inline-flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-slate-100 tracking-tight">
                Campus<span className="text-teal-400">Voice</span>
              </span>
            </NavLink>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              The official confidential grievance redressal and resolution platform under the ComplainBoX initiative. Empowering student voices with transparent tracking.
            </p>

            {/* Portal Operational Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#0F172A] border border-slate-800 text-[11px] text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <span>All Redressal Cells Operational</span>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2.5">
                Connect With Us
              </p>

            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <NavLink 
                  to="/" 
                  onClick={scrollToTop}
                  className="hover:text-teal-400 hover:translate-x-1 inline-flex items-center transition-all"
                >
                  Home Portal
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/complain" 
                  onClick={scrollToTop}
                  className="hover:text-teal-400 hover:translate-x-1 inline-flex items-center transition-all"
                >
                  File Complaint
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  onClick={scrollToTop}
                  className="hover:text-teal-400 hover:translate-x-1 inline-flex items-center transition-all"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contact" 
                  onClick={scrollToTop}
                  className="hover:text-teal-400 hover:translate-x-1 inline-flex items-center transition-all"
                >
                  Help Desk
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Column 3: Redressal Categories */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Cell Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li className="hover:text-slate-200 transition-colors">Hostel & Mess Committee</li>
              <li className="hover:text-slate-200 transition-colors">Academic & Labs Cell</li>
              <li className="hover:text-slate-200 transition-colors">Anti-Ragging Squad</li>
              <li className="hover:text-slate-200 transition-colors">Campus Infrastructure</li>
              <li className="hover:text-slate-200 transition-colors">Equal Opportunity Cell</li>
            </ul>
          </div>

          {/* Column 4: Immediate Help */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Immediate Help
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                <span className="truncate">support@campusvoice.edu</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Mon–Fri: 9AM – 5PM</span>
              </div>
              <div className="pt-2">
                <div className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>Submissions are encrypted and logged safely.</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CampusVoice · ComplainBoX. All rights reserved.</p>

          <div className="flex items-center gap-5">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Student Charter</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Guidelines</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Whistleblower Policy</span>
          </div>

          <p className="flex items-center gap-1">
            Built with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for the student body
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer