import { NavLink } from 'react-router-dom'
import {
  GraduationCap,
  ShieldCheck,
  Mail,
  Phone,
  Clock,
  ArrowUpRight,
  Headphones
} from 'lucide-react'

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative mt-auto bg-white border-t border-gray-200 text-gray-600 font-sans select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-175 h-45 bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Footer Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

          {/* Column 1: Brand & Overview (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <NavLink to="/" onClick={scrollToTop} className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-600 group-hover:scale-105 transition-transform shadow-sm">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900 tracking-tight">
                  Campus<span className="text-teal-600">Voice</span>
                </span>
                <p className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
                  Official Grievance Redressal Portal
                </p>
              </div>
            </NavLink>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm">
              An institutional grievance tracking and student welfare portal ensuring transparent, timely, and confidential redressal across all departments.
            </p>

            {/* Portal Operational Status Pill */}
            <div className="pt-1 flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-gray-300 text-[11px] text-gray-700 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
                </span>
                <span>College Portal Online</span>
              </div>

              <NavLink
                to="/contact"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-100 hover:bg-teal-200 border border-teal-300 text-[11px] font-semibold text-teal-600 hover:text-teal-700 transition-all"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Contact Support</span>
                <ArrowUpRight className="w-3 h-3" />
              </NavLink>
            </div>
          </div>


          {/* Column 3: Cell Categories */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Cell Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600">
              <li className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <span>Hostel & Mess Committee</span>
              </li>
              <li className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <span>Academic & Labs Cell</span>
              </li>
              <li className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <span>Anti-Ragging Squad</span>
              </li>
              <li className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <span>Campus Infrastructure</span>
              </li>
              <li className="flex items-center gap-2 hover:text-gray-900 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
                <span>Student Welfare & Rights</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Immediate Help & Security */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Immediate Help
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 text-gray-700 hover:text-teal-600 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-600 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 52458 45895</span>
              </a>

              <a
                href="mailto:support@campusvoice.edu"
                className="flex items-center gap-2.5 text-gray-700 hover:text-teal-600 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-600 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">support@campusvoice.edu</span>
              </a>

              <div className="flex items-center gap-2.5 text-gray-700">
                <div className="w-7 h-7 rounded-lg bg-teal-100 border border-teal-300 flex items-center justify-center text-teal-600 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>Mon–Fri: 9:00 AM – 5:00 PM</span>
              </div>

              {/* Encryption & Integrity Trust Card */}
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-white border border-teal-200 text-[11px] text-gray-700 flex items-start gap-2.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <p className="leading-snug text-gray-800">
                    Encrypted submissions & confidential audit logging enabled.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Institutional Policies */}
        <div className="mt-12 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} CampusVoice Redressal Portal. All rights reserved.</p>

          <div className="flex items-center gap-5 flex-wrap justify-center text-xs">
            <NavLink to="/about" onClick={scrollToTop} className="hover:text-teal-600 transition-colors">About Us</NavLink>
            <span className="text-gray-300">·</span>
            <NavLink to="/faq" onClick={scrollToTop} className="hover:text-teal-600 transition-colors">FAQs</NavLink>
            <span className="text-gray-300">·</span>
            <span className="hover:text-gray-700 transition-colors cursor-pointer">Student Charter</span>
            <span className="text-gray-300">·</span>
            <span className="hover:text-gray-700 transition-colors cursor-pointer">Privacy Guidelines</span>
            <span className="text-gray-300">·</span>
            <span className="hover:text-gray-700 transition-colors cursor-pointer">Whistleblower Policy</span>
            <span className="text-gray-300">·</span>
            <NavLink to="/contact" onClick={scrollToTop} className="hover:text-teal-600 transition-colors">Contact</NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer