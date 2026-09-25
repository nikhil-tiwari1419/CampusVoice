import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../context/auth";
import {
  CheckCircle2,
  Search,
  Building2,
  Calendar,
  FileText,
  AlertCircle,
  Loader2,
  User,
  ArrowLeft,
  ShieldCheck,
  Award,
} from "lucide-react";

export default function CompletedIssues() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchResolvedComplaints() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/admin/getallComplain");
        const rawList = Array.isArray(res.data?.data)
          ? res.data.data
          : Array.isArray(res.data)
            ? res.data
            : [];

        const formatted = rawList.map((c) => ({
          id: c._id,
          shortId: c._id ? `CMP-${String(c._id).slice(-6).toUpperCase()}` : "CMP-0000",
          subject: c.subject || "General Grievance",
          message: c.message || "",
          department:
            c.batch?.branch?.name || c.batch?.program?.name || "Campus Cell",
          year: typeof c.batch?.year === "number" ? `Year ${c.batch.year}` : null,
          date: new Date(c.updatedAt || c.createdAt || Date.now()).toLocaleDateString(
            "en-GB",
            {
              day: "2-digit",
              month: "short",
              year: "numeric",
            }
          ),
          rawStatus: c.status || "new",
          studentName: c.user?.username || c.student?.username || "Student",
          studentEmail: c.user?.email || c.student?.email || "",
          officerNote: c.officerNote || "",
        }));

        setComplaints(formatted);
      } catch (err) {
        if (err.response?.status === 404) {
          setComplaints([]);
        } else {
          console.error("Failed to load completed complaints:", err);
          setError("Unable to load resolved complaints right now.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchResolvedComplaints();
  }, []);

  const resolvedList = complaints.filter((c) => c.rawStatus === "resolved");
  const totalComplaints = complaints.length;
  const resolutionRate =
    totalComplaints > 0 ? Math.round((resolvedList.length / totalComplaints) * 100) : 0;

  const filteredResolved = resolvedList.filter((c) => {
    const q = searchTerm.toLowerCase();
    return (
      c.subject.toLowerCase().includes(q) ||
      c.message.toLowerCase().includes(q) ||
      c.shortId.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q) ||
      c.studentName.toLowerCase().includes(q)
    );
  });

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 font-sans overflow-hidden select-none py-12 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[250px] bg-teal-500/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-5xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-xs font-semibold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Verified Resolution Archive
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Completed Issues
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Audit trail of all resolved student grievances and departmental action records.
            </p>
          </div>

          <Link
            to="/newcomplain"
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Active Queue</span>
          </Link>
        </div>

        {/* Resolution Summary Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-emerald-800">Total Resolved</span>
              <h3 className="text-2xl font-extrabold text-emerald-700 mt-0.5">
                {loading ? "—" : resolvedList.length}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-medium text-slate-600">Total Logged</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {loading ? "—" : totalComplaints}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-teal-50/70 border border-teal-200 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-teal-800">Resolution Rate</span>
              <h3 className="text-2xl font-extrabold text-teal-700 mt-0.5">
                {loading ? "—" : `${resolutionRate}%`}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search resolved issues by ID, subject, student, or department..."
            className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
          />
        </div>

        {/* Resolved List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-600">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <p className="text-xs">Loading resolved grievance records...</p>
          </div>
        ) : error ? (
          <div className="bg-white border border-rose-200 rounded-2xl p-12 text-center text-rose-600 space-y-3">
            <AlertCircle className="w-10 h-10 mx-auto text-rose-400 mb-1" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        ) : filteredResolved.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3">
            <CheckCircle2 className="w-10 h-10 mx-auto text-slate-300 mb-1" />
            <p className="text-sm font-semibold text-slate-700">
              No completed issues found
            </p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Complaints marked as Resolved from the active queue will appear in this archive.
            </p>
            <Link
              to="/newcomplain"
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 hover:underline pt-2"
            >
              Go to Active Complaints Queue ➔
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResolved.map((c) => (
              <div
                key={c.id}
                className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-emerald-300 transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {c.shortId}
                      </span>
                      <span className="text-xs font-semibold text-slate-700 inline-flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-slate-400" />
                        {c.department}
                      </span>
                      {c.year && (
                        <span className="text-xs font-semibold text-slate-600">
                          · {c.year}
                        </span>
                      )}
                      <span className="text-[11px] font-mono text-slate-500 inline-flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {c.date}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900">
                      {c.subject}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-medium text-slate-700">{c.studentName}</span>
                      {c.studentEmail && (
                        <span className="font-mono text-[11px] text-slate-500">
                          ({c.studentEmail})
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border bg-emerald-500/10 border-emerald-500/20 text-emerald-700 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Resolved
                  </span>
                </div>

                {c.message && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-200/70">
                    {c.message}
                  </p>
                )}

                <div className="text-[11px] bg-emerald-50/60 p-3 rounded-xl border border-emerald-200 text-slate-700 flex items-center justify-between flex-wrap gap-2">
                  <span>
                    <strong className="text-emerald-800">Resolution Summary:</strong>{" "}
                    {c.officerNote || "Verified and resolved by department administration."}
                  </span>
                  <span className="text-emerald-700 font-mono text-[10px] inline-flex items-center gap-1 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Closed & Verified
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
