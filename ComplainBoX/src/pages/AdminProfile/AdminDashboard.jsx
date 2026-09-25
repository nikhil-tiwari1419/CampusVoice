import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { useAuth } from "../../context/auth";
import {
  FileText,
  CheckCircle2,
  Clock,
  AlertCircle,
  Users,
  ShieldCheck,
  ArrowRight,
  Building2,
  Calendar,
  Loader2,
  Inbox,
  TrendingUp,
  UserCheck,
  Sparkles,
} from "lucide-react";

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);
      try {
        const [complaintsRes, studentsRes] = await Promise.allSettled([
          api.get("/admin/getallComplain"),
          api.get("/admin/getAllStudent"),
        ]);

        if (complaintsRes.status === "fulfilled") {
          const list = Array.isArray(complaintsRes.value?.data?.data)
            ? complaintsRes.value.data.data
            : Array.isArray(complaintsRes.value?.data)
              ? complaintsRes.value.data
              : [];
          setComplaints(list);
        } else if (complaintsRes.reason?.response?.status === 404) {
          setComplaints([]);
        } else {
          console.error("Error loading complaints:", complaintsRes.reason);
        }

        if (studentsRes.status === "fulfilled") {
          const list = Array.isArray(studentsRes.value?.data?.data)
            ? studentsRes.value.data.data
            : Array.isArray(studentsRes.value?.data)
              ? studentsRes.value.data
              : [];
          setStudents(list);
        } else if (studentsRes.reason?.response?.status === 404) {
          setStudents([]);
        } else {
          console.error("Error loading students:", studentsRes.reason);
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("Unable to load dashboard statistics right now.");
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const totalComplaints = complaints.length;
  const newComplaints = complaints.filter((c) => !c.status || c.status === "new").length;
  const inProgressComplaints = complaints.filter((c) => c.status === "read").length;
  const resolvedComplaints = complaints.filter((c) => c.status === "resolved").length;
  const resolutionRate =
    totalComplaints > 0 ? Math.round((resolvedComplaints / totalComplaints) * 100) : 0;

  const totalStudents = students.length;
  const verifiedProfiles = students.filter((s) => s.isProfileComplete).length;

  const recentComplaints = complaints.slice(0, 5);

  const getStatusBadge = (status) => {
    if (status === "resolved") {
      return {
        label: "Resolved",
        style: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
        Icon: CheckCircle2,
      };
    }
    if (status === "read") {
      return {
        label: "In Progress",
        style: "bg-sky-500/10 border-sky-500/20 text-sky-700",
        Icon: Clock,
      };
    }
    return {
      label: "New",
      style: "bg-amber-500/10 border-amber-500/20 text-amber-700",
      Icon: AlertCircle,
    };
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 font-sans overflow-hidden select-none py-10 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-teal-50/50 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[300px] bg-blue-50/50 rounded-full blur-[120px] pointer-events-none" />

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
        {/* Admin Welcome Banner Card */}
        <div className="bg-gradient-to-r from-white via-slate-50 to-teal-50/60 border border-slate-200 p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-lg shadow-slate-200/40 backdrop-blur-xl">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white flex items-center justify-center font-bold text-2xl uppercase shadow-md shadow-teal-600/20 shrink-0">
              {user?.username ? user.username.charAt(0) : "A"}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-800 border border-teal-200 font-semibold">
                  <ShieldCheck className="w-3 h-3" />
                  Department Administrator
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  CampusVoice Control Center
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight capitalize">
                Welcome back, {authLoading ? "Admin" : user?.username || "Administrator"}!
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 break-all">
                {user?.email || "Monitor student grievances, manage batch issues, and track departmental resolutions."}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto flex-wrap sm:flex-nowrap">
            <Link
              to="/newcomplain"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-600/20 hover:shadow-teal-600/30 transition-all active:scale-[0.99]"
            >
              <Inbox className="w-4 h-4" />
              <span>Review Complaints</span>
            </Link>
            <Link
              to="/allstudent"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold px-5 py-3 rounded-xl text-xs sm:text-sm shadow-sm transition-all"
            >
              <Users className="w-4 h-4 text-teal-600" />
              <span>Students ({totalStudents})</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4 text-xs sm:text-sm flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
            <span>{error}</span>
          </div>
        )}

        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-600">Total Grievances</span>
              <div className="w-8 h-8 rounded-lg bg-teal-100 text-teal-700 flex items-center justify-center">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900">
              {loading ? "—" : totalComplaints}
            </h3>
            <p className="text-[11px] text-teal-700 mt-1 font-medium">
              Assigned to your jurisdiction
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-amber-700">New & Unread</span>
              <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-amber-600">
              {loading ? "—" : newComplaints}
            </h3>
            <p className="text-[11px] text-slate-600 mt-1">Awaiting initial review</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-sky-700">In Progress</span>
              <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-sky-700">
              {loading ? "—" : inProgressComplaints}
            </h3>
            <p className="text-[11px] text-slate-600 mt-1">Under active investigation</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-emerald-700">Resolved Issues</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-emerald-700">
              {loading ? "—" : resolvedComplaints}
            </h3>
            <p className="text-[11px] text-emerald-700 mt-1 font-medium">
              {loading ? "Calculating..." : `${resolutionRate}% resolution rate`}
            </p>
          </div>
        </div>

        {/* Secondary Overview Row: Student Stats + Quick Navigation */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Enrollment Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Student Directory Overview
                </span>
                <Users className="w-4 h-4 text-teal-600" />
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-extrabold text-slate-900">
                  {loading ? "—" : totalStudents}
                </span>
                <span className="text-xs text-slate-500">Total Registered Students</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-teal-600" />
                    Academic Profile Locked
                  </span>
                  <span className="font-bold text-slate-900">{verifiedProfiles}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    Incomplete Profile
                  </span>
                  <span className="font-bold text-slate-900">
                    {Math.max(0, totalStudents - verifiedProfiles)}
                  </span>
                </div>
              </div>
            </div>

            <Link
              to="/allstudent"
              className="inline-flex items-center justify-between w-full px-4 py-2.5 rounded-xl bg-slate-50 hover:bg-teal-50 text-xs font-semibold text-slate-700 hover:text-teal-700 border border-slate-200 transition-all"
            >
              <span>View Student Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Recent Grievances Feed */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-6 shadow-md shadow-slate-200/40 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Recent Grievances</h2>
                <p className="text-xs text-slate-500">
                  Latest student submissions in your assigned program or branch
                </p>
              </div>
              <Link
                to="/newcomplain"
                className="text-xs font-semibold text-teal-600 hover:text-teal-700 inline-flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loading ? (
              <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-500">
                <Loader2 className="w-6 h-6 animate-spin text-teal-600" />
                <span className="text-xs">Loading recent complaints...</span>
              </div>
            ) : recentComplaints.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <FileText className="w-8 h-8 mx-auto text-slate-300" />
                <p className="text-xs font-semibold text-slate-700">No grievances logged yet</p>
                <p className="text-[11px] text-slate-500">
                  New complaints submitted by students in your batch will appear here.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentComplaints.map((c) => {
                  const badge = getStatusBadge(c.status);
                  const BadgeIcon = badge.Icon;
                  const dept =
                    c.batch?.branch?.name || c.batch?.program?.name || "Campus Batch";
                  const studentName =
                    c.user?.username || c.student?.username || "Student";

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
                          <span className="font-medium text-slate-700">{studentName}</span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <Building2 className="w-3 h-3" />
                            {dept} {c.batch?.year ? `(Year ${c.batch.year})` : ""}
                          </span>
                        </div>
                        <p className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {c.subject || "General Grievance"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${badge.style}`}
                        >
                          <BadgeIcon className="w-3 h-3" />
                          {badge.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Footer Assistance Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-700 shadow-md shadow-slate-200/40 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-teal-700 shrink-0" />
            <span>
              Administrative actions are logged for institutional transparency. Review resolved records or manage your profile below.
            </span>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <Link
              to="/completedcomplain"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors flex items-center gap-1"
            >
              <span>Resolved Archive</span>
              <span>➔</span>
            </Link>
            <span className="text-slate-300">|</span>
            <Link
              to="/adminprofile"
              className="text-teal-600 hover:text-teal-700 font-semibold transition-colors flex items-center gap-1"
            >
              <span>Admin Profile</span>
              <span>➔</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}