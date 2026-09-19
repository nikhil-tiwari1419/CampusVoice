import Program from '../model/Program.model.js'
import Branch from '../model/Branch.model.js'
import Batch from '../model/Batch.model.js'
import userModel from '../model/user.model.js'
import complaintModel from '../model/complainBox.model.js'
import BatchModel from '../model/Batch.model.js'



//  Add a new branch to an existing program -- auto grnerate its batch 
export async function addBranch(req, res) {
    const { programId, name } = req.body;
    try {
        const program = await Program.findById(programId);
        if (!program) return res.status(404).json({
            message: "Program not found"
        });

        const branch = await Branch.create({ name, program: programId });

        // auto-create batches for every year of this program 
        const batchDocs = [];
        for (let year = 1; year <= program.numYears; year++) {
            batchDocs.push({ program: programId, branch: branch._id, year });
        }

        await Batch.insertMany(batchDocs);

        res.status(201).json({ message: "Branch and its batches created", branch });

    } catch (error) {
        if (error.code === 11000) return res.status(409).json({ message: 'Branch already exists' });
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export async function getAllStudent(req, res) {
    try {
        const AllStudent = await userModel.find({role:'student'})
            .select('-password')
            .populate({
                path: 'batch',
                populate: [{ path: 'program' }, { path: 'branch' }]
            });

        if (AllStudent.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Student found",
            data: AllStudent
        });

    } catch (error) {
        console.error("Student get method have error", error.message);
        res.status(500).json({
            success: false,
            message: "getstudent method haveing error"
        });
    }
}

export async function getallComplain(req, res) {
    
    try {
        const admin = await userModel.findById(req.user.id);
        let batchIds;
        if (admin.managedBranch) {

            //Branch-level admin (e.g BSc -CS branch admin)

            const batches = await BatchModel.find({
                branch: admin.managedBranch
            }).select('_id');
            batchIds = batches.map(b => b._id);
        } else if (admin.managedProgram) {

            // program-level admin (e.g BCA admin)

            const batches = await BatchModel.find({ program: admin.managedProgram }).select('_id');
            batchIds = batches.map(b => b._id);

        } else {
            return res.status(403).json({
                success: false,
                message: "No program or branch assigned to this admin"
            });
        }

        const complaints = await complaintModel.find({ batch: { $in: batchIds } })
            .populate('student', 'username email')
            .populate({ path: 'batch', populate: ['program', 'branch'] })
            .sort({ createdAt: -1 });

        if (complaints.length === 0) {
            return res.status(404).json({
                success: false,
                message: "complain dose not exist"
            });
        }
        return res.status(200).json({
            success: true,
            message: complaints.length === 0 ? "No complaints found" : "Complaints found",
            data: complaints
        });

    } catch (error) {
        console.error("getAllCompain controller error", error.message);
        res.status(500).json({
            success: false,
            message: "Error fetching complaints"
        });
    }
}

