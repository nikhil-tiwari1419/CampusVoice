import React, { useState, useEffect } from "react";
import api from "../../context/auth";
import {
  Users,
  Search,
  GraduationCap,
  Building2,
  Calendar,
  Phone,
  Mail,
  CheckCircle2,
  Clock,
  AlertCircle,
  Loader2,
  UserCheck,
  RefreshCw,
  Layers,
} from "lucide-react";

export default function AllStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [profileFilter, setProfileFilter] = useState("All");

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/admin/getAllStudent");
      const rawList = Array.isArray(res.data?.data)
        ? res.data.data
        : Array.isArray(res.data)
          ? res.data
          : [];

      setStudents(rawList);
    } catch (err) {
      if (err.response?.status === 404) {
        setStudents([]);
      } else {
        console.error("Failed to fetch students:", err);
        setError("Unable to load student directory right now. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const totalStudents = students.length;
  const completeProfiles = students.filter((s) => s.isProfileComplete).length;
  const incompleteProfiles = totalStudents - completeProfiles;

  const filteredStudents = students.filter((s) => {
    const q = searchTerm.toLowerCase();
    const programName = s.batch?.program?.name || "";
    const branchName = s.batch?.branch?.name || "";
    const phoneStr = s.phone ? String(s.phone) : "";

    const matchesSearch =
      (s.username || "").toLowerCase().includes(q) ||
      (s.email || "").toLowerCase().includes(q) ||
      phoneStr.includes(q) ||
      programName.toLowerCase().includes(q) ||
      branchName.toLowerCase().includes(q);

    const matchesFilter =
      profileFilter === "All" ||
      (profileFilter === "Complete" && s.isProfileComplete) ||
      (profileFilter === "Incomplete" && !s.isProfileComplete);

    return matchesSearch && matchesFilter;
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

      <div className="relative max-w-6xl mx-auto space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 text-xs font-semibold mb-2">
              <Users className="w-3.5 h-3.5" />
              Campus Enrollment Records
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Student Directory
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              View registered students, academic batch assignments, and profile verification status.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchStudents}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-4 py-2.5 rounded-xl text-xs sm:text-sm border border-slate-200 transition-all cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh List</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 flex items-center justify-between shadow-sm">
            <div>
              <span className="text-xs font-medium text-slate-600">Total Registered</span>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-0.5">
                {loading ? "—" : totalStudents}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-emerald-50/60 border border-emerald-200 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-emerald-800">Profile Locked</span>
              <h3 className="text-2xl font-extrabold text-emerald-700 mt-0.5">
                {loading ? "—" : completeProfiles}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-amber-800">Pending Setup</span>
              <h3 className="text-2xl font-extrabold text-amber-700 mt-0.5">
                {loading ? "—" : incompleteProfiles}
              </h3>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
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
              placeholder="Search by student name, email, phone, program, or branch..."
              className="w-full bg-white border border-slate-200 hover:border-slate-300 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl py-2.5 pl-10 pr-3 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all"
            />
          </div>

          <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 text-xs overflow-x-auto">
            {["All", "Complete", "Incomplete"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setProfileFilter(tab)}
                className={`px-3.5 py-1.5 rounded-lg font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  profileFilter === tab
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab === "All"
                  ? "All Students"
                  : tab === "Complete"
                    ? "Profile Complete"
                    : "Pending Profile"}
              </button>
            ))}
          </div>
        </div>

        {/* Student Cards Grid */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center gap-3 text-slate-600">
            <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
            <p className="text-xs">Loading student directory...</p>
          </div>
        ) : error ? (
          <div className="bg-white border border-rose-200 rounded-2xl p-12 text-center text-rose-600 space-y-3">
            <AlertCircle className="w-10 h-10 mx-auto text-rose-400 mb-1" />
            <p className="text-sm font-semibold">{error}</p>
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 space-y-3">
            <Users className="w-10 h-10 mx-auto text-slate-300 mb-1" />
            <p className="text-sm font-semibold text-slate-700">No students found</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No student records match your current search or filter criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.map((student) => {
              const programName = student.batch?.program?.name || "Unassigned";
              const branchName = student.batch?.branch?.name || "General";
              const year = student.batch?.year ? `Year ${student.batch.year}` : "N/A";
              const sem = student.sem ? `Sem ${student.sem}` : "N/A";

              return (
                <div
                  key={student._id}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-md shadow-slate-200/40 hover:border-teal-300 transition-all flex flex-col justify-between space-y-4"
                >
                  {/* Top Student Identity */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-600 to-cyan-500 text-white font-bold text-base uppercase flex items-center justify-center shrink-0 shadow-sm">
                        {student.username ? student.username.charAt(0) : "S"}
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 truncate capitalize">
                          {student.username || "Student"}
                        </h3>
                        <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                          <span className="truncate">{student.email}</span>
                        </p>
                      </div>
                    </div>

                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border shrink-0 ${
                        student.isProfileComplete
                          ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                          : "bg-amber-50 border-amber-200 text-amber-700"
                      }`}
                    >
                      {student.isProfileComplete ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          Locked
                        </>
                      ) : (
                        <>
                          <Clock className="w-3 h-3" />
                          Pending
                        </>
                      )}
                    </span>
                  </div>

                  {/* Academic Info Grid */}
                  <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-100 text-xs">
                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <GraduationCap className="w-3 h-3 text-teal-600" />
                        Program
                      </span>
                      <p className="font-bold text-slate-800 mt-0.5 truncate">
                        {programName}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Building2 className="w-3 h-3 text-teal-600" />
                        Branch
                      </span>
                      <p className="font-bold text-slate-800 mt-0.5 truncate">
                        {branchName}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-teal-600" />
                        Academic Year
                      </span>
                      <p className="font-bold text-slate-800 mt-0.5">
                        {year} · {sem}
                      </p>
                    </div>

                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                      <span className="text-[10px] text-slate-400 flex items-center gap-1">
                        <Phone className="w-3 h-3 text-teal-600" />
                        Phone
                      </span>
                      <p className="font-mono font-semibold text-slate-800 mt-0.5 truncate">
                        {student.phone ? `+91 ${student.phone}` : "Not set"}
                      </p>
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