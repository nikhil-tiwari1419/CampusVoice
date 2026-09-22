import api from '../context/auth'

/**
 * Get current user profile
 * Endpoint: GET /user/get-profile
 */

export async function completeUserProfile(){
  try {
    const res = await api.patch('/user/create-profile')
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

export async function writeComplain() {
  try {
    const res = await api.post('/user/complain')
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


export async function giveVote() {
  try {
    const res = await api.post('/user/complaint/:complaintId/vote')
    return res.data 
  } catch (error) {
    console.error("Error in giving a vote to complain")
    throw error 
  }
}
