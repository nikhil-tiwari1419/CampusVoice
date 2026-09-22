import { toWritable } from 'node:stream/iter'
import api from '../context/auth'

/**
 * Get all complaints for admin
 * Endpoint: GET /admin/allComplaints
 */
export async function getAllComplaints() {
  try {
    const res = await api.get('/admin/getallComplain')
    return res.data
  } catch (error) {
    console.error('Error fetching all complaints:', error)
    throw error
  }
}

/**
 * Get all students
 * Endpoint: GET /admin/getAllStudent
 */
export async function getAllStudents() {
  try {
    const res = await api.get('/admin/getAllStudent')
    return res.data
  } catch (error) {
    console.error('Error fetching all students:', error)
    throw error
  }
}

export default {
  getAllComplaints,
  getAllStudents,
}

/* Super admin end point */
export async function getAllAdmin() {
  try {
    const res = await api.get('/superadmin/create-admin')
    return res.data
  } catch (error) {
    console.error('Error fetching all admin')
    throw error
  }
}

export async function createAdmin(req, res) {
  try {
    const res = await api.post('/superadmin/create-admin')
    return res.data
  } catch (error) {
    console.error("Error in fetching add creating admin")
    throw error
  }
}

export async function removeAdmin(req, res) {
  try {
    const res = await api.delete('/superadmin/admin/:id')
    return res.data
  } catch (error) {
    console.error("Error in  removing admin")
    throw error
  }
}