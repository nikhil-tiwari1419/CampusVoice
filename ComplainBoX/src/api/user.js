import api from '../context/auth'

/**
 * Get current user profile
 * Endpoint: GET /user/get-profile
 */

export async function completeUserProfile(payload) {
  try {
    const res = await api.patch('/user/create-profile', payload)
    return res.data
  } catch (error) {
    console.error('Error creating in user profile:', error)
    throw error
  }
}

export async function getUserProfile() {
  try {
    const res = await api.get('/user/get-profile')
    return res.data
  } catch (error) {
    console.error('Error fetching user profile:', error)
    throw error
  }
}

export async function getPrograms() {
  try {
    const res = await api.get('/student/programs')
    return res.data
  } catch (error) {
    console.error('Error fetching programs:', error)
    throw error
  }
}

export async function getBranches(programId) {
  try {
    const res = await api.get(`/student/branches/${programId}`)
    return res.data
  } catch (error) {
    console.error('Error fetching branches:', error)
    throw error
  }
}

export async function writeComplain(payload) {
  try {
    const res = await api.post('/user/complain', payload)
    return res.data
  } catch (error) {
    console.error("Error in Creating complain")
    throw error
  }
}

export async function getComplain() {
  try {
    const res = await api.get('/user/getComplain')
    return res.data
  } catch (error) {
    console.error("Error in getting a complain")
    throw error
  }
}

export async function giveVote(complaintId) {
  try {
    const res = await api.post(`/user/complaint/${complaintId}/vote`)
    return res.data
  } catch (error) {
    console.error("Error in giving a vote to complain")
    throw error
  }
}

export async function deleteComplain(complaintId) {
  try {
    const res = await api.delete(`/user/complaint/${complaintId}`)
    return res.data
  } catch (error) {
    console.error("Error is happening in delete complain")
    throw error
  }
}
