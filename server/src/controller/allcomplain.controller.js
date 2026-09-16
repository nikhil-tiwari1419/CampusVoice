import userModel from "../model/user.model.js";
import BranchModel from "../model/Branch.model.js";
import BatchModel from "../model/Batch.model.js";
import ProgramModel from "../model/Program.model.js";
import complainBox from "../model/complainBox.model.js"

export async function getMyBranchAllCompain(req, res) {
   try {
      const userId = req.user.id; // ye token verify ho ke ayega middelware se 

      const student = await userModel.findById(userId).populate({
         path: 'batch',
         populate: { path: 'batch' }
      });

      if (!student || !student.batch || !student.batch.branch) {
         return res.status(404).json({
            success: true,
            message: "Branch information not found for this student"
         });
      }

      const branchId = student.batch.branch._id;

      // Find all batches under this branch 
      const batchesInBranch = await BatchModel.find({ branch: branchId }).select('_id');
      const batchIds = batchesInBranch.map(b => b._id);

      const complaints = await complainBox.find({ batch: { $in: batchIds } })
         .populate('user', 'username email')
         .populate({
            path: 'batch',
            populate: [{ path: 'program' }, { path: 'branch' }]
         })
         .sort({ createdAt: -1 });

      return req.status(200).json({
         success: true,
         message: complaints.length === 0 ? "No complaints found for thid batch" : "Complaints found",
         data: complaints
      });

   } catch (error) {
      console.error("getComplainsById controller error", error.message);
      res.status(500).json({
         success: false,
         message: "Error fetching complaints"
      });

   }
}

