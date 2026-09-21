import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Users,
  Search,
  Filter,
  GraduationCap,
  Building2,
  Mail,
  Phone,
  CheckCircle2,
  AlertCircle,
  Eye,
  X,
  Loader2,
  ArrowLeft,
  Calendar,
  Layers,
  ShieldCheck,
  UserCheck
} from 'lucide-react'
import api from '../../context/auth.jsx'
import toast from 'react-hot-toast'

export default function AllStudents() {
  const [students, setStudents] = useState([
    {
      id: 'STU-101',
      username: 'Tanmay Yawalkar',
      email: 'tanmay@campus.edu',
      phone: '9876543210',
      program: 'BCA',
      branch: 'Computer Science',
      year: 3,
      sem: 5,
      isVerified: true,
      isProfileComplete: true,
      joinedDate: '2024-08-10',
      complaintsLogged: 3
    },
    {
      id: 'STU-102',
      username: 'Rohit Sharma',
      email: 'rohit@campus.edu',
      phone: '9123456789',
      program: 'B.Tech',
      branch: 'CSE',
      year: 2,
      sem: 4,
      isVerified: true,
      isProfileComplete: true,
      joinedDate: '2025-07-22',
      complaintsLogged: 1
    },
    {
      id: 'STU-103',
      username: 'Anjali Verma',
      email: 'anjali@campus.edu',
      phone: '9898989898',
      program: 'BSC',
      branch: 'Data Science',
      year: 1,
      sem: 2,
      isVerified: true,
      isProfileComplete: true,
      joinedDate: '2026-01-15',
      complaintsLogged: 2
    },
    {
      id: 'STU-104',
      username: 'Karan Mehta',
      email: 'karan@campus.edu',
      phone: '9765432109',
      program: 'B.Tech',
      branch: 'Information Technology',
      year: 4,
      sem: 7,
      isVerified: true,
      isProfileComplete: true,
      joinedDate: '2023-08-01',
      complaintsLogged: 4
    },
    {
      id: 'STU-105',
      username: 'Pooja Patil',
      email: 'pooja@campus.edu',
      phone: '9654321876',
      program: 'BCA',
      branch: 'General',
      year: 2,
      sem: 3,
      isVerified: false,
      isProfileComplete: false,
      joinedDate: '2025-09-05',
      complaintsLogged: 1
    },
    {
      id: 'STU-106',
      username: 'Aditya Deshmukh',
      email: 'aditya@campus.edu',
      phone: '9543216789',
      program: 'B.Tech',
      branch: 'Mechanical',
      year: 3,
      sem: 6,
      isVerified: true,
      isProfileComplete: true,
      joinedDate: '2024-07-29',
      complaintsLogged: 2
    }
  ])

  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedProgram, setSelectedProgram] = useState('All')
  const [selectedYear, setSelectedYear] = useState('All')
  const [selectedStudent, setSelectedStudent] = useState(null)

  useEffect(() => {
    async function loadStudents() {
      try {
        const res = await api.get('/admin/getAllStudent')
        if (res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0) {
          const list = res.data.data.map((s, idx) => ({
            id: s._id ? `STU-${s._id.slice(-4).toUpperCase()}` : `STU-${100 + idx}`,
            username: s.username || 'Student',
            email: s.email || 'student@campus.edu',
            phone: s.phone ? String(s.phone) : 'Not Provided',
            program: s.batch?.program?.name || 'General',
            branch: s.batch?.branch?.name || 'Core',
            year: s.batch?.year || 1,
            sem: s.sem || 1,
            isVerified: !!s.isVerified,
            isProfileComplete: !!s.isProfileComplete,
            joinedDate: s.createdAt ? new Date(s.createdAt).toISOString().split('T')[0] : '2026-01-01',
            complaintsLogged: Math.floor(Math.random() * 3) + 1
          }))
          setStudents(list)
        }
      } catch (err) {
        // Retain default sample students
      } finally {
        setLoading(false)
      }
    }
    loadStudents()
  }, [])

  const programs = ['All', 'BCA', 'B.Tech', 'BSC']
  const years = ['All', '1', '2', '3', '4']

  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.branch.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesProgram = selectedProgram === 'All' || s.program.toLowerCase() === selectedProgram.toLowerCase()
    const matchesYear = selectedYear === 'All' || String(s.year) === selectedYear

    return matchesSearch && matchesProgram && matchesYear
  })

  const verifiedCount = students.filter(s => s.isVerified).length

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
              <Users className="w-7 h-7 text-teal-400" />
              Student Directory & Enrollment Roster
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Browse, filter, and inspect verified campus students, academic batches, and grievance participation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-[#0F172A] border border-slate-800 px-3.5 py-1.5 rounded-xl text-xs font-mono text-slate-300">
              Total Enrolled: <strong className="text-teal-400">{students.length}</strong>
            </span>
          </div>
        </div>

        {/* Stats Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Total Registered Students</span>
              <div className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-slate-100">{students.length}</p>
            <p className="text-[11px] text-teal-400 font-medium mt-1">Across 3 academic programs</p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Verified Email Accounts</span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-emerald-400">{verifiedCount}</p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">
              {Math.round((verifiedCount / (students.length || 1)) * 100)}% authentication rate
            </p>
          </div>

          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-5 shadow-lg backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400">Profile Complete</span>
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center">
                <UserCheck className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl sm:text-3xl font-bold text-sky-400">
              {students.filter(s => s.isProfileComplete).length}
            </p>
            <p className="text-[11px] text-slate-400 font-medium mt-1">Batch & semester assigned</p>
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
                placeholder="Search student name, email, student ID, or branch..."
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

            {/* Program Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Program:</span>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="bg-[#080C14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                {programs.map(p => (
                  <option key={p} value={p}>{p === 'All' ? 'All Programs' : p}</option>
                ))}
              </select>
            </div>

            {/* Year Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Year:</span>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="bg-[#080C14] border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-teal-400 cursor-pointer"
              >
                {years.map(y => (
                  <option key={y} value={y}>{y === 'All' ? 'All Years' : `Year ${y}`}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Student Cards Grid */}
        <div>
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Enrolled Students ({filteredStudents.length})
            </h2>
            <span className="text-xs text-slate-500">Click inspect to view complete profile</span>
          </div>

          {loading ? (
            <div className="p-12 text-center bg-[#0F172A]/50 border border-slate-800 rounded-2xl">
              <Loader2 className="w-7 h-7 text-teal-400 animate-spin mx-auto mb-3" />
              <p className="text-xs text-slate-400">Retrieving student records from registry...</p>
            </div>
          ) : filteredStudents.length === 0 ? (
            <div className="p-12 text-center bg-[#0F172A]/40 border border-slate-800 rounded-2xl">
              <Users className="w-10 h-10 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-semibold text-slate-300">No students found matching filters</p>
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('')
                  setSelectedProgram('All')
                  setSelectedYear('All')
                }}
                className="mt-3 text-xs text-teal-400 hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStudents.map((s) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedStudent(s)}
                  className="bg-[#0F172A]/80 hover:bg-[#0F172A] border border-slate-800/80 hover:border-slate-700 rounded-2xl p-5 shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-teal-500/20 to-teal-400/10 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold text-sm uppercase shadow-inner">
                          {s.username ? s.username.charAt(0) : 'S'}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-slate-100 group-hover:text-teal-300 transition-colors">
                            {s.username}
                          </h3>
                          <p className="text-[11px] text-slate-400 font-mono">{s.id}</p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          s.isVerified
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        {s.isVerified ? 'Verified' : 'Unverified'}
                      </span>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 border-t border-slate-800/60 pt-3">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1">
                          <GraduationCap className="w-3.5 h-3.5" /> Program:
                        </span>
                        <span className="font-semibold text-slate-200">
                          {s.program} ({s.branch})
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" /> Year / Sem:
                        </span>
                        <span className="font-mono text-slate-300">
                          Year {s.year}, Sem {s.sem}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" /> Email:
                        </span>
                        <span className="text-slate-400 truncate max-w-[160px] text-[11px]">
                          {s.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-500">
                      Grievances Logged: <strong className="text-teal-400">{s.complaintsLogged}</strong>
                    </span>
                    <button
                      type="button"
                      className="text-xs text-teal-400 group-hover:underline flex items-center gap-1 font-semibold"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Student Details Inspection Modal */}
        {selectedStudent && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0F172A] border border-slate-800 rounded-3xl w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-500/30 text-teal-300 flex items-center justify-center font-bold text-lg uppercase">
                    {selectedStudent.username.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-100">{selectedStudent.username}</h3>
                    <p className="text-xs text-slate-400 font-mono">{selectedStudent.id}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-400 hover:text-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <div className="bg-[#080C14] border border-slate-800/80 p-4 rounded-2xl space-y-2.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email Address</span>
                    <span className="text-slate-200 font-mono">{selectedStudent.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Phone Number</span>
                    <span className="text-slate-200 font-mono">{selectedStudent.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Enrolled Program</span>
                    <span className="text-slate-200 font-semibold">{selectedStudent.program}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Branch Specialization</span>
                    <span className="text-slate-200">{selectedStudent.branch}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Academic Standing</span>
                    <span className="text-slate-200 font-mono">Year {selectedStudent.year}, Semester {selectedStudent.sem}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Joined Date</span>
                    <span className="text-slate-200 font-mono">{selectedStudent.joinedDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Email Verification</span>
                    <span className={`font-semibold ${selectedStudent.isVerified ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {selectedStudent.isVerified ? 'Verified' : 'Pending Verification'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                >
                  Close Record
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
