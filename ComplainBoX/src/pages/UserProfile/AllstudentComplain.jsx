import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Search,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Filter,
  PlusCircle,
  MessageSquare,
  AlertCircle,
  Loader2
} from "lucide-react";
import { getComplain } from "../../api/user";

export default function AllComplaints() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [complaints, setComplaints] = useState([]);

  // Fetch complaints from backend
  useEffect(() => {
    async function fetchComplaints() {
      setLoading(true);
      setError(null);
      try {
        const result = await getComplain();

        const list = Array.isArray(result)
          ? result
          : Array.isArray(result?.data)
            ? result.data
            : [];

        console.log("RAW COMPLAINTS:", list)

        const formatted = list.map((c) => {
          const yearValue = c.batch?.year; 

          return {
            id: c._id || `CMP-${Math.floor(1000 + Math.random() * 9000)}`,
            subject: c.subject || "General Grievance",
            message: c.message || "",
            department:
              c.batch?.branch?.name || c.batch?.program?.name || "Campus Cell",
            year: typeof yearValue === "number" ? `Year ${yearValue}` : null,
            date: new Date(c.createdAt || Date.now()).toLocaleDateString(
              "en-GB",
              {
                day: "2-digit",
                month: "short",
                year: "numeric",
              }
            ),
            status:
              c.status === "resolved"
                ? "Resolved"
                : c.status === "read"
                  ? "In Progress"
                  : "Pending",
            student: c.user?.username || "Student",
            officerNote: c.officerNote || "",
          };
        });

        setComplaints(formatted);
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
        setError("Unable to load complaints right now. Please try again.");
        setComplaints([]);
      } finally {
        setLoading(false);
      }
    }

    fetchComplaints();
  }, []);

  const statusStyles = {
    Resolved: "bg-teal-500/10 border-teal-500/20 text-teal-600",
    "In Progress": "bg-sky-500/10 border-sky-500/20 text-sky-600",
    Pending: "bg-amber-500/10 border-amber-500/20 text-amber-600",
    Rejected: "bg-rose-500/10 border-rose-500/20 text-rose-600",
  };

  const statusIcons = {
    Resolved: CheckCircle2,
    "In Progress": Clock,
    Pending: Clock,
    Rejected: XCircle,
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 font-sans overflow-hidden select-none py-12 px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[250px] bg-indigo-500/5 rounded-full blur-[110px] pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 text-xs font-semibold mb-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
              </span>
              Complaint History & Audit
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Complaint History
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Track progress, officer notes, and verified resolutions for all submitted grievances.
            </p>
          </div>

          <Link
            to="/complain"
            className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-400/10 transition-all active:scale-[0.99]"
          >
            <PlusCircle className="w-4 h-4" />
            <span>New Complaint</span>
          </Link>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, department, or keyword..."
              className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
            />
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs overflow-x-auto">
            {['All', 'Pending', 'In Progress', 'Resolved'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${statusFilter.toLowerCase() === tab.toLowerCase()
                  ? 'bg-teal-400 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Complaints List */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-600">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <p className="text-xs">Loading complaint records...</p>
          </div>
        ) : error ? (
          <div className="bg-white border border-rose-200 rounded-2xl p-12 text-center text-rose-600 space-y-3">
            <AlertCircle className="w-10 h-10 mx-auto text-rose-400 mb-1" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3">
            <FileText className="w-10 h-10 mx-auto text-slate-400 mb-1" />
            <p className="text-sm font-semibold text-slate-700">No complaints found</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              You haven't filed any complaints matching this filter yet.
            </p>
            <Link
              to="/complain"
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-600 hover:underline pt-2"
            >
              Submit a Complaint Now ➔
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((c) => {
              const StatusIcon = statusIcons[c.status] || Clock;
              return (
                <div
                  key={c.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-lg shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-mono text-xs font-bold text-teal-600">
                          {c.id}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          · {c.department}
                        </span>
                        {c.year && (
                          <span className="text-xs font-semibold text-slate-700">
                            . {c.year}
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-slate-500">
                          {c.date}
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900">
                        {c.subject}
                      </h3>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border shrink-0 ${statusStyles[c.status] || statusStyles.Pending
                        }`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {c.status}
                    </span>
                  </div>

                  {c.message && (
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {c.message}
                    </p>
                  )}

                  {c.officerNote && (
                    <div className="text-[11px] bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-700 flex items-center justify-between flex-wrap gap-2">
                      <span>
                        <strong>Officer Update:</strong> {c.officerNote}
                      </span>
                      <span className="text-teal-600 font-mono text-[10px]">
                        Verified by Cell HOD
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
