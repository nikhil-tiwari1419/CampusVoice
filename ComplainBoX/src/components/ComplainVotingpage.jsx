import React, { useState } from "react";
import {
  X,
  ThumbsUp,
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  User,
  MessageSquare,
} from "lucide-react";
import toast from "react-hot-toast";
import { giveVote } from "../api/user";

const statusStyles = {
  Resolved: "bg-teal-500/10 border-teal-500/20 text-teal-600",
  "In Progress": "bg-sky-500/10 border-sky-500/20 text-sky-600",
  Pending: "bg-amber-500/10 border-amber-500/20 text-amber-600",
  Rejected: "bg-rose-500/10 border-rose-500/20 text-rose-600",
};

const statusIcons = {
  Resolved: CheckCircle2,
  "In Progress": Clock,
  Pending: Clock,
  Rejected: XCircle,
};

export default function ComplainVotingpage({ complaint, onClose, onVoteUpdate }) {
  const [voting, setVoting] = useState(false);
  const [voteCount, setVoteCount] = useState(complaint.voteCount ?? 0);
  const [hasVoted, setHasVoted] = useState(complaint.hasVoted ?? false);

  if (!complaint) return null;

  const StatusIcon = statusIcons[complaint.status] || Clock;

  const handleVote = async () => {
    setVoting(true);
    try {
      const res = await giveVote(complaint.id);

      // Backend toggles the vote — sync local state with response
      setHasVoted(res.voted);
      setVoteCount(res.voteCount);

      toast.success(res.message || (res.voted ? "Vote added" : "Vote removed"));

      // Let the parent list know so it can update its own state too
      onVoteUpdate?.(complaint.id, { voted: res.voted, voteCount: res.voteCount });
    } catch (err) {
      console.error("Vote error:", err);
      const msg = err.response?.data?.message || "Unable to process your vote right now.";
      toast.error(msg);
    } finally {
      setVoting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-mono font-bold text-teal-600 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-lg">
                {complaint.id}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${statusStyles[complaint.status] || statusStyles.Pending
                  }`}
              >
                <StatusIcon className="w-3 h-3" />
                {complaint.status}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {complaint.subject}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Meta info */}
        <div className="grid grid-cols-2 gap-3 bg-slate-50 border border-slate-200 p-4 rounded-2xl text-xs">
          <div>
            <p className="text-slate-500 font-mono flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> DEPARTMENT
            </p>
            <p className="text-slate-800 font-semibold mt-0.5">{complaint.department}</p>
          </div>
          <div>
            <p className="text-slate-500 font-mono flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> DATE LOGGED
            </p>
            <p className="text-slate-800 font-semibold mt-0.5">{complaint.date}</p>
          </div>
          {complaint.student && (
            <div className="col-span-2">
              <p className="text-slate-500 font-mono flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> SUBMITTED BY
              </p>
              <p className="text-slate-800 font-semibold mt-0.5">{complaint.student}</p>
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <h4 className="text-xs font-mono uppercase text-slate-600 tracking-wider mb-2 flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            Description
          </h4>
          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
            {complaint.message}
          </div>
        </div>

        {/* Vote section */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">Support this complaint</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">
              {voteCount} <span className="text-sm font-medium text-slate-500">vote{voteCount !== 1 ? "s" : ""}</span>
            </p>
          </div>

          <button
            type="button"
            onClick={handleVote}
            disabled={voting}
            className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-md active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer ${hasVoted
                ? "bg-teal-500 text-white shadow-teal-500/30 hover:bg-teal-600"
                : "bg-slate-100 text-slate-700 border border-slate-200 hover:bg-slate-200"
              }`}
          >
            {voting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <ThumbsUp className={`w-4 h-4 ${hasVoted ? "fill-white" : ""}`} />
            )}
            <span>{hasVoted ? "Voted" : "Vote"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

