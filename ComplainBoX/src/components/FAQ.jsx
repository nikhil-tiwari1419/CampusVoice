import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { 
  ChevronDown, 
  HelpCircle, 
  ShieldCheck, 
  Clock, 
  MessageSquare, 
  Sparkles,
  ArrowRight
} from 'lucide-react'

const faqItems = [
  {
    category: 'Privacy & Security',
    question: 'Can administrators identify who submitted an anonymous complaint?',
    answer:
      'No. When you submit a complaint under the anonymous option, your student ID, email address, and personal profile are cryptographically stripped before the ticket reaches the department dashboard. Administrators only see the complaint content and category.',
  },
  {
    category: 'Process',
    question: 'How long does it typically take to receive a response?',
    answer:
      'Initial acknowledgments are generated immediately. An assigned department officer reviews tickets within 24 to 48 working hours. Critical infrastructure or safety complaints are flagged with high priority for expedited review.',
  },
  {
    category: 'Process',
    question: 'What happens after I submit a grievance?',
    answer:
      'Your ticket is automatically categorized and routed to the respective cell (e.g., Hostel Committee, Academic Cell). The officer updates the status from "Pending" to "In Progress" once under review, and you can track every step directly on your dashboard.',
  },
  {
    category: 'General',
    question: 'What types of issues can I report through CampusVoice?',
    answer:
      'You can report hostel maintenance problems, mess/food quality concerns, lab gear failures, Wi-Fi outages, faculty attendance discrepancies, or infrastructure repairs. Urgent safety or ragging concerns are routed immediately to the discipline squad.',
  },
  {
    category: 'Account',
    question: 'Can I upload photo or document evidence with my complaint?',
    answer:
      'Yes. The complaint filing screen supports file attachments such as photos, screenshots, or PDF documents to help administrators investigate and resolve the issue faster.',
  },
  {
    category: 'Account',
    question: 'Can I reopen a complaint if it was not resolved satisfactorily?',
    answer:
      'If an issue marked "Resolved" persists, you can raise a follow-up ticket referencing the original ticket ID (e.g., CMP-1042) or contact the student affairs representative directly through the Help Desk.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0) // Keep the first open by default
  const [activeCategory, setActiveCategory] = useState('All')

  const categories = ['All', 'Privacy & Security', 'Process', 'General', 'Account']

  const filteredFaqs = activeCategory === 'All' 
    ? faqItems 
    : faqItems.filter((item) => item.category === activeCategory)

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="relative min-h-screen w-full bg-[#080C14] text-slate-100 font-sans py-16 px-4 sm:px-6 lg:px-8 overflow-hidden select-none">
      {/* Background ambient lighting */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[650px] h-[320px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[400px] h-[250px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg, #94A3B8 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Header Badge & Title */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-medium mb-4 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Everything you need to know about filing complaints, tracking resolution progress, and student identity protections.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                setActiveCategory(cat)
                setOpenIndex(null)
              }}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-teal-400 text-slate-950 font-semibold shadow-md shadow-teal-400/10'
                  : 'bg-[#0F172A]/80 border border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <div
                key={faq.question}
                className={`rounded-2xl border transition-all duration-200 backdrop-blur-xl overflow-hidden ${
                  isOpen
                    ? 'bg-[#0F172A]/90 border-teal-500/30 shadow-lg shadow-black/40'
                    : 'bg-[#0F172A]/50 border-slate-800/80 hover:border-slate-700/80'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-teal-500/20 text-teal-400'
                          : 'bg-slate-800/60 text-slate-500'
                      }`}
                    >
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="text-sm sm:text-base font-semibold text-slate-100">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-teal-400' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Animated Dropdown Body */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-slate-800/40">
                    {faq.answer}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Direct Help Callout */}
        <div className="mt-12 bg-[#0F172A]/80 border border-slate-800/80 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left backdrop-blur-xl">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-100">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Can’t find what you’re looking for? Reach out to our campus grievance support desk.
            </p>
          </div>
          <NavLink
            to="/contact"
            className="inline-flex items-center gap-2 bg-teal-400 hover:bg-teal-300 text-slate-950 font-semibold px-5 py-2.5 rounded-xl text-xs transition-all shadow-md shadow-teal-400/10 shrink-0 cursor-pointer"
          >
            <span>Contact Help Desk</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>
      </div>
    </section>
  )
}