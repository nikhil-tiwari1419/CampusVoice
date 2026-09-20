import React from 'react'
import { Loader2, GraduationCap } from 'lucide-react'

function Pageloader() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center bg-[#080C14] text-slate-100 font-sans select-none relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute w-72 h-72 bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Animated Brand Icon & Spinner */}
      <div className="relative flex items-center justify-center mb-5">
        <div className="w-14 h-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center shadow-lg shadow-teal-500/5">
          <GraduationCap className="w-7 h-7 text-teal-400 animate-pulse" />
        </div>
        <Loader2 className="w-20 h-20 text-teal-400/40 animate-spin absolute" />
      </div>

      {/* Loading Status Indicator */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-400 tracking-widest uppercase">
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
        </span>
        <span>Loading CampusVoice...</span>
      </div>
    </div>
  )
}

export default Pageloader