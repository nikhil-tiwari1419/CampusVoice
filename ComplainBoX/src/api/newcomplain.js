import api from '../context/auth'

/**
 * File a new student complaint
 */
export async function createComplaint({ subject, message, batch }) {
  const res = await api.post('/user/complain', { subject, message, batch })
  return res.data
}

export default {
  createComplaint,
}
