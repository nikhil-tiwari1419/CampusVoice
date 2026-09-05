import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Key, Check, ShieldAlert, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/auth";

export default function VerifyEmail() {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize email from router state if available
  const [form, setForm] = useState({
    email: location.state?.email || "",
    otp: "",
  });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
    setApiError("");
  }

  function validate() {
    const next = {};
    if (!form.email.trim()) next.email = "Enter your email";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address";

    if (!form.otp.trim()) next.otp = "Enter the 6-digit OTP";
    else if (form.otp.length < 6) next.otp = "Please enter the complete 6-digit code";

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    setApiError("");

    try {
      await verifyEmail({ email: form.email, otp: form.otp });
      setSubmitted(true);
    } catch (err) {
      setApiError(err.response?.data?.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-sans">
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
          
          {/* Top Status Header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
            </span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-slate-400">
              Identity Verification
            </span>
          </div>

          {!submitted ? (
            <>
              <div className="text-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
                  Verify your email
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1.5">
                  Enter the 6-digit one-time password sent to your inbox.
                </p>
              </div>

              {/* API Error Box */}
              {apiError && (
                <div className="mb-5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{apiError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1.5">
                    Campus Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={`w-full bg-[#090D16]/80 border rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all focus:ring-2 ${
                        errors.email
                          ? "border-rose-500/80 focus:ring-rose-500/20"
                          : "border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-teal-400/20"
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-xs text-rose-400 mt-1.5">{errors.email}</p>}
                </div>

                {/* OTP Field */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="otp" className="block text-xs font-medium text-slate-300">
                      One-Time Password (OTP)
                    </label>
                    <span className="text-[11px] text-slate-500 font-mono">6 Digits</span>
                  </div>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="otp"
                      type="text"
                      maxLength={6}
                      placeholder="••••••"
                      value={form.otp}
                      onChange={(e) => update("otp", e.target.value.trim())}
                      className={`w-full bg-[#090D16]/80 border rounded-xl py-2.5 pl-10 pr-3 font-mono text-base tracking-[0.45em] text-slate-100 placeholder-slate-600 outline-none transition-all focus:ring-2 ${
                        errors.otp
                          ? "border-rose-500/80 focus:ring-rose-500/20"
                          : "border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-teal-400/20"
                      }`}
                    />
                  </div>
                  {errors.otp && <p className="text-xs text-rose-400 mt-1.5">{errors.otp}</p>}
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold text-sm rounded-xl py-2.5 mt-3 transition-all shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isLoading && <Loader2 className="w-4 h-4 animate-spin text-slate-950" />}
                  <span>{isLoading ? "Verifying..." : "Verify Identity"}</span>
                </button>
              </form>
            </>
          ) : (
            /* Success View */
            <div className="flex flex-col items-center gap-3 py-4 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-lg shadow-teal-500/5 mb-1">
                <CheckCircle2 className="w-7 h-7 text-teal-400" />
              </div>
              <h2 className="text-xl font-bold text-slate-100 tracking-tight">Account Verified!</h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-[280px]">
                Your email has been authenticated. You can now access your student grievance dashboard.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold text-sm rounded-xl py-2.5 transition-all shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] cursor-pointer"
              >
                Go to Sign In
              </button>
            </div>
          )}

          {/* Footer Back Link */}
          {!submitted && (
            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to login</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}