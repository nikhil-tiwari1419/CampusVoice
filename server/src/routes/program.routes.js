import express from 'express'
import { getAllPrograms, getBranchesByProgram, getBatchesByProgramBranch } from '../controller/program.controller.js'
import { authorize, verifyToken } from '../middleware/auth.middelware.js'

const router = express.Router()

// Get all programs
router.get('/programs', verifyToken, authorize('admin', 'student'), getAllPrograms)

// Get branches by program ID
router.get('/branches/:programId', verifyToken, authorize('admin', 'student'), getBranchesByProgram)

// Get batches by program, branch, and year
router.get('/batches', verifyToken, authorize('admin', 'student'), getBatchesByProgramBranch)

export default router