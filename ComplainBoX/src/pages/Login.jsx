import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, ShieldCheck, Check, X, User, AtSign } from "lucide-react";
import { useAuth } from "../context/auth"; // Adjust path if necessary

function GoogleMark({ className = "w-4 h-4" }) {
  return <div className={className}>G</div>;
}

export default function Login() {
  // Removed verifyEmail as it's now handled on its own page
  const { login, register } = useAuth();
  const navigate = useNavigate();

  // mode is now strictly "signup" | "login"
  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Removed otp from state
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
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";

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
        // Authenticate and redirect
        const res = await login({ email: form.email, password: form.password });
        if (res.user?.role === 'admin') {
          navigate('/adminhome');
        } else {
          navigate('/userhome');
        }
      }
      else if (mode === "signup") {
        // Register the user
        await register({ name: form.name, username: form.username, email: form.email, password: form.password });

        // Redirect to the Verify Email page and pass the email address
        navigate('/verify-email', { state: { email: form.email } });
      }
    } catch (err) {
      setApiError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-[85vh] w-full bg-[#0B1018] flex items-center justify-center p-6 font-sans">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#7C8598 1px, transparent 1px), linear-gradient(90deg, #7C8598 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative w-full max-w-sm">
        <span className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-[#3AD1B8]/60 rounded-tl-sm" />
        <span className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-[#3AD1B8]/60 rounded-tr-sm" />
        <span className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-[#3AD1B8]/60 rounded-bl-sm" />
        <span className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-[#3AD1B8]/60 rounded-br-sm" />

        <div className="bg-[#121826] border border-[#232C3D] rounded-2xl px-8 py-9 shadow-2xl shadow-black/40">
          <div className="flex items-center justify-center gap-1.5 mb-6 text-[11px] tracking-[0.2em] uppercase text-[#7C8598] font-mono">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3AD1B8] opacity-60" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3AD1B8]" />
            </span>
            Secure connection
          </div>

          <h1 className="text-2xl font-semibold text-[#EAEDF3] text-center tracking-tight">
            {mode === "signup" ? "Create your account" : "Welcome back"}
          </h1>
          <p className="text-sm text-[#7C8598] text-center mt-1.5 mb-7">
            {mode === "signup"
              ? "Sign up to get started"
              : "Log in to continue where you left off"}
          </p>

          {apiError && (
            <div className="mb-4 p-3 rounded-lg bg-[#E4575B]/10 border border-[#E4575B]/20 text-[#E4575B] text-xs text-center">
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* Username — signup only */}
            {mode === "signup" && (
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#7C8598] font-mono mb-1.5">
                  Username
                </label>
                <div className="relative">
                  <AtSign className="w-4 h-4 text-[#5B6579] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="johndoe"
                    value={form.username}
                    onChange={(e) => update("username", e.target.value)}
                    className={`w-full bg-[#0E1420] border rounded-lg py-2.5 pl-10 pr-3 text-sm text-[#EAEDF3] placeholder-[#4A5266] outline-none transition focus:ring-2 focus:ring-[#3AD1B8]/40 ${errors.username ? "border-[#E4575B]" : "border-[#232C3D] focus:border-[#3AD1B8]/60"
                      }`}
                  />
                </div>
                {errors.username && <p className="text-xs text-[#E4575B] mt-1.5">{errors.username}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-[11px] uppercase tracking-widest text-[#7C8598] font-mono mb-1.5">
                Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#5B6579] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`w-full bg-[#0E1420] border rounded-lg py-2.5 pl-10 pr-3 text-sm text-[#EAEDF3] placeholder-[#4A5266] outline-none transition focus:ring-2 focus:ring-[#3AD1B8]/40 ${errors.email ? "border-[#E4575B]" : "border-[#232C3D] focus:border-[#3AD1B8]/60"
                    }`}
                />
              </div>
              {errors.email && <p className="text-xs text-[#E4575B] mt-1.5">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-[11px] uppercase tracking-widest text-[#7C8598] font-mono mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#5B6579] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className={`w-full bg-[#0E1420] border rounded-lg py-2.5 pl-10 pr-10 text-sm text-[#EAEDF3] placeholder-[#4A5266] outline-none transition focus:ring-2 focus:ring-[#3AD1B8]/40 ${errors.password ? "border-[#E4575B]" : "border-[#232C3D] focus:border-[#3AD1B8]/60"
                    }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6579] hover:text-[#B3BAC9] transition"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-[#E4575B] mt-1.5">{errors.password}</p>}
            </div>

            {/* Confirm password — signup only */}
            {mode === "signup" && (
              <div>
                <label htmlFor="confirm" className="block text-[11px] uppercase tracking-widest text-[#7C8598] font-mono mb-1.5">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#5B6579] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={(e) => update("confirm", e.target.value)}
                    className={`w-full bg-[#0E1420] border rounded-lg py-2.5 pl-10 pr-10 text-sm text-[#EAEDF3] placeholder-[#4A5266] outline-none transition focus:ring-2 focus:ring-[#3AD1B8]/40 ${errors.confirm ? "border-[#E4575B]" : passwordsMatch ? "border-[#3AD1B8]/60" : "border-[#232C3D] focus:border-[#3AD1B8]/60"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5B6579] hover:text-[#B3BAC9] transition"
                  >
                    {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.confirm ? (
                  <p className="text-xs text-[#E4575B] mt-1.5 flex items-center gap-1"><X className="w-3 h-3" /> {errors.confirm}</p>
                ) : passwordsMatch ? (
                  <p className="text-xs text-[#3AD1B8] mt-1.5 flex items-center gap-1"><Check className="w-3 h-3" /> Passwords match</p>
                ) : passwordsMismatch ? (
                  <p className="text-xs text-[#E4575B] mt-1.5 flex items-center gap-1"><X className="w-3 h-3" /> Passwords don't match</p>
                ) : null}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#3AD1B8] hover:bg-[#33BDA6] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B1018] font-medium text-sm rounded-lg py-2.5 mt-2 transition active:scale-[0.98]"
            >
              {isLoading ? "Processing..." : mode === "signup" ? "Create account" : "Log in"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="h-px flex-1 bg-[#232C3D]" />
            <span className="text-[11px] uppercase tracking-widest text-[#5B6579] font-mono">Or</span>
            <div className="h-px flex-1 bg-[#232C3D]" />
          </div>

          <button
            type="button"
            className="w-full flex items-center justify-center gap-2.5 bg-[#0E1420] hover:bg-[#151D2C] border border-[#232C3D] rounded-lg py-2.5 text-sm text-[#EAEDF3] font-medium transition"
          >
            <GoogleMark className="w-4 h-4" />
            {mode === "signup" ? "Sign up with Google" : "Continue with Google"}
          </button>

          <div className="mt-6 pt-5 border-t border-[#1B2230] flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setMode((m) => (m === "signup" ? "login" : "signup"));
                setErrors({});
                setApiError("");
              }}
              className="text-xs text-[#7C8598] hover:text-[#B3BAC9] transition"
            >
              {mode === "signup" ? "Already have an account? Log in" : "New here? Sign up"}
            </button>

            <button
              type="button"
              className="flex items-center gap-1.5 text-xs text-[#7C8598] hover:text-[#3AD1B8] transition"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              Admin login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}