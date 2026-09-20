import api from '../context/auth'

/**
 * Fetch all complaints (admin or student level)
 */
export async function getAllComplaints() {
  try {
    const res = await api.get('/admin/getallComplain')
    return res.data
  } catch (error) {
    const fallbackRes = await api.get('/user/allcomplain')
    return fallbackRes.data
  }
}

/**
 * Fetch student specific complaints
 */
export async function getStudentComplaints() {
  const res = await api.get('/user/getComplain')
  return res.data
}

export default {
  getAllComplaints,
  getStudentComplaints,
}
