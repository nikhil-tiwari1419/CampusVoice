import React from "react";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Sparkles, 
  Building2, 
  Calendar, 
  UserCheck,
  Radio
} from "lucide-react";

function Home() {
  const { user, loading } = useAuth();

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] text-slate-100 font-sans overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-14 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium mb-6 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Student Grievance & Redressal System</span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-100 tracking-tight mb-5">
          Complaint Box Portal
        </h1>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-8 leading-relaxed">
          Your voice matters. Raise your concerns, track resolution milestones in real time, and help us build an accountable campus community.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5">
          <Link
            to="/complain"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 px-6 py-3 rounded-xl font-semibold text-sm shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] transition-all cursor-pointer"
          >
            <span>File a Complaint</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to="/about"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#0F172A]/80 hover:bg-slate-800/80 text-slate-200 px-6 py-3 rounded-xl font-semibold text-sm border border-slate-800 hover:border-slate-700 shadow-sm transition-all cursor-pointer"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Profile Card */}
          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40 backdrop-blur-xl flex items-center justify-between hover:border-slate-700/80 transition-all">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
                </span>
                <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Authenticated Student</p>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-slate-100 capitalize">
                Hi, {loading ? "Loading..." : user?.username || "Student"}
              </h2>

              <p className="text-xs sm:text-sm text-slate-400 mt-2 break-all max-w-xs">
                {user?.email || "Check your complaint updates below."}
              </p>
            </div>

            <div className="h-16 w-16 sm:h-18 sm:w-18 shrink-0 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-teal-400/10 border border-teal-500/30 text-teal-300 flex items-center justify-center text-2xl font-bold uppercase shadow-inner">
              {user?.username ? user.username.charAt(0) : "U"}
            </div>
          </div>

          {/* Complaint Status Card */}
          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40 backdrop-blur-xl hover:border-slate-700/80 transition-all">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg sm:text-xl font-bold text-slate-100">
                Latest Complaint
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-500">
                <Radio className="w-3 h-3 text-teal-400 animate-pulse" /> Active Ticket
              </span>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm">
              <li className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                <span className="text-slate-400 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-slate-500" /> Raised Issue
                </span>
                <span className="font-semibold text-teal-400">
                  Library Wi-Fi
                </span>
              </li>

              <li className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                <span className="text-slate-400 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" /> Date
                </span>
                <span className="font-mono text-slate-300">18 Aug 2026</span>
              </li>

              <li className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                <span className="text-slate-400 flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-500" /> Department
                </span>
                <span className="text-slate-200">IT Department</span>
              </li>

              <li className="flex items-center justify-between border-b border-slate-800/60 pb-2.5">
                <span className="text-slate-400 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-slate-500" /> HOD
                </span>
                <span className="text-slate-200">Dr. Sharma</span>
              </li>

              <li className="flex items-center justify-between pt-1">
                <span className="text-slate-400">Status</span>
                <span className="bg-sky-500/10 border border-sky-500/20 text-sky-400 px-3 py-1 rounded-lg text-xs font-semibold">
                  In Progress
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg shadow-black/40 backdrop-blur-xl text-center hover:border-slate-700/80 transition-all">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-bold text-slate-100">12</h3>
            <p className="text-slate-400 text-xs mt-1.5 font-medium">Complaints Raised</p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg shadow-black/40 backdrop-blur-xl text-center hover:border-slate-700/80 transition-all">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-bold text-teal-400">8</h3>
            <p className="text-slate-400 text-xs mt-1.5 font-medium">Resolved</p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg shadow-black/40 backdrop-blur-xl text-center hover:border-slate-700/80 transition-all">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-3xl font-bold text-amber-400">4</h3>
            <p className="text-slate-400 text-xs mt-1.5 font-medium">Pending</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;