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
    blue: 'bg-blue-50 text-blue-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    green: 'bg-green-50 text-green-600',
    red: 'bg-red-50 text-red-600',
  }

  const statusStyle = {
    Pending: 'bg-yellow-50 text-yellow-600',
    'In Progress': 'bg-blue-50 text-blue-600',
    Resolved: 'bg-green-50 text-green-600',
  }

  const priorityStyle = {
    High: 'bg-red-50 text-red-600',
    Medium: 'bg-yellow-50 text-yellow-600',
    Low: 'bg-green-50 text-green-600',
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
    <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">
              Manage and track student complaints across campus.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
            <Users className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-gray-700">Admin Panel</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(({ label, value, icon: Icon, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow p-5 hover:shadow-md transition"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${colorMap[color]}`}>
                <Icon className="w-5 h-5" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{value}</p>
              <p className="text-gray-500 text-sm">{label}</p>
            </div>
          ))}
        </div>

        {/* Filters + Search */}
        <div className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400" />
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                  activeFilter === f
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by ID, student, subject..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>
        </div>

        {/* Complaints Table */}
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-left">
                  <th className="px-5 py-3 font-medium">ID</th>
                  <th className="px-5 py-3 font-medium">Subject</th>
                  <th className="px-5 py-3 font-medium">Student</th>
                  <th className="px-5 py-3 font-medium">Department</th>
                  <th className="px-5 py-3 font-medium">Priority</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                  <th className="px-5 py-3 font-medium">Date</th>
                  <th className="px-5 py-3 font-medium text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.length > 0 ? (
                  filteredComplaints.map((c) => (
                    <tr
                      key={c.id}
                      className="border-t border-gray-100 hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-3 text-gray-500">{c.id}</td>
                      <td className="px-5 py-3 text-gray-800 font-medium">{c.subject}</td>
                      <td className="px-5 py-3 text-gray-600">{c.student}</td>
                      <td className="px-5 py-3 text-gray-600">{c.department}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${priorityStyle[c.priority]}`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusStyle[c.status]}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-gray-500">{c.date}</td>
                      <td className="px-5 py-3 text-right">
                        <button className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-medium text-sm">
                          <Eye className="w-4 h-4" />
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center text-gray-400">
                      No complaints match your search/filter.
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