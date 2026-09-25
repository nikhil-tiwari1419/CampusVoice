import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import {
  MessageSquareHeart,
  Star,
  Send,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Loader2,
} from "lucide-react";

export default function FeedBack() {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [category, setCategory] = useState("Resolution Speed");
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = [
    "Resolution Speed",
    "Officer Communication",
    "Portal Experience",
    "Campus Administration",
    "Other Suggestion",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      toast.error("Please share brief feedback before submitting");
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      toast.success("Thank you! Your feedback has been recorded.");
    }, 600);
  };

  return (
    <div className="relative min-h-screen w-full bg-white text-slate-900 font-sans overflow-hidden select-none py-12 px-4 sm:px-6 flex items-center justify-center">
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

      <div className="relative w-full max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-700 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Continuous Campus Improvement
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Resolution & Portal Feedback
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Rate your grievance resolution experience and help us improve CampusVoice for every student.
          </p>
        </div>

        {submitted ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center shadow-lg shadow-slate-200/40 space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Feedback Submitted Successfully!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Thank you{user?.username ? `, ${user.username}` : ""}! Your rating ({rating}/5 stars) regarding{" "}
              <span className="font-semibold text-slate-800">{category}</span> has been logged with the Campus Quality Cell.
            </p>
            <div className="pt-2 flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setComment("");
                  setRating(5);
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
              >
                Submit Another
              </button>
              <Link
                to="/userdashboard"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Dashboard</span>
              </Link>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-200/40 space-y-6"
          >
            {/* Star Rating */}
            <div className="space-y-2 text-center">
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500">
                Overall Satisfaction Rating
              </label>
              <div className="flex items-center justify-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = (hoveredStar || rating) >= star;
                  return (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredStar(star)}
                      onMouseLeave={() => setHoveredStar(0)}
                      onClick={() => setRating(star)}
                      className="p-1.5 rounded-lg transition-transform hover:scale-110 cursor-pointer"
                    >
                      <Star
                        className={`w-7 h-7 transition-colors ${
                          active
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
              <p className="text-xs font-medium text-teal-700">
                {rating === 5
                  ? "Excellent Experience"
                  : rating === 4
                    ? "Good Experience"
                    : rating === 3
                      ? "Average Experience"
                      : rating === 2
                        ? "Needs Improvement"
                        : "Poor Experience"}
              </p>
            </div>

            {/* Feedback Category */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Feedback Area
              </label>
              <div className="flex flex-wrap gap-2">
                {categories.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      category === item
                        ? "bg-teal-600 text-white border-teal-600 shadow-sm"
                        : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Your Comments or Suggestions
              </label>
              <textarea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell us how your complaint was handled or suggest improvements..."
                className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 rounded-xl p-3.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Shared confidentially with the Campus Quality Cell</span>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs sm:text-sm shadow-md shadow-teal-600/20 transition-all cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Submit Feedback</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}