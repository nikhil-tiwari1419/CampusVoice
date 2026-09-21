import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import faqData from '../Ui/faq.json'

export default function Faq({ id = 'faqs' }) {
  const [openId, setOpenId] = useState(null)

  const toggleFaq = (id) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id={id} className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about Campus Voice
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((faq) => (
            <div
              key={faq.id}
              className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden hover:border-teal-300 transition-colors shadow-sm hover:shadow-md"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-left text-gray-900 font-semibold flex-1">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-teal-600 shrink-0 ml-4 transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openId === faq.id && (
                <div className="px-5 pb-5 border-t-2 border-gray-200 bg-gray-50">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-linear-to-r from-teal-100 to-cyan-100 border-2 border-teal-300 rounded-lg">
          <p className="text-gray-800 text-center">
            Still have questions?
            <a href="mailto:support@campusvoice.edu" className="text-teal-600 hover:text-teal-700 font-semibold ml-1">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
