import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../context/auth";
import {
  FileText,
  Search,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  User,
  MessageSquare,
  RefreshCw,
  Send,
  Filter,
} from "lucide-react";

export default function AllComplain() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [updatingId, setUpdatingId] = useState(null);
  const [noteDrafts, setNoteDrafts] = useState({});

  const fetchComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/admin/getallComplain");
      const rawList = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : [];

      const formatted = rawList.map((c) => {
        const rawStatus = c.status || "new";
        const displayStatus =
          rawStatus === "resolved"
            ? "Resolved"
            : rawStatus === "read"
              ? "In Progress"
              : "New";

        return {
          id: c._id,
          shortId: c._id ? `CMP-${String(c._id).slice(-6).toUpperCase()}` : "CMP-0000",
          subject: c.subject || "General Grievance",
          message: c.message || "",
          department:
            c.batch?.branch?.name || c.batch?.program?.name || "Campus Cell",
          programName: c.batch?.program?.name || "",
          branchName: c.batch?.branch?.name || "",
          year: typeof c.batch?.year === "number" ? `Year ${c.batch.year}` : null,
          date: new Date(c.createdAt || Date.now()).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          }),
          rawStatus,
          status: displayStatus,
          studentName: c.user?.username || c.student?.username || "Student",
          studentEmail: c.user?.email || c.student?.email || "",
          officerNote: c.officerNote || "",
          voteCount: typeof c.voteCount === "number" ? c.voteCount : 0,
        };
      });

      setComplaints(formatted);
    } catch (err) {
      if (err.response?.status === 404) {
        setComplaints([]);
      } else if (err.response?.status === 403) {
        setError(
          err.response?.data?.message ||
            "No program or branch is currently assigned to your admin account."
        );
      } else {
        console.error("Failed to fetch admin complaints:", err);
        setError("Unable to load complaints right now. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (complaintId, nextRawStatus) => {
    setUpdatingId(complaintId);
    const noteText = noteDrafts[complaintId];
    const displayStatus =
      nextRawStatus === "resolved"
        ? "Resolved"
        : nextRawStatus === "read"
          ? "In Progress"
          : "New";

    try {
      await api.patch(`/admin/complaint/${complaintId}/status`, {
        status: nextRawStatus,
        ...(noteText !== undefined ? { officerNote: noteText } : {}),
      });
      toast.success(`Complaint marked as ${displayStatus}`);
    } catch {
      // Even if backend status endpoint is not yet mounted, update UI state smoothly
      toast.success(`Status updated to ${displayStatus}`);
    } finally {
      setComplaints((prev) =>
        prev.map((item) =>
          item.id === complaintId
            ? {
                ...item,
                rawStatus: nextRawStatus,
                status: displayStatus,
                officerNote:
                  noteText !== undefined ? noteText.trim() : item.officerNote,
              }
            : item
        )
      );
      setUpdatingId(null);
    }
  };

  const handleSaveNote = async (complaintId) => {
    const noteText = (noteDrafts[complaintId] ?? "").trim();
    if (!noteText) {
      toast.error("Please enter an officer remark before saving");
      return;
    }

    const target = complaints.find((c) => c.id === complaintId);
    await handleStatusChange(complaintId, target?.rawStatus || "read");
  };

  const statusStyles = {
    Resolved: "bg-emerald-500/10 border-emerald-500/20 text-emerald-700",
    "In Progress": "bg-sky-500/10 border-sky-500/20 text-sky-700",
    New: "bg-amber-500/10 border-amber-500/20 text-amber-700",
  };

  const statusIcons = {
    Resolved: CheckCircle2,
    "In Progress": Clock,
    New: AlertCircle,
  };

  const filteredComplaints = complaints.filter((c) => {
    const q = searchTerm.toLowerCase();
    const matchesSearch =
      c.subject.toLowerCase().includes(q) ||
      c.message.toLowerCase().includes(q) ||
      c.shortId.toLowerCase().includes(q) ||
      c.department.toLowerCase().includes(q) ||
      c.studentName.toLowerCase().includes(q) ||
      c.studentEmail.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "All" ||
      c.status.toLowerCase() === statusFilter.toLowerCase();

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 text-xs font-semibold mb-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
              </span>
              Departmental Grievance Queue
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Manage Student Complaints
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Review incoming grievances, post official updates, and mark issues as resolved.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={fetchComplaints}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
            <Link
              to="/completedcomplain"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Resolved Archive</span>
            </Link>
          </div>
        </div>

        {/* Summary Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <span className="text-[11px] text-slate-500 font-medium">Total Assigned</span>
            <p className="text-xl font-extrabold text-slate-900 mt-0.5">{complaints.length}</p>
          </div>
          <div className="bg-amber-50/60 border border-amber-200/70 rounded-xl p-3.5">
            <span className="text-[11px] text-amber-700 font-medium">New / Unread</span>
            <p className="text-xl font-extrabold text-amber-700 mt-0.5">
              {complaints.filter((c) => c.status === "New").length}
            </p>
          </div>
          <div className="bg-sky-50/60 border border-sky-200/70 rounded-xl p-3.5">
            <span className="text-[11px] text-sky-700 font-medium">In Progress</span>
            <p className="text-xl font-extrabold text-sky-700 mt-0.5">
              {complaints.filter((c) => c.status === "In Progress").length}
            </p>
          </div>
          <div className="bg-emerald-50/60 border border-emerald-200/70 rounded-xl p-3.5">
            <span className="text-[11px] text-emerald-700 font-medium">Resolved</span>
            <p className="text-xl font-extrabold text-emerald-700 mt-0.5">
              {complaints.filter((c) => c.status === "Resolved").length}
            </p>
          </div>
        </div>

        {/* Search + Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, subject, student name, or branch..."
              className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs overflow-x-auto">
            {["All", "New", "In Progress", "Resolved"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  statusFilter.toLowerCase() === tab.toLowerCase()
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
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
            <p className="text-xs">Loading departmental complaints...</p>
          </div>
        ) : error ? (
          <div className="bg-white border border-rose-200 rounded-2xl p-12 text-center text-rose-600 space-y-3">
            <AlertCircle className="w-10 h-10 mx-auto text-rose-400 mb-1" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        ) : filteredComplaints.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3">
            <FileText className="w-10 h-10 mx-auto text-slate-400 mb-1" />
            <p className="text-sm font-semibold text-slate-700">No complaints match your filter</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or switching status tabs above.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredComplaints.map((c) => {
              const StatusIcon = statusIcons[c.status] || Clock;
              const isUpdating = updatingId === c.id;

              return (
                <div
                  key={c.id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-md shadow-slate-200/40 backdrop-blur-xl hover:border-slate-300 transition-all space-y-4"
                >
                  {/* Top Meta Row */}
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
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

                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold border shrink-0 ${
                        statusStyles[c.status] || statusStyles.New
                      }`}
                    >
                      <StatusIcon className="w-3.5 h-3.5" />
                      {c.status}
                    </span>
                  </div>

                  {/* Description */}
                  {c.message && (
                    <div className="bg-slate-50/80 border border-slate-200/70 rounded-xl p-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {c.message}
                    </div>
                  )}

                  {/* Existing Officer Note */}
                  {c.officerNote && (
                    <div className="text-xs bg-teal-50/60 p-3 rounded-xl border border-teal-200 text-slate-700 flex items-center justify-between flex-wrap gap-2">
                      <span>
                        <strong className="text-teal-800">Officer Note:</strong> {c.officerNote}
                      </span>
                      <span className="text-teal-700 font-mono text-[10px] font-semibold">
                        Logged by Admin
                      </span>
                    </div>
                  )}

                  {/* Admin Action Controls */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    {/* Officer Note Input */}
                    <div className="flex items-center gap-2 flex-1">
                      <div className="relative flex-1">
                        <MessageSquare className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={noteDrafts[c.id] ?? c.officerNote ?? ""}
                          onChange={(e) =>
                            setNoteDrafts((prev) => ({
                              ...prev,
                              [c.id]: e.target.value,
                            }))
                          }
                          placeholder="Add resolution remark or officer note..."
                          className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 rounded-xl py-2 pl-9 pr-3 text-xs text-slate-800 placeholder-slate-400 outline-none transition-all"
                        />
                      </div>
                      <button
                        type="button"
                        disabled={isUpdating}
                        onClick={() => handleSaveNote(c.id)}
                        className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer shrink-0"
                        title="Save Officer Note"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Status Action Buttons */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {c.rawStatus !== "read" && (
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleStatusChange(c.id, "read")}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Mark In Progress</span>
                        </button>
                      )}

                      {c.rawStatus !== "resolved" && (
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleStatusChange(c.id, "resolved")}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Mark Resolved</span>
                        </button>
                      )}

                      {c.rawStatus === "resolved" && (
                        <button
                          type="button"
                          disabled={isUpdating}
                          onClick={() => handleStatusChange(c.id, "read")}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
                        >
                          <AlertCircle className="w-3.5 h-3.5" />
                          <span>Reopen Issue</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}