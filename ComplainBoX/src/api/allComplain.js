import api from '../context/auth'

export const getAllComplaints = async () => {
  try {
    const response = await api.get('/user/allcomplain')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getUserComplaints = async () => {
  try {
    const response = await api.get('/user/allcomplain')
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateComplaintStatus = async (complaintId, status) => {
  try {
    const response = await api.patch(`/send/complain/${complaintId}`, { status })
    return response.data
  } catch (error) {
    throw error
  }
}
