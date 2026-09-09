import React, { useState } from 'react'
import {
  LayoutDashboard,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Eye,
  Inbox,
  ShieldCheck,
} from 'lucide-react'

function AdminHome() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  // TODO: replace with real data from your API
  const complaints = [
    {
      id: 'CMP-1042',
      subject: 'Hostel water supply issue',
      student: 'Rohan Sharma',
      department: 'Hostel',
      priority: 'High',
      status: 'Pending',
      date: '2026-08-16',
    },
    {
      id: 'CMP-1041',
      subject: 'Projector not working in Lab 3',
      student: 'Priya Verma',
      department: 'CSE',
      priority: 'Medium',
      status: 'In Progress',
      date: '2026-08-15',
    },
    {
      id: 'CMP-1040',
      subject: 'Mess food quality complaint',
      student: 'Aman Gupta',
      department: 'Hostel',
      priority: 'Medium',
      status: 'Resolved',
      date: '2026-08-14',
    },
    {
      id: 'CMP-1039',
      subject: 'Faculty attendance discrepancy',
      student: 'Sneha Iyer',
      department: 'ECE',
      priority: 'Low',
      status: 'Pending',
      date: '2026-08-14',
    },
    {
      id: 'CMP-1038',
      subject: 'Wifi not working in library',
      student: 'Karan Mehta',
      department: 'Admin',
      priority: 'High',
      status: 'In Progress',
      date: '2026-08-13',
    },
  ]

  const stats = [
    { label: 'Total Complaints', value: 128, icon: LayoutDashboard, color: 'blue' },
    { label: 'Pending', value: 34, icon: Clock, color: 'yellow' },
    { label: 'Resolved', value: 82, icon: CheckCircle2, color: 'green' },
    { label: 'High Priority', value: 12, icon: AlertCircle, color: 'red' },
  ]

  const colorMap = {
    blue: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    yellow: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    green: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
    red: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
  }

  const statusStyle = {
    Pending: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    'In Progress': 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    Resolved: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
  }

  const priorityStyle = {
    High: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    Low: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  }

  const filters = ['All', 'Pending', 'In Progress', 'Resolved']

  const filteredComplaints = complaints.filter((c) => {
    const matchesFilter = activeFilter === 'All' || c.status === activeFilter
    const matchesSearch =
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] py-10 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[350px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[450px] h-[300px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <span className="text-[11px] font-medium tracking-wider uppercase text-teal-400">
                Administration Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Admin Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Oversee, triage, and resolve student complaints across campus departments.
            </p>
          </div>

          <div className="flex items-center gap-2.5 bg-[#0F172A]/80 border border-slate-800/80 px-4 py-2 rounded-xl backdrop-blur-md shadow-sm">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-semibold text-slate-200">Authorized Officer</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg shadow-black/40 backdrop-blur-xl hover:border-slate-700/80 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <p className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">{value}</p>
              <p className="text-xs font-medium text-slate-400 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters & Search Toolbar */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-4 shadow-lg shadow-black/40 backdrop-blur-xl flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs text-slate-500 mr-1 font-medium">
              <Filter className="w-3.5 h-3.5" />
              <span>Status:</span>
            </div>
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  activeFilter === f
                    ? 'bg-teal-400 text-slate-950 font-semibold shadow-md shadow-teal-400/10'
                    : 'bg-[#090D16]/60 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search ID, student, subject..."
              className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
            />
          </div>
        </div>

        {/* Complaints Table Container */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl shadow-2xl shadow-black/60 backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-slate-900/60 border-b border-slate-800 text-slate-400 text-[11px] font-semibold uppercase tracking-wider">
                  <th className="px-6 py-4">Ticket ID</th>
                  <th className="px-6 py-4">Subject</th>
                  <th className="px-6 py-4">Student</th>
                  <th className="px-6 py-4">Department</th>
                  <th className="px-6 py-4">Priority</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Submitted</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-slate-800/30 transition-colors group"
                    >
                      <td className="px-6 py-4 font-mono text-xs text-slate-400 font-medium">
                        {c.id}
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-100 max-w-xs truncate">
                        {c.subject}
                      </td>
                      <td className="px-6 py-4 text-slate-300">{c.student}</td>
                      <td className="px-6 py-4 text-slate-400 text-xs">
                        <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700/60">
                          {c.department}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium inline-block ${priorityStyle[c.priority]}`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-medium inline-block ${statusStyle[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-400 text-xs font-mono">{c.date}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 hover:text-teal-300 transition-colors px-3 py-1.5 rounded-lg hover:bg-teal-400/10 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Review</span>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-6 py-14 text-center">
                      <div className="flex flex-col items-center justify-center gap-2">
                        <Inbox className="w-8 h-8 text-slate-600 mb-1" />
                        <p className="text-sm font-medium text-slate-300">No complaints found</p>
                        <p className="text-xs text-slate-500 max-w-sm">
                          No reports match your current filter or search criteria. Try adjusting your query.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminHome