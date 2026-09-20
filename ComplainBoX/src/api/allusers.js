import api from '../context/auth'

/**
 * Fetch all registered students
 */
export async function getAllStudents() {
  const res = await api.get('/admin/getAllStudent')
  return res.data
}

/**
 * Fetch current user profile
 */
export async function getUserProfile() {
  const res = await api.get('/user/get-profile')
  return res.data
}

export default {
  getAllStudents,
  getUserProfile,
}
