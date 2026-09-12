import Program from '../model/Program.model.js'
import Branch from '../model/Branch.model.js'
import Batch from '../model/Batch.model.js'

export async function getAllPrograms(_req, res) {
  try {
    const programs = await Program.find()
    return res.status(200).json({
      success: true,
      data: programs
    })
  } catch (error) {
    console.error("getAllPrograms error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching programs"
    })
  }
}

export async function getBranchesByProgram(req, res) {
  try {
    const { programId } = req.params

    const branches = await Branch.find({ program: programId }).populate('program', 'name numYears')

    if (branches.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        message: "No branches found for this program"
      })
    }

    return res.status(200).json({
      success: true,
      data: branches
    })
  } catch (error) {
    console.error("getBranchesByProgram error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching branches"
    })
  }
}

export async function getBatchesByProgramBranch(req, res) {
  try {
    const { program, branch, year } = req.query

    const query = { program }
    if (branch && branch !== 'null') query.branch = branch
    if (year) query.year = Number(year)

    const batches = await Batch.find(query)
      .populate('program', 'name numYears')
      .populate('branch', 'name')

    return res.status(200).json({
      success: true,
      data: batches
    })
  } catch (error) {
    console.error("getBatchesByProgramBranch error:", error)
    res.status(500).json({
      success: false,
      message: "Error fetching batches"
    })
  }
}
