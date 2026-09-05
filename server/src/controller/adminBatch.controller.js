import Program from '../model/Program.model'
import Branch from '../model/Branch.model'
import Batch from '../model/Batch.model'


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

    } catch (err) {
        if (err.code === 11000) return res.status(409).json({ message: 'Branch already exists' });
        res.status(500).json({ message: 'Something went wrong' });
    }
};


