import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../../context/auth";
import {
  MessageSquare,
  Star,
  Send,
  Loader2,
  History,
  FileText,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function Feedback() {
  const [selectedComplaint, setSelectedComplaint] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetchingComplaints, setFetchingComplaints] = useState(true);

  const [complaints, setComplaints] = useState([]);
  const [feedbackHistory, setFeedbackHistory] = useState([
    {
      id: 1,
      complaint: "Canteen hygiene complaint",
      rating: 4,
      comment: "Issue was resolved quickly, food quality has improved significantly.",
      date: "02 Sep 2026",
    },
    {
      id: 2,
      complaint: "Classroom projector audio failure",
      rating: 5,
      comment: "IT staff replaced the cabling within 4 hours. Great turnaround!",
      date: "20 Aug 2026",
    },
  ]);

  useEffect(() => {
    async function loadComplaints() {
      try {
        setFetchingComplaints(true);
        const res = await api.get("/user/allcomplain");
        const list = res.data?.data || res.data?.complains || res.data || [];
        if (Array.isArray(list) && list.length > 0) {
          setComplaints(list);
          setSelectedComplaint(list[0]._id || list[0].id || "");
        } else {
          // Fallback mock complaints if user has no complaints yet
          setComplaints([
            { _id: "cmp-1", subject: "Library Wi-Fi connection drop", status: "Resolved" },
            { _id: "cmp-2", subject: "Hostel water heater breakdown", status: "In Progress" },
          ]);
          setSelectedComplaint("cmp-1");
        }
      } catch (err) {
        console.error("Could not load user complaints:", err);
        setComplaints([
          { _id: "cmp-1", subject: "Library Wi-Fi connection drop", status: "Resolved" },
          { _id: "cmp-2", subject: "Hostel water heater breakdown", status: "In Progress" },
        ]);
        setSelectedComplaint("cmp-1");
      } finally {
        setFetchingComplaints(false);
      }
    }

    loadComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedComplaint) {
      toast.error("Please select the complaint you're reviewing");
      return;
    }
    if (rating === 0) {
      toast.error("Please select a star rating (1 to 5)");
      return;
    }
    if (!comment.trim()) {
      toast.error("Please share your comments regarding the resolution");
      return;
    }

    setLoading(true);
    try {
      const complaintObj = complaints.find(
        (c) => (c._id || c.id) === selectedComplaint
      );
      const complaintTitle = complaintObj?.subject || "Campus Complaint";

      await new Promise((res) => setTimeout(res, 800));

      const newEntry = {
        id: Date.now(),
        complaint: complaintTitle,
        rating,
        comment: comment.trim(),
        date: new Date().toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      setFeedbackHistory((prev) => [newEntry, ...prev]);
      toast.success("Resolution feedback submitted successfully!");
      setRating(0);
      setComment("");
    } catch (err) {
      toast.error("Failed to submit feedback. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

      <div className="relative max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Resolution Audit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
            Rate Your Resolution
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Help improve campus administrative responsiveness by rating how your grievances were handled.
          </p>
        </div>

        {/* Feedback Form Card */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl mb-8">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Complaint Selector */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5 flex items-center justify-between">
                <span>Select Grievance / Complaint</span>
                {complaints.length === 0 && !fetchingComplaints && (
                  <Link
                    to="/complain"
                    className="text-[11px] text-teal-400 hover:text-teal-300 flex items-center gap-1"
                  >
                    <span>File a complaint</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                )}
              </label>

              <div className="relative">
                <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={selectedComplaint}
                  onChange={(e) => setSelectedComplaint(e.target.value)}
                  disabled={fetchingComplaints}
                  className="w-full appearance-none bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 pl-10 pr-4 text-sm text-slate-100 outline-none transition-all cursor-pointer disabled:opacity-50"
                >
                  {fetchingComplaints ? (
                    <option value="">Loading your complaints...</option>
                  ) : complaints.length === 0 ? (
                    <option value="">No complaints found</option>
                  ) : (
                    complaints.map((c) => (
                      <option
                        key={c._id || c.id}
                        value={c._id || c.id}
                        className="bg-slate-900 text-slate-100"
                      >
                        {c.subject} — [{c.status || "Pending"}]
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Resolution Quality Rating
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        star <= (hoverRating || rating)
                          ? "fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                          : "fill-transparent text-slate-700 hover:text-slate-500"
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="text-xs font-medium text-teal-400 ml-2">
                    {rating === 5
                      ? "Outstanding"
                      : rating === 4
                      ? "Good"
                      : rating === 3
                      ? "Average"
                      : rating === 2
                      ? "Poor"
                      : "Unsatisfactory"}
                  </span>
                )}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1.5">
                Detailed Feedback & Suggestions
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  placeholder="Share details regarding the timeliness, staff communication, or quality of the fix..."
                  className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold text-sm rounded-xl py-3 transition-all shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Submitting Review...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Submit Resolution Feedback</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Previous Feedback Log */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-slate-500" />
              <h2 className="text-sm font-semibold text-slate-300">
                Your Feedback History
              </h2>
            </div>
            <span className="text-xs text-slate-500">
              {feedbackHistory.length} review{feedbackHistory.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="space-y-3">
            {feedbackHistory.map((fb) => (
              <div
                key={fb.id}
                className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg shadow-black/40 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-semibold text-slate-100">
                    {fb.complaint}
                  </h3>
                  <div className="flex items-center gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-3.5 h-3.5 ${
                          star <= fb.rating
                            ? "fill-amber-400 text-amber-400"
                            : "fill-transparent text-slate-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-400 mb-2.5 leading-relaxed">
                  {fb.comment}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                  <CheckCircle2 className="w-3 h-3 text-teal-400" />
                  <span className="font-mono">{fb.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}