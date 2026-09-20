import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  GraduationCap, 
  ShieldCheck, 
  Mail, 
  Phone, 
  Clock, 
  ArrowUpRight,
  Headphones,
  CheckCircle2
} from 'lucide-react'

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const [pulseData, setPulseData] = useState(() => {
    try {
      const saved = localStorage.getItem('campus_pulse_votes');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return { mess: 86, wifi: 72, hostel: 93, myVote: null, totalVotes: 428 };
  });

  const [voteAnimation, setVoteAnimation] = useState(null);

  const handleVote = (mood) => {
    setPulseData((prev) => {
      let deltaMess = 0;
      let deltaWifi = 0;
      let deltaHostel = 0;

      if (mood === 'great') {
        deltaMess = 1;
        deltaWifi = 1;
        deltaHostel = 1;
      } else if (mood === 'issue') {
        deltaMess = -1;
        deltaWifi = -1;
        deltaHostel = -1;
      }

      const updated = {
        mess: Math.min(99, Math.max(50, prev.mess + deltaMess)),
        wifi: Math.min(99, Math.max(40, prev.wifi + deltaWifi)),
        hostel: Math.min(99, Math.max(60, prev.hostel + deltaHostel)),
        myVote: mood,
        totalVotes: prev.myVote ? prev.totalVotes : prev.totalVotes + 1,
      };
      try {
        localStorage.setItem('campus_pulse_votes', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setVoteAnimation(mood);
    setTimeout(() => setVoteAnimation(null), 2500);
  };

  return (
    <footer className="relative mt-auto bg-[#080C14] border-t border-slate-800/80 text-slate-400 font-sans select-none overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[180px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Footer Grid */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Column 1: Brand & Overview (Spans 2 cols on desktop) */}
          <div className="lg:col-span-2 space-y-4">
            <NavLink to="/" onClick={scrollToTop} className="inline-flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-400 group-hover:scale-105 transition-transform shadow-sm shadow-teal-500/5">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xl font-bold text-slate-100 tracking-tight">
                  Campus<span className="text-teal-400">Voice</span>
                </span>
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Official Grievance Redressal Portal
                </p>
              </div>
            </NavLink>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              An institutional grievance tracking and student welfare portal ensuring transparent, timely, and confidential redressal across all departments.
            </p>

            {/* Portal Operational Status Pill */}
            <div className="pt-1 flex items-center gap-3 flex-wrap">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0F172A] border border-slate-800 text-[11px] text-slate-300 font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                </span>
                <span>College Portal Online</span>
              </div>

              <NavLink
                to="/contact"
                onClick={scrollToTop}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/20 text-[11px] font-semibold text-teal-400 hover:text-teal-300 transition-all"
              >
                <Headphones className="w-3.5 h-3.5" />
                <span>Contact Support</span>
                <ArrowUpRight className="w-3 h-3" />
              </NavLink>
            </div>
          </div>

          {/* Column 2: Today's Campus Pulse & Mood Meter */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Campus Pulse
              </h4>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20 font-semibold">
                Live Vote
              </span>
            </div>

            {/* Live Metrics Bars */}
            <div className="p-3 rounded-xl bg-[#090D16]/90 border border-slate-800/90 space-y-2.5 shadow-inner">
              {/* Mess & Food */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <span>🍕</span>
                    <span>Mess Quality</span>
                  </span>
                  <span className="font-mono text-emerald-400 font-bold">{pulseData.mess}%</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pulseData.mess}%` }}
                  />
                </div>
              </div>

              {/* Campus Wi-Fi */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <span>📶</span>
                    <span>Campus Wi-Fi</span>
                  </span>
                  <span className="font-mono text-teal-400 font-bold">{pulseData.wifi}%</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-teal-500 to-sky-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pulseData.wifi}%` }}
                  />
                </div>
              </div>

              {/* Hostel Facilities */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-300 font-medium flex items-center gap-1.5">
                    <span>💡</span>
                    <span>Hostel Facilities</span>
                  </span>
                  <span className="font-mono text-sky-400 font-bold">{pulseData.hostel}%</span>
                </div>
                <div className="w-full bg-slate-800/80 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-sky-500 to-indigo-400 h-full rounded-full transition-all duration-500"
                    style={{ width: `${pulseData.hostel}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Interactive 1-Click Voting Bar */}
            <div className="space-y-1.5 pt-0.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-medium">How's campus today?</span>
                <span className="text-[10px] font-mono text-slate-500">{pulseData.totalVotes} votes</span>
              </div>

              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => handleVote('great')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                    pulseData.myVote === 'great'
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-md shadow-emerald-500/10'
                      : 'bg-[#090D16] hover:bg-emerald-500/10 border-slate-800 hover:border-emerald-500/40 text-slate-300'
                  }`}
                >
                  <span className="text-sm">😃</span>
                  <span className="text-[11px]">Great</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVote('okay')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                    pulseData.myVote === 'okay'
                      ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-md shadow-amber-500/10'
                      : 'bg-[#090D16] hover:bg-amber-500/10 border-slate-800 hover:border-amber-500/40 text-slate-300'
                  }`}
                >
                  <span className="text-sm">😐</span>
                  <span className="text-[11px]">Okay</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVote('issue')}
                  className={`py-1.5 px-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer border ${
                    pulseData.myVote === 'issue'
                      ? 'bg-red-500/20 border-red-400 text-red-300 shadow-md shadow-red-500/10'
                      : 'bg-[#090D16] hover:bg-red-500/10 border-slate-800 hover:border-red-500/40 text-slate-300'
                  }`}
                >
                  <span className="text-sm">😠</span>
                  <span className="text-[11px]">Issue</span>
                </button>
              </div>

              {voteAnimation && (
                <div className="text-[10px] text-emerald-400 font-semibold text-center flex items-center justify-center gap-1 animate-in fade-in duration-200">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Vote recorded! Live pulse updated.</span>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Cell Categories */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Cell Categories
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-400">
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Hostel & Mess Committee</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Academic & Labs Cell</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Anti-Ragging Squad</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Campus Infrastructure</span>
              </li>
              <li className="flex items-center gap-2 hover:text-slate-200 transition-colors">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-400/60" />
                <span>Student Welfare & Rights</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Immediate Help & Security */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Immediate Help
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-2.5 text-slate-300 hover:text-teal-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                <span>+91 98765 43210</span>
              </a>

              <a 
                href="mailto:support@campusvoice.edu" 
                className="flex items-center gap-2.5 text-slate-300 hover:text-teal-400 transition-colors"
              >
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-teal-400 shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                <span className="truncate">support@campusvoice.edu</span>
              </a>

              <div className="flex items-center gap-2.5 text-slate-400">
                <div className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shrink-0">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span>Mon–Fri: 9:00 AM – 5:00 PM</span>
              </div>

              {/* Encryption & Integrity Trust Card */}
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-[#0F172A]/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5 shadow-sm">
                  <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                  <p className="leading-snug text-slate-300">
                    Encrypted submissions & confidential audit logging enabled.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Institutional Policies */}
        <div className="mt-12 pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} CampusVoice Redressal Portal. All rights reserved.</p>

          <div className="flex items-center gap-5 flex-wrap justify-center text-xs">
            <NavLink to="/about" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">About Us</NavLink>
            <span className="text-slate-800">·</span>
            <NavLink to="/faq" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">FAQs</NavLink>
            <span className="text-slate-800">·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Student Charter</span>
            <span className="text-slate-800">·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Guidelines</span>
            <span className="text-slate-800">·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Whistleblower Policy</span>
            <span className="text-slate-800">·</span>
            <NavLink to="/contact" onClick={scrollToTop} className="hover:text-teal-400 transition-colors">Contact</NavLink>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer