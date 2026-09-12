import api from '../context/auth'

export const submitComplaint = async (complaintData) => {
  try {
    const response = await api.post('/send/complain', {
      subject: complaintData.subject,
      message: complaintData.description,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getComplaintDetails = async (complaintId) => {
  try {
    const response = await api.get(`/send/complain/${complaintId}`)
    return response.data
  } catch (error) {
    throw error
  }
}
