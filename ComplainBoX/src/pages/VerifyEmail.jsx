import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Mail, Key, Check, ShieldAlert, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/auth"; // Adjust path if necessary

export default function VerifyEmail() {
  const { verifyEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize email from router state if available
  const [form, setForm] = useState({ 
    email: location.state?.email || "", 
    otp: "" 
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
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email";

    if (!form.otp.trim()) next.otp = "Enter the 6-digit OTP";

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
    <div className="min-h-[85vh] w-full bg-[#0B1018] flex items-center justify-center p-6 font-sans">
      {/* faint grid backdrop */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#7C8598 1px, transparent 1px), linear-gradient(90deg, #7C8598 1px, transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* corner brackets */}
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
            Identity Verification
          </div>

          <h1 className="text-2xl font-semibold text-[#EAEDF3] text-center tracking-tight">
            Verify your email
          </h1>
          <p className="text-sm text-[#7C8598] text-center mt-1.5 mb-7">
            Enter the one-time password sent to your inbox.
          </p>

          {apiError && (
            <div className="mb-4 p-3 flex items-center justify-center gap-2 rounded-lg bg-[#E4575B]/10 border border-[#E4575B]/20 text-[#E4575B] text-xs text-center">
              <ShieldAlert className="w-4 h-4" />
              {apiError}
            </div>
          )}

          {submitted ? (
            <div className="flex flex-col items-center gap-3 py-6 text-center">
              <div className="w-11 h-11 rounded-full bg-[#3AD1B8]/10 flex items-center justify-center">
                <Check className="w-5 h-5 text-[#3AD1B8]" />
              </div>
              <p className="text-[#EAEDF3] font-medium">Account verified successfully!</p>
              <p className="text-sm text-[#7C8598]">You can now securely log in to your account.</p>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 w-full bg-[#3AD1B8] hover:bg-[#33BDA6] text-[#0B1018] font-medium text-sm rounded-lg py-2.5 transition active:scale-[0.98]"
              >
                Go to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              
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
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    className={`w-full bg-[#0E1420] border rounded-lg py-2.5 pl-10 pr-3 text-sm text-[#EAEDF3] placeholder-[#4A5266] outline-none transition focus:ring-2 focus:ring-[#3AD1B8]/40 ${
                      errors.email ? "border-[#E4575B]" : "border-[#232C3D] focus:border-[#3AD1B8]/60"
                    }`}
                  />
                </div>
                {errors.email && <p className="text-xs text-[#E4575B] mt-1.5">{errors.email}</p>}
              </div>

              {/* OTP */}
              <div>
                <label className="block text-[11px] uppercase tracking-widest text-[#7C8598] font-mono mb-1.5 flex justify-between">
                  <span>One-Time Password</span>
                </label>
                <div className="relative">
                  <Key className="w-4 h-4 text-[#5B6579] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    maxLength="6"
                    placeholder="123456"
                    value={form.otp}
                    onChange={(e) => update("otp", e.target.value)}
                    className={`w-full bg-[#0E1420] border rounded-lg py-2.5 pl-10 pr-3 text-sm text-[#EAEDF3] placeholder-[#4A5266] outline-none transition focus:ring-2 focus:ring-[#3AD1B8]/40 tracking-[0.2em] ${
                      errors.otp ? "border-[#E4575B]" : "border-[#232C3D] focus:border-[#3AD1B8]/60"
                    }`}
                  />
                </div>
                {errors.otp && <p className="text-xs text-[#E4575B] mt-1.5">{errors.otp}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#3AD1B8] hover:bg-[#33BDA6] disabled:opacity-50 disabled:cursor-not-allowed text-[#0B1018] font-medium text-sm rounded-lg py-2.5 mt-2 transition active:scale-[0.98]"
              >
                {isLoading ? "Verifying..." : "Verify Identity"}
              </button>
            </form>
          )}

          {!submitted && (
            <div className="mt-6 pt-5 border-t border-[#1B2230] flex items-center justify-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="flex items-center gap-1.5 text-xs text-[#7C8598] hover:text-[#B3BAC9] transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}