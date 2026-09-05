import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { FileText, MessageSquare, Send, Clock, ShieldCheck, Loader2 } from 'lucide-react'

function Grivenceform() {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.subject || !formData.description) {
      toast.error('Please fill in the subject and description')
      return
    }

    setLoading(true)
    try {
      // TODO: replace with your actual API call
      // await axios.post('/api/complaints', formData)
      await new Promise((res) => setTimeout(res, 1000)) // temp mock delay

      toast.success('Complaint submitted successfully!')
      setFormData({
        subject: '',
        description: '',
      })
    } catch (err) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full bg-[#080C14] py-12 px-4 sm:px-6 overflow-hidden select-none font-sans flex items-center justify-center">
      {/* Background ambient lighting */}
      <div className="absolute top-1/6 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-teal-500/10 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[350px] h-[250px] bg-indigo-500/5 rounded-full blur-[110px] pointer-events-none" />

      {/* Subtle background grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium mb-3">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500" />
            </span>
            Grievance Redressal
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-100 tracking-tight">
            File a Complaint
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-md mx-auto">
            Detail your concern below — our system will route your ticket to the relevant department administrator.
          </p>
        </div>

        {/* Complaint Card */}
        <div className="bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black/80 backdrop-blur-xl">
          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Subject */}
            <div>
              <label htmlFor="subject" className="block text-xs font-medium text-slate-300 mb-1.5">
                Subject
              </label>
              <div className="relative">
                <FileText className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g., Hostel Wi-Fi downtime in Block B"
                  className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-xs font-medium text-slate-300 mb-1.5">
                Description
              </label>
              <div className="relative">
                <MessageSquare className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Provide clear details including dates, locations, or faculty/staff involved to speed up resolution..."
                  className="w-full bg-[#090D16]/80 border border-slate-800 hover:border-slate-700 focus:border-teal-400/80 focus:ring-2 focus:ring-teal-400/20 rounded-xl py-2.5 pl-10 pr-3 text-sm text-slate-100 placeholder-slate-500 outline-none transition-all resize-none"
                />
              </div>
            </div>

            {/* Privacy / Security Notice */}
            <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800/70 text-slate-400 text-xs">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
              <span>
                All tickets are logged securely under campus policies. Your submission will be handled strictly by designated committee officers.
              </span>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold text-sm rounded-xl py-3 transition-all shadow-md shadow-teal-400/10 hover:shadow-teal-400/20 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  <span>Submitting Ticket...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>Submit Complaint</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Turnaround Note */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 mt-6">
          <Clock className="w-3.5 h-3.5" />
          <span>Tickets are typically reviewed within 24–48 working hours.</span>
        </div>
      </div>
    </div>
  )
}

export default Grivenceform