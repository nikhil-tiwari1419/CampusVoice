import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import api from "../../context/auth";
import toast from "react-hot-toast";
import {
  User,
  Mail,
  Phone,
  GraduationCap,
  Building2,
  Calendar,
  Layers,
  BookOpen,
  Loader2,
  Pencil,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldCheck,
  Radio,
  Lock
} from "lucide-react";

export default function UserProfile() {
  const { user, checkAuth } = useAuth();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    program: "BCA",
    branch: "",
    year: "1",
    sem: "1",
  });

  const [profileData, setProfileData] = useState(null);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [loadingComplaints, setLoadingComplaints] = useState(true);

  // Dynamic program options
  const programOptions = [
    { name: "BCA", numYears: 4, hasBranches: false },
    { name: "BSC", numYears: 3, hasBranches: true },
    { name: "B.Tech", numYears: 4, hasBranches: true },
  ];

  const branchOptions = {
    BCA: ["General"],
    BSC: ["Data Science", "Artificial Intelligence", "Cybersecurity", "Physics", "Chemistry"],
    "B.Tech": ["Computer Science & Eng (CSE)", "Information Technology (IT)", "Electronics (ECE)", "Mechanical Eng"],
  };

  // Fetch full student profile
  useEffect(() => {
    async function fetchUserProfile() {
      try {
        setLoadingProfile(true);
        const res = await api.get("/user/get-profile");
        const student = res.data?.data;
        if (student) {
          setProfileData(student);
          const currentProgram = student.batch?.program?.name || "BCA";
          const currentBranch = student.batch?.branch?.name || "";
          const currentYear = student.batch?.year ? String(student.batch.year) : "1";
          const currentSem = student.sem ? String(student.sem) : "1";

          setFormData({
            username: student.username || user?.username || "",
            email: student.email || user?.email || "",
            phone: student.phone ? String(student.phone) : "",
            program: currentProgram,
            branch: currentBranch,
            year: currentYear,
            sem: currentSem,
          });
        }
      } catch (err) {
        console.error("Could not fetch profile:", err);
        // Fallback to user context
        if (user) {
          setFormData((prev) => ({
            ...prev,
            username: user.username || "",
            email: user.email || "",
            phone: user.phone ? String(user.phone) : "",
          }));
        }
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchUserProfile();
  }, [user]);

  // Fetch recent complaints
  useEffect(() => {
    async function fetchComplaints() {
      try {
        setLoadingComplaints(true);
        const res = await api.get("/user/allcomplain");
        const list = res.data?.data || res.data?.complains || res.data || [];
        if (Array.isArray(list)) {
          setRecentComplaints(list.slice(0, 3));
        }
      } catch (err) {
        console.error("Could not fetch complaints:", err);
      } finally {
        setLoadingComplaints(false);
      }
    }

    fetchComplaints();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "program") {
      const defaultBranch = branchOptions[value]?.[0] || "";
      setFormData((prev) => ({
        ...prev,
        program: value,
        branch: value === "BCA" ? "" : defaultBranch,
        year: "1",
        sem: "1",
      }));
      return;
    }

    if (name === "year") {
      const yearNum = Number(value);
      const minSem = yearNum * 2 - 1;
      setFormData((prev) => ({
        ...prev,
        year: value,
        sem: String(minSem),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Valid semesters for the selected year
  const selectedYearNum = Number(formData.year) || 1;
  const validSemesters = [selectedYearNum * 2 - 1, selectedYearNum * 2];

  const handleInitiateSave = (e) => {
    if (e && e.preventDefault) e.preventDefault();
    if (!formData.phone || formData.phone.trim().length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (formData.program !== "BCA" && (!formData.branch || formData.branch.trim() === "")) {
      toast.error(`Please select a branch for ${formData.program}`);
      return;
    }
    setShowConfirmModal(true);
  };

  const handleConfirmAndLock = async () => {
    setSaving(true);
    try {
      const payload = {
        program: formData.program,
        branch: formData.program === "BCA" ? "" : formData.branch,
        year: Number(formData.year),
        sem: Number(formData.sem),
        phone: formData.phone.trim(),
      };

      const res = await api.patch("/user/Complet-profile", payload);
      toast.success(res.data?.message || "Academic profile locked and verified successfully!");
      setProfileData(res.data?.data || null);
      setShowConfirmModal(false);

      if (checkAuth) {
        await checkAuth();
      }
    } catch (err) {
      console.error("Failed to complete profile:", err);
      toast.error(err.response?.data?.message || "Failed to save academic profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const isProfileComplete = Boolean(profileData?.isProfileComplete);

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] text-slate-100 font-sans overflow-hidden select-none py-12 px-4 sm:px-6">
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

      <div className="relative max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
            </span>
            Student Credentials
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
            Academic & Account Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 max-w-md mx-auto">
            Manage your enrollment details, contact number, and grievance submission authorization.
          </p>
        </div>

        {/* Profile Completion Status Notice */}
        {!loadingProfile && !isProfileComplete && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-300">Action Required: Complete Academic Profile</h3>
                <p className="text-xs text-amber-200/80 mt-0.5">
                  Set your program, branch, year, semester, and mobile number. You get <strong>only 1 chance</strong> to submit and lock these details.
                </p>
              </div>
            </div>
            <button
              onClick={handleInitiateSave}
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-md shrink-0 cursor-pointer"
            >
              Submit & Review Details
            </button>
          </div>
        )}

        {/* Account Details Card */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800/60">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-teal-400/10 border border-teal-500/30 text-teal-300 flex items-center justify-center text-2xl font-bold uppercase shadow-inner">
                {formData.username ? formData.username.charAt(0) : "S"}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg sm:text-xl font-bold text-slate-100 capitalize">
                    {loadingProfile ? "Loading..." : formData.username || "Student"}
                  </h2>
                  {isProfileComplete ? (
                    <span className="inline-flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Verified & Locked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 px-2.5 py-0.5 rounded-full text-[11px] font-semibold">
                      <Clock className="w-3 h-3" />
                      Setup Pending
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{formData.email}</p>
              </div>
            </div>

            {isProfileComplete ? (
              <div className="inline-flex items-center gap-2 bg-[#090D16]/90 text-slate-300 px-3.5 py-2 rounded-xl text-xs font-semibold border border-slate-800 shadow-inner">
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                <span>Academic Info Locked</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleInitiateSave}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold shadow-md shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Submit Academic Info</span>
              </button>
            )}
          </div>

          {/* Academic & Contact Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {/* Program */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5 text-teal-400" />
                Degree Program
              </label>
              <div className="relative">
                <select
                  name="program"
                  value={formData.program}
                  onChange={handleChange}
                  disabled={isProfileComplete || saving}
                  className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 px-3 text-sm text-slate-100 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  {programOptions.map((prog) => (
                    <option key={prog.name} value={prog.name} className="bg-slate-900 text-slate-100">
                      {prog.name} ({prog.numYears} Years)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Branch */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-teal-400" />
                Branch / Specialization
              </label>
              {formData.program === "BCA" ? (
                <input
                  type="text"
                  disabled
                  value="Core BCA (No Branch Division)"
                  className="w-full bg-[#090D16]/80 border border-slate-800 rounded-xl py-2.5 px-3 text-sm text-slate-400 outline-none opacity-60 cursor-not-allowed"
                />
              ) : (
                <select
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  disabled={isProfileComplete || saving}
                  className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 px-3 text-sm text-slate-100 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                >
                  <option value="">Select Branch</option>
                  {(branchOptions[formData.program] || []).map((b) => (
                    <option key={b} value={b} className="bg-slate-900 text-slate-100">
                      {b}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Year */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                Academic Year
              </label>
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                disabled={isProfileComplete || saving}
                className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 px-3 text-sm text-slate-100 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                <option value="1" className="bg-slate-900">1st Year</option>
                <option value="2" className="bg-slate-900">2nd Year</option>
                <option value="3" className="bg-slate-900">3rd Year</option>
                {formData.program !== "BSC" && (
                  <option value="4" className="bg-slate-900">4th Year</option>
                )}
              </select>
            </div>

            {/* Semester */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-teal-400" />
                Current Semester
              </label>
              <select
                name="sem"
                value={formData.sem}
                onChange={handleChange}
                disabled={isProfileComplete || saving}
                className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 px-3 text-sm text-slate-100 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {validSemesters.map((s) => (
                  <option key={s} value={s} className="bg-slate-900">
                    Semester {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Phone */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-teal-400" />
                Contact Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-500">
                  +91
                </span>
                <input
                  type="tel"
                  name="phone"
                  maxLength={10}
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isProfileComplete || saving}
                  className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 pl-12 pr-3 text-sm font-mono text-slate-100 placeholder-slate-500 outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Used strictly for grievance resolution SMS notifications and emergency updates.
              </p>
            </div>
          </div>

          {/* Bottom Action / Lock Status Notice Bar */}
          {!isProfileComplete ? (
            <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-amber-400 text-xs">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>One-Time Submission: Academic details cannot be edited after confirmation.</span>
              </div>
              <button
                type="button"
                onClick={handleInitiateSave}
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-teal-500 hover:from-teal-300 hover:to-teal-400 text-slate-950 px-6 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>Submit & Review Academic Details</span>
              </button>
            </div>
          ) : (
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center gap-2.5 text-xs text-slate-400">
              <Lock className="w-4 h-4 text-teal-400/80 shrink-0" />
              <span>
                Academic credentials are authenticated and permanently locked. For official changes or corrections, please contact the campus administration.
              </span>
            </div>
          )}
        </div>

        {/* Live Complaint History Card */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-7 shadow-xl shadow-black/40 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <Radio className="w-4 h-4 text-teal-400 animate-pulse" />
              <h2 className="text-base sm:text-lg font-bold text-slate-100">
                Recent Grievances Filed
              </h2>
            </div>
            <Link
              to="/complaints"
              className="text-xs font-medium text-teal-400 hover:text-teal-300 flex items-center gap-1 transition-colors"
            >
              <span>View Full History</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loadingComplaints ? (
            <div className="flex items-center justify-center py-8 gap-2 text-slate-500 text-xs">
              <Loader2 className="w-4 h-4 animate-spin text-teal-400" />
              <span>Loading complaints...</span>
            </div>
          ) : recentComplaints.length === 0 ? (
            <div className="bg-[#090D16]/50 border border-slate-800/50 rounded-xl p-8 text-center">
              <CheckCircle2 className="w-8 h-8 text-teal-400/50 mx-auto mb-2" />
              <p className="text-sm font-medium text-slate-300">No complaints registered yet</p>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Your campus record is completely clean. If you face any hostel, academic, or facility issue, file a complaint anytime.
              </p>
              <Link
                to="/complain"
                className="mt-4 inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-all cursor-pointer"
              >
                <span>File Grievance</span>
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentComplaints.map((item, index) => {
                const statusColor =
                  item.status === "Resolved"
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : item.status === "In Progress"
                    ? "bg-sky-500/10 text-sky-400 border-sky-500/20"
                    : "bg-amber-500/10 text-amber-400 border-amber-500/20";

                return (
                  <div
                    key={item._id || index}
                    className="bg-[#090D16]/70 border border-slate-800/80 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 hover:border-slate-700/80 transition-all"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase border ${statusColor}`}>
                          {item.status || "Pending"}
                        </span>
                        <span className="text-[11px] font-mono text-slate-500">
                          {item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "Recent"}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-200">
                        {item.subject || "Campus Complaint"}
                      </h4>
                      <p className="text-xs text-slate-400 line-clamp-1">
                        {item.message}
                      </p>
                    </div>

                    <Link
                      to="/complaints"
                      className="text-xs text-slate-400 hover:text-teal-400 flex items-center gap-1 transition-colors shrink-0"
                    >
                      <span>Track</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* One-Time Academic Confirmation & Warning Notice Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-[#0F172A] border border-amber-500/40 rounded-2xl p-6 sm:p-7 shadow-2xl shadow-amber-500/10 text-slate-100 space-y-5">
            {/* Top Warning Badge & Title */}
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-wider">
                  Important Notice • One-Time Action
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-slate-100">
                  Confirm & Lock Academic Details?
                </h3>
              </div>
            </div>

            {/* Warning Notice Box */}
            <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-3.5 text-xs text-amber-200/90 leading-relaxed">
              <p className="font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                You will NOT be able to edit these details again!
              </p>
              <p>
                You get <strong>only 1 chance</strong> to set your academic profile. Once confirmed, these details are permanently locked to your account. In case of any future change, you will need to contact the college administrative office.
              </p>
            </div>

            {/* Details Summary Review */}
            <div className="bg-[#090D16]/90 border border-slate-800 rounded-xl p-4 space-y-2.5 text-xs">
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider pb-1 border-b border-slate-800">
                Summary of Credentials to Lock
              </p>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Degree Program:</span>
                <span className="font-semibold text-teal-300">{formData.program}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Branch / Specialization:</span>
                <span className="font-semibold text-slate-200">
                  {formData.program === "BCA" ? "Core BCA" : formData.branch || "Not Specified"}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Academic Year:</span>
                <span className="font-semibold text-slate-200">
                  {formData.year === "1"
                    ? "1st Year"
                    : formData.year === "2"
                    ? "2nd Year"
                    : formData.year === "3"
                    ? "3rd Year"
                    : `${formData.year}th Year`}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Current Semester:</span>
                <span className="font-semibold text-slate-200">Semester {formData.sem}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Mobile Number:</span>
                <span className="font-semibold font-mono text-slate-200">+91 {formData.phone}</span>
              </div>
            </div>

            {/* Modal Actions: Edit or Confirm */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
              >
                <Pencil className="w-3.5 h-3.5" />
                <span>Edit Details</span>
              </button>
              <button
                type="button"
                onClick={handleConfirmAndLock}
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 px-5 py-2.5 rounded-xl text-xs font-bold shadow-lg shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <Lock className="w-4 h-4 text-slate-950" />
                )}
                <span>Confirm & Lock Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}