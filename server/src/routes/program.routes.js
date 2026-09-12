import express from 'express'
import { getAllPrograms, getBranchesByProgram, getBatchesByProgramBranch } from '../controller/program.controller.js'

const router = express.Router()

// Get all programs
router.get('/programs', getAllPrograms)

// Get branches by program ID
router.get('/branches/:programId', getBranchesByProgram)

// Get batches by program, branch, and year
router.get('/batches', getBatchesByProgramBranch)

export default router
