import api from '../context/auth'

export const getUserProfile = async () => {
  try {
    const response = await api.get('/user/get-profile')
    return response.data
  } catch (error) {
    throw error
  }
}

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api.patch('/user/Complet-profile', {
      program: profileData.program,
      branch: profileData.branch || null,
      year: profileData.year,
      sem: profileData.sem,
      phone: profileData.phone,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const getPrograms = async () => {
  try {
    const response = await api.get('/user/programs')
    return response.data
  } catch (error) {
    throw error
  }
}

export const getBranches = async (programId) => {
  try {
    const response = await api.get(`/user/branches/${programId}`)
    return response.data
  } catch (error) {
    throw error
  }
}

export const getBatches = async (programId, branchId, year) => {
  try {
    const response = await api.get('/user/batches', {
      params: {
        program: programId,
        branch: branchId,
        year: year,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}
