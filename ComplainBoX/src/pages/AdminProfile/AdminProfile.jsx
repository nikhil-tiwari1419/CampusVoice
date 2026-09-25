import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api, { useAuth } from "../../context/auth";
import {
  ShieldCheck,
  Mail,
  User,
  Building2,
  GraduationCap,
  CheckCircle2,
  Clock,
  FileText,
  Users,
  Lock,
  ArrowRight,
  Loader2,
  KeyRound,
} from "lucide-react";

export default function AdminProfile() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [complaints, setComplaints] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadScopeData() {
      setLoading(true);
      try {
        const [compRes, studRes] = await Promise.allSettled([
          api.get("/admin/getallComplain"),
          api.get("/admin/getAllStudent"),
        ]);

        if (compRes.status === "fulfilled") {
          const list = Array.isArray(compRes.value?.data?.data)
            ? compRes.value.data.data
            : Array.isArray(compRes.value?.data)
              ? compRes.value.data
              : [];
          setComplaints(list);
        }

        if (studRes.status === "fulfilled") {
          const list = Array.isArray(studRes.value?.data?.data)
            ? studRes.value.data.data
            : Array.isArray(studRes.value?.data)
              ? studRes.value.data
              : [];
          setStudents(list);
        }
      } catch (err) {
        console.error("Error loading admin profile metrics:", err);
      } finally {
        setLoading(false);
      }
    }

    loadScopeData();
  }, []);

  // Derive program/branch name from complaints if available
  const sampleBatch = complaints.find((c) => c.batch)?.batch;
  const derivedProgram = sampleBatch?.program?.name || "Assigned Campus Program";
  const derivedBranch = sampleBatch?.branch?.name || "All Departmental Batches";

  const totalComplaints = complaints.length;
  const resolvedCount = complaints.filter((c) => c.status === "resolved").length;
  const pendingCount = totalComplaints - resolvedCount;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-teal-50/30 text-slate-900 font-sans overflow-hidden select-none py-10 px-4 sm:px-6 lg:py-12">
      {/* Ambient lighting */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Page Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Administrative Credentials
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-slate-900 via-teal-800 to-slate-900 bg-clip-text text-transparent">
            Administrator Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            View your institutional role, assigned jurisdiction, and grievance resolution metrics.
          </p>
        </div>

        {/* Profile Identity Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-200/60">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 text-white font-extrabold text-2xl sm:text-3xl flex items-center justify-center uppercase shadow-lg shadow-teal-500/30 shrink-0">
                {user?.username ? user.username.charAt(0) : "A"}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap mb-1.5">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Verified Admin Account
                  </span>
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 uppercase">
                    Role: {user?.role || "admin"}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight capitalize">
                  {user?.username || "Administrator"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{user?.email || "admin@campusvoice.edu"}</span>
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold">
              <Lock className="w-3.5 h-3.5 text-teal-600" />
              <span>Managed by Super Admin</span>
            </div>
          </div>

          {/* Credentials & Scope Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-teal-600" />
                Administrator Username
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900 capitalize">
                {user?.username || "Admin"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-teal-600" />
                Official Email Address
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900 break-all">
                {user?.email || "Not available"}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-teal-600" />
                Assigned Program Scope
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900">
                {loading ? "Loading..." : derivedProgram}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70 space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-teal-600" />
                Assigned Branch / Cell
              </span>
              <p className="text-sm sm:text-base font-bold text-slate-900">
                {loading ? "Loading..." : derivedBranch}
              </p>
            </div>
          </div>
        </div>

        {/* Operational Performance Summary */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Departmental Activity Summary
              </h3>
              <p className="text-xs text-slate-500">
                Real-time overview of complaints and students under your supervision
              </p>
            </div>
            {loading && <Loader2 className="w-4 h-4 animate-spin text-teal-600" />}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-teal-50/50 border border-teal-200/60">
              <div className="flex items-center justify-between text-xs text-teal-800 font-medium mb-1">
                <span>Total Complaints</span>
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-2xl font-extrabold text-slate-900">
                {loading ? "—" : totalComplaints}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200/60">
              <div className="flex items-center justify-between text-xs text-amber-800 font-medium mb-1">
                <span>Active / Pending</span>
                <Clock className="w-4 h-4 text-amber-600" />
              </div>
              <p className="text-2xl font-extrabold text-amber-700">
                {loading ? "—" : pendingCount}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/60">
              <div className="flex items-center justify-between text-xs text-emerald-800 font-medium mb-1">
                <span>Resolved Issues</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-2xl font-extrabold text-emerald-700">
                {loading ? "—" : resolvedCount}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <KeyRound className="w-4 h-4 text-teal-600" />
              <span>
                Need to update your password or department assignment? Contact the Super Administrator.
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/newcomplain"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700"
              >
                <span>Manage Queue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-slate-300">|</span>
              <Link
                to="/allstudent"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 hover:text-teal-700"
              >
                <span>View Students ({students.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}