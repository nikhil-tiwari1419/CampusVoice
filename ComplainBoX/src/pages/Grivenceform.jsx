import React, { useState } from 'react'
import toast from 'react-hot-toast'

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
<<<<<<< HEAD
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <span className="inline-block bg-blue-50 text-blue-600 text-sm font-medium px-4 py-1 rounded-full mb-3">
            ComplainBoX
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
            File a Complaint
          </h1>
          <p className="text-gray-500">
            Tell us what's wrong — we'll route it to the right department.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-6 md:p-8 space-y-5"
        >
          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Brief title for your complaint"
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Describe your complaint in detail..."
              className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 rounded-xl shadow transition"
          >
            {loading ? 'Submitting...' : 'Submit Complaint'}
          </button>
        </form>

        <p className="text-center text-gray-400 text-xs mt-6">
          Your complaint will be reviewed within 24–48 hours.
        </p>
      </div>
    </div>
=======
    <>
      <section>
        {/* cateegory */}
      </section>

      <section>
        {/* TEXT AREA  */}
      </section>
      
      <section>
        {/* student vote */}
      </section>

      <button>
        {/* submit */}
      </button>
    </>
>>>>>>> 932bd14ae09f8e28e92cdfa08b8314ccb3058f0e
  )
}

export default Grivenceform