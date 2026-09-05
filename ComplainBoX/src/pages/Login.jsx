import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Check, X, AtSign, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "../context/auth";

function GoogleMark({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

export default function Login() {
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({ name: "", username: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const passwordsMatch = form.confirm.length > 0 && form.password === form.confirm;
  const passwordsMismatch = form.confirm.length > 0 && form.password !== form.confirm;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setApiError("");
  }

  function validate() {
    const next = {};

    if (!form.email.trim()) next.email = "Enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";

    if (!form.password) next.password = "Enter a password";
    else if (form.password.length < 8) next.password = "Use at least 8 characters";

    if (mode === "signup") {
      if (!form.username.trim()) next.username = "Enter a username";
      if (!form.confirm) next.confirm = "Confirm your password";
      else if (form.confirm !== form.password) next.confirm = "Passwords don't match";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError("");

    try {
      if (mode === "login") {
        const res = await login({ email: form.email, password: form.password });
        if (res.user?.role === 'admin') {
          navigate('/adminhome');
        } else {
          navigate('/userhome');
        }
      } else if (mode === "signup") {
        await register({ name: form.name, username: form.username, email: form.email, password: form.password });
        navigate('/verify-email', { state: { email: form.email } });
      }
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const switchMode = (newMode) => {
    setMode(newMode);
    setErrors({});
    setApiError("");
  };

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[300px] h-[250px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl">
          
          {/* Top Status & Brand Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <span className="text-[11px] font-medium tracking-wider uppercase text-slate-400">CampusVoice Auth</span>
            </div>
            
            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin portal</span>
            </button>
          </div>

          {/* Segmented Mode Switcher */}
          <div className="grid grid-cols-2 p-1 mb-6 bg-[#090D16] border border-slate-800/60 rounded-xl">
            <button
              type="button"
              onClick={() => switchMode("login")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === "login"
                  ? "bg-slate-800 text-slate-100 shadow-sm shadow-black/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                mode === "signup"
                  ? "bg-slate-800 text-slate-100 shadow-sm shadow-black/40"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Create Account
            </button>
          </div>

          <div className="mb-6">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
              {mode === "signup" ? "Create your account" : "Welcome back"}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              {mode === "signup"
                ? "Register with your student credentials to submit grievances."
                : "Log in to track existing tickets or file a new report."}
            </p>
          </div>

          {/* API Error Box */}
          {apiError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{apiError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            {/* Username — signup only */}
            {mode === "signup" && (
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">Username</label>
                <div className="relative">
                  <AtSign className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={(e) => update("username", e.target.value)}
                    className={`w-full bg-[#090D16]/80 border rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:ring-2 ${
                      errors.username
                        ? "border-rose-500/80 focus:ring-rose-500/20"
                        : "border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-teal-400/20"
                    }`}
                  />
                </div>
                {errors.username && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">{errors.username}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                Campus Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="student@campus.edu"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`w-full bg-[#090D16]/80 border rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:ring-2 ${
                    errors.email
                      ? "border-rose-500/80 focus:ring-rose-500/20"
                      : "border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-teal-400/20"
                  }`}
                />
              </div>
              {errors.email && <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className={`w-full bg-[#090D16]/80 border rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:ring-2 ${
                    errors.password
                      ? "border-rose-500/80 focus:ring-rose-500/20"
                      : "border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-teal-400/20"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-0.5"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-rose-400 mt-1.5">{errors.password}</p>}
            </div>

            {/* Confirm password — signup only */}
            {mode === "signup" && (
              <div>
                <label htmlFor="confirm" className="block text-xs font-medium text-slate-300 mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={(e) => update("confirm", e.target.value)}
                    className={`w-full bg-[#090D16]/80 border rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:ring-2 ${
                      errors.confirm
                        ? "border-rose-500/80 focus:ring-rose-500/20"
                        : passwordsMatch
                        ? "border-teal-500/70 focus:border-teal-400 focus:ring-teal-400/20"
                        : "border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-teal-400/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors p-0.5"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirm ? (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <X className="w-3.5 h-3.5" /> {errors.confirm}
                  </p>
                ) : passwordsMatch ? (
                  <p className="text-xs text-teal-400 mt-1.5 flex items-center gap-1 font-medium">
                    <Check className="w-3.5 h-3.5" /> Passwords match
                  </p>
                ) : passwordsMismatch ? (
                  <p className="text-xs text-rose-400 mt-1.5 flex items-center gap-1">
                    <X className="w-3.5 h-3.5" /> Passwords don't match
                  </p>
                ) : null}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold text-sm rounded-xl py-2.5 mt-2 transition-all shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin text-slate-950" />}
              <span>{isLoading ? "Processing..." : mode === "signup" ? "Create Account" : "Sign In"}</span>
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="h-px flex-1 bg-slate-800/80" />
            <span className="text-[11px] uppercase tracking-wider text-slate-500 font-medium">Or continue with</span>
            <div className="h-px flex-1 bg-slate-800/80" />
          </div>

          {/* Social Sign-in */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 bg-[#090D16]/60 hover:bg-slate-800/50 border border-slate-800 hover:border-slate-700 rounded-xl py-2.5 text-sm text-slate-200 font-medium transition-all cursor-pointer"
          >
            <GoogleMark className="w-4 h-4" />
            <span>Google Workspace</span>
          </button>

          {/* Footer toggle */}
          <div className="mt-6 pt-4 border-t border-slate-800/60 text-center">
            <button
              type="button"
              onClick={() => switchMode(mode === "signup" ? "login" : "signup")}
              className="text-xs text-slate-400 hover:text-teal-400 transition-colors cursor-pointer"
            >
              {mode === "signup" ? (
                <>Already have an account? <span className="font-semibold text-slate-200 underline underline-offset-4">Sign in</span></>
              ) : (
                <>Don't have an account yet? <span className="font-semibold text-slate-200 underline underline-offset-4">Register</span></>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}