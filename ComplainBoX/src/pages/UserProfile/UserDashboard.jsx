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
    <div className="relative min-h-screen w-full bg-white text-slate-900 font-sans overflow-hidden select-none py-10 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-50/40 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-teal-50/40 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto space-y-8">

        {/* Welcome Student Banner Card */}
        <div className="bg-gradient-to-r from-white via-slate-50 to-blue-50 border border-slate-200 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-lg shadow-slate-200/40 backdrop-blur-xl">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-teal-100 to-teal-50 border border-teal-200 text-teal-700 flex items-center justify-center font-bold text-2xl uppercase shadow-md shrink-0">
              {user?.username ? user.username.charAt(0) : "S"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-100 text-teal-700 border border-teal-200 font-semibold">
                  Verified Student
                </span>
                <span className="text-xs text-slate-600 font-mono">
                  {user?.phone ? `+91 ${user.phone}` : "Student Portal"}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight capitalize">
                Welcome back, {loading ? "Student" : user?.username || "Student"}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 break-all">
                {user?.email || "Access your campus grievance records and track real-time resolution below."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Link
              to="/complain"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-600/20 hover:shadow-teal-600/30 transition-all active:scale-[0.99] cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>File a Complaint</span>
            </Link>
          </div>
        </div>

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-600">Total Submitted</span>
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900"></h3>
            <p className="text-[11px] text-teal-700 mt-1 font-medium">Logged across 2 programs</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-sky-700">In Progress</span>
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-sky-700"></h3>
            <p className="text-[11px] text-slate-600 mt-1">Assigned to HOD & Hostel Warden</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-emerald-700">Resolved Successfully</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-emerald-700"></h3>
            <p className="text-[11px] text-slate-600 mt-1">100% satisfactory resolution rate</p>
          </div>
        </div>


        {/* Quick Action Assistance Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700 shadow-md shadow-slate-200/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
            <span>
              All grievances are cryptographically logged under institutional privacy policies. Need help or have queries?
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/feedback"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors flex items-center gap-1"
            >
              <span>Resolution Feedback</span>
              <span>➔</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              to="/contact"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors flex items-center gap-1"
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