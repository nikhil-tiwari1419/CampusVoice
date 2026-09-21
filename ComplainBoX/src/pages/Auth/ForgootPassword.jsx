import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Mail, 
  Key, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowLeft, 
  Loader2, 
  CheckCircle2, 
  ShieldAlert, 
  RotateCcw
} from "lucide-react";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";

export default function ForgootPassword() {
  const { forgotPassword, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // 1: Email, 2: OTP + New Password, 3: Success
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  const validateStep1 = () => {
    const next = {};
    if (!email.trim()) {
      next.email = "Please enter your campus email";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      next.email = "Please enter a valid email address";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next = {};
    if (!otp.trim()) {
      next.otp = "Enter the 6-digit OTP";
    } else if (otp.length < 6) {
      next.otp = "OTP must be 6 digits";
    }

    if (!newPassword) {
      next.newPassword = "New password is required";
    } else if (newPassword.length < 6) {
      next.newPassword = "Password must be at least 6 characters";
    }

    if (newPassword !== confirmPassword) {
      next.confirmPassword = "Passwords do not match";
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!validateStep1()) return;

    setLoading(true);
    setApiError("");

    try {
      await forgotPassword(email.trim().toLowerCase());
      toast.success("Reset code sent to your email!");
      setStep(2);
      setCountdown(60);
    } catch (err) {
      setApiError(err.response?.data?.message || "Failed to send OTP. Please check your email.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (countdown > 0 || resending) return;

    setResending(true);
    setApiError("");
    try {
      await forgotPassword(email.trim().toLowerCase());
      toast.success("A fresh OTP has been sent!");
      setCountdown(60);
    } catch (err) {
      toast.error(err.response?.data?.message || "Could not resend OTP");
    } finally {
      setResending(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!validateStep2()) return;

    setLoading(true);
    setApiError("");

    try {
      await resetPassword({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      });
      toast.success("Password reset successfully!");
      setStep(3);
    } catch (err) {
      setApiError(err.response?.data?.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white flex items-center justify-center p-4 sm:p-6 overflow-hidden select-none font-sans">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-blue-50/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[250px] bg-teal-50/40 rounded-full blur-[110px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(#E5E7EB 1px, transparent 1px), linear-gradient(90deg, #E5E7EB 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-200/40 backdrop-blur-xl">
          {/* Top Status Header */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
            </span>
            <span className="text-[11px] font-medium tracking-wider uppercase text-slate-500">
              Campus Security Portal
            </span>
          </div>

          {/* API Error Alert */}
          {apiError && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{apiError}</span>
            </div>
          )}

          {/* Step 1: Enter Email */}
          {step === 1 && (
            <div>
              <div className="text-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Forgot Password?
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                  Enter your registered campus email and we will dispatch a 6-digit recovery code.
                </p>
              </div>

              <form onSubmit={handleSendOtp} noValidate className="space-y-4">
                <div>
                  <label htmlFor="reset-email" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Campus Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="reset-email"
                      type="email"
                      placeholder="student@campus.edu"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors((prev) => ({ ...prev, email: undefined }));
                        setApiError("");
                      }}
                      className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 ${
                        errors.email
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-slate-200 hover:border-slate-300 focus:border-teal-400 focus:ring-teal-100"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-rose-600 mt-1.5">{errors.email}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl py-2.5 mt-2 transition-all shadow-md shadow-teal-600/20 hover:shadow-teal-600/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <span>Send Recovery Code</span>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step 2: OTP & New Password */}
          {step === 2 && (
            <div>
              <div className="text-center mb-6">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Reset Password
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                  Code sent to <span className="text-teal-600 font-medium">{email}</span>
                </p>
              </div>

              <form onSubmit={handleResetPassword} noValidate className="space-y-4">
                {/* OTP Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label htmlFor="reset-otp" className="block text-xs font-medium text-slate-700">
                      Recovery OTP
                    </label>
                    <span className="text-[11px] text-slate-500 font-mono">6 Digits</span>
                  </div>
                  <div className="relative">
                    <Key className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="reset-otp"
                      type="text"
                      maxLength={6}
                      placeholder="••••••"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value.trim());
                        setErrors((prev) => ({ ...prev, otp: undefined }));
                        setApiError("");
                      }}
                      className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-3 font-mono text-base tracking-[0.45em] text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 ${
                        errors.otp
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-slate-200 hover:border-slate-300 focus:border-teal-400 focus:ring-teal-100"
                      }`}
                    />
                  </div>
                  {errors.otp && (
                    <p className="text-xs text-rose-600 mt-1.5">{errors.otp}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label htmlFor="new-password" className="block text-xs font-medium text-slate-700 mb-1.5">
                    New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="new-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, newPassword: undefined }));
                        setApiError("");
                      }}
                      className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 ${
                        errors.newPassword
                          ? "border-rose-400 focus:ring-rose-200"
                          : "border-slate-200 hover:border-slate-300 focus:border-teal-400 focus:ring-teal-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-xs text-rose-600 mt-1.5">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <label htmlFor="confirm-new-password" className="block text-xs font-medium text-slate-700 mb-1.5">
                    Confirm New Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      id="confirm-new-password"
                      type={showConfirm ? "text" : "password"}
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
                        setApiError("");
                      }}
                      className={`w-full bg-slate-50 border rounded-xl py-2.5 pl-10 pr-10 text-sm text-slate-900 placeholder-slate-400 outline-none transition-all focus:ring-2 ${
                        errors.confirmPassword
                          ? "border-rose-400 focus:ring-rose-200"
                          : confirmPassword && newPassword === confirmPassword
                          ? "border-teal-400 focus:border-teal-500 focus:ring-teal-100"
                          : "border-slate-200 hover:border-slate-300 focus:border-teal-400 focus:ring-teal-100"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm(!showConfirm)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                    >
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-rose-600 mt-1.5">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Resend OTP Row */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    Change email
                  </button>
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={countdown > 0 || resending}
                    className="flex items-center gap-1.5 text-teal-600 hover:text-teal-700 disabled:text-slate-400 transition-colors cursor-pointer disabled:cursor-not-allowed font-medium"
                  >
                    <RotateCcw className={`w-3 h-3 ${resending ? "animate-spin" : ""}`} />
                    <span>{countdown > 0 ? `Resend code in ${countdown}s` : "Resend OTP"}</span>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl py-2.5 mt-2 transition-all shadow-md shadow-teal-600/20 hover:shadow-teal-600/30 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-white" />
                      <span>Updating Password...</span>
                    </>
                  ) : (
                    <span>Set New Password</span>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Step 3: Success Screen */}
          {step === 3 && (
            <div className="flex flex-col items-center gap-3 py-4 text-center animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center shadow-lg shadow-teal-200/20 mb-1">
                <CheckCircle2 className="w-7 h-7 text-teal-600" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">Password Changed!</h2>
              <p className="text-xs sm:text-sm text-slate-600 max-w-[280px]">
                Your password has been successfully reset. You can now log into your student account with your new credentials.
              </p>
              <button
                onClick={() => navigate("/login")}
                className="mt-4 w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-xl py-2.5 transition-all shadow-md shadow-teal-600/20 hover:shadow-teal-600/30 active:scale-[0.99] cursor-pointer"
              >
                Return to Sign In
              </button>
            </div>
          )}

          {/* Footer Back Link */}
          {step !== 3 && (
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-center">
              <Link
                to="/login"
                className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-teal-600 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to sign in</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
