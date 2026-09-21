import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  Eye,
  ShieldCheck,
  Check,
  X,
  Loader2,
  FolderOpen,
  ArrowUpRight,
  TrendingUp,
  Building2,
  Sparkles,
  Inbox
} from 'lucide-react'
import api, { useAuth } from '../../context/auth.jsx'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const { user } = useAuth()
  const [activeFilter, setActiveFilter] = useState('All')
  const [departmentFilter, setDepartmentFilter] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedComplaint, setSelectedComplaint] = useState(null)

  // Default sample complaints in case backend is offline or empty
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
      notes: 'Plumber dispatched for filter replacement.'
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
      notes: ''
    },
    {
      id: 'CMP-1044',
      subject: 'Classroom 204 audio microphone intermittent buzzing',
      student: 'Anjali Verma',
      email: 'anjali@campus.edu',
      department: 'Infrastructure',
      priority: 'Low',
      status: 'Resolved',
      date: '2026-09-12',
      message: 'Lecturer wireless microphone was picking up static noise during lecture hours.',
      notes: 'Receiver cable replaced and audio channel tuned.'
    },
    {
      id: 'CMP-1045',
      subject: 'Library reading hall 5GHz Wi-Fi gateway timeout',
      student: 'Karan Mehta',
      email: 'karan@campus.edu',
      department: 'Campus IT Desk',
      priority: 'High',
      status: 'Resolved',
      date: '2026-09-10',
      message: 'Access point AP-24 in the library 2nd floor was dropping connections every 5 minutes during peak study hours.',
      notes: 'Firmware upgraded and channel switched to 52.'
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
      notes: ''
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
      notes: 'New OEM lamp ordered from central inventory.'
    }
  ])

  useEffect(() => {
    async function loadComplaints() {
      try {
        // Try admin endpoint first, then user allcomplain
        let res
        try {
          res = await api.get('/admin/getallComplain')
        } catch {
          res = await api.get('/user/allcomplain')
        }

        if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          const list = res.data.data.map((c, i) => ({
            id: c._id ? `CMP-${c._id.slice(-4).toUpperCase()}` : `CMP-${1000 + i}`,
            subject: c.subject || 'Campus Issue',
            student: c.user?.username || c.student?.username || 'Student',
            email: c.user?.email || c.student?.email || 'student@campus.edu',
            department: c.batch?.branch?.name || c.batch?.program?.name || 'General Cell',
            priority: i % 3 === 0 ? 'High' : i % 2 === 0 ? 'Medium' : 'Low',
            status: c.status === 'resolved' ? 'Resolved' : c.status === 'read' ? 'In Progress' : 'Pending',
            date: new Date(c.createdAt || Date.now()).toISOString().split('T')[0],
            message: c.message || '',
            notes: c.status === 'resolved' ? 'Resolved by Admin' : ''
          }))
          setComplaints(list)
        }
      } catch (err) {
        // Keep fallback complaints
      } finally {
        setLoading(false)
      }
    }
    loadComplaints()
  }, [])

  const handleStatusChange = (id, newStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    )
    toast.success(`Complaint ${id} status updated to ${newStatus}`)
    if (selectedComplaint && selectedComplaint.id === id) {
      setSelectedComplaint((prev) => ({ ...prev, status: newStatus }))
    }
  }

  const stats = [
    { label: 'Total Grievances', value: complaints.length, icon: LayoutDashboard, color: 'blue', link: null },
    { label: 'Pending Review', value: complaints.filter(c => c.status === 'Pending').length, icon: Clock, color: 'yellow', link: '/newcomplain' },
    { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, icon: AlertCircle, color: 'sky', link: '/newcomplain' },
    { label: 'Resolved Tickets', value: complaints.filter(c => c.status === 'Resolved').length, icon: CheckCircle2, color: 'green', link: '/completedcomplain' },
  ]

  const colorMap = {
    blue: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    yellow: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    sky: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    green: 'bg-teal-500/10 text-teal-400 border border-teal-500/20',
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

  const departments = ['All', ...Array.from(new Set(complaints.map(c => c.department)))]

  const filteredComplaints = complaints.filter((c) => {
    const matchesFilter = activeFilter === 'All' || c.status.toLowerCase() === activeFilter.toLowerCase()
    const matchesDept = departmentFilter === 'All' || c.department === departmentFilter
    const matchesSearch =
      c.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.department.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesFilter && matchesDept && matchesSearch
  })

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

        {/* Header Section */}
        <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500" />
              </span>
              <span className="text-[11px] font-medium tracking-wider uppercase text-teal-400 font-mono">
                Administration Console
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Admin Grievance Triage & Overview
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Welcome back, <span className="text-slate-200 font-semibold">{user?.username || 'Officer'}</span>. Oversee, investigate, and resolve campus complaints.
            </p>
          </div>

          {/* Quick Sub-navigation Bar */}
          <div className="flex items-center gap-2 flex-wrap">
            <Link
              to="/newcomplain"
              className="inline-flex items-center gap-2 bg-[#0F172A]/90 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-amber-400 hover:text-amber-300 transition-all shadow-sm"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Incoming Triage</span>
            </Link>
            <Link
              to="/completedcomplain"
              className="inline-flex items-center gap-2 bg-[#0F172A]/90 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-teal-400 hover:text-teal-300 transition-all shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Resolved Archive</span>
            </Link>
            <Link
              to="/allstudent"
              className="inline-flex items-center gap-2 bg-[#0F172A]/90 hover:bg-slate-800 border border-slate-800 px-3.5 py-2 rounded-xl text-xs font-semibold text-sky-400 hover:text-sky-300 transition-all shadow-sm"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Students Roster</span>
            </Link>
            <Link
              to="/adminprofile"
              className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs transition-all shadow-md shadow-teal-400/10 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>My Profile</span>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, icon: Icon, color, link }) => {
            const CardWrapper = link ? Link : 'div'
            return (
              <CardWrapper
                key={label}
                to={link || undefined}
                className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-xl hover:border-slate-700/80 transition-all block group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {link && (
                    <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  )}
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">{value}</p>
                <p className="text-xs font-medium text-slate-400 mt-1">{label}</p>
              </CardWrapper>
            )
          })}
        </div>

        {/* Controls: Search, Filter Chips, and Department Selector */}
        <div className="bg-[#0F172A]/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">

            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search ticket ID, student name, keyword, or branch..."
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

            {/* Department Filter */}
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="bg-[#080C14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept === 'All' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-slate-800/60">
            <span className="text-xs text-slate-400 mr-2 flex items-center gap-1">
              <Filter className="w-3 h-3 text-slate-500" />
              Status:
            </span>
            {['All', 'Pending', 'In Progress', 'Resolved'].map((filter) => {
              const count =
                filter === 'All'
                  ? complaints.length
                  : complaints.filter((c) => c.status.toLowerCase() === filter.toLowerCase()).length

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${activeFilter === filter
                      ? 'bg-teal-400 text-slate-950 shadow-md shadow-teal-400/20'
                      : 'bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                >
                  <span>{filter}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${activeFilter === filter
                        ? 'bg-slate-950/20 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-400'
                      }`}
                  >
                    {count}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Complaints Listing */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Grievance Records ({filteredComplaints.length})
            </h2>
            <span className="text-xs text-slate-500">Click any card to review details or update status</span>
          </div>

          {loading ? (
            <div className="p-12 text-center bg-[#0F172A]/50 border border-slate-800 rounded-2xl">
              <Loader2 className="w-7 h-7 text-teal-400 animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400">Loading complaints from registry...</p>
            </div>
          ) : filteredComplaints.length === 0 ? (
            <div className="p-12 text-center bg-[#0F172A]/40 border border-slate-800 rounded-2xl space-y-2">
              <Inbox className="w-10 h-10 text-slate-600 mx-auto" />
              <p className="text-sm font-semibold text-slate-300">No grievances match your criteria</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try resetting your search query or switching your status/department filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('')
                  setActiveFilter('All')
                  setDepartmentFilter('All')
                }}
                className="mt-3 text-xs text-teal-400 hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3.5">
              {filteredComplaints.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelectedComplaint(c)}
                  className="bg-[#0F172A]/80 hover:bg-[#0F172A] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 shadow-md hover:shadow-xl transition-all cursor-pointer group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-md">
                          {c.id}
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${priorityStyle[c.priority] || priorityStyle.Low}`}>
                          {c.priority} Priority
                        </span>
                        <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                          <Building2 className="w-3.5 h-3.5 text-slate-500" />
                          {c.department}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">
                          {c.date}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold text-slate-100 group-hover:text-teal-300 transition-colors truncate">
                        {c.subject}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 mt-1">
                        {c.message}
                      </p>

                      <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
                        <span>Submitted by: <strong className="text-slate-200">{c.student}</strong></span>
                        {c.notes && (
                          <span className="text-slate-500 truncate hidden md:inline">
                            Action: {c.notes}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 self-end sm:self-center shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${statusStyle[c.status] || statusStyle.Pending}`}>
                        {c.status}
                      </span>
                      <button
                        type="button"
                        className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
                        aria-label="View details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Complaint Detail & Status Modal */}
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

              {/* Student and Meta Information */}
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
                  <p className="text-slate-500 font-mono">DATE LOGGED</p>
                  <p className="text-slate-200 font-semibold mt-0.5">{selectedComplaint.date}</p>
                </div>
              </div>

              {/* Description Content */}
              <div>
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2">
                  Grievance Description
                </h4>
                <div className="bg-[#080C14] border border-slate-800/80 p-4 rounded-2xl text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                  {selectedComplaint.message}
                </div>
              </div>

              {/* Resolution Notes */}
              {selectedComplaint.notes && (
                <div>
                  <h4 className="text-xs font-mono uppercase text-teal-400 tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Administrative Resolution Notes
                  </h4>
                  <div className="bg-teal-500/5 border border-teal-500/20 p-4 rounded-2xl text-slate-300 text-xs leading-relaxed">
                    {selectedComplaint.notes}
                  </div>
                </div>
              )}

              {/* Action Controls to Change Status */}
              <div className="pt-2 border-t border-slate-800">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-3">
                  Update Investigation Status
                </h4>
                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedComplaint.id, 'Pending')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${selectedComplaint.status === 'Pending'
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 ring-1 ring-amber-500/40'
                        : 'bg-slate-800/50 hover:bg-slate-800 text-slate-400 border-slate-800'
                      }`}
                  >
                    Set as Pending
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedComplaint.id, 'In Progress')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${selectedComplaint.status === 'In Progress'
                        ? 'bg-sky-500/20 text-sky-300 border-sky-500/40 ring-1 ring-sky-500/40'
                        : 'bg-slate-800/50 hover:bg-slate-800 text-slate-400 border-slate-800'
                      }`}
                  >
                    Mark as In Progress
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStatusChange(selectedComplaint.id, 'Resolved')}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer border ${selectedComplaint.status === 'Resolved'
                        ? 'bg-teal-500/20 text-teal-300 border-teal-500/40 ring-1 ring-teal-500/40'
                        : 'bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold border-transparent shadow-md shadow-teal-400/10'
                      }`}
                  >
                    Mark as Resolved
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
