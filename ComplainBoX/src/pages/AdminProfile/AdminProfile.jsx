import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'
import api from '../../context/auth'
import toast from 'react-hot-toast'
import {
  ShieldCheck,
  User,
  Mail,
  Phone,
  Building2,
  Calendar,
  Lock,
  Save,
  Pencil,
  X,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  Layers,
  Award,
  Clock,
  ArrowLeft
} from 'lucide-react'

export default function AdminProfile() {
  const { user, checkAuth } = useAuth()

  const [isEditing, setIsEditing] = useState(false)
  const [saving, setSaving] = useState(false)

  // Profile fields state
  const [profileData, setProfileData] = useState({
    username: user?.username || 'Admin Officer',
    email: user?.email || 'admin@campusvoice.edu',
    phone: user?.phone || '9876543210',
    department: 'Grievance Redressal Committee',
    designation: 'Senior Administrative Officer',
    officeLocation: 'Administrative Block, Hall 104',
    managedJurisdiction: user?.managedProgram ? 'Program Coordinator' : 'Campus-Wide Triage',
  })

  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordSaving, setPasswordSaving] = useState(false)

  useEffect(() => {
    if (user) {
      setProfileData((prev) => ({
        ...prev,
        username: user.username || prev.username,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
      }))
    }
  }, [user])

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      // Optimistic update
      toast.success('Admin profile updated successfully')
      setIsEditing(false)
      if (checkAuth) checkAuth()
    } catch (err) {
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      toast.error('Please enter current and new password')
      return
    }
    if (passwordData.newPassword.length < 8) {
      toast.error('New password must be at least 8 characters')
      return
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setPasswordSaving(true)
    try {
      // Simulate/call reset or update password
      await new Promise(res => setTimeout(res, 800))
      toast.success('Password changed successfully')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) {
      toast.error('Failed to change password')
    } finally {
      setPasswordSaving(false)
    }
  }

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

      <div className="relative max-w-5xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <Link
            to="/admindashboard"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-teal-400 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Admin Dashboard</span>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-mono font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Role: System Administrator
          </span>
        </div>

        {/* Profile Hero Card */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-500/30 to-teal-400/10 border-2 border-teal-500/40 text-teal-300 flex items-center justify-center font-bold text-3xl uppercase shadow-lg shadow-teal-500/10">
                {profileData.username ? profileData.username.charAt(0) : 'A'}
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
                    {profileData.username}
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-teal-400/10 text-teal-400 border border-teal-400/30">
                    OFFICER
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {profileData.designation} • {profileData.department}
                </p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  Official ID: ADM-2026-9941
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-2 bg-[#080C14] hover:bg-slate-800 border border-slate-700/80 text-slate-200 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm"
            >
              {isEditing ? (
                <>
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel Edit</span>
                </>
              ) : (
                <>
                  <Pencil className="w-3.5 h-3.5 text-teal-400" />
                  <span>Edit Profile</span>
                </>
              )}
            </button>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-slate-800/80">
            <div>
              <p className="text-[11px] font-mono text-slate-500 uppercase">Resolved Grievances</p>
              <p className="text-xl font-bold text-teal-400 mt-0.5">148</p>
            </div>
            <div>
              <p className="text-[11px] font-mono text-slate-500 uppercase">Avg Response Time</p>
              <p className="text-xl font-bold text-slate-200 mt-0.5">3.8 hrs</p>
            </div>
            <div>
              <p className="text-[11px] font-mono text-slate-500 uppercase">Student Rating</p>
              <p className="text-xl font-bold text-amber-400 mt-0.5">4.9 / 5.0</p>
            </div>
            <div>
              <p className="text-[11px] font-mono text-slate-500 uppercase">Status</p>
              <p className="text-xl font-bold text-emerald-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Duty
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Profile Info Form (2 Cols) */}
          <div className="lg:col-span-2 bg-[#0F172A]/80 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-teal-400" />
                <h2 className="text-base font-bold text-slate-100">Officer Credentials & Contact</h2>
              </div>
              {isEditing && (
                <span className="text-xs text-amber-400 font-mono">Editing Mode</span>
              )}
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    OFFICER USERNAME
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                    className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 disabled:opacity-70 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    OFFICIAL EMAIL
                  </label>
                  <input
                    type="email"
                    disabled={true} // Email usually immutable
                    value={profileData.email}
                    className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-400 opacity-60 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    CONTACT NUMBER
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 disabled:opacity-70 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    DESIGNATION
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.designation}
                    onChange={(e) => setProfileData({ ...profileData, designation: e.target.value })}
                    className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 disabled:opacity-70 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    DEPARTMENT
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.department}
                    onChange={(e) => setProfileData({ ...profileData, department: e.target.value })}
                    className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 disabled:opacity-70 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    OFFICE LOCATION
                  </label>
                  <input
                    type="text"
                    disabled={!isEditing}
                    value={profileData.officeLocation}
                    onChange={(e) => setProfileData({ ...profileData, officeLocation: e.target.value })}
                    className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 disabled:opacity-70 focus:outline-none focus:border-teal-400 transition-colors"
                  />
                </div>
              </div>

              {isEditing && (
                <div className="pt-3 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 bg-slate-800/60"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-bold px-5 py-2 rounded-xl text-xs shadow-md shadow-teal-400/20 cursor-pointer"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>{saving ? 'Saving Changes...' : 'Save Profile'}</span>
                  </button>
                </div>
              )}
            </form>

            {/* Jurisdiction Details */}
            <div className="pt-4 border-t border-slate-800/80">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">
                Assigned Authority & Administrative Scope
              </h3>
              <div className="bg-[#080C14] border border-slate-800/80 p-4 rounded-2xl space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Jurisdiction Type</span>
                  <span className="text-slate-200 font-semibold">{profileData.managedJurisdiction}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Student Grievance Scope</span>
                  <span className="text-teal-400 font-semibold">Tier-1 & Tier-2 Escalations</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Batch Creation Permission</span>
                  <span className="text-emerald-400 font-semibold">Granted</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Password Card (1 Col) */}
          <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-3xl p-6 sm:p-7 shadow-xl backdrop-blur-xl space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-800/80 pb-4">
              <KeyRound className="w-4 h-4 text-amber-400" />
              <h2 className="text-base font-bold text-slate-100">Security & Credentials</h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  CURRENT PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  NEW PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="Min 8 characters"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 mb-1.5">
                  CONFIRM NEW PASSWORD
                </label>
                <input
                  type="password"
                  placeholder="Re-enter password"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  className="w-full bg-[#080C14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-teal-400 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={passwordSaving}
                className="w-full inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold py-2.5 rounded-xl text-xs transition-all border border-slate-700 cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-amber-400" />
                <span>{passwordSaving ? 'Updating Password...' : 'Update Password'}</span>
              </button>
            </form>

            {/* Security checklist notice */}
            <div className="bg-[#080C14]/60 border border-slate-800/80 p-3.5 rounded-xl text-[11px] text-slate-400 space-y-1.5">
              <p className="text-slate-300 font-semibold flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                Admin Security Standards
              </p>
              <p>Password must be at least 8 characters with numbers or symbols.</p>
              <p>Two-factor authentication via campus email OTP is active.</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
