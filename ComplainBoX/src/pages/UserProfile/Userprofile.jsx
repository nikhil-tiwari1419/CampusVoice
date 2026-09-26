import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import { getUserProfile, completeUserProfile, getPrograms, getBranches } from "../../api/user";
import {
  GraduationCap,
  Building2,
  Calendar,
  Layers,
  Phone,
  Loader2,
  Pencil,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  Lock,
} from "lucide-react";

export default function UserProfile() {
  const { checkAuth } = useAuth();

  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [profileData, setProfileData] = useState(null);

  // Dropdown data from backend
  const [programs, setPrograms] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    program: "",       // will hold Program _id
    programName: "",    // for display purposes
    branch: "",         // will hold Branch _id (or "" if program has no branches)
    hasBranches: false,
    year: "1",
    sem: "1",
  });

  // Fetch programs list once on mount
  useEffect(() => {
    async function fetchPrograms() {
      try {
        const result = await getPrograms();
        const list = result?.data || [];
        setPrograms(list);
      } catch (err) {
        console.error("Could not fetch programs:", err);
        toast.error("Unable to load program list");
      }
    }
    fetchPrograms();
  }, []);

  // Fetch full student profile
 useEffect(() => {
  async function fetchUserProfile() {
    try {
      setLoadingProfile(true);
      setProfileError(null);

      const result = await getUserProfile();
      const student = result?.data ?? result;

      if (student) {
        setProfileData(student);

        const programId = student.batch?.program?._id || "";
        const hasBranches =
          student.batch?.program?.hasBranches || false;
        const branchId = student.batch?.branch?._id || "";

        setFormData((prev) => ({
          ...prev,
          username: student.username || "",
          email: student.email || "",
          phone: student.phone ? String(student.phone) : "",
          program: programId,
          programName: student.batch?.program?.name || "",
          branch: branchId,
          hasBranches,
          year: student.batch?.year
            ? String(student.batch.year)
            : "1",
          sem: student.sem ? String(student.sem) : "1",
        }));

        // IMPORTANT:
        // On refresh, handleProgramChange() doesn't run,
        // so branches must be loaded manually.
        if (programId && hasBranches) {
          try {
            setLoadingBranches(true);

            const branchResult = await getBranches(programId);

            setBranches(branchResult?.data || []);
          } catch (err) {
            console.error("Could not fetch branches:", err);
            toast.error("Unable to load branches");
          } finally {
            setLoadingBranches(false);
          }
        }
      }
    } catch (err) {
      console.error("Could not fetch profile:", err);
      setProfileError(
        "Unable to load your profile right now. Please refresh the page."
      );
    } finally {
      setLoadingProfile(false);
    }
  }

  fetchUserProfile();
}, []);
  
  // When program changes — fetch its branches (if any) and reset branch/year/sem
  const handleProgramChange = async (e) => {
    const selectedProgramId = e.target.value;
    const selectedProgram = programs.find((p) => p._id === selectedProgramId);

    setFormData((prev) => ({
      ...prev,
      program: selectedProgramId,
      programName: selectedProgram?.name || "",
      hasBranches: selectedProgram?.hasBranches || false,
      branch: "",
      year: "1",
      sem: "1",
    }));

    setBranches([]);

    if (selectedProgram?.hasBranches) {
      setLoadingBranches(true);
      try {
        const result = await getBranches(selectedProgramId);
        setBranches(result?.data || []);
      } catch (err) {
        console.error("Could not fetch branches:", err);
        toast.error("Unable to load branches for this program");
      } finally {
        setLoadingBranches(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "program") {
      handleProgramChange(e);
      return;
    }

    if (name === "year") {
      setFormData((prev) => ({
        ...prev,
        year: value,
        sem: String(Number(value) * 2 - 1),
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const selectedYearNum = Number(formData.year) || 1;
  const validSemesters = [selectedYearNum * 2 - 1, selectedYearNum * 2];
  const selectedProgramData = programs.find((p) => p._id === formData.program);
  const maxYears = selectedProgramData?.numYears || 4;

  const handleInitiateSave = (e) => {
    e?.preventDefault?.();

    if (!formData.program) {
      toast.error("Please select a program");
      return;
    }
    if (!formData.phone || formData.phone.trim().length < 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    if (formData.hasBranches && !formData.branch) {
      toast.error(`Please select a branch for ${formData.programName}`);
      return;
    }
    setShowProfileModal(false);
    setShowConfirmModal(true);
  };

  const handleConfirmAndLock = async () => {
    setSaving(true);
    try {
      const payload = {
        program: formData.program,                          // ObjectId
        branch: formData.hasBranches ? formData.branch : "", // ObjectId or empty
        year: Number(formData.year),
        sem: Number(formData.sem),
        phone: formData.phone.trim(),
      };

      const res = await completeUserProfile(payload);
      toast.success(res?.message || "Academic profile locked and verified successfully!");
      setProfileData(res?.data || null);
      setShowConfirmModal(false);
      await checkAuth?.();
    } catch (err) {
      console.error("Failed to complete profile:", err);
      toast.error(err.response?.data?.message || "Failed to save academic profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const isProfileComplete = Boolean(profileData?.isProfileComplete);
  const selectedBranchName = branches.find((b) => b._id === formData.branch)?.name;

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-50 via-white to-teal-50/30 text-slate-900 font-sans overflow-hidden select-none py-8 px-4 sm:px-6 lg:py-12">
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-64 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-72 h-56 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-600 text-xs font-semibold mb-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
            </span>
            Student Credentials
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Academic & Account Profile
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-md mx-auto">
            Manage your enrollment details, contact number, and grievance submission authorization.
          </p>
        </div>

        {profileError && (
          <div className="bg-rose-500/10 border border-rose-500/30 rounded-2xl p-4 flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
            <p className="text-sm font-semibold text-rose-700">{profileError}</p>
          </div>
        )}

        {!loadingProfile && !profileError && !isProfileComplete && (
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-amber-800">Action Required: Complete Academic Profile</h3>
                <p className="text-xs text-amber-700/80 mt-0.5">
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

        <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-teal-500/10 transition-all duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-8 border-b border-slate-200/80">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 shrink-0 rounded-2xl bg-gradient-to-tr from-teal-500/25 to-emerald-400/10 border border-teal-500/40 text-teal-600 flex items-center justify-center text-2xl font-bold uppercase shadow-lg">
                {formData.username ? formData.username.charAt(0) : "S"}
              </div>
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 capitalize">
                    {loadingProfile ? "Loading..." : formData.username || "Student"}
                  </h2>
                  {isProfileComplete ? (
                    <span className="inline-flex items-center gap-1.5 bg-emerald-500/15 border border-emerald-500/30 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Verified & Locked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 bg-amber-500/15 border border-amber-500/30 text-amber-700 px-3 py-1 rounded-full text-xs font-semibold">
                      <Clock className="w-4 h-4" />
                      Setup Pending
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 mt-1">{formData.email}</p>
              </div>
            </div>

            {isProfileComplete ? (
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-teal-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold border border-emerald-200/60 shadow-sm">
                <Lock className="w-4 h-4 text-emerald-600" />
                <span>Profile Locked</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowProfileModal(true)}
                disabled={saving}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-teal-400/30 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Pencil className="w-4 h-4" />
                <span>Set Academic Info</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <GraduationCap className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-wider">Program</span>
              </div>
              <p className="font-semibold text-slate-900">{formData.programName || "Pending..."}</p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Building2 className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-wider">Branch</span>
              </div>
              <p className="font-semibold text-slate-900">
                {!formData.hasBranches ? "Core (No Branch)" : selectedBranchName || "Pending..."}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-wider">Year & Sem</span>
              </div>
              <p className="font-semibold text-slate-900">
                Year {formData.year}, Semester {formData.sem}
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-slate-500 mb-1">
                <Phone className="w-4 h-4" />
                <span className="text-xs uppercase font-bold tracking-wider">Mobile</span>
              </div>
              <p className="font-semibold text-slate-900 font-mono">
                {formData.phone ? `+91 ${formData.phone}` : "Pending..."}
              </p>
            </div>
          </div>

          {!isProfileComplete ? (
            <div className="mt-8 pt-7 border-t border-slate-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-amber-700 text-sm">
                <AlertTriangle className="w-5 h-5 shrink-0" />
                <span className="font-medium">One-Time Submission: Academic details cannot be edited after confirmation.</span>
              </div>
              <button
                type="button"
                onClick={handleInitiateSave}
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 px-6 py-3 rounded-xl text-sm font-bold shadow-lg shadow-teal-400/30 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>Submit & Review Academic Details</span>
              </button>
            </div>
          ) : (
            <div className="mt-8 pt-6 border-t border-slate-200/80 flex items-center gap-3 text-sm text-slate-700">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>
                Academic credentials are authenticated and permanently locked. For official changes or corrections, please contact the campus administration.
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl shadow-slate-300/50 text-slate-900 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-6 sm:p-8 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Edit Academic Profile</h3>
                <p className="text-sm text-slate-500 mt-1">Set your academic details and contact number.</p>
              </div>
              <button
                onClick={() => setShowProfileModal(false)}
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-7">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-teal-600" />
                    Degree Program
                  </label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    disabled={saving}
                    className="w-full bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-3 px-4 text-sm text-slate-900 outline-none transition-all disabled:opacity-50 cursor-pointer font-medium"
                  >
                    <option value="">Select Program</option>
                    {programs.map((prog) => (
                      <option key={prog._id} value={prog._id}>
                        {prog.name} ({prog.numYears} Years)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-teal-600" />
                    Branch / Specialization
                  </label>
                  {!formData.hasBranches ? (
                    <input
                      type="text"
                      disabled
                      value={formData.program ? "Core (No Branch Division)" : "Select a program first"}
                      className="w-full bg-slate-100 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-500 outline-none opacity-60 cursor-not-allowed font-medium"
                    />
                  ) : loadingBranches ? (
                    <div className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-500 flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" /> Loading branches...
                    </div>
                  ) : (
                    <select
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      disabled={saving}
                      className="w-full bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-3 px-4 text-sm text-slate-900 outline-none transition-all disabled:opacity-50 cursor-pointer font-medium"
                    >
                      <option value="">Select Branch</option>
                      {branches.map((b) => (
                        <option key={b._id} value={b._id}>
                          {b.name}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-teal-600" />
                    Academic Year
                  </label>
                  <select
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    disabled={saving || !formData.program}
                    className="w-full bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-3 px-4 text-sm text-slate-900 outline-none transition-all disabled:opacity-50 cursor-pointer font-medium"
                  >
                    {Array.from({ length: maxYears }, (_, i) => i + 1).map((y) => (
                      <option key={y} value={y}>
                        Year {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-teal-600" />
                    Current Semester
                  </label>
                  <select
                    name="sem"
                    value={formData.sem}
                    onChange={handleChange}
                    disabled={saving}
                    className="w-full bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-3 px-4 text-sm text-slate-900 outline-none transition-all disabled:opacity-50 cursor-pointer font-medium"
                  >
                    {validSemesters.map((s) => (
                      <option key={s} value={s}>
                        Semester {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-2.5 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-teal-600" />
                    Contact Mobile Number
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono text-slate-600 font-semibold">
                      +91
                    </span>
                    <input
                      type="tel"
                      name="phone"
                      maxLength={10}
                      placeholder="9876543210"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={saving}
                      className="w-full bg-slate-50/80 border border-slate-200 hover:border-slate-300 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-3 pl-14 pr-4 text-sm font-mono text-slate-900 placeholder-slate-400 outline-none transition-all disabled:opacity-50 font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-slate-100 bg-slate-50/50 rounded-b-3xl flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowProfileModal(false)}
                className="px-6 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleInitiateSave}
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-teal-400/30 transition-all duration-200 cursor-pointer"
              >
                <span>Review & Save</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirm & Lock Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-white border border-amber-500/30 rounded-3xl p-7 shadow-2xl shadow-slate-300/50 text-slate-900 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold text-amber-700 uppercase tracking-wider block mb-1">
                  Important Notice • One-Time Action
                </span>
                <h3 className="text-xl font-bold text-slate-900">Confirm & Lock Academic Details?</h3>
              </div>
            </div>

            <div className="bg-amber-500/12 border border-amber-500/30 rounded-2xl p-4 text-sm text-amber-900 leading-relaxed">
              <p className="font-semibold text-amber-700 mb-2 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                You will NOT be able to edit these details again!
              </p>
              <p>
                You get <strong>only 1 chance</strong> to set your academic profile. Once confirmed, these details are permanently locked. For changes, contact the college administration.
              </p>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-2xl p-4 space-y-2.5 text-sm">
              <p className="text-xs font-bold text-slate-600 uppercase tracking-wider pb-2 border-b border-slate-300">
                Summary of Credentials to Lock
              </p>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-700 font-medium">Degree Program:</span>
                <span className="font-bold text-teal-700">{formData.programName}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-700 font-medium">Branch / Specialization:</span>
                <span className="font-bold text-slate-800">
                  {!formData.hasBranches ? "Core (No Branch)" : selectedBranchName || "Not Specified"}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-700 font-medium">Academic Year:</span>
                <span className="font-bold text-slate-800">Year {formData.year}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-700 font-medium">Current Semester:</span>
                <span className="font-bold text-slate-800">Semester {formData.sem}</span>
              </div>
              <div className="flex justify-between py-1.5 border-t border-slate-300 pt-2">
                <span className="text-slate-700 font-medium">Mobile Number:</span>
                <span className="font-bold font-mono text-slate-800">+91 {formData.phone}</span>
              </div>
            </div>

            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-3 pt-3">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-semibold border border-slate-300 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Pencil className="w-4 h-4" />
                <span>Edit Details</span>
              </button>
              <button
                type="button"
                onClick={handleConfirmAndLock}
                disabled={saving}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-400 to-emerald-400 hover:from-teal-300 hover:to-emerald-300 text-slate-950 px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-teal-500/30 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Lock className="w-4 h-4" />}
                <span>Confirm & Lock Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
