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
  Radio,
  PlusCircle,
  ShieldCheck,
  AlertCircle
} from "lucide-react";

export default function UserDashboard() {
  const { user, loading } = useAuth();

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] text-slate-100 font-sans overflow-hidden select-none py-10 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
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

      <div className="relative max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Student Banner Card */}
        <div className="bg-gradient-to-r from-[#0F172A] via-[#0D1527] to-[#090D16] border border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xl backdrop-blur-xl">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-teal-400/10 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold text-2xl uppercase shadow-inner shrink-0">
              {user?.username ? user.username.charAt(0) : "S"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/10 text-teal-400 border border-teal-500/20 font-semibold">
                  Verified Student
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {user?.phone ? `+91 ${user.phone}` : "Student Portal"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight capitalize">
                Welcome back, {loading ? "Student" : user?.username || "Student"}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 break-all">
                {user?.email || "Access your campus grievance records and track real-time resolution below."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/complain"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 transition-all active:scale-[0.99] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>File a Complaint</span>
            </Link>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:border-slate-700/80 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Total Submitted</span>
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-100">6</h3>
            <p className="text-[11px] text-teal-400 mt-1 font-medium">Logged across 3 departments</p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:border-slate-700/80 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-sky-400">In Progress</span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-sky-400">2</h3>
            <p className="text-[11px] text-slate-400 mt-1">Assigned to HOD & Hostel Warden</p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 shadow-lg backdrop-blur-xl hover:border-slate-700/80 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-emerald-400">Resolved Successfully</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-emerald-400">4</h3>
            <p className="text-[11px] text-slate-400 mt-1">100% satisfactory resolution rate</p>
          </div>
        </div>

        {/* Active Grievances Section */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-xl backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Active Grievances</h2>
              <p className="text-xs text-slate-400">Current complaints under review or investigation.</p>
            </div>
            <Link
              to="/complaints"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors"
            >
              <span>View Complaint History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3.5">
            {/* Complaint Item 1 */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#090D16]/90 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-teal-400">#CMP-208</span>
                  <span className="text-xs text-slate-400 font-medium">· Hostel & Mess Committee</span>
                  <span className="text-[11px] text-slate-500 font-mono">11 Sep 2026</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100">
                  Hostel Block B 3rd-floor water purifier filtration breakdown
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">
                  Water dispenser dispensing turbid water since yesterday evening. Over 40 students affected.
                </p>
              </div>

              <div className="flex items-center sm:flex-col sm:items-end gap-2 shrink-0">
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-sky-500/10 border border-sky-500/20 text-sky-400">
                  In Progress
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Assigned: Warden Sharma
                </span>
              </div>
            </div>

            {/* Complaint Item 2 */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#090D16]/90 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-slate-700 transition-all">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-teal-400">#CMP-195</span>
                  <span className="text-xs text-slate-400 font-medium">· Academic Affairs</span>
                  <span className="text-[11px] text-slate-500 font-mono">08 Sep 2026</span>
                </div>
                <h3 className="text-sm font-semibold text-slate-100">
                  Computer Graphics lecture attendance discrepancy in portal
                </h3>
                <p className="text-xs text-slate-400 line-clamp-1">
                  Marked absent despite biometrics entry recorded at 10:02 AM.
                </p>
              </div>

              <div className="flex items-center sm:flex-col sm:items-end gap-2 shrink-0">
                <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  Pending Review
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Assigned: HOD Office
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Assistance Banner */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-300 shadow-lg backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0" />
            <span>
              All grievances are cryptographically logged under institutional privacy policies. Need help or have queries?
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/feedback"
              className="text-teal-400 hover:text-teal-300 font-semibold transition-colors flex items-center gap-1"
            >
              <span>Resolution Feedback</span>
              <span>➔</span>
            </Link>
            <span className="text-slate-700">|</span>
            <Link
              to="/contact"
              className="text-teal-400 hover:text-teal-300 font-semibold transition-colors flex items-center gap-1"
            >
              <span>Contact Us</span>
              <span>➔</span>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}