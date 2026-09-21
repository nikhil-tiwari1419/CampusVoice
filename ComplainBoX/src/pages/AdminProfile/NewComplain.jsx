import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Clock,
  AlertCircle,
  AlertTriangle,
  Search,
  Filter,
  Building2,
  Calendar,
  CheckCircle2,
  Eye,
  X,
  Loader2,
  ArrowLeft,
  Check,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  MessageSquare
} from 'lucide-react'
import api from '../../context/auth'
import toast from 'react-hot-toast'

export default function NewComplain() {
  const [complaints, setComplaints] = useState([
    {
      id: 'CMP-1042',
      subject: 'Hostel 3rd floor water purifier filtration breakdown',
      student: 'Tanmay Yawalkar',
      email: 'tanmay@campus.edu',
      department: 'Hostel & Mess',
      priority: 'High',
      status: 'In Progress',
      date: '2026-09-15',
      message: 'Water dispenser on the 3rd floor is dispensing turbid water since yesterday evening. Over 40 students in D-wing affected.',
      hoursAgo: '3 hours ago'
    },
    {
      id: 'CMP-1043',
      subject: 'Overlapping mid-term test schedule in CSE department',
      student: 'Rohit Sharma',
      email: 'rohit@campus.edu',
      department: 'Academics',
      priority: 'Medium',
      status: 'Pending',
      date: '2026-09-14',
      message: 'Database Systems and Operating Systems mid-terms are both scheduled on 24 Sep at 10:00 AM in Hall 2.',
      hoursAgo: '6 hours ago'
    },
    {
      id: 'CMP-1046',
      subject: 'Cafeteria hygiene and food temperature standards',
      student: 'Pooja Patil',
      email: 'pooja@campus.edu',
      department: 'Hostel & Mess',
      priority: 'Medium',
      status: 'Pending',
      date: '2026-09-17',
      message: 'Evening snacks served in block B cafeteria were lukewarm and storage counters lacked sneeze guards.',
      hoursAgo: '1 hour ago'
    },
    {
      id: 'CMP-1047',
      subject: 'Laboratory 102 projector lamp dimmed and flickering',
      student: 'Aditya Deshmukh',
      email: 'aditya@campus.edu',
      department: 'Infrastructure',
      priority: 'Low',
      status: 'In Progress',
      date: '2026-09-16',
      message: 'During afternoon lab sessions, code demonstrations on the projector screen are illegible due to poor brightness.',
      hoursAgo: '12 hours ago'
    }
  ])

  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [priorityFilter, setPriorityFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [resolutionNote, setResolutionNote] = useState('')

  useEffect(() => {
    async function loadNew() {
      try {
        let res
        try {
          res = await api.get('/admin/getallComplain')
        } catch {
          res = await api.get('/user/allcomplain')
        }

        if (res.data?.data && Array.isArray(res.data.data)) {
          const pendingItems = res.data.data
            .filter((c) => c.status !== 'resolved')
            .map((c, i) => ({
              id: c._id ? `CMP-${c._id.slice(-4).toUpperCase()}` : `CMP-${1050 + i}`,
              subject: c.subject || 'Campus Grievance',
              student: c.user?.username || c.student?.username || 'Student',
              email: c.user?.email || c.student?.email || 'student@campus.edu',
              department: c.batch?.branch?.name || c.batch?.program?.name || 'General Cell',
              priority: i % 2 === 0 ? 'High' : 'Medium',
              status: c.status === 'read' ? 'In Progress' : 'Pending',
              date: new Date(c.createdAt || Date.now()).toISOString().split('T')[0],
              message: c.message || '',
              hoursAgo: 'Recently logged'
            }))

          if (pendingItems.length > 0) {
            setComplaints(pendingItems)
          }
        }
      } catch (err) {
        // Fallback default complaints
      } finally {
        setLoading(false)
      }
    }
    loadNew()
  }, [])

  const handleUpdateStatus = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    )
    toast.success(`Complaint ${id} marked as ${newStatus}`)
    if (newStatus === 'Resolved') {
      setSelectedComplaint(null)
      setResolutionNote('')
    } else if (selectedComplaint) {
      setSelectedComplaint((prev) => ({ ...prev, status: newStatus }))
    }
  }

  const priorityStyle = {
    High: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    Medium: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    Low: 'bg-slate-500/10 text-slate-400 border border-slate-500/20',
  }

  const departments = ['All', ...Array.from(new Set(complaints.map(c => c.department)))]

  const filtered = complaints.filter((c) => {
    const matchesSearch =
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPriority = priorityFilter === 'All' || c.priority === priorityFilter
    const matchesDept = departmentFilter === 'All' || c.department === departmentFilter

    return matchesSearch && matchesPriority && matchesDept
  })

  const highPriorityCount = complaints.filter(c => c.priority === 'High').length
  const pendingCount = complaints.filter(c => c.status === 'Pending').length

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans overflow-hidden select-none">
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
        
        {/* Navigation Breadcrumb & Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <Link
              to="/admindashboard"
              className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-teal-400 transition-colors mb-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Admin Dashboard</span>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight flex items-center gap-2.5">
              <Clock className="w-7 h-7 text-amber-400" />
              Incoming Grievances & Action Queue
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Active queue of student grievances awaiting departmental investigation, assignment, or resolution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="bg-[#0F172A] border border-amber-500/30 text-amber-400 px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              Pending Action: {complaints.length}
            </span>
          </div>
        </div>

        {/* Triage Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Unreviewed Tickets</span>
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-amber-400">{pendingCount}</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Awaiting initial inspection</p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">High Urgency Grievances</span>
              <div className="w-8 h-8 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-rose-400">{highPriorityCount}</p>
            <p className="text-[11px] text-rose-400/80 font-medium mt-1">Requires fast-track review</p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Under Active Investigation</span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <AlertCircle className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-sky-400">
              {complaints.filter(c => c.status === 'In Progress').length}
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Assigned to field staff</p>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticket ID, student, subject, or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#080C14] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Priority Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Priority:</span>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="bg-[#080C14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                <option value="All">All Priorities</option>
                <option value="High">High Urgency</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            {/* Department Selector */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Department:</span>
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-[#080C14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>{dept === 'All' ? 'All Departments' : dept}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Complaints Listing */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Action Required ({filtered.length})
            </h2>
            <span className="text-xs text-slate-500">Fast action triggers available per ticket</span>
          </div>

          {loading ? (
            <div className="p-12 text-center bg-[#0F172A]/50 border border-slate-800 rounded-2xl">
              <Loader2 className="w-7 h-7 text-teal-400 animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400">Retrieving unreviewed tickets...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center bg-[#0F172A]/40 border border-slate-800 rounded-2xl">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">All caught up! Zero pending complaints</p>
              <p className="text-xs text-slate-500 mt-1">No unreviewed tickets found matching current filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filtered.map((c) => (
                <div
                  key={c.id}
                  className="bg-[#0F172A]/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-md">
                          {c.id}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${priorityStyle[c.priority] || priorityStyle.Low}`}>
                          {c.priority} Priority
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {c.department}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          Logged: {c.date} ({c.hoursAgo})
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-slate-100">
                        {c.subject}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {c.message}
                      </p>

                      <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                        <span>Student: <strong className="text-slate-200">{c.student}</strong> ({c.email})</span>
                      </div>
                    </div>

                    {/* Quick Action Controls */}
                    <div className="flex items-center gap-2.5 flex-wrap self-end lg:self-center shrink-0">
                      <button
                        type="button"
                        onClick={() => setSelectedComplaint(c)}
                        className="px-3 py-2 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>

                      {c.status !== 'In Progress' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(c.id, 'In Progress')}
                          className="px-3 py-2 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 text-sky-300 rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                        >
                          <Clock className="w-3.5 h-3.5" />
                          <span>Start Investigation</span>
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedComplaint(c)
                        }}
                        className="px-4 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-teal-400/15 transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Resolve Ticket</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Triage & Resolution Modal */}
        {selectedComplaint && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0F172A] border border-slate-800 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-lg">
                      {selectedComplaint.id}
                    </span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${priorityStyle[selectedComplaint.priority] || priorityStyle.Low}`}>
                      {selectedComplaint.priority} Priority
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">
                    {selectedComplaint.subject}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#080C14] border border-slate-800/80 p-4 rounded-2xl text-xs">
                <div>
                  <p className="text-slate-500 font-mono">STUDENT</p>
                  <p className="text-slate-200 font-semibold mt-0.5">{selectedComplaint.student}</p>
                  <p className="text-slate-400 text-[11px] truncate">{selectedComplaint.email}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-mono">DEPARTMENT</p>
                  <p className="text-slate-200 font-semibold mt-0.5">{selectedComplaint.department}</p>
                </div>
                <div>
                  <p className="text-slate-500 font-mono">STATUS</p>
                  <p className="text-amber-400 font-semibold mt-0.5">{selectedComplaint.status}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                  Student Complaint Description
                </h4>
                <div className="bg-[#080C14] border border-slate-800/80 p-4 rounded-2xl text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {selectedComplaint.message}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase text-teal-400 tracking-wider mb-2">
                  Official Administrative Action / Resolution Remarks
                </h4>
                <textarea
                  rows={3}
                  placeholder="Record investigation findings or corrective steps taken for student visibility..."
                  value={resolutionNote}
                  onChange={(e) => setResolutionNote(e.target.value)}
                  className="w-full bg-[#080C14] border border-slate-800 rounded-2xl p-3.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => handleUpdateStatus(selectedComplaint.id, 'In Progress')}
                  className="px-4 py-2 bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-xl text-xs font-semibold transition-colors"
                >
                  Mark as In Progress
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedComplaint(null)}
                    className="px-4 py-2 bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(selectedComplaint.id, 'Resolved')}
                    className="px-5 py-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold rounded-xl text-xs shadow-md shadow-teal-400/20 transition-all flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Complete & Resolve</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
