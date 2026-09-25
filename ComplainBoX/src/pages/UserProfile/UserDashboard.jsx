import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Link } from "react-router-dom";
import { getComplain } from "../../api/user";
import {
  FileText,
  CheckCircle2,
  Clock,
  ArrowRight,
  Building2,
  Calendar,
  PlusCircle,
  ShieldCheck,
  AlertCircle,
  Loader2,
  UserCheck,
} from "lucide-react";

export default function UserDashboard() {
  const { user, loading } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [fetchingStats, setFetchingStats] = useState(true);
  const [profileIncomplete, setProfileIncomplete] = useState(false);

  useEffect(() => {
    async function loadStudentComplaints() {
      setFetchingStats(true);
      try {
        const result = await getComplain();
        const list = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : [];
        setComplaints(list);
      } catch (err) {
        if (err.response?.status === 403) {
          setProfileIncomplete(true);
        }
        setComplaints([]);
      } finally {
        setFetchingStats(false);
      }
    }

    loadStudentComplaints();
  }, []);

  const totalSubmitted = complaints.length;
  const resolvedCount = complaints.filter((c) => c.status === "resolved").length;
  const inProgressCount = complaints.filter((c) => c.status !== "resolved").length;
  const resolutionRate =
    totalSubmitted > 0 ? Math.round((resolvedCount / totalSubmitted) * 100) : 100;

  const recentComplaints = complaints.slice(0, 3);

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
                Welcome back, {loading ? "Student" : (user?.username || "Student").replace(/_/g, " ")}!
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

        {/* Profile Setup Reminder Banner (if profile not yet completed) */}
        {profileIncomplete && (
          <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-amber-900">
                  Complete Your Academic Profile
                </h4>
                <p className="text-xs text-amber-700 mt-0.5">
                  Please lock your Program, Branch, and Semester details to submit and view batch grievances.
                </p>
              </div>
            </div>
            <Link
              to="/userprofile"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shrink-0 transition-all"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Complete Profile</span>
            </Link>
          </div>
        )}

        {/* Quick Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-600">Total Submitted</span>
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900">
              {fetchingStats ? "—" : totalSubmitted}
            </h3>
            <p className="text-[11px] text-teal-700 mt-1 font-medium">
              Logged in your academic batch
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-sky-700">In Progress</span>
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-sky-700">
              {fetchingStats ? "—" : inProgressCount}
            </h3>
            <p className="text-[11px] text-slate-600 mt-1">Assigned to HOD & Hostel Warden</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-emerald-700">Resolved Successfully</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-emerald-700">
              {fetchingStats ? "—" : resolvedCount}
            </h3>
            <p className="text-[11px] text-slate-600 mt-1">
              {fetchingStats ? "Calculating..." : `${resolutionRate}% satisfactory resolution rate`}
            </p>
          </div>
        </div>

        {/* Recent Grievances Preview */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base font-bold text-slate-900">Recent Batch Grievances</h2>
              <p className="text-xs text-slate-500">
                Latest issues reported in your academic batch
              </p>
            </div>
            <Link
              to="/allstudentcomplain"
              className="text-xs font-semibold text-teal-600 hover:text-teal-700 inline-flex items-center gap-1"
            >
              <span>View All Complaints</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {fetchingStats ? (
            <div className="py-10 flex flex-col items-center justify-center gap-2 text-slate-500">
              <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
              <span className="text-xs">Loading recent activity...</span>
            </div>
          ) : recentComplaints.length === 0 ? (
            <div className="py-10 text-center space-y-2">
              <FileText className="w-8 h-8 mx-auto text-slate-300" />
              <p className="text-xs font-semibold text-slate-700">No complaints recorded yet</p>
              <p className="text-[11px] text-slate-500">
                Have a concern about academics, hostel, or infrastructure? File your first grievance above.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentComplaints.map((c) => {
                const isResolved = c.status === "resolved";
                const isRead = c.status === "read";
                const statusLabel = isResolved
                  ? "Resolved"
                  : isRead
                    ? "In Progress"
                    : "Pending";
                const statusStyle = isResolved
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-700"
                  : isRead
                    ? "bg-sky-500/10 border-sky-500/20 text-sky-700"
                    : "bg-amber-500/10 border-amber-500/20 text-amber-700";

                return (
                  <div
                    key={c._id}
                    className="p-3.5 rounded-xl border border-slate-200/80 hover:border-slate-300 bg-slate-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap text-[11px] text-slate-500">
                        <span className="font-mono font-bold text-teal-700">
                          #{String(c._id).slice(-6).toUpperCase()}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1">
                          <Building2 className="w-3 h-3" />
                          {c.batch?.branch?.name || c.batch?.program?.name || "Campus Cell"}
                        </span>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1 font-mono">
                          <Calendar className="w-3 h-3" />
                          {new Date(c.createdAt || Date.now()).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                        {c.subject || "General Grievance"}
                      </p>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold border shrink-0 self-start sm:self-center ${statusStyle}`}
                    >
                      {isResolved ? (
                        <CheckCircle2 className="w-3 h-3" />
                      ) : (
                        <Clock className="w-3 h-3" />
                      )}
                      {statusLabel}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
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
              to="/userprofile"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors flex items-center gap-1"
            >
              <span>Academic Profile</span>
              <span>➔</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}